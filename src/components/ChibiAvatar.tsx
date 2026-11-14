import React, { useState } from 'react';
import { playCutePop } from '../utils/audio';

const DIALOGUES = [
  { mood: 'ready', text: "welcome to my terminal! i'm uday, systems & graphics engineer.", emoji: "🌸" },
  { mood: 'ue5', text: "check out project canvas: real-time scene generation in UE5 with Groq API!", emoji: "🎬" },
  { mood: 'systems', text: "all my systems projects run with zero heap bloat & deterministic cache lines.", emoji: "⚡" },
  { mood: 'math', text: "pure software 3d rasterizer built from linear algebra first principles!", emoji: "📐" },
  { mood: 'db', text: "quartzdb indexed 120,000+ records with sub-millisecond B+ tree lookups.", emoji: "💾" },
];

export const ChibiAvatar: React.FC = () => {
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [isWaving, setIsWaving] = useState(false);

  const handleClick = () => {
    playCutePop(950);
    setIsWaving(true);
    setDialogueIdx((prev) => (prev + 1) % DIALOGUES.length);
    setTimeout(() => setIsWaving(false), 800);
  };

  const currentDialogue = DIALOGUES[dialogueIdx];

  return (
    <div className="relative flex flex-col md:flex-row items-center gap-4">
      {/* Interactive Chibi Illustration */}
      <div
        onClick={handleClick}
        className="relative cursor-pointer group select-none transition-transform hover:scale-105 active:scale-95"
        title="Click me for next console note!"
      >
        {/* Floating mood particles */}
        <div className="absolute -top-3 -right-2 text-sm pointer-events-none">
          {currentDialogue.emoji}
        </div>
        <div className="absolute -top-1 -left-2 text-xs text-[var(--hot-pink)] pointer-events-none">
          ✦
        </div>

        {/* Chibi Character SVG in Retro-Kawaii Terminal Tokens */}
        <svg
          viewBox="0 0 140 160"
          className={`w-28 h-32 md:w-32 md:h-36 drop-shadow-[3px_3px_0px_var(--ink)] transition-transform ${isWaving ? 'rotate-[-3deg]' : ''}`}
        >
          {/* Back Hair */}
          <ellipse cx="70" cy="85" rx="55" ry="50" fill="var(--ink)" stroke="var(--ink)" strokeWidth="3" />
          <path d="M25 80 Q 20 135, 45 145 Q 60 120, 60 90 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth="2.5" />
          <path d="M115 80 Q 120 135, 95 145 Q 80 120, 80 90 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth="2.5" />

          {/* Clothes / Blazer in Lavender & Tie in Hot-Pink */}
          <path d="M40 130 Q 70 145, 100 130 L 115 160 L 25 160 Z" fill="var(--lavender)" stroke="var(--ink)" strokeWidth="3" />
          {/* Inner Shirt & Tie */}
          <polygon points="70,128 60,155 70,160 80,155" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
          <polygon points="68,136 72,136 74,152 70,156 66,152" fill="var(--hot-pink)" />

          {/* Hands */}
          <circle cx="32" cy="142" r="9" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2.5" />
          <g className={isWaving ? "rotate-12 origin-[112px_130px]" : "origin-[112px_130px] group-hover:rotate-12 transition-transform"}>
            <circle cx="112" cy="128" r="9" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2.5" />
            <path d="M124 120 Q 127 125, 124 130" stroke="var(--ink)" strokeWidth="2" fill="none" />
          </g>

          {/* Face */}
          <path d="M35 70 Q 70 125, 105 70 Q 105 45, 70 45 Q 35 45, 35 70 Z" fill="var(--cream)" stroke="var(--ink)" strokeWidth="3" />

          {/* Rosy Blush */}
          <ellipse cx="48" cy="85" rx="7" ry="4" fill="var(--pink)" opacity="0.9" />
          <ellipse cx="92" cy="85" rx="7" ry="4" fill="var(--pink)" opacity="0.9" />

          {/* Eyes in var(--ink) */}
          {dialogueIdx === 1 ? (
            /* Winking / Excited eye arcs */
            <>
              <path d="M46 76 Q 52 70, 58 76" stroke="var(--ink)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M82 76 Q 88 70, 94 76" stroke="var(--ink)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            /* Expressive Retro-Kawaii Eyes */
            <>
              <ellipse cx="52" cy="74" rx="6.5" ry="8" fill="var(--ink)" />
              <circle cx="50" cy="71" r="2.5" fill="var(--paper)" />
              <circle cx="54" cy="77" r="1.2" fill="var(--paper)" />

              <ellipse cx="88" cy="74" rx="6.5" ry="8" fill="var(--ink)" />
              <circle cx="86" cy="71" r="2.5" fill="var(--paper)" />
              <circle cx="90" cy="77" r="1.2" fill="var(--paper)" />
            </>
          )}

          {/* Mouth */}
          <path d="M66 87 Q 70 92, 74 87" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Front Hair Bangs */}
          <path d="M34 56 Q 50 78, 62 58 Q 72 82, 85 58 Q 98 76, 106 56 Q 100 36, 70 36 Q 40 36, 34 56 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth="3" />

          {/* Hair Clips */}
          <rect x="36" y="50" width="10" height="4" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" transform="rotate(-15 36 50)" />
          <rect x="38" y="56" width="10" height="4" rx="2" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.5" transform="rotate(-15 38 56)" />
        </svg>

        {/* Click badge */}
        <div className="absolute -bottom-2 inset-x-0 flex justify-center">
          <span className="tag" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
            &gt; tap me
          </span>
        </div>
      </div>

      {/* Retro-Kawaii Terminal Speech Bubble */}
      <div
        className="card__inset text-left relative"
        style={{
          maxWidth: '320px',
          background: 'var(--cream)',
          border: 'var(--border)',
          borderRadius: 'var(--radius)',
          boxShadow: '3px 3px 0 var(--ink)',
        }}
      >
        <div className="flex items-center justify-between gap-2 border-b border-[var(--ink)] pb-1 mb-2">
          <span className="label" style={{ fontSize: '0.72rem', color: 'var(--purple-d)' }}>
            STATUS: [{currentDialogue.mood}]
          </span>
          <span style={{ fontSize: '0.8rem' }}>{currentDialogue.emoji}</span>
        </div>

        <p className="text-sm font-medium leading-relaxed m-0" style={{ color: 'var(--ink)' }}>
          {currentDialogue.text}
        </p>

        <div className="mt-2 pt-1.5 border-t border-[var(--ink)]/20 flex justify-between items-center text-xs">
          <span style={{ fontFamily: 'Courier Prime, monospace', fontSize: '0.75rem', color: 'var(--ink)' }}>
            MSG #{dialogueIdx + 1}/{DIALOGUES.length}
          </span>
          <button
            type="button"
            onClick={handleClick}
            className="label"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--purple-d)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              padding: 0,
            }}
          >
            NEXT &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};
