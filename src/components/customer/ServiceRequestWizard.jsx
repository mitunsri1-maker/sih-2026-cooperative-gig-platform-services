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
  const [urgency, setUrgency] = useState('STANDARD'); // 'INSTANT', 'STANDARD', 'SCHEDULED'
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm max-w-4xl mx-auto">
      
      {/* Wizard Banner */}
      <div className="mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
          Cooperative Smart Service Request
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Find a Verified Local Cooperative Craftsman
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Explainable, transparent matching based on skill competency, live availability, distance & peer trust score.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Category Selection Cards */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
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
                  className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-28 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 leading-snug">{cat.name}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">From ₹{cat.basePrice}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Specific Sub-Skill / Task */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            2. Specific Skill or Repair Needed (Feeds into Skill Match Formula - 40% Weight)
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedCategory.subSkills.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubSkill(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedSubSkill === sub
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Description & Urgency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              3. Describe the issue / instructions
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Bedroom fan making rattling noise, need fix tomorrow"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Urgency Level
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-white font-medium"
            >
              <option value="INSTANT">⚡ Instant Match (Within 60 Mins)</option>
              <option value="STANDARD">📅 Standard (Today / Tomorrow)</option>
              <option value="SCHEDULED">🗓️ Scheduled (This Weekend)</option>
            </select>
          </div>
        </div>

        {/* 4. Slot & Neighborhood */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Service Date
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Preferred Time Window
            </label>
            <select
              value={preferredSlot}
              onChange={(e) => setPreferredSlot(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium bg-white"
            >
              <option value="09:00 - 12:00">Morning (09:00 - 12:00)</option>
              <option value="14:00 - 17:00">Afternoon (14:00 - 17:00)</option>
              <option value="17:00 - 20:00">Evening (17:00 - 20:00)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Your Neighborhood
            </label>
            <select
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium bg-white"
            >
              <option value="Indiranagar">Indiranagar (1.2 km)</option>
              <option value="Koramangala">Koramangala (2.4 km)</option>
              <option value="HSR Layout">HSR Layout (3.8 km)</option>
              <option value="Domlur">Domlur (1.8 km)</option>
              <option value="Jayanagar">Jayanagar (5.1 km)</option>
              <option value="Whitefield">Whitefield (8.5 km)</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cooperative Guaranteed Rates • 85% to Worker • 10% Community Fund</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition transform active:scale-95"
          >
            <span>Run Smart Matching Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
}
