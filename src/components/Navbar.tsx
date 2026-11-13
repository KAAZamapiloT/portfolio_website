import React, { useState } from 'react';
import { isSoundEnabled, setSoundEnabled, playCutePop, playPaperRustle } from '../utils/audio';

interface NavbarProps {
  paperStyle: 'graph' | 'lined' | 'craft';
  setPaperStyle: (style: 'graph' | 'lined' | 'craft') => void;
  onToggleStickerDrawer: () => void;
  isStickerDrawerOpen: boolean;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  paperStyle,
  setPaperStyle,
  onToggleStickerDrawer,
  isStickerDrawerOpen,
  activeSection,
  setActiveSection
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleSoundToggle = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const navItems = [
    { id: 'hero', label: '✿ about', icon: '🌸' },
    { id: 'projects', label: '✎ projects', icon: '📁' },
    { id: 'skills', label: '⋆ skills & spells', icon: '✨' },
    { id: 'work', label: '📜 work-iline', icon: '🌱' },
    { id: 'contact', label: '♡ contact', icon: '💌' },
  ];

  const handleNavClick = (id: string) => {
    playCutePop(880);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePaperCycle = () => {
    playPaperRustle();
    if (paperStyle === 'graph') setPaperStyle('lined');
    else if (paperStyle === 'lined') setPaperStyle('craft');
    else setPaperStyle('graph');
  };

  return (
    <header className="sticky top-2 z-40 px-2 sm:px-6 mb-6">
      {/* Ragged-Edge Ribbon Banner Container */}
      <div className="relative mx-auto max-w-5xl bg-[#FAF5EB] border-2 md:border-[3px] border-[#3C3530] shadow-[4px_4px_0px_#3C3530] rounded-xl px-3 py-2 md:px-5 md:py-2.5 flex flex-wrap items-center justify-between gap-2 select-none">
        {/* Ribbon banner decorative faux washi tape over left/right top */}
        <div className="absolute -top-3 left-6 w-16 h-5 washi-stripes-pink rotate-[-2deg] border border-[#3C3530]/20 shadow-sm pointer-events-none" />
        <div className="absolute -top-3 right-6 w-16 h-5 washi-polka-purple rotate-[3deg] border border-[#3C3530]/20 shadow-sm pointer-events-none" />

        {/* Brand / Title with cute logo */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-xl group-hover:scale-125 transition-transform">📔</span>
          <div className="text-left leading-tight">
            <span className="text-base md:text-lg font-bold tracking-tight text-[#3C3530] block">
              uday's sketchbook <span className="text-xs text-[#E27B7B]">✿</span>
            </span>
            <span className="text-[10px] md:text-[11px] text-[#3C3530]/70 font-mono hidden sm:block">
              c++ systems & low-latency notebook
            </span>
          </div>
        </div>

        {/* Navigation Stamp Links */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 max-w-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs md:text-sm font-bold border-2 border-[#3C3530] transition-all whitespace-nowrap flex items-center gap-1 ${
                  isActive
                    ? 'bg-[#FCEBEB] shadow-[2px_2px_0px_#3C3530] -translate-y-0.5'
                    : 'bg-[#FAF5EB] hover:bg-[#F9EFE4] hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action controls: Paper style, Audio, Stickers */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Paper Texture Switcher */}
          <button
            onClick={handlePaperCycle}
            className="px-2 py-1 bg-[#EEF3EB] hover:bg-[#DEEBD7] border-2 border-[#3C3530] rounded-lg text-xs font-bold shadow-[2px_2px_0px_#3C3530] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1"
            title={`Current: ${paperStyle} paper. Click to change!`}
          >
            <span>📄</span>
            <span className="hidden md:inline capitalize">{paperStyle}</span>
          </button>

          {/* Sound Mute / Unmute */}
          <button
            onClick={handleSoundToggle}
            className={`p-1.5 sm:px-2 sm:py-1 border-2 border-[#3C3530] rounded-lg text-xs font-bold shadow-[2px_2px_0px_#3C3530] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
              soundOn ? 'bg-[#FEF7DA] text-[#3C3530]' : 'bg-gray-200 text-gray-500'
            }`}
            title={soundOn ? 'Mute cute sound effects' : 'Enable cute sound effects'}
          >
            <span>{soundOn ? '🔊' : '🔇'}</span>
          </button>

          {/* Sticker Box Drawer Toggle */}
          <button
            onClick={() => {
              playCutePop(920);
              onToggleStickerDrawer();
            }}
            className={`px-2 py-1 border-2 border-[#3C3530] rounded-lg text-xs font-bold shadow-[2px_2px_0px_#3C3530] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1 ${
              isStickerDrawerOpen ? 'bg-[#FCEBEB]' : 'bg-[#F1EBF5]'
            }`}
            title="Peel and place stickers on notebook!"
          >
            <span>🏷️</span>
            <span className="hidden sm:inline">stickers!</span>
          </button>
        </div>
      </div>
    </header>
  );
};
