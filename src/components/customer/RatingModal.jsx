import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { EarningsFlow } from '../common/EarningsFlow';
import { Star, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2, ThumbsUp } from 'lucide-react';
import confetti from 'canvas-confetti';

const COMPLIMENTS = [
  'Punctual & On-Time',
  'Expert Diagnosis',
  'Clean & Tidy Work',
  'Polite & Transparent',
  'Fair Cooperative Rate',
  'Safety Protocol Followed'
];

export function RatingModal({ booking, isOpen, onClose, onSubmitRating }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('Outstanding service! Arrived right on time, diagnosed the issue quickly and explained everything clearly.');
  const [selectedCompliments, setSelectedCompliments] = useState(['Punctual & On-Time', 'Expert Diagnosis']);
  const [submitted, setSubmitted] = useState(false);

  if (!booking) return null;

  const toggleCompliment = (comp) => {
    setSelectedCompliments(prev => 
      prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setSubmitted(true);
    setTimeout(() => {
      onSubmitRating(booking.id, rating, reviewText);
      onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rate Service & Close Trust Feedback Loop" maxWidth="max-w-2xl">
      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto animate-bounce shadow-glow-emerald">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-white">Thank You for Supporting Local Cooperatives!</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Your {rating}★ review has dynamically boosted <strong>{booking.providerName}</strong>'s Trust Index. ₹{booking.pricing?.coopWelfareFund || 60} has been officially pooled into the worker welfare vault!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          
          {/* Header & Target Provider */}
          <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Job: {booking.serviceTitle}</h4>
              <p className="text-xs text-slate-400">Craftsman: <strong className="text-emerald-400">{booking.providerName}</strong> • Booking #{booking.id}</p>
            </div>
          </div>

          {/* Star Rating Selector */}
          <div className="text-center space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              How was your experience? (Dynamically updates provider trust)
            </label>
            <div className="flex items-center justify-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1.5 transition transform hover:scale-125 focus:outline-hidden"
                >
                  <Star
                    className={`w-9 h-9 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : 'text-white/10'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-emerald-400 block pt-1">
              {rating === 5 ? '⭐ Exceptional (Max Trust Boost)' : rating === 4 ? '👍 Very Good' : rating === 3 ? '👌 Average' : '⚠️ Needs Improvement'}
            </span>
          </div>

          {/* Compliment Badges */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Peer Endorsements & Badges
            </label>
            <div className="flex flex-wrap gap-2">
              {COMPLIMENTS.map((comp) => {
                const isSelected = selectedCompliments.includes(comp);
                return (
                  <button
                    key={comp}
                    type="button"
                    onClick={() => toggleCompliment(comp)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-emerald-500 text-dark-950 font-black shadow-glow-emerald'
                        : 'bg-white/[0.04] text-slate-300 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {comp}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Field */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Review & Community Feedback
            </label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share honest feedback to help fellow neighbors..."
              className="w-full px-3.5 py-2.5 rounded-2xl glass-input text-xs focus:border-emerald-500"
            />
          </div>

          {/* Payment Flow Breakdown */}
          <div>
            <EarningsFlow amount={booking.pricing?.baseAmount || 600} isReceipt={true} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/15 text-xs font-bold text-slate-300 hover:bg-white/[0.06]"
            >
              Skip
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 text-xs font-black shadow-glow-emerald flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>Submit Rating</span>
            </button>
          </div>

        </form>
      )}
    </Modal>
  );
}
