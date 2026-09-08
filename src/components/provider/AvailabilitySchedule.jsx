import React from 'react';
import { Clock, Calendar, Check, Power, ShieldCheck, Sparkles } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ALL_SLOTS = ['09:00 - 12:00', '14:00 - 17:00', '17:00 - 20:00'];

export function AvailabilitySchedule({ provider, onToggleStatus }) {
  const isOnline = provider?.availability?.status === 'AVAILABLE_NOW';

  return (
    <div className="rounded-3xl bg-dark-900/90 backdrop-blur-2xl p-6 sm:p-7 border border-white/10 shadow-2xl space-y-6 text-left">
      
      {/* Live Availability Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
            isOnline ? 'bg-emerald-500 text-dark-950 shadow-glow-emerald' : 'bg-white/10 text-slate-400'
          }`}>
            <Power className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="font-black text-white text-base">
              Instant Smart Match Mode: {isOnline ? 'ONLINE & ACTIVE' : 'OFFLINE'}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {isOnline
                ? 'Your profile receives full 20/20 pts for live availability in customer searches.'
                : 'You will only receive scheduled advance requests.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleStatus(provider.id, isOnline ? 'OFFLINE' : 'AVAILABLE_NOW')}
          className={`px-6 py-3 rounded-xl font-black text-xs transition shadow-lg ${
            isOnline
              ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30'
              : 'bg-emerald-500 text-dark-950 hover:bg-emerald-400 shadow-glow-emerald'
          }`}
        >
          {isOnline ? 'Go Offline' : 'Go Online (Instant Match)'}
        </button>
      </div>

      {/* Weekly Working Days */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Weekly Service Days
        </label>
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day) => {
            const isWorking = provider?.availability?.workingDays?.includes(day);
            return (
              <div
                key={day}
                className={`py-3.5 px-1 rounded-2xl text-center text-xs font-bold border transition ${
                  isWorking
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-glow-emerald'
                    : 'bg-white/[0.02] text-slate-500 border-white/[0.06]'
                }`}
              >
                <div className="text-[10px] uppercase font-mono">{day}</div>
                <div className="mt-1 flex justify-center">
                  {isWorking ? <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> : <span className="text-slate-600 text-xs">—</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Operating Time Windows */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Daily Operating Time Windows
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ALL_SLOTS.map((slot) => {
            const isSelected = provider?.availability?.slots?.includes(slot);
            return (
              <div
                key={slot}
                className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-500/10 text-white border-emerald-500/30'
                    : 'bg-white/[0.02] text-slate-400 border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono">{slot}</span>
                </div>
                {isSelected && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold font-mono">Active</span>}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
