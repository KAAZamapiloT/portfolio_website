import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { SkillsSection } from './components/SkillsSection';
import { WorkTimeline } from './components/WorkTimeline';
import { ContactNotebook } from './components/ContactNotebook';
import { LoFiPlayer } from './components/LoFiPlayer';
import { PERSONAL_INFO } from './data/portfolioData';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="portfolio-shell">
      {/* 1. Navbar as .pill */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 2. Main Page Sections wrapped in .window */}
      <main className="flex flex-col gap-9">
        {/* Section 1: Hero / About */}
        <Hero />

        {/* Section 2: Featured Projects */}
        <Projects />

        {/* Section 3: Skills & Technical Architecture */}
        <SkillsSection />

        {/* Section 4: Timeline & Experience */}
        <WorkTimeline />

        {/* Section 5: Contact Pad */}
        <ContactNotebook />
      </main>

      {/* 3. Footer as .pill */}
      <footer className="pill text-center select-none space-y-1" style={{ padding: '16px 24px' }}>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
          <span className="font-bold" style={{ color: 'var(--ink)' }}>
            [TERMINAL.SH] {PERSONAL_INFO.name}
          </span>
          <span style={{ color: 'var(--purple-d)' }}>•</span>
          <span style={{ color: 'var(--ink)' }}>
            IIIT Vadodara (2023–2027)
          </span>
          <span style={{ color: 'var(--purple-d)' }}>•</span>
          <span style={{ color: 'var(--purple-d)' }}>
            Game Engine &amp; Systems Programming // C++ Developer
          </span>
        </div>
        <div className="text-[11px] font-mono" style={{ color: 'var(--purple-d)' }}>
          Retro-Kawaii Terminal Design System // Powered by Courier Prime &amp; Carlito
        </div>
      </footer>

      {/* Retro Chiptune Desk Player */}
      <LoFiPlayer />
    </div>
  );
}

export default App;
