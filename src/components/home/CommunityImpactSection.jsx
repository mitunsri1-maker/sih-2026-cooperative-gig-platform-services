import React, { useEffect, useRef, useState } from 'react';

const PILLARS = [
  {
    id: 'customers',
    title: 'CUSTOMERS',
    icon: '👤',
    color: '#22d3ee',
    borderColor: 'border-cyan-500/25',
    bg: 'bg-cyan-500/8',
    glowShadow: 'shadow-glow-cyan',
    benefits: [
      '✓ Verified, trusted providers',
      '✓ Transparent pricing',
      '✓ Smarter, faster discovery',
      '✓ Guaranteed quality',
    ],
  },
  {
    id: 'workers',
    title: 'WORKERS',
    icon: '🔧',
    color: '#10b981',
    borderColor: 'border-emerald-500/25',
    bg: 'bg-emerald-500/8',
    glowShadow: 'shadow-glow-emerald',
    benefits: [
      '✓ More job opportunities',
      '✓ 85% direct earnings',
      '✓ Skill recognition & badges',
      '✓ Community welfare safety net',
    ],
  },
  {
    id: 'community',
    title: 'COMMUNITY',
    icon: '🌱',
    color: '#f59e0b',
    borderColor: 'border-amber-500/25',
    bg: 'bg-amber-500/8',
    glowShadow: 'shadow-glow-gold',
    benefits: [
      '✓ Local employment generation',
      '✓ 10% community welfare pool',
      '✓ Skill development programs',
      '✓ Stronger local economy',
    ],
  },
];

function ConnectionSVG({ isVisible }) {
  return (
    <div className="relative flex items-center justify-center my-8 overflow-hidden" style={{ height: 120 }}>
      <svg
        viewBox="0 0 800 120"
        className="w-full max-w-2xl"
        style={{ overflow: 'visible' }}
      >
        {/* Lines from pillars to center CoServe node */}
        {[
          { x1: 80, y1: 30, x2: 400, y2: 60, color: '#22d3ee' },
          { x1: 400, y1: 10, x2: 400, y2: 60, color: '#10b981' },
          { x1: 720, y1: 30, x2: 400, y2: 60, color: '#f59e0b' },
        ].map((line, i) => (
          <g key={i}>
            <line
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2"
            />
            {isVisible && (
              <line
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                stroke={line.color}
                strokeWidth="2"
                strokeOpacity="0.6"
                strokeDasharray="6 80"
                style={{
                  animation: `particle-flow ${2 + i * 0.4}s linear infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            )}
          </g>
        ))}

        {/* Center CoServe node */}
        <circle cx="400" cy="60" r="28" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
        <circle cx="400" cy="60" r="18" fill="rgba(16,185,129,0.3)" />
        <circle cx="400" cy="60" r="8" fill="#10b981" />
        {isVisible && (
          <circle cx="400" cy="60" r="26" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5">
            <animate attributeName="r" values="26;38;26" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        )}

        {/* CoServe label */}
        <text x="400" y="104" textAnchor="middle" fontSize="10" fontWeight="800" fill="#34d399" letterSpacing="0.08em">
          CoServe
        </text>
      </svg>
    </div>
  );
}

export function CommunityImpactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cooperative-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dots opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label mx-auto mb-4">
            <span>🌐</span>
            Cooperative Impact
          </div>
          <h2 className="section-heading mb-4">
            ONE SERVICE.<br />
            <span className="text-gradient-emerald">A BIGGER IMPACT.</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            CoServe creates a win-win-win ecosystem where every transaction benefits three stakeholder groups simultaneously.
          </p>
        </div>

        {/* Connection SVG */}
        <ConnectionSVG isVisible={isVisible} />

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.id}
              className={`rounded-3xl p-7 border ${pillar.borderColor} ${pillar.bg} ${pillar.glowShadow} space-y-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Icon + Title */}
              <div className="text-4xl mb-2">{pillar.icon}</div>
              <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: pillar.color }}>
                {pillar.title}
              </h3>

              {/* Benefits */}
              <ul className="space-y-2.5">
                {pillar.benefits.map((b) => (
                  <li key={b} className="text-sm text-slate-300 leading-snug">{b}</li>
                ))}
              </ul>

              {/* Bottom accent */}
              <div className="pt-3 border-t border-white/[0.06]">
                <div
                  className="h-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${pillar.color}, transparent)`,
                    width: isVisible ? '100%' : '0%',
                    transition: 'width 1.2s ease-out',
                    transitionDelay: `${400 + i * 150}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Story summary */}
        <div className="mt-12 glass-panel rounded-3xl p-6 sm:p-8 border border-white/8 text-center">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            <span className="text-white font-bold">Customer needs a service</span>
            <span className="text-slate-500 mx-2">→</span>
            <span className="text-cyan-400 font-bold">CoServe finds the best local match</span>
            <span className="text-slate-500 mx-2">→</span>
            <span className="text-white font-bold">Worker gets paid fairly</span>
            <span className="text-slate-500 mx-2">→</span>
            <span className="text-amber-400 font-bold">Community pool grows</span>
            <span className="text-slate-500 mx-2">→</span>
            <span className="text-emerald-400 font-bold">Network becomes stronger</span>
          </p>
        </div>
      </div>
    </section>
  );
}
