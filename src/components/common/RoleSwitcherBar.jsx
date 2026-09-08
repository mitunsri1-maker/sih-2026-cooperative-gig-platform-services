import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { UserCheck, ShieldCheck, Wrench, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';

export function RoleSwitcherBar() {
  const { currentRole, currentUser, switchRole, availableDemoUsers } = useAuth();
  const { resetToSeedData, bookings, providers } = useAppData();

  const activeJobsCount = bookings.filter(b => b.status === 'IN_PROGRESS' || b.status === 'ACCEPTED' || b.status === 'REQUESTED').length;
  const pendingKycCount = providers.filter(p => !p.verified).length;

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: SIH Hackathon Demo Badge & Status */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 tracking-wide uppercase text-[10px]">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            SIH 2026 Live Demo
          </span>
          <span className="text-slate-300 hidden md:inline">
            Interactive Multi-Role Switcher (1-Click Evaluation Mode):
          </span>
        </div>

        {/* Center: Role Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60">
          
          {/* Customer */}
          <button
            onClick={() => switchRole('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium ${
              currentRole === 'customer'
                ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>1. Customer (Priya)</span>
          </button>

          {/* Provider */}
          <button
            onClick={() => switchRole('provider')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium relative ${
              currentRole === 'provider'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>2. Provider (Rajesh)</span>
            {activeJobsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5"></span>
            )}
          </button>

          {/* Admin */}
          <button
            onClick={() => switchRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium relative ${
              currentRole === 'admin'
                ? 'bg-purple-600 text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>3. Admin (Co-op Council)</span>
            {pendingKycCount > 0 && (
              <span className="px-1.5 py-0.2 text-[9px] bg-purple-400 text-purple-950 font-bold rounded-full ml-1">
                {pendingKycCount} KYC
              </span>
            )}
          </button>
        </div>

        {/* Right: Language & Reset Demo State */}
        <div className="flex items-center gap-2">
          {/* Quick Voice / Language Switcher */}
          <span className="hidden lg:inline text-slate-400 text-[10px]">Language:</span>
          <span className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300 font-semibold text-[10px]">
            🇮🇳 English / हिन्दी
          </span>

          <button
            onClick={() => {
              if (window.confirm('Reset demo state to initial seed data?')) {
                resetToSeedData();
              }
            }}
            title="Reset database to initial pristine state"
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-2 py-1 rounded border border-transparent hover:border-slate-700 transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Seed Data</span>
          </button>
        </div>

      </div>
    </div>
  );
}
