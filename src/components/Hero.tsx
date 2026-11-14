import React from 'react';
import { ChibiAvatar } from './ChibiAvatar';
import { Decoration } from './Decorations';
import { PERSONAL_INFO, RESUMES } from '../data/portfolioData';
import { playCutePop } from '../utils/audio';

export const Hero: React.FC = () => {
  const handleScrollTo = (id: string) => {
    playCutePop(820);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="window-wrap">
      <section className="window" id="hero">
        <header className="window__bar">
          <span className="window__title">SYS.INIT // GAME &amp; SYSTEMS DEVELOPER PROFILE</span>
          <span className="dots" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </span>
        </header>

        <div className="window__body">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Chibi Character & Interactive Dialogue */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <ChibiAvatar />
            </div>

            {/* Profile Intro & Technical Scope */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <div className="tag-row mb-2">
                  <span className="tag">TERMINAL_ACTIVE</span>
                  <span className="tag">IIIT VADODARA (2023–2027)</span>
                  <span className="tag">CPI: {PERSONAL_INFO.cpi}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-base sm:text-lg font-bold" style={{ color: 'var(--purple-d)' }}>
                  {PERSONAL_INFO.roleTitle}
                </p>
              </div>

              {/* Bio & System Focus in high-contrast card__inset */}
              <div className="card__inset space-y-3" style={{ background: 'var(--cream)', lineHeight: '1.6' }}>
                <p className="m-0 text-sm sm:text-base font-normal">
                  {PERSONAL_INFO.bio}
                </p>

                <div className="pt-2 border-t border-[var(--ink)]/20 flex flex-wrap gap-2 text-xs">
                  <span className="tag" style={{ background: 'var(--paper)' }}>📍 {PERSONAL_INFO.location}</span>
                  <span className="tag" style={{ background: 'var(--paper)' }}>🎮 Unreal Engine 5 &amp; SDL3</span>
                  <span className="tag" style={{ background: 'var(--paper)' }}>⚡ C++ Systems &amp; Allocators</span>
                  <span className="tag" style={{ background: 'var(--paper)' }}>📐 CPU 3D Rasterization</span>
                </div>
              </div>

              {/* Action Buttons styled strictly with .btn & .btn--secondary */}
              <div className="space-y-2.5 pt-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleScrollTo('projects')}
                    className="btn"
                  >
                    <span>view projects &gt;&gt;</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleScrollTo('contact')}
                    className="btn btn--secondary"
                  >
                    <span>contact pad</span>
                  </button>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--secondary"
                    title="View GitHub profile"
                  >
                    <span>github</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--secondary"
                    title="View LinkedIn profile"
                  >
                    <span>linkedin</span>
                  </a>
                </div>

                {/* Resumes directly from the resumes folder */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="label text-[11px]" style={{ color: 'var(--purple-d)' }}>
                    RESUMES:
                  </span>
                  {RESUMES.map((res) => (
                    <a
                      key={res.file}
                      href={res.file}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn--secondary"
                      style={{ padding: '4px 12px', fontSize: '0.72rem', background: 'var(--yellow)' }}
                      title={`Download ${res.name}`}
                    >
                      <span>📄 {res.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Sparkle SVG overlapping top-right corner */}
      <Decoration position="top-right" type="sparkle" />
    </div>
  );
};
