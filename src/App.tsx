import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { SkillsSection } from './components/SkillsSection';
import { WorkTimeline } from './components/WorkTimeline';
import { ContactNotebook } from './components/ContactNotebook';
import { SpiralBinding } from './components/SpiralBinding';
import { StickerDrawer } from './components/StickerDrawer';
import { StickerCanvas } from './components/StickerCanvas';
import { LoFiPlayer } from './components/LoFiPlayer';
import { PlacedSticker } from './types';
import { PERSONAL_INFO } from './data/portfolioData';
import { playCutePop } from './utils/audio';

export function App() {
  const [paperStyle, setPaperStyle] = useState<'graph' | 'lined' | 'craft'>('graph');
  const [isStickerDrawerOpen, setIsStickerDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([
    { id: 'initial-1', emoji: '🐰', name: 'Bunny', x: 88, y: 15, rotation: 12, scale: 1 },
    { id: 'initial-2', emoji: '⭐', name: 'Star', x: 82, y: 7, rotation: -8, scale: 1 },
    { id: 'initial-3', emoji: '🌸', name: 'Sakura', x: 92, y: 88, rotation: 15, scale: 1 },
  ]);
  const [viewMode, setViewMode] = useState<'desktop-spread' | 'mobile-pad'>('desktop-spread');

  const getPaperBgClass = () => {
    switch (paperStyle) {
      case 'graph':
        return 'bg-graph-paper';
      case 'lined':
        return 'bg-lined-paper';
      case 'craft':
        return 'bg-kraft-paper';
      default:
        return 'bg-graph-paper';
    }
  };

  return (
    <div className="min-h-screen bg-[#24201E] text-[#3C3530] font-sketch py-4 px-2 sm:px-6 relative selection:bg-[#FCEBEB] selection:text-[#3C3530]">
      {/* Interactive Sticker Overlay */}
      <StickerCanvas stickers={placedStickers} setStickers={setPlacedStickers} />

      {/* View Mode & Preset Banner Bar */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-3 px-2 text-xs font-mono text-[#FAF5EB]/80 select-none">
        <div className="flex items-center gap-2">
          <span className="text-[#E27B7B]">★</span>
          <span>retro kawaii sketchbook portfolio</span>
          <span className="hidden sm:inline text-white/40">• deployable to vercel</span>
        </div>

        {/* Mockup Dual-View Switcher: Desktop Open Sketchbook vs Mobile/Detail Pad */}
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-white/50">style view:</span>
          <button
            onClick={() => {
              playCutePop(850);
              setViewMode(viewMode === 'desktop-spread' ? 'mobile-pad' : 'desktop-spread');
            }}
            className="px-2.5 py-1 bg-[#FAF5EB] hover:bg-white text-[#3C3530] border-2 border-[#3C3530] rounded-lg font-bold shadow-[2px_2px_0px_#3C3530] transition-all flex items-center gap-1.5"
            title="Toggle between wide open sketchbook spread & narrow spiral pad view"
          >
            <span>{viewMode === 'desktop-spread' ? '📖 open sketchbook spread' : '📱 mobile / detail pad view'}</span>
          </button>
        </div>
      </div>

      {/* Top Navbar */}
      <Navbar
        paperStyle={paperStyle}
        setPaperStyle={setPaperStyle}
        onToggleStickerDrawer={() => setIsStickerDrawerOpen(!isStickerDrawerOpen)}
        isStickerDrawerOpen={isStickerDrawerOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* MAIN SKETCHBOOK CONTAINER */}
      <main
        className={`mx-auto transition-all duration-300 relative ${
          viewMode === 'desktop-spread' ? 'max-w-6xl' : 'max-w-xl'
        }`}
      >
        {/* Outer Craft Paper Desk Underlayer (torn layered edges) */}
        <div className="relative p-2 sm:p-5 md:p-7 bg-[#EADBC8] border-2 md:border-[3px] border-[#3C3530] shadow-[8px_8px_0px_#1B1816] rounded-3xl">
          {/* Faux Washi Tape Strips on Desk Margins */}
          <div className="absolute -top-4 -left-3 w-28 h-6 washi-stripes-pink rotate-[-12deg] border border-[#3C3530]/20 shadow pointer-events-none" />
          <div className="absolute -top-4 -right-3 w-28 h-6 washi-polka-purple rotate-[8deg] border border-[#3C3530]/20 shadow pointer-events-none" />
          <div className="absolute -bottom-4 left-1/4 w-32 h-6 washi-stripes-mint rotate-[3deg] border border-[#3C3530]/20 shadow pointer-events-none" />
          <div className="absolute -bottom-4 right-1/4 w-32 h-6 washi-stripes-peach rotate-[-4deg] border border-[#3C3530]/20 shadow pointer-events-none" />

          {/* OPEN NOTEBOOK SPREAD */}
          <div className={`relative ${getPaperBgClass()} rounded-2xl border-2 md:border-[3px] border-[#3C3530] shadow-[4px_4px_0px_#3C3530] overflow-hidden`}>
            {/* Left Spiral Rings Column (Authentic Journal Binding) */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 z-30 bg-[#F5EFE6] border-r-2 border-[#3C3530] flex flex-col justify-around py-6 select-none pointer-events-none">
              <SpiralBinding count={24} />
            </div>

            {/* Inner Pages Content Area (Indented to clear spiral binding) */}
            <div className="pl-10 sm:pl-14 md:pl-16 pr-3 sm:pr-8 md:pr-10 py-6 sm:py-8 md:py-10">
              {/* Hero Section */}
              <Hero />

              {/* Projects Scrapbook Panel */}
              <Projects />

              {/* Skills & Spells Section */}
              <SkillsSection />

              {/* Work-iline (Timeline) */}
              <WorkTimeline />

              {/* Notebook Contact Form */}
              <ContactNotebook />

              {/* Notebook Footer */}
              <footer className="pt-8 border-t-2 border-dashed border-[#3C3530]/30 text-center select-none space-y-2">
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[#3C3530]/70">
                  <span>handcrafted with ✿ by</span>
                  <span className="font-bold underline text-[#3C3530]">{PERSONAL_INFO.name}</span>
                  <span>•</span>
                  <span>IIIT Vadodara (2023–2027)</span>
                  <span>•</span>
                  <span>c++ systems & low-latency engineering</span>
                </div>
                <div className="text-[11px] text-[#3C3530]/50 font-mono">
                  designed like an open retro kawaii sketchbook ⋆ zero heap bloat ⋆ ready for vercel
                </div>
              </footer>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Sticker Drawer & Lo-Fi Paper Player */}
      <StickerDrawer
        isOpen={isStickerDrawerOpen}
        onClose={() => setIsStickerDrawerOpen(false)}
        placedStickers={placedStickers}
        setPlacedStickers={setPlacedStickers}
      />

      <LoFiPlayer />
    </div>
  );
}

export default App;
