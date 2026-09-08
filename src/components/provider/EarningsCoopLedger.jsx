import React from 'react';
import { formatINR } from '../../utils/formatters';
import { EarningsSplitCard } from '../common/EarningsSplitCard';
import { 
  HeartHandshake, TrendingUp, Landmark, ShieldCheck, Download, 
  ArrowUpRight, Clock, CheckCircle2, UserCheck
} from 'lucide-react';

export function EarningsCoopLedger({ provider, providerBookings, communityFund }) {
  const completedJobs = providerBookings.filter(b => b.status === 'COMPLETED' || b.status === 'RATED');
  
  // Calculate total earnings
  const totalTakeHome = completedJobs.reduce((acc, curr) => {
    return acc + (curr.pricing?.providerTakeHome || Math.round((curr.pricing?.baseAmount || 500) * 0.85));
  }, 0) + (provider?.pricing?.hourlyRate ? provider.completedJobs * 300 : 85000);

  const totalFundContribution = completedJobs.reduce((acc, curr) => {
    return acc + (curr.pricing?.coopWelfareFund || Math.round((curr.pricing?.baseAmount || 500) * 0.10));
  }, 0) + (provider?.coopFundContribution || 9540);

  return (
    <div className="space-y-6">
      
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Direct Payout Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Direct Payouts (85%)</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{formatINR(totalTakeHome)}</div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Instant Bank/UPI settlement
          </div>
        </div>

        {/* Cooperative Fund Pooled */}
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 shadow-md space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-bold uppercase">
            <span>Your Co-op Fund Share</span>
            <span className="p-1.5 bg-white/10 text-emerald-300 rounded-lg">
              <HeartHandshake className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black">{formatINR(totalFundContribution)}</div>
          <div className="text-[11px] text-emerald-300 font-medium">
            Entitles you to tool grants & medical cover
          </div>
        </div>

        {/* Total Jobs Done */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
            <span>Completed Jobs</span>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {provider?.completedJobs || completedJobs.length}
          </div>
          <div className="text-[11px] text-blue-700 font-semibold">
            0% corporate commission taken
          </div>
        </div>

      </div>

      {/* Signature Cooperative Split Comparison */}
      <EarningsSplitCard amount={1000} showComparison={true} />

      {/* Transaction History Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Service Payouts</h3>
            <p className="text-xs text-slate-500">Itemized ledger of recent jobs and cooperative fund credits.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                <th className="pb-3">Job ID</th>
                <th className="pb-3">Service Title</th>
                <th className="pb-3">Total Amount</th>
                <th className="pb-3 text-emerald-700">Your Take-Home (85%)</th>
                <th className="pb-3 text-amber-700">Welfare Pool (10%)</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {completedJobs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50">
                  <td className="py-3 font-bold text-slate-900">{b.id}</td>
                  <td className="py-3 text-slate-700">{b.serviceTitle}</td>
                  <td className="py-3 font-semibold">{formatINR(b.pricing?.baseAmount || 600)}</td>
                  <td className="py-3 font-bold text-emerald-700">
                    {formatINR(b.pricing?.providerTakeHome || 510)}
                  </td>
                  <td className="py-3 font-bold text-amber-700">
                    {formatINR(b.pricing?.coopWelfareFund || 60)}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
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
