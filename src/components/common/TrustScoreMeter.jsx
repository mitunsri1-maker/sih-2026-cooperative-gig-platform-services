import React from 'react';
import { ShieldCheck, Award, Star, TrendingUp } from 'lucide-react';
import { getTrustLevelInfo } from '../../services/trustEngine';

export function TrustScoreMeter({ score = 85, size = 'md', showDetails = false }) {
  const trustInfo = getTrustLevelInfo(score);
  
  // Calculate stroke dash for SVG radial gauge
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`flex ${showDetails ? 'flex-col sm:flex-row items-center gap-4' : 'items-center gap-3'}`}>
      
      {/* Circular Gauge */}
      <div className="relative inline-flex items-center justify-center shrink-0">
        <svg className={size === 'lg' ? 'w-24 h-24' : size === 'sm' ? 'w-12 h-12' : 'w-16 h-16'} viewBox="0 0 96 96">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="text-slate-100"
            strokeWidth="7"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Animated Value circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            className={score >= 90 ? 'text-emerald-500' : score >= 80 ? 'text-teal-500' : 'text-amber-500'}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            transform="rotate(-90 48 48)"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`font-black text-slate-900 tracking-tight ${size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            {score}
          </span>
          <span className="text-[9px] text-slate-400 font-semibold uppercase -mt-0.5">Trust</span>
        </div>
      </div>

      {/* Label and Badge */}
      {showDetails && (
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${trustInfo.badgeClass}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              {trustInfo.level}
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            {trustInfo.description}
          </p>
          <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-emerald-700">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Dynamic Trust Loop Active
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
