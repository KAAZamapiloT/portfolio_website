import React from 'react';

interface SpiralBindingProps {
  count?: number;
  position?: 'left' | 'center';
  className?: string;
}

export const SpiralBinding: React.FC<SpiralBindingProps> = ({
  count = 14,
  className = ""
}) => {
  return (
    <div className={`flex flex-col justify-around items-center h-full py-4 select-none pointer-events-none z-20 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative flex items-center justify-center my-1">
          {/* Punched hole in paper */}
          <div className="w-3.5 h-3.5 rounded-full bg-[#262220] border-2 border-[#3C3530] shadow-inner" />
          
          {/* Wire ring / metal coil looping through hole */}
          <div className="absolute -left-1.5 w-6 h-3 rounded-full border-[2.5px] border-[#3C3530] bg-gradient-to-r from-gray-200 via-white to-gray-300 shadow-[1px_2px_0px_rgba(0,0,0,0.25)] transform -rotate-12" />
          
          {/* Tiny highlight on coil */}
          <div className="absolute -left-0.5 w-2 h-0.5 bg-white rounded-full opacity-80 -rotate-12" />
        </div>
      ))}
    </div>
  );
};
