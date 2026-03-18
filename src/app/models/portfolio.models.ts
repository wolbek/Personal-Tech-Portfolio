export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  subProjects?: SubProject[];
  bullets?: string[];
  tags: string[];
}

export interface SubProject {
  name: string;
  link?: string;
  bullets: string[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  links: ProjectLink[];
  badge?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  metric?: string;
  icon: string;
}

export interface Education {
  id: string;
  level: string;
  degree: string;
  institution: string;
  university?: string;
  gpa?: string;
  percentage?: string;
  period: string;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  link?: string;
  preview?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  socialLinks: SocialLink[];
  stats: Stat[];
}

export interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

export interface NavItem {
  label: string;
  sectionId: string;
}
