import React, { useState } from 'react';
import { playCutePop } from '../../utils/audio';

interface Entity {
  id: number;
  name: string;
  components: string[];
}

export const KnightEngineDemo: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([
    { id: 1, name: 'PlayerController', components: ['Transform', 'RigidBody', 'InputReceiver'] },
    { id: 2, name: 'MainCamera', components: ['Transform', 'CameraComponent'] },
    { id: 3, name: 'DirectionalLight', components: ['Transform', 'LightSource'] },
  ]);
  const [isTicking, setIsTicking] = useState(true);
  const [frameCount, setFrameCount] = useState(1440);

  const handleSpawnEntity = () => {
    playCutePop(850);
    const newId = entities.length + 1;
    const sampleNames = ['EnemyPawn', 'PickupItem', 'StaticObstacle', 'TriggerVolume'];
    const sampleComponents = [
      ['Transform', 'MeshRenderer', 'Collider'],
      ['Transform', 'ItemComponent', 'ParticleEmitter'],
      ['Transform', 'BoxCollider'],
      ['Transform', 'TriggerVolume', 'EventCallback'],
    ];
    const pick = (newId - 1) % sampleNames.length;
    setEntities((prev) => [
      ...prev,
      { id: newId, name: `${sampleNames[pick]}_${newId}`, components: sampleComponents[pick] },
    ]);
    setFrameCount((prev) => prev + 60);
  };

  const handleToggleTick = () => {
    playCutePop(750);
    setIsTicking(!isTicking);
  };

  return (
    <div className="card__inset text-left space-y-3 font-mono" style={{ background: 'var(--paper)' }}>
      <div className="flex justify-between items-center border-b border-[var(--ink)]/20 pb-2">
        <span className="label text-xs flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
          <span>⚙️</span>
          <span>KnightEngine: Modular C++ Game Engine Architecture</span>
        </span>
        <span className="tag" style={{ background: 'var(--sky)', fontSize: '0.7rem' }}>
          C++ &amp; SDL3
        </span>
      </div>

      {/* Engine Loop & Performance Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>Engine Loop:</span>
          <span className="font-bold text-xs" style={{ color: isTicking ? 'var(--mint)' : 'var(--hot-pink)' }}>
            {isTicking ? '● 60 FPS Fixed' : '○ Paused'}
          </span>
        </div>
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>Delta Time (dt):</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>16.6 ms</span>
        </div>
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>Active Entities:</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>{entities.length}</span>
        </div>
        <div className="p-1.5 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="block" style={{ color: 'var(--purple-d)' }}>Processed Frames:</span>
          <span className="font-bold text-xs" style={{ color: 'var(--ink)' }}>{frameCount}</span>
        </div>
      </div>

      {/* Entity-Component System (ECS) Registry */}
      <div className="p-2.5 rounded-lg border border-[var(--ink)]/30 text-xs" style={{ background: 'var(--cream)' }}>
        <div className="label text-[10px] border-b border-[var(--ink)]/20 pb-1 mb-2" style={{ color: 'var(--purple-d)' }}>
          ECS REGISTRY // LIVE ENTITIES:
        </div>

        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
          {entities.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between p-1.5 rounded border border-[var(--ink)]/20 text-[11px]"
              style={{ background: 'var(--paper)' }}
            >
              <span className="font-bold" style={{ color: 'var(--ink)' }}>
                #{e.id} {e.name}
              </span>
              <div className="flex gap-1 flex-wrap">
                {e.components.map((c) => (
                  <span
                    key={c}
                    className="tag"
                    style={{ fontSize: '0.62rem', padding: '1px 5px', background: 'var(--cream)' }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subsystem Pipeline Controls */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={handleSpawnEntity}
          className="btn btn--secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--yellow)' }}
        >
          + Instantiate Entity
        </button>
        <button
          type="button"
          onClick={handleToggleTick}
          className="btn btn--secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--mint)' }}
        >
          {isTicking ? '⏸ Pause Loop' : '▶ Resume Loop'}
        </button>
      </div>

      <div className="text-[10px] m-0" style={{ color: 'var(--purple-d)' }}>
        Engine Architecture: Modular windowing, event dispatch, and rendering abstraction layers in pure C++.
      </div>
    </div>
  );
};
