import React from 'react';
import { STICKER_LIBRARY } from '../data/portfolioData';
import { PlacedSticker } from '../types';
import { playStampThud, playCutePop, playPaperRustle } from '../utils/audio';

interface StickerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placedStickers: PlacedSticker[];
  setPlacedStickers: React.Dispatch<React.SetStateAction<PlacedSticker[]>>;
}

export const StickerDrawer: React.FC<StickerDrawerProps> = ({
  isOpen,
  onClose,
  placedStickers,
  setPlacedStickers
}) => {
  const handleAddSticker = (sticker: typeof STICKER_LIBRARY[0]) => {
    playStampThud();
    // Spawn sticker at a random natural location on the page
    const randomX = Math.floor(Math.random() * 60) + 20; // 20% to 80%
    const randomY = Math.floor(Math.random() * 60) + 20;
    const randomRot = Math.floor(Math.random() * 40) - 20; // -20deg to +20deg

    const newPlaced: PlacedSticker = {
      id: `${sticker.id}-${Date.now()}`,
      emoji: sticker.emoji,
      name: sticker.name,
      x: randomX,
      y: randomY,
      rotation: randomRot,
      scale: 1,
    };

    setPlacedStickers((prev) => [...prev, newPlaced]);
  };

  const handleClearStickers = () => {
    playPaperRustle();
    setPlacedStickers([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-bounce-in">
      <div className="relative bg-[#FAF5EB] border-2 md:border-[3px] border-[#3C3530] shadow-[6px_6px_0px_#3C3530] rounded-2xl p-3 sm:p-4 text-left">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#3C3530]/20 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🏷️</span>
            <span className="font-extrabold text-sm text-[#3C3530]">
              Sticker Drawer <span className="font-normal text-xs text-[#3C3530]/70 font-mono">(tap to stick on page!)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {placedStickers.length > 0 && (
              <button
                onClick={handleClearStickers}
                className="text-[11px] font-bold text-[#E27B7B] underline hover:opacity-80"
              >
                peel all ({placedStickers.length})
              </button>
            )}
            <button
              onClick={() => {
                playCutePop(700);
                onClose();
              }}
              className="w-6 h-6 rounded-full bg-[#FAF5EB] border-2 border-[#3C3530] flex items-center justify-center font-bold text-xs hover:bg-[#FCEBEB]"
              title="Close drawer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Sticker Shelf */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {STICKER_LIBRARY.map((item) => (
            <button
              key={item.id}
              onClick={() => handleAddSticker(item)}
              className="flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-white border-2 border-[#3C3530] shadow-[2px_2px_0px_#3C3530] hover:scale-110 active:scale-90 transition-transform group"
              title={`Stick ${item.name}`}
            >
              <span className="text-2xl group-hover:animate-wiggle">{item.emoji}</span>
              <span className="text-[9px] font-bold text-[#3C3530] mt-0.5 whitespace-nowrap">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
