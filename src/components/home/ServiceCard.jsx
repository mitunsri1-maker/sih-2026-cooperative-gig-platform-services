import React from 'react';
import { Card3DTilt } from '../common/Card3DTilt';
import { 
  Zap, Wrench, Sparkles, Cpu, Hammer, Wind, Paintbrush, GraduationCap, ArrowRight 
} from 'lucide-react';

const ICON_MAP = {
  Zap, Wrench, Sparkles, Cpu, Hammer, Wind, Paintbrush, GraduationCap
};

export function ServiceCard({ category, isSelected, onClick }) {
  const Icon = ICON_MAP[category.icon] || Wrench;

  return (
    <Card3DTilt className="h-full">
      <div
        onClick={onClick}
        className={`h-full p-6 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
          isSelected
            ? 'bg-emerald-950/40 border-emerald-500/60 shadow-glow-emerald'
            : 'bg-dark-900/60 hover:bg-dark-900/90 border-white/[0.08] hover:border-emerald-500/30 shadow-xl'
        } backdrop-blur-xl group`}
      >
        <div className="space-y-4">
          
          {/* Glowing Icon Header */}
          <div className="flex items-center justify-between">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
              isSelected
                ? 'bg-emerald-500 text-dark-950 shadow-glow-emerald'
                : 'bg-white/[0.06] text-emerald-400 border border-white/10 group-hover:border-emerald-500/40'
            }`}>
              <Icon className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-mono font-bold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              From ₹{category.basePrice}
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              {category.name}
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Popular Sub-tasks Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {category.subSkills.slice(0, 2).map((skill) => (
              <span key={skill} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                {skill}
              </span>
            ))}
          </div>

        </div>

        {/* Bottom CTA Arrow */}
        <div className="pt-5 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
          <span>Explore Verified Pros</span>
          <ArrowRight className="w-4 h-4 text-emerald-400 transform group-hover:translate-x-1 transition-transform" />
        </div>

      </div>
    </Card3DTilt>
  );
}
