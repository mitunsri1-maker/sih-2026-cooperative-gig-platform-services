import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { IncomingJobsQueue } from './IncomingJobsQueue';
import { ActiveJobManager } from './ActiveJobManager';
import { AvailabilitySchedule } from './AvailabilitySchedule';
import { SkillsManager } from './SkillsManager';
import { EarningsCoopLedger } from './EarningsCoopLedger';
import { TrustBadgeGroup } from '../common/TrustBadge';
import { formatINR } from '../../utils/formatters';
import { 
  ShieldCheck, Wrench, Clock, CheckCircle2, TrendingUp, 
  Award, HeartHandshake, AlertCircle, Sparkles, UserCheck, Star 
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

  const provider = providers.find(p => p.id === currentUser.id) || providers[0];
  
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
    <div className="max-w-5xl mx-auto space-y-6 text-left">
      
      {/* Top Provider Hero / Trust Card */}
      <div className="rounded-3xl bg-dark-900/90 backdrop-blur-2xl text-white p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          {/* Avatar & Profile */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400/40 shadow-glow-emerald"
              />
              {provider.verified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-dark-950 p-1 rounded-full shadow-glow-emerald">
                  <ShieldCheck className="w-4 h-4 stroke-[3]" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black">{provider.name}</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  {provider.trade}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {provider.verificationDetails?.badge || 'Cooperative Craftsman'} • {provider.location?.area}, Bengaluru
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
                <span className="text-yellow-400 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  {provider.rating} ({provider.reviewCount} reviews)
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">{provider.completedJobs} Jobs Completed</span>
              </div>

              <div className="pt-1">
                <TrustBadgeGroup provider={provider} size="xs" />
              </div>
            </div>
          </div>

          {/* Trust Meter Box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Your Trust Score</span>
              <span className="text-xs text-slate-400 max-w-[130px] block leading-tight mt-0.5">
                Feeds into 10% Trust weight in Smart Match ranking.
              </span>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center shrink-0">
              <span className="text-xl font-black font-mono text-emerald-400">{provider.trustScore}</span>
              <span className="text-[8px] uppercase font-bold text-slate-400">/ 100</span>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-view switcher tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSubTab('provider-jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSubTab === 'provider-jobs'
              ? 'bg-emerald-500 text-dark-950 font-black shadow-glow-emerald'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Active Pipeline & Requests</span>
          {(incomingBookings.length > 0 || activeJobs.length > 0) && (
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-ping" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('provider-earnings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSubTab === 'provider-earnings'
              ? 'bg-emerald-500 text-dark-950 font-black shadow-glow-emerald'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Earnings & Welfare Pool</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('provider-profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeSubTab === 'provider-profile'
              ? 'bg-emerald-500 text-dark-950 font-black shadow-glow-emerald'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Skills & Availability Schedule</span>
        </button>
      </div>

      {/* Content */}
      {activeSubTab === 'provider-jobs' && (
        <div className="space-y-6">
          <IncomingJobsQueue
            incomingBookings={incomingBookings}
            onAcceptJob={handleAcceptJob}
            onDeclineJob={handleDeclineJob}
          />

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
