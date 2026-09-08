import React from 'react';
import { Clock, Calendar, Check, Power, ShieldCheck, Sparkles } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ALL_SLOTS = ['09:00 - 12:00', '14:00 - 17:00', '17:00 - 20:00'];

export function AvailabilitySchedule({ provider, onToggleStatus }) {
  const isOnline = provider?.availability?.status === 'AVAILABLE_NOW';

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
      
      {/* Live Availability Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
            isOnline ? 'bg-emerald-600 shadow-md shadow-emerald-500/20' : 'bg-slate-400'
          }`}>
            <Power className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              Instant Smart Match Mode: {isOnline ? 'ONLINE & ACTIVE' : 'OFFLINE'}
            </h4>
            <p className="text-xs text-slate-500">
              {isOnline
                ? 'Your profile receives 20/20 pts for live availability in the matching engine.'
                : 'You will only receive scheduled advance requests.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleStatus(provider.id, isOnline ? 'OFFLINE' : 'AVAILABLE_NOW')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-sm ${
            isOnline
              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
          }`}
        >
          {isOnline ? 'Go Offline' : 'Go Online (Instant Match)'}
        </button>
      </div>

      {/* Weekly Working Days */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Weekly Service Days
        </label>
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day) => {
            const isWorking = provider?.availability?.workingDays?.includes(day);
            return (
              <div
                key={day}
                className={`py-3 px-1 rounded-xl text-center text-xs font-bold border transition ${
                  isWorking
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                <div className="text-[10px] uppercase">{day}</div>
                <div className="mt-1 flex justify-center">
                  {isWorking ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <span className="text-slate-300 text-xs">—</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Time Windows */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Daily Operating Time Windows
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ALL_SLOTS.map((slot) => {
            const isSelected = provider?.availability?.slots?.includes(slot);
            return (
              <div
                key={slot}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{slot}</span>
                </div>
                {isSelected && <span className="text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded font-bold">Active</span>}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
