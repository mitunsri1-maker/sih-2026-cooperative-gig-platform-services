import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { EarningsSplitCard } from '../common/EarningsSplitCard';
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
        particleCount: 100,
        spread: 70,
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
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Thank You for Supporting Local Cooperatives!</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your {rating}★ review has dynamically boosted <strong>{booking.providerName}</strong>'s Trust Index. ₹{booking.pricing?.coopWelfareFund || 60} has been officially pooled into the worker welfare vault!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Header & Target Provider */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Job: {booking.serviceTitle}</h4>
              <p className="text-xs text-slate-500">Provider: <strong className="text-slate-800">{booking.providerName}</strong> • ID: {booking.id}</p>
            </div>
          </div>

          {/* Star Rating Selector */}
          <div className="text-center space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Experience Rating (Feeds into Provider Trust Score)
            </label>
            <div className="flex items-center justify-center gap-2">
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
                    className={`w-8 h-8 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-500 drop-shadow-xs'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-emerald-700">
              {rating === 5 ? '⭐ Exceptional (Max Trust Boost)' : rating === 4 ? '👍 Very Good' : rating === 3 ? '👌 Average' : '⚠️ Needs Improvement'}
            </span>
          </div>

          {/* Compliment Badges */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              What went well? (Peer Endorsements)
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
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {comp}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Review & Feedback for Cooperative Community
            </label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share honest feedback to help fellow neighbors..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 bg-white"
            />
          </div>

          {/* Final Receipt with Cooperative Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Payment & Welfare Breakdown Receipt
            </h4>
            <EarningsSplitCard amount={booking.pricing?.baseAmount || 600} isReceipt={true} showComparison={false} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Rating & Close Loop</span>
            </button>
          </div>

        </form>
      )}
    </Modal>
  );
}
