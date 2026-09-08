import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, FileText, Award, User, MapPin, Sparkles } from 'lucide-react';

export function ProviderVerification({ providers, onVerifyProvider }) {
  const pendingProviders = providers.filter(p => !p.verified);
  const verifiedProviders = providers.filter(p => p.verified);

  const [selectedBadge, setSelectedBadge] = useState('Cooperative Master Craftsman');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Provider KYC & Skill Verification Desk</h3>
          <p className="text-xs text-slate-500">
            Review submitted government IDs and trade trade credentials before issuing the CoServe Certified Trust Badge.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full border border-purple-200">
          {pendingProviders.length} Pending Review
        </span>
      </div>

      {/* Pending Applicants List */}
      {pendingProviders.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-xs">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 text-sm">KYC Queue Cleared</h4>
          <p className="text-xs text-slate-500 mt-1">All registered local tradespeople have been verified and badged.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{provider.name}</h4>
                    <p className="text-xs text-slate-500">{provider.trade} • {provider.experienceYears} yrs experience</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{provider.location?.area}, Bengaluru</span>
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200 self-start sm:self-auto">
                  KYC Pending Approval
                </span>
              </div>

              {/* Submitted Documents Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Applicant Submitted Documents:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">ID Verification</span>
                    <span className="font-semibold text-slate-900">{provider.verificationDetails?.idProof || 'Aadhaar Card Copy'}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Trade Credential</span>
                    <span className="font-semibold text-slate-900">{provider.verificationDetails?.skillCertificate || 'ITI Trade Diploma / Peer Recommendation'}</span>
                  </div>
                </div>
              </div>

              {/* Approval Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-600">Assign Badge:</span>
                  <select
                    value={selectedBadge}
                    onChange={(e) => setSelectedBadge(e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Cooperative Master Craftsman">Cooperative Master Craftsman</option>
                    <option value="Certified Hygiene Lead">Certified Hygiene Lead</option>
                    <option value="Verified Craftsman">Verified Craftsman</option>
                    <option value="HVAC Specialist">HVAC Specialist</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => onVerifyProvider(provider.id, selectedBadge)}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Approve & Grant Verified Badge</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Verified Roster */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-slate-900">
          Cooperative Verified Craftsmen Roster ({verifiedProviders.length})
        </h4>

        <div className="divide-y divide-slate-100">
          {verifiedProviders.map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-xl object-cover" />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    {p.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-slate-500">{p.trade} • {p.location?.area}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {p.verificationDetails?.badge || 'Verified'}
                </span>
                <span className="text-xs font-extrabold text-slate-700">Trust: {p.trustScore}/100</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
