import React from 'react';
import { formatINR } from '../../utils/formatters';
import { 
  CheckCircle2, XCircle, Clock, MapPin, Calendar, User, Sparkles, 
  AlertCircle, ShieldCheck, HeartHandshake, Phone
} from 'lucide-react';

export function IncomingJobsQueue({ incomingBookings, onAcceptJob, onDeclineJob }) {
  if (incomingBookings.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-xs">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-slate-800 text-sm">No Pending Job Requests</h4>
        <p className="text-xs text-slate-500 mt-1">You're all caught up! New smart-matched requests will appear here with an alert.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
          Incoming Smart-Matched Job Requests ({incomingBookings.length})
        </h3>
        <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Action Required
        </span>
      </div>

      <div className="space-y-4">
        {incomingBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-300 shadow-md space-y-4 relative overflow-hidden"
          >
            {/* Top Match Ribbon */}
            <div className="bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 absolute top-0 right-0 rounded-bl-xl flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {booking.matchScore ? `${booking.matchScore}% Match` : 'Smart Match'}
            </div>

            {/* Customer & Location Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 pr-20">
              <div>
                <span className="text-xs font-black text-slate-400 block mb-0.5">Booking #{booking.id}</span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">{booking.serviceTitle}</h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    {booking.customerName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {booking.customerAddress || 'Indiranagar, Bengaluru'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 leading-relaxed">
              <strong>Customer Note:</strong> "{booking.description}"
            </p>

            {/* Time & Cooperative Payout Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 block text-[10px] font-semibold uppercase">Requested Slot</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {booking.scheduledDate} ({booking.scheduledSlot})
                </span>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="text-slate-500 block text-[10px] font-semibold uppercase">Your 85% Take-Home Pay</span>
                <span className="text-base font-extrabold text-emerald-700">
                  {formatINR(booking.pricing?.providerTakeHome || Math.round((booking.pricing?.baseAmount || 500) * 0.85))}
                </span>
                <span className="text-[10px] text-emerald-800 block">
                  + ₹{booking.pricing?.coopWelfareFund || 50} added to your Community Fund
                </span>
              </div>
            </div>

            {/* Decision Buttons */}
            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => onDeclineJob(booking.id)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition"
              >
                <XCircle className="w-4 h-4 text-slate-400" />
                <span>Decline</span>
              </button>

              <button
                type="button"
                onClick={() => onAcceptJob(booking.id)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition transform active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Accept Job & Confirm Slot</span>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
