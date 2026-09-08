import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { formatINR } from '../../utils/formatters';
import { HeartHandshake, Sparkles, Award, Compass, CalendarCheck, Landmark, Briefcase, DollarSign, UserCheck, Shield } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab }) {
  const { currentRole, currentUser } = useAuth();
  const { communityFund } = useAppData();

  return (
    <header className="sticky top-[37px] z-40 bg-dark-950/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left: Logo & Cooperative Brand */}
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
                <span className="text-[9px] uppercase font-black tracking-widest bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 shadow-glow-emerald">
                  Cooperative
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Living Local Service Network</p>
            </div>
          </div>

          {/* Center: Segmented Navigation Control */}
          <nav className="hidden md:flex items-center p-1 rounded-2xl bg-white/[0.03] border border-white/10 shadow-inner">
            {currentRole === 'customer' && (
              <>
                <button
                  onClick={() => setActiveTab('home')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === 'home'
                      ? 'bg-white/10 text-white shadow-lg border border-white/15'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Explore</span>
                </button>
                <button
                  onClick={() => setActiveTab('request')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === 'request'
                      ? 'bg-emerald-500/20 text-emerald-300 shadow-glow-emerald border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Find a Service</span>
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === 'bookings'
                      ? 'bg-cyan-500/20 text-cyan-300 shadow-glow-cyan border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>My Bookings</span>
                </button>
                <button
                  onClick={() => setActiveTab('coop-fund')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === 'coop-fund'
                      ? 'bg-purple-500/20 text-purple-300 shadow-glow-purple border border-purple-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5 text-purple-400" />
                  <span>Community Fund</span>
                </button>
              </>
            )}

            {currentRole === 'provider' && (
              <>
                <button
                  onClick={() => setActiveTab('provider-jobs')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === 'provider-jobs'
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-glow-gold'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  <span>Jobs &amp; Pipeline</span>
                </button>
                <button
                  onClick={() => setActiveTab('provider-earnings')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === 'provider-earnings'
                      ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-glow-emerald'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Earnings &amp; Welfare</span>
                </button>
                <button
                  onClick={() => setActiveTab('provider-profile')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === 'provider-profile'
                      ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Skills &amp; Availability</span>
                </button>
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <button
                  onClick={() => setActiveTab('admin-overview')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === 'admin-overview'
                      ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-glow-purple'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>Governance Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('admin-kyc')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === 'admin-kyc'
                      ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-glow-purple'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>KYC Desk</span>
                </button>
                <button
                  onClick={() => setActiveTab('admin-fund')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    activeTab === 'admin-fund'
                      ? 'bg-purple-500/25 text-purple-300 border border-purple-500/40 shadow-glow-purple'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5 text-purple-400" />
                  <span>Community Vault</span>
                </button>
              </>
            )}
          </nav>

          {/* Right: Live Community Pool Pill + Profile */}
          <div className="flex items-center gap-3">
            
            {/* Live Community Fund Pill */}
            <div 
              onClick={() => setActiveTab(currentRole === 'admin' ? 'admin-fund' : 'coop-fund')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 cursor-pointer hover:bg-emerald-500/20 shadow-glow-emerald transition-all duration-300 hover:scale-105"
              title="Shared Community Welfare Pool"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] text-slate-300 font-medium hidden sm:inline">Community Pool:</span>
              <span className="text-[11px] font-black font-mono text-emerald-400">{formatINR(communityFund.totalPoolBalance)}</span>
            </div>

            {/* Profile Avatar & Name */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-2xl object-cover border border-white/20 shadow-lg"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-black text-white leading-tight flex items-center gap-1">
                  {currentUser.name}
                  {currentRole === 'provider' && <Award className="w-3.5 h-3.5 text-amber-400 inline" />}
                </div>
                <div className="text-[10px] text-emerald-400 font-bold capitalize">
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
