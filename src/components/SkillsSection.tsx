import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { WashiTape } from './WashiTape';
import { playCutePop, playCelebrationChime } from '../utils/audio';
import confetti from 'canvas-confetti';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>({
    'C++ (17/20)': true,
    'Custom Allocators': true,
    'CPU Software Rasterizer': true,
    'OS & Kernel Primitives': true,
    'Database Internals': true,
  });

  const handleToggleCheck = (name: string) => {
    playCutePop(940);
    setCheckedSkills((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleCastSpell = (e: React.MouseEvent) => {
    playCelebrationChime();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ['#FCEBEB', '#F1EBF5', '#EBF4F5', '#EEF3EB', '#FEF7DA', '#E27B7B'],
      shapes: ['circle', 'square'],
    });
  };

  const currentCategory = SKILL_CATEGORIES[activeCategoryIdx];

  return (
    <section id="skills" className="relative mb-14 select-none">
      {/* Container styled like a bound notebook sheet with torn margin */}
      <div className="relative bg-[#FAF5EB] border-2 md:border-[3px] border-[#3C3530] shadow-[6px_6px_0px_#3C3530] rounded-2xl md:rounded-3xl p-5 md:p-8">
        {/* Washi tape over header */}
        <div className="absolute -top-3.5 right-12 rotate-[3deg]">
          <WashiTape variant="purple-polka" width="w-28" />
        </div>

        {/* Paperclip pinning a yellow sticky note */}
        <div className="absolute -top-3 left-8 z-20 pointer-events-none">
          <svg className="w-6 h-10 text-[#3C3530] filter drop-shadow-[1px_1px_0px_rgba(0,0,0,0.15)]" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 12 V 28 A 5 5 0 0 0 17 28 V 8 A 6 6 0 0 0 5 8 V 29 A 8 8 0 0 0 21 29 V 15" />
          </svg>
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[#3C3530]/20 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E27B7B]">
              <span>★ ⋆ ✦</span>
              <span>grimoire of technical abilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C3530] flex items-center gap-2">
              <span>Skills & Spells</span>
              <span className="text-xl">🪄</span>
            </h2>
          </div>

          <button
            onClick={handleCastSpell}
            className="px-3.5 py-1.5 bg-[#FEF7DA] hover:bg-[#FDF2B8] border-2 border-[#3C3530] rounded-xl font-bold text-xs shadow-[2px_2px_0px_#3C3530] active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>✨</span>
            <span>cast sparkle spell! ♡</span>
          </button>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isSelected = idx === activeCategoryIdx;
            return (
              <button
                key={cat.title}
                onClick={() => {
                  playCutePop(800 + idx * 40);
                  setActiveCategoryIdx(idx);
                }}
                className={`px-3 py-1.5 rounded-xl border-2 border-[#3C3530] text-xs sm:text-sm font-bold shadow-[2px_2px_0px_#3C3530] transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#FCEBEB] -translate-y-0.5'
                    : 'bg-[#FAF5EB] hover:bg-[#F9EFE4]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area: Left Checklist, Right Sticky Note Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Checklist on Ruled Paper */}
          <div className="lg:col-span-8 bg-[#FAF5EB] p-4 sm:p-5 rounded-2xl border-2 border-[#3C3530] shadow-[3px_3px_0px_#3C3530] text-left">
            <div className="flex items-center justify-between border-b border-[#3C3530]/20 pb-2 mb-4">
              <span className="font-bold text-sm text-[#3C3530] flex items-center gap-1.5">
                <span>{currentCategory.icon}</span>
                <span>{currentCategory.title} Checklist</span>
              </span>
              <span className="text-[11px] font-mono text-[#3C3530]/60">
                click star to mark as mastered ⋆
              </span>
            </div>

            <div className="space-y-3">
              {currentCategory.skills.map((skill) => {
                const isChecked = !!checkedSkills[skill.name];
                return (
                  <div
                    key={skill.name}
                    onClick={() => handleToggleCheck(skill.name)}
                    className="p-3 bg-white rounded-xl border-2 border-[#3C3530] shadow-[2px_2px_0px_#3C3530] cursor-pointer hover:bg-[#FAF5EB] transition-colors flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        type="button"
                        className={`text-lg leading-none transition-transform group-hover:scale-125 ${
                          isChecked ? 'text-amber-500' : 'text-gray-300'
                        }`}
                      >
                        {isChecked ? '⭐' : '☆'}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-sm sm:text-base text-[#3C3530] ${isChecked ? '' : 'text-[#3C3530]/80'}`}>
                            {skill.name}
                          </span>
                          {skill.isKey && (
                            <span className="text-[10px] font-mono bg-[#FEF7DA] px-1.5 py-0.2 rounded border border-[#3C3530]/40 font-bold">
                              core spell ⚡
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#3C3530]/70 font-mono mt-0.5">
                          {skill.note}
                        </p>
                      </div>
                    </div>

                    {/* Hand-drawn rating stars */}
                    <div className="hidden sm:flex items-center gap-0.5 text-xs text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < skill.level ? 'text-amber-500' : 'text-gray-200'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sticky Note: Philosophy & Architecture Doodles */}
          <div className="lg:col-span-4 bg-[#FEF7DA] p-5 rounded-2xl border-2 md:border-[3px] border-[#3C3530] shadow-[4px_4px_0px_#3C3530] text-left rotate-[1deg] relative">
            {/* Top sticky tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <WashiTape variant="pink-stripes" width="w-20" height="h-5" />
            </div>

            <h3 className="font-extrabold text-base text-[#3C3530] mb-2 flex items-center gap-1.5">
              <span>📌</span>
              <span>Engineering Philosophy</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#3C3530] leading-relaxed mb-3">
              "Never accept an abstraction until you understand how the CPU, cache lines, and OS kernel physically execute it."
            </p>

            {/* Doodle Benchmark Chart */}
            <div className="bg-white/80 p-2.5 rounded-xl border border-[#3C3530] text-xs font-mono mb-3">
              <div className="font-bold text-[11px] mb-1 text-[#3C3530]/80 flex justify-between">
                <span>Doodle Benchmark:</span>
                <span className="text-emerald-700 font-bold">2.25x faster!</span>
              </div>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[10px]">
                    <span>Without culling:</span>
                    <span>73.4 ms</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded border border-[#3C3530]">
                    <div className="h-full bg-[#E27B7B] rounded" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px]">
                    <span>Frustum culled:</span>
                    <span className="font-bold text-emerald-700">32.6 ms</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded border border-[#3C3530]">
                    <div className="h-full bg-[#89C083] rounded" style={{ width: '38%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#3C3530]/80">
              <span>✎</span>
              <span>handwritten notes from IIIT Vadodara</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
