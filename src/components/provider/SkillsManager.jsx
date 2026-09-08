import React, { useState } from 'react';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { Wrench, CheckCircle, Plus, Sparkles, Check, Award } from 'lucide-react';

export function SkillsManager({ provider, onUpdateSkills }) {
  const currentCategory = SERVICE_CATEGORIES.find(c => c.id === provider?.categoryId) || SERVICE_CATEGORIES[0];
  const [selectedSkills, setSelectedSkills] = useState(provider?.skills || []);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleSkill = (subSkill) => {
    let updated;
    if (selectedSkills.includes(subSkill)) {
      if (selectedSkills.length === 1) return;
      updated = selectedSkills.filter(s => s !== subSkill);
    } else {
      updated = [...selectedSkills, subSkill];
    }
    setSelectedSkills(updated);
    onUpdateSkills(provider.id, updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-dark-900/90 backdrop-blur-2xl p-6 sm:p-7 border border-white/10 shadow-2xl space-y-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-400" />
            Skill Specializations ({currentCategory.name})
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Toggle the exact tasks you perform. This directly maximizes your <strong>40% Skill Match</strong> score in customer searches!
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-3.5 h-3.5 stroke-[3]" /> Skills Updated Live!
          </span>
        )}
      </div>

      {/* Visual Low-Literacy Friendly Skill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentCategory.subSkills.map((subSkill) => {
          const isSelected = selectedSkills.includes(subSkill);

          return (
            <button
              key={subSkill}
              type="button"
              onClick={() => toggleSkill(subSkill)}
              className={`p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-glow-emerald ring-1 ring-emerald-500/30'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="space-y-1">
                <span className={`text-xs font-bold block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {subSkill}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {isSelected ? '✓ Active in your Smart Match profile' : '+ Click to add to your skills'}
                </span>
              </div>

              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition ${
                isSelected ? 'bg-emerald-500 text-dark-950' : 'border border-white/20 text-transparent'
              }`}>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Peer Certification Note */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs flex items-center gap-3 text-slate-300">
        <Award className="w-5 h-5 text-amber-400 shrink-0" />
        <p>
          Want to add skills outside your trade category? Submit a verification request to the <strong>CoServe Cooperative Council</strong>.
        </p>
      </div>

    </div>
  );
}
