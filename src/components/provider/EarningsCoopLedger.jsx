import React from 'react';
import { formatINR } from '../../utils/formatters';
import { EarningsFlow } from '../common/EarningsFlow';
import { 
  HeartHandshake, TrendingUp, Landmark, ShieldCheck, Download, 
  ArrowUpRight, Clock, CheckCircle2, UserCheck, Sparkles 
} from 'lucide-react';

export function EarningsCoopLedger({ provider, providerBookings, communityFund }) {
  const completedJobs = providerBookings.filter(b => b.status === 'COMPLETED' || b.status === 'RATED');
  
  const totalTakeHome = completedJobs.reduce((acc, curr) => {
    return acc + (curr.pricing?.providerTakeHome || Math.round((curr.pricing?.baseAmount || 500) * 0.85));
  }, 0) + (provider?.pricing?.hourlyRate ? provider.completedJobs * 300 : 85000);

  const totalFundContribution = completedJobs.reduce((acc, curr) => {
    return acc + (curr.pricing?.coopWelfareFund || Math.round((curr.pricing?.baseAmount || 500) * 0.10));
  }, 0) + (provider?.coopFundContribution || 9540);

  return (
    <div className="space-y-6 text-left">
      
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Direct Payout Card */}
        <div className="rounded-3xl bg-dark-900/90 backdrop-blur-2xl p-6 border border-white/10 shadow-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Direct Payouts (85%)</span>
            <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white">{formatINR(totalTakeHome)}</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Instant Bank / UPI settlement
          </div>
        </div>

        {/* Cooperative Fund Pooled */}
        <div className="rounded-3xl bg-emerald-950/40 backdrop-blur-2xl p-6 border border-emerald-500/30 shadow-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-bold uppercase">
            <span>Your Co-op Fund Share</span>
            <span className="p-1.5 bg-white/10 text-emerald-300 rounded-xl">
              <HeartHandshake className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">{formatINR(totalFundContribution)}</div>
          <div className="text-[11px] text-emerald-300 font-medium">
            Entitles you to tool grants & medical cover
          </div>
        </div>

        {/* Total Jobs Done */}
        <div className="rounded-3xl bg-dark-900/90 backdrop-blur-2xl p-6 border border-white/10 shadow-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Completed Jobs</span>
            <span className="p-1.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-white">
            {provider?.completedJobs || completedJobs.length}
          </div>
          <div className="text-[11px] text-blue-400 font-semibold">
            0% corporate commission deducted
          </div>
        </div>

      </div>

      {/* Signature Flow */}
      <EarningsFlow amount={1000} />

      {/* Transaction History Table */}
      <div className="rounded-3xl bg-dark-900/80 backdrop-blur-2xl p-6 sm:p-7 border border-white/10 shadow-2xl space-y-4">
        <div>
          <h3 className="text-base font-bold text-white">Recent Service Payouts</h3>
          <p className="text-xs text-slate-400">Itemized ledger of recent jobs and cooperative fund credits.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-bold uppercase text-[10px]">
                <th className="pb-3">Job ID</th>
                <th className="pb-3">Service Title</th>
                <th className="pb-3">Total Amount</th>
                <th className="pb-3 text-emerald-400">Your Take-Home (85%)</th>
                <th className="pb-3 text-amber-400">Welfare Pool (10%)</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {completedJobs.map((b) => (
                <tr key={b.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 font-bold font-mono text-white">{b.id}</td>
                  <td className="py-3.5 text-slate-300">{b.serviceTitle}</td>
                  <td className="py-3.5 font-mono font-semibold text-white">{formatINR(b.pricing?.baseAmount || 600)}</td>
                  <td className="py-3.5 font-mono font-bold text-emerald-400">
                    {formatINR(b.pricing?.providerTakeHome || 510)}
                  </td>
                  <td className="py-3.5 font-mono font-bold text-amber-400">
                    {formatINR(b.pricing?.coopWelfareFund || 60)}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Settled
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
