import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { IncomingJobsQueue } from './IncomingJobsQueue';
import { ActiveJobManager } from './ActiveJobManager';
import { AvailabilitySchedule } from './AvailabilitySchedule';
import { SkillsManager } from './SkillsManager';
import { EarningsCoopLedger } from './EarningsCoopLedger';
import { TrustScoreMeter } from '../common/TrustScoreMeter';
import { formatINR } from '../../utils/formatters';
import { 
  ShieldCheck, Wrench, Clock, CheckCircle2, TrendingUp, 
  Award, HeartHandshake, AlertCircle, Sparkles, UserCheck 
} from 'lucide-react';

export function ProviderDashboard({ activeSubTab, setActiveSubTab }) {
  const { 
    providers, 
    bookings, 
    updateBookingStatus, 
    updateProviderAvailability, 
    updateProviderSkills,
    communityFund 
  } = useAppData();
  const { currentUser } = useAuth();

  // Current logged in provider profile from state
  const provider = providers.find(p => p.id === currentUser.id) || providers[0];
  
  // Bookings relevant to this provider
  const providerBookings = bookings.filter(b => b.providerId === provider.id);
  const incomingBookings = providerBookings.filter(b => b.status === 'REQUESTED');
  const activeJobs = providerBookings.filter(b => b.status === 'ACCEPTED' || b.status === 'IN_PROGRESS');
  const completedJobs = providerBookings.filter(b => b.status === 'COMPLETED' || b.status === 'RATED');

  const handleAcceptJob = (jobId) => {
    updateBookingStatus(jobId, 'ACCEPTED');
  };

  const handleDeclineJob = (jobId) => {
    if (window.confirm('Decline this job request?')) {
      updateBookingStatus(jobId, 'DECLINED');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Provider Hero / Trust Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          {/* Avatar & Profile */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
              />
              {provider.verified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold">{provider.name}</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  {provider.trade}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {provider.verificationDetails?.badge || 'Cooperative Craftsman'} • {provider.location?.area}, Bengaluru
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="text-yellow-400 font-bold">★ {provider.rating} ({provider.reviewCount} reviews)</span>
                <span>•</span>
                <span className="text-emerald-300 font-semibold">{provider.completedJobs} Completed Jobs</span>
              </div>
            </div>
          </div>

          {/* Trust Meter Widget */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Your Trust Index</span>
              <span className="text-xs text-slate-300 max-w-[140px] block leading-tight">
                Drives your 10% Trust weight in Smart Match ranking.
              </span>
            </div>
            <div className="w-16 h-16 bg-slate-900/80 rounded-2xl flex flex-col items-center justify-center border border-emerald-400/30">
              <span className="text-xl font-black text-emerald-400">{provider.trustScore}</span>
              <span className="text-[9px] uppercase font-bold text-slate-400">/ 100</span>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-view switcher tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('provider-jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSubTab === 'provider-jobs'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Active Pipeline & Requests</span>
          {(incomingBookings.length > 0 || activeJobs.length > 0) && (
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('provider-earnings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSubTab === 'provider-earnings'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Earnings & Co-op Fund</span>
        </button>

        <button
          onClick={() => setActiveSubTab('provider-profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSubTab === 'provider-profile'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Skills & Availability Schedule</span>
        </button>
      </div>

      {/* View Content */}
      {activeSubTab === 'provider-jobs' && (
        <div className="space-y-6">
          {/* 1. Incoming Requests Queue */}
          <IncomingJobsQueue
            incomingBookings={incomingBookings}
            onAcceptJob={handleAcceptJob}
            onDeclineJob={handleDeclineJob}
          />

          {/* 2. Active In-Progress Manager */}
          <ActiveJobManager
            activeJobs={activeJobs}
            onUpdateStatus={updateBookingStatus}
          />
        </div>
      )}

      {activeSubTab === 'provider-earnings' && (
        <EarningsCoopLedger
          provider={provider}
          providerBookings={providerBookings}
          communityFund={communityFund}
        />
      )}

      {activeSubTab === 'provider-profile' && (
        <div className="space-y-6">
          <AvailabilitySchedule
            provider={provider}
            onToggleStatus={updateProviderAvailability}
          />
          <SkillsManager
            provider={provider}
            onUpdateSkills={updateProviderSkills}
          />
        </div>
      )}

    </div>
  );
}
