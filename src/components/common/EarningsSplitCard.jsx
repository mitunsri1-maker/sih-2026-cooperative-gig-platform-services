import React from 'react';
import { formatINR } from '../../utils/formatters';
import { HeartHandshake, ShieldCheck, Sparkles, User, Landmark, Server } from 'lucide-react';
import { calculateCooperativeSplit } from '../../services/pricingEngine';

export function EarningsSplitCard({ amount = 600, showComparison = true, isReceipt = false }) {
  const split = calculateCooperativeSplit(amount);
  
  // Traditional Aggregator comparison
  const aggregatorCut = Math.round(amount * 0.30); // 30% commission
  const aggregatorWorkerShare = amount - aggregatorCut;

  return (
    <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              {isReceipt ? 'Cooperative Transparency Invoice' : 'Cooperative Earnings Split'}
            </h4>
            <p className="text-xs text-slate-500">
              100% transparent economics — every rupee is accounted for
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block font-medium">Total Price</span>
          <span className="text-lg font-extrabold text-slate-900">{formatINR(amount)}</span>
        </div>
      </div>

      {/* Visual Multi-Segment Bar */}
      <div className="space-y-1.5 mb-5">
        <div className="h-3 w-full bg-slate-100 rounded-full flex overflow-hidden p-0.5 gap-0.5 border border-slate-200">
          <div
            className="bg-emerald-500 h-full rounded-l-full transition-all duration-500"
            style={{ width: `${split.splits.providerPercent}%` }}
            title={`Worker: ${split.splits.providerPercent}%`}
          />
          <div
            className="bg-amber-500 h-full transition-all duration-500"
            style={{ width: `${split.splits.communityFundPercent}%` }}
            title={`Community Fund: ${split.splits.communityFundPercent}%`}
          />
          <div
            className="bg-slate-500 h-full rounded-r-full transition-all duration-500"
            style={{ width: `${split.splits.platformPercent}%` }}
            title={`Platform: ${split.splits.platformPercent}%`}
          />
        </div>

        <div className="flex justify-between text-[11px] font-semibold text-slate-600 px-1">
          <span className="text-emerald-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            85% Worker
          </span>
          <span className="text-amber-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            10% Community Fund
          </span>
          <span className="text-slate-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-500 inline-block"></span>
            5% Tech Ops
          </span>
        </div>
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 mb-4">
        
        {/* Worker Direct Share */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            <div>
              <span className="font-semibold text-slate-800">Worker Payout (85%)</span>
              <span className="text-[10px] text-slate-500 block">Directly credited to worker's bank/UPI</span>
            </div>
          </div>
          <span className="font-bold text-emerald-700 text-sm">{formatINR(split.providerTakeHome)}</span>
        </div>

        {/* Community Welfare Fund */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-amber-600" />
            <div>
              <span className="font-semibold text-slate-800">Worker Welfare Fund (10%)</span>
              <span className="text-[10px] text-slate-500 block">Health aid, safety gear, tool grants & child schooling</span>
            </div>
          </div>
          <span className="font-bold text-amber-700 text-sm">{formatINR(split.coopWelfareFund)}</span>
        </div>

        {/* Platform Maintenance */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-600" />
            <div>
              <span className="font-semibold text-slate-800">Platform Upkeep (5%)</span>
              <span className="text-[10px] text-slate-500 block">Server hosting, SMS verification & dispute resolution</span>
            </div>
          </div>
          <span className="font-bold text-slate-700 text-sm">{formatINR(split.platformUpkeep)}</span>
        </div>

      </div>

      {/* Differentiator Banner vs Traditional Gig Aggregators */}
      {showComparison && (
        <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-900 block mb-0.5">The Cooperative Advantage:</span>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                Aggregator apps extract ~30% ({formatINR(aggregatorCut)}) for corporate profit. Under CoServe, 
                the worker earns <strong className="text-emerald-950 font-bold">{formatINR(split.providerTakeHome)}</strong> (vs {formatINR(aggregatorWorkerShare)}) and <strong className="text-amber-900 font-bold">{formatINR(split.coopWelfareFund)}</strong> stays in the local community fund.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
