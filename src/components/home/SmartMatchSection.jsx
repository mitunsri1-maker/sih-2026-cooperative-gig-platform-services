import React, { useState } from 'react';
import { MatchScore } from '../common/MatchScore';
import { TrustBadgeGroup, TrustBadge } from '../common/TrustBadge';
import { Card3DTilt } from '../common/Card3DTilt';
import { 
  Sparkles, ArrowRight, Zap, MapPin, Calendar, Clock, Star, 
  ShieldCheck, CheckCircle2, UserCheck, HeartHandshake, Eye 
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export function SmartMatchSection({ onSelectProvider, onViewProfile }) {
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);

  // Match Showcase Dataset
  const showcaseMatches = [
    {
      id: 'prov-1',
      name: 'Ravi Kumar',
      trade: 'Master Electrician',
      matchScore: 97,
      rating: 4.9,
      reviewCount: 142,
      distance: '1.8 km away (Anna Nagar)',
      experience: '5+ years experience',
      priceRange: '₹300 – ₹500',
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
      skills: ['Electrical Repair', 'Fan Installation', 'Wiring', 'Switch Repair'],
      breakdown: {
        skillScore: 40,
        availScore: 20,
        distScore: 18.5,
        ratingScore: 9.8,
        trustScore: 9.7,
        skillReason: 'Certified Level 4 Electrician',
        availReason: 'Available Tomorrow 5:00 PM',
        distanceReason: '1.8 km away in Anna Nagar',
        ratingReason: '4.9★ from 142 verified jobs',
        trustReason: 'Cooperative Master Craftsman badge'
      }
    },
    {
      id: 'prov-3',
      name: 'Suresh Kumar',
      trade: 'Senior Electrician & Inverter Pro',
      matchScore: 91,
      rating: 4.7,
      reviewCount: 88,
      distance: '3.2 km away',
      experience: '7+ years experience',
      priceRange: '₹350 – ₹550',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      skills: ['Electrical Repair', 'Inverter Setup', 'MCB Spark Fix'],
      breakdown: {
        skillScore: 38,
        availScore: 19,
        distScore: 16.5,
        ratingScore: 9.4,
        trustScore: 9.1,
        skillReason: 'ITI Trade Certified',
        availReason: 'Available Tomorrow 6:00 PM',
        distanceReason: '3.2 km away',
        ratingReason: '4.7★ from 88 jobs',
        trustReason: 'Verified Co-op Member'
      }
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Title Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Core Innovation</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          THE RIGHT PERSON.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            FOR THE RIGHT JOB.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          No black-box mystery algorithms. CoServe scores every match transparently based on 
          exact trade skill fit, real-time availability, neighborhood proximity, ratings, and cooperative trust index.
        </p>
      </div>

      {/* Interactive Visual Connection Demo Card */}
      <div className="rounded-3xl bg-dark-900/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* Step Indicator Connection Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          
          {/* Customer Request Box */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Customer Request</span>
              <span className="text-base font-bold text-white block">Electrical Repair & MCB Spark Fix</span>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" /> Anna Nagar
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" /> Tomorrow · 5:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Animated Connecting Pulse */}
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-glow-emerald">
            <span>CUSTOMER REQUEST</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
            <span>BEST PROVIDER</span>
          </div>

          {/* Live Algorithm Weight Legend */}
          <div className="text-right hidden lg:block text-xs font-mono text-slate-400">
            Skill (40%) + Avail (20%) + Dist (20%) + Rating (10%) + Trust (10%)
          </div>

        </div>

        {/* Ranked Providers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showcaseMatches.map((prov, index) => {
            const isTopMatch = index === 0;

            return (
              <Card3DTilt key={prov.id} className="h-full">
                <div className={`h-full p-6 sm:p-7 rounded-3xl flex flex-col justify-between border backdrop-blur-xl transition-all duration-300 ${
                  isTopMatch
                    ? 'bg-emerald-950/30 border-emerald-500/50 shadow-glow-emerald ring-1 ring-emerald-500/30'
                    : 'bg-dark-900/60 border-white/10 hover:border-white/20'
                }`}>
                  
                  {/* Card Top */}
                  <div className="space-y-4">
                    
                    {/* Top Ribbon & Match Score */}
                    <div className="flex items-center justify-between">
                      {isTopMatch ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-500 text-dark-950 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-glow-emerald">
                          <Sparkles className="w-3 h-3 fill-dark-950" />
                          #1 Best Smart Match
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-[11px] font-bold">
                          #2 Alternate Option
                        </span>
                      )}

                      <MatchScore score={prov.matchScore} breakdown={prov.breakdown} size="sm" />
                    </div>

                    {/* Provider Avatar & Bio */}
                    <div className="flex items-start gap-4 pt-1">
                      <img
                        src={prov.avatar}
                        alt={prov.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 shadow-xl"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-black text-white">{prov.name}</h4>
                        </div>
                        <p className="text-xs font-semibold text-emerald-400">{prov.trade}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-0.5">
                          <span className="text-yellow-400 font-bold flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            {prov.rating} ({prov.reviewCount})
                          </span>
                          <span>•</span>
                          <span>{prov.distance}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges Trio */}
                    <div className="pt-2">
                      <TrustBadgeGroup provider={prov} size="xs" />
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {prov.skills.map((s) => (
                        <span key={s} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/[0.04] text-slate-300 border border-white/[0.07]">
                          {s}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Price & Book Action */}
                  <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Estimated Price</span>
                      <span className="text-base font-black font-mono text-white">{prov.priceRange}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProvider(prov)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 text-xs font-black shadow-glow-emerald flex items-center gap-1.5 transition transform active:scale-95"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </div>

                </div>
              </Card3DTilt>
            );
          })}
        </div>

      </div>

    </section>
  );
}
