import React, { useState } from 'react';
import { StatusPipeline } from '../common/StatusPipeline';
import { getStatusBadgeInfo, formatINR } from '../../utils/formatters';
import { RatingModal } from './RatingModal';
import { EarningsSplitCard } from '../common/EarningsSplitCard';
import { Modal } from '../common/Modal';
import { 
  Calendar, Clock, MapPin, User, Star, ShieldCheck, HeartHandshake,
  Receipt, ArrowRight, CheckCircle2, Phone, AlertCircle
} from 'lucide-react';

export function ActiveBookingsList({ bookings, onRateBooking, onNewRequestClick }) {
  const [selectedRatingBooking, setSelectedRatingBooking] = useState(null);
  const [receiptBooking, setReceiptBooking] = useState(null);

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <HeartHandshake className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No Active Service Bookings</h3>
        <p className="text-slate-500 text-xs max-w-sm mx-auto">
          Ready to hire a verified local cooperative electrician, plumber, cleaner or carpenter?
        </p>
        <button
          onClick={onNewRequestClick}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
        >
          Find a Service Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Your Service Bookings</h2>
          <p className="text-xs text-slate-500">Track real-time status pipelines, review cooperative splits, and rate completed work.</p>
        </div>
        <button
          onClick={onNewRequestClick}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5"
        >
          <span>+ Request New Service</span>
        </button>
      </div>

      <div className="space-y-5">
        {bookings.map((booking) => {
          const statusInfo = getStatusBadgeInfo(booking.status);
          const isCompleted = booking.status === 'COMPLETED';
          const isRated = booking.status === 'RATED';

          return (
            <div
              key={booking.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 relative overflow-hidden"
            >
              {/* Header: ID, Date, Status Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2.5 py-1 bg-slate-900 text-white rounded-lg">
                    {booking.id}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusInfo.color} flex items-center gap-1.5`}>
                    <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`}></span>
                    {statusInfo.label}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {booking.scheduledDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {booking.scheduledSlot}
                  </span>
                </div>
              </div>

              {/* Service Title & Provider Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">{booking.serviceTitle}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{booking.description}"
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Assigned Craftsman: <strong className="text-slate-900">{booking.providerName}</strong></span>
                    {booking.matchScore && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                        {booking.matchScore}% Match
                      </span>
                    )}
                  </div>
                </div>

                {/* Amount & Quick Actions */}
                <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Total Booking Value</span>
                    <span className="text-xl font-black text-slate-900">{formatINR(booking.pricing?.baseAmount || 600)}</span>
                    <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5">
                      Co-op Welfare Pool: {formatINR(booking.pricing?.coopWelfareFund || 60)}
                    </span>
                  </div>

                  <div className="pt-3 flex flex-col gap-2">
                    <button
                      onClick={() => setReceiptBooking(booking)}
                      className="w-full text-center py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1"
                    >
                      <Receipt className="w-3.5 h-3.5 text-slate-500" />
                      <span>View Split Receipt</span>
                    </button>

                    {isCompleted && (
                      <button
                        onClick={() => setSelectedRatingBooking(booking)}
                        className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 animate-pulse"
                      >
                        <Star className="w-4 h-4 fill-white" />
                        <span>Rate & Boost Provider</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 5-Step Live Pipeline */}
              <div className="pt-2 border-t border-slate-100">
                <StatusPipeline currentStatus={booking.status} />
              </div>

              {/* Already Rated Feedback Badge */}
              {isRated && booking.rating && (
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-2.5 text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-950">You rated this job {booking.rating} / 5 Stars</span>
                    <p className="text-emerald-800 text-[11px] mt-0.5 italic">"{booking.review}"</p>
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

      {/* Receipt Modal */}
      {receiptBooking && (
        <Modal
          isOpen={!!receiptBooking}
          onClose={() => setReceiptBooking(null)}
          title={`Cooperative Invoice #${receiptBooking.id}`}
        >
          <div className="space-y-4">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-800">Service: </span>
              {receiptBooking.serviceTitle}
            </div>
            <EarningsSplitCard amount={receiptBooking.pricing?.baseAmount || 600} isReceipt={true} showComparison={true} />
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setReceiptBooking(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
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
