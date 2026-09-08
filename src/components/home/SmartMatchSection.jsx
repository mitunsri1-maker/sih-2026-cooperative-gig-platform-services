import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Star, Zap, Award } from 'lucide-react';

// Animated circular score gauge
function ScoreRing({ score, size = 180, isVisible }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (isVisible ? score / 100 : 0) * circumference;

  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = null;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(ease * score));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, score]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"
        />
        {/* Score arc */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-white leading-none">{displayScore}</span>
        <span className="text-xs text-emerald-400 font-bold mt-0.5">% MATCH</span>
      </div>
    </div>
  );
}

// Match breakdown bar
function MatchBar({ label, weight, score, color, delay, isVisible }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">{label}</span>
        <span className="font-black font-mono" style={{ color }}>{weight}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: isVisible ? `${score}%` : '0%',
            background: color,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

const MATCH_PROVIDER = {
  name: 'Ravi Kumar',
  trade: 'Master Electrician',
  rating: 4.9,
  reviews: 142,
  distance: '1.8 km away',
  area: 'Anna Nagar',
  avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
  matchScore: 97,
  breakdown: [
    { label: 'Skill Match', weight: 40, score: 97, color: '#10b981' },
    { label: 'Availability', weight: 20, score: 95, color: '#22d3ee' },
    { label: 'Distance', weight: 20, score: 91, color: '#3b82f6' },
    { label: 'Rating', weight: 10, score: 98, color: '#f59e0b' },
    { label: 'Trust Index', weight: 10, score: 97, color: '#8b5cf6' },
  ],
};

const ANALYSIS_STEPS = ['Scanning local providers...', 'Checking skill match...', 'Verifying availability...', 'Calculating distance...', 'Computing trust index...', 'Match found!'];

export function SmartMatchSection({ onFindService }) {
  const [isVisible, setIsVisible] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    // Run analysis animation sequence
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnalysisStep(step);
      if (step >= ANALYSIS_STEPS.length - 1) {
        clearInterval(interval);
        setTimeout(() => setShowResult(true), 400);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Header */}
      <div className="text-center mb-14">
        <div className="section-label mx-auto mb-4">
          <span className="text-emerald-400">✦</span>
          The Core Innovation
        </div>
        <h2 className="section-heading mb-4">
          DON'T SEARCH.<br />
          <span className="text-gradient-emerald">GET MATCHED.</span>
        </h2>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          No black-box algorithms. CoServe scores every match transparently — skill fit, availability, proximity, rating, and cooperative trust index.
        </p>
      </div>

      <div className="glass-panel rounded-3xl border border-white/8 overflow-hidden">

        {/* Top: Customer Request */}
        <div className="p-6 sm:p-8 border-b border-white/[0.06]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Request card */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Zap className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Customer Request</div>
                <div className="text-xl font-black text-white">Electrical Repair</div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>📍 Anna Nagar</span>
                  <span>·</span>
                  <span>📅 Tomorrow · 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Flow indicator */}
            <div className="flex items-center gap-3">
              <div className="w-px h-8 bg-white/10 hidden md:block" />
              <div className="flex flex-col items-center gap-1 text-xs text-slate-500">
                <span>ANALYZING LOCAL NETWORK</span>
                <div className="flex gap-1">
                  {ANALYSIS_STEPS.slice(0, -1).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-6 rounded-full transition-all duration-300 ${
                        i <= analysisStep ? 'bg-emerald-400' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-emerald-400 font-bold">{ANALYSIS_STEPS[Math.min(analysisStep, ANALYSIS_STEPS.length - 1)]}</span>
              </div>
            </div>

            {/* Algorithm weights */}
            <div className="hidden lg:block text-right text-[10px] font-mono text-slate-600">
              <div>SKILL (40%) + AVAIL (20%)</div>
              <div>DIST (20%) + RATING (10%)</div>
              <div>TRUST (10%) = MATCH SCORE</div>
            </div>
          </div>
        </div>

        {/* Bottom: Match Result */}
        <div className={`p-6 sm:p-8 transition-all duration-700 ${showResult ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Provider profile */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500 text-dark-950 text-[11px] font-black uppercase tracking-widest mb-6 shadow-glow-emerald">
                ✦ Best Match Found
              </div>

              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <img
                    src={MATCH_PROVIDER.avatar}
                    alt={MATCH_PROVIDER.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white/10"
                  />
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 border-2 border-dark-900 flex items-center justify-center shadow-glow-emerald">
                    <ShieldCheck className="w-3.5 h-3.5 text-dark-950 stroke-[3]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">{MATCH_PROVIDER.name}</h3>
                  <p className="text-emerald-400 font-bold text-sm mb-2">{MATCH_PROVIDER.trade}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <strong>{MATCH_PROVIDER.rating}</strong>
                      <span className="text-slate-500">({MATCH_PROVIDER.reviews})</span>
                    </span>
                    <span className="text-slate-400">{MATCH_PROVIDER.distance}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      { label: '✓ Identity', color: 'text-blue-300 border-blue-500/30 bg-blue-500/10' },
                      { label: '✓ Skill', color: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10' },
                      { label: '★ Community', color: 'text-amber-300 border-amber-500/30 bg-amber-500/10' },
                    ].map(b => (
                      <span key={b.label} className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${b.color}`}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Breakdown bars */}
              <div className="mt-6 space-y-3">
                {MATCH_PROVIDER.breakdown.map((b, i) => (
                  <MatchBar
                    key={b.label}
                    {...b}
                    delay={showResult ? i * 150 : 0}
                    isVisible={showResult}
                  />
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={onFindService}
                  className="btn-primary flex-1 py-3 text-sm justify-center"
                >
                  Book Now →
                </button>
                <button
                  onClick={onFindService}
                  className="btn-ghost flex-1 py-3 text-sm justify-center"
                >
                  View Profile
                </button>
              </div>
            </div>

            {/* Score ring */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                {/* Glow effect behind ring */}
                <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-2xl" />
                <ScoreRing score={MATCH_PROVIDER.matchScore} size={200} isVisible={showResult} />
              </div>

              {/* Visual flow */}
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-300">
                  Customer Request
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-6 bg-gradient-to-b from-cyan-500/50 to-emerald-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="w-px h-6 bg-gradient-to-b from-emerald-500/50 to-purple-500/50" />
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-black text-emerald-300 shadow-glow-emerald">
                  CoServe Match Engine
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-6 bg-gradient-to-b from-emerald-500/50 to-amber-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <div className="w-px h-6 bg-gradient-to-b from-amber-500/50 to-white/20" />
                </div>
                <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-300">
                  {MATCH_PROVIDER.name} — 97% Match
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
