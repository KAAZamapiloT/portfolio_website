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
    <div className="bg-[#FAF5EB] p-4 rounded-xl border-2 border-[#3C3530] text-left text-sm font-mono">
      <div className="flex justify-between items-center mb-2 border-b border-[#3C3530]/20 pb-2">
        <span className="font-bold flex items-center gap-1.5 text-xs text-[#3C3530] font-sans">
          <span>🐧</span>
          <span>MNU-OS Linux Container Runtime</span>
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded border border-[#3C3530]/30 font-bold ${isRunning ? 'bg-[#EEF3EB] text-emerald-800' : 'bg-[#FAF5EB] text-gray-500'}`}>
          {isRunning ? '● RUNNING' : '○ STOPPED'}
        </span>
      </div>

      {/* Linux Kernel Isolation Tree */}
      <div className="space-y-2 mb-3">
        <div className="bg-white p-2 rounded-lg border border-[#3C3530]/20 text-[11px]">
          <div className="text-[#3C3530]/70 font-bold border-b border-[#3C3530]/10 pb-1 mb-1">
            Namespaces (Kernel clone() flags: CLONE_NEWPID | CLONE_NEWNS | CLONE_NEWNET)
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <div>• PID Mapping: <span className="text-emerald-700 font-bold">Host 10428 ➔ Cont 1</span></div>
            <div>• Mount NS: <span className="text-purple-700 font-bold">pivot_root (/mnt/rootfs)</span></div>
            <div>• Net NS: <span className="text-blue-700 font-bold">veth0_host ⇄ veth0_cont</span></div>
            <div>• IPC / UTS: <span className="text-amber-700 font-bold">isolated (hostname: mnu-box)</span></div>
          </div>
        </div>

        {/* cgroups v2 controller visualization */}
        <div className="bg-white p-2 rounded-lg border border-[#3C3530]/20 text-[11px]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[#3C3530]/70 font-bold">cgroups v2: memory.max controller</span>
            <span className="font-bold text-[#3C3530]">{memUsage.toFixed(1)} MB / 64.0 MB</span>
          </div>
          <div className="w-full h-4 bg-[#EADBC8]/40 border border-[#3C3530] rounded overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isCapped ? 'bg-[#E27B7B]' : 'bg-[#89C083]'}`}
              style={{ width: `${(memUsage / 64) * 100}%` }}
            />
          </div>
          {isCapped && (
            <div className="text-[10px] text-[#E27B7B] font-bold mt-1">
              ⚠️ cgroups v2 OOM Killer invoked: kernel prevented container from exceeding 64MB limit!
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 text-xs font-sans">
        <button
          onClick={handleToggle}
          className="px-3 py-1 bg-[#EEF3EB] hover:bg-[#DEEBD7] border-2 border-[#3C3530] rounded-lg font-bold shadow-[2px_2px_0px_#3C3530] active:translate-x-0.5 active:translate-y-0.5"
        >
          {isRunning ? '⏹ Kill Container' : '▶ Spawn Container'}
        </button>
        <button
          onClick={handleStress}
          disabled={!isRunning}
          className={`px-3 py-1 bg-[#FAF5EB] hover:bg-[#EADBC8] border-2 border-[#3C3530] rounded-lg font-bold shadow-[2px_2px_0px_#3C3530] active:translate-x-0.5 active:translate-y-0.5 ${!isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          ⚡ Stress Memory (+25MB)
        </button>
      </div>

      <div className="mt-2 text-[10px] text-[#3C3530]/60">
        CLI syntax: <code>mnu-os run --name={containerId} --mem=64M /bin/sh</code> (No Docker daemon overhead)
      </div>
    </div>
  );
};
