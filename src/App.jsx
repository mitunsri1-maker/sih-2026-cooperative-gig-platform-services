import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppDataProvider, useAppData } from './context/AppDataContext';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { Navbar } from './components/common/Navbar';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Home Showcase Sections
import { Hero } from './components/home/Hero';
import { LiveNetworkSection } from './components/home/LiveNetworkSection';
import { ServiceSearch } from './components/home/ServiceSearch';
import { ServiceCard } from './components/home/ServiceCard';
import { SmartMatchSection } from './components/home/SmartMatchSection';
import { TrustSystemSection } from './components/home/TrustSystemSection';
import { MoneyFlowSection } from './components/home/MoneyFlowSection';
import { ProviderExperienceSection } from './components/home/ProviderExperienceSection';
import { JobJourneySection } from './components/home/JobJourneySection';
import { CommunityImpactSection } from './components/home/CommunityImpactSection';
import { CommunityFundSection } from './components/home/CommunityFundSection';

import { SERVICE_CATEGORIES } from './data/categories';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

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
      setActiveTab('home');
    }
  }, [currentRole]);

  const handleSearchMatches = (category) => {
    setSelectedCategory(category);
    setActiveTab('request');
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">

      {/* 1. Global SIH Hackathon Persona Switcher Bar */}
      <RoleSwitcherBar />

      {/* 2. Responsive Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Main Body Content */}
      <main className="flex-1 w-full">

        {/* Home Showcase Experience (Customer / Landing View) */}
        {activeTab === 'home' && currentRole === 'customer' && (
          <div className="w-full space-y-4">
            
            {/* 1. HERO & 3D SPATIAL SERVICE NETWORK */}
            <Hero
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => {
                const found = SERVICE_CATEGORIES.find(c => c.id === catId);
                setSelectedCategory(found || null);
              }}
              onFindService={() => setActiveTab('request')}
              onBecomeProvider={() => {
                switchRole('provider');
                setActiveTab('provider-jobs');
              }}
            />

            {/* 2. LIVE LOCAL NETWORK (Visual City & Live Activity Feed) */}
            <LiveNetworkSection />

            {/* 3. SERVICE DISCOVERY (Floating Search & Asymmetric Service Cards) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="mb-10">
                <ServiceSearch
                  onSearch={handleSearchMatches}
                  categories={SERVICE_CATEGORIES}
                />
              </div>

              <div className="text-center mb-12">
                <div className="section-label mx-auto mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Service Discovery
                </div>
                <h2 className="section-heading mb-4">
                  EVERY TRADE.<br />
                  <span className="text-gradient-emerald">VERIFIED &amp; FAIR-PRICED.</span>
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                  Direct connection to cooperative craftsmen. No middleman markups, guaranteed floor rates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICE_CATEGORIES.map((cat, idx) => (
                  <ServiceCard
                    key={cat.id}
                    index={idx}
                    category={cat}
                    isSelected={selectedCategory?.id === cat.id}
                    onSelect={(c) => {
                      setSelectedCategory(c);
                      setActiveTab('request');
                    }}
                  />
                ))}
              </div>
            </section>

            {/* 4. DON'T SEARCH. GET MATCHED. (5-Pillar Matching Engine) */}
            <SmartMatchSection
              onFindService={() => setActiveTab('request')}
            />

            {/* 5. TRUST ISN'T A BADGE. IT'S A SYSTEM. (3-Layer Verification Rings) */}
            <TrustSystemSection />

            {/* 6. COOPERATIVE MONEY FLOW (85/10/5 Transparent Split) */}
            <MoneyFlowSection />

            {/* 7. PROVIDER EXPERIENCE (Live Command Center & Accept Simulation) */}
            <ProviderExperienceSection />

            {/* 8. THE JOB JOURNEY (7-Stage Interactive Pipeline) */}
            <JobJourneySection />

            {/* 9. ONE SERVICE. A BIGGER IMPACT. (Customer + Worker + Community Pillars) */}
            <CommunityImpactSection />

            {/* 10. LIVE COMMUNITY FUND POOL (Radial Allocation Visualization) */}
            <CommunityFundSection />

            {/* Final CTA Strip */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="relative rounded-3xl p-10 sm:p-14 text-center border border-emerald-500/30 overflow-hidden bg-gradient-to-b from-emerald-950/40 via-dark-900 to-dark-950 shadow-glow-emerald">
                <div className="absolute inset-0 bg-radial-atmosphere pointer-events-none" />
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                  <div className="section-label mx-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Join The Movement
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    Ready to experience a truly fair local service network?
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Book your first service with guaranteed transparency or join as a verified skilled craftsman today.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                      onClick={() => setActiveTab('request')}
                      className="btn-primary w-full sm:w-auto"
                    >
                      <span>Find a Local Pro</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                    <button
                      onClick={() => {
                        switchRole('provider');
                        setActiveTab('provider-jobs');
                      }}
                      className="btn-ghost w-full sm:w-auto"
                    >
                      <span>Join as a Provider</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* Customer Portal Views (Request / Bookings / Fund) */}
        {currentRole === 'customer' && activeTab !== 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CustomerDashboard
              activeSubTab={activeTab}
              setActiveSubTab={setActiveTab}
              initialCategory={selectedCategory}
            />
          </div>
        )}

        {/* Provider Portal */}
        {currentRole === 'provider' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProviderDashboard
              activeSubTab={activeTab}
              setActiveSubTab={setActiveTab}
            />
          </div>
        )}

        {/* Admin Portal */}
        {currentRole === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminDashboard
              activeSubTab={activeTab}
              setActiveSubTab={setActiveTab}
            />
          </div>
        )}

      </main>

      {/* 4. Footer */}
      <footer className="border-t border-white/[0.08] py-12 text-xs text-slate-500 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-dark-950 flex items-center justify-center font-black text-sm shadow-glow-emerald">
                C
              </div>
              <div>
                <span className="font-black text-sm text-slate-200">CoServe Cooperative Platform</span>
                <span className="text-slate-500 block text-[11px]">Smart India Hackathon (SIH 2026) Showcase</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> 85% Direct Worker Pay
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <HeartHandshake className="w-3.5 h-3.5" /> 10% Community Welfare Pool
              </span>
              <span className="text-cyan-400">
                5% Platform Sustainability
              </span>
            </div>
          </div>

          <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600">
            <p>© 2026 CoServe Cooperative Services Platform. All rights reserved.</p>
            <p className="font-mono text-[11px]">PEOPLE → SKILLS → LOCATION → TRUST → JOB → EARNINGS → COMMUNITY</p>
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
