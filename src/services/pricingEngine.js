/**
 * CoServe Cooperative Transparent Pricing Engine
 * 
 * Traditional gig platforms take 25% to 35% commission.
 * CoServe operates on a cooperative model:
 * - 85% directly to the Local Worker
 * - 10% to the Collective Worker Welfare & Tool Upgrade Community Fund
 * - 5% for Open-source Platform Upkeep & Server Operations
 */

export const COOP_SPLIT_CONFIG = {
  PROVIDER_PERCENT: 85,
  COMMUNITY_FUND_PERCENT: 10,
  PLATFORM_PERCENT: 5,
};

export function calculateCooperativeSplit(basePrice) {
  const amount = Number(basePrice) || 0;
  
  const providerTakeHome = Math.round((amount * COOP_SPLIT_CONFIG.PROVIDER_PERCENT) / 100);
  const coopWelfareFund = Math.round((amount * COOP_SPLIT_CONFIG.COMMUNITY_FUND_PERCENT) / 100);
  const platformUpkeep = amount - providerTakeHome - coopWelfareFund; // Balances the exact integer total

  return {
    totalAmount: amount,
    providerTakeHome,
    coopWelfareFund,
    platformUpkeep,
    splits: {
      providerPercent: COOP_SPLIT_CONFIG.PROVIDER_PERCENT,
      communityFundPercent: COOP_SPLIT_CONFIG.COMMUNITY_FUND_PERCENT,
      platformPercent: COOP_SPLIT_CONFIG.PLATFORM_PERCENT
    },
    communityImpactNote: `₹${coopWelfareFund} of this booking is pooled into the CoServe Worker Welfare Fund (Health, Tool Grants & Skill Training).`
  };
}
