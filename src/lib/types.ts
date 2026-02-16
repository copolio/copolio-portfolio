export type Locale = "ko" | "en";

export interface Profile {
  name: string;
  title: string;
  email: string;
  github?: string;
  linkedin?: string;
  website?: string;
  phone?: string;
  location: string;
  photo: string;
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}

export interface TechItem {
  name: string;
  level?: "expert" | "advanced" | "intermediate" | "beginner";
}

export interface Experience {
  slug: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  location?: string;
  website?: string;
  highlights: string[];
  techUsed: string[];
}

export interface Project {
  slug: string;
  title: string;
  company?: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
  techUsed: string[];
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
}

export interface ProjectDetail {
  role?: string;
  teamSize?: number;
  content: string;
}

export interface AggregatedTechData {
  categories: TechCategory[];
  techMap: Record<string, TechItem>;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface SectionContent<T> {
  ko: T;
  en: T;
}
