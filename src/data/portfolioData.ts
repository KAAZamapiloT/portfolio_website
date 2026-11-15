import { Project, SkillCategory, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: "Uday Singh",
  roleTitle: "Game Engine & Systems Programmer | C++ Developer",
  location: "Sri Muktsar Sahib, Punjab, India",
  institution: "IIIT Vadodara (2023 – 2027)",
  cpi: "7.56",
  email: "dev352418@gmail.com",
  github: "https://github.com/KAAZamapiloT",
  linkedin: "https://www.linkedin.com/in/uday-singh-5b5a3828b/",
  bio: "C++ developer focused on game engine architecture, Unreal Engine 5 gameplay & AI systems, CPU software rasterization, and performance-critical systems. Passionate about building modular engines, deriving 3D math pipelines from scratch, and eliminating unnecessary abstractions.",
  shortBio: "game engine & systems programmer crafting engines, gameplay AI, and low-latency C++ software",
  statusBadge: "available for 2026/2027 game development & systems engineering roles",
};

export const PRIMARY_RESUME = {
  name: "Resume (Primary)",
  file: "/RESUME_Q-1.pdf",
  tag: "PRIMARY",
};

export const ALTERNATIVE_RESUMES = [
  { name: "Game Dev Resume", file: "/UdaySingh_ResumeGameDev.pdf", tag: "GAME DEV" },
  { name: "Systems Resume", file: "/RESUME_cont.pdf", tag: "SYSTEMS" },
];

export const RESUMES = [
  PRIMARY_RESUME,
  ...ALTERNATIVE_RESUMES,
];

