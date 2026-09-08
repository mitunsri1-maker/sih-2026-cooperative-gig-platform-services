import React, { useState, useEffect, useRef } from 'react';

const LIVE_EVENTS = [
  { id: 1, text: 'Ravi accepted an electrical job', color: '#f59e0b', dot: 'bg-amber-400' },
  { id: 2, text: 'Priya booked home deep cleaning', color: '#10b981', dot: 'bg-emerald-400' },
  { id: 3, text: 'Arjun completed plumbing repair', color: '#06b6d4', dot: 'bg-cyan-400' },
  { id: 4, text: '₹850 added to community pool', color: '#34d399', dot: 'bg-emerald-300' },
  { id: 5, text: 'Suresh verified — Electrician', color: '#8b5cf6', dot: 'bg-purple-400' },
  { id: 6, text: 'Deepa rated AC Service 5★', color: '#fbbf24', dot: 'bg-amber-300' },
  { id: 7, text: 'New job: Carpentry in Adyar', color: '#f97316', dot: 'bg-orange-400' },
  { id: 8, text: '₹1200 paid to Karthik (Plumber)', color: '#34d399', dot: 'bg-emerald-400' },
];

// Abstract SVG city grid with animated network nodes
function NetworkMap({ isVisible }) {
  const nodes = [
    { id: 'hub', x: 400, y: 240, r: 24, color: '#10b981', label: 'CoServe Hub', type: 'hub' },
    // Customer nodes
    { id: 'c1', x: 120, y: 120, r: 12, color: '#22d3ee', label: 'Customer', type: 'customer' },
    { id: 'c2', x: 680, y: 100, r: 12, color: '#22d3ee', label: 'Customer', type: 'customer' },
    { id: 'c3', x: 160, y: 360, r: 12, color: '#22d3ee', label: 'Customer', type: 'customer' },
    { id: 'c4', x: 700, y: 380, r: 12, color: '#22d3ee', label: 'Customer', type: 'customer' },
    // Provider nodes
    { id: 'p1', x: 240, y: 180, r: 10, color: '#f59e0b', label: '⚡ Ravi', type: 'provider' },
    { id: 'p2', x: 560, y: 160, r: 10, color: '#06b6d4', label: '🔧 Suresh', type: 'provider' },
    { id: 'p3', x: 280, y: 320, r: 10, color: '#10b981', label: '✨ Priya', type: 'provider' },
    { id: 'p4', x: 580, y: 320, r: 10, color: '#8b5cf6', label: '🛠️ Anand', type: 'provider' },
    { id: 'p5', x: 440, y: 370, r: 10, color: '#f97316', label: '🪑 Karthik', type: 'provider' },
  ];

  const connections = [
    { from: 'hub', to: 'p1' }, { from: 'hub', to: 'p2' },
    { from: 'hub', to: 'p3' }, { from: 'hub', to: 'p4' },
    { from: 'hub', to: 'p5' },
    { from: 'c1', to: 'hub' }, { from: 'c2', to: 'hub' },
    { from: 'c3', to: 'hub' }, { from: 'c4', to: 'hub' },
  ];

  const getNode = (id) => nodes.find(n => n.id === id);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/8">
      {/* Grid backdrop */}
      <div className="absolute inset-0 bg-grid-dots opacity-30" />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.05) 0%, transparent 60%)' }} />

      <svg
        viewBox="0 0 800 480"
        className="w-full h-auto"
        style={{ minHeight: '260px' }}
      >
        {/* Connection lines */}
        {connections.map((conn, i) => {
          const from = getNode(conn.from);
          const to = getNode(conn.to);
          if (!from || !to) return null;
          return (
            <g key={i}>
              <line
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.5"
              />
              {isVisible && (
                <line
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={to.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  strokeDasharray="8 120"
                  style={{
                    animation: `particle-flow ${2.5 + i * 0.3}s linear infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Glow ring */}
            <circle
              cx={node.x} cy={node.y}
              r={node.r * 2.2}
              fill={node.color}
              opacity={node.type === 'hub' ? 0.08 : 0.05}
            />
            {/* Outer ring */}
            <circle
              cx={node.x} cy={node.y}
              r={node.r * 1.6}
              fill="none"
              stroke={node.color}
              strokeWidth="1"
              opacity={0.3}
              style={isVisible && node.type === 'hub' ? { animation: 'ring-pulse 2s ease-in-out infinite' } : {}}
            />
            {/* Node */}
            <circle cx={node.x} cy={node.y} r={node.r} fill={node.color} opacity={0.9} />
            {/* Label */}
            <text
              x={node.x}
              y={node.y + node.r + 14}
              textAnchor="middle"
              fontSize={node.type === 'hub' ? 11 : 9}
              fontWeight={node.type === 'hub' ? 800 : 600}
              fill={node.type === 'hub' ? '#34d399' : '#64748b'}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function LiveNetworkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="section-label mx-auto mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Local Network
        </div>
        <h2 className="section-heading mb-4">
          YOUR NEIGHBORHOOD.<br />
          <span className="text-gradient-emerald">YOUR NETWORK.</span>
        </h2>
        <p className="text-slate-400 text-base max-w-lg mx-auto">
          Every booking strengthens the local ecosystem — connecting people, skills, and trust.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Left — Network Map */}
        <div className="lg:col-span-2">
          <div className="glass-panel rounded-3xl p-4 border border-white/8">
            <NetworkMap isVisible={isVisible} />

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 pt-4 text-xs">
              {[
                { color: 'bg-cyan-400', label: 'Customer' },
                { color: 'bg-emerald-400', label: 'CoServe Hub' },
                { color: 'bg-amber-400', label: 'Service Provider' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-1.5 text-slate-400">
                  <span className={`w-2 h-2 rounded-full ${item.color}`} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Live Activity Feed */}
        <div className="glass-panel rounded-3xl p-5 border border-emerald-500/15 h-full">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black text-white tracking-widest uppercase">Live Network</span>
            <span className="ml-auto text-[10px] text-emerald-400 font-mono">● LIVE</span>
          </div>

          <div className="space-y-2.5">
            {LIVE_EVENTS.map((event, i) => {
              const isActive = i === currentEventIndex;
              const isRecent = (i === (currentEventIndex - 1 + LIVE_EVENTS.length) % LIVE_EVENTS.length)
                || (i === (currentEventIndex - 2 + LIVE_EVENTS.length) % LIVE_EVENTS.length);

              return (
                <div
                  key={event.id}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-500 ${
                    isActive
                      ? 'bg-white/[0.06] border border-white/10 scale-[1.02]'
                      : isRecent
                      ? 'bg-white/[0.03] border border-transparent opacity-70'
                      : 'opacity-30'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${event.dot} ${isActive ? 'animate-pulse' : ''}`} />
                  <span className="text-xs text-slate-300 leading-snug">{event.text}</span>
                  {isActive && (
                    <span className="ml-auto text-[9px] text-emerald-400 font-mono shrink-0">now</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Network Health */}
          <div className="mt-5 pt-4 border-t border-white/8">
            <div className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider font-bold">Network Health</div>
            {[
              { label: 'Response Rate', value: 96, color: 'bg-emerald-400' },
              { label: 'Verification Rate', value: 88, color: 'bg-cyan-400' },
              { label: 'Satisfaction', value: 98, color: 'bg-amber-400' },
            ].map(item => (
              <div key={item.label} className="mb-2">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-white font-bold">{item.value}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                    style={{ width: isVisible ? `${item.value}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
