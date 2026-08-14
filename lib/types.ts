export interface HeroStat {
  value: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "phone";
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface GalleryImageItem {
  type: "image";
  src: string;
  alt: string;
}

export interface GalleryVideoItem {
  type: "video";
  src: string;
  alt: string;
  poster?: string;
}

export type GalleryItem = GalleryImageItem | GalleryVideoItem;

export interface ProjectItem {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  stack: string[];
  href?: string;
  status?: "En producción" | "Proyecto personal" | "Académico";
  mockUrl?: string;
  gallery?: GalleryItem[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  note?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface SkillCategory {
  category: string;
  icon: "code" | "server" | "shield" | "wrench";
  skills: string[];
}

export interface LanguageItem {
  name: string;
  level: string;
  proficiency: number;
}
