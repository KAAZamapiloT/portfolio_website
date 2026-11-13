import { Project, SkillCategory, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: "Uday Singh",
  nickname: "yuki",
  roleTitle: "Software Engineer | C/C++ Systems & Low-Latency Performance",
  location: "Gandhinagar, Gujarat, India",
  institution: "IIIT Vadodara (2023 - 2027)",
  cpi: "7.56",
  email: "dev352418@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  bio: "hey there! i'm a systems engineer obsessed with raw performance, low-latency architectures, and building everything from scratch. from custom memory allocators and b+ tree storage engines to cpu software 3d rasterizers and linux container runtimes.",
  shortBio: "crafting high-performance systems from first principles with a playful sketchbook heart ✎ ⋆ ✿",
  statusBadge: "available for 2026/2027 roles & systems research ♡",
};

export const PROJECTS: Project[] = [
  {
    id: "volt",
    title: "volt",
    category: "systems & memory",
    bgColor: "#F9EFE4", // peach
    accentColor: "#E27B7B",
    stampText: "C++ ALLOC",
    stampIcon: "⚡",
    shortDesc: "header-only C++ systems library with custom linear & pool allocators, lock-free queues, and concurrent thread pool.",
    longDesc: "a dependency-free, header-only C++ systems library featuring custom Linear and Pool allocators for deterministic control over allocation and object lifetime, eliminating general-purpose heap allocation in hot paths.",
    techStack: ["C++20", "Custom Allocators", "Lock-Free SPSC", "Ring Buffers", "ThreadPool", "Cache-Conscious Map"],
    features: [
      "Custom Linear & Pool allocators eliminating malloc/new in critical inner loops",
      "SmallVector & compile-time ring buffer primitives for zero cache misses",
      "Single-Producer Single-Consumer (SPSC) lock-free queue with atomic memory fences",
      "Concurrent ThreadPool job system as the low-overhead foundation for parallel execution"
    ],
    benchmark: "0 heap allocations in hot paths • Lock-Free SPSC Queues",
    githubUrl: "https://github.com",
    demoType: "allocator"
  },
  {
    id: "quartzdb",
    title: "quartzDB",
    category: "storage & database",
    bgColor: "#FCEBEB", // blush pink
    accentColor: "#B86B77",
    stampText: "SQL ENGINE",
    stampIcon: "💎",
    shortDesc: "embedded C++ storage engine featuring 4KB slotted-page storage and on-disk B+ Tree indexing across 120,000+ records.",
    longDesc: "built an embedded storage engine in C++ from scratch using a 4KB slotted-page format, custom pager for durable on-disk persistence, and a hand-written SQL lexer, parser, and query engine supporting full CRUD operations through an interactive terminal.",
    techStack: ["C++17", "CMake", "B+ Tree Indexing", "Slotted-Page Storage", "SQL Lexer/Parser", "Custom Pager"],
    features: [
      "Durable on-disk record persistence with 4KB slotted-page architecture",
      "On-disk B+ Tree index with O(log n) lookups across 120,000+ records",
      "Sub-millisecond query latency measured on raw disk persistence benchmarks",
      "Hand-written recursive descent SQL lexer, AST parser, and CRUD execution engine"
    ],
    benchmark: "120,000+ records indexed • Sub-millisecond B+ Tree lookups",
    githubUrl: "https://github.com",
    demoType: "sql"
  },
  {
    id: "pixel",
    title: "pixel",
    category: "3d graphics & compute",
    bgColor: "#F1EBF5", // lavender
    accentColor: "#8E729E",
    stampText: "SDL3 3D",
    stampIcon: "🎨",
    shortDesc: "CPU software rasterizer from first principles with hand-written linear algebra, 6-DOF camera, and frustum culling.",
    longDesc: "built a pure CPU software 3D rasterizer from mathematical first principles with zero GPU graphics API (OpenGL, Vulkan, DirectX). SDL3 is only used to present the raw framebuffer array directly to the display window.",
    techStack: ["C++", "SDL3", "3D Math", "Linear Algebra", "Software Rasterizer", "Frustum Culling", "Z-Buffering"],
    features: [
      "Full graphics pipeline: World → View → Clip → NDC → Screen space projection",
      "6-DOF free-look orbital camera with custom matrix math & quaternions",
      "Precise Z-buffering, perspective-correct barycentric interpolation, and backface culling",
      "Object-level frustum culling cutting latency from 73.4ms to 32.6ms (2.25x speedup) on 216-entity scene"
    ],
    benchmark: "2.25x speedup (73.4ms → 32.6ms) • 100% CPU Rasterization",
    githubUrl: "https://github.com",
    demoType: "rasterizer"
  },
  {
    id: "mnu-os",
    title: "mnu-os",
    category: "linux kernel & runtime",
    bgColor: "#EEF3EB", // sage green
    accentColor: "#678A62",
    stampText: "KERNEL OS",
    stampIcon: "🐧",
    shortDesc: "lightweight container runtime built directly from raw Linux namespaces and cgroups v2 primitives with no Docker daemon.",
    longDesc: "built a container runtime from raw Linux primitives (namespaces, cgroups v2) for process and resource isolation, with no Docker or existing runtime underneath. Includes a JSON-driven CLI for container lifecycle with enforced memory and CPU limits.",
    techStack: ["C++", "Linux Kernel", "Namespaces", "cgroups v2", "Process Isolation", "JSON CLI"],
    features: [
      "Zero Docker dependency: pure clone(), pivot_root(), and mount() kernel system calls",
      "Strict hardware resource isolation using modern Linux cgroups v2 controllers",
      "Enforces physical memory caps, CPU share limits, and PID subtree boundaries",
      "JSON-driven container manifest engine and interactive lifecycle manager CLI"
    ],
    benchmark: "True kernel-level isolation • Sub-millisecond container spinup",
    githubUrl: "https://github.com",
    demoType: "container"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages & Dialects",
    icon: "✎",
    badgeColor: "#FCEBEB",
    skills: [
      { name: "C++ (17/20)", level: 5, note: "templates, custom allocators, systems programming, zero-overhead abstractions", isKey: true },
      { name: "Python", level: 4, note: "automation, scripting, data structures, research benchmarking", isKey: true },
      { name: "C", level: 5, note: "posix syscalls, pointers, memory layout, linux kernel interfaces" },
      { name: "Bash / Shell", level: 4, note: "linux automation, cli tooling, devops pipelines" },
      { name: "TypeScript / JS", level: 4, note: "creative web engineering, interactive tool visualizers" },
    ]
  },
  {
    title: "Systems & Low-Latency Spells",
    icon: "⚡",
    badgeColor: "#F9EFE4",
    skills: [
      { name: "Custom Allocators", level: 5, note: "Linear, Pool, Stack, Arena allocators without general heap malloc", isKey: true },
      { name: "Lock-Free Primitives", level: 5, note: "SPSC queues, ring buffers, memory fences, atomic CAS loops", isKey: true },
      { name: "Cache-Conscious Design", level: 5, note: "data-oriented architecture, false sharing avoidance, CPU cache lines" },
      { name: "Concurrency & ThreadPool", level: 5, note: "work-stealing queues, mutex/condition-variable synchronization", isKey: true },
    ]
  },
  {
    title: "Core CS, OS & Storage",
    icon: "📜",
    badgeColor: "#EEF3EB",
    skills: [
      { name: "OS & Kernel Primitives", level: 5, note: "Linux namespaces, cgroups v2, virtual memory, process isolation", isKey: true },
      { name: "Database Internals", level: 5, note: "B+ Tree on-disk indexing, slotted-page storage, custom pager, SQL engine", isKey: true },
      { name: "Data Structures & DSA", level: 5, note: "advanced trees, graphs, heaps, dynamic programming, algorithmic analysis" },
      { name: "Computer Networks", level: 4, note: "TCP/IP socket programming, non-blocking I/O, epoll" },
    ]
  },
  {
    title: "Graphics, Math & Compute",
    icon: "🎨",
    badgeColor: "#F1EBF5",
    skills: [
      { name: "3D Linear Algebra", level: 5, note: "vectors, matrices, 4x4 projections, quaternions, coordinate spaces", isKey: true },
      { name: "CPU Software Rasterizer", level: 5, note: "barycentric interpolation, Z-buffer, clip space, 6-DOF camera", isKey: true },
      { name: "SDL3 & Unreal Engine 5", level: 4, note: "framebuffer blitting, C++ game/simulation architecture" },
      { name: "Frustum Culling & Optimization", level: 5, note: "bounding spheres, AABB tests, 2.25x latency reduction" },
    ]
  },
  {
    title: "Tools & Developer Craft",
    icon: "🛠️",
    badgeColor: "#FAF5EB",
    skills: [
      { name: "Linux (WSL / Native)", level: 5, note: "daily driver environment, kernel tools, perf, htop, strace", isKey: true },
      { name: "Git & GitHub", level: 5, note: "branching models, CI/CD actions, release workflows" },
      { name: "CMake & Build Systems", level: 5, note: "multi-platform targets, compiler flags (-O3, -Wall, -Wextra), sanitizer builds" },
      { name: "VS Code & Visual Studio", level: 4, note: "debuggers, disassembly views, memory inspectors" },
    ]
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "iiitv-research",
    title: "Research Intern",
    organization: "Indian Institute of Information Technology Vadodara",
    period: "May 2026 – August 2026",
    location: "Remote / Gandhinagar",
    type: "Research & Systems",
    color: "#F9EFE4",
    icon: "🔬",
    bulletPoints: [
      "Studied skill-composition strategies for autonomous multi-agent systems, focusing on reusable skills and fault-isolated execution.",
      "Designed a microkernel-style orchestration layer modeling skills as DAG-executed components, separating planning, execution, and recovery paths."
    ]
  },
  {
    id: "robotics-sec",
    title: "Secretary",
    organization: "9-Bit Robotics Club • IIIT Vadodara",
    period: "August 2025 – May 2026",
    location: "Gandhinagar, India",
    type: "Leadership & Hardware",
    color: "#F1EBF5",
    icon: "🤖",
    bulletPoints: [
      "Organized Robo Soccer during Cerebro, coordinating 10 teams (40 participants) with hardware setups.",
      "Coordinated with university faculty for event approval and managed component procurement & budget allocations."
    ]
  },
  {
    id: "hackiiitv",
    title: "2nd Place Winner 🏆",
    organization: "HACKIIITV Hackathon",
    period: "Hackathon Event",
    location: "IIIT Vadodara",
    type: "Competition & Engineering",
    color: "#FCEBEB",
    icon: "⭐",
    bulletPoints: [
      "Secured 2nd place out of dozens of competing engineering teams at IIIT Vadodara's flagship hackathon.",
      "Rapidly designed and engineered an innovative technical project under intense 24-hour deadline pressure."
    ]
  },
  {
    id: "education",
    title: "B.Tech in Computer Science & Engineering",
    organization: "Indian Institute of Information Technology Vadodara",
    period: "Aug 2023 – May 2027",
    location: "Gandhinagar, Gujarat",
    type: "Academics",
    color: "#EEF3EB",
    icon: "🎓",
    bulletPoints: [
      "CPI: 7.56 • Core Coursework in Operating Systems, Database Internals, DSA, Systems Architecture, and Computer Networks.",
      "Active contributor to systems engineering, open-source projects, and technical peer mentorship."
    ]
  }
];

export const STICKER_LIBRARY = [
  { id: "bunny", name: "Cute Bunny", emoji: "🐰" },
  { id: "cat", name: "Chibi Cat", emoji: "🐱" },
  { id: "bear", name: "Little Bear", emoji: "🐻" },
  { id: "star", name: "Gold Sparkle", emoji: "⭐" },
  { id: "sparkle", name: "Magic Sparkle", emoji: "✨" },
  { id: "heart", name: "Sweet Heart", emoji: "💖" },
  { id: "cherry", name: "Cherries", emoji: "🍒" },
  { id: "coffee", name: "Warm Coffee", emoji: "☕" },
  { id: "flower", name: "Sakura Blossom", emoji: "🌸" },
  { id: "floppy", name: "Retro Disk", emoji: "💾" },
  { id: "pencil", name: "Sketch Pencil", emoji: "✎" },
  { id: "tape", name: "Washi Piece", emoji: "🩹" },
];
