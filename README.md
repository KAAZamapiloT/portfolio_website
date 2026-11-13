# 📔 Retro Kawaii Sketchbook Portfolio

A highly interactive and responsive developer portfolio styled entirely like a handcrafted, layered **"Retro Kawaii Sketchbook"** for **Uday Singh** (Systems & Low-Latency C++ Engineer).

Designed to faithfully evoke the look and feel of an open scrapbooked spiral journal, filled with vintage pastel containers, faux washi-tape banners, postage stamps with postmark cancellations, hand-drawn doodles, chiptune sound effects, and interactive engineering labs.

---

## 🎨 Aesthetic & Design Highlights

1. **Color Palette**:
   - **Background**: Light cream, off-white, and pale craft-paper (`#FDFBF7`, `#FAF5EB`, `#EADBC8`) resting over a cozy dark desk surface (`#24201E`).
   - **Vintage Pastels**: Soft peach (`#F9EFE4`), blush pink (`#FCEBEB`), lavender (`#F1EBF5`), sage green (`#EEF3EB`), and pale butter (`#FEF7DA`).
   - **Outline & Typography**: Pencil charcoal (`#3C3530`) with `border-[3px] border-[#3C3530]` and flat paper drop shadows (`shadow-[4px_4px_0px_#3C3530]`).

2. **Notebook Structure**:
   - **Spiral Binding Spine**: Double-wire metal coils (`○`) looping through stamped punch holes down the notebook's left margin.
   - **Paper Textures**: Switchable between **Graph Paper**, **Ruled Lined Paper**, and **Craft Paper** modes.
   - **Layered Elements**: Faux washi tape strips (candy diagonal stripes, polka dots, gingham), paperclips (`📎`), push pins (`📌`), and torn craft paper underlays.

3. **Chibi Avatar & Mood Dialogue**:
   - Handcrafted kawaii chibi character (Uday / Yuki) with big expressive eyes, rosy blush cheeks, and waving hand animation.
   - Interactive dialogue bubble: click the chibi to switch moods, thoughts, and cute quotes!

4. **Interactive Systems Labs**:
   - **Volt (Memory & Allocators)**: Real-time visual arena block allocator simulator (Linear vs Pool allocator with 0 heap calls!).
   - **Pixel (3D CPU Software Rasterizer)**: Interactive 3D spinning wireframe & shaded polygon renderer on canvas, projected with hand-written linear algebra matrices.
   - **QuartzDB (Storage Engine)**: Interactive SQL terminal runner and 4KB slotted-page B+ Tree benchmark inspector.
   - **MNU-OS (Linux Container Runtime)**: Interactive Linux namespaces and cgroups v2 memory limit simulator.

5. **Interactive Sticker Drawer**:
   - Peel-and-stick shelf: click stickers (bunny, cat, bear, sakura, sparkles, floppy disk, coffee, heart) to stamp them anywhere on the notebook page!
   - Drag, rotate, or peel stickers off anytime.

6. **Lo-Fi Desk Radio**:
   - Built-in Web Audio API chiptune / lo-fi synthesizer that plays cozy melodic pentatonic chords with a toggleable paper cassette player.

7. **Spiral Pad Contact Form**:
   - Tear-away notepad insert with spiral coils, ruled loose-leaf lines, handwritten fields, and a dog-eared bottom corner with a cute face `( ◠‿◠ )`.
   - Fires celebration confetti upon submission!

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🌐 Deploy to Vercel

This project is built and optimized for instant, zero-configuration deployment to **Vercel**.

### Option A: Deploy via GitHub (Recommended)

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: retro kawaii sketchbook portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Vercel will automatically detect **Vite** with:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**! Your cute sketchbook portfolio will be live in seconds.

### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```
Follow the CLI prompts to deploy directly from your terminal!
