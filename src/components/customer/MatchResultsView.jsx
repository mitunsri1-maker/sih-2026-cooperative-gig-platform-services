import React, { useState } from 'react';
import { MatchScoreBadge } from '../common/MatchScoreBadge';
import { TrustScoreMeter } from '../common/TrustScoreMeter';
import { EarningsSplitCard } from '../common/EarningsSplitCard';
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
  const [explainModalProvider, setExplainModalProvider] = useState(null);
  const [bookingConfirmationProvider, setBookingConfirmationProvider] = useState(null);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Criteria Summary Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToSearch}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Modify Request Criteria</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Smart Matches for: <span className="text-emerald-700">{requestCriteria.requiredSkill || requestCriteria.categoryName}</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Slot: {requestCriteria.preferredDate} ({requestCriteria.preferredSlot}) • Location: {requestCriteria.neighborhood}
          </p>
        </div>

        {/* Explainability Engine Banner Pill */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-900 text-xs">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">
            Scored by: <strong>Skill (40%)</strong> + <strong>Avail (20%)</strong> + <strong>Dist (20%)</strong> + <strong>Rating (10%)</strong> + <strong>Trust (10%)</strong>
          </span>
        </div>
      </div>

      {/* Provider List Cards */}
      <div className="space-y-4">
        {rankedProviders.map((provider, index) => {
          const isTopRanked = index === 0;

          return (
            <div
              key={provider.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-200 relative overflow-hidden ${
                isTopRanked
                  ? 'border-emerald-400 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Top Banner on #1 Match */}
              {isTopRanked && (
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1 absolute top-0 right-0 rounded-bl-2xl flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  #1 Recommended Co-op Match
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left: Avatar & Provider Details */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative shrink-0">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
                    />
                    {provider.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-xs" title="Cooperative Verified">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{provider.name}</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {provider.trade}
                      </span>
                      {provider.verified && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {provider.verificationDetails?.badge || 'Cooperative Certified'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {provider.bio}
                    </p>

                    {/* Meta Stats Badges */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 text-yellow-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                        {provider.rating} ({provider.reviewCount} reviews)
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {provider.location?.distanceKm ?? '1.5'} km ({provider.location?.area || 'Nearby'})
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {provider.experienceYears} yrs experience
                      </span>
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {provider.completedJobs} jobs completed
                      </span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {provider.skills.map((skill) => {
                        const isRequested = requestCriteria.requiredSkill && skill.toLowerCase().includes(requestCriteria.requiredSkill.toLowerCase());
                        return (
                          <span
                            key={skill}
                            className={`text-[11px] px-2.5 py-0.5 rounded-lg font-medium ${
                              isRequested
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: Score breakdown & Book Action */}
                <div className="flex sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  
                  {/* Match & Trust Scores */}
                  <div className="flex items-center gap-3">
                    <TrustScoreMeter score={provider.trustScore} size="sm" />
                    <MatchScoreBadge
                      score={provider.matchScore}
                      breakdown={provider.matchBreakdown}
                    />
                  </div>

                  {/* Pricing Preview */}
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Estimated Total</div>
                    <div className="text-lg font-black text-slate-900">
                      {formatINR(requestCriteria.basePrice || 500)}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium">
                      ₹{Math.round((requestCriteria.basePrice || 500) * 0.85)} to Worker • ₹{Math.round((requestCriteria.basePrice || 500) * 0.1)} Welfare Fund
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => onViewProviderProfile(provider)}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingConfirmationProvider(provider)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Booking Confirmation & Transparent Cooperative Breakdown Modal */}
      {bookingConfirmationProvider && (
        <Modal
          isOpen={!!bookingConfirmationProvider}
          onClose={() => setBookingConfirmationProvider(null)}
          title="Confirm Booking & Cooperative Split"
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            {/* Target Provider Header */}
            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <img
                src={bookingConfirmationProvider.avatar}
                alt={bookingConfirmationProvider.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{bookingConfirmationProvider.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                    {bookingConfirmationProvider.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-500">{bookingConfirmationProvider.trade} • {bookingConfirmationProvider.phone}</p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 block">Service Request</span>
                <span className="font-bold text-slate-800">{requestCriteria.requiredSkill || requestCriteria.categoryName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Scheduled Time</span>
                <span className="font-bold text-slate-800">{requestCriteria.preferredDate} ({requestCriteria.preferredSlot})</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">Location</span>
                <span className="font-bold text-slate-800">{requestCriteria.neighborhood}, Bengaluru</span>
              </div>
            </div>

            {/* Signature Cooperative Split Card */}
            <EarningsSplitCard amount={requestCriteria.basePrice || 500} showComparison={true} />

            {/* Confirmation Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBookingConfirmationProvider(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
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
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
              >
                <span>Confirm & Send to Provider</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
