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
    skyColor: "#0F141C",
    fogColor: "rgba(0, 229, 255, 0.25)",
    lightColor: "#00e5ff",
    ambientIntensity: 0.8,
    actors: [
      { name: "SM_NeonSign_Kanji", tier: "Tier 1 (Exact)", x: 70, y: 55, shape: "beacon", color: "#FF2A6D" },
      { name: "SM_CyberDumpster", tier: "Tier 2 (Substring)", x: 40, y: 110, shape: "cube", color: "#2E384D" },
      { name: "SM_AlleyPillar_Metal", tier: "Tier 3 (Keyword)", x: 160, y: 70, shape: "pillar", color: "#4B5563" },
      { name: "BP_RainParticleEmitter", tier: "Tier 4 (Fuzzy 91%)", x: 110, y: 30, shape: "orb", color: "#00E5FF" },
    ],
    jsonPlan: {
      scene_type: "cyberpunk_urban",
      lighting: { directional_lux: 850, color_hex: "#00e5ff", volumetric_fog_scattering: 0.65 },
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
    skyColor: "#2D1B28",
    fogColor: "rgba(255, 179, 71, 0.3)",
    lightColor: "#FFB347",
    ambientIntensity: 1.2,
    actors: [
      { name: "SM_AncientPillar_01", tier: "Tier 1 (Exact)", x: 50, y: 65, shape: "pillar", color: "#D4C3A3" },
      { name: "SM_Obelisk_Moss", tier: "Tier 2 (Substring)", x: 120, y: 50, shape: "pillar", color: "#9EAA8A" },
      { name: "SM_Altar_Stone", tier: "Tier 3 (Keyword)", x: 90, y: 115, shape: "cube", color: "#A89F91" },
      { name: "BP_MysticOrb_FX", tier: "Tier 4 (Fuzzy 88%)", x: 120, y: 35, shape: "orb", color: "#FFD166" },
    ],
    jsonPlan: {
      scene_type: "mystic_ruins",
      lighting: { directional_lux: 2400, color_hex: "#ffb347", volumetric_fog_scattering: 0.42 },
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

  // Render simulated UE5 viewport onto HTML canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw sky/ambient background
    ctx.fillStyle = scene.skyColor;
    ctx.fillRect(0, 0, width, height);

    // Draw ground grid / perspective lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
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

    // Volumetric fog atmospheric glow
    const grad = ctx.createRadialGradient(width / 2, horizon, 10, width / 2, horizon, width * 0.7);
    grad.addColorStop(0, scene.fogColor);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw spawned 3D actors with drop shadows & lighting
    scene.actors.forEach((act) => {
      ctx.save();
      ctx.fillStyle = act.color;
      ctx.strokeStyle = '#3C3530';
      ctx.lineWidth = 2;

      // Drop shadow
      ctx.beginPath();
      ctx.ellipse(act.x, act.y + 12, 14, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fill();

      // Shape
      ctx.fillStyle = act.color;
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
        // Inner sparkle
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(act.x - 2, act.y - 10, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (act.shape === 'beacon') {
        ctx.fillRect(act.x - 5, act.y - 18, 10, 28);
        ctx.strokeRect(act.x - 5, act.y - 18, 10, 28);
        // Beacon glow
        ctx.fillStyle = act.color;
        ctx.beginPath();
        ctx.arc(act.x, act.y - 22, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Name label tag
      ctx.fillStyle = '#FAF5EB';
      ctx.font = '8px monospace';
      ctx.fillText(act.name.replace('SM_', ''), act.x - 18, act.y - 30);

      ctx.restore();
    });
  }, [scene]);

  return (
    <div className="bg-[#FAF5EB] p-4 rounded-xl border-2 border-[#3C3530] text-left text-sm font-sans">
      <div className="flex justify-between items-center mb-2.5 border-b border-[#3C3530]/20 pb-2">
        <span className="font-bold flex items-center gap-1.5 text-xs text-[#3C3530]">
          <span>🎬</span>
          <span>Project CANVAS: USceneBuilder & Groq LLM Pipeline</span>
        </span>
        <span className="text-[10px] font-mono bg-[#FEF7DA] px-2 py-0.5 rounded border border-[#3C3530]/30 font-bold">
          UE5.2+ & Groq API
        </span>
      </div>

      {/* Preset Prompt Buttons */}
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        <span className="text-[11px] font-bold text-[#3C3530]/70 self-center">Presets:</span>
        {PRESET_SCENES.map((p, idx) => (
          <button
            key={p.title}
            onClick={() => handleSelectPreset(idx)}
            className={`px-2 py-0.5 text-xs rounded-lg border border-[#3C3530] font-bold shadow-[1px_1px_0px_#3C3530] transition-transform ${
              activePresetIdx === idx ? 'bg-[#FCEBEB] scale-105' : 'bg-white hover:bg-gray-50'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Natural Language Prompt Bar */}
      <form onSubmit={handleSimulateInference} className="flex gap-2 mb-3">
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Enter natural-language scene prompt..."
          className="flex-1 bg-white border-2 border-[#3C3530] rounded-lg px-2.5 py-1 text-xs text-[#3C3530] focus:outline-none focus:ring-1 focus:ring-[#3C3530] shadow-inner font-mono"
        />
        <button
          type="submit"
          disabled={isGenerating}
          className="px-3 py-1 bg-[#EEF3EB] hover:bg-[#DEEBD7] border-2 border-[#3C3530] rounded-lg font-bold text-xs shadow-[2px_2px_0px_#3C3530] active:translate-x-0.5 active:translate-y-0.5 transition-all whitespace-nowrap"
        >
          {isGenerating ? '⚡ Groq Inferring...' : '✨ Gen Scene ⏎'}
        </button>
      </form>

      {/* View Switcher Tabs (Viewport / Strict JSON Schema / 5-Tier Asset Resolver) */}
      <div className="flex gap-1.5 border-b border-[#3C3530]/20 pb-1 mb-2 text-xs">
        <button
          onClick={() => { playCutePop(750); setActiveTab('viewport'); }}
          className={`px-2 py-0.5 rounded font-bold ${activeTab === 'viewport' ? 'bg-[#3C3530] text-white' : 'text-[#3C3530] hover:bg-gray-200'}`}
        >
          🎮 UE5 Live Viewport
        </button>
        <button
          onClick={() => { playCutePop(800); setActiveTab('json'); }}
          className={`px-2 py-0.5 rounded font-bold font-mono ${activeTab === 'json' ? 'bg-[#3C3530] text-white' : 'text-[#3C3530] hover:bg-gray-200'}`}
        >
          📋 Strict JSON Plan
        </button>
        <button
          onClick={() => { playCutePop(850); setActiveTab('resolver'); }}
          className={`px-2 py-0.5 rounded font-bold ${activeTab === 'resolver' ? 'bg-[#3C3530] text-white' : 'text-[#3C3530] hover:bg-gray-200'}`}
        >
          🔍 5-Tier Asset Resolver
        </button>
      </div>

      {/* Tab 1: Live Canvas Viewport */}
      {activeTab === 'viewport' && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative border-2 border-[#3C3530] rounded-lg overflow-hidden shadow-[2px_2px_0px_#3C3530]">
            <canvas ref={canvasRef} width={220} height={150} className="block" />
            <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.2 rounded font-mono">
              Live USceneBuilder Spawner
            </div>
          </div>

          <div className="flex-1 text-xs space-y-1.5 font-mono">
            <div className="bg-white p-2 rounded-lg border border-[#3C3530]/20">
              <span className="text-[#3C3530]/60 block text-[10px]">Active Lighting & Fog:</span>
              <div className="font-bold text-[#3C3530] text-[11px]">
                Volumetric Fog: {scene.jsonPlan.lighting ? (scene.jsonPlan.lighting as { volumetric_fog_scattering: number }).volumetric_fog_scattering : 0.5} | Lux: {scene.jsonPlan.lighting ? (scene.jsonPlan.lighting as { directional_lux: number }).directional_lux : 1000}
              </div>
            </div>

            <div className="bg-white p-2 rounded-lg border border-[#3C3530]/20">
              <span className="text-[#3C3530]/60 block text-[10px]">11-Tier Location Engine:</span>
              <div className="font-bold text-emerald-700 text-[11px]">
                Quadrant mapping & Anchor bounds resolved
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Strict JSON Schema Plan */}
      {activeTab === 'json' && (
        <pre className="bg-[#24201E] text-[#EEF3EB] p-2.5 rounded-lg border border-[#3C3530] text-[10px] font-mono overflow-x-auto max-h-40 leading-snug">
          {JSON.stringify(scene.jsonPlan, null, 2)}
        </pre>
      )}

      {/* Tab 3: 5-Tier Asset Resolver breakdown */}
      {activeTab === 'resolver' && (
        <div className="space-y-1.5 text-xs font-mono">
          {scene.actors.map((act) => (
            <div key={act.name} className="flex items-center justify-between bg-white p-1.5 rounded border border-[#3C3530]/20 text-[11px]">
              <span className="font-bold text-[#3C3530]">{act.name}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#FAF5EB] border border-[#3C3530]/30 font-bold text-purple-800">
                {act.tier}
              </span>
            </div>
          ))}
          <div className="text-[10px] text-[#3C3530]/70 pt-1">
            Resolves requests across inconsistently named assets: Exact ➔ Substring ➔ Keyword ➔ Fuzzy Levenshtein ➔ Fallback.
          </div>
        </div>
      )}
    </div>
  );
};
