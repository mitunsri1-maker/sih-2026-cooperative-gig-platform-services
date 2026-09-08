import React, { useEffect, useRef, useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { formatINR } from '../../utils/formatters';

const ALLOCATIONS = [
  { label: 'Worker Welfare', pct: 45, color: '#10b981', desc: 'Direct grants to craftsmen in need' },
  { label: 'Skill Training', pct: 25, color: '#22d3ee', desc: 'Subsidized ITI and digital literacy' },
  { label: 'Community Initiatives', pct: 20, color: '#f59e0b', desc: 'Local employment & outreach programs' },
  { label: 'Platform Sustainability', pct: 10, color: '#8b5cf6', desc: 'Operations, support & infrastructure' },
];

function RadialChart({ isVisible, total }) {
  const size = 220;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background ring */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={strokeWidth}
        />

        {ALLOCATIONS.map((alloc, i) => {
          const segLength = (alloc.pct / 100) * circumference;
          const offset = cumulative;
          cumulative += segLength;

          return (
            <circle
              key={alloc.label}
              cx={size / 2} cy={size / 2} r={radius}
              fill="none"
              stroke={alloc.color}
              strokeWidth={strokeWidth - 2}
              strokeLinecap="butt"
              strokeDasharray={`${isVisible ? segLength - 3 : 0} ${circumference}`}
              strokeDashoffset={-offset}
              style={{ transition: `stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 250}ms` }}
              opacity={0.9}
            />
          );
        })}
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-black text-white leading-none font-mono">
          {formatINR(total)}
        </div>
        <div className="text-[10px] text-emerald-400 font-bold mt-1">Pool Balance</div>
      </div>
    </div>
  );
}

export function CommunityFundSection() {
  const { communityFund } = useAppData();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Wrapper with atmospheric purple glow */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-purple-500/15"
        style={{
          background: 'linear-gradient(135deg, rgba(109,40,217,0.12) 0%, rgba(3,5,6,0.95) 50%, rgba(5,150,105,0.08) 100%)',
        }}>

        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4" style={{ background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.25)', color: '#a78bfa' }}>
              <span>🏦</span>
              Cooperative Welfare Pool
            </div>
            <h2 className="section-heading mb-2">
              COMMUNITY POOL
            </h2>
            <div className="text-5xl font-black font-mono text-gradient-gold my-3">
              {formatINR(communityFund.totalPoolBalance)}
            </div>
            <p className="text-slate-400 text-sm">Generated through completed local services</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — Radial chart */}
            <div className="flex flex-col items-center gap-6">
              <RadialChart isVisible={isVisible} total={communityFund.totalPoolBalance} />

              {/* Legend */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                {ALLOCATIONS.map(alloc => (
                  <div key={alloc.label} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: alloc.color }} />
                    <span className="text-[10px] text-slate-400">{alloc.label}</span>
                    <span className="ml-auto text-[10px] font-black text-white">{alloc.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Allocation cards + metrics */}
            <div className="space-y-6">

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Disbursed', value: formatINR(communityFund.disbursedToDate), color: 'text-purple-400' },
                  { label: 'Beneficiaries', value: `${communityFund.beneficiaryWorkers} workers`, color: 'text-emerald-400' },
                  { label: 'Active Grants', value: communityFund.activeGrants.length, color: 'text-amber-400' },
                  { label: 'Pool Growth', value: '+12% MoM', color: 'text-cyan-400' },
                ].map(m => (
                  <div key={m.label} className="glass-panel rounded-2xl p-4 border border-white/8 text-center">
                    <div className={`text-xl font-black font-mono ${m.color}`}>{m.value}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Allocation breakdown */}
              <div className="space-y-3">
                {ALLOCATIONS.map((alloc, i) => (
                  <div key={alloc.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: alloc.color }} />
                        <span className="font-semibold text-slate-300">{alloc.label}</span>
                      </div>
                      <span className="font-black font-mono" style={{ color: alloc.color }}>{alloc.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: isVisible ? `${alloc.pct}%` : '0%',
                          background: alloc.color,
                          transitionDelay: `${400 + i * 200}ms`,
                        }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-600">{alloc.desc}</div>
                  </div>
                ))}
              </div>

              {/* Recent grant */}
              {communityFund.activeGrants.length > 0 && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/8">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Latest Grant</div>
                  <div className="text-sm font-bold text-white">{communityFund.activeGrants[0].purpose}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400">{communityFund.activeGrants[0].recipientName}</span>
                    <span className="text-sm font-black text-amber-400 font-mono">
                      {formatINR(communityFund.activeGrants[0].amount)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
