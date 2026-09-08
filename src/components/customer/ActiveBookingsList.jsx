import React, { useState } from 'react';
import { JobTimeline } from '../common/JobTimeline';
import { EarningsFlow } from '../common/EarningsFlow';
import { RatingModal } from './RatingModal';
import { Modal } from '../common/Modal';
import { MatchScore } from '../common/MatchScore';
import { formatINR } from '../../utils/formatters';
import { 
  Calendar, Clock, MapPin, User, Star, ShieldCheck, HeartHandshake,
  Receipt, ArrowRight, CheckCircle2, Phone, Sparkles
} from 'lucide-react';

export function ActiveBookingsList({ bookings, onRateBooking, onNewRequestClick }) {
  const [selectedRatingBooking, setSelectedRatingBooking] = useState(null);
  const [receiptBooking, setReceiptBooking] = useState(null);

  if (bookings.length === 0) {
    return (
      <div className="rounded-3xl bg-dark-900/80 backdrop-blur-2xl p-12 text-center border border-white/10 shadow-2xl max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto shadow-glow-emerald">
          <HeartHandshake className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">No Active Service Bookings</h3>
        <p className="text-slate-400 text-xs max-w-sm mx-auto">
          Ready to hire a verified local cooperative electrician, plumber, cleaner or carpenter?
        </p>
        <button
          type="button"
          onClick={onNewRequestClick}
          className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 text-xs font-black shadow-glow-emerald"
        >
          Find a Service Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Your Service Bookings</h2>
          <p className="text-xs text-slate-400">Track real-time status pipelines, review cooperative splits, and rate completed work.</p>
        </div>
        <button
          type="button"
          onClick={onNewRequestClick}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-dark-950 rounded-2xl text-xs font-black shadow-glow-emerald flex items-center gap-1.5 transition"
        >
          <span>+ Request New Service</span>
        </button>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => {
          const isCompleted = booking.status === 'COMPLETED';
          const isRated = booking.status === 'RATED';

          return (
            <div
              key={booking.id}
              className="rounded-3xl bg-dark-900/80 backdrop-blur-2xl p-6 sm:p-7 border border-white/10 shadow-2xl space-y-5 relative overflow-hidden"
            >
              {/* Header: ID, Date, Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black px-2.5 py-1 bg-white/10 text-white rounded-lg border border-white/10">
                    {booking.id}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {booking.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    {booking.scheduledDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    {booking.scheduledSlot}
                  </span>
                </div>
              </div>

              {/* Service Title & Craftsman Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2 space-y-2">
                  <h3 className="text-lg sm:text-xl font-black text-white">{booking.serviceTitle}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-2xl border border-white/[0.06]">
                    "{booking.description}"
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-200">
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      Craftsman: <strong className="text-white">{booking.providerName}</strong>
                    </span>
                    {booking.matchScore && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">
                        {booking.matchScore}% Match
                      </span>
                    )}
                  </div>
                </div>

                {/* Amount & Actions Box */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Booking Value</span>
                    <span className="text-2xl font-black font-mono text-white">{formatINR(booking.pricing?.baseAmount || 600)}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                      Co-op Welfare Pool: {formatINR(booking.pricing?.coopWelfareFund || 60)}
                    </span>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setReceiptBooking(booking)}
                      className="w-full text-center py-2 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-bold text-slate-200 hover:bg-white/[0.08] flex items-center justify-center gap-1.5 transition"
                    >
                      <Receipt className="w-3.5 h-3.5 text-slate-400" />
                      <span>View Split Receipt</span>
                    </button>

                    {isCompleted && (
                      <button
                        type="button"
                        onClick={() => setSelectedRatingBooking(booking)}
                        className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 text-xs font-black shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 animate-pulse"
                      >
                        <Star className="w-4 h-4 fill-dark-950" />
                        <span>Rate & Boost Provider</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Animated 5-Step Pipeline */}
              <div className="pt-3 border-t border-white/10">
                <JobTimeline currentStatus={booking.status} />
              </div>

              {/* Already Rated Feedback Banner */}
              {isRated && booking.rating && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5 text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">You rated this service {booking.rating} / 5 Stars</span>
                    <p className="text-slate-300 text-[11px] mt-0.5 italic">"{booking.review}"</p>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Rating Modal */}
      {selectedRatingBooking && (
        <RatingModal
          isOpen={!!selectedRatingBooking}
          booking={selectedRatingBooking}
          onClose={() => setSelectedRatingBooking(null)}
          onSubmitRating={onRateBooking}
        />
      )}

      {/* Split Receipt Modal */}
      {receiptBooking && (
        <Modal
          isOpen={!!receiptBooking}
          onClose={() => setReceiptBooking(null)}
          title={`Cooperative Transparency Receipt #${receiptBooking.id}`}
        >
          <div className="space-y-4">
            <EarningsFlow amount={receiptBooking.pricing?.baseAmount || 600} isReceipt={true} />
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setReceiptBooking(null)}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
