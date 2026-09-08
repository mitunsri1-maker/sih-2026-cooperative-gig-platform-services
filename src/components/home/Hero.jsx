import React from 'react';
import { ServiceNetwork } from '../three/ServiceNetwork';
import { ArrowRight, Wrench, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export function Hero({ onFindService, onBecomeProvider, selectedCategory, onSelectCategory }) {
  return (
    <section className="relative pt-6 sm:pt-10 pb-16 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Cooperative Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl text-xs font-semibold text-emerald-400 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Smart India Hackathon (SIH 2026) Platform</span>
            </div>

            {/* Dramatic Typography (Apple / Linear minimal caps) */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05]">
              LOCAL SKILLS.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                REAL DEMAND.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Find trusted local service providers through a cooperative network built around skill, availability and community.
            </p>

            {/* Dual CTAs (Stripe / Linear styled buttons) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onFindService}
                className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-sm shadow-glow-emerald hover:shadow-glow-emerald transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>Find a Service</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                type="button"
                onClick={onBecomeProvider}
                className="px-8 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold text-sm border border-white/15 backdrop-blur-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4 text-emerald-400" />
                <span>Become a Provider</span>
              </button>
            </div>

            {/* Micro Trust Proof */}
            <div className="flex items-center gap-6 pt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                85% Direct Worker Pay
              </span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                10% Community Welfare Pool
              </span>
            </div>

          </div>

          {/* Right 3D Spatial Service Network Scene */}
          <div className="lg:col-span-6 relative">
            <div className="glass-panel rounded-3xl p-2 relative">
              <ServiceNetwork
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
              />
            </div>
          </div>

        </div>

        {/* Below the Hero Stats Row */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-left space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">1,248+</div>
            <div className="text-xs text-slate-400 font-medium">Verified Providers</div>
          </div>

          <div className="text-left space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">8,420+</div>
            <div className="text-xs text-slate-400 font-medium">Services Completed</div>
          </div>

          <div className="text-left space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 tracking-tight">4.9 ★</div>
            <div className="text-xs text-slate-400 font-medium">Average Rating</div>
          </div>

          <div className="text-left space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 tracking-tight">24/7</div>
            <div className="text-xs text-slate-400 font-medium">Local Availability</div>
          </div>
        </div>

      </div>
    </section>
  );
}
