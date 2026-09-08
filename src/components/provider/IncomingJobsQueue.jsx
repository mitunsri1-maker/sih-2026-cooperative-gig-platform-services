import React from 'react';
import { formatINR } from '../../utils/formatters';
import { 
  CheckCircle2, XCircle, Clock, MapPin, Calendar, User, Sparkles, 
  AlertCircle, ShieldCheck, HeartHandshake, Phone, ArrowRight 
} from 'lucide-react';

export function IncomingJobsQueue({ incomingBookings, onAcceptJob, onDeclineJob }) {
  if (incomingBookings.length === 0) {
    return (
      <div className="rounded-3xl bg-dark-900/80 backdrop-blur-2xl p-8 text-center border border-white/10 shadow-2xl">
        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-3 shadow-glow-emerald">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-white text-sm">No Pending Job Requests</h4>
        <p className="text-xs text-slate-400 mt-1">You're all caught up! New smart-matched requests will appear here with an instant alert.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          Incoming Smart-Matched Job Requests ({incomingBookings.length})
        </h3>
        <span className="text-xs text-amber-300 font-bold bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
          Action Required
        </span>
      </div>

      <div className="space-y-4">
        {incomingBookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-3xl bg-dark-900/90 backdrop-blur-2xl p-6 border-2 border-amber-500/40 shadow-2xl space-y-4 relative overflow-hidden"
          >
            {/* Top Match Ribbon */}
            <div className="bg-amber-500 text-dark-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 absolute top-0 right-0 rounded-bl-xl flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3 h-3 fill-dark-950" />
              {booking.matchScore ? `${booking.matchScore}% Match` : 'Smart Match'}
            </div>

            {/* Customer & Location Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 pr-20">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 block mb-0.5">Booking #{booking.id}</span>
                <h4 className="text-lg font-black text-white">{booking.serviceTitle}</h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
                  <span className="flex items-center gap-1 font-semibold text-emerald-400">
                    <User className="w-3.5 h-3.5" />
                    Customer: {booking.customerName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {booking.customerAddress || 'Indiranagar, Bengaluru (1.8 km away)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Description */}
            <p className="text-xs text-slate-300 bg-white/[0.03] p-3 rounded-2xl border border-white/[0.08] leading-relaxed">
              <strong className="text-white">Customer Note:</strong> "{booking.description}"
            </p>

            {/* Requested Slot & Earnings Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Requested Slot</span>
                <span className="font-bold text-white flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {booking.scheduledDate} ({booking.scheduledSlot})
                </span>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Your 85% Take-Home Pay</span>
                <span className="text-lg font-black font-mono text-emerald-400">
                  {formatINR(booking.pricing?.providerTakeHome || Math.round((booking.pricing?.baseAmount || 500) * 0.85))}
                </span>
                <span className="text-[10px] text-amber-300 block font-semibold">
                  + ₹{booking.pricing?.coopWelfareFund || 50} added to your Community Fund pool
                </span>
              </div>
            </div>

            {/* Decision Buttons */}
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => onDeclineJob(booking.id)}
                className="px-4 py-2 rounded-xl border border-white/15 text-xs font-bold text-slate-300 hover:bg-white/[0.06] flex items-center gap-1.5 transition"
              >
                <XCircle className="w-4 h-4 text-slate-400" />
                <span>Decline</span>
              </button>

              <button
                type="button"
                onClick={() => onAcceptJob(booking.id)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 text-xs font-black shadow-glow-emerald flex items-center gap-1.5 transition transform active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                <span>Accept Job & Confirm Slot</span>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
