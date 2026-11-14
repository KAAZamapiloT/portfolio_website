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

  // 3D Gem / Polyhedron vertices
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
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
    [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]
  ];

  // Retro-Kawaii pastel face colors
  const faceColors = [
    '#9FE8CF', '#FFE98A', '#9FD8FF', '#FF8FC1',
    '#BFA8FF', '#FFF0F7', '#9FE8CF', '#FF8FC1'
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

      // Background
      ctx.fillStyle = '#FFF0F7';
      ctx.fillRect(0, 0, width, height);

      // Grid dots
      ctx.fillStyle = 'rgba(59, 35, 80, 0.15)';
      for (let x = 10; x < width; x += 18) {
        for (let y = 10; y < height; y += 18) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
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

      // Painter's Algorithm sorting
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
        if (normalZ < 0) return;

        ctx.beginPath();
        ctx.moveTo(p0.px, p0.py);
        ctx.lineTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.closePath();

        if (!wireframeOnly) {
          ctx.fillStyle = color;
          ctx.fill();
        }

        ctx.strokeStyle = '#3B2350';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      // Draw vertex sparkles in var(--hot-pink)
      projected.forEach((p) => {
        ctx.fillStyle = '#FF5C9D';
        ctx.beginPath();
        ctx.arc(p.px, p.py, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#3B2350';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isRotating, wireframeOnly, fov]);

  return (
    <div className="card__inset text-left space-y-3" style={{ background: 'var(--paper)' }}>
      <div className="flex justify-between items-center border-b border-[var(--ink)]/20 pb-2">
        <span className="label text-xs flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
          <span>🎨</span>
          <span>Pixel 3D CPU Rasterizer Engine</span>
        </span>
        <span className="tag" style={{ background: 'var(--pink)', fontSize: '0.7rem' }}>
          Frustum & Z-Buffer: Active
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Software Framebuffer Canvas */}
        <div className="relative border-2 border-[var(--ink)] rounded-lg shadow-[2px_2px_0px_var(--ink)] overflow-hidden">
          <canvas ref={canvasRef} width={220} height={160} className="block cursor-grab active:cursor-grabbing" />
          <div
            className="absolute top-1.5 left-2 px-1.5 py-0.5 rounded text-[10px] font-mono border border-[var(--ink)] font-bold"
            style={{ background: 'var(--paper)', color: 'var(--ink)' }}
          >
            FPS: 60 (CPU)
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="label text-xs" style={{ color: 'var(--ink)' }}>Spin Model:</span>
            <button
              type="button"
              onClick={() => {
                playCutePop(750);
                setIsRotating(!isRotating);
              }}
              className="btn btn--secondary"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              {isRotating ? '⏸ Pause' : '▶ Spin'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="label text-xs" style={{ color: 'var(--ink)' }}>Render Mode:</span>
            <button
              type="button"
              onClick={() => {
                playCutePop(800);
                setWireframeOnly(!wireframeOnly);
              }}
              className="btn btn--secondary"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              {wireframeOnly ? '🎨 Shaded' : '📐 Wireframe'}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-mono" style={{ color: 'var(--purple-d)' }}>
              <span>Focal Length / Zoom:</span>
              <span className="font-bold" style={{ color: 'var(--ink)' }}>{fov}</span>
            </div>
            <input
              type="range"
              min="150"
              max="350"
              value={fov}
              onChange={(e) => setFov(Number(e.target.value))}
              style={{ padding: 0, height: '8px', cursor: 'pointer' }}
            />
          </div>

          <p className="text-[11px] font-mono leading-tight pt-1 m-0" style={{ color: 'var(--purple-d)' }}>
            ✨ Pure software rendering without GPU APIs. Projection: <code>Screen = ViewPort × Projection × View × World</code>
          </p>
        </div>
      </div>
    </div>
  );
};
