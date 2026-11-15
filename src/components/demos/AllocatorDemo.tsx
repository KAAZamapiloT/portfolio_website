import React, { useState } from 'react';
import { playCutePop, playPaperRustle } from '../../utils/audio';

interface Block {
  id: number;
  type: 'linear' | 'pool';
  size: number;
  offset: number;
  color: string;
}

export const AllocatorDemo: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 1, type: 'linear', size: 32, offset: 0, color: 'var(--yellow)' },
    { id: 2, type: 'linear', size: 64, offset: 32, color: 'var(--mint)' },
    { id: 3, type: 'pool', size: 48, offset: 96, color: 'var(--sky)' },
  ]);
  const [totalAllocated, setTotalAllocated] = useState(144);
  const [heapCalls] = useState(0);

  const colors = ['var(--yellow)', 'var(--mint)', 'var(--sky)', 'var(--pink)', 'var(--lavender)'];

  const handleAllocLinear = () => {
    playCutePop(850);
    if (totalAllocated >= 384) {
      alert("Memory arena full! Reset to clear arena.");
      return;
    }
    const size = 32;
    const newBlock: Block = {
      id: Date.now(),
      type: 'linear',
      size,
      offset: totalAllocated,
      color: colors[blocks.length % colors.length],
    };
    setBlocks([...blocks, newBlock]);
    setTotalAllocated((prev) => prev + size);
  };

  const handleAllocPool = () => {
    playCutePop(980);
    if (totalAllocated >= 384) {
      alert("Memory arena full! Reset to clear arena.");
      return;
    }
    const size = 48;
    const newBlock: Block = {
      id: Date.now(),
      type: 'pool',
      size,
      offset: totalAllocated,
      color: 'var(--mint)',
    };
    setBlocks([...blocks, newBlock]);
    setTotalAllocated((prev) => prev + size);
  };

  const handleReset = () => {
    playPaperRustle();
    setBlocks([]);
    setTotalAllocated(0);
  };

  return (
    <div className="card__inset text-left space-y-3" style={{ background: 'var(--paper)' }}>
      <div className="flex justify-between items-center border-b border-[var(--ink)]/20 pb-2">
        <span className="label text-xs flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
          <span>⚡</span>
          <span>Volt: Linear &amp; Pool Allocator Arena Preview</span>
        </span>
        <span className="tag" style={{ background: 'var(--mint)', fontSize: '0.7rem' }}>
          Memory Arena Simulation
        </span>
      </div>

      <div>
        <div className="flex justify-between text-[11px] font-mono mb-1" style={{ color: 'var(--purple-d)' }}>
          <span>0x0000 (Base)</span>
          <span className="font-bold" style={{ color: 'var(--ink)' }}>{totalAllocated} / 384 Bytes Used</span>
          <span>0x0180 (Limit)</span>
        </div>
        <div
          className="h-8 w-full rounded-lg p-0.5 flex gap-1 overflow-hidden relative"
          style={{ background: 'var(--cream)', border: '2px solid var(--ink)' }}
        >
          {blocks.map((b) => (
            <div
              key={b.id}
              style={{
                width: `${(b.size / 384) * 100}%`,
                backgroundColor: b.color,
                border: '1.5px solid var(--ink)',
                color: 'var(--ink)',
              }}
              className="h-full rounded flex items-center justify-center text-[10px] font-mono font-bold select-none"
              title={`${b.type.toUpperCase()}: ${b.size}B @ offset ${b.offset}`}
            >
              {b.size}B
            </div>
          ))}
          {totalAllocated < 384 && (
            <div className="flex-1 flex items-center justify-center text-[10px] font-mono italic" style={{ color: 'var(--purple-d)' }}>
              [ free arena buffer ]
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={handleAllocLinear}
          className="btn btn--secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--yellow)' }}
        >
          + Linear Alloc (32B)
        </button>
        <button
          type="button"
          onClick={handleAllocPool}
          className="btn btn--secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--mint)' }}
        >
          + Pool Alloc (48B)
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="btn btn--secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--pink)' }}
        >
          ↺ Reset Arena (O(1))
        </button>
      </div>

      <div
        className="p-2 rounded border border-[var(--ink)]/30 text-[11px] font-mono"
        style={{ background: 'var(--cream)', color: 'var(--ink)' }}
      >
        💡 <strong>Design:</strong> Linear allocator advances pointer with zero lock overhead. Reset drops high-water mark instantly in O(1) time without OS free() traversal.
      </div>
    </div>
  );
};
