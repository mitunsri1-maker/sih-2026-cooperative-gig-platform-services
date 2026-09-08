import React, { useState } from 'react';
import { Sparkles, Info, Wrench, Clock, MapPin, Star, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export function MatchScore({ score = 96, breakdown = null, size = 'md', interactive = true }) {
  const [isOpen, setIsOpen] = useState(false);

  // SVG Radial dimensions
  const radius = size === 'lg' ? 44 : size === 'sm' ? 22 : 32;
  const stroke = size === 'lg' ? 6 : size === 'sm' ? 4 : 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-block">
      <div 
        className={`flex items-center gap-3 ${interactive ? 'cursor-pointer select-none' : ''}`}
        onClick={() => interactive && setIsOpen(!isOpen)}
      >
        {/* Circular Ring */}
        <div className="relative inline-flex items-center justify-center shrink-0">
          <svg 
            className={size === 'lg' ? 'w-24 h-24' : size === 'sm' ? 'w-14 h-14' : 'w-20 h-20'} 
            viewBox="0 0 100 100"
          >
            {/* Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-white/10"
              strokeWidth={stroke}
              stroke="currentColor"
              fill="transparent"
            />
            {/* Value Arc */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className={score >= 90 ? 'text-emerald-400' : score >= 80 ? 'text-cyan-400' : 'text-amber-400'}
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              transform="rotate(-90 50 50)"
            />
          </svg>

          {/* Centered Number */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={`font-black tracking-tight text-white ${
              size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-xs' : 'text-base'
            }`}>
              {score}%
            </span>
            {size !== 'sm' && (
              <span className="text-[8px] uppercase tracking-widest text-emerald-400 font-bold -mt-0.5">
                Match
              </span>
            )}
          </div>
        </div>

        {/* Text & Dropdown Pill */}
        {interactive && (
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Match Score</span>
              {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Click to view 5-pillar mathematical breakdown
            </p>
          </div>
        )}
      </div>

      {/* Popover / Expandable Breakdown Drawer */}
      {isOpen && breakdown && (
        <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 rounded-2xl bg-dark-900/95 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
          
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-white">Explainable Matching Formula</span>
            </div>
            <span className="text-xs font-mono font-black text-emerald-400">{score}/100</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* 1. Skill 40% */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-blue-400" />
                  Skill Match (40% Weight)
                </span>
                <span className="font-mono text-white font-bold">{breakdown.skillScore} / 40 pts</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${(breakdown.skillScore / 40) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 pl-5">{breakdown.skillReason || 'Certified exact trade match'}</p>
            </div>

            {/* 2. Availability 20% */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Availability (20% Weight)
                </span>
                <span className="font-mono text-white font-bold">{breakdown.availScore} / 20 pts</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${(breakdown.availScore / 20) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 pl-5">{breakdown.availReason || 'Available in requested window'}</p>
            </div>

            {/* 3. Distance 20% */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  Locality / Distance (20% Weight)
                </span>
                <span className="font-mono text-white font-bold">{breakdown.distScore} / 20 pts</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full" 
                  style={{ width: `${(breakdown.distScore / 20) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 pl-5">{breakdown.distanceReason || 'Nearby neighborhood'}</p>
            </div>

            {/* 4. Rating 10% */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-400" />
                  Rating (10% Weight)
                </span>
                <span className="font-mono text-white font-bold">{breakdown.ratingScore} / 10 pts</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full" 
                  style={{ width: `${(breakdown.ratingScore / 10) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 pl-5">{breakdown.ratingReason || 'Verified customer feedback'}</p>
            </div>

            {/* 5. Trust Score 10% */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Trust & Verification (10% Weight)
                </span>
                <span className="font-mono text-white font-bold">{breakdown.trustScore} / 10 pts</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 rounded-full" 
                  style={{ width: `${(breakdown.trustScore / 10) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 pl-5">{breakdown.trustReason || 'Cooperative verification badge'}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-slate-500 text-center font-mono">
            Formula = (Skill×0.4) + (Avail×0.2) + (Dist×0.2) + (Rating×0.1) + (Trust×0.1)
          </div>
        </div>
      )}
    </div>
  );
}
