import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROVIDERS, INITIAL_BOOKINGS, INITIAL_COMMUNITY_FUND } from '../data/seedData';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { recalculateProviderTrust } from '../services/trustEngine';
import { calculateCooperativeSplit } from '../services/pricingEngine';

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [providers, setProviders] = useState(() => {
    return loadFromStorage('providers_v1', INITIAL_PROVIDERS);
  });

  const [bookings, setBookings] = useState(() => {
    return loadFromStorage('bookings_v1', INITIAL_BOOKINGS);
  });

  const [communityFund, setCommunityFund] = useState(() => {
    return loadFromStorage('community_fund_v1', INITIAL_COMMUNITY_FUND);
  });

  // Save changes to storage
  useEffect(() => {
    saveToStorage('providers_v1', providers);
  }, [providers]);

  useEffect(() => {
    saveToStorage('bookings_v1', bookings);
  }, [bookings]);

  useEffect(() => {
    saveToStorage('community_fund_v1', communityFund);
  }, [communityFund]);

  // Create a new booking
  const createBooking = (bookingData) => {
    const split = calculateCooperativeSplit(bookingData.baseAmount || 500);
    const newBooking = {
      id: `CS-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'REQUESTED',
      createdAt: new Date().toISOString(),
      pricing: {
        baseAmount: split.totalAmount,
        providerTakeHome: split.providerTakeHome,
        coopWelfareFund: split.coopWelfareFund,
        platformUpkeep: split.platformUpkeep
      },
      rating: null,
      review: null,
      ...bookingData
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // Update booking status in pipeline (REQUESTED -> ACCEPTED -> IN_PROGRESS -> COMPLETED -> RATED)
  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: newStatus,
          updatedAt: new Date().toISOString(),
          ...(newStatus === 'COMPLETED' ? { completedAt: new Date().toISOString() } : {})
        };
      }
      return b;
    }));

    // If job was completed, we prepare for provider trust update and add to community fund pool
    if (newStatus === 'COMPLETED') {
      const b = bookings.find(item => item.id === bookingId);
      if (b) {
        // Increment provider completed jobs
        setProviders(prev => prev.map(p => {
          if (p.id === b.providerId) {
            return recalculateProviderTrust(p, null, true);
          }
          return p;
        }));

        // Increment Community Fund pool by welfare share
        const welfareShare = b.pricing?.coopWelfareFund || Math.round((b.pricing?.baseAmount || 500) * 0.1);
        setCommunityFund(prev => ({
          ...prev,
          totalPoolBalance: prev.totalPoolBalance + welfareShare,
          monthlyCollection: prev.monthlyCollection + welfareShare
        }));
      }
    }
  };

  // Rate and complete review loop
  const rateBooking = (bookingId, rating, reviewText) => {
    let targetProviderId = null;

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        targetProviderId = b.providerId;
        return {
          ...b,
          status: 'RATED',
          rating,
          review: reviewText,
          ratedAt: new Date().toISOString()
        };
      }
      return b;
    }));

    // Trigger Trust Score Closed Loop for provider
    if (targetProviderId) {
      setProviders(prev => prev.map(p => {
        if (p.id === targetProviderId) {
          return recalculateProviderTrust(p, rating, false);
        }
        return p;
      }));
    }
  };

  // Admin verifies a provider KYC
  const verifyProvider = (providerId, badge = 'Cooperative Master Craftsman') => {
    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        return {
          ...p,
          verified: true,
          trustScore: Math.max(88, p.trustScore + 6),
          verificationDetails: {
            ...p.verificationDetails,
            verifiedOn: new Date().toISOString().split('T')[0],
            badge
          }
        };
      }
      return p;
    }));
  };

  // Provider toggles their availability status
  const updateProviderAvailability = (providerId, newStatus) => {
    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        return {
          ...p,
          availability: {
            ...p.availability,
            status: newStatus
          }
        };
      }
      return p;
    }));
  };

  // Provider adds or removes skill
  const updateProviderSkills = (providerId, skills) => {
    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        return {
          ...p,
          skills
        };
      }
      return p;
    }));
  };

  // Admin approves a welfare grant disbursement
  const disburseGrant = (grantData) => {
    const newGrant = {
      id: `g-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'DISBURSED',
      ...grantData
    };

    setCommunityFund(prev => ({
      ...prev,
      totalPoolBalance: Math.max(0, prev.totalPoolBalance - (grantData.amount || 0)),
      disbursedToDate: prev.disbursedToDate + (grantData.amount || 0),
      beneficiaryWorkers: prev.beneficiaryWorkers + 1,
      activeGrants: [newGrant, ...prev.activeGrants]
    }));
  };

  // Reset demo state back to seeds
  const resetToSeedData = () => {
    setProviders(INITIAL_PROVIDERS);
    setBookings(INITIAL_BOOKINGS);
    setCommunityFund(INITIAL_COMMUNITY_FUND);
    saveToStorage('providers_v1', INITIAL_PROVIDERS);
    saveToStorage('bookings_v1', INITIAL_BOOKINGS);
    saveToStorage('community_fund_v1', INITIAL_COMMUNITY_FUND);
  };

  return (
    <AppDataContext.Provider value={{
      providers,
      bookings,
      communityFund,
      createBooking,
      updateBookingStatus,
      rateBooking,
      verifyProvider,
      updateProviderAvailability,
      updateProviderSkills,
      disburseGrant,
      resetToSeedData
    }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
