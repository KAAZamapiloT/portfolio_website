import React, { useState } from 'react';
import { playCutePop } from '../../utils/audio';

interface RecordItem {
  id: number;
  name: string;
  role: string;
  latencyUs: number;
}

export const SqlDemo: React.FC = () => {
  const [query, setQuery] = useState('SELECT * FROM kv_store LIMIT 3;');
  const [output, setOutput] = useState<RecordItem[]>([
    { id: 1042, name: 'volt_arena', role: 'linear_allocator', latencyUs: 0.12 },
    { id: 1043, name: 'pixel_camera', role: '6dof_matrix', latencyUs: 0.18 },
    { id: 1044, name: 'mnu_ns', role: 'cgroup_v2', latencyUs: 0.15 },
  ]);
  const [bTreeStats, setBTreeStats] = useState({
    depth: 3,
    indexedRecords: 124800,
    pageSize: '4096 Bytes',
    pageFillFactor: '87.4%',
  });

  const handleRunQuery = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playCutePop(900);

    const q = query.trim().toUpperCase();
    if (q.includes('INSERT')) {
      const newId = Math.floor(Math.random() * 9000) + 1000;
      setOutput((prev) => [
        ...prev,
        { id: newId, name: 'kawaii_record', role: 'in_memory_slotted', latencyUs: 0.22 }
      ]);
      setBTreeStats((prev) => ({
        ...prev,
        indexedRecords: prev.indexedRecords + 1
      }));
    } else if (q.includes('BENCHMARK') || q.includes('EXPLAIN')) {
      // Refresh with low latency benchmarks
      setBTreeStats({
        depth: 3,
        indexedRecords: 124801,
        pageSize: '4KB Slotted-Page',
        pageFillFactor: '88.1%',
      });
    }
  };

  return (
    <div className="bg-[#FAF5EB] p-4 rounded-xl border-2 border-[#3C3530] text-left text-sm font-mono">
      <div className="flex justify-between items-center mb-2 border-b border-[#3C3530]/20 pb-2">
        <span className="font-bold flex items-center gap-1.5 text-xs text-[#3C3530] font-sans">
          <span>💎</span>
          <span>QuartzDB Terminal & B+ Tree Inspector</span>
        </span>
        <span className="text-[10px] bg-[#FCEBEB] px-2 py-0.5 rounded border border-[#3C3530]/30 font-bold">
          4KB Slotted Page Engine
        </span>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2 text-[10px]">
        <div className="bg-[#EADBC8]/30 p-1.5 rounded border border-[#3C3530]/20">
          <span className="text-[#3C3530]/60 block">B+ Tree Depth</span>
          <span className="font-bold text-[#3C3530] text-xs">{bTreeStats.depth} (O(log n))</span>
        </div>
        <div className="bg-[#EADBC8]/30 p-1.5 rounded border border-[#3C3530]/20">
          <span className="text-[#3C3530]/60 block">Indexed Records</span>
          <span className="font-bold text-[#3C3530] text-xs">{bTreeStats.indexedRecords.toLocaleString()}</span>
        </div>
        <div className="bg-[#EADBC8]/30 p-1.5 rounded border border-[#3C3530]/20">
          <span className="text-[#3C3530]/60 block">Page Size</span>
          <span className="font-bold text-[#3C3530] text-xs">{bTreeStats.pageSize}</span>
        </div>
        <div className="bg-[#EADBC8]/30 p-1.5 rounded border border-[#3C3530]/20">
          <span className="text-[#3C3530]/60 block">Query Latency</span>
          <span className="font-bold text-[#3C3530] text-xs">&lt; 0.45 ms</span>
        </div>
      </div>

      {/* SQL Query Form */}
      <form onSubmit={handleRunQuery} className="flex gap-2 mb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-white border-2 border-[#3C3530] rounded-lg px-2.5 py-1 text-xs text-[#3C3530] focus:outline-none focus:ring-1 focus:ring-[#3C3530] shadow-inner font-mono"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-[#FCEBEB] hover:bg-[#FAD9D9] border-2 border-[#3C3530] rounded-lg font-bold text-xs shadow-[2px_2px_0px_#3C3530] active:translate-x-0.5 active:translate-y-0.5 transition-all font-sans"
        >
          Execute ⏎
        </button>
      </form>

      {/* Output Table */}
      <div className="border border-[#3C3530]/30 rounded-lg overflow-hidden bg-white text-[11px]">
        <table className="w-full text-left">
          <thead className="bg-[#FAF5EB] border-b border-[#3C3530]/30 text-[#3C3530]/70 font-bold">
            <tr>
              <th className="py-1 px-2">KEY_ID</th>
              <th className="py-1 px-2">NAME</th>
              <th className="py-1 px-2">PAGE_OFFSET</th>
              <th className="py-1 px-2">LATENCY</th>
            </tr>
          </thead>
          <tbody>
            {output.map((row) => (
              <tr key={row.id} className="border-b border-[#3C3530]/10 hover:bg-[#FDFBF7]">
                <td className="py-1 px-2 font-bold">{row.id}</td>
                <td className="py-1 px-2">{row.name}</td>
                <td className="py-1 px-2 text-[#3C3530]/60">0x{(row.id * 16).toString(16)}</td>
                <td className="py-1 px-2 text-emerald-700 font-bold">{row.latencyUs} μs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preset quick queries */}
      <div className="flex flex-wrap gap-1.5 mt-2 text-[10px]">
        <span className="text-[#3C3530]/60 font-sans">Quick tests:</span>
        <button
          type="button"
          onClick={() => { setQuery("INSERT INTO kv_store VALUES ('custom_alloc', 2026);"); handleRunQuery(); }}
          className="underline hover:text-[#E27B7B]"
        >
          INSERT record
        </button>
        <span>•</span>
        <button
          type="button"
          onClick={() => { setQuery("EXPLAIN BTREE;"); handleRunQuery(); }}
          className="underline hover:text-[#E27B7B]"
        >
          EXPLAIN BTree
        </button>
        <span>•</span>
        <button
          type="button"
          onClick={() => { setQuery("BENCHMARK LOOKUP;"); handleRunQuery(); }}
          className="underline hover:text-[#E27B7B]"
        >
          120k Benchmark
        </button>
      </div>
    </div>
  );
};
