import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { UserCheck, ShieldCheck, Wrench, RefreshCw, Sparkles } from 'lucide-react';

export function RoleSwitcherBar() {
  const { currentRole, currentUser, switchRole } = useAuth();
  const { resetToSeedData, bookings, providers } = useAppData();

  const activeJobsCount = bookings.filter(b => b.status === 'IN_PROGRESS' || b.status === 'ACCEPTED' || b.status === 'REQUESTED').length;
  const pendingKycCount = providers.filter(p => !p.verified).length;

  return (
    <div className="bg-dark-950 text-white text-xs border-b border-white/[0.08] sticky top-0 z-50 shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: SIH Hackathon Demo Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 tracking-wide uppercase text-[10px] shadow-glow-emerald">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            SIH 2026 Evaluation Suite
          </span>
          <span className="text-slate-400 hidden md:inline text-[11px]">
            1-Click Persona Switcher:
          </span>
        </div>

        {/* Center: Role Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/10">
          
          {/* Customer */}
          <button
            type="button"
            onClick={() => switchRole('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all font-semibold text-xs ${
              currentRole === 'customer'
                ? 'bg-emerald-500 text-dark-950 shadow-glow-emerald font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>1. Customer (Priya)</span>
          </button>

          {/* Provider */}
          <button
            type="button"
            onClick={() => switchRole('provider')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all font-semibold text-xs relative ${
              currentRole === 'provider'
                ? 'bg-amber-500 text-dark-950 shadow-lg font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>2. Provider (Rajesh)</span>
            {activeJobsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>

          {/* Admin */}
          <button
            type="button"
            onClick={() => switchRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all font-semibold text-xs relative ${
              currentRole === 'admin'
                ? 'bg-purple-500 text-dark-950 shadow-lg font-black'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>3. Admin (Co-op Council)</span>
            {pendingKycCount > 0 && (
              <span className="px-1.5 py-0.2 text-[9px] bg-purple-400 text-dark-950 font-black rounded-full ml-1">
                {pendingKycCount} KYC
              </span>
            )}
          </button>
        </div>

        {/* Right: Language & Reset Demo State */}
        <div className="flex items-center gap-2">
          <span className="hidden lg:inline text-slate-500 text-[10px] font-mono">
            🇮🇳 English / हिन्दी
          </span>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset demo state to initial seed data?')) {
                resetToSeedData();
              }
            }}
            title="Reset database to initial pristine state"
            className="flex items-center gap-1 text-slate-400 hover:text-white hover:bg-white/[0.06] px-2.5 py-1 rounded-lg border border-transparent hover:border-white/10 transition text-[11px]"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Seed Data</span>
          </button>
        </div>

      </div>
    </div>
  );
}
