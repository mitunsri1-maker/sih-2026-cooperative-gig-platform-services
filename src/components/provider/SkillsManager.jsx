import React, { useState } from 'react';
import { SERVICE_CATEGORIES } from '../../data/categories';
import { Wrench, CheckCircle, Plus, Sparkles, Check, Award } from 'lucide-react';

export function SkillsManager({ provider, onUpdateSkills }) {
  const currentCategory = SERVICE_CATEGORIES.find(c => c.id === provider?.categoryId) || SERVICE_CATEGORIES[0];
  const [selectedSkills, setSelectedSkills] = useState(provider?.skills || []);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleSkill = (skill) => {
    let updated;
    if (selectedSkills.includes(skill)) {
      if (selectedSkills.length === 1) return; // Must have at least 1 skill
      updated = selectedSkills.filter(s => s !== skill);
    } else {
      updated = [...selectedSkills, skill];
    }
    setSelectedSkills(updated);
    onUpdateSkills(provider.id, updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-600" />
            Skill Specializations ({currentCategory.name})
          </h3>
          <p className="text-xs text-slate-500">
            Select the exact tasks you perform. This directly boosts your <strong>40% Skill Match</strong> score in customer searches!
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1 animate-fade-in">
            <Check className="w-3.5 h-3.5" /> Skills Updated Live!
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
                  ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-1">
                <span className={`text-xs font-bold block ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                  {subSkill}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {isSelected ? '✓ Active in your Smart Match profile' : '+ Click to add to your skills'}
                </span>
              </div>

              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition ${
                isSelected ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 text-transparent'
              }`}>
                <Check className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Cooperative Skill Endorsement Note */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center gap-3">
        <Award className="w-5 h-5 text-amber-500 shrink-0" />
        <p className="text-slate-600">
          Want to add skills outside your primary trade? Submit a peer certification request to the <strong>CoServe Cooperative Board</strong> in your area.
        </p>
      </div>

    </div>
  );
}
