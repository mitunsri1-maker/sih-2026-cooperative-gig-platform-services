import React, { useState, useEffect, useRef } from 'react';

const STAGES = [
  {
    id: 'requested',
    label: 'Requested',
    icon: '📋',
    color: '#22d3ee',
    description: 'Customer submits service request with location, time, and task details.',
    detail: 'The AI engine begins scanning the local cooperative network.',
  },
  {
    id: 'matched',
    label: 'Matched',
    icon: '🎯',
    color: '#10b981',
    description: '5-pillar algorithm scores all nearby providers in milliseconds.',
    detail: 'Skill (40%) + Availability (20%) + Distance (20%) + Rating (10%) + Trust (10%)',
  },
  {
    id: 'booked',
    label: 'Booked',
    icon: '📅',
    color: '#6366f1',
    description: 'Customer reviews match score and confirms booking with one tap.',
    detail: 'Transparent pricing shown — cooperative split explained upfront.',
  },
  {
    id: 'accepted',
    label: 'Accepted',
    icon: '✅',
    color: '#f59e0b',
    description: 'Provider receives the job request and accepts from their dashboard.',
    detail: 'Customer gets instant confirmation with provider ETA.',
  },
  {
    id: 'in_progress',
    label: 'In Progress',
    icon: '⚙️',
    color: '#f97316',
    description: 'Provider marks job as started. Real-time status visible to customer.',
    detail: 'Both parties can communicate through the platform.',
  },
  {
    id: 'completed',
    label: 'Completed',
    icon: '🏆',
    color: '#34d399',
    description: 'Job done! Payment split happens automatically and instantly.',
    detail: '85% to provider wallet · 10% to community pool · 5% platform',
  },
  {
    id: 'rated',
    label: 'Rated',
    icon: '⭐',
    color: '#fbbf24',
    description: 'Both customer and provider rate each other. Trust scores update.',
    detail: 'The cooperative network gets stronger with every completed job.',
  },
];

export function JobJourneySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStage, setActiveStage] = useState(null);
  const [particlePos, setParticlePos] = useState(0);
  const sectionRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate particle along the journey
  useEffect(() => {
    if (!isVisible) return;
    let start = null;
    const duration = 4000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = ((timestamp - start) % duration) / duration;
      setParticlePos(progress);
      setActiveStage(Math.min(Math.floor(progress * STAGES.length), STAGES.length - 1));
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-label mx-auto mb-4">
            <span>🛤️</span>
            End-to-End Journey
          </div>
          <h2 className="section-heading mb-4">
            THE JOB<br />
            <span className="text-gradient-emerald">JOURNEY.</span>
          </h2>
          <p className="text-slate-400 text-base max-w-lg mx-auto">
            From request to rating — every step is transparent, verified, and community-powered.
          </p>
        </div>

        {/* Timeline — Horizontal on desktop, vertical on mobile */}
        <div className="hidden md:block">
          {/* Stages */}
          <div className="relative">
            {/* Connection track */}
            <div className="absolute top-[46px] left-[80px] right-[80px] h-0.5 bg-white/[0.06] z-0" />

            {/* Animated particle on track */}
            {isVisible && (
              <div
                className="absolute top-[42px] z-10 w-2.5 h-2.5 rounded-full shadow-glow-emerald transition-none"
                style={{
                  left: `calc(80px + ${particlePos} * (100% - 160px))`,
                  background: STAGES[activeStage || 0]?.color || '#10b981',
                  boxShadow: `0 0 12px ${STAGES[activeStage || 0]?.color || '#10b981'}`,
                  transform: 'translateX(-50%) translateY(-4px)',
                }}
              />
            )}

            <div className="grid grid-cols-7 gap-2">
              {STAGES.map((stage, i) => {
                const isActive = activeStage === i;
                const isPast = activeStage !== null && i < activeStage;

                return (
                  <div
                    key={stage.id}
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                    onMouseEnter={() => setActiveStage(i)}
                    onMouseLeave={() => {}}
                  >
                    {/* Node circle */}
                    <div
                      className={`relative w-11 h-11 rounded-full flex items-center justify-center text-lg z-10 transition-all duration-300 border-2 ${
                        isActive
                          ? 'scale-125 border-opacity-100'
                          : isPast
                          ? 'scale-110 border-opacity-50 opacity-70'
                          : 'border-white/10 opacity-50 group-hover:opacity-80 group-hover:scale-110'
                      }`}
                      style={{
                        borderColor: isActive || isPast ? stage.color : 'rgba(255,255,255,0.1)',
                        background: isActive
                          ? `${stage.color}20`
                          : isPast
                          ? `${stage.color}10`
                          : 'rgba(255,255,255,0.03)',
                        boxShadow: isActive ? `0 0 20px -5px ${stage.color}` : 'none',
                      }}
                    >
                      {stage.icon}
                      {(isActive || isPast) && (
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-30"
                          style={{ background: stage.color }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider text-center transition-all ${
                        isActive ? 'text-white scale-105' : isPast ? 'text-slate-400' : 'text-slate-600'
                      }`}
                      style={{ color: isActive ? stage.color : undefined }}
                    >
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active stage detail panel */}
          {activeStage !== null && (
            <div
              className="mt-8 p-6 rounded-2xl border transition-all duration-300"
              style={{
                borderColor: `${STAGES[activeStage].color}30`,
                background: `${STAGES[activeStage].color}08`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${STAGES[activeStage].color}20`, border: `1px solid ${STAGES[activeStage].color}30` }}
                >
                  {STAGES[activeStage].icon}
                </div>
                <div>
                  <div className="font-black text-white text-lg mb-1">{STAGES[activeStage].label}</div>
                  <p className="text-slate-300 text-sm mb-1">{STAGES[activeStage].description}</p>
                  <p className="text-slate-500 text-xs">{STAGES[activeStage].detail}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-[10px] text-slate-500">Step</div>
                  <div className="text-2xl font-black text-white font-mono">
                    {String(activeStage + 1).padStart(2, '0')}/{STAGES.length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-4">
          {STAGES.map((stage, i) => (
            <div key={stage.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 border"
                  style={{ borderColor: `${stage.color}40`, background: `${stage.color}10`, boxShadow: `0 0 10px -3px ${stage.color}` }}
                >
                  {stage.icon}
                </div>
                {i < STAGES.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent mt-2" />
                )}
              </div>
              <div className="pb-6">
                <div className="font-black text-white text-sm mb-0.5" style={{ color: stage.color }}>{stage.label}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
