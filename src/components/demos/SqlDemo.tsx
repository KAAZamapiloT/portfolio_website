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
        { id: newId, name: 'slotted_record', role: 'in_memory_slotted', latencyUs: 0.22 }
      ]);
      setBTreeStats((prev) => ({
        ...prev,
        indexedRecords: prev.indexedRecords + 1
      }));
    } else if (q.includes('BENCHMARK') || q.includes('EXPLAIN')) {
      setBTreeStats({
        depth: 3,
        indexedRecords: 124801,
        pageSize: '4KB Slotted-Page',
        pageFillFactor: '88.1%',
      });
    }
  };

  return (
    <div className="card__inset text-left space-y-3 font-mono" style={{ background: 'var(--paper)' }}>
      <div className="flex justify-between items-center border-b border-[var(--ink)]/20 pb-2">
        <span className="label text-xs flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
          <span>💎</span>
          <span>QuartzDB Terminal & B+ Tree Inspector</span>
        </span>
        <span className="tag" style={{ background: 'var(--sky)', fontSize: '0.7rem' }}>
          4KB Slotted Page Engine
        </span>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>B+ Tree Depth</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>{bTreeStats.depth} (O(log n))</span>
        </div>
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>Indexed Records</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>{bTreeStats.indexedRecords.toLocaleString()}</span>
        </div>
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>Page Format</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>{bTreeStats.pageSize}</span>
        </div>
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>Query Latency</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>&lt; 0.45 ms</span>
        </div>
      </div>

      {/* SQL Query Form */}
      <form onSubmit={handleRunQuery} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '0.82rem' }}
        />
        <button
          type="submit"
          className="btn"
          style={{ padding: '8px 16px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
        >
          Execute ⏎
        </button>
      </form>

      {/* Output Table */}
      <div className="border-2 border-[var(--ink)] rounded-lg overflow-hidden" style={{ background: 'var(--cream)' }}>
        <table className="w-full text-left text-[11px]">
          <thead className="border-b border-[var(--ink)] font-bold" style={{ background: 'var(--lavender)', color: 'var(--ink)' }}>
            <tr>
              <th className="py-1 px-2.5">KEY_ID</th>
              <th className="py-1 px-2.5">NAME</th>
              <th className="py-1 px-2.5">PAGE_OFFSET</th>
              <th className="py-1 px-2.5">LATENCY</th>
            </tr>
          </thead>
          <tbody>
            {output.map((row) => (
              <tr key={row.id} className="border-b border-[var(--ink)]/20">
                <td className="py-1 px-2.5 font-bold">{row.id}</td>
                <td className="py-1 px-2.5">{row.name}</td>
                <td className="py-1 px-2.5" style={{ color: 'var(--purple-d)' }}>0x{(row.id * 16).toString(16)}</td>
                <td className="py-1 px-2.5 font-bold" style={{ color: 'var(--ink)' }}>{row.latencyUs} μs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preset quick queries */}
      <div className="flex flex-wrap gap-2 text-[10px] items-center">
        <span className="label text-[10px]" style={{ color: 'var(--purple-d)' }}>Tests:</span>
        <button
          type="button"
          onClick={() => { setQuery("INSERT INTO kv_store VALUES ('slotted_page', 2026);"); handleRunQuery(); }}
          className="nav-pill__link"
          style={{ padding: '2px 8px', fontSize: '0.7rem', border: '1px solid var(--ink)' }}
        >
          INSERT record
        </button>
        <button
          type="button"
          onClick={() => { setQuery("EXPLAIN BTREE;"); handleRunQuery(); }}
          className="nav-pill__link"
          style={{ padding: '2px 8px', fontSize: '0.7rem', border: '1px solid var(--ink)' }}
        >
          EXPLAIN BTree
        </button>
        <button
          type="button"
          onClick={() => { setQuery("BENCHMARK LOOKUP;"); handleRunQuery(); }}
          className="nav-pill__link"
          style={{ padding: '2px 8px', fontSize: '0.7rem', border: '1px solid var(--ink)' }}
        >
          120k Benchmark
        </button>
      </div>
    </div>
  );
};
