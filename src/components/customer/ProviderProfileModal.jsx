import React from 'react';
import { Modal } from '../common/Modal';
import { TrustBadgeGroup, TrustBadge } from '../common/TrustBadge';
import { MatchScore } from '../common/MatchScore';
import { ShieldCheck, Star, MapPin, CheckCircle2, Clock, Award, Phone, Mail, FileCheck, ArrowRight } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export function ProviderProfileModal({ provider, isOpen, onClose, onBookNow }) {
  if (!provider) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cooperative Craftsman Verified Profile" maxWidth="max-w-2xl">
      <div className="space-y-6 text-left">
        
        {/* Header Section with Avatar & Verification Badges */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 bg-white/[0.03] rounded-3xl border border-white/10">
          <div className="relative">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-400/40 shadow-2xl"
            />
            {provider.verified && (
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-dark-950 p-1.5 rounded-full shadow-glow-emerald">
                <ShieldCheck className="w-4 h-4 stroke-[3]" />
              </div>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">{provider.name}</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {provider.trade}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-yellow-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                {provider.rating} ({provider.reviewCount} reviews)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {provider.location?.distanceKm ?? '1.8'} km ({provider.location?.area || 'Nearby'})
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">
                {provider.completedJobs} Jobs Done
              </span>
            </div>

            <div className="pt-1">
              <TrustBadgeGroup provider={provider} size="xs" />
            </div>
          </div>
        </div>

        {/* Dynamic Trust Score Banner */}
        <div className="p-5 rounded-3xl bg-dark-900/90 border border-white/10 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              CoServe Peer Reputation Index
            </span>
            <h4 className="text-sm font-bold text-white">
              {provider.trustScore >= 95 ? 'Cooperative Master Craftsman' : 'Cooperative Verified Pro'}
            </h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Closed-loop trust score recalculated dynamically based on completed jobs and peer satisfaction.
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center shrink-0">
            <span className="text-xl font-black font-mono text-emerald-400">{provider.trustScore}</span>
            <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Trust</span>
          </div>
        </div>

        {/* Skills & Experience */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Verified Skills & Specializations
          </h4>
          <div className="flex flex-wrap gap-2">
            {provider.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-white/[0.04] text-slate-200 text-xs font-medium rounded-xl border border-white/[0.08]">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience & Bio */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
          <strong className="text-white block mb-1">Craftsman Bio & Experience:</strong>
          "{provider.bio}"
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-white/15 text-xs font-bold text-slate-300 hover:bg-white/[0.06]"
          >
            Close
          </button>
          {onBookNow && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookNow(provider);
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 text-xs font-black shadow-glow-emerald flex items-center gap-1.5"
            >
              <span>Book with {provider.name}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          )}
        </div>

      </div>
    </Modal>
  );
}
