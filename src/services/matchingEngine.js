/**
 * CoServe Explainable Smart Matching Engine
 * 
 * Formula:
 * Match Score = (Skill Match × 0.40) + (Availability × 0.20) 
 *             + (Distance Score × 0.20) + (Rating × 0.10) 
 *             + (Trust Score × 0.10)
 * 
 * All component scores normalized to 0-100 before applying weights.
 */

export function calculateMatchScore(provider, requestCriteria) {
  const {
    categoryId,
    requiredSkill,
    preferredSlot,
    maxDistanceKm = 10,
    requestedUrgency = 'STANDARD' // 'INSTANT', 'STANDARD', 'SCHEDULED'
  } = requestCriteria;

  // 1. Skill Match Score (0 - 100) -> 40% weight (Max 40 pts)
  let skillRawScore = 0;
  let skillReason = '';

  if (provider.categoryId === categoryId) {
    skillRawScore += 50; // Base category match
    if (requiredSkill) {
      const hasDirectSkill = provider.skills.some(
        s => s.toLowerCase().includes(requiredSkill.toLowerCase()) ||
             requiredSkill.toLowerCase().includes(s.toLowerCase())
      );
      if (hasDirectSkill) {
        skillRawScore += 50; // Exact sub-skill match
        skillReason = `Certified direct match for "${requiredSkill}"`;
      } else {
        skillRawScore += 25; // General category specialist
        skillReason = `Broad trade coverage in ${provider.trade}`;
      }
    } else {
      skillRawScore += 50;
      skillReason = `Full trade specialist in ${provider.trade}`;
    }
  } else {
    skillRawScore = 10;
    skillReason = 'Adjacent trade skill';
  }
  const normalizedSkill = Math.min(100, Math.max(0, skillRawScore));
  const skillPoints = (normalizedSkill * 0.40);

  // 2. Availability Score (0 - 100) -> 20% weight (Max 20 pts)
  let availRawScore = 50;
  let availReason = '';

  if (provider.availability.status === 'AVAILABLE_NOW') {
    availRawScore = 100;
    availReason = 'Online & ready for immediate assignment';
  } else if (provider.availability.status === 'BUSY') {
    availRawScore = 50;
    availReason = 'Currently on a job; available for next slot';
  } else {
    availRawScore = 20;
    availReason = 'Currently offline; advance bookings only';
  }

  if (preferredSlot && provider.availability.slots?.includes(preferredSlot)) {
    availRawScore = Math.min(100, availRawScore + 10);
    availReason += ` • Confirmed slot (${preferredSlot})`;
  }
  const normalizedAvail = Math.min(100, Math.max(0, availRawScore));
  const availPoints = (normalizedAvail * 0.20);

  // 3. Distance Score (0 - 100) -> 20% weight (Max 20 pts)
  // Closer is higher: 0km = 100, maxDistanceKm = 0
  const distKm = provider.location?.distanceKm ?? 3.0;
  let normalizedDistance = 0;
  if (distKm <= 1.0) {
    normalizedDistance = 100;
  } else if (distKm <= maxDistanceKm) {
    normalizedDistance = Math.round(100 - ((distKm - 1.0) / (maxDistanceKm - 1.0)) * 70);
  } else {
    normalizedDistance = Math.max(10, Math.round(30 - (distKm - maxDistanceKm) * 5));
  }
  const distancePoints = (normalizedDistance * 0.20);
  const distanceReason = `${distKm.toFixed(1)} km away in ${provider.location?.area || 'nearby area'}`;

  // 4. Rating Score (0 - 100) -> 10% weight (Max 10 pts)
  // 5.0 = 100%, 4.0 = 75%, 3.0 = 50%
  const ratingVal = provider.rating ?? 4.5;
  const normalizedRating = Math.min(100, Math.max(0, Math.round((ratingVal / 5.0) * 100)));
  const ratingPoints = (normalizedRating * 0.10);
  const ratingReason = `${ratingVal.toFixed(1)}★ verified community satisfaction (${provider.reviewCount} jobs)`;

  // 5. Trust Score (0 - 100) -> 10% weight (Max 10 pts)
  const trustVal = provider.trustScore ?? 80;
  const normalizedTrust = Math.min(100, Math.max(0, trustVal));
  const trustPoints = (normalizedTrust * 0.10);
  const trustReason = `${provider.verified ? 'Verified Co-op Member' : 'Under Verification'} • Trust Index ${trustVal}/100`;

  // Total Final Score (0 - 100)
  const totalScore = Math.round(skillPoints + availPoints + distancePoints + ratingPoints + trustPoints);

  return {
    totalScore: Math.min(100, Math.max(1, totalScore)),
    breakdown: {
      skillScore: parseFloat(skillPoints.toFixed(1)),
      skillMax: 40,
      skillNormalized: normalizedSkill,
      skillReason,

      availScore: parseFloat(availPoints.toFixed(1)),
      availMax: 20,
      availNormalized: normalizedAvail,
      availReason,

      distScore: parseFloat(distancePoints.toFixed(1)),
      distMax: 20,
      distNormalized: normalizedDistance,
      distanceReason,

      ratingScore: parseFloat(ratingPoints.toFixed(1)),
      ratingMax: 10,
      ratingNormalized: normalizedRating,
      ratingReason,

      trustScore: parseFloat(trustPoints.toFixed(1)),
      trustMax: 10,
      trustNormalized: normalizedTrust,
      trustReason
    },
    recommendationTier: totalScore >= 90 ? 'Top Match' : totalScore >= 75 ? 'Strong Match' : 'Good Match'
  };
}

/**
 * Filter & Rank providers for a given service request
 */
export function rankProviders(providers, requestCriteria) {
  const scored = providers
    .filter(p => p.categoryId === requestCriteria.categoryId || !requestCriteria.categoryId)
    .map(provider => {
      const matchData = calculateMatchScore(provider, requestCriteria);
      return {
        ...provider,
        matchScore: matchData.totalScore,
        matchBreakdown: matchData.breakdown,
        recommendationTier: matchData.recommendationTier
      };
    });

  // Sort descending by matchScore
  return scored.sort((a, b) => b.matchScore - a.matchScore);
}
