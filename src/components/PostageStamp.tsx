import React from 'react';
import { playStampThud } from '../utils/audio';

interface PostageStampProps {
  icon?: string;
  label?: string;
  price?: string;
  color?: string; // background color
  postmark?: string;
  className?: string;
  onClick?: () => void;
}

export const PostageStamp: React.FC<PostageStampProps> = ({
  icon = "⚡",
  label = "STAMP",
  price = "✿ 20",
  color = "#F9EFE4",
  postmark = "2026.IIITV",
  className = "",
  onClick
}) => {
  const handleClick = () => {
    playStampThud();
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex flex-col items-center justify-between p-1.5 cursor-pointer select-none transition-transform hover:scale-105 active:scale-95 group ${className}`}
      title={`${label} stamp`}
    >
      {/* Perforated stamp paper container */}
      <div 
        className="relative p-2 border-2 border-dashed border-[#3C3530] shadow-[2px_2px_0px_#3C3530] rounded-sm flex flex-col items-center justify-between min-w-[54px] min-h-[64px]"
        style={{ backgroundColor: color }}
      >
        {/* Scalloped edge visual illusion with tiny corner notches */}
        <div className="w-full flex justify-between items-center text-[9px] font-bold tracking-wider text-[#3C3530]/80 border-b border-[#3C3530]/30 pb-0.5 mb-1">
          <span>{price}</span>
          <span className="text-[8px]">★</span>
        </div>

        {/* Center Stamp Icon */}
        <div className="text-xl my-0.5 filter drop-shadow-[1px_1px_0px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform">
          {icon}
        </div>

        {/* Stamp Label */}
        <div className="w-full text-center border-t border-[#3C3530]/30 pt-0.5 mt-1">
          <span className="text-[9px] font-extrabold tracking-tighter uppercase text-[#3C3530] block leading-tight">
            {label}
          </span>
        </div>

        {/* Postmark cancellation stamp over the corner */}
        <div className="absolute -top-1 -right-2 pointer-events-none opacity-40 rotate-[-15deg]">
          <div className="border border-[#3C3530] rounded-full w-7 h-7 flex items-center justify-center text-[6px] font-mono leading-none text-center">
            {postmark}
          </div>
          {/* Wavy cancellation ink lines */}
          <svg className="w-9 h-3 text-[#3C3530]" viewBox="0 0 40 10" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M0 3 Q 5 0, 10 3 T 20 3 T 30 3 T 40 3" />
            <path d="M0 7 Q 5 4, 10 7 T 20 7 T 30 7 T 40 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
