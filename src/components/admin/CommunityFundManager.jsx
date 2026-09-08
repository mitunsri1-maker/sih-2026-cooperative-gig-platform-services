import React, { useState } from 'react';
import { formatINR } from '../../utils/formatters';
import { 
  HeartHandshake, Landmark, Send, Award, CheckCircle2, 
  TrendingUp, ShieldCheck, Plus, Sparkles 
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

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Pool Totals */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              <Landmark className="w-3.5 h-3.5" />
              Community Welfare Escrow Pool
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Cooperative Welfare Vault Management
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              10% of every completed job is pooled here. As the Cooperative Council, you oversee grant approvals, tool financing, and worker medical support funds.
            </p>
          </div>

          <button
            onClick={() => setIsGrantModalOpen(true)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Approve New Welfare Grant</span>
          </button>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-purple-300 block">Current Vault Balance</span>
            <span className="text-2xl font-black">{formatINR(communityFund.totalPoolBalance)}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-purple-300 block">Total Grants Disbursed</span>
            <span className="text-2xl font-black">{formatINR(communityFund.disbursedToDate)}</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-purple-300 block">Beneficiary Workers</span>
            <span className="text-2xl font-black">{communityFund.beneficiaryWorkers} Workers</span>
          </div>
        </div>
      </div>

      {/* Grant Disbursement Ledger */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          Community Welfare Disbursements Log
        </h3>

        <div className="divide-y divide-slate-100">
          {communityFund.activeGrants.map((grant) => (
            <div key={grant.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{grant.purpose}</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                    {grant.category}
                  </span>
                </div>
                <p className="text-slate-500">
                  Recipient: <strong className="text-slate-700">{grant.recipientName}</strong> • Disbursed on: {grant.date}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-base font-black text-purple-900">{formatINR(grant.amount)}</span>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {grant.status}
                </span>
              </div>
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
            <label className="block font-bold text-slate-700 mb-1">Beneficiary Worker Name & Trade</label>
            <input
              type="text"
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Grant Purpose / Objective</label>
            <input
              type="text"
              required
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Grant Amount (₹)</label>
              <input
                type="number"
                required
                min="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Grant Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white"
              >
                <option value="Equipment Upgrade">Equipment & Tool Upgrade</option>
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
              className="px-4 py-2 border rounded-xl font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md"
            >
              Approve & Disburse Funds
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
