import React, { useState } from 'react';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { EarningsSplitCard } from '../common/EarningsSplitCard';
import { 
  HeartHandshake, Sparkles, ShieldCheck, Zap, Wrench, 
  ArrowRight, CheckCircle2, TrendingUp, Users, Award, Star, Check 
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export function LandingPage({ onFindService, onBecomeProvider, communityFund }) {
  const [demoAmount, setDemoAmount] = useState(600);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-6 shadow-xs">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>Smart India Hackathon (SIH 2026) Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Fair Service Platform Powered by a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">Worker Cooperative</span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explainable skill-based matching for customers. <strong>85% direct take-home pay</strong> and a <strong>10% shared welfare fund</strong> for local craftsmen. No corporate middlemen extracting heavy cuts.
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onFindService}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition transform active:scale-95"
            >
              <span>Find a Verified Craftsman</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBecomeProvider}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-200 flex items-center justify-center gap-2 transition shadow-xs"
            >
              <Wrench className="w-4 h-4 text-emerald-600" />
              <span>Provider & Co-op Portal</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-emerald-700 font-black text-lg block">85% Pay</span>
              <span className="text-xs text-slate-500">Direct to worker vs ~65% on aggregators</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-amber-700 font-black text-lg block">10% Fund</span>
              <span className="text-xs text-slate-500">Collective health & tool upgrade pool</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-blue-700 font-black text-lg block">5-Pillar Score</span>
              <span className="text-xs text-slate-500">Explainable matching transparent to all</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-purple-700 font-black text-lg block">Closed Loop</span>
              <span className="text-xs text-slate-500">Ratings directly feed dynamic trust index</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Cooperative Economics Comparison */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">The Economic Difference</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Why CoServe Beats Extractive Gig Monopolies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Traditional Aggregator Box */}
          <div className="bg-slate-100/80 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-lg">Traditional Gig Aggregators</h3>
              <span className="text-xs font-bold px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full">
                Extractive Model
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                <span><strong>25%–35% Commission Cut</strong> taken from worker's hard work for corporate profits.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                <span><strong>Black-box algorithm</strong> decides work allocation without explanation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                <span><strong>₹0 Community Welfare:</strong> Workers treated as disposable contractor inventory with no safety nets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✗</span>
                <span>Hidden convenience and surge fees tacked on to customer bills.</span>
              </li>
            </ul>
          </div>

          {/* CoServe Cooperative Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-400 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
              <h3 className="font-bold text-emerald-950 text-lg">CoServe Cooperative Platform</h3>
              <span className="text-xs font-bold px-2.5 py-1 bg-emerald-600 text-white rounded-full shadow-xs">
                Cooperative Model
              </span>
            </div>

            <ul className="space-y-3 text-xs text-emerald-950">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>85% Direct Worker Take-Home:</strong> Workers earn genuine living wages with zero hidden penalties.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Explainable 5-Pillar Matching:</strong> Transparent score breakdowns shown to both customer and provider.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>10% Shared Community Welfare Pool:</strong> Funds tool upgrades, medical assistance, and skill training.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Only 5% Open Platform Fee</strong> strictly for hosting, SMS, and dispute ops.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. Interactive Split Simulator */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Interactive Simulator</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              See the Cooperative Rupee Split in Real Time
            </h3>
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Service Booking Amount:</span>
              <span className="text-emerald-700 text-sm">{formatINR(demoAmount)}</span>
            </div>
            <input
              type="range"
              min="300"
              max="2500"
              step="50"
              value={demoAmount}
              onChange={(e) => setDemoAmount(Number(e.target.value))}
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <EarningsSplitCard amount={demoAmount} showComparison={true} />
        </div>
      </section>

      {/* 4. Service Categories Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Governed Trades</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Explore Cooperative Trade Services
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SERVICE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={onFindService}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition flex flex-col justify-between h-36"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
                <span className="text-xs text-emerald-700 font-semibold">From ₹{cat.basePrice}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
