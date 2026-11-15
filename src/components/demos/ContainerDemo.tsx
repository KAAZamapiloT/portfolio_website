import React, { useState } from 'react';
import { playCutePop } from '../../utils/audio';

export const ContainerDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [memUsage, setMemUsage] = useState(24.5);
  const [containerId] = useState('c-882f');
  const [isCapped, setIsCapped] = useState(false);

  const handleToggle = () => {
    playCutePop(700);
    setIsRunning(!isRunning);
    if (!isRunning) {
      setMemUsage(24.5);
      setIsCapped(false);
    }
  };

  const handleStress = () => {
    playCutePop(900);
    if (!isRunning) return;
    setMemUsage((prev) => {
      const next = prev + 25;
      if (next >= 64) {
        setIsCapped(true);
        return 64.0;
      }
      return next;
    });
  };

  return (
    <div className="card__inset text-left space-y-3 font-mono" style={{ background: 'var(--paper)' }}>
      <div className="flex justify-between items-center border-b border-[var(--ink)]/20 pb-2">
        <span className="label text-xs flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
          <span>🐧</span>
          <span>MNU-OS: Linux Container &amp; cgroups v2 Isolation Preview</span>
        </span>
        <span
          className="tag"
          style={{
            background: isRunning ? 'var(--mint)' : 'var(--cream)',
            fontSize: '0.7rem',
          }}
        >
          {isRunning ? '● RUNNING (CONCEPT)' : '○ STOPPED'}
        </span>
      </div>

      {/* Linux Kernel Isolation Tree */}
      <div className="space-y-2">
        <div className="p-2.5 rounded-lg border border-[var(--ink)]/30 text-[11px]" style={{ background: 'var(--cream)' }}>
          <div className="label text-[10px] border-b border-[var(--ink)]/20 pb-1 mb-1" style={{ color: 'var(--purple-d)' }}>
            Namespaces (clone() flags: CLONE_NEWPID | CLONE_NEWNS | CLONE_NEWNET)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
            <div>• PID Mapping: <span className="font-bold" style={{ color: 'var(--ink)' }}>Host 10428 ➔ Cont 1</span></div>
            <div>• Mount NS: <span className="font-bold" style={{ color: 'var(--purple-d)' }}>pivot_root (/mnt/rootfs)</span></div>
            <div>• Net NS: <span className="font-bold" style={{ color: 'var(--ink)' }}>veth0_host ⇄ veth0_cont</span></div>
            <div>• IPC / UTS: <span className="font-bold" style={{ color: 'var(--ink)' }}>isolated (hostname: mnu-box)</span></div>
          </div>
        </div>

        {/* cgroups v2 controller visualization */}
        <div className="p-2.5 rounded-lg border border-[var(--ink)]/30 text-[11px]" style={{ background: 'var(--cream)' }}>
          <div className="flex justify-between items-center mb-1">
            <span className="label text-[10px]" style={{ color: 'var(--purple-d)' }}>cgroups v2: memory.max</span>
            <span className="font-bold" style={{ color: 'var(--ink)' }}>{memUsage.toFixed(1)} MB / 64.0 MB</span>
          </div>
          <div className="w-full h-4 rounded overflow-hidden" style={{ background: 'var(--paper)', border: '2px solid var(--ink)' }}>
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${(memUsage / 64) * 100}%`,
                background: isCapped ? 'var(--hot-pink)' : 'var(--mint)',
              }}
            />
          </div>
          {isCapped && (
            <div className="text-[10px] font-bold mt-1" style={{ color: 'var(--hot-pink)' }}>
              ⚠️ cgroups v2 OOM Invoked: Hardware memory limit enforced at 64MB!
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={handleToggle}
          className="btn btn--secondary"
          style={{ padding: '6px 14px', fontSize: '0.75rem', background: 'var(--lavender)' }}
        >
          {isRunning ? '⏹ Kill Container' : '▶ Spawn Container'}
        </button>
        <button
          type="button"
          onClick={handleStress}
          disabled={!isRunning}
          className="btn btn--secondary"
          style={{
            padding: '6px 14px',
            fontSize: '0.75rem',
            background: 'var(--yellow)',
            opacity: !isRunning ? 0.5 : 1,
          }}
        >
          ⚡ Stress Memory (+25MB)
        </button>
      </div>

      <div className="text-[10px] m-0" style={{ color: 'var(--purple-d)' }}>
        CLI syntax: <code>mnu-os run --name={containerId} --mem=64M /bin/sh</code> (No Docker daemon overhead)
      </div>
    </div>
  );
};
