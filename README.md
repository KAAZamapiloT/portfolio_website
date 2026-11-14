# 🌸 Retro-Kawaii Terminal Developer Portfolio

A developer portfolio website for **Uday Singh** (Game Engine & Systems Programmer // C++ Developer, IIIT Vadodara 2023–2027) built using a strict **Retro-Kawaii Terminal** design system.

---

## 🎨 Design System & Token Foundation

1. **Tokens & Palette**:
   - `--ink: #3B2350` (ALL text, borders, icons, and shadows; no pure black is used anywhere)
   - `--purple-d: #7A4DB8` (secondary text, labels, subtitles, inline links)
   - `--bg: #FFD8EA` (pink page background with radial polka-dot pattern)
   - `--paper: #FFFFFF` (window and card default interiors)
   - `--cream: #FFF0F7` (soft inner panels, form inputs, code blocks)
   - `--pink: #FF8FC1`
   - `--lavender: #BFA8FF` (window title bars & lavender cards)
   - `--mint: #9FE8CF`
   - `--yellow: #FFE98A` (primary buttons, active highlights)
   - `--sky: #9FD8FF`
   - `--hot-pink: #FF5C9D` (hearts, button hover state, active emphasis)

2. **Typography**:
   - **Headings & Terminal Labels**: `'Courier Prime', 'Courier New', monospace; font-weight: 700; text-transform: uppercase;`
   - **Body & Prose**: `'Carlito', Calibri, sans-serif`

3. **Core Components**:
   - **`.window-wrap` & `.window`**: Signature retro browser window with lavender title bar (`.window__bar`), monospace title (`.window__title`), and 3-dot window controls (`.dots` in mint, yellow, pink).
   - **`.card-grid` & Rotating Pastel `.card`s**: Strict color rotation across `.card--mint`, `.card--yellow`, `.card--sky`, `.card--pink`, and `.card--lavender`.
   - **`.badge`**: Circular 44×44 numbered markers (`01`, `02`, etc.) on project cards.
   - **`.card__inset`**: High-contrast white inset boxes for specs, code previews, and interactive playgrounds.
   - **`.pill`**: Pill-shaped top navbar (`.nav-pill`) and footer with `.nav-pill__link` and `.btn`.
   - **Corner Decorations**: 4-pointed sparkle and heart SVGs overlapping window corners.

---

## 🎮 Featured Game Development & Systems Projects

- **POLAR BEAR** (`C++`, `Unreal Engine 5`, `Behavior Trees`):
  First-person horror game developed in Unreal Engine 5 with C++ gameplay systems for health/damage, inventory, key-based interactions, puzzles, hiding, and combat. Implemented enemy AI using Behavior Tree tasks, navigation queries, patrol/wandering, player tracking, chase, and attack states.
- **Project Canvas** (`C++`, `Unreal Engine 5`, `Groq API`):
  LLM-driven real-time scene generation pipeline in UE5: natural language prompt ➔ strict JSON scene plan ➔ live lighting, volumetric fog, and actor spawning with a 5-tier asset resolver and 11-tier location query engine. Includes an interactive in-browser playground.
- **KnightEngine** (`C++`, `SDL3`, `Engine Architecture`):
  Modular C++ game engine with reusable windowing, logging, rendering, input, entity-component system (ECS), and fixed-timestep engine loop.
- **Pixel** (`C++`, `SDL3`, `Software Rasterizer`):
  Pure CPU software 3D rasterizer from mathematical first principles with 6-DOF camera, perspective projection, Z-buffering, and object-level frustum culling. Includes an interactive 3D canvas spinning model.
- **Volt** (`C++`, `Custom Allocators`):
  Header-only C++ systems library featuring custom Linear and Pool allocators eliminating general-purpose heap allocations in hot paths, SPSC lock-free queues, and a concurrent ThreadPool.
- **MNU-OS** (`C++`, `Linux Kernel Primitives`):
  Container runtime built directly from raw Linux namespaces and cgroups v2 primitives without Docker.
- **QuartzDB** (`C++`, `Storage Engine`):
  Embedded storage engine using a 4KB slotted-page format, custom pager, and on-disk B+ Tree indexing across 120,000+ records with sub-millisecond query latency.

---

## 📄 Resumes Available in `resumes/` & `public/`
- **Game Dev Resume**: `UdaySingh_ResumeGameDev.pdf` (Primary)
- **Systems & Container Resume**: `RESUME_cont.pdf`
- **Storage & Systems Resume**: `RESUME_Q-1.pdf`

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite dev server
npm run dev

# 3. Build for production
npm run build
```

---

## 🌐 Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "feat: game dev & systems focus per resume updates"
git push -u origin main
```
Import the repository on [vercel.com](https://vercel.com) — Vite settings (`npm run build` ➔ `dist`) are auto-detected and ready for 1-click deployment.
