import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Star, Zap, Award, User } from 'lucide-react';

// Animated trust ring
function TrustRing({ label, color, borderColor, radius, speed, delay, isVisible, children }) {
  const style = {
    width: radius * 2,
    height: radius * 2,
    borderRadius: '50%',
    border: `1.5px dashed ${borderColor}`,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: isVisible ? `${speed > 0 ? 'spin' : 'spin-slow-reverse'} ${Math.abs(speed)}s linear infinite` : 'none',
    animationDelay: `${delay}s`,
  };

  return (
    <div style={style}>
      {/* Ring label node */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        background: 'rgba(3,5,6,0.95)',
        border: `1px solid ${borderColor}`,
        borderRadius: '999px',
        padding: '3px 10px',
        fontSize: '9px',
        fontWeight: 800,
        color,
        whiteSpace: 'nowrap',
        backdropFilter: 'blur(8px)',
        letterSpacing: '0.05em',
      }}>
        {label}
      </div>
    </div>
  );
}

const TRUST_METRICS = [
  { value: '4.9', label: 'Average Rating', color: 'text-amber-400', sub: 'from 142 verified reviews' },
  { value: '184', label: 'Completed Jobs', color: 'text-emerald-400', sub: 'and counting' },
  { value: '98%', label: 'On-time', color: 'text-cyan-400', sub: 'completion rate' },
];

export function TrustSystemSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [metricValues, setMetricValues] = useState([0, 0, 0]);

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
    const targets = [4.9, 184, 98];
    targets.forEach((target, i) => {
      let start = null;
      const duration = 1800 + i * 200;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setMetricValues(prev => {
          const copy = [...prev];
          copy[i] = i === 0 ? (ease * target).toFixed(1) : Math.round(ease * target);
          return copy;
        });
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Header */}
      <div className="text-center mb-16">
        <div className="section-label mx-auto mb-4">
          <ShieldCheck className="w-3 h-3" />
          Trust Architecture
        </div>
        <h2 className="section-heading mb-4">
          TRUST ISN'T A BADGE.<br />
          <span className="text-gradient-emerald">IT'S A SYSTEM.</span>
        </h2>
        <p className="text-slate-400 text-base max-w-lg mx-auto">
          Every CoServe provider goes through a three-layer verification that rebuilds continuously with every completed job.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — Trust Ring Visualization */}
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center" style={{ width: 340, height: 340 }}>

            {/* Rings */}
            <TrustRing
              label="✓ IDENTITY VERIFIED"
              color="#22d3ee"
              borderColor="rgba(34,211,238,0.4)"
              radius={155}
              speed={18}
              delay={0}
              isVisible={isVisible}
            />
            <TrustRing
              label="✓ SKILL CERTIFIED"
              color="#10b981"
              borderColor="rgba(16,185,129,0.4)"
              radius={115}
              speed={-13}
              delay={0}
              isVisible={isVisible}
            />
            <TrustRing
              label="★ COMMUNITY RATED"
              color="#f59e0b"
              borderColor="rgba(245,158,11,0.4)"
              radius={78}
              speed={9}
              delay={0}
              isVisible={isVisible}
            />

            {/* Center — Provider Profile */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80"
                  alt="Ravi Kumar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/20 shadow-2xl"
                />
                {/* Green verified pulse */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-dark-900 flex items-center justify-center shadow-glow-emerald">
                  <ShieldCheck className="w-3 h-3 text-dark-950 stroke-[3]" />
                </div>
              </div>
              <div className="text-center bg-dark-900/80 backdrop-blur-xl rounded-xl px-4 py-2 border border-white/10">
                <div className="text-sm font-black text-white">Ravi Kumar</div>
                <div className="text-[10px] text-emerald-400 font-bold">Master Electrician</div>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute inset-1/4 rounded-full bg-emerald-500/8 blur-3xl" />
          </div>
        </div>

        {/* Right — Trust Metrics + System Explanation */}
        <div className="space-y-8">

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            {TRUST_METRICS.map((metric, i) => (
              <div key={metric.label} className="glass-panel rounded-2xl p-4 text-center border border-white/8">
                <div className={`text-3xl font-black font-mono ${metric.color}`}>
                  {i === 2 ? `${metricValues[i]}%` : metricValues[i]}
                </div>
                <div className="text-xs font-bold text-white mt-1">{metric.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{metric.sub}</div>
              </div>
            ))}
          </div>

          {/* Trust steps */}
          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'Identity Verification',
                desc: 'Aadhaar card, address proof, and photo verification before onboarding.',
                color: '#22d3ee',
                bg: 'bg-cyan-500/10 border-cyan-500/20',
              },
              {
                step: '02',
                title: 'Skill Certification',
                desc: 'ITI trade diploma, peer recommendation, or skill demonstration test.',
                color: '#10b981',
                bg: 'bg-emerald-500/10 border-emerald-500/20',
              },
              {
                step: '03',
                title: 'Community Trust Score',
                desc: 'Every completed job and customer rating continuously updates the trust index.',
                color: '#f59e0b',
                bg: 'bg-amber-500/10 border-amber-500/20',
              },
            ].map((item) => (
              <div key={item.step} className={`flex items-start gap-4 p-4 rounded-2xl border ${item.bg}`}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                  style={{ color: item.color, background: `${item.color}20` }}>
                  {item.step}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{item.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
