import React, { useState, useEffect, useRef } from 'react';
import { playCutePop, playPaperRustle } from '../../utils/audio';

interface PresetScene {
  title: string;
  prompt: string;
  skyColor: string;
  fogColor: string;
  lightColor: string;
  ambientIntensity: number;
  actors: { name: string; tier: string; x: number; y: number; shape: 'cube' | 'pillar' | 'beacon' | 'orb'; color: string }[];
  jsonPlan: Record<string, unknown>;
}

const PRESET_SCENES: PresetScene[] = [
  {
    title: "Cyberpunk Alley",
    prompt: "create a rainy cyberpunk alley with volumetric cyan fog and pulsing red neon beacons",
    skyColor: "#2A1838",
    fogColor: "rgba(159, 216, 255, 0.35)",
    lightColor: "#9FD8FF",
    ambientIntensity: 0.8,
    actors: [
      { name: "SM_NeonSign_Kanji", tier: "Tier 1 (Exact)", x: 70, y: 55, shape: "beacon", color: "var(--hot-pink)" },
      { name: "SM_CyberDumpster", tier: "Tier 2 (Substring)", x: 40, y: 110, shape: "cube", color: "var(--lavender)" },
      { name: "SM_AlleyPillar_Metal", tier: "Tier 3 (Keyword)", x: 160, y: 70, shape: "pillar", color: "var(--sky)" },
      { name: "BP_RainParticleEmitter", tier: "Tier 4 (Fuzzy 91%)", x: 110, y: 30, shape: "orb", color: "var(--mint)" },
    ],
    jsonPlan: {
      scene_type: "cyberpunk_urban",
      lighting: { directional_lux: 850, color_hex: "#9FD8FF", volumetric_fog_scattering: 0.65 },
      post_process: { bloom_intensity: 1.8, chromatic_aberration: 0.15 },
      actors: [
        { asset: "SM_NeonSign_Kanji", query_tier: "exact", location: "wall_anchor_left" },
        { asset: "SM_CyberDumpster", query_tier: "substring", location: "ground_periphery" },
        { asset: "SM_AlleyPillar_Metal", query_tier: "keyword", location: "lateral_boundary" },
        { asset: "BP_RainParticleEmitter", query_tier: "fuzzy", location: "overhead_sky" }
      ]
    }
  },
  {
    title: "Ancient Ruins Sunset",
    prompt: "generate an overgrown ancient ruin with warm amber directional light, tall stone obelisks and mystical floating orbs",
    skyColor: "#3B2350",
    fogColor: "rgba(255, 233, 138, 0.35)",
    lightColor: "#FFE98A",
    ambientIntensity: 1.2,
    actors: [
      { name: "SM_AncientPillar_01", tier: "Tier 1 (Exact)", x: 50, y: 65, shape: "pillar", color: "var(--yellow)" },
      { name: "SM_Obelisk_Moss", tier: "Tier 2 (Substring)", x: 120, y: 50, shape: "pillar", color: "var(--mint)" },
      { name: "SM_Altar_Stone", tier: "Tier 3 (Keyword)", x: 90, y: 115, shape: "cube", color: "var(--pink)" },
      { name: "BP_MysticOrb_FX", tier: "Tier 4 (Fuzzy 88%)", x: 120, y: 35, shape: "orb", color: "var(--hot-pink)" },
    ],
    jsonPlan: {
      scene_type: "mystic_ruins",
      lighting: { directional_lux: 2400, color_hex: "#FFE98A", volumetric_fog_scattering: 0.42 },
      post_process: { bloom_intensity: 1.2, depth_of_field_focal_dist: 1200 },
      actors: [
        { asset: "SM_AncientPillar_01", query_tier: "exact", location: "quadrant_nw" },
        { asset: "SM_Obelisk_Moss", query_tier: "substring", location: "focal_center" },
        { asset: "SM_Altar_Stone", query_tier: "keyword", location: "ground_datum" },
        { asset: "BP_MysticOrb_FX", query_tier: "fuzzy", location: "air_levitating" }
      ]
    }
  }
];

