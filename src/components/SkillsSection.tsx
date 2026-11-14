import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Decoration } from './Decorations';
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
    'Unreal Engine 5 & Groq API': true,
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
      colors: ['#FF8FC1', '#BFA8FF', '#9FE8CF', '#FFE98A', '#9FD8FF', '#FF5C9D'],
      shapes: ['circle', 'square'],
    });
  };

  const currentCategory = SKILL_CATEGORIES[activeCategoryIdx];

  const categoryCardClasses = [
    'card--yellow',
    'card--mint',
    'card--sky',
    'card--pink',
    'card--lavender'
  ];

  return (
    <div className="window-wrap">
      <section className="window" id="skills">
        <header className="window__bar">
          <span className="window__title">SPECS // SKILLS & TECHNICAL ARCHITECTURE</span>
          <span className="dots" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </span>
        </header>

        <div className="window__body space-y-6 text-left">
          {/* Top Controls: Category Tabs & Confetti Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ink)]/20 pb-4">
            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.map((cat, idx) => {
                const isSelected = idx === activeCategoryIdx;
                return (
                  <button
                    key={cat.title}
                    type="button"
                    onClick={() => {
                      playCutePop(800 + idx * 40);
                      setActiveCategoryIdx(idx);
                    }}
                    className={`btn ${isSelected ? '' : 'btn--secondary'}`}
                    style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.title}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleCastSpell}
              className="btn"
              style={{ padding: '6px 16px', fontSize: '0.78rem', background: 'var(--hot-pink)' }}
            >
              <span>✨ SPARKLE CONFETTI</span>
            </button>
          </div>

          {/* Active Category Display Card */}
          <div className={`card ${categoryCardClasses[activeCategoryIdx % categoryCardClasses.length]}`}>
            <div className="flex items-center justify-between gap-2 border-b border-[var(--ink)]/30 pb-2">
              <h3 className="text-xl sm:text-2xl font-bold m-0 flex items-center gap-2">
                <span>{currentCategory.icon}</span>
                <span>{currentCategory.title}</span>
              </h3>
              <span className="tag" style={{ background: 'var(--paper)' }}>
                CATEGORY 0{activeCategoryIdx + 1}
              </span>
            </div>

            <div className="space-y-3">
              {currentCategory.skills.map((skill) => {
                const isChecked = !!checkedSkills[skill.name];
                return (
                  <div
                    key={skill.name}
                    onClick={() => handleToggleCheck(skill.name)}
                    className="card__inset flex items-start justify-between gap-3 cursor-pointer hover:translate-x-1 transition-transform select-none"
                    style={{ background: 'var(--paper)' }}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="text-lg leading-none"
                        style={{ color: isChecked ? 'var(--hot-pink)' : 'var(--purple-d)' }}
                      >
                        {isChecked ? '★' : '☆'}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-base" style={{ color: 'var(--ink)' }}>
                            {skill.name}
                          </span>
                          {skill.isKey && (
                            <span className="tag" style={{ fontSize: '0.65rem', padding: '1px 6px', background: 'var(--yellow)' }}>
                              CORE SPELL
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono m-0 mt-0.5" style={{ color: 'var(--purple-d)' }}>
                          {skill.note}
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-0.5 text-xs font-bold" style={{ color: 'var(--hot-pink)' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{ opacity: i < skill.level ? 1 : 0.25 }}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Performance Benchmark Highlight Inset */}
            <div className="card__inset text-xs font-mono space-y-1.5" style={{ background: 'var(--cream)' }}>
              <div className="flex justify-between items-center font-bold">
                <span style={{ color: 'var(--purple-d)' }}>MEASURED SYSTEM LATENCY BENCHMARK:</span>
                <span className="tag" style={{ background: 'var(--mint)', fontSize: '0.7rem' }}>2.25x FASTER</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-1.5 rounded border border-[var(--ink)]/20" style={{ background: 'var(--paper)' }}>
                  <div>Without culling: <span className="font-bold">73.4 ms</span></div>
                  <div className="w-full h-2 rounded mt-1 overflow-hidden" style={{ background: 'var(--cream)', border: '1px solid var(--ink)' }}>
                    <div className="h-full" style={{ width: '85%', background: 'var(--pink)' }} />
                  </div>
                </div>
                <div className="p-1.5 rounded border border-[var(--ink)]/20" style={{ background: 'var(--paper)' }}>
                  <div>Object-level frustum culling: <span className="font-bold" style={{ color: 'var(--hot-pink)' }}>32.6 ms</span></div>
                  <div className="w-full h-2 rounded mt-1 overflow-hidden" style={{ background: 'var(--cream)', border: '1px solid var(--ink)' }}>
                    <div className="h-full" style={{ width: '38%', background: 'var(--mint)' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Sparkle */}
      <Decoration position="top-right" type="sparkle" />
    </div>
  );
};
