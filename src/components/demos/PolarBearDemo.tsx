import React, { useState } from 'react';
import { playCutePop } from '../../utils/audio';

type AIState = 'PATROL' | 'INVESTIGATE' | 'CHASE' | 'ATTACK';

export const PolarBearDemo: React.FC = () => {
  const [aiState, setAiState] = useState<AIState>('PATROL');
  const [playerHealth, setPlayerHealth] = useState(100);
  const [isHiding, setIsHiding] = useState(false);
  const [inventory] = useState(['Brass Key', 'Flashlight', 'Medkit']);
  const [blackboard, setBlackboard] = useState({
    targetLocation: 'Vector(-120, 450, 0)',
    hasLineOfSight: false,
    soundSourceDistance: 'Inf',
    threatLevel: 'Low',
  });

  const handleSoundDistraction = () => {
    playCutePop(750);
    setAiState('INVESTIGATE');
    setBlackboard({
      targetLocation: 'Vector(80, 210, 0)',
      hasLineOfSight: false,
      soundSourceDistance: '14.2m',
      threatLevel: 'Elevated',
    });
  };

  const handlePlayerSpotted = () => {
    playCutePop(900);
    if (isHiding) {
      alert("Player is currently hiding in locker! Enemy searches area but loses line-of-sight.");
      setAiState('INVESTIGATE');
      return;
    }
    setAiState('CHASE');
    setBlackboard({
      targetLocation: 'PlayerActor::GetActorLocation()',
      hasLineOfSight: true,
      soundSourceDistance: '2.5m',
      threatLevel: 'Critical',
    });
  };

  const handleAttack = () => {
    playCutePop(950);
    setAiState('ATTACK');
    setPlayerHealth((prev) => Math.max(prev - 25, 0));
  };

  const handleToggleHide = () => {
    playCutePop(820);
    const nextHiding = !isHiding;
    setIsHiding(nextHiding);
    if (nextHiding) {
      setAiState('PATROL');
      setBlackboard((prev) => ({
        ...prev,
        hasLineOfSight: false,
        threatLevel: 'Low',
      }));
    }
  };

  return (
    <div className="card__inset text-left space-y-3 font-mono" style={{ background: 'var(--paper)' }}>
      <div className="flex justify-between items-center border-b border-[var(--ink)]/20 pb-2">
        <span className="label text-xs flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
          <span>🐻‍❄️</span>
          <span>POLAR BEAR: UE5 Behavior Tree &amp; Gameplay Systems</span>
        </span>
        <span className="tag" style={{ background: 'var(--mint)', fontSize: '0.7rem' }}>
          UE5 &amp; C++ Horror
        </span>
      </div>

      {/* Gameplay Status Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-2 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="label text-[10px] block" style={{ color: 'var(--purple-d)' }}>PLAYER HEALTH:</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-bold text-sm" style={{ color: playerHealth < 50 ? 'var(--hot-pink)' : 'var(--ink)' }}>
              {playerHealth} / 100
            </span>
            <div className="flex-1 h-2 rounded overflow-hidden" style={{ background: 'var(--paper)', border: '1px solid var(--ink)' }}>
              <div
                className="h-full transition-all"
                style={{
                  width: `${playerHealth}%`,
                  background: playerHealth < 50 ? 'var(--hot-pink)' : 'var(--mint)',
                }}
              />
            </div>
          </div>
        </div>

        <div className="p-2 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="label text-[10px] block" style={{ color: 'var(--purple-d)' }}>INVENTORY SLOTS:</span>
          <div className="text-[11px] font-bold mt-0.5" style={{ color: 'var(--ink)' }}>
            {inventory.join(', ')}
          </div>
        </div>

        <div className="p-2 rounded border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
          <span className="label text-[10px] block" style={{ color: 'var(--purple-d)' }}>PLAYER STATUS:</span>
          <div className="text-[11px] font-bold mt-0.5" style={{ color: isHiding ? 'var(--purple-d)' : 'var(--ink)' }}>
            {isHiding ? '🙈 Hiding in Locker' : '🚶 Exposed in Hallway'}
          </div>
        </div>
      </div>

      {/* Behavior Tree Blackboard & AI State Machine */}
      <div className="p-2.5 rounded-lg border border-[var(--ink)]/30 text-xs" style={{ background: 'var(--cream)' }}>
        <div className="flex justify-between items-center border-b border-[var(--ink)]/20 pb-1 mb-2">
          <span className="label text-[10px]" style={{ color: 'var(--purple-d)' }}>
            ENEMY BEHAVIOR TREE TASK:
          </span>
          <span
            className="tag font-bold"
            style={{
              background:
                aiState === 'ATTACK' ? 'var(--hot-pink)'
                : aiState === 'CHASE' ? 'var(--pink)'
                : aiState === 'INVESTIGATE' ? 'var(--yellow)'
                : 'var(--mint)',
              fontSize: '0.72rem',
            }}
          >
            STATE: {aiState}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          <div>
            <span className="block text-[10px]" style={{ color: 'var(--purple-d)' }}>Target Location:</span>
            <span className="font-bold text-[10px]">{blackboard.targetLocation}</span>
          </div>
          <div>
            <span className="block text-[10px]" style={{ color: 'var(--purple-d)' }}>Line of Sight:</span>
            <span className="font-bold">{blackboard.hasLineOfSight ? 'YES (Aggro)' : 'NO'}</span>
          </div>
          <div>
            <span className="block text-[10px]" style={{ color: 'var(--purple-d)' }}>Sound Proximity:</span>
            <span className="font-bold">{blackboard.soundSourceDistance}</span>
          </div>
          <div>
            <span className="block text-[10px]" style={{ color: 'var(--purple-d)' }}>Threat Level:</span>
            <span className="font-bold">{blackboard.threatLevel}</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={handleSoundDistraction}
          className="btn btn--secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--yellow)' }}
        >
          🔊 Emit Sound Distraction
        </button>
        <button
          type="button"
          onClick={handlePlayerSpotted}
          className="btn btn--secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--pink)' }}
        >
          👀 Trigger Sight (Chase)
        </button>
        <button
          type="button"
          onClick={handleAttack}
          className="btn btn--secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--hot-pink)' }}
        >
          ⚔️ Enemy Strike (-25 HP)
        </button>
        <button
          type="button"
          onClick={handleToggleHide}
          className="btn btn--secondary"
          style={{ padding: '6px 12px', fontSize: '0.75rem', background: isHiding ? 'var(--mint)' : 'var(--paper)' }}
        >
          {isHiding ? '🚪 Exit Locker' : '🚪 Hide in Locker'}
        </button>
      </div>
    </div>
  );
};
