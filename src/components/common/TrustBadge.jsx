import React from 'react';
import { ShieldCheck, Award, Star, Check } from 'lucide-react';

export function TrustBadge({ type = 'identity', size = 'sm' }) {
  switch (type) {
    case 'identity':
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 ${
          size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
        }`}>
          <Check className="w-3 h-3 text-blue-400 stroke-[3]" />
          <span>Identity Verified</span>
        </span>
      );
    case 'skill':
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${
          size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
        }`}>
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Skill Verified</span>
        </span>
      );
    case 'community':
    case 'rated':
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 ${
          size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
        }`}>
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>Community Rated</span>
        </span>
      );
    case 'master':
      return (
        <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 ${
          size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
        }`}>
          <Award className="w-3 h-3 text-purple-400" />
          <span>Cooperative Master Craftsman</span>
        </span>
      );
    default:
      return null;
  }
}

export function TrustBadgeGroup({ provider, size = 'xs' }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <TrustBadge type="identity" size={size} />
      <TrustBadge type="skill" size={size} />
      <TrustBadge type="community" size={size} />
    </div>
  );
}
