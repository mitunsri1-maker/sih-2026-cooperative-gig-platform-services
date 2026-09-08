import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { formatINR } from '../../utils/formatters';
import { ShieldCheck, HeartHandshake, Bell, Zap, User, Award } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab }) {
  const { currentRole, currentUser } = useAuth();
  const { communityFund } = useAppData();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-[37px] z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Cooperative Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">CoServe</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Cooperative</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Local Skill Collective • Fair Pay • Community Fund</p>
            </div>
          </div>

          {/* Navigation Links based on Role */}
          <nav className="hidden md:flex items-center gap-1">
            {currentRole === 'customer' && (
              <>
                <button
                  onClick={() => setActiveTab('request')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'request'
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Find a Service
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'bookings'
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setActiveTab('coop-fund')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'coop-fund'
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Community Welfare Fund
                </button>
              </>
            )}

            {currentRole === 'provider' && (
              <>
                <button
                  onClick={() => setActiveTab('provider-jobs')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'provider-jobs'
                      ? 'bg-amber-50 text-amber-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Jobs & Pipeline
                </button>
                <button
                  onClick={() => setActiveTab('provider-earnings')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'provider-earnings'
                      ? 'bg-amber-50 text-amber-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  My Earnings & Fund Pool
                </button>
                <button
                  onClick={() => setActiveTab('provider-profile')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'provider-profile'
                      ? 'bg-amber-50 text-amber-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'admin-overview'
                      ? 'bg-purple-50 text-purple-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Governance Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('admin-kyc')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'admin-kyc'
                      ? 'bg-purple-50 text-purple-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  KYC Verification Desk
                </button>
                <button
                  onClick={() => setActiveTab('admin-fund')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'admin-fund'
                      ? 'bg-purple-50 text-purple-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 cursor-pointer hover:bg-emerald-100/80 transition"
              title="Shared Community Welfare Pool"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs text-emerald-800 font-medium">Community Fund:</span>
              <span className="text-xs font-bold text-emerald-950">{formatINR(communityFund.totalPoolBalance)}</span>
            </div>

            {/* Profile Avatar & Name */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-slate-200 ring-2 ring-emerald-500/20"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-slate-900 leading-tight flex items-center gap-1">
                  {currentUser.name}
                  {currentRole === 'provider' && <Award className="w-3.5 h-3.5 text-amber-500 inline" />}
                </div>
                <div className="text-[10px] text-slate-500 font-medium capitalize">
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
