import React, { useState } from 'react';
import { playCutePop } from '../utils/audio';

const DIALOGUES = [
  { mood: 'happy', text: "hello! i'm uday (yuki) ✿ welcome to my sketchbook!", emoji: "🌸" },
  { mood: 'excited', text: "psst! all my systems projects run with zero heap bloat! ⚡", emoji: "✨" },
  { mood: 'blush', text: "hehee you clicked me! feel free to peel stickers below ♡", emoji: "💖" },
  { mood: 'code', text: "currently tuning b+ tree nodes & lock-free queues! 💻", emoji: "☕" },
  { mood: 'star', text: "try spinning the 3d cube in the pixel project card! 🎨", emoji: "⭐" },
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
    <div className="relative flex flex-col md:flex-row items-center gap-3">
      {/* Interactive Chibi Illustration */}
      <div 
        onClick={handleClick}
        className="relative cursor-pointer group select-none transition-transform hover:scale-105 active:scale-95"
        title="Click me for new cute dialogue!"
      >
        {/* Floating mood particles */}
        <div className="absolute -top-3 -right-2 text-sm animate-bounce pointer-events-none">
          {currentDialogue.emoji}
        </div>
        <div className="absolute -top-1 -left-2 text-xs text-[#E27B7B] animate-pulse pointer-events-none">
          ✦
        </div>

        {/* Chibi Character SVG */}
        <svg
          viewBox="0 0 140 160"
          className={`w-28 h-32 md:w-32 md:h-36 drop-shadow-[3px_3px_0px_#3C3530] transition-transform ${isWaving ? 'animate-wiggle' : ''}`}
        >
          {/* Back Hair */}
          <ellipse cx="70" cy="85" rx="55" ry="50" fill="#2E282A" stroke="#3C3530" strokeWidth="3" />
          <path d="M25 80 Q 20 135, 45 145 Q 60 120, 60 90 Z" fill="#2E282A" stroke="#3C3530" strokeWidth="2.5" />
          <path d="M115 80 Q 120 135, 95 145 Q 80 120, 80 90 Z" fill="#2E282A" stroke="#3C3530" strokeWidth="2.5" />

          {/* Clothes / Blazer */}
          <path d="M40 130 Q 70 145, 100 130 L 115 160 L 25 160 Z" fill="#75706C" stroke="#3C3530" strokeWidth="3" />
          {/* Inner Shirt & Tie */}
          <polygon points="70,128 60,155 70,160 80,155" fill="#FAF5EB" stroke="#3C3530" strokeWidth="2" />
          <polygon points="68,136 72,136 74,152 70,156 66,152" fill="#E27B7B" />

          {/* Hands */}
          {/* Left hand (stationary) */}
          <circle cx="32" cy="142" r="9" fill="#FFE5D9" stroke="#3C3530" strokeWidth="2.5" />
          {/* Right hand (waving) */}
          <g className={isWaving ? "animate-wiggle origin-[112px_130px]" : "origin-[112px_130px] group-hover:rotate-12 transition-transform"}>
            <circle cx="112" cy="128" r="9" fill="#FFE5D9" stroke="#3C3530" strokeWidth="2.5" />
            {/* Cute wave motion lines */}
            <path d="M124 120 Q 127 125, 124 130" stroke="#3C3530" strokeWidth="1.5" fill="none" />
            <path d="M128 122 Q 131 126, 128 130" stroke="#3C3530" strokeWidth="1.5" fill="none" />
          </g>

          {/* Face */}
          <path d="M35 70 Q 70 125, 105 70 Q 105 45, 70 45 Q 35 45, 35 70 Z" fill="#FFE5D9" stroke="#3C3530" strokeWidth="3" />
          
          {/* Rosy Blush */}
          <ellipse cx="48" cy="85" rx="7" ry="4" fill="#F8B4B4" opacity="0.85" />
          <ellipse cx="92" cy="85" rx="7" ry="4" fill="#F8B4B4" opacity="0.85" />

          {/* Eyes depending on dialogue */}
          {dialogueIdx === 2 ? (
            /* Winking / Blushing happy eye arcs */
            <>
              <path d="M46 76 Q 52 70, 58 76" stroke="#3C3530" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M82 76 Q 88 70, 94 76" stroke="#3C3530" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          ) : dialogueIdx === 3 ? (
            /* Focused coding glasses */
            <>
              <rect x="42" y="69" width="18" height="14" rx="3" fill="#EBF4F5" stroke="#3C3530" strokeWidth="2.5" />
              <rect x="80" y="69" width="18" height="14" rx="3" fill="#EBF4F5" stroke="#3C3530" strokeWidth="2.5" />
              <line x1="60" y1="76" x2="80" y2="76" stroke="#3C3530" strokeWidth="2.5" />
            </>
          ) : (
            /* Big Sparkly Kawaii Eyes */
            <>
              <ellipse cx="52" cy="74" rx="6.5" ry="8" fill="#3C3530" />
              <circle cx="50" cy="71" r="2.5" fill="#FAF5EB" />
              <circle cx="54" cy="77" r="1.2" fill="#FAF5EB" />

              <ellipse cx="88" cy="74" rx="6.5" ry="8" fill="#3C3530" />
              <circle cx="86" cy="71" r="2.5" fill="#FAF5EB" />
              <circle cx="90" cy="77" r="1.2" fill="#FAF5EB" />
            </>
          )}

          {/* Mouth */}
          <path d="M66 87 Q 70 92, 74 87" stroke="#3C3530" strokeWidth="2.5" fill={dialogueIdx === 1 ? "#E27B7B" : "none"} strokeLinecap="round" />

          {/* Front Bangs */}
          <path d="M34 56 Q 50 78, 62 58 Q 72 82, 85 58 Q 98 76, 106 56 Q 100 36, 70 36 Q 40 36, 34 56 Z" fill="#2E282A" stroke="#3C3530" strokeWidth="3" />
          
          {/* Cute Hair Clips / Star */}
          <rect x="36" y="50" width="10" height="4" rx="2" fill="#FEF7DA" stroke="#3C3530" strokeWidth="1.5" transform="rotate(-15 36 50)" />
          <rect x="38" y="56" width="10" height="4" rx="2" fill="#FCEBEB" stroke="#3C3530" strokeWidth="1.5" transform="rotate(-15 38 56)" />
        </svg>

        {/* Click me hint badge */}
        <div className="absolute -bottom-2 inset-x-0 flex justify-center">
          <span className="bg-[#FAF5EB] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#3C3530] shadow-[1px_1px_0px_#3C3530] text-[#3C3530] whitespace-nowrap">
            tap me! ✎
          </span>
        </div>
      </div>

      {/* Floating Speech Bubble */}
      <div className="relative bg-[#FAF5EB] border-2 md:border-[3px] border-[#3C3530] shadow-[4px_4px_0px_#3C3530] rounded-2xl p-3 md:p-4 max-w-xs md:max-w-sm text-left">
        {/* Bubble pointer pointing to chibi */}
        <div className="hidden md:block absolute -left-3 top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-[#3C3530]" />
        <div className="hidden md:block absolute -left-[9px] top-6 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[10px] border-r-[#FAF5EB]" />
        
        {/* Mobile top pointer */}
        <div className="block md:hidden absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-[#3C3530]" />
        <div className="block md:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[8px] border-b-[#FAF5EB]" />

        <div className="flex items-center gap-1.5 text-xs text-[#E27B7B] font-bold mb-1">
          <span>{currentDialogue.emoji}</span>
          <span className="tracking-wide uppercase text-[10px] text-[#3C3530]/70 font-mono">mood: {currentDialogue.mood}</span>
        </div>
        
        <p className="text-sm md:text-base font-medium leading-snug text-[#3C3530]">
          {currentDialogue.text}
        </p>

        <div className="mt-2 pt-1 border-t border-dashed border-[#3C3530]/20 flex justify-between items-center text-[11px] text-[#3C3530]/70">
          <span>saying #{dialogueIdx + 1} of {DIALOGUES.length}</span>
          <span className="font-bold underline cursor-pointer hover:text-[#E27B7B]" onClick={handleClick}>next note ➔</span>
        </div>
      </div>
    </div>
  );
};
