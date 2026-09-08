import React, { useState } from 'react';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { Search, MapPin, Calendar, Clock, Sparkles, ArrowRight } from 'lucide-react';

export function ServiceSearch({ onSearch }) {
  const [selectedCategory, setSelectedCategory] = useState(SERVICE_CATEGORIES[0].id);
  const [location, setLocation] = useState('Indiranagar');
  const [date, setDate] = useState('2026-09-09');
  const [time, setTime] = useState('17:00 - 20:00');

  const handleSubmit = (e) => {
    e.preventDefault();
    const catObj = SERVICE_CATEGORIES.find(c => c.id === selectedCategory) || SERVICE_CATEGORIES[0];
    onSearch({
      categoryId: catObj.id,
      categoryName: catObj.name,
      requiredSkill: catObj.subSkills[0],
      basePrice: catObj.basePrice,
      neighborhood: location,
      preferredDate: date,
      preferredSlot: time,
      description: `Need expert ${catObj.name} service at ${location}`
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="rounded-3xl bg-dark-900/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-5">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              What service do you need?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant explainable matching based on live availability and locality proximity.
            </p>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
            Zero Platform Surcharge
          </span>
        </div>

        {/* Form Fields Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Field 1: Service */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Service
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 px-3.5 rounded-2xl glass-input text-xs font-semibold focus:border-emerald-500"
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-dark-900 text-white">
                    {cat.name} (from ₹{cat.basePrice})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Field 2: Location */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl glass-input text-xs font-semibold focus:border-emerald-500"
            >
              <option value="Indiranagar" className="bg-dark-900 text-white">Indiranagar (1.2 km)</option>
              <option value="Koramangala" className="bg-dark-900 text-white">Koramangala (2.4 km)</option>
              <option value="HSR Layout" className="bg-dark-900 text-white">HSR Layout (3.8 km)</option>
              <option value="Whitefield" className="bg-dark-900 text-white">Whitefield (8.5 km)</option>
              <option value="Jayanagar" className="bg-dark-900 text-white">Jayanagar (5.1 km)</option>
            </select>
          </div>

          {/* Field 3: Date */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-400" />
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl glass-input text-xs font-semibold focus:border-emerald-500 font-mono"
            />
          </div>

          {/* Field 4: Time Window */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              Time
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl glass-input text-xs font-semibold focus:border-emerald-500"
            >
              <option value="09:00 - 12:00" className="bg-dark-900 text-white">Morning (09:00 - 12:00)</option>
              <option value="14:00 - 17:00" className="bg-dark-900 text-white">Afternoon (14:00 - 17:00)</option>
              <option value="17:00 - 20:00" className="bg-dark-900 text-white">Evening (17:00 - 20:00)</option>
            </select>
          </div>

          {/* Button: Find Best Match */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-black text-xs shadow-glow-emerald flex items-center justify-center gap-1.5 transition transform active:scale-95"
            >
              <Search className="w-4 h-4 stroke-[3]" />
              <span>Find Best Match</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
