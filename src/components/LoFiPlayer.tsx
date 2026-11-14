import React, { useState, useEffect, useRef } from 'react';
import { playCutePop } from '../utils/audio';

export const LoFiPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Pentatonic scale notes
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

  const playChiptuneNote = (freq: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  };

  const handleToggleMusic = () => {
    playCutePop(800);
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      setIsPlaying(true);

      let step = 0;
      intervalRef.current = window.setInterval(() => {
        const chordProgression = [
          [notes[0], notes[2], notes[4]],
          [notes[1], notes[3], notes[5]],
          [notes[2], notes[4], notes[6]],
          [notes[0], notes[3], notes[5]],
        ];
        const chord = chordProgression[Math.floor(step / 4) % chordProgression.length];
        const note = chord[step % chord.length];
        playChiptuneNote(note);
        step++;
      }, 350);
    } else {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      <div className="pill flex items-center gap-2.5 text-xs font-mono" style={{ padding: '8px 14px' }}>
        <button
          type="button"
          onClick={handleToggleMusic}
          className="badge"
          style={{
            width: 34,
            height: 34,
            fontSize: '0.9rem',
            background: isPlaying ? 'var(--yellow)' : 'var(--mint)',
            cursor: 'pointer',
          }}
          title={isPlaying ? 'Pause Lo-Fi Synth' : 'Play Lo-Fi Synth'}
          aria-label={isPlaying ? 'Pause Lo-Fi Synth' : 'Play Lo-Fi Synth'}
        >
          {isPlaying ? '⏸' : '📻'}
        </button>

        <div className="text-left hidden sm:block">
          <div className="label text-xs m-0 flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
            <span>CHIPTUNE_RADIO</span>
            {isPlaying && <span className="animate-pulse" style={{ color: 'var(--hot-pink)' }}>♪ ♫</span>}
          </div>
          <div className="text-[10px]" style={{ color: 'var(--purple-d)' }}>
            {isPlaying ? 'synthesizing lo-fi ~' : 'tap radio for music!'}
          </div>
        </div>
      </div>
    </div>
  );
};
