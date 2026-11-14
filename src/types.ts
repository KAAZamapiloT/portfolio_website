export interface Project {
  id: string;
  title: string;
  category: string;
  badgeNum: string;
  cardClass: string;
  stampText?: string;
  stampIcon?: string;
  shortDesc: string;
  longDesc: string;
  techStack: string[];
  features: string[];
  benchmark?: string;
  githubUrl: string;
  demoType: 'polarbear' | 'canvas' | 'engine' | 'rasterizer' | 'allocator' | 'sql' | 'container';
}

export interface SkillCategory {
  title: string;
  icon: string;
  badgeColor: string;
  skills: {
    name: string;
    level: number; // 1-5 stars
    note: string;
    isKey?: boolean;
  }[];
}

export interface PlacedSticker {
  id: string;
  emoji: string;
  name: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  color: string;
  bulletPoints: string[];
  icon: string;
}
