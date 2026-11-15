import React, { useState } from 'react';
import { isSoundEnabled, setSoundEnabled, playCutePop } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleSoundToggle = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const navItems = [
    { id: 'hero', label: 'about' },
    { id: 'projects', label: 'projects' },
    { id: 'skills', label: 'skills' },
    { id: 'work', label: 'timeline' },
    { id: 'contact', label: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    playCutePop(880);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="pill nav-pill sticky top-3 z-40">
      {/* Brand in terminal font */}
      <div
        onClick={() => handleNavClick('hero')}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <span className="badge" style={{ width: 34, height: 34, fontSize: '0.85rem' }}>
          &gt;_
        </span>
        <span className="window__title" style={{ fontSize: '0.95rem' }}>
          uday // dev.term
        </span>
      </div>

      {/* Nav links */}
      <nav className="nav-pill__links" aria-label="Main Navigation">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-pill__link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Primary Actions: Resume + Sound */}
      <div className="flex items-center gap-2">
        <a
          href="/RESUME_Q-1.pdf"
          target="_blank"
          rel="noreferrer"
          className="btn"
          style={{ padding: '6px 16px', fontSize: '0.8rem' }}
          title="Download Primary Resume (Resume Q)"
        >
          <span>resume.pdf</span>
        </a>

        <button
          onClick={handleSoundToggle}
          className="btn btn--secondary"
          style={{ padding: '6px 12px', fontSize: '0.85rem' }}
          title={soundOn ? 'Mute audio' : 'Enable audio'}
          aria-label={soundOn ? 'Mute audio' : 'Enable audio'}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>
      </div>
    </header>
  );
};