export const PROJECTS: Project[] = [
  {
    id: "polar-bear",
    title: "POLAR BEAR",
    category: "game development & ai",
    badgeNum: "01",
    cardClass: "card--mint",
    shortDesc: "first-person horror game in Unreal Engine 5 with C++ gameplay systems and Behavior Tree enemy AI.",
    longDesc: "developed a first-person horror game in Unreal Engine 5 with C++ gameplay systems for health/damage, inventory, key-based interactions, puzzles, hiding, and combat. Implemented enemy AI using Behavior Tree tasks, navigation queries, patrol/wandering behavior, player tracking, chase, and attack states.",
    techStack: ["C++", "Unreal Engine 5", "Behavior Trees", "Navigation Queries", "Gameplay Systems", "AI State Machine"],
    features: [
      "C++ gameplay systems for health, damage, inventory, key-based puzzle interactions, and hiding",
      "Enemy AI designed with Behavior Tree tasks, navigation queries, and patrol/wandering behavior",
      "Dynamic player tracking, chase state transitions, and attack routines",
      "Modular actor architecture and physics-driven environmental interaction"
    ],
    benchmark: "Behavior Tree AI • Full Gameplay Loop in C++ & UE5",
    githubUrl: "https://github.com/KAAZamapiloT/POLAR_BEAR",
    demoType: "polarbear"
  },
  {
    id: "project-canvas",
    title: "Project Canvas",
    category: "game engine & generative ai",
    badgeNum: "02",
    cardClass: "card--yellow",
    shortDesc: "dual-pipeline UE5 system enabling LLM-driven scene generation, converting natural language into structured JSON executed live into lighting, fog, and actor spawning.",
    longDesc: "built a dual-pipeline UE5 system enabling LLM-driven scene generation, converting natural language into structured JSON executed live into lighting, fog, and actor spawning. Designed a 5-tier asset resolver and 11-tier location query engine in UE5 to map natural-language scene requests to hundreds of inconsistently named assets within tight LLM context limits.",
    techStack: ["C++", "Unreal Engine 5", "Groq API", "JSON Schema", "5-Tier Asset Resolver", "Location Engine"],
    features: [
      "Natural-language prompt ➔ strict JSON scene plan ➔ live lighting, fog, and actor spawning in UE5",
      "5-tier asset resolver (exact, substring, keyword, fuzzy Levenshtein, fallback) for inconsistently named assets",
      "11-tier location query engine mapping spatial descriptions onto 3D world coordinates",
      "USceneBuilder actor manipulation with tight LLM context optimization"
    ],
    benchmark: "Sub-200ms Groq LLM inference • 5-tier fuzzy asset resolver",
    githubUrl: "https://github.com/KAAZamapiloT/Project-CANVAS",
    demoType: "canvas"
  },
  {
    id: "knight-engine",
    title: "KnightEngine",
    category: "game engine architecture",
    badgeNum: "03",
    cardClass: "card--sky",
    shortDesc: "modular C++ game engine with reusable rendering, input, entity, resource, and engine-loop subsystems.",
    longDesc: "building a custom C++ game engine with modular windowing, logging, and rendering abstraction layers, using the project to establish reusable engine foundations instead of one-off demo code. Designed engine-level abstractions for rendering, game-loop execution, resource management, and component-based game objects.",
    techStack: ["C++", "SDL3", "Engine Architecture", "Entity-Component System", "Game Loop", "Resource Manager"],
    features: [
      "Modular windowing, logging, input, and rendering abstraction layers in modern C++",
      "Fixed-timestep game loop separating simulation ticks from rendering presentation",
      "Entity-Component System (ECS) architecture for extensible game object composition",
      "Reusable engine foundations designed for production scaling"
    ],
    benchmark: "Fixed 60 FPS Timestep • Modular C++ Subsystems",
    githubUrl: "https://github.com/KAAZamapiloT/KnightEngine",
    demoType: "engine"
  },
  {
    id: "pixel",
    title: "Pixel",
    category: "graphics & software rendering",
    badgeNum: "04",
    cardClass: "card--pink",
    shortDesc: "CPU-only rasterization pipeline from first principles in C++ with hand-written linear algebra and zero graphics API dependency.",
    longDesc: "built a CPU-only rasterization pipeline from first principles in C++ — projection, transformation, and triangle rasterization implemented with hand-written linear algebra and zero graphics API dependency. Engineered a free 6-DOF camera system with projection math derived and coded from scratch, rendering primitives (triangles, cubes, spheres) with correct perspective transformation and Z-buffering.",
    techStack: ["C++", "SDL3", "3D Mathematics", "Linear Algebra", "Software Rasterizer", "Z-Buffering"],
    features: [
      "Full graphics pipeline: world → view → clip → NDC → screen-space transformation",
      "Free 6-DOF orbital camera with custom matrix math derived and coded from scratch",
      "Depth buffer (Z-buffering) for correct primitive visibility and pipeline ordering",
      "Zero hardware graphics API dependency: SDL3 only presents the final framebuffer"
    ],
    benchmark: "100% CPU Rasterization • Hand-Written Linear Algebra",
    githubUrl: "https://github.com/KAAZamapiloT/Pixel",
    demoType: "rasterizer"
  },
  {
    id: "volt",
    title: "Volt",
    category: "systems & memory management",
    badgeNum: "05",
    cardClass: "card--lavender",
    shortDesc: "dependency-free C++ systems library featuring custom Linear and Pool allocators, lock-free queues, and concurrent thread pool.",
    longDesc: "building a dependency-free C++ systems library for performance-critical execution, covering memory management, cache-conscious containers, and concurrent task execution. Implemented Linear/Pool allocators, SmallVector, Ring Buffers, SPSC lock-free queues, Asymmetric Map, and ThreadPool with explicit memory and concurrency control.",
    techStack: ["C++", "Custom Allocators", "SPSC Lock-Free", "Ring Buffers", "ThreadPool", "Zero Dependencies"],
    features: [
      "Linear and Pool allocators for deterministic allocation and object lifetimes",
      "Eliminates general-purpose heap allocations in hot paths",
      "Single-Producer Single-Consumer (SPSC) lock-free queue with atomic memory fences",
      "Concurrent ThreadPool as low-overhead scheduling foundation"
    ],
    benchmark: "0 heap calls in hot paths • Lock-Free SPSC Queues",
    githubUrl: "https://github.com/KAAZamapiloT/Volt",
    demoType: "allocator"
  },
  {
    id: "mnu-os",
    title: "MNU-OS",
    category: "operating systems & kernel",
    badgeNum: "06",
    cardClass: "card--mint",
    shortDesc: "lightweight Linux container runtime using namespaces and cgroups v2 directly without Docker.",
    longDesc: "built a lightweight Linux container runtime using namespaces and cgroups v2 directly, without Docker or another container runtime underneath. Implemented a JSON-driven CLI for container lifecycle management with configurable CPU, memory, and process limits.",
    techStack: ["C++", "Linux Kernel Primitives", "Namespaces", "cgroups v2", "Process Isolation", "CLI"],
    features: [
      "Pure Linux kernel primitives: namespaces and cgroups v2 for process and resource isolation",
      "Zero Docker or existing container runtime dependencies",
      "Enforces physical memory limits, CPU shares, and PID subtree boundaries",
      "JSON-driven CLI for container configuration and lifecycle execution"
    ],
    benchmark: "Raw Linux Kernel Primitives • Sub-millisecond spinup",
    githubUrl: "https://github.com/KAAZamapiloT/MNU-OS",
    demoType: "container"
  },
  {
    id: "quartzdb",
    title: "QuartzDB",
    category: "storage & database internals",
    badgeNum: "07",
    cardClass: "card--yellow",
    shortDesc: "embedded storage engine in C++ using a 4KB slotted-page format and on-disk B+ Tree indexing across 120,000+ records.",
    longDesc: "built an embedded storage engine in C++ using a 4KB slotted-page format and custom pager for durable on-disk record persistence. Implemented an on-disk B+ Tree index for O(log n) primary-key lookups, benchmarked across 120,000+ records with sub-millisecond query latency, and a handwritten SQL lexer/parser/query engine.",
    techStack: ["C++", "CMake", "B+ Tree Indexing", "Slotted-Page Storage", "Custom Pager", "SQL Engine"],
    features: [
      "Durable on-disk record persistence with 4KB slotted-page format and custom pager",
      "On-disk B+ Tree index with sub-millisecond query latency across 120,000+ records",
      "Handwritten SQL lexer, parser, and query engine with interactive terminal shell",
      "Zero third-party database dependencies"
    ],
    benchmark: "120,000+ records indexed • Sub-millisecond B+ Tree lookups",
    githubUrl: "https://github.com/KAAZamapiloT/QuartzDB",
    demoType: "sql"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "💻",
    badgeColor: "#FFE98A",
    skills: [
      { name: "C++", level: 5, note: "game engine architecture, systems programming, memory management, algorithms, templates", isKey: true },
      { name: "C", level: 5, note: "pointers, memory layout, system calls, low-level data structures", isKey: true },
    ]
  },
  {
    title: "Game Development & Engines",
    icon: "🎮",
    badgeColor: "#9FE8CF",
    skills: [
      { name: "Unreal Engine 5", level: 5, note: "C++ gameplay systems, actor lifecycles, player interaction, asset management", isKey: true },
      { name: "Behavior Trees & AI", level: 5, note: "AI state machines, navigation queries, patrol/wandering, player tracking, chase & attack", isKey: true },
      { name: "Gameplay Systems", level: 5, note: "health/damage, inventory, key-based puzzle interactions, hiding mechanics, combat", isKey: true },
      { name: "SDL3", level: 5, note: "modular windowing, event handling, input abstraction, frame pacing", isKey: true },
    ]
  },
  {
    title: "Graphics & Rendering Pipelines",
    icon: "🎨",
    badgeColor: "#9FD8FF",
    skills: [
      { name: "CPU Software Rasterization", level: 5, note: "built pure CPU rasterizer from mathematical first principles with zero graphics API", isKey: true },
      { name: "3D Mathematics & Linear Algebra", level: 5, note: "vectors, matrices, quaternions, camera transformations, perspective projections", isKey: true },
      { name: "Z-Buffering & Visibility", level: 5, note: "depth buffer, primitive ordering (world → view → clip → NDC → screen space)", isKey: true },
      { name: "Rendering Pipelines & Event Systems", level: 5, note: "fixed-timestep loops, render abstraction layers, modular subsystems", isKey: true },
    ]
  },
  {
    title: "Systems & Low-Latency Architecture",
    icon: "⚡",
    badgeColor: "#BFA8FF",
    skills: [
      { name: "Custom Allocators", level: 5, note: "Linear and Pool allocators for deterministic memory control and zero heap calls in hot paths", isKey: true },
      { name: "Lock-Free Primitives", level: 5, note: "Single-Producer Single-Consumer (SPSC) queues, compile-time ring buffers, atomic fences", isKey: true },
      { name: "Concurrency & ThreadPool", level: 5, note: "concurrent task scheduling, worker threads, thread synchronization", isKey: true },
      { name: "Linux Kernel Primitives", level: 5, note: "namespaces, cgroups v2 resource isolation, virtual memory", isKey: true },
    ]
  },
  {
    title: "Core CS & Engineering Tools",
    icon: "🛠️",
    badgeColor: "#FF8FC1",
    skills: [
      { name: "Data Structures & Algorithms", level: 5, note: "trees, B+ trees, graphs, heaps, cache-conscious data layouts", isKey: true },
      { name: "Operating Systems", level: 5, note: "process isolation, page storage, virtual memory, memory hierarchies", isKey: true },
      { name: "Development Tools", level: 5, note: "Git, GitHub, Visual Studio, VS Code, CMake", isKey: true },
    ]
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "iiitv-research",
    title: "Research Intern",
    organization: "Indian Institute of Information Technology Vadodara",
    period: "May 2026 – August 2026",
    location: "Remote",
    type: "Research & Systems",
    color: "var(--mint)",
    icon: "🔬",
    bulletPoints: [
      "Research intern studying skill-composition strategies for autonomous multi-agent systems, focusing on how reusable skills can be composed into fault-isolated execution graphs.",
      "Designed a microkernel-style orchestration layer for autonomous multi-agent systems, modeling skills as DAG-executed components to isolate failures and decouple planning, execution, and recovery paths."
    ]
  },
  {
    id: "robotics-sec",
    title: "Secretary",
    organization: "9-Bit Robotics Club • IIIT Vadodara",
    period: "August 2025 – May 2026",
    location: "Gandhinagar, India",
    type: "Leadership & Management",
    color: "var(--yellow)",
    icon: "🤖",
    bulletPoints: [
      "Organized Robo Soccer during Cerebro, coordinating 10 teams (40 participants).",
      "Coordinated with faculty for event approval and managed component procurement."
    ]
  },
  {
    id: "hackiiitv",
    title: "2nd Place Winner 🏆",
    organization: "HACKIIITV Hackathon",
    period: "Hackathon Event",
    location: "IIIT Vadodara",
    type: "Competition",
    color: "var(--pink)",
    icon: "⭐",
    bulletPoints: [
      "Secured 2nd Place in HACKIIITV, a hackathon conducted at IIIT Vadodara.",
      "Engineered an innovative technical solution under intense 36-hour hackathon constraints."
    ]
  },
  {
    id: "education",
    title: "B.Tech in Computer Science & Engineering",
    organization: "Indian Institute of Information Technology Vadodara",
    period: "Aug 2023 – May 2027",
    location: "Gandhinagar, Gujarat, India",
    type: "Education",
    color: "var(--sky)",
    icon: "🎓",
    bulletPoints: [
      "CPI: 7.56",
      "Core coursework in Operating Systems, Database Internals, Data Structures & Algorithms, Object-Oriented Programming, and Computer Networks."
    ]
  }
];
