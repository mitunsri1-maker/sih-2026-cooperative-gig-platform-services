import React from 'react';
import { Modal } from '../common/Modal';
import { TrustScoreMeter } from '../common/TrustScoreMeter';
import { ShieldCheck, Star, MapPin, CheckCircle2, Clock, Award, Phone, Mail, FileCheck } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export function ProviderProfileModal({ provider, isOpen, onClose, onBookNow }) {
  if (!provider) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cooperative Craftsman Profile" maxWidth="max-w-2xl">
      <div className="space-y-6">
        
        {/* Header Section with Avatar & Trust Level */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 bg-gradient-to-br from-slate-50 to-emerald-50/50 rounded-2xl border border-slate-200">
          <div className="relative">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-white shadow-md"
            />
            {provider.verified && (
              <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-full shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl font-bold text-slate-900">{provider.name}</h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {provider.verificationDetails?.badge || 'Cooperative Member'}
              </span>
            </div>

            <p className="text-sm font-medium text-slate-600">{provider.trade} • {provider.experienceYears} Years Experience</p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 text-yellow-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                {provider.rating} ({provider.reviewCount} reviews)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {provider.location?.address}, {provider.location?.area}
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {provider.completedJobs} Jobs Done
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Trust Score Section */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            CoServe Trust & Peer Reputation Index
          </h4>
          <TrustScoreMeter score={provider.trustScore} size="md" showDetails={true} />
        </div>

        {/* KYC & Verification Details */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs">
          <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            Verified Credentials on Record
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Government ID Proof</span>
              <span className="font-semibold text-slate-800">{provider.verificationDetails?.idProof || 'Aadhaar Verified'}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Trade Qualification / Certification</span>
              <span className="font-semibold text-slate-800">{provider.verificationDetails?.skillCertificate || 'Cooperative Council Certified'}</span>
            </div>
          </div>
        </div>

        {/* Skills & Bio */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Skill Competencies & Specializations
          </h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {provider.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-lg border border-emerald-200/60">
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
            "{provider.bio}"
          </p>
        </div>

        {/* Cooperative Community Contribution */}
        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-emerald-950 block">Cooperative Community Fund Contribution</span>
            <span className="text-emerald-800 text-[11px]">Cumulative 10% welfare pooled from completed jobs</span>
          </div>
          <span className="text-base font-extrabold text-emerald-900">{formatINR(provider.coopFundContribution)}</span>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
          {onBookNow && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookNow(provider);
              }}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
            >
              Book Service with {provider.name}
            </button>
          )}
        </div>

      </div>
    </Modal>
  );
}
