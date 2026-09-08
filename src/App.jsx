import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppDataProvider, useAppData } from './context/AppDataContext';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { Navbar } from './components/common/Navbar';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Hero } from './components/home/Hero';
import { ServiceSearch } from './components/home/ServiceSearch';
import { ServiceCard } from './components/home/ServiceCard';
import { SmartMatchSection } from './components/home/SmartMatchSection';
import { SERVICE_CATEGORIES } from './data/categories';

function AppContent() {
  const { currentRole, switchRole } = useAuth();
  const { communityFund } = useAppData();
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const handleSearchMatches = (category) => {
    setSelectedCategory(category);
    setActiveTab('request');
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col font-sans">

      {/* 1. Global SIH Hackathon Role Switcher Bar */}
      <RoleSwitcherBar />

      {/* 2. Responsive Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Main Body Content */}
      <main className="flex-1 w-full">

        {/* Home / Landing Page (Customer Entry) */}
        {activeTab === 'home' && currentRole === 'customer' && (
          <div className="w-full">
            {/* Hero Section — full bleed */}
            <Hero
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onFindService={() => setActiveTab('request')}
              onBecomeProvider={() => {
                switchRole('provider');
                setActiveTab('provider-jobs');
              }}
            />

            {/* Service Search — contained width */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ServiceSearch
                onSearch={handleSearchMatches}
                categories={SERVICE_CATEGORIES}
              />
            </div>

            {/* Service Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-10">
                <p className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-3">Service Categories</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Every Trade.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Verified &amp; Fair-Priced.
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {SERVICE_CATEGORIES.map((cat) => (
                  <ServiceCard
                    key={cat.id}
                    category={cat}
                    isSelected={selectedCategory?.id === cat.id}
                    onSelect={(c) => {
                      setSelectedCategory(c);
                      setActiveTab('request');
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Smart Match Section */}
            <SmartMatchSection onFindService={() => setActiveTab('request')} />

            {/* Community Fund Teaser */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center border border-white/10 bg-gradient-to-br from-purple-900/20 via-dark-900 to-emerald-900/10">
                <span className="inline-block text-xs font-bold tracking-widest text-purple-300 uppercase mb-4">
                  Cooperative Model
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  Community Welfare Pool
                </h2>
                <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
                  10% of every transaction goes to a shared cooperative welfare fund — for tool upgrades, medical emergencies, and skill training for our local craftsmen.
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="text-2xl font-black text-white">₹{(communityFund.totalPoolBalance / 1000).toFixed(0)}K</div>
                    <div className="text-[11px] text-slate-400 mt-1">Pool Balance</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="text-2xl font-black text-white">{communityFund.beneficiaryWorkers}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Workers Helped</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="text-2xl font-black text-white">85%</div>
                    <div className="text-[11px] text-slate-400 mt-1">Worker Share</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Portal */}
        {currentRole === 'customer' && activeTab !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <CustomerDashboard
              activeSubTab={activeTab}
              setActiveSubTab={setActiveTab}
              initialCategory={selectedCategory}
            />
          </div>
        )}

        {/* Provider Portal */}
        {currentRole === 'provider' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ProviderDashboard
              activeSubTab={activeTab}
              setActiveSubTab={setActiveTab}
            />
          </div>
        )}

        {/* Admin Portal */}
        {currentRole === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AdminDashboard
              activeSubTab={activeTab}
              setActiveSubTab={setActiveTab}
            />
          </div>
        )}

      </main>

      {/* 4. Footer */}
      <footer className="border-t border-white/5 py-8 text-xs text-slate-500 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-xs">
              C
            </div>
            <span className="font-extrabold text-slate-300">CoServe Cooperative Platform</span>
            <span className="text-slate-600">• Smart India Hackathon (SIH 2026)</span>
          </div>
          <div className="text-slate-600">
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
