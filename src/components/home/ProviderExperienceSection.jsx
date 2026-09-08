import React, { useState } from 'react';
import { CheckCircle, Zap, MapPin, Clock, ArrowRight } from 'lucide-react';

const INCOMING_JOB = {
  title: 'Fan Installation',
  category: 'Electrical',
  distance: '1.8 km',
  time: 'Today · 5:00 PM',
  amount: '₹450',
  customer: 'Priya S.',
  color: '#f59e0b',
};

export function ProviderExperienceSection() {
  const [accepted, setAccepted] = useState(false);
  const [accepting, setAccepting] = useState(false);

  const handleAccept = () => {
    setAccepting(true);
    setTimeout(() => {
      setAccepted(true);
      setAccepting(false);
    }, 800);
  };

  const handleReset = () => {
    setAccepted(false);
    setAccepting(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Header */}
      <div className="text-center mb-14">
        <div className="section-label mx-auto mb-4">
          <span>🔧</span>
          For Local Providers
        </div>
        <h2 className="section-heading mb-4">
          MORE THAN A JOB.<br />
          <span className="text-gradient-emerald">A LOCAL OPPORTUNITY.</span>
        </h2>
        <p className="text-slate-400 text-base max-w-lg mx-auto">
          CoServe gives skilled workers a professional command center — not just a list of gigs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Left — Provider Dashboard Preview */}
        <div className="glass-panel rounded-3xl p-6 border border-amber-500/15 shadow-glow-gold space-y-5">

          {/* Provider header */}
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Rajesh Kumar"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10"
            />
            <div>
              <div className="font-black text-white text-lg">Rajesh Kumar</div>
              <div className="text-amber-400 text-xs font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" /> Electrician · Verified
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Anna Nagar, Bengaluru</div>
            </div>
            <div className="ml-auto">
              <div className="text-[10px] text-slate-500 text-right">Trust Score</div>
              <div className="text-lg font-black text-emerald-400 text-right">94/100</div>
            </div>
          </div>

          {/* Greeting */}
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Good morning, Rajesh.</div>

          {/* Today's stats */}
          <div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Today's Performance</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Earnings', value: '₹1,850', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                { label: 'Active Jobs', value: '4', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
                { label: 'Completed', value: '12', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
                { label: 'Rating', value: '4.9 ★', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
              ].map(stat => (
                <div key={stat.label} className={`rounded-2xl p-3.5 border ${stat.bg} text-center`}>
                  <div className={`text-xl font-black font-mono ${stat.color}`}>{stat.value}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly earnings mini bar chart */}
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Weekly Earnings</div>
            <div className="flex items-end gap-1.5 h-10">
              {[40, 75, 55, 90, 65, 100, 80].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-amber-400/60 hover:bg-amber-400 transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-slate-600 mt-1">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Right — Incoming Job + Accept */}
        <div className="space-y-5">
          {/* Incoming job card */}
          <div className={`glass-panel rounded-3xl p-6 border transition-all duration-500 ${
            accepted
              ? 'border-emerald-500/50 shadow-glow-emerald'
              : 'border-amber-500/25 shadow-glow-gold'
          }`}>

            <div className={`text-[10px] font-black uppercase tracking-widest mb-3 ${
              accepted ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {accepted ? '✓ Job Accepted' : '● New Incoming Job'}
            </div>

            <div className="flex items-start gap-4 mb-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                accepted ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-amber-500/15 border border-amber-500/25'
              }`}>
                ⚡
              </div>
              <div>
                <div className="text-lg font-black text-white">{INCOMING_JOB.title}</div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">{INCOMING_JOB.category}</div>
              </div>
              <div className="ml-auto text-right">
                <div className="text-xl font-black text-emerald-400 font-mono">{INCOMING_JOB.amount}</div>
                <div className="text-[10px] text-slate-500">+₹38 co-op contribution</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: <MapPin className="w-3.5 h-3.5" />, value: INCOMING_JOB.distance, label: 'Distance' },
                { icon: <Clock className="w-3.5 h-3.5" />, value: INCOMING_JOB.time, label: 'Scheduled' },
              ].map(info => (
                <div key={info.label} className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-slate-400">{info.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-white">{info.value}</div>
                    <div className="text-[9px] text-slate-500">{info.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer info */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-5">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-black">
                P
              </div>
              <div>
                <div className="text-xs font-bold text-white">{INCOMING_JOB.customer}</div>
                <div className="text-[9px] text-slate-500">★ 4.8 customer · 12 bookings</div>
              </div>
            </div>

            {/* Accept button */}
            {!accepted ? (
              <button
                onClick={handleAccept}
                className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  accepting
                    ? 'bg-emerald-600 scale-95'
                    : 'bg-emerald-500 hover:bg-emerald-400 shadow-glow-emerald hover:scale-[1.02]'
                } text-dark-950`}
              >
                {accepting ? (
                  <div className="w-5 h-5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 stroke-[2.5]" />
                    <span>Accept Job</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="w-full py-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-3 text-emerald-400 font-black">
                  <CheckCircle className="w-5 h-5 fill-emerald-500 text-dark-950" />
                  <span>Job Accepted! Navigate to site</span>
                </div>
                <button onClick={handleReset} className="w-full text-xs text-slate-500 hover:text-white transition py-2">
                  ↩ Reset demo
                </button>
              </div>
            )}
          </div>

          {/* Provider benefits */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Instant Payout', value: '85%', color: 'text-emerald-400', icon: '💰' },
              { label: 'Welfare Fund', value: 'Enrolled', color: 'text-amber-400', icon: '🛡️' },
              { label: 'Skill Badge', value: 'Verified', color: 'text-cyan-400', icon: '🏅' },
              { label: 'Network Rank', value: 'Top 10%', color: 'text-purple-400', icon: '📈' },
            ].map(item => (
              <div key={item.label} className="glass-panel rounded-2xl p-4 border border-white/8 text-center">
                <div className="text-xl mb-1">{item.icon}</div>
                <div className={`text-sm font-black ${item.color}`}>{item.value}</div>
                <div className="text-[10px] text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
