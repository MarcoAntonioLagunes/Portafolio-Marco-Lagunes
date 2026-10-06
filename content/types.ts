/**
 * Esquema de la fuente única de contenido. Cada idioma (profile.es.ts / profile.en.ts) implementa `Profile`.
 * Convención: un dato real pendiente se escribe como "[COMPLETAR: ...]" y se lista en TODO.md.
 */

export type Locale = "es" | "en";

export interface NavLink {
  label: string;
  /** Ancla dentro del home, p. ej. "#proyectos". */
  href: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "phone" | "whatsapp";
  /** Nombre del evento de analytics al hacer clic. */
  event?: string;
}

export interface TerminalLine {
  cmd: string;
  resp: string;
}

export interface ExperienceStep {
  role: string;
  period: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
  /** Progresión interna (p. ej. ascensos dentro de la misma empresa). */
  timeline?: ExperienceStep[];
  timelineLabel?: string;
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

export type ProjectStatus = "production" | "personal" | "academic";

export interface ArchitectureNode {
  id: string;
  label: string;
  detail?: string;
}

export interface ArchitectureDiagram {
  /** Capas de izquierda a derecha (o arriba→abajo en mobile). */
  layers: { title: string; nodes: ArchitectureNode[] }[];
  /** Conexiones entre nodos; la etiqueta describe el protocolo o dato. */
  edges: { from: string; to: string; label?: string }[];
  caption: string;
}

export interface CaseStudy {
  problem: string[];
  role: string[];
  architecture: ArchitectureDiagram;
  decisions: { title: string; body: string }[];
  security: string[];
  impact: string[];
}

export interface ProjectItem {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  summary: string;
  status: ProjectStatus;
  stack: string[];
  /** URL pública. Se omite si el sitio no responde (ver TODO.md). */
  demoUrl?: string;
  /** Solo si el repo es público. */
  repoUrl?: string;
  /** URL que se muestra en la barra del navegador simulado. */
  mockUrl?: string;
  gallery: GalleryItem[];
  caseStudy: CaseStudy;
}

/** Tarjeta "en construcción" para el próximo proyecto de datos. Si no se define, no se muestra. */
export interface UpcomingProject {
  title: string;
  summary: string;
  stack: string[];
  eta?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: "in-progress" | "completed";
  /** Etiqueta visible, p. ej. "En curso". */
  badge?: string;
  note?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  note?: string;
}

export interface SkillCategory {
  category: string;
  icon: "code" | "server" | "shield" | "wrench" | "data";
  skills: string[];
}

export interface LanguageItem {
  name: string;
  level: string;
  proficiency: number;
}

export interface Profile {
  locale: Locale;
  /** Etiqueta del idioma en su propio idioma ("Español" / "English"). */
  localeName: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogLocale: string;
  };
  person: {
    name: string;
    jobTitle: string;
    location: string;
    email: string;
    phone: string;
    /** Solo dígitos con código de país, para wa.me. */
    whatsapp: string;
  };
  cv: {
    href: string;
    /** Nombre del archivo al descargar. */
    fileName: string;
    /** false = el PDF de este idioma aún no existe; el botón muestra un aviso. */
    available: boolean;
  };
  nav: NavLink[];
  hero: {
    badge: string;
    subtitle: string;
    headline: string;
    summary: string;
    ctas: { projects: string; cv: string; contact: string };
    terminal: TerminalLine[];
    terminalTitle: string;
    avatarAlt: string;
    scrollCue: string;
  };
  metrics: Metric[];
  socials: SocialLink[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  upcomingProject?: UpcomingProject;
  education: EducationItem[];
  certifications: {
    featured: CertificationItem[];
    others: CertificationItem[];
  };
  stack: SkillCategory[];
  strengths: string[];
  languages: LanguageItem[];
  interests: string[];
  now: {
    building: string[];
    learning: string[];
  };
  /** Textos de interfaz (títulos de sección, botones, formulario, etc.). */
  ui: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    goHome: string;
    switchLanguage: string;
    sections: Record<
      "experience" | "projects" | "education" | "certifications" | "stack" | "strengths" | "now" | "contact",
      { eyebrow: string; title: string }
    >;
    projects: {
      status: Record<ProjectStatus, string>;
      caseStudy: string;
      visit: string;
      repo: string;
      upcomingBadge: string;
      upcomingEta: string;
      galleryLabel: string;
      prevSlide: string;
      nextSlide: string;
      goToSlide: string;
      opensInNewTab: string;
    };
    caseStudy: {
      back: string;
      problem: string;
      role: string;
      architecture: string;
      decisions: string;
      security: string;
      impact: string;
      stack: string;
      gallery: string;
      links: string;
      nextProject: string;
      period: string;
    };
    certifications: { showAll: string; showLess: string; more: string };
    strengths: { strengths: string; languages: string; interests: string };
    now: {
      building: string;
      learning: string;
      repos: string;
      reposEmpty: string;
      updated: string;
      viewProfile: string;
    };
    contact: {
      intro: string;
      name: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
      errors: { name: string; email: string; messageShort: string; messageLong: string };
      honeypot: string;
      call: string;
      cvUnavailable: string;
    };
    footer: { role: string; rights: string };
    stackMarqueeLabel: string;
  };
}
