import React, { useState } from 'react';
import { formatINR } from '../../utils/formatters';
import { 
  HeartHandshake, Landmark, Award, CheckCircle2, 
  Plus, TrendingUp, Shield
} from 'lucide-react';
import { Modal } from '../common/Modal';

export function CommunityFundManager({ communityFund, onDisburseGrant }) {
  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [recipientName, setRecipientName] = useState('Anand Murthy (Plumber)');
  const [purpose, setPurpose] = useState('Tool Upgrade Grant — High-Pressure Hydro Jetter');
  const [amount, setAmount] = useState(12000);
  const [category, setCategory] = useState('Equipment Upgrade');

  const handleGrantSubmit = (e) => {
    e.preventDefault();
    onDisburseGrant({
      recipientName,
      purpose,
      amount: Number(amount),
      category
    });
    setIsGrantModalOpen(false);
  };

  const grantCategoryColors = {
    'Equipment Upgrade': 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
    'Health Welfare': 'text-rose-300 bg-rose-500/10 border-rose-500/20',
    'Skill Certification': 'text-amber-300 bg-amber-500/10 border-amber-500/20',
    'Family Support': 'text-purple-300 bg-purple-500/10 border-purple-500/20',
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Pool Totals */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-purple-500/20"
        style={{ background: 'linear-gradient(135deg, rgba(109,40,217,0.25) 0%, rgba(3,5,8,0.9) 50%, rgba(5,150,105,0.15) 100%)' }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              <Landmark className="w-3.5 h-3.5" />
              Community Welfare Escrow Pool
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Cooperative Welfare Vault Management
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              10% of every completed job is pooled here. As the Cooperative Council, you oversee grant approvals, tool financing, and worker medical support funds.
            </p>
          </div>

          <button
            onClick={() => setIsGrantModalOpen(true)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Approve New Welfare Grant</span>
          </button>
        </div>

        {/* 3 Metric Pills */}
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
            <span className="text-xs text-purple-300 block mb-1">Current Vault Balance</span>
            <span className="text-2xl font-black text-white">{formatINR(communityFund.totalPoolBalance)}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
            <span className="text-xs text-purple-300 block mb-1">Total Grants Disbursed</span>
            <span className="text-2xl font-black text-white">{formatINR(communityFund.disbursedToDate)}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
            <span className="text-xs text-purple-300 block mb-1">Beneficiary Workers</span>
            <span className="text-2xl font-black text-white">{communityFund.beneficiaryWorkers} Workers</span>
          </div>
        </div>
      </div>

      {/* Grant Disbursement Ledger */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" />
          Community Welfare Disbursements Log
        </h3>

        {communityFund.activeGrants.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            No grants disbursed yet. Approve the first welfare grant above.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {communityFund.activeGrants.map((grant) => (
              <div key={grant.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-white text-sm">{grant.purpose}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${grantCategoryColors[grant.category] || 'text-slate-400 bg-white/5 border-white/10'}`}>
                      {grant.category}
                    </span>
                  </div>
                  <p className="text-slate-500">
                    Recipient: <strong className="text-slate-300">{grant.recipientName}</strong> • Disbursed: {grant.date}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  <span className="text-base font-black text-purple-300">{formatINR(grant.amount)}</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {grant.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cooperative Impact Summary */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-rose-400" />
          Cooperative Impact Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {[
            { label: 'Equipment Upgrades', value: communityFund.activeGrants.filter(g => g.category === 'Equipment Upgrade').length, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
            { label: 'Medical Welfare', value: communityFund.activeGrants.filter(g => g.category === 'Health Welfare').length, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
            { label: 'Skill Subsidies', value: communityFund.activeGrants.filter(g => g.category === 'Skill Certification').length, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
          ].map((item) => (
            <div key={item.label} className={`p-4 rounded-2xl border ${item.bg} text-center`}>
              <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
              <div className="text-slate-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* New Grant Modal */}
      <Modal
        isOpen={isGrantModalOpen}
        onClose={() => setIsGrantModalOpen(false)}
        title="Disburse Cooperative Welfare Grant"
      >
        <form onSubmit={handleGrantSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1.5">Beneficiary Worker Name &amp; Trade</label>
            <input
              type="text"
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="glass-input w-full px-3.5 py-2.5 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1.5">Grant Purpose / Objective</label>
            <input
              type="text"
              required
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="glass-input w-full px-3.5 py-2.5 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Grant Amount (₹)</label>
              <input
                type="number"
                required
                min="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Grant Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="glass-input w-full px-3.5 py-2.5 rounded-xl"
              >
                <option value="Equipment Upgrade">Equipment &amp; Tool Upgrade</option>
                <option value="Health Welfare">Emergency Medical Welfare</option>
                <option value="Skill Certification">Skill Training Subsidy</option>
                <option value="Family Support">Family Welfare Support</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={() => setIsGrantModalOpen(false)}
              className="px-4 py-2.5 border border-white/10 rounded-xl font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 transition active:scale-95"
            >
              Approve &amp; Disburse Funds
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
