import React, { useState } from 'react';
import { playCutePop } from '../../utils/audio';

interface RecordItem {
  id: number;
  name: string;
  role: string;
  status: string;
}

export const SqlDemo: React.FC = () => {
  const [query, setQuery] = useState('SELECT * FROM kv_store LIMIT 3;');
  const [output, setOutput] = useState<RecordItem[]>([
    { id: 1042, name: 'volt_arena', role: 'linear_allocator', status: 'INDEXED (Leaf 0x01)' },
    { id: 1043, name: 'pixel_camera', role: '6dof_matrix', status: 'INDEXED (Leaf 0x02)' },
    { id: 1044, name: 'mnu_ns', role: 'cgroup_v2', status: 'INDEXED (Leaf 0x02)' },
  ]);
  const [bTreeStats, setBTreeStats] = useState({
    depth: 3,
    indexedRecords: 124800,
    pageSize: '4096 Bytes',
    pagerState: 'Active Slotted Pager',
  });

  const handleRunQuery = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playCutePop(900);

    const q = query.trim().toUpperCase();
    if (q.includes('INSERT')) {
      const newId = Math.floor(Math.random() * 9000) + 1000;
      setOutput((prev) => [
        ...prev,
        { id: newId, name: 'slotted_record', role: 'in_memory_slotted', status: 'COMMITTED (New Page)' }
      ]);
      setBTreeStats((prev) => ({
        ...prev,
        indexedRecords: prev.indexedRecords + 1
      }));
    } else if (q.includes('EXPLAIN') || q.includes('BTREE')) {
      setBTreeStats({
        depth: 3,
        indexedRecords: 124801,
        pageSize: '4096-Byte Slotted Page',
        pagerState: 'B+ Tree Traverse: O(log n)',
      });
    } else if (q.includes('SELECT')) {
      setOutput([
        { id: 1042, name: 'volt_arena', role: 'linear_allocator', status: 'MATCHED' },
        { id: 1043, name: 'pixel_camera', role: '6dof_matrix', status: 'MATCHED' },
        { id: 1044, name: 'mnu_ns', role: 'cgroup_v2', status: 'MATCHED' },
      ]);
    }
  };

  return (
    <div className="card__inset text-left space-y-3 font-mono" style={{ background: 'var(--paper)' }}>
      <div className="flex justify-between items-center border-b border-[var(--ink)]/20 pb-2">
        <span className="label text-xs flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
          <span>💎</span>
          <span>QuartzDB: Simulated SQL Workflows &amp; B+ Tree Pager</span>
        </span>
        <span className="tag" style={{ background: 'var(--sky)', fontSize: '0.7rem' }}>
          Simulated 4KB Slotted Pager
        </span>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>B+ Tree Depth</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>{bTreeStats.depth} (O(log n))</span>
        </div>
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>Indexed Scale</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>{bTreeStats.indexedRecords.toLocaleString()} recs</span>
        </div>
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>Page Format</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>{bTreeStats.pageSize}</span>
        </div>
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>Pager State</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>{bTreeStats.pagerState}</span>
        </div>
      </div>

      {/* SQL Query Form */}
      <form onSubmit={handleRunQuery} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '0.82rem' }}
          placeholder="Enter SQL query (e.g. SELECT, INSERT, EXPLAIN)..."
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
              <th className="py-1 px-2.5">RECORD_NAME</th>
              <th className="py-1 px-2.5">PAGE_OFFSET</th>
              <th className="py-1 px-2.5">PAGER_STATUS</th>
            </tr>
          </thead>
          <tbody>
            {output.map((row) => (
              <tr key={row.id} className="border-b border-[var(--ink)]/20">
                <td className="py-1 px-2.5 font-bold">{row.id}</td>
                <td className="py-1 px-2.5">{row.name}</td>
                <td className="py-1 px-2.5" style={{ color: 'var(--purple-d)' }}>0x{(row.id * 16).toString(16)}</td>
                <td className="py-1 px-2.5 font-bold" style={{ color: 'var(--ink)' }}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preset quick queries */}
      <div className="flex flex-wrap gap-2 text-[10px] items-center">
        <span className="label text-[10px]" style={{ color: 'var(--purple-d)' }}>Quick Queries:</span>
        <button
          type="button"
          onClick={() => { setQuery("SELECT * FROM kv_store;"); handleRunQuery(); }}
          className="nav-pill__link"
          style={{ padding: '2px 8px', fontSize: '0.7rem', border: '1px solid var(--ink)' }}
        >
          SELECT *
        </button>
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
          onClick={() => { setQuery("EXPLAIN BTREE kv_store;"); handleRunQuery(); }}
          className="nav-pill__link"
          style={{ padding: '2px 8px', fontSize: '0.7rem', border: '1px solid var(--ink)' }}
        >
          EXPLAIN BTree
        </button>
      </div>
    </div>
  );
};
