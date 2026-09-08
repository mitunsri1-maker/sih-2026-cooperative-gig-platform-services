import React from 'react';
import { Card3DTilt } from '../common/Card3DTilt';
import { 
  Zap, Wrench, Sparkles, Cpu, Hammer, Wind, Paintbrush, GraduationCap, 
  ArrowRight, ShieldCheck, CheckCircle2, Users
} from 'lucide-react';

const ICON_MAP = {
  Zap, Wrench, Sparkles, Cpu, Hammer, Wind, Paintbrush, GraduationCap
};

const CATEGORY_META = {
  electrical: {
    providersCount: 28,
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    borderColor: 'group-hover:border-amber-500/50',
    accentBg: 'from-amber-500/10 to-transparent',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]',
  },
  plumbing: {
    providersCount: 22,
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    borderColor: 'group-hover:border-cyan-500/50',
    accentBg: 'from-cyan-500/10 to-transparent',
    badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    iconBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]',
  },
  cleaning: {
    providersCount: 34,
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    borderColor: 'group-hover:border-emerald-500/50',
    accentBg: 'from-emerald-500/10 to-transparent',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]',
  },
  appliances: {
    providersCount: 19,
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    borderColor: 'group-hover:border-purple-500/50',
    accentBg: 'from-purple-500/10 to-transparent',
    badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    iconBg: 'bg-purple-500/20 text-purple-400 border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]',
  },
  carpentry: {
    providersCount: 15,
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.25)',
    borderColor: 'group-hover:border-orange-500/50',
    accentBg: 'from-orange-500/10 to-transparent',
    badgeBg: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    iconBg: 'bg-orange-500/20 text-orange-400 border-orange-500/30 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]',
  },
  ac_hvac: {
    providersCount: 21,
    color: '#22d3ee',
    glowColor: 'rgba(34, 211, 238, 0.25)',
    borderColor: 'group-hover:border-cyan-400/50',
    accentBg: 'from-cyan-400/10 to-transparent',
    badgeBg: 'bg-cyan-400/15 text-cyan-200 border-cyan-400/30',
    iconBg: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]',
  },
  painting: {
    providersCount: 17,
    color: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.25)',
    borderColor: 'group-hover:border-emerald-400/50',
    accentBg: 'from-emerald-400/10 to-transparent',
    badgeBg: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30',
    iconBg: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]',
  },
  tutoring: {
    providersCount: 12,
    color: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    borderColor: 'group-hover:border-pink-500/50',
    accentBg: 'from-pink-500/10 to-transparent',
    badgeBg: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
    iconBg: 'bg-pink-500/20 text-pink-400 border-pink-500/30 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]',
  }
};

export function ServiceCard({ category, isSelected, onSelect, index = 0 }) {
  const Icon = ICON_MAP[category.icon] || Wrench;
  const meta = CATEGORY_META[category.id] || {
    providersCount: 20,
    color: '#10b981',
    borderColor: 'group-hover:border-emerald-500/50',
    accentBg: 'from-emerald-500/10 to-transparent',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };

  // Asymmetric styling variation based on index
  const isFeaturedBento = index === 0 || index === 3;

  return (
    <Card3DTilt className="h-full">
      <div
        onClick={() => onSelect(category)}
        className={`relative h-full p-7 rounded-3xl cursor-pointer transition-all duration-500 flex flex-col justify-between border overflow-hidden group ${
          isSelected
            ? 'bg-emerald-950/40 border-emerald-500/60 shadow-glow-emerald ring-1 ring-emerald-500/30'
            : `bg-dark-900/70 hover:bg-dark-900/90 border-white/[0.08] ${meta.borderColor} shadow-2xl`
        } backdrop-blur-2xl`}
      >
        {/* Abstract pattern & subtle ambient glow reveal on hover */}
        <div 
          className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle at 80% 20%, ${meta.glowColor || 'rgba(16,185,129,0.15)'}, transparent 70%)` }}
        />
        <div className="absolute inset-0 bg-grid-dots opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

        <div className="relative space-y-5">
          {/* Top Row: Icon + Price Tag */}
          <div className="flex items-start justify-between">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 ${meta.iconBg}`}>
              <Icon className="w-7 h-7 stroke-[2]" />
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">Floor Rate</span>
              <span className="text-sm font-black font-mono text-white px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-white/20">
                From ₹{category.basePrice}
              </span>
            </div>
          </div>

          {/* Title & Available Verified Count */}
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors tracking-tight">
                {category.name}
              </h3>
            </div>

            {/* Provider count animated pill */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-bold mb-2 transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${meta.color}15`, borderColor: `${meta.color}30`, color: meta.color }}>
              <Users className="w-3 h-3" />
              <span>{meta.providersCount} verified pros</span>
              <ShieldCheck className="w-3 h-3" />
            </div>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
              {category.description}
            </p>
          </div>

          {/* Subskills Preview Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {category.subSkills.slice(0, isFeaturedBento ? 3 : 2).map((skill) => (
              <span 
                key={skill} 
                className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.03] text-slate-300 border border-white/[0.06] group-hover:border-white/15 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA Arrow Action */}
        <div className="relative pt-5 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:animate-ping" />
            Explore Verified Network
          </span>
          <div className="w-7 h-7 rounded-xl bg-white/[0.04] group-hover:bg-emerald-500 group-hover:text-dark-950 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>

      </div>
    </Card3DTilt>
  );
}
