import React, { useState, useEffect, useRef } from 'react';
import { ServiceNetwork } from '../three/ServiceNetwork';
import { ArrowRight, Wrench, ShieldCheck, HeartHandshake, Zap, Star, MapPin } from 'lucide-react';

// Animated number counter hook
function useCountUp(target, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

const STATS = [
  { value: 1248, suffix: '+', label: 'Verified Providers', color: 'text-white' },
  { value: 8420, suffix: '+', label: 'Services Completed', color: 'text-emerald-400' },
  { value: 49, suffix: '★', label: 'Average Rating', color: 'text-amber-400', decimal: true },
  { value: 168, suffix: '', label: 'Providers Online', color: 'text-cyan-400' },
];

export function Hero({ onFindService, onBecomeProvider, selectedCategory, onSelectCategory }) {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const count0 = useCountUp(1248, 2000, statsVisible);
  const count1 = useCountUp(8420, 2200, statsVisible);
  const count2 = useCountUp(168, 1800, statsVisible);

  return (
    <section className="relative pt-8 sm:pt-14 pb-20 overflow-hidden">

      {/* Multi-layer atmospheric background */}
      <div className="absolute inset-0 bg-cooperative-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT — Hero Text */}
          <div className="lg:col-span-6 space-y-7">

            {/* SIH Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-emerald-500/20 backdrop-blur-xl shadow-xl">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] font-black tracking-widest text-emerald-400 uppercase">
                SIH 2026 · Cooperative Services Network
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[1.02]">
                LOCAL SKILLS.
              </h1>
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight leading-[1.02]">
                <span className="text-gradient-emerald">REAL DEMAND.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-lg font-normal leading-relaxed">
              One trusted network connecting local customers with verified skills, 
              fair pricing and community-powered opportunities.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onFindService}
                className="btn-primary group"
              >
                <span>Find a Service</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={onBecomeProvider}
                className="btn-ghost group"
              >
                <Wrench className="w-4 h-4 text-emerald-400" />
                <span>Join the Cooperative</span>
              </button>
            </div>

            {/* Trust Pills */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {[
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: 'Verified Workers', color: 'text-emerald-400' },
                { icon: <HeartHandshake className="w-3.5 h-3.5" />, text: 'Fair Pay (85%)', color: 'text-amber-400' },
                { icon: <MapPin className="w-3.5 h-3.5" />, text: 'Local First', color: 'text-cyan-400' },
              ].map((pill) => (
                <div key={pill.text} className={`flex items-center gap-1.5 text-xs font-semibold ${pill.color}`}>
                  <span className="text-current">✓</span>
                  {pill.text}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — 3D Service Network */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Premium frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 blur-xl" />
              <div className="relative glass-panel rounded-3xl p-2 border border-white/10">
                <ServiceNetwork
                  selectedCategory={selectedCategory}
                  onSelectCategory={onSelectCategory}
                />
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -left-4 top-8 hidden xl:block">
              <div className="glass-panel rounded-2xl p-3 border border-emerald-500/20 shadow-glow-emerald animate-float-slow">
                <div className="text-[10px] text-slate-400 font-semibold">Available Now</div>
                <div className="text-sm font-black text-emerald-400">168 Providers</div>
              </div>
            </div>
            <div className="absolute -right-4 bottom-16 hidden xl:block">
              <div className="glass-panel rounded-2xl p-3 border border-amber-500/20 shadow-glow-gold animate-float-delayed">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="text-sm font-black">4.9</span>
                </div>
                <div className="text-[10px] text-slate-400">Avg Rating</div>
              </div>
            </div>
            <div className="absolute -left-2 bottom-8 hidden xl:block">
              <div className="glass-panel rounded-2xl p-3 border border-cyan-500/20 shadow-glow-cyan animate-float-delayed-2">
                <div className="text-[10px] text-slate-400 font-semibold">Response Time</div>
                <div className="text-sm font-black text-cyan-400">≤ 15 min</div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="mt-16 pt-10 border-t border-white/[0.07] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
              {statsVisible ? count0.toLocaleString() : '0'}+
            </div>
            <div className="text-xs text-slate-400 font-medium">Verified Providers</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tracking-tight">
              {statsVisible ? count1.toLocaleString() : '0'}+
            </div>
            <div className="text-xs text-slate-400 font-medium">Services Completed</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400 tracking-tight">
              4.9 ★
            </div>
            <div className="text-xs text-slate-400 font-medium">Average Rating</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-400 tracking-tight">
              {statsVisible ? count2 : '0'}
            </div>
            <div className="text-xs text-slate-400 font-medium">Providers Online Now</div>
          </div>
        </div>
      </div>
    </section>
  );
}
