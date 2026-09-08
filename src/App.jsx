import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppDataProvider, useAppData } from './context/AppDataContext';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { Navbar } from './components/common/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

function AppContent() {
  const { currentRole, switchRole } = useAuth();
  const { communityFund } = useAppData();

  // Active view tab
  // Options: 'home', 'request', 'bookings', 'coop-fund', 'provider-jobs', 'provider-earnings', 'provider-profile', 'admin-overview', 'admin-kyc', 'admin-fund'
  const [activeTab, setActiveTab] = useState(() => {
    if (currentRole === 'provider') return 'provider-jobs';
    if (currentRole === 'admin') return 'admin-overview';
    return 'home';
  });

  // Sync tab with role changes
  React.useEffect(() => {
    if (currentRole === 'provider' && !activeTab.startsWith('provider')) {
      setActiveTab('provider-jobs');
    } else if (currentRole === 'admin' && !activeTab.startsWith('admin')) {
      setActiveTab('admin-overview');
    } else if (currentRole === 'customer' && (activeTab.startsWith('provider') || activeTab.startsWith('admin'))) {
      setActiveTab('request');
    }
  }, [currentRole]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* 1. Global SIH Hackathon Role Switcher Bar */}
      <RoleSwitcherBar />

      {/* 2. Responsive Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Landing Page (Customer Entry) */}
        {activeTab === 'home' && currentRole === 'customer' && (
          <LandingPage
            onFindService={() => setActiveTab('request')}
            onBecomeProvider={() => {
              switchRole('provider');
              setActiveTab('provider-jobs');
            }}
            communityFund={communityFund}
          />
        )}

        {/* Customer Portal */}
        {currentRole === 'customer' && activeTab !== 'home' && (
          <CustomerDashboard
            activeSubTab={activeTab}
            setActiveSubTab={setActiveTab}
          />
        )}

        {/* Provider Portal */}
        {currentRole === 'provider' && (
          <ProviderDashboard
            activeSubTab={activeTab}
            setActiveSubTab={setActiveTab}
          />
        )}

        {/* Admin Portal */}
        {currentRole === 'admin' && (
          <AdminDashboard
            activeSubTab={activeTab}
            setActiveSubTab={setActiveTab}
          />
        )}

      </main>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              C
            </div>
            <span className="font-extrabold text-slate-900">CoServe Cooperative Platform</span>
            <span>• Smart India Hackathon (SIH 2026)</span>
          </div>

          <div className="text-slate-400">
            Transparent Matching Formula • 85% Worker Share • 10% Community Welfare Fund
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <AppContent />
      </AppDataProvider>
    </AuthProvider>
  );
}