export const CanvasDemo: React.FC = () => {
  const [activePresetIdx, setActivePresetIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'viewport' | 'json' | 'resolver'>('viewport');
  const [customPrompt, setCustomPrompt] = useState(PRESET_SCENES[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const scene = PRESET_SCENES[activePresetIdx];

  const handleSelectPreset = (idx: number) => {
    playCutePop(850);
    setActivePresetIdx(idx);
    setCustomPrompt(PRESET_SCENES[idx].prompt);
  };

  const handleSimulateInference = (e: React.FormEvent) => {
    e.preventDefault();
    playPaperRustle();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      playCutePop(980);
      setActivePresetIdx((prev) => (prev === 0 ? 1 : 0));
    }, 400);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = scene.skyColor;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 240, 247, 0.2)';
    ctx.lineWidth = 1;
    const horizon = 75;
    for (let x = -width; x < width * 2; x += 30) {
      ctx.beginPath();
      ctx.moveTo(width / 2, horizon);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = horizon; y <= height; y += (y - horizon) * 0.4 + 8) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const grad = ctx.createRadialGradient(width / 2, horizon, 10, width / 2, horizon, width * 0.7);
    grad.addColorStop(0, scene.fogColor);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    scene.actors.forEach((act) => {
      ctx.save();
      const resolvedColor =
        act.color.includes('hot-pink') ? '#FF5C9D'
        : act.color.includes('mint') ? '#9FE8CF'
        : act.color.includes('yellow') ? '#FFE98A'
        : act.color.includes('sky') ? '#9FD8FF'
        : act.color.includes('lavender') ? '#BFA8FF'
        : '#FF8FC1';

      ctx.fillStyle = resolvedColor;
      ctx.strokeStyle = '#3B2350';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.ellipse(act.x, act.y + 12, 14, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 35, 80, 0.4)';
      ctx.fill();

      ctx.fillStyle = resolvedColor;
      if (act.shape === 'pillar') {
        ctx.fillRect(act.x - 7, act.y - 25, 14, 35);
        ctx.strokeRect(act.x - 7, act.y - 25, 14, 35);
      } else if (act.shape === 'cube') {
        ctx.fillRect(act.x - 10, act.y - 10, 20, 20);
        ctx.strokeRect(act.x - 10, act.y - 10, 20, 20);
      } else if (act.shape === 'orb') {
        ctx.beginPath();
        ctx.arc(act.x, act.y - 8, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(act.x - 2, act.y - 10, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (act.shape === 'beacon') {
        ctx.fillRect(act.x - 5, act.y - 18, 10, 28);
        ctx.strokeRect(act.x - 5, act.y - 18, 10, 28);
        ctx.fillStyle = resolvedColor;
        ctx.beginPath();
        ctx.arc(act.x, act.y - 22, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#FFF0F7';
      ctx.font = '8px monospace';
      ctx.fillText(act.name.replace('SM_', ''), act.x - 18, act.y - 30);

      ctx.restore();
    });
  }, [scene]);

  return (
    <div className="card__inset text-left space-y-3" style={{ background: 'var(--paper)' }}>
      <div className="flex justify-between items-center border-b border-[var(--ink)]/20 pb-2">
        <span className="label text-xs flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
          <span>🎬</span>
          <span>USceneBuilder & Groq LLM Pipeline</span>
        </span>
        <span className="tag" style={{ background: 'var(--yellow)', fontSize: '0.7rem' }}>
          UE5.2+ & Groq API
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="label text-xs" style={{ color: 'var(--purple-d)' }}>Presets:</span>
        {PRESET_SCENES.map((p, idx) => (
          <button
            key={p.title}
            type="button"
            onClick={() => handleSelectPreset(idx)}
            className="btn btn--secondary"
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              background: activePresetIdx === idx ? 'var(--mint)' : 'var(--paper)',
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      <form onSubmit={handleSimulateInference} className="flex gap-2">
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Natural language scene prompt..."
          style={{ padding: '8px 12px', fontSize: '0.85rem' }}
        />
        <button
          type="submit"
          disabled={isGenerating}
          className="btn"
          style={{ padding: '8px 16px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
        >
          {isGenerating ? 'Inferring...' : 'Generate ⏎'}
        </button>
      </form>

      <div className="flex gap-1.5 border-b border-[var(--ink)]/20 pb-1 text-xs">
        <button
          type="button"
          onClick={() => { playCutePop(750); setActiveTab('viewport'); }}
          className="label"
          style={{
            background: activeTab === 'viewport' ? 'var(--ink)' : 'transparent',
            color: activeTab === 'viewport' ? 'var(--paper)' : 'var(--ink)',
            padding: '4px 8px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          🎮 UE5 Viewport
        </button>
        <button
          type="button"
          onClick={() => { playCutePop(800); setActiveTab('json'); }}
          className="label"
          style={{
            background: activeTab === 'json' ? 'var(--ink)' : 'transparent',
            color: activeTab === 'json' ? 'var(--paper)' : 'var(--ink)',
            padding: '4px 8px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          📋 Strict JSON Plan
        </button>
        <button
          type="button"
          onClick={() => { playCutePop(850); setActiveTab('resolver'); }}
          className="label"
          style={{
            background: activeTab === 'resolver' ? 'var(--ink)' : 'transparent',
            color: activeTab === 'resolver' ? 'var(--paper)' : 'var(--ink)',
            padding: '4px 8px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          🔍 5-Tier Resolver
        </button>
      </div>

      {activeTab === 'viewport' && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative border-2 border-[var(--ink)] rounded-lg overflow-hidden shadow-[2px_2px_0px_var(--ink)]">
            <canvas ref={canvasRef} width={220} height={140} className="block" />
            <div className="absolute bottom-1 left-1 bg-[var(--ink)] text-[var(--paper)] text-[9px] px-1.5 py-0.2 rounded font-mono">
              Live USceneBuilder
            </div>
          </div>

          <div className="flex-1 text-xs space-y-1.5 font-mono">
            <div className="p-2 rounded-lg border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
              <span className="block text-[10px]" style={{ color: 'var(--purple-d)' }}>Lighting & Volumetric Fog:</span>
              <div className="font-bold text-[11px]" style={{ color: 'var(--ink)' }}>
                Scattering: {scene.jsonPlan.lighting ? (scene.jsonPlan.lighting as { volumetric_fog_scattering: number }).volumetric_fog_scattering : 0.65} | Lux: {scene.jsonPlan.lighting ? (scene.jsonPlan.lighting as { directional_lux: number }).directional_lux : 1000}
              </div>
            </div>

            <div className="p-2 rounded-lg border border-[var(--ink)]/30" style={{ background: 'var(--cream)' }}>
              <span className="block text-[10px]" style={{ color: 'var(--purple-d)' }}>11-Tier Location Engine:</span>
              <div className="font-bold text-[11px]" style={{ color: 'var(--ink)' }}>
                Spatial anchors & world coordinates resolved
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'json' && (
        <pre style={{ margin: 0, fontSize: '0.75rem', maxHeight: '160px' }}>
          {JSON.stringify(scene.jsonPlan, null, 2)}
        </pre>
      )}

      {activeTab === 'resolver' && (
        <div className="space-y-1.5 text-xs font-mono">
          {scene.actors.map((act) => (
            <div
              key={act.name}
              className="flex items-center justify-between p-1.5 rounded border border-[var(--ink)]/30"
              style={{ background: 'var(--cream)' }}
            >
              <span className="font-bold" style={{ color: 'var(--ink)' }}>{act.name}</span>
              <span className="tag" style={{ background: 'var(--lavender)', fontSize: '0.68rem', padding: '2px 8px' }}>
                {act.tier}
              </span>
            </div>
          ))}
          <div className="text-[10px] pt-1" style={{ color: 'var(--purple-d)' }}>
            Resolves requests across inconsistently named assets: Exact ➔ Substring ➔ Keyword ➔ Fuzzy Levenshtein ➔ Fallback.
          </div>
        </div>
      )}
    </div>
  );
};
