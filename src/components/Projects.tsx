import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { WashiTape } from './WashiTape';
import { PostageStamp } from './PostageStamp';
import { AllocatorDemo } from './demos/AllocatorDemo';
import { RasterizerDemo } from './demos/RasterizerDemo';
import { SqlDemo } from './demos/SqlDemo';
import { ContainerDemo } from './demos/ContainerDemo';
import { playCutePop } from '../utils/audio';

export const Projects: React.FC = () => {
  const [selectedDemoId, setSelectedDemoId] = useState<string | null>('pixel'); // open pixel by default for instant delight!

  const handleToggleDemo = (id: string) => {
    playCutePop(890);
    setSelectedDemoId((prev) => (prev === id ? null : id));
  };

  const washiVariants: ('pink-stripes' | 'purple-polka' | 'mint-stripes' | 'peach-stripes')[] = [
    'peach-stripes',
    'pink-stripes',
    'purple-polka',
    'mint-stripes'
  ];

  return (
    <section id="projects" className="relative mb-14 select-none">
      {/* Section Header with Kawaii Sketchbook Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E27B7B]">
            <span>✎ ⋆ 📁</span>
            <span>hand-coded systems & libraries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C3530] flex items-center gap-2">
            <span>featured projects</span>
            <span className="text-xl">✿</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#FAF5EB] px-3 py-1.5 rounded-lg border-2 border-[#3C3530] shadow-[2px_2px_0px_#3C3530]">
          <span>⚡ click "Interactive Lab ♡" to test live in-browser!</span>
        </div>
      </div>

      {/* 2x2 Scrapbook Grid matching the mockups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {PROJECTS.map((proj, idx) => {
          const isDemoActive = selectedDemoId === proj.id;
          const washiType = washiVariants[idx % washiVariants.length];

          return (
            <div
              key={proj.id}
              className="relative p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 md:border-[3px] border-[#3C3530] shadow-[5px_5px_0px_#3C3530] transition-transform hover:-translate-y-1 text-left flex flex-col justify-between"
              style={{ backgroundColor: proj.bgColor }}
            >
              {/* Top Washi Tape Strip */}
              <div className="absolute -top-3.5 left-8 rotate-[-2deg]">
                <WashiTape variant={washiType} width="w-24" />
              </div>

              {/* Upper Section: Title + Stamp */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#3C3530]/70 block mb-0.5">
                      {proj.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#3C3530] capitalize">
                      {proj.title} <span className="text-sm font-normal text-[#E27B7B]">✿</span>
                    </h3>
                  </div>

                  <PostageStamp
                    icon={proj.stampIcon}
                    label={proj.stampText}
                    price={`¥${20 + idx * 5}`}
                    color="#FAF5EB"
                  />
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-[#3C3530]/90 font-medium leading-relaxed mb-4">
                  {proj.shortDesc}
                </p>

                {/* Benchmark badge if present */}
                {proj.benchmark && (
                  <div className="mb-4 bg-[#FAF5EB]/90 border border-[#3C3530] rounded-lg p-2 text-xs font-mono flex items-center gap-1.5 shadow-sm">
                    <span className="text-[#E27B7B]">★</span>
                    <span className="font-bold">{proj.benchmark}</span>
                  </div>
                )}

                {/* Tech Stack Stamp Labels */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-bold bg-[#FAF5EB] px-2 py-0.5 rounded border border-[#3C3530] shadow-[1px_1px_0px_#3C3530]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Interactive Area */}
              <div>
                {/* Live Demo Drawer inside card */}
                {isDemoActive && (
                  <div className="mb-4 animate-fadeIn">
                    {proj.demoType === 'allocator' && <AllocatorDemo />}
                    {proj.demoType === 'rasterizer' && <RasterizerDemo />}
                    {proj.demoType === 'sql' && <SqlDemo />}
                    {proj.demoType === 'container' && <ContainerDemo />}
                  </div>
                )}

                {/* Action Buttons: "Hand button ♡" / "Interactive Lab" + GitHub */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t-2 border-dashed border-[#3C3530]/20">
                  <button
                    onClick={() => handleToggleDemo(proj.id)}
                    className={`px-4 py-1.5 rounded-full border-2 border-[#3C3530] font-bold text-xs md:text-sm shadow-[2px_2px_0px_#3C3530] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 ${
                      isDemoActive
                        ? 'bg-[#FEF7DA] text-[#3C3530]'
                        : 'bg-[#FAF5EB] text-[#3C3530] hover:bg-white'
                    }`}
                  >
                    <span>{isDemoActive ? '📖 hide lab' : 'Hand button ♡'}</span>
                    <span className="text-xs">({isDemoActive ? 'close' : 'test demo ✎'})</span>
                  </button>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono font-bold text-[#3C3530] hover:text-[#E27B7B] flex items-center gap-1 underline underline-offset-2"
                  >
                    <span>view code ➔</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
