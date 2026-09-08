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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">CoServe Cooperative Governance Board</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">
              Admin Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Democratic oversight of worker verification, fair-pricing compliance, and community welfare fund allocations.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('admin-overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'admin-overview'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSubTab('admin-kyc')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition relative ${
              activeSubTab === 'admin-kyc'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            KYC Desk
            {pendingKycCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1 right-1"></span>
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('admin-fund')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'admin-fund'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Community Vault
          </button>
        </div>
      </div>

      {/* Sub Tab: Overview */}
      {activeSubTab === 'admin-overview' && (
        <div className="space-y-6">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Worker Income (85%) */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-emerald-700 uppercase">Worker Direct Earnings</span>
              <div className="text-2xl font-black text-slate-900">{formatINR(totalWorkerIncome)}</div>
              <p className="text-[10px] text-slate-400">85% straight to local craftsmen</p>
            </div>

            {/* Community Fund Vault (10%) */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-purple-700 uppercase">Co-op Welfare Pool</span>
              <div className="text-2xl font-black text-purple-950">{formatINR(communityFund.totalPoolBalance)}</div>
              <p className="text-[10px] text-slate-400">{communityFund.beneficiaryWorkers} grants disbursed</p>
            </div>

            {/* Average Trust Score */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-teal-700 uppercase">Avg Member Trust Index</span>
              <div className="text-2xl font-black text-teal-950">{avgTrustScore} / 100</div>
              <p className="text-[10px] text-slate-400">Closed-loop rating feedback</p>
            </div>

            {/* Verified Craftsmen */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Verified Members</span>
              <div className="text-2xl font-black text-slate-900">{verifiedCount} / {providers.length}</div>
              <p className="text-[10px] text-slate-400">{pendingKycCount} in verification queue</p>
            </div>

          </div>

          {/* Service Categories Base Pricing Grid */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Governed Trade Categories & Cooperative Floor Rates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SERVICE_CATEGORIES.map((cat) => (
                <div key={cat.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900">{cat.name}</div>
                  <div className="text-emerald-700 font-extrabold">Floor Rate: ₹{cat.basePrice}</div>
                  <div className="text-[10px] text-slate-500">{cat.subSkills.length} Certified Sub-Skills</div>
                </div>
              ))}
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
