import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { formatINR } from '../../utils/formatters';
import { ShieldCheck, HeartHandshake, Sparkles, User, Award, Layers } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab }) {
  const { currentRole, currentUser } = useAuth();
  const { communityFund } = useAppData();

  return (
    <header className="sticky top-[37px] z-40 bg-dark-950/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Cooperative Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-dark-950 shadow-glow-emerald group-hover:scale-105 transition-transform font-black">
              <HeartHandshake className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white">CoServe</span>
                <span className="text-[9px] uppercase font-black tracking-widest bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Cooperative
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Local Skill Collective • Fair Pay • Community Fund</p>
            </div>
          </div>

          {/* Navigation Links based on Role */}
          <nav className="hidden md:flex items-center gap-1.5">
            {currentRole === 'customer' && (
              <>
                <button
                  onClick={() => setActiveTab('request')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'request'
                      ? 'bg-white/[0.08] text-white border border-white/10 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Find a Service
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'bookings'
                      ? 'bg-white/[0.08] text-white border border-white/10 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setActiveTab('coop-fund')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'coop-fund'
                      ? 'bg-white/[0.08] text-white border border-white/10 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Community Fund
                </button>
              </>
            )}

            {currentRole === 'provider' && (
              <>
                <button
                  onClick={() => setActiveTab('provider-jobs')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'provider-jobs'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Jobs & Pipeline
                </button>
                <button
                  onClick={() => setActiveTab('provider-earnings')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'provider-earnings'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  My Earnings & Welfare
                </button>
                <button
                  onClick={() => setActiveTab('provider-profile')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'provider-profile'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Skills & Availability
                </button>
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <button
                  onClick={() => setActiveTab('admin-overview')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'admin-overview'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Governance Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('admin-kyc')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'admin-kyc'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  KYC Verification Desk
                </button>
                <button
                  onClick={() => setActiveTab('admin-fund')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'admin-fund'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  Community Fund Vault
                </button>
              </>
            )}
          </nav>

          {/* Right Action & User Profile Card */}
          <div className="flex items-center gap-3">
            
            {/* Live Community Fund Pill */}
            <div 
              onClick={() => setActiveTab(currentRole === 'admin' ? 'admin-fund' : 'coop-fund')}
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/20 transition"
              title="Shared Community Welfare Pool"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-slate-300 font-medium">Community Pool:</span>
              <span className="text-[11px] font-black font-mono text-emerald-400">{formatINR(communityFund.totalPoolBalance)}</span>
            </div>

            {/* Profile Avatar & Name */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-white/20 shadow-md"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                  {currentUser.name}
                  {currentRole === 'provider' && <Award className="w-3.5 h-3.5 text-amber-400 inline" />}
                </div>
                <div className="text-[10px] text-emerald-400 font-medium capitalize">
                  {currentRole === 'provider' ? currentUser.trade : currentRole}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
