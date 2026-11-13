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
    { id: 1, type: 'linear', size: 32, offset: 0, color: '#FCEBEB' },
    { id: 2, type: 'linear', size: 64, offset: 32, color: '#F1EBF5' },
    { id: 3, type: 'pool', size: 48, offset: 96, color: '#EEF3EB' },
  ]);
  const [totalAllocated, setTotalAllocated] = useState(144);
  const [heapCalls, setHeapCalls] = useState(0);

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
      color: ['#FCEBEB', '#F1EBF5', '#EEF3EB', '#F9EFE4', '#FEF7DA'][blocks.length % 5],
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
      color: '#EEF3EB',
    };
    setBlocks([...blocks, newBlock]);
    setTotalAllocated((prev) => prev + size);
  };

  const handleReset = () => {
    playPaperRustle();
    setBlocks([]);
    setTotalAllocated(0);
    setHeapCalls(0);
  };

  return (
    <div className="bg-[#FAF5EB] p-4 rounded-xl border-2 border-[#3C3530] text-left text-sm">
      <div className="flex justify-between items-center mb-3 border-b border-[#3C3530]/20 pb-2">
        <span className="font-bold flex items-center gap-1.5 text-xs text-[#3C3530]">
          <span>⚡</span>
          <span>Volt Linear & Pool Arena Simulator</span>
        </span>
        <span className="text-[11px] font-mono bg-[#EEF3EB] px-2 py-0.5 rounded border border-[#3C3530]/30 font-bold">
          Heap Calls: {heapCalls} (Zero!)
        </span>
      </div>

      {/* Arena Memory Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-[11px] font-mono text-[#3C3530]/70 mb-1">
          <span>0x0000 (Base)</span>
          <span>{totalAllocated} / 384 Bytes Used</span>
          <span>0x0180 (Limit)</span>
        </div>
        <div className="h-8 w-full bg-[#EADBC8]/40 border-2 border-[#3C3530] rounded-lg p-0.5 flex gap-1 overflow-hidden relative shadow-inner">
          {blocks.map((b) => (
            <div
              key={b.id}
              style={{
                width: `${(b.size / 384) * 100}%`,
                backgroundColor: b.color,
              }}
              className="h-full border border-[#3C3530] rounded flex items-center justify-center text-[10px] font-mono font-bold text-[#3C3530] transition-all hover:scale-105 select-none"
              title={`${b.type.toUpperCase()}: ${b.size}B @ offset ${b.offset}`}
            >
              {b.size}B
            </div>
          ))}
          {totalAllocated < 384 && (
            <div className="flex-1 flex items-center justify-center text-[10px] font-mono text-[#3C3530]/40 italic">
              [ free arena buffer ]
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          onClick={handleAllocLinear}
          className="px-3 py-1 bg-[#F9EFE4] hover:bg-[#F2DFC9] border-2 border-[#3C3530] rounded-lg font-bold shadow-[2px_2px_0px_#3C3530] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs"
        >
          + Linear Alloc (32B)
        </button>
        <button
          onClick={handleAllocPool}
          className="px-3 py-1 bg-[#EEF3EB] hover:bg-[#DEEBD7] border-2 border-[#3C3530] rounded-lg font-bold shadow-[2px_2px_0px_#3C3530] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs"
        >
          + Pool Alloc (48B)
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-[#FAF5EB] hover:bg-[#EADBC8] border-2 border-[#3C3530] rounded-lg font-bold shadow-[2px_2px_0px_#3C3530] active:translate-x-0.5 active:translate-y-0.5 transition-all text-xs text-[#E27B7B]"
        >
          ↺ Reset Arena (O(1))
        </button>
      </div>

      <div className="mt-2.5 text-[11px] text-[#3C3530]/70 font-mono bg-[#FAF5EB] p-1.5 rounded border border-[#3C3530]/20">
        💡 <strong>Design:</strong> Linear allocator advances pointer with zero lock overhead. Reset drops high-water mark instantly in O(1) time without OS free() traversal.
      </div>
    </div>
  );
};
