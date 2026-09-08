import React, { useState } from 'react';
import { MatchScore } from '../common/MatchScore';
import { TrustBadgeGroup } from '../common/TrustBadge';
import { EarningsFlow } from '../common/EarningsFlow';
import { Card3DTilt } from '../common/Card3DTilt';
import { Modal } from '../common/Modal';
import { formatINR } from '../../utils/formatters';
import { 
  ShieldCheck, Star, MapPin, Clock, Award, CheckCircle2, 
  Sparkles, ArrowLeft, ArrowRight, UserCheck, HeartHandshake, Eye
} from 'lucide-react';

export function MatchResultsView({ 
  rankedProviders, 
  requestCriteria, 
  onSelectProvider, 
  onBackToSearch,
  onViewProviderProfile 
}) {
  const [bookingConfirmationProvider, setBookingConfirmationProvider] = useState(null);

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left">
      
      {/* Top Criteria Summary Bar */}
      <div className="rounded-3xl bg-dark-900/80 backdrop-blur-2xl p-5 border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBackToSearch}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Modify Search Criteria</span>
          </button>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Smart Matches for: <span className="text-emerald-400">{requestCriteria.requiredSkill || requestCriteria.categoryName}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Slot: {requestCriteria.preferredDate} ({requestCriteria.preferredSlot}) • Location: {requestCriteria.neighborhood}
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>5-Pillar Normalized Scoring Engine</span>
        </div>
      </div>

      {/* Provider List Cards */}
      <div className="space-y-4">
        {rankedProviders.map((provider, index) => {
          const isTopRanked = index === 0;

          return (
            <Card3DTilt key={provider.id}>
              <div className={`p-6 sm:p-7 rounded-3xl border backdrop-blur-2xl transition-all relative overflow-hidden ${
                isTopRanked
                  ? 'bg-emerald-950/30 border-emerald-500/50 shadow-glow-emerald ring-1 ring-emerald-500/30'
                  : 'bg-dark-900/70 border-white/10 hover:border-white/20 shadow-xl'
              }`}>
                {/* Top Badge */}
                {isTopRanked && (
                  <div className="bg-emerald-500 text-dark-950 text-[10px] font-black uppercase tracking-widest px-4 py-1 absolute top-0 right-0 rounded-bl-2xl flex items-center gap-1 shadow-glow-emerald">
                    <Sparkles className="w-3.5 h-3.5 fill-dark-950" />
                    #1 Recommended Co-op Match
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left: Avatar & Details */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="relative shrink-0">
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/10 shadow-2xl"
                      />
                      {provider.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-dark-950 p-1 rounded-full shadow-glow-emerald">
                          <ShieldCheck className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-black text-white">{provider.name}</h3>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                          {provider.trade}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {provider.bio}
                      </p>

                      {/* Meta Stats Badges */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                        <span className="flex items-center gap-1 text-yellow-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          {provider.rating} ({provider.reviewCount})
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          {provider.location?.distanceKm ?? '1.8'} km ({provider.location?.area || 'Nearby'})
                        </span>
                        <span>•</span>
                        <span className="text-emerald-400 font-semibold">
                          {provider.completedJobs} Jobs Done
                        </span>
                      </div>

                      {/* Trust Badges */}
                      <div className="pt-1">
                        <TrustBadgeGroup provider={provider} size="xs" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Scores & Actions */}
                  <div className="flex sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                    
                    <MatchScore
                      score={provider.matchScore}
                      breakdown={provider.matchBreakdown}
                      size="md"
                    />

                    {/* Pricing Preview */}
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Total Price</div>
                      <div className="text-xl font-black font-mono text-white">
                        {formatINR(requestCriteria.basePrice || 500)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => onViewProviderProfile(provider)}
                        className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Profile</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBookingConfirmationProvider(provider)}
                        className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 text-xs font-black shadow-glow-emerald transition flex items-center justify-center gap-1.5"
                      >
                        <span>Book Service</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </Card3DTilt>
          );
        })}
      </div>

      {/* Booking Confirmation & Transparent Split Flow Modal */}
      {bookingConfirmationProvider && (
        <Modal
          isOpen={!!bookingConfirmationProvider}
          onClose={() => setBookingConfirmationProvider(null)}
          title="Confirm Booking & Cooperative Allocation"
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-left">
            {/* Target Provider Header */}
            <div className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-2xl border border-white/10">
              <img
                src={bookingConfirmationProvider.avatar}
                alt={bookingConfirmationProvider.name}
                className="w-12 h-12 rounded-xl object-cover border border-white/10"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">{bookingConfirmationProvider.name}</h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                    {bookingConfirmationProvider.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-400">{bookingConfirmationProvider.trade} • {bookingConfirmationProvider.phone}</p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-white/[0.02] p-4 rounded-2xl border border-white/10">
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Service Task</span>
                <span className="font-bold text-white">{requestCriteria.requiredSkill || requestCriteria.categoryName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Scheduled Time</span>
                <span className="font-bold text-white">{requestCriteria.preferredDate} ({requestCriteria.preferredSlot})</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Location</span>
                <span className="font-bold text-white">{requestCriteria.neighborhood}, Bengaluru</span>
              </div>
            </div>

            {/* Signature Flow */}
            <EarningsFlow amount={requestCriteria.basePrice || 500} />

            {/* Confirmation Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBookingConfirmationProvider(null)}
                className="px-4 py-2.5 rounded-xl border border-white/15 text-xs font-bold text-slate-300 hover:bg-white/[0.06]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = bookingConfirmationProvider;
                  setBookingConfirmationProvider(null);
                  onSelectProvider(target);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 text-xs font-black shadow-glow-emerald flex items-center gap-1.5"
              >
                <span>Confirm & Dispatch Request</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
