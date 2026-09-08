import React, { useState, useEffect, useRef } from 'react';

// Animated particle flowing from one point to another along a path
function FlowParticle({ d, color, duration, delay }) {
  return (
    <>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.15" />
      <circle r="4" fill={color} opacity="0.9">
        <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
          <mpath href={`#flow-${d.slice(0, 10).replace(/\s/g, '')}`} />
        </animateMotion>
      </circle>
      <path id={`flow-${d.slice(0, 10).replace(/\s/g, '')}`} d={d} />
    </>
  );
}

const SPLIT = [
  {
    key: 'worker',
    label: 'Provider Earnings',
    pct: 85,
    amount: '₹425',
    color: '#10b981',
    borderColor: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    desc: 'Direct to the craftsman\'s wallet — no holds, no delays.',
    icon: '👷',
  },
  {
    key: 'community',
    label: 'Community Fund',
    pct: 10,
    amount: '₹50',
    color: '#f59e0b',
    borderColor: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    desc: 'Pooled for tool grants, medical welfare, skill training.',
    icon: '🤝',
  },
  {
    key: 'platform',
    label: 'Platform',
    pct: 5,
    amount: '₹25',
    color: '#6366f1',
    borderColor: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
    desc: 'Server, verification ops, and platform sustainability.',
    icon: '⚙️',
  },
];

export function MoneyFlowSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [barWidths, setBarWidths] = useState([0, 0, 0]);
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
    setTimeout(() => setBarWidths([85, 10, 5]), 300);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Header */}
      <div className="text-center mb-14">
        <div className="section-label mx-auto mb-4">
          <span>💰</span>
          Cooperative Economics
        </div>
        <h2 className="section-heading mb-4">
          YOUR PAYMENT<br />
          <span className="text-gradient-gold">BUILDS MORE THAN A JOB.</span>
        </h2>
        <p className="text-slate-400 text-base max-w-lg mx-auto">
          Every completed service contributes to a stronger, more equitable local network.
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/8 mb-8">

        {/* Top: Customer Payment */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="px-6 py-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Customer</div>
              <div className="text-3xl font-black text-gradient-gold">₹500</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Service Payment</div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-cyan-500/50 to-white/20" />
            {/* SVG particle animation */}
            <svg width="40" height="20" viewBox="0 0 40 20" className="overflow-visible">
              <path d="M 20 0 L 20 20" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
              <circle cx="20" cy="0" r="3" fill="#22d3ee" opacity="0.8">
                <animate attributeName="cy" values="0;20;0" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>

        {/* Middle: Cooperative Hub */}
        <div className="flex justify-center mb-8">
          <div className="px-8 py-4 rounded-2xl bg-white/[0.04] border border-white/15 text-center shadow-glass-3d">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Cooperative</div>
            <div className="text-base font-black text-white">Smart Distribution</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">85 / 10 / 5 split</div>
          </div>
        </div>

        {/* Bottom: Three branches */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {SPLIT.map((branch, i) => (
            <div
              key={branch.key}
              className={`rounded-2xl p-5 border ${branch.borderColor} ${branch.bg} text-center space-y-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className="text-3xl">{branch.icon}</div>
              <div className="text-2xl font-black font-mono" style={{ color: branch.color }}>
                {branch.amount}
              </div>
              <div className="text-xs font-black text-white uppercase tracking-wider">{branch.label}</div>
              <div className="text-[10px] text-slate-400 leading-relaxed">{branch.desc}</div>

              {/* Percentage bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Share</span>
                  <span className="font-black" style={{ color: branch.color }}>{branch.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1200"
                    style={{
                      width: `${barWidths[i]}%`,
                      background: branch.color,
                      transitionDelay: `${500 + i * 200}ms`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* vs Aggregator comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="glass-panel rounded-2xl p-5 border border-white/8">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Traditional Gig Platform</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Worker earnings</span>
              <span className="font-black text-rose-400">60–70%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Community fund</span>
              <span className="font-black text-rose-400">0%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Platform cut</span>
              <span className="font-black text-rose-400">30–40%</span>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 shadow-glow-emerald">
          <div className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-3">CoServe Cooperative Model</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Worker earnings</span>
              <span className="font-black text-emerald-400">85%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Community fund</span>
              <span className="font-black text-amber-400">10%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Platform</span>
              <span className="font-black text-slate-300">5%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
