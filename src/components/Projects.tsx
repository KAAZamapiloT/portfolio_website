import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { PolarBearDemo } from './demos/PolarBearDemo';
import { CanvasDemo } from './demos/CanvasDemo';
import { KnightEngineDemo } from './demos/KnightEngineDemo';
import { RasterizerDemo } from './demos/RasterizerDemo';
import { AllocatorDemo } from './demos/AllocatorDemo';
import { SqlDemo } from './demos/SqlDemo';
import { ContainerDemo } from './demos/ContainerDemo';
import { Decoration } from './Decorations';
import { playCutePop } from '../utils/audio';

export const Projects: React.FC = () => {
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>('polar-bear');

  const handleToggleDemo = (id: string) => {
    playCutePop(890);
    setSelectedDemoId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="window-wrap">
      <section className="window" id="projects">
        <header className="window__bar">
          <span className="window__title">EXEC // GAME ENGINES &amp; SYSTEMS PROJECTS</span>
          <span className="dots" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </span>
        </header>

        <div className="window__body">
          <div className="card-grid">
            {PROJECTS.map((proj) => {
              const isDemoActive = selectedDemoId === proj.id;

              return (
                <article
                  key={proj.id}
                  className={`card ${proj.cardClass}`}
                >
                  {/* Card Header with Badge, Category, and Title */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="label text-xs" style={{ color: 'var(--purple-d)' }}>
                        {proj.category}
                      </span>
                      <span className="badge">
                        {proj.badgeNum}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                      {proj.title}
                    </h3>

                    <p className="text-sm font-medium leading-relaxed mb-3">
                      {proj.shortDesc}
                    </p>

                    {/* Benchmark & Core Specs Inset Box */}
                    {proj.benchmark && (
                      <div className="card__inset mb-3" style={{ background: 'var(--paper)' }}>
                        <span className="label block text-[10px] mb-0.5" style={{ color: 'var(--purple-d)' }}>
                          SPECS // ARCHITECTURE:
                        </span>
                        <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>
                          ★ {proj.benchmark}
                        </span>
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="tag-row mb-3">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Demo Inset Drawer */}
                  <div>
                    {isDemoActive && (
                      <div className="mb-3">
                        {proj.demoType === 'polarbear' && <PolarBearDemo />}
                        {proj.demoType === 'canvas' && <CanvasDemo />}
                        {proj.demoType === 'engine' && <KnightEngineDemo />}
                        {proj.demoType === 'rasterizer' && <RasterizerDemo />}
                        {proj.demoType === 'allocator' && <AllocatorDemo />}
                        {proj.demoType === 'sql' && <SqlDemo />}
                        {proj.demoType === 'container' && <ContainerDemo />}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--ink)]/30">
                      <button
                        type="button"
                        onClick={() => handleToggleDemo(proj.id)}
                        className={`btn ${isDemoActive ? 'btn--secondary' : ''}`}
                        style={{ padding: '8px 16px', fontSize: '0.78rem' }}
                      >
                        <span>{isDemoActive ? '▲ CLOSE LAB' : '▼ TEST LAB'}</span>
                      </button>

                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn--secondary"
                        style={{ padding: '8px 14px', fontSize: '0.78rem' }}
                      >
                        <span>view code &gt;&gt;</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Decorative Heart SVG on bottom-left corner */}
      <Decoration position="bottom-left" type="heart" />
    </div>
  );
};
