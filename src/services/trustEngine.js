/**
 * CoServe Trust & Reputation Engine
 * Closed Feedback Loop:
 * Better Service -> Higher Trust Score -> Higher Matching Rank -> More Work
 */

export function recalculateProviderTrust(provider, newRating = null, wasCompleted = false) {
  let currentTrust = provider.trustScore || 80;
  let currentJobs = provider.completedJobs || 0;
  let currentRating = provider.rating || 4.5;
  let reviewCount = provider.reviewCount || 0;

  if (wasCompleted) {
    currentJobs += 1;
  }

  if (newRating !== null) {
    // Recalculate average rating
    const totalRatingSum = (currentRating * reviewCount) + newRating;
    reviewCount += 1;
    currentRating = parseFloat((totalRatingSum / reviewCount).toFixed(2));

    // Dynamic Trust update
    if (newRating >= 4.8) {
      currentTrust = Math.min(100, currentTrust + 2); // Boost for 5-star perfection
    } else if (newRating >= 4.0) {
      currentTrust = Math.min(100, currentTrust + 1);
    } else if (newRating <= 2.5) {
      currentTrust = Math.max(40, currentTrust - 4); // Penalty for bad experience
    }
  }

  // Bonus for cooperative verification
  if (provider.verified && currentTrust < 85) {
    currentTrust = 85;
  }

  return {
    ...provider,
    trustScore: Math.round(currentTrust),
    rating: currentRating,
    reviewCount,
    completedJobs: currentJobs
  };
}

export function getTrustLevelInfo(trustScore) {
  if (trustScore >= 95) {
    return {
      level: 'Cooperative Master Craftsman',
      color: 'emerald',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Top 5% cooperative worker with spotless track record & peer endorsements.'
    };
  }
  if (trustScore >= 90) {
    return {
      level: 'Cooperative Veteran Pro',
      color: 'teal',
      badgeClass: 'bg-teal-100 text-teal-800 border-teal-300',
      description: 'Highly consistent provider with verified identity & high punctuality.'
    };
  }
  if (trustScore >= 80) {
    return {
      level: 'Verified Member',
      color: 'blue',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
      description: 'Fully background-checked member in good standing.'
    };
  }
  return {
    level: 'Apprentice / In Review',
    color: 'amber',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Under onboarding probation or completing initial supervised jobs.'
  };
}
