/**
 * CV Data Types
 * TypeScript interfaces for CV data structure
 */

export interface CvProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  subtitle: string;
  birthDate: string;
  email: string;
  phone: string;
  location: {
    city: string;
    postalCode: string;
    country: string;
    address: string;
  };
  summary: string;
  tagline: string;
  availability: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
  languages: Language[];
  driving: {
    license: string;
    vehicle: boolean;
  };
}

export interface Language {
  name: string;
  level: string;
  code: string;
}

export interface Experience {
  id: string;
  company: string;
  companyUrl: string | null;
  via: string | null;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  duration: string;
  type: string;
  description: string;
  achievements?: string[];
  responsibilities?: string[];
  technologies: string[];
  tags?: string[];
}

export interface Education {
  id: string;
  degree: string;
  level: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
  courses: string[];
  grade: string | null;
}

export interface Skill {
  name: string;
  level: string;
  years: number;
  category: string;
  rating: number;
}

export interface SkillCategory {
  backend: Skill[];
  frontend: Skill[];
  devops: Skill[];
  cloud: Skill[];
  testing: Skill[];
  tools: Skill[];
  methodologies: Skill[];
}

export interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string | null;
  description: string;
  role: string;
  team: string;
  achievements: string[];
  challenges: string[];
  technologies: string[];
  metrics: Record<string, string | number>;
  links: {
    github: string | null;
    demo: string | null;
    documentation?: string | null;
    inspiration?: string | null;
  };
  images: string[];
  featured: boolean;
  tags: string[];
}

export interface Hobby {
  name: string;
  category: string;
  icon: string;
}

export interface SoftSkill {
  name: string;
  level: number;
  description: string;
}

export interface CvMeta {
  version: string;
  lastUpdated: string;
  source: string;
  totalExperience: {
    industry: number;
    development: number;
    total: number;
  };
}

export interface CvData {
  profile: CvProfile;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory;
  projects: Project[];
  certifications: unknown[];
  hobbies: Hobby[];
  softSkills: SoftSkill[];
  meta: CvMeta;
}

/**
 * Language options for CV export
 */
export type CvLanguage = 'fr' | 'en';

/**
 * CV export options
 */
export interface CvExportOptions {
  language: CvLanguage;
  filename?: string;
}
