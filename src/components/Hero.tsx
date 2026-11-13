import React from 'react';
import { ChibiAvatar } from './ChibiAvatar';
import { WashiTape } from './WashiTape';
import { PostageStamp } from './PostageStamp';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playCutePop, playPaperRustle } from '../utils/audio';

export const Hero: React.FC = () => {
  const handleScrollTo = (id: string) => {
    playCutePop(820);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative mb-12 select-none">
      {/* Handcrafted Header Layer */}
      <div className="relative bg-[#FAF5EB] border-2 md:border-[3px] border-[#3C3530] shadow-[6px_6px_0px_#3C3530] rounded-2xl md:rounded-3xl p-5 md:p-8">
        {/* Corner washi tape strips */}
        <div className="absolute -top-3.5 -left-2 rotate-[-8deg]">
          <WashiTape variant="pink-stripes" width="w-28" />
        </div>
        <div className="absolute -top-3.5 -right-2 rotate-[6deg]">
          <WashiTape variant="mint-stripes" width="w-28" />
        </div>

        {/* Paperclip on top edge */}
        <div className="absolute -top-4 left-1/3 z-20 pointer-events-none">
          <svg className="w-6 h-10 text-[#3C3530] filter drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M7 12 V 28 A 5 5 0 0 0 17 28 V 8 A 6 6 0 0 0 5 8 V 29 A 8 8 0 0 0 21 29 V 15" />
          </svg>
        </div>

        {/* Top Header Row with Stamps and Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[#3C3530]/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#FEF7DA] border border-[#3C3530] rounded-full text-xs font-bold shadow-[2px_2px_0px_#3C3530]">
              🌱 developer's sketchbook #vol-1
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-[#3C3530]/60">
              [ 2026 Edition • IIITV ]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <PostageStamp icon="⚡" label="C++ SYS" price="✿ 20" color="#F9EFE4" />
            <PostageStamp icon="🐧" label="LINUX" price="✿ 26" color="#EEF3EB" />
          </div>
        </div>

        {/* Main Hero Content: Left Chibi & Dialogue, Right Headline & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Chibi Character & Interactive Dialogue */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <ChibiAvatar />
          </div>

          {/* Intro Text & Notebook Callouts */}
          <div className="lg:col-span-7 text-left space-y-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#E27B7B] mb-1">
                <span>⋆ ✦ ⋆</span>
                <span>welcome to my personal lab</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#3C3530] leading-none mb-2">
                hello! i'm <span className="marker-highlight font-display underline decoration-wavy decoration-[#E27B7B]/70">{PERSONAL_INFO.name.toLowerCase()}</span>
                <span className="text-2xl sm:text-3xl ml-2 font-normal text-[#3C3530]/70">(aka {PERSONAL_INFO.nickname} ✿)</span>
              </h1>
              <p className="text-base sm:text-lg font-bold text-[#3C3530]/90">
                {PERSONAL_INFO.roleTitle}
              </p>
            </div>

            {/* Ruled Notebook Scrap Note */}
            <div className="bg-[#FAF5EB] p-4 rounded-xl border-2 border-[#3C3530] shadow-[3px_3px_0px_#3C3530] relative rotate-[-0.5deg]">
              {/* Pin at top center */}
              <div className="absolute -top-2 left-6 text-sm">📌</div>
              
              <p className="text-sm sm:text-base leading-relaxed text-[#3C3530]">
                {PERSONAL_INFO.bio}
              </p>

              <div className="mt-3 pt-2 border-t border-dashed border-[#3C3530]/30 flex flex-wrap gap-2 text-xs font-mono font-bold">
                <span className="bg-[#FCEBEB] px-2 py-0.5 rounded border border-[#3C3530]/40">📍 Gandhinagar, Gujarat</span>
                <span className="bg-[#EEF3EB] px-2 py-0.5 rounded border border-[#3C3530]/40">🎓 B.Tech CSE @ IIIT Vadodara</span>
                <span className="bg-[#FEF7DA] px-2 py-0.5 rounded border border-[#3C3530]/40">⭐ CPI: {PERSONAL_INFO.cpi}</span>
              </div>
            </div>

            {/* Action Buttons styled like cute stamped labels */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleScrollTo('projects')}
                className="px-4 py-2 bg-[#F9EFE4] hover:bg-[#F2DFC9] border-2 md:border-[3px] border-[#3C3530] rounded-xl font-bold text-sm md:text-base shadow-[3px_3px_0px_#3C3530] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>📁</span>
                <span>explore projects ♡</span>
              </button>

              <button
                onClick={() => handleScrollTo('contact')}
                className="px-4 py-2 bg-[#FCEBEB] hover:bg-[#FAD9D9] border-2 md:border-[3px] border-[#3C3530] rounded-xl font-bold text-sm md:text-base shadow-[3px_3px_0px_#3C3530] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>💌</span>
                <span>open contact pad ✎</span>
              </button>

              <a
                href="/RESUME_Q-1.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => playPaperRustle()}
                className="px-3 py-2 bg-[#EEF3EB] hover:bg-[#DEEBD7] border-2 md:border-[3px] border-[#3C3530] rounded-xl font-bold text-sm shadow-[3px_3px_0px_#3C3530] hover:scale-105 active:scale-95 transition-all flex items-center gap-1 text-[#3C3530]"
              >
                <span>📄</span>
                <span>resume.pdf</span>
              </a>
            </div>

            {/* Doodle Arrow pointing down */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#3C3530]/60 pt-2">
              <svg className="w-12 h-6 text-[#3C3530] animate-bounce" viewBox="0 0 50 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 4 Q 25 20, 42 12" />
                <path d="M35 8 L 44 12 L 38 18" />
              </svg>
              <span>flip down for my systems scrapbook entries!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
