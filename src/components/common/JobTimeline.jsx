import React from 'react';
import { Clock, CheckCircle2, PlayCircle, ShieldCheck, Star } from 'lucide-react';

const STAGES = [
  { key: 'REQUESTED', label: 'Requested', desc: 'Smart Matching Engine' },
  { key: 'ACCEPTED', label: 'Accepted', desc: 'Slot & Provider Confirmed' },
  { key: 'IN_PROGRESS', label: 'In Progress', desc: 'Craftsman On-site' },
  { key: 'COMPLETED', label: 'Completed', desc: 'Work Verified' },
  { key: 'RATED', label: 'Rated & Closed', desc: 'Trust Loop Boosted' }
];

export function JobTimeline({ currentStatus = 'REQUESTED' }) {
  const getIndex = (st) => {
    switch (st) {
      case 'REQUESTED': return 0;
      case 'ACCEPTED': return 1;
      case 'IN_PROGRESS': return 2;
      case 'COMPLETED': return 3;
      case 'RATED': return 4;
      default: return 0;
    }
  };

  const activeIdx = getIndex(currentStatus);

  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between">
        
        {/* Background Track */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-white/10 z-0">
          {/* Active Fill Line */}
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 transition-all duration-500 shadow-glow-emerald"
            style={{ width: `${(activeIdx / (STAGES.length - 1)) * 100}%` }}
          />
        </div>

        {/* Timeline Stage Points */}
        {STAGES.map((stage, idx) => {
          const isCurrent = idx === activeIdx;
          const isPassed = idx < activeIdx;

          return (
            <div key={stage.key} className="flex flex-col items-center relative z-10">
              
              {/* Point Circle */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? 'bg-emerald-500 text-dark-950 ring-4 ring-emerald-500/20 shadow-glow-emerald scale-110'
                    : isPassed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-dark-900 border border-white/20 text-slate-500'
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                ) : isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-dark-950 animate-ping" />
                ) : (
                  <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Text Label */}
              <span className={`text-[11px] font-bold mt-2 whitespace-nowrap ${
                isCurrent ? 'text-emerald-400' : isPassed ? 'text-slate-200' : 'text-slate-500'
              }`}>
                {stage.label}
              </span>

              <span className="text-[9px] text-slate-500 hidden md:block mt-0.5">
                {stage.desc}
              </span>

            </div>
          );
        })}

      </div>
    </div>
  );
}
