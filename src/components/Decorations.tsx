import React from 'react';

interface DecoProps {
  position?: 'top-right' | 'bottom-left' | 'mascot';
  type?: 'sparkle' | 'heart' | 'mascot';
  className?: string;
}

export const Decoration: React.FC<DecoProps> = ({
  position = 'top-right',
  type = 'sparkle',
  className = '',
}) => {
  const posClass =
    position === 'top-right'
      ? 'deco--top-right'
      : position === 'bottom-left'
      ? 'deco--bottom-left'
      : 'deco--mascot';

  if (type === 'sparkle') {
    return (
      <svg
        className={`deco ${posClass} ${className}`}
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M32 4 C35 22, 42 29, 60 32 C42 35, 35 42, 32 60 C29 42, 22 35, 4 32 C22 29, 29 22, 32 4 Z"
          fill="var(--yellow)"
          stroke="var(--ink)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'heart') {
    return (
      <svg
        className={`deco ${posClass} ${className}`}
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M32 54 C32 54, 8 38, 8 21 C8 12, 16 7, 24 10 C28 11.5, 32 16, 32 16 C32 16, 36 11.5, 40 10 C48 7, 56 12, 56 21 C56 38, 32 54, 32 54 Z"
          fill="var(--hot-pink)"
          stroke="var(--ink)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Cute retro-kawaii terminal cat mascot
  return (
    <svg
      className={`deco ${posClass} ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <circle cx="32" cy="36" r="22" fill="var(--mint)" stroke="var(--ink)" strokeWidth="3" />
      {/* Ears */}
      <polygon points="16,22 10,6 26,16" fill="var(--pink)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="48,22 54,6 38,16" fill="var(--pink)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      {/* Eyes & Terminal whiskers */}
      <circle cx="24" cy="34" r="3" fill="var(--ink)" />
      <circle cx="40" cy="34" r="3" fill="var(--ink)" />
      {/* Cute terminal mouth ^-^ */}
      <path d="M28 42 Q 32 46, 36 42" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="20" cy="40" r="3" fill="var(--hot-pink)" />
      <circle cx="44" cy="40" r="3" fill="var(--hot-pink)" />
    </svg>
  );
};
