import React from 'react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';
import { WashiTape } from './WashiTape';

export const WorkTimeline: React.FC = () => {
  return (
    <section id="work" className="relative mb-14 select-none">
      <div className="relative bg-[#FAF5EB] border-2 md:border-[3px] border-[#3C3530] shadow-[6px_6px_0px_#3C3530] rounded-2xl md:rounded-3xl p-5 md:p-8">
        {/* Washi tape */}
        <div className="absolute -top-3.5 left-16 rotate-[-4deg]">
          <WashiTape variant="mint-stripes" width="w-24" />
        </div>

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[#3C3530]/20 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E27B7B]">
              <span>🌱 ⋆ 📜</span>
              <span>journey, leadership & research milestones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3C3530] flex items-center gap-2">
              <span>Work -iline</span>
              <span className="text-base font-normal text-[#3C3530]/70 font-mono">(timeline & experience)</span>
            </h2>
          </div>

          <span className="text-xs font-mono bg-[#FEF7DA] px-2.5 py-1 rounded-full border border-[#3C3530] font-bold">
            🌱 2023 ➔ 2027
          </span>
        </div>

        {/* Retro Pixel / Hand-Drawn Timeline Tree */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[3px] before:bg-[#3C3530] before:border-l before:border-dashed before:border-[#3C3530]/40">
          {EXPERIENCE_ITEMS.map((item, idx) => {
            return (
              <div key={item.id} className="relative text-left group">
                {/* Node icon along the line */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF5EB] border-2 border-[#3C3530] flex items-center justify-center text-sm shadow-[2px_2px_0px_#3C3530] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                {/* Timeline Card */}
                <div
                  className="p-4 sm:p-5 rounded-2xl border-2 border-[#3C3530] shadow-[3px_3px_0px_#3C3530] transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2 border-b border-[#3C3530]/20 pb-2">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#3C3530]/70 block">
                        {item.type}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#3C3530]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-[#3C3530]/80">
                        {item.organization}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold bg-[#FAF5EB] px-2 py-0.5 rounded border border-[#3C3530] shadow-[1px_1px_0px_#3C3530] block">
                        {item.period}
                      </span>
                      <span className="text-[11px] font-mono text-[#3C3530]/60 mt-1 block">
                        📍 {item.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#3C3530]/90">
                    {item.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-[#E27B7B] font-bold mt-0.5">★</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
