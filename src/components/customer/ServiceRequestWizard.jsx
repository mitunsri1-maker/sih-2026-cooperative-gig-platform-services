import React, { useState } from 'react';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { 
  Zap, Wrench, Sparkles, Cpu, Hammer, Wind, Paintbrush, GraduationCap,
  Calendar, Clock, MapPin, AlertCircle, ArrowRight, ShieldCheck, HeartHandshake
} from 'lucide-react';

const ICON_MAP = {
  Zap, Wrench, Sparkles, Cpu, Hammer, Wind, Paintbrush, GraduationCap
};

export function ServiceRequestWizard({ onSearchMatches }) {
  const [selectedCategory, setSelectedCategory] = useState(SERVICE_CATEGORIES[0]);
  const [selectedSubSkill, setSelectedSubSkill] = useState(SERVICE_CATEGORIES[0].subSkills[0]);
  const [description, setDescription] = useState('Ceiling fan makes rattling noise and switchboard sparks occasionally.');
  const [urgency, setUrgency] = useState('STANDARD');
  const [preferredDate, setPreferredDate] = useState('2026-09-09');
  const [preferredSlot, setPreferredSlot] = useState('17:00 - 20:00');
  const [neighborhood, setNeighborhood] = useState('Indiranagar');

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubSkill(cat.subSkills[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMatches({
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.name,
      basePrice: selectedCategory.basePrice,
      requiredSkill: selectedSubSkill,
      description,
      urgency,
      preferredDate,
      preferredSlot,
      neighborhood
    });
  };

  return (
    <div className="rounded-3xl bg-dark-900/90 backdrop-blur-2xl p-6 sm:p-10 border border-white/10 shadow-2xl max-w-4xl mx-auto text-left">
      
      {/* Banner */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-2">
          <HeartHandshake className="w-3.5 h-3.5" />
          Cooperative Smart Service Request
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Find a Verified Local Cooperative Craftsman
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Explainable, transparent matching based on skill competency, live availability, distance & peer trust score.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        
        {/* 1. Category Selection Cards */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
            1. Select Trade / Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SERVICE_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] || Wrench;
              const isSelected = selectedCategory.id === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-32 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/40 shadow-glow-emerald ring-1 ring-emerald-500/30'
                      : 'border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-emerald-500 text-dark-950 shadow-glow-emerald' : 'bg-white/10 text-emerald-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white leading-snug">{cat.name}</div>
                    <div className="text-[11px] text-emerald-400 font-mono font-bold">From ₹{cat.basePrice}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Specific Sub-Skill Selection */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <label className="block text-xs font-bold text-slate-300 mb-2.5">
            2. Specific Skill or Task Needed (Feeds into 40% Skill Match Weight)
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedCategory.subSkills.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubSkill(sub)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedSubSkill === sub
                    ? 'bg-emerald-500 text-dark-950 font-black shadow-glow-emerald'
                    : 'bg-white/[0.04] text-slate-300 border border-white/10 hover:border-white/20'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Description & Urgency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              3. Describe the issue / instructions
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Bedroom fan making rattling noise, need fix tomorrow"
              className="w-full h-12 px-4 rounded-2xl glass-input text-xs focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Urgency Level
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl glass-input text-xs font-semibold focus:border-emerald-500"
            >
              <option value="INSTANT" className="bg-dark-900 text-white">⚡ Instant Match (60 Mins)</option>
              <option value="STANDARD" className="bg-dark-900 text-white">📅 Standard (Today / Tomorrow)</option>
              <option value="SCHEDULED" className="bg-dark-900 text-white">🗓️ Scheduled (This Weekend)</option>
            </select>
          </div>
        </div>

        {/* 4. Slot & Neighborhood */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Service Date
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl glass-input text-xs font-semibold font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Time Window
            </label>
            <select
              value={preferredSlot}
              onChange={(e) => setPreferredSlot(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl glass-input text-xs font-semibold"
            >
              <option value="09:00 - 12:00" className="bg-dark-900 text-white">Morning (09:00 - 12:00)</option>
              <option value="14:00 - 17:00" className="bg-dark-900 text-white">Afternoon (14:00 - 17:00)</option>
              <option value="17:00 - 20:00" className="bg-dark-900 text-white">Evening (17:00 - 20:00)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Your Neighborhood
            </label>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl glass-input text-xs font-semibold"
            >
              <option value="Indiranagar" className="bg-dark-900 text-white">Indiranagar (1.2 km)</option>
              <option value="Koramangala" className="bg-dark-900 text-white">Koramangala (2.4 km)</option>
              <option value="HSR Layout" className="bg-dark-900 text-white">HSR Layout (3.8 km)</option>
              <option value="Domlur" className="bg-dark-900 text-white">Domlur (1.8 km)</option>
              <option value="Jayanagar" className="bg-dark-900 text-white">Jayanagar (5.1 km)</option>
              <option value="Whitefield" className="bg-dark-900 text-white">Whitefield (8.5 km)</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cooperative Guaranteed Rates • 85% to Worker • 10% Community Fund</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-xs shadow-glow-emerald flex items-center justify-center gap-2 transition transform active:scale-95"
          >
            <span>Run Smart Matching Engine</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </form>

    </div>
  );
}
