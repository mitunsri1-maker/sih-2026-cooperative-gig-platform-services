import React from 'react';
import { formatINR } from '../../utils/formatters';
import { calculateCooperativeSplit } from '../../services/pricingEngine';
import { ArrowDown, HeartHandshake, User, Landmark, Server, Sparkles, CheckCircle2 } from 'lucide-react';

export function EarningsFlow({ amount = 500, isReceipt = false }) {
  const split = calculateCooperativeSplit(amount);
  const aggregatorCut = Math.round(amount * 0.30);
  const aggregatorTakeHome = amount - aggregatorCut;

  return (
    <div className="rounded-3xl bg-dark-900/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block mb-1">
            Cooperative Economic Transparency
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            WHERE YOUR PAYMENT GOES
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            100% accountable rupee flow. No hidden corporate profit extractions.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Customer Payment</span>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">{formatINR(amount)}</span>
        </div>
      </div>

      {/* Flow Visualization (Linear / Apple style cards with connecting glow arrows) */}
      <div className="space-y-4">
        
        {/* Top: Customer Payment Node */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
              100%
            </div>
            <div>
              <span className="text-sm font-bold text-white block">Customer Service Payment</span>
              <span className="text-[11px] text-slate-400">Escrow protected & settled transparently</span>
            </div>
          </div>
          <span className="text-base font-bold font-mono text-white">{formatINR(amount)}</span>
        </div>

        {/* Down Flow Indicator */}
        <div className="flex justify-center -my-1">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-glow-emerald">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>

        {/* 3 Split Branches */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Branch 1: Provider Take-Home (85%) */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2 relative group hover:border-emerald-500/60 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                85% Direct
              </span>
              <User className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Provider Earnings</span>
              <span className="text-[11px] text-slate-400">Direct to worker's bank / UPI</span>
            </div>
            <div className="text-xl font-black font-mono text-emerald-400 pt-1">
              {formatINR(split.providerTakeHome)}
            </div>
          </div>

          {/* Branch 2: Community Fund (10%) */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2 relative group hover:border-amber-500/60 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                10% Pooled
              </span>
              <Landmark className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Community Fund</span>
              <span className="text-[11px] text-slate-400">Health, tool grants & safety</span>
            </div>
            <div className="text-xl font-black font-mono text-amber-400 pt-1">
              {formatINR(split.coopWelfareFund)}
            </div>
          </div>

          {/* Branch 3: Platform Sustainability (5%) */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2 relative group hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-slate-400 border border-white/10">
                5% Ops
              </span>
              <Server className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Platform Upkeep</span>
              <span className="text-[11px] text-slate-400">Server hosting & verification</span>
            </div>
            <div className="text-xl font-black font-mono text-slate-300 pt-1">
              {formatINR(split.platformUpkeep)}
            </div>
          </div>

        </div>

      </div>

      {/* Comparison Pill with Extractive Gig Aggregators */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300">
            Traditional gig apps extract <strong className="text-rose-400">30% ({formatINR(aggregatorCut)})</strong> for corporate profit. With CoServe, the worker takes <strong className="text-emerald-400">{formatINR(split.providerTakeHome)}</strong> + <strong className="text-amber-400">{formatINR(split.coopWelfareFund)}</strong> stays in your local neighborhood pool.
          </span>
        </div>
      </div>

    </div>
  );
}
