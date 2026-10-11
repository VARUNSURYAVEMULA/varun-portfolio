export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  tags: string[];
  image: string;
  video?: string;
  externalLink?: string;
  description?: string;
  span: 5 | 7;
  link?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  url?: string;
  summary?: string;
  fullContent?: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  rotation: number;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}
