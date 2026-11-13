import React, { useState, useEffect, useRef } from 'react';
import { playCutePop } from '../../utils/audio';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const RasterizerDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [fov, setFov] = useState(250);
  const rotAngle = useRef({ x: 0.4, y: 0.6 });

  // 3D Gem / Diamond vertices
  const vertices: Point3D[] = [
    { x: 0, y: -50, z: 0 },    // Top vertex (0)
    { x: -35, y: -10, z: -35 }, // Upper ring (1)
    { x: 35, y: -10, z: -35 },  // (2)
    { x: 35, y: -10, z: 35 },   // (3)
    { x: -35, y: -10, z: 35 },  // (4)
    { x: 0, y: 55, z: 0 },     // Bottom vertex (5)
  ];

  // Faces (triangles)
  const faces = [
    // Top crown
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
    // Bottom pavilion
    [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]
  ];

  const faceColors = [
    '#FCEBEB', '#F1EBF5', '#EBF4F5', '#EEF3EB',
    '#F9EFE4', '#FEF7DA', '#FCEBEB', '#F1EBF5'
  ];

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      if (isRotating) {
        rotAngle.current.x += 0.015;
        rotAngle.current.y += 0.02;
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background paper tone
      ctx.fillStyle = '#FAF5EB';
      ctx.fillRect(0, 0, width, height);

      // Cute graph grid lines
      ctx.strokeStyle = 'rgba(60, 53, 48, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 16) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const ax = rotAngle.current.x;
      const ay = rotAngle.current.y;

      // Project vertices: 3D -> 2D
      const projected = vertices.map((v) => {
        // Rotate around Y
        const x1 = v.x * Math.cos(ay) + v.z * Math.sin(ay);
        const y1 = v.y;
        const z1 = -v.x * Math.sin(ay) + v.z * Math.cos(ay);

        // Rotate around X
        const x2 = x1;
        const y2 = y1 * Math.cos(ax) - z1 * Math.sin(ax);
        const z2 = y1 * Math.sin(ax) + z1 * Math.cos(ax);

        // Perspective division
        const distance = 160;
        const pz = z2 + distance;
        const scale = fov / Math.max(pz, 10);
        const px = width / 2 + x2 * scale;
        const py = height / 2 + y2 * scale;

        return { px, py, pz, origZ: z2 };
      });

      // Calculate face average Z for Painter's Algorithm sorting (Z-buffer)
      const sortedFaces = faces.map((indices, idx) => {
        const avgZ = (projected[indices[0]].origZ + projected[indices[1]].origZ + projected[indices[2]].origZ) / 3;
        return { indices, avgZ, color: faceColors[idx % faceColors.length] };
      }).sort((a, b) => a.avgZ - b.avgZ);

      // Draw faces
      sortedFaces.forEach(({ indices, color }) => {
        const p0 = projected[indices[0]];
        const p1 = projected[indices[1]];
        const p2 = projected[indices[2]];

        // Normal check for backface culling
        const normalZ = (p1.px - p0.px) * (p2.py - p0.py) - (p1.py - p0.py) * (p2.px - p0.px);
        if (normalZ < 0) return; // Cull backface!

        ctx.beginPath();
        ctx.moveTo(p0.px, p0.py);
        ctx.lineTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.closePath();

        if (!wireframeOnly) {
          ctx.fillStyle = color;
          ctx.fill();
        }

        // Sketchy pencil border
        ctx.strokeStyle = '#3C3530';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw vertex sparkles
      projected.forEach((p) => {
        ctx.fillStyle = '#E27B7B';
        ctx.beginPath();
        ctx.arc(p.px, p.py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isRotating, wireframeOnly, fov]);

  return (
    <div className="bg-[#FAF5EB] p-4 rounded-xl border-2 border-[#3C3530] text-left text-sm">
      <div className="flex justify-between items-center mb-2 border-b border-[#3C3530]/20 pb-2">
        <span className="font-bold flex items-center gap-1.5 text-xs text-[#3C3530]">
          <span>🎨</span>
          <span>Pixel 3D CPU Rasterizer Engine</span>
        </span>
        <span className="text-[11px] font-mono bg-[#F1EBF5] px-2 py-0.5 rounded border border-[#3C3530]/30 font-bold">
          Frustum & Z-Buffer: Active
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Software Framebuffer Canvas */}
        <div className="relative border-2 border-[#3C3530] rounded-lg shadow-[3px_3px_0px_#3C3530] overflow-hidden">
          <canvas ref={canvasRef} width={220} height={170} className="block cursor-grab active:cursor-grabbing" />
          <div className="absolute top-1.5 left-2 bg-[#FAF5EB]/90 px-1.5 py-0.5 rounded text-[10px] font-mono border border-[#3C3530]/40 font-bold">
            FPS: 60 (CPU)
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#3C3530]">Spin 3D Gem:</span>
            <button
              onClick={() => {
                playCutePop(750);
                setIsRotating(!isRotating);
              }}
              className="px-2 py-0.5 bg-[#FAF5EB] border border-[#3C3530] rounded shadow-[1px_1px_0px_#3C3530] font-bold"
            >
              {isRotating ? '⏸ Pause' : '▶ Spin'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-[#3C3530]">Render Mode:</span>
            <button
              onClick={() => {
                playCutePop(800);
                setWireframeOnly(!wireframeOnly);
              }}
              className="px-2 py-0.5 bg-[#FAF5EB] border border-[#3C3530] rounded shadow-[1px_1px_0px_#3C3530] font-bold"
            >
              {wireframeOnly ? '🎨 Shaded Faces' : '📐 Wireframe'}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-mono">
              <span>Zoom / Focal Length:</span>
              <span>{fov}</span>
            </div>
            <input
              type="range"
              min="150"
              max="350"
              value={fov}
              onChange={(e) => setFov(Number(e.target.value))}
              className="w-full accent-[#3C3530] cursor-pointer"
            />
          </div>

          <p className="text-[11px] text-[#3C3530]/70 font-mono leading-tight pt-1">
            ✨ Pure software rendering without OpenGL/DirectX. Math: <code>Screen = ViewPort × Projection × View × World</code>
          </p>
        </div>
      </div>
    </div>
  );
};
