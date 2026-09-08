import React, { useState } from 'react';
import { Sparkles, Info, CheckCircle, ChevronDown, ChevronUp, MapPin, Clock, Star, ShieldCheck, Wrench } from 'lucide-react';

export function MatchScoreBadge({ score = 92, breakdown = null, onExplainClick = null }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const getScoreColor = (val) => {
    if (val >= 90) return 'bg-emerald-500 text-white shadow-emerald-500/20';
    if (val >= 75) return 'bg-teal-500 text-white shadow-teal-500/20';
    return 'bg-amber-500 text-white shadow-amber-500/20';
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-extrabold text-xs tracking-tight shadow-md transition ${getScoreColor(
            score
          )}`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{score}% Match</span>
        </div>

        {breakdown && (
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full transition"
            title="Inspect explainable matching breakdown"
          >
            <span>Why Matched?</span>
            {showDropdown ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Popover Breakdown */}
      {showDropdown && breakdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Transparent Scoring Breakdown
            </span>
            <span className="text-xs font-extrabold text-emerald-700">{score}/100</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Skill 40% */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-0.5">
                <span className="flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-blue-500" />
                  Skill Fit (40% wt)
                </span>
                <span className="font-bold text-slate-900">{breakdown.skillScore} / 40 pts</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-4">{breakdown.skillReason || 'Trade competency certified'}</p>
            </div>

            {/* Availability 20% */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-0.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Availability (20% wt)
                </span>
                <span className="font-bold text-slate-900">{breakdown.availScore} / 20 pts</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-4">{breakdown.availReason || 'Slot alignment confirmed'}</p>
            </div>

            {/* Distance 20% */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Distance (20% wt)
                </span>
                <span className="font-bold text-slate-900">{breakdown.distScore} / 20 pts</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-4">{breakdown.distanceReason || 'Nearby neighborhood'}</p>
            </div>

            {/* Rating 10% */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-0.5">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500" />
                  Rating (10% wt)
                </span>
                <span className="font-bold text-slate-900">{breakdown.ratingScore} / 10 pts</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-4">{breakdown.ratingReason || 'Customer satisfaction'}</p>
            </div>

            {/* Trust 10% */}
            <div>
              <div className="flex justify-between font-medium text-slate-700 mb-0.5">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Trust Index (10% wt)
                </span>
                <span className="font-bold text-slate-900">{breakdown.trustScore} / 10 pts</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-4">{breakdown.trustReason || 'Cooperative verified member'}</p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            Formula: (Skill×0.4) + (Avail×0.2) + (Dist×0.2) + (Rating×0.1) + (Trust×0.1)
          </div>
        </div>
      )}
    </div>
  );
}
