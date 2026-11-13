import React from 'react';

interface WashiTapeProps {
  variant?: 'pink-stripes' | 'purple-polka' | 'mint-stripes' | 'peach-stripes' | 'yellow-stripes' | 'craft';
  className?: string;
  width?: string;
  height?: string;
}

export const WashiTape: React.FC<WashiTapeProps> = ({
  variant = 'pink-stripes',
  className = '',
  width = 'w-24',
  height = 'h-6'
}) => {
  const getPatternClass = () => {
    switch (variant) {
      case 'pink-stripes':
        return 'washi-stripes-pink border-t border-b border-[#3C3530]/20';
      case 'purple-polka':
        return 'washi-polka-purple border-t border-b border-[#3C3530]/20';
      case 'mint-stripes':
        return 'washi-stripes-mint border-t border-b border-[#3C3530]/20';
      case 'peach-stripes':
        return 'washi-stripes-peach border-t border-b border-[#3C3530]/20';
      case 'yellow-stripes':
        return 'bg-[#FEF7DA]/90 border-t border-b border-[#3C3530]/20';
      case 'craft':
        return 'bg-[#EADBC8]/90 border-t border-b border-[#3C3530]/30';
      default:
        return 'washi-stripes-pink';
    }
  };

  return (
    <div
      className={`inline-block ${width} ${height} ${getPatternClass()} opacity-90 shadow-sm relative pointer-events-none select-none z-10 ${className}`}
      style={{
        clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
      }}
    >
      {/* Translucent tape gloss line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-white/40" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black/10" />
    </div>
  );
};
