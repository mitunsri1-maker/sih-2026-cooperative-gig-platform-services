import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { ProviderVerification } from './ProviderVerification';
import { CommunityFundManager } from './CommunityFundManager';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { formatINR } from '../../utils/formatters';
import { 
  ShieldCheck, Users, Landmark, Activity, Award, 
  TrendingUp, HeartHandshake, CheckCircle2, AlertCircle 
} from 'lucide-react';

export function AdminDashboard({ activeSubTab, setActiveSubTab }) {
  const { 
    providers, 
    bookings, 
    communityFund, 
    verifyProvider, 
    disburseGrant 
  } = useAppData();

  const totalGMV = bookings.reduce((acc, b) => acc + (b.pricing?.baseAmount || 600), 0) + 128000;
  const totalWorkerIncome = bookings.reduce((acc, b) => acc + (b.pricing?.providerTakeHome || 510), 0) + 108800;
  const verifiedCount = providers.filter(p => p.verified).length;
  const pendingKycCount = providers.filter(p => !p.verified).length;
  const avgTrustScore = Math.round(providers.reduce((acc, p) => acc + (p.trustScore || 80), 0) / providers.length);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Admin Title Header */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">CoServe Governance Board</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Democratic oversight of verification, fair-pricing compliance, and welfare funds.
                </p>
              </div>
            </div>
          </div>

          {/* Tab switchers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('admin-overview')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'admin-overview'
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSubTab('admin-kyc')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                activeSubTab === 'admin-kyc'
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              KYC Desk
              {pendingKycCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1.5 right-1.5 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => setActiveSubTab('admin-fund')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'admin-fund'
                  ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              Community Vault
            </button>
          </div>
        </div>
      </div>

      {/* Sub Tab: Overview */}
      {activeSubTab === 'admin-overview' && (
        <div className="space-y-6">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Worker Income (85%) */}
            <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Worker Direct Earnings</span>
              <div className="text-2xl font-black text-white">{formatINR(totalWorkerIncome)}</div>
              <p className="text-[10px] text-slate-500">85% straight to local craftsmen</p>
            </div>

            {/* Community Fund Vault (10%) */}
            <div className="glass-panel rounded-3xl p-5 border border-purple-500/20 space-y-1">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Co-op Welfare Pool</span>
              <div className="text-2xl font-black text-white">{formatINR(communityFund.totalPoolBalance)}</div>
              <p className="text-[10px] text-slate-500">{communityFund.beneficiaryWorkers} grants disbursed</p>
            </div>

            {/* Average Trust Score */}
            <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-1">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Avg Member Trust Index</span>
              <div className="text-2xl font-black text-white">{avgTrustScore} / 100</div>
              <p className="text-[10px] text-slate-500">Closed-loop rating feedback</p>
            </div>

            {/* Verified Craftsmen */}
            <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verified Members</span>
              <div className="text-2xl font-black text-white">{verifiedCount} / {providers.length}</div>
              <p className="text-[10px] text-slate-500">{pendingKycCount} in verification queue</p>
            </div>

          </div>

          {/* Service Categories Base Pricing Grid */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Governed Trade Categories &amp; Cooperative Floor Rates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SERVICE_CATEGORIES.map((cat) => (
                <div key={cat.id} className="p-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-1.5 hover:border-emerald-500/30 transition-colors">
                  <div className="font-bold text-white">{cat.name}</div>
                  <div className="text-emerald-400 font-extrabold">Floor: ₹{cat.basePrice}</div>
                  <div className="text-[10px] text-slate-500">{cat.subSkills.length} Certified Sub-Skills</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Placeholder */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Platform Health
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-emerald-400">{bookings.filter(b => b.status === 'COMPLETED').length + 23}</div>
                <div className="text-[11px] text-slate-400 mt-1">Completed Jobs</div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-amber-400">{bookings.filter(b => ['REQUESTED','ACCEPTED','IN_PROGRESS'].includes(b.status)).length + 4}</div>
                <div className="text-[11px] text-slate-400 mt-1">Active Right Now</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-purple-400">4.7★</div>
                <div className="text-[11px] text-slate-400 mt-1">Avg Platform Rating</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Sub Tab: KYC */}
      {activeSubTab === 'admin-kyc' && (
        <ProviderVerification
          providers={providers}
          onVerifyProvider={verifyProvider}
        />
      )}

      {/* Sub Tab: Fund Vault */}
      {activeSubTab === 'admin-fund' && (
        <CommunityFundManager
          communityFund={communityFund}
          onDisburseGrant={disburseGrant}
        />
      )}

    </div>
  );
}
