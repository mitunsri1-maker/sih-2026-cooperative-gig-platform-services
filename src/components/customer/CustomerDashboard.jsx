import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { ServiceRequestWizard } from './ServiceRequestWizard';
import { MatchResultsView } from './MatchResultsView';
import { ActiveBookingsList } from './ActiveBookingsList';
import { ProviderProfileModal } from './ProviderProfileModal';
import { rankProviders } from '../../services/matchingEngine';
import { HeartHandshake, Sparkles, ShieldCheck, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export function CustomerDashboard({ activeSubTab, setActiveSubTab }) {
  const { providers, bookings, createBooking, rateBooking, communityFund } = useAppData();
  const { currentUser } = useAuth();

  const [requestCriteria, setRequestCriteria] = useState(null);
  const [rankedResults, setRankedResults] = useState([]);
  const [selectedProfileProvider, setSelectedProfileProvider] = useState(null);

  const handleSearchMatches = (criteria) => {
    setRequestCriteria(criteria);
    const ranked = rankProviders(providers, criteria);
    setRankedResults(ranked);
    setActiveSubTab('results');
  };

  const handleSelectProvider = (provider) => {
    createBooking({
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerPhone: currentUser.phone,
      customerAddress: `${requestCriteria?.neighborhood || 'Indiranagar'}, Bengaluru`,
      providerId: provider.id,
      providerName: provider.name,
      serviceId: requestCriteria?.categoryId || provider.categoryId,
      serviceTitle: `${requestCriteria?.requiredSkill || provider.trade}`,
      scheduledDate: requestCriteria?.preferredDate || '2026-09-09',
      scheduledSlot: requestCriteria?.preferredSlot || '17:00 - 20:00',
      description: requestCriteria?.description || 'Need expert service',
      matchScore: provider.matchScore || 96,
      matchBreakdown: provider.matchBreakdown,
      baseAmount: requestCriteria?.basePrice || 500
    });

    setActiveSubTab('bookings');
  };

  const handleBookDirectFromProfile = (provider) => {
    const defaultCriteria = {
      categoryId: provider.categoryId,
      categoryName: provider.trade,
      requiredSkill: provider.skills[0],
      description: `Direct booking with ${provider.name}`,
      urgency: 'STANDARD',
      preferredDate: '2026-09-10',
      preferredSlot: '14:00 - 17:00',
      neighborhood: 'Indiranagar',
      basePrice: provider.pricing?.hourlyRate || 450
    };
    setRequestCriteria(defaultCriteria);
    handleSelectProvider({
      ...provider,
      matchScore: 95
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-Views */}
      {activeSubTab === 'request' && (
        <ServiceRequestWizard onSearchMatches={handleSearchMatches} />
      )}

      {activeSubTab === 'results' && requestCriteria && (
        <MatchResultsView
          rankedProviders={rankedResults}
          requestCriteria={requestCriteria}
          onSelectProvider={handleSelectProvider}
          onBackToSearch={() => setActiveSubTab('request')}
          onViewProviderProfile={(prov) => setSelectedProfileProvider(prov)}
        />
      )}

      {activeSubTab === 'bookings' && (
        <ActiveBookingsList
          bookings={bookings}
          onRateBooking={rateBooking}
          onNewRequestClick={() => setActiveSubTab('request')}
        />
      )}

      {activeSubTab === 'coop-fund' && (
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          
          {/* Top Hero Card */}
          <div className="rounded-3xl bg-dark-900/90 backdrop-blur-2xl text-white p-8 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              <HeartHandshake className="w-4 h-4" />
              <span>CoServe Collective Welfare Pool</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Where 10% of Every Service Booking Goes
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Unlike corporate gig monopolies that pocket up to 35% commission for venture shareholders, 
              CoServe allocates 10% into a collective, transparent bank escrow for emergency health coverage, tool upgrades, and skills training for our local tradespeople.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-xs text-slate-400 block font-semibold">Total Pooled Vault</span>
                <span className="text-2xl font-black font-mono text-emerald-400">{formatINR(communityFund.totalPoolBalance)}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="text-xs text-slate-400 block font-semibold">Grants Disbursed</span>
                <span className="text-2xl font-black font-mono text-purple-400">{formatINR(communityFund.disbursedToDate)}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-400 block font-semibold">Beneficiary Workers</span>
                <span className="text-2xl font-black font-mono text-cyan-400">{communityFund.beneficiaryWorkers} Craftsmen</span>
              </div>
            </div>
          </div>

          {/* Active Grants Ledger */}
          <div className="rounded-3xl bg-dark-900/80 backdrop-blur-2xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Recent Community Welfare Disbursements
            </h3>

            <div className="divide-y divide-white/10">
              {communityFund.activeGrants.map((grant) => (
                <div key={grant.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">{grant.purpose}</h4>
                    <p className="text-[11px] text-slate-400">Recipient: <strong className="text-emerald-400">{grant.recipientName}</strong> • Date: {grant.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black font-mono text-emerald-400 block">{formatINR(grant.amount)}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {grant.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Provider Profile Modal */}
      {selectedProfileProvider && (
        <ProviderProfileModal
          isOpen={!!selectedProfileProvider}
          provider={selectedProfileProvider}
          onClose={() => setSelectedProfileProvider(null)}
          onBookNow={handleBookDirectFromProfile}
        />
      )}

    </div>
  );
}
