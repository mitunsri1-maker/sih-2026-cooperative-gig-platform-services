import React from 'react';
import { Clock, CheckCircle2, PlayCircle, Star, ShieldCheck } from 'lucide-react';

const STEPS = [
  { key: 'REQUESTED', label: 'Requested', icon: Clock, desc: 'Matching with provider' },
  { key: 'ACCEPTED', label: 'Accepted', icon: CheckCircle2, desc: 'Slot confirmed' },
  { key: 'IN_PROGRESS', label: 'In Progress', icon: PlayCircle, desc: 'Service underway' },
  { key: 'COMPLETED', label: 'Completed', icon: ShieldCheck, desc: 'Work done' },
  { key: 'RATED', label: 'Rated & Closed', icon: Star, desc: 'Trust loop updated' }
];

export function StatusPipeline({ currentStatus }) {
  const getStepIndex = (status) => {
    switch (status) {
      case 'REQUESTED': return 0;
      case 'ACCEPTED': return 1;
      case 'IN_PROGRESS': return 2;
      case 'COMPLETED': return 3;
      case 'RATED': return 4;
      default: return 0;
    }
  };

  const activeIndex = getStepIndex(currentStatus);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        
        {/* Connecting Progress Line */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-200 z-0">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${(activeIndex / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isPassed = idx < activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md scale-110'
                    : isPassed
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-slate-400 border-2 border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'animate-pulse' : ''}`} />
              </div>
              <span
                className={`text-[11px] font-semibold mt-2 whitespace-nowrap ${
                  isCurrent ? 'text-emerald-800 font-bold' : isPassed ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
}
