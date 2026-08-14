import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  HeroStat,
  LanguageItem,
  ProjectItem,
  SkillCategory,
  SocialLink,
} from "./types";

export const heroStats: HeroStat[] = [
  { value: "4+", label: "años de liderazgo de equipos" },
  { value: "2", label: "plataformas en producción" },
  { value: "100%", label: "uptime operativo" },
  { value: "10", label: "certificaciones" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/TU_USUARIO", // TODO: reemplazar por el usuario de GitHub real
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/marco-lagunes",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:marcolagunes.dev@proton.me",
    icon: "mail",
  },
  {
    label: "Teléfono",
    href: "tel:+522201064656",
    icon: "phone",
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Desarrollador Full-Stack (Servicio Social)",
    organization: "ASOMMMN (Asociación de Oficiales de la Marina Mercante Nacional)",
    location: "Veracruz, México",
    period: "Jun. 2026 – Presente",
    bullets: [
      "Arquitecté y construí desde cero una plataforma web full-stack (frontend, backend, REST API y base de datos) que digitaliza el proceso de evaluación de CVs de la institución, eliminando un flujo completamente manual.",
      "Implementé autenticación JWT y control de acceso por roles con manejo seguro de sesiones.",
      "Construí la lógica de negocio para gestionar usuarios, currículums y evaluaciones, con interfaz responsiva enfocada en reducir tiempo de revisión.",
    ],
  },
  {
    role: "Líder de Experiencia al Cliente",
    organization: "McDonald's (ADMX S.A. de C.V. / Arcos Dorados)",
    location: "Veracruz",
    period: "Jun. 2026 – Presente",
    bullets: [
      "Dirección del departamento de Experiencia al Cliente en paralelo a funciones de Gerente de Turno, con responsabilidad sobre ventas, publicidad local e iniciativas de cara al cliente.",
      "Seguimiento de KPIs traducidos en metas claras para el equipo.",
    ],
  },
  {
    role: "Gerente de Turno",
    organization: "McDonald's",
    location: "Veracruz",
    period: "May. 2025 – Presente",
    bullets: [
      "Coordinación de personal en plantilla de 50 personas en tres turnos.",
      "Recorrió 4 puestos en menos de 3 años (Crew Member → Entrenador → Gerente de Área → Gerente de Turno).",
      "Decisiones operativas en tiempo real en horas de alta demanda.",
    ],
  },
  {
    role: "Gerente de Área",
    organization: "McDonald's",
    location: "Veracruz",
    period: "Nov. 2024 – Abr. 2025",
    bullets: ["Supervisión de operación diaria y desempeño del personal."],
  },
  {
    role: "Auxiliar de Sistemas Computacionales",
    organization: "Ultra Ingeniería S.A. de C.V.",
    location: "Veracruz",
    period: "Ago. 2024 – Jul. 2025 (Prácticas Profesionales)",
    bullets: [
      "Diseño e implementación de aplicación web/móvil en nube privada, eliminando dependencia de servidor local.",
      "Migración de datos de infraestructura local vulnerable a nube privada, 100% disponibilidad en horario laboral.",
      "Configuración de infraestructura de red y controles de ciberseguridad.",
    ],
  },
  {
    role: "Entrenador / Subcoach",
    organization: "McDonald's",
    location: "Veracruz",
    period: "Nov. 2023 – Nov. 2024",
    bullets: ["Capacitación de nuevos integrantes, reduciendo curva de aprendizaje."],
  },
  {
    role: "Crew Member",
    organization: "McDonald's",
    location: "Veracruz",
    period: "Nov. 2022 – Nov. 2023",
    bullets: ["Inicio en nivel de entrada, base para 4 ascensos consecutivos."],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Plataforma de Evaluación de CVs",
    subtitle: "ASOMMMN",
    period: "Jun. 2026 – Presente",
    description:
      "Plataforma full-stack construida para una asociación nacional de oficiales de marina mercante, para digitalizar su proceso de evaluación de CVs, con autenticación JWT, control de acceso por roles y backend con REST API.",
    stack: ["React", "Node.js", "MongoDB", "JWT", "REST API"],
    href: "https://reclutamiento-asommmn.netlify.app/",
    status: "En producción",
    mockUrl: "reclutamiento-asommmn.netlify.app",
    gallery: [
      {
        type: "video",
        src: "/images/asommmn/Login%20asommmn.mp4",
        alt: "Demostración del flujo de inicio de sesión de la plataforma ASOMMMN",
      },
      {
        type: "image",
        src: "/images/asommmn/Interfaz%20admin.png",
        alt: "Panel de administración de la plataforma de evaluación de CVs",
      },
      {
        type: "image",
        src: "/images/asommmn/Interfaz%20postulante.png",
        alt: "Vista del postulante en la plataforma de evaluación de CVs",
      },
      {
        type: "image",
        src: "/images/asommmn/Panel%20de%20documentos%20y%20asistente%20IA.png",
        alt: "Panel de documentos con asistente de IA para revisión de CVs",
      },
    ],
  },
  {
    title: "Plataforma Web Full-Stack con Autenticación",
    subtitle: "Proyecto personal · ultranube.com.mx",
    period: "Mar. 2025 – Presente",
    description:
      "Aplicación cliente-servidor con autenticación JWT, REST APIs y base de datos MongoDB. Desplegada en la nube con seguridad integrada de principio a fin, accesible desde web y móvil.",
    stack: ["React", "Node.js", "MongoDB", "JWT", "Cloud"],
    href: "https://ultranube.com.mx/",
    status: "Proyecto personal",
    mockUrl: "ultranube.com.mx",
    gallery: [
      {
        type: "image",
        src: "/images/ultranube/Dasboard.png",
        alt: "Panel principal del dashboard de UltraNube con métricas de uso",
      },
      {
        type: "image",
        src: "/images/ultranube/Interfaz.png",
        alt: "Interfaz de usuario principal de la plataforma UltraNube",
      },
      {
        type: "image",
        src: "/images/ultranube/agente%20de%20presentaciones.png",
        alt: "Agente de IA para generación de presentaciones dentro de UltraNube",
      },
      {
        type: "image",
        src: "/images/ultranube/agente%20traductor.png",
        alt: "Agente de IA traductor integrado en UltraNube",
      },
    ],
  },
  {
    title: "MKDevSoft — Plataforma de Negocio",
    subtitle: "Emprendimiento propio · mkdevsoft.netlify.app",
    period: "2025 – Presente",
    description:
      "Sitio institucional y de captación de clientes para mi propia iniciativa de desarrollo de software, dirigida a pequeñas y medianas empresas de la región de Veracruz/Boca del Río. Incluye showcase de plantillas, servicios y formulario de contacto.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    href: "https://mkdevsoft.netlify.app/",
    status: "Proyecto personal",
    mockUrl: "mkdevsoft.netlify.app",
    gallery: [
      {
        type: "video",
        src: "/images/mkdevsoft/videomkdevsoft.mp4",
        alt: "Recorrido en video del sitio de MKDevSoft",
      },
    ],
  },
];

