import React from 'react';
import { PlacedSticker } from '../types';
import { playCutePop, playPaperRustle } from '../utils/audio';

interface StickerCanvasProps {
  stickers: PlacedSticker[];
  setStickers: React.Dispatch<React.SetStateAction<PlacedSticker[]>>;
}

export const StickerCanvas: React.FC<StickerCanvasProps> = ({ stickers, setStickers }) => {
  const handleStickerClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playCutePop(900);
    // Rotate slightly on each tap
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, rotation: s.rotation + 25 } : s))
    );
  };

  const handleRemoveSticker = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playPaperRustle();
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  if (stickers.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {stickers.map((s) => (
        <div
          key={s.id}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
          }}
          className="absolute pointer-events-auto select-none cursor-grab active:cursor-grabbing group"
          onClick={(e) => handleStickerClick(s.id, e)}
        >
          <div className="relative p-1 transition-transform group-hover:scale-125">
            <span className="text-3xl sm:text-4xl filter drop-shadow-[2px_2px_0px_#3C3530]">
              {s.emoji}
            </span>

            {/* Peel X button on hover */}
            <button
              onClick={(e) => handleRemoveSticker(s.id, e)}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FAF5EB] border border-[#3C3530] text-[9px] font-bold text-[#E27B7B] opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-[#FCEBEB] transition-opacity"
              title="Peel off sticker"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
