import React from 'react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';
import { Decoration } from './Decorations';

export const WorkTimeline: React.FC = () => {
  const cardColorClasses = [
    'card--mint',
    'card--yellow',
    'card--pink',
    'card--sky',
  ];

  return (
    <div className="window-wrap">
      <section className="window" id="work">
        <header className="window__bar">
          <span className="window__title">CHRONO // EXPERIENCE & RESEARCH MILESTONES</span>
          <span className="dots" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </span>
        </header>

        <div className="window__body">
          <div className="card-grid">
            {EXPERIENCE_ITEMS.map((item, idx) => (
              <article
                key={item.id}
                className={`card ${cardColorClasses[idx % cardColorClasses.length]}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="label text-xs" style={{ color: 'var(--purple-d)' }}>
                      {item.type}
                    </span>
                    <span className="tag" style={{ background: 'var(--paper)', fontSize: '0.7rem' }}>
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight mb-1">
                    {item.title}
                  </h3>

                  <p className="text-sm font-bold mb-3" style={{ color: 'var(--purple-d)' }}>
                    {item.organization}
                  </p>

                  <div className="card__inset text-left space-y-2 text-xs" style={{ background: 'var(--paper)' }}>
                    <ul className="space-y-1.5 p-0 m-0 list-none">
                      {item.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="font-bold" style={{ color: 'var(--hot-pink)' }}>&gt;</span>
                          <span style={{ color: 'var(--ink)' }}>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--ink)]/20 flex justify-between items-center text-xs">
                  <span className="font-mono text-[11px]" style={{ color: 'var(--purple-d)' }}>
                    📍 {item.location}
                  </span>
                  <span className="badge" style={{ width: 32, height: 32, fontSize: '0.85rem' }}>
                    {item.icon}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Bottom-Left Heart */}
      <Decoration position="bottom-left" type="heart" />
    </div>
  );
};