export const certifications: CertificationItem[] = [
  { name: "CCST Cybersecurity", issuer: "Cisco", date: "Feb. 2026", note: "Vigente 5 años" },
  { name: "Cyber Threat Management", issuer: "Cisco", date: "Feb. 2026" },
  { name: "Network Defense", issuer: "Cisco", date: "Feb. 2026" },
  { name: "Endpoint Security", issuer: "Cisco", date: "Nov. 2025" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco", date: "Oct. 2025" },
  { name: "Networking Devices & Config. Inicial", issuer: "Cisco", date: "Nov. 2024" },
  { name: "Cisco Packet Tracer (módulos de Redes e IoT)", issuer: "Cisco", date: "Ago. 2024" },
  { name: "Networking Basics", issuer: "Cisco", date: "Abr. 2024" },
  { name: "Introduction to IoT", issuer: "Cisco", date: "Nov. 2022" },
  { name: "Ciberseguridad y Hacking", issuer: "Universidad Cristóbal Colón", date: "2023" },
];

export const education: EducationItem[] = [
  {
    degree: "Lic. en Ingeniería en Sistemas Computacionales",
    institution: "Universidad Cristóbal Colón",
    period: "2022 – 2026 (Carrera concluida en 2026)",
  },
];

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "code",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    icon: "server",
    skills: ["Node.js", "NestJS", "REST APIs", "JSON", "MongoDB", "JWT"],
  },
  {
    category: "Ciberseguridad",
    icon: "shield",
    skills: ["Redes", "Seguridad IoT", "Control de accesos", "Seguridad Web"],
  },
  {
    category: "Herramientas",
    icon: "wrench",
    skills: ["Git", "GitHub", "Notion", "MS Office"],
  },
];

export const strengths: string[] = [
  "Liderazgo bajo presión",
  "Aprendizaje rápido / autodidacta",
  "Trabajo multidisciplinario",
  "Responsabilidad y compromiso",
  "Resolución de conflictos",
  "Comunicación clara",
];

export const languages: LanguageItem[] = [
  { name: "Español", level: "Nativo", proficiency: 100 },
  { name: "Inglés", level: "Intermedio", proficiency: 60 },
];

export const interests: string[] = [
  "Desarrollo de Software",
  "Ciberseguridad Aplicada",
  "Arquitecturas Cloud",
  "DevSecOps",
];
