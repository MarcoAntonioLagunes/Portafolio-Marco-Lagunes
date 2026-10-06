import { CV_PATH, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { fullYearsSince, LEADERSHIP_SINCE } from "./derived";
import type { CertificationItem, Profile } from "./types";

const featuredCertifications: CertificationItem[] = [
  { name: "CCST Cybersecurity", issuer: "Cisco", date: "Feb. 2026", note: "Vigente 5 años" },
  { name: "Cyber Threat Management", issuer: "Cisco", date: "Feb. 2026" },
  { name: "Network Defense", issuer: "Cisco", date: "Feb. 2026" },
  { name: "Endpoint Security", issuer: "Cisco", date: "Nov. 2025" },
];

const otherCertifications: CertificationItem[] = [
  { name: "Introduction to Cybersecurity", issuer: "Cisco", date: "Oct. 2025" },
  { name: "Networking Devices & Config. Inicial", issuer: "Cisco", date: "Nov. 2024" },
  { name: "Cisco Packet Tracer (módulos de Redes e IoT)", issuer: "Cisco", date: "Ago. 2024" },
  { name: "Networking Basics", issuer: "Cisco", date: "Abr. 2024" },
  { name: "Introduction to IoT", issuer: "Cisco", date: "Nov. 2022" },
  { name: "Ciberseguridad y Hacking", issuer: "Universidad Cristóbal Colón", date: "2023" },
];

const leadershipYears = fullYearsSince(LEADERSHIP_SINCE);

export const profileEs: Profile = {
  locale: "es",
  localeName: "Español",
  meta: {
    title: "Marco Lagunes — Full-Stack Developer · Next.js, NestJS y Ciencia de Datos",
    description:
      "Full-Stack Developer en Veracruz, México, estudiante de Maestría en Ciencia de Datos. Next.js, React, Node.js/NestJS y MongoDB con seguridad desde el diseño. Disponible para roles remotos o híbridos.",
    keywords: [
      "Marco Lagunes",
      "Full-Stack Developer",
      "desarrollador full-stack",
      "Next.js",
      "NestJS",
      "React",
      "Node.js",
      "Data Science",
      "Ciencia de Datos",
      "Veracruz",
      "Remote",
      "remoto",
    ],
    ogLocale: "es_MX",
  },
  person: {
    name: "Marco Lagunes",
    jobTitle: "Full-Stack Developer",
    location: "Boca del Río, Veracruz, México",
    email: "marcolagunes.dev@proton.me",
    phone: "+522201064656",
    whatsapp: "522201064656",
  },
  cv: {
    href: CV_PATH,
    fileName: "Marco_Lagunes_CV.pdf",
  },
  nav: [
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Experiencia", href: "#experiencia" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Educación", href: "#educacion" },
    { label: "Ahora", href: "#ahora" },
    { label: "Certificaciones", href: "#certificaciones" },
    { label: "Stack", href: "#stack" },
    { label: "Contacto", href: "#contacto" },
  ],
  hero: {
    badge: "Disponible · Remoto / Híbrido",
    subtitle: "Full-Stack Developer · Estudiante de Maestría en Ciencia de Datos",
    headline: "Construyendo software seguro y listo para producción, de principio a fin.",
    summary:
      "Desarrollador full-stack con la carrera de Ingeniería en Sistemas Computacionales concluida y certificación Cisco CCST Cybersecurity. Diseño y despliego aplicaciones web completas — frontend, backend, bases de datos, APIs y autenticación — con foco en seguridad desde el diseño. Hoy construyo una plataforma en producción, usada por evaluadores reales de una asociación nacional de la marina mercante, y curso la Maestría en Ciencia de Datos.",
    ctas: { projects: "Ver proyectos", cv: "Descargar CV", contact: "Contactarme" },
    terminalTitle: "marco@portfolio:~",
    terminal: [
      { cmd: "whoami", resp: "Marco Lagunes — Full-Stack Developer" },
      { cmd: "ls projects/", resp: "asommmn/   ultranube/   mkdevsoft/" },
      { cmd: "cat stack.txt", resp: "React · Next.js · NestJS · MongoDB · JWT" },
      { cmd: "cat estudios.txt", resp: "Maestría en Ciencia de Datos (en curso)" },
      { cmd: "./disponible --modalidad", resp: "true ✓ Remoto / Híbrido" },
    ],
    avatarAlt: "Marco Lagunes, Full-Stack Developer",
    scrollCue: "Desplázate",
  },
  metrics: [
    { value: `${leadershipYears}+`, label: "años liderando equipos" },
    { value: "2", label: "plataformas en producción" },
    { value: String(featuredCertifications.length + otherCertifications.length), label: "certificaciones" },
  ],
  socials: [
    { label: "GitHub", href: GITHUB_URL, icon: "github", event: "click_github" },
    { label: "LinkedIn", href: LINKEDIN_URL, icon: "linkedin", event: "click_linkedin" },
    { label: "Email", href: "mailto:marcolagunes.dev@proton.me", icon: "mail", event: "click_email" },
    { label: "WhatsApp", href: "https://wa.me/522201064656", icon: "whatsapp", event: "click_whatsapp" },
  ],
  experience: [
    {
      role: "Desarrollador Full-Stack (Servicio Social)",
      organization: "ASOMMMN · Asociación Sindical de Oficiales de Máquinas de la Marina Mercante Nacional",
      location: "Veracruz, México",
      period: "Jun. 2026 – Presente",
      bullets: [
        "Arquitecté y construí desde cero una plataforma web full-stack (frontend, backend, REST API y base de datos) que digitaliza el proceso de evaluación de CVs de la institución, que antes era completamente manual.",
        "Implementé autenticación JWT y control de acceso por roles, con manejo seguro de sesiones.",
        "Construí la lógica de negocio para gestionar usuarios, currículums y evaluaciones, con una interfaz responsiva enfocada en reducir el tiempo de revisión.",
      ],
    },
    {
      role: "Auxiliar de Sistemas Computacionales (Prácticas Profesionales)",
      organization: "Ultra Ingeniería S.A. de C.V.",
      location: "Veracruz, México",
      period: "Ago. 2024 – Jul. 2025",
      bullets: [
        "Diseñé e implementé una aplicación web/móvil en nube privada, eliminando la dependencia de un servidor local.",
        "Migré los datos de una infraestructura local vulnerable a nube privada, con 100% de disponibilidad en horario laboral.",
        "Configuré infraestructura de red y controles de ciberseguridad.",
      ],
    },
    {
      role: "Liderazgo operativo",
      organization: "McDonald's (Arcos Dorados)",
      location: "Veracruz, México",
      period: "2022 – Presente",
      bullets: [
        "Coordino a un equipo de 50 colaboradores en tres turnos.",
        "Doy seguimiento a KPIs de venta y los traduzco en metas claras para el equipo.",
        "Tomo decisiones operativas en tiempo real, bajo presión, en horas de alta demanda.",
      ],
      timelineLabel: "Progresión",
      timeline: [
        { role: "Crew Member", period: "Nov. 2022" },
        { role: "Entrenador", period: "Nov. 2023" },
        { role: "Gerente de Área", period: "Nov. 2024" },
        { role: "Gerente de Turno", period: "May. 2025" },
        { role: "Líder de Experiencia al Cliente", period: "Jun. 2026" },
      ],
    },
  ],
  projects: [
    {
      slug: "asommmn-reclutamiento",
      title: "Plataforma de Evaluación de CVs",
      subtitle: "ASOMMMN",
      period: "Jun. 2026 – Presente",
      summary:
        "Plataforma full-stack en producción que digitaliza la evaluación de CVs de una asociación nacional de oficiales de la marina mercante: autenticación JWT, control de acceso por roles y backend con REST API.",
      status: "production",
      stack: ["React", "Node.js", "MongoDB", "JWT", "REST API"],
      demoUrl: "https://reclutamiento-asommmn.netlify.app/",
      repoUrl: `${GITHUB_URL}/ASOMMMN-APP-WEB`,
      mockUrl: "reclutamiento-asommmn.netlify.app",
      gallery: [
        {
          type: "video",
          src: "/images/asommmn/login-asommmn.mp4",
          poster: "/images/asommmn/login-asommmn-poster.jpg",
          alt: "Demostración del flujo de inicio de sesión de la plataforma ASOMMMN",
        },
        {
          type: "image",
          src: "/images/asommmn/interfaz-admin.png",
          alt: "Panel de administración de la plataforma de evaluación de CVs",
        },
        {
          type: "image",
          src: "/images/asommmn/interfaz-postulante.png",
          alt: "Vista del postulante en la plataforma de evaluación de CVs",
        },
        {
          type: "image",
          src: "/images/asommmn/panel-documentos-asistente-ia.png",
          alt: "Panel de documentos con asistente de IA para revisión de CVs",
        },
      ],
      caseStudy: {
        problem: [
          "La asociación evaluaba los CVs de sus aspirantes de forma completamente manual: documentos dispersos, revisión uno a uno y sin un registro central del estado de cada solicitud.",
          "Se necesitaba una plataforma donde los aspirantes subieran su información y los evaluadores la revisaran desde un solo lugar, con acceso controlado a datos sensibles.",
        ],
        role: [
          "Desarrollador full-stack único del proyecto (servicio social): arquitectura, frontend, backend, API, base de datos y despliegue.",
          "Diseño de la lógica de negocio para usuarios, currículums y evaluaciones.",
        ],
        architecture: {
          layers: [
            {
              title: "Cliente",
              nodes: [{ id: "spa", label: "React SPA", detail: "Postulante · Evaluador · Admin" }],
            },
            {
              title: "Servicios",
              nodes: [
                { id: "cdn", label: "Netlify", detail: "Hosting del frontend + CDN" },
                { id: "api", label: "REST API · Node.js", detail: "Auth JWT + middleware de roles" },
              ],
            },
            {
              title: "Datos",
              nodes: [
                { id: "db", label: "MongoDB", detail: "Usuarios, CVs, evaluaciones" },
                { id: "ai", label: "Asistente IA", detail: "[COMPLETAR: proveedor / modelo]" },
              ],
            },
          ],
          edges: [
            { from: "spa", to: "cdn", label: "HTTPS" },
            { from: "spa", to: "api", label: "REST + Bearer JWT" },
            { from: "api", to: "db", label: "consultas" },
            { from: "api", to: "ai", label: "revisión de documentos" },
          ],
          caption:
            "El frontend se sirve desde Netlify; cada petición a la API lleva un JWT y pasa por un middleware que valida el rol antes de tocar la base de datos. Hosting del backend: [COMPLETAR: dónde corre la API].",
        },
        decisions: [
          {
            title: "JWT sin estado en lugar de sesiones en servidor",
            body: "La API no guarda sesiones: cada petición se valida con el token, lo que simplifica el despliegue del backend por separado del frontend. Trade-off: revocar un token antes de que expire requiere expiración corta o lista de revocación.",
          },
          {
            title: "Control de acceso por roles en el backend",
            body: "Los permisos de postulante, evaluador y administrador se validan en la API, no solo ocultando botones en la interfaz: el frontend no es una frontera de seguridad.",
          },
          {
            title: "MongoDB para expedientes de forma variable",
            body: "Cada CV y evaluación es un documento con campos que pueden variar entre aspirantes; el modelo de documentos evita migraciones rígidas mientras el proceso se ajusta con la institución. Trade-off: la integridad entre colecciones se valida en la capa de aplicación.",
          },
        ],
        security: [
          "Autenticación con JWT y manejo seguro de sesiones.",
          "Autorización por rol en cada endpoint de la API.",
          "Datos sensibles de aspirantes y evaluadores accesibles solo para roles autorizados.",
          "[COMPLETAR: hash de contraseñas (¿bcrypt/argon2?), expiración de tokens y validación de archivos subidos]",
        ],
        impact: [
          "El proceso de evaluación de CVs pasó de completamente manual a digital, en producción y usado por evaluadores reales.",
          "[COMPLETAR: número de aspirantes / evaluaciones procesadas o tiempo de revisión antes vs. después]",
        ],
      },
    },
    {
      slug: "ultranube",
      title: "UltraNube",
      subtitle: "Plataforma web full-stack · ultranube.com.mx",
      period: "Mar. 2025 – Presente",
      summary:
        "Aplicación cliente-servidor con autenticación JWT, REST APIs y MongoDB, desplegada en la nube con seguridad integrada de principio a fin y accesible desde web y móvil. Incluye agentes de IA para presentaciones y traducción.",
      status: "personal",
      stack: ["React", "Node.js", "MongoDB", "JWT", "Cloud"],
      repoUrl: `${GITHUB_URL}/UltraNube`,
      mockUrl: "ultranube.com.mx",
      gallery: [
        { type: "image", src: "/images/ultranube/dashboard.png", alt: "Panel principal del dashboard de UltraNube con métricas de uso" },
        { type: "image", src: "/images/ultranube/interfaz.png", alt: "Interfaz de usuario principal de la plataforma UltraNube" },
        { type: "image", src: "/images/ultranube/agente-presentaciones.png", alt: "Agente de IA para generación de presentaciones dentro de UltraNube" },
        { type: "image", src: "/images/ultranube/agente-traductor.png", alt: "Agente de IA traductor integrado en UltraNube" },
      ],
      caseStudy: {
        problem: [
          "Acceder a la información desde cualquier lugar sin depender de un servidor local, con autenticación segura y una sola aplicación para web y móvil.",
          "[COMPLETAR: para quién es UltraNube y qué problema concreto resuelve]",
        ],
        role: ["Proyecto propio: diseño, desarrollo full-stack, despliegue en la nube y mantenimiento."],
        architecture: {
          layers: [
            { title: "Cliente", nodes: [{ id: "web", label: "React", detail: "Web y móvil (responsivo)" }] },
            {
              title: "Servicios",
              nodes: [
                { id: "api", label: "REST API · Node.js", detail: "Auth JWT" },
                { id: "agents", label: "Agentes de IA", detail: "Presentaciones · Traductor" },
              ],
            },
            {
              title: "Datos",
              nodes: [{ id: "db", label: "MongoDB", detail: "[COMPLETAR: proveedor cloud]" }],
            },
          ],
          edges: [
            { from: "web", to: "api", label: "REST + JWT" },
            { from: "api", to: "agents", label: "tareas de IA" },
            { from: "api", to: "db", label: "consultas" },
          ],
          caption: "Cliente React único para web y móvil; la API centraliza autenticación, datos y llamadas a los agentes de IA.",
        },
        decisions: [
          {
            title: "Una sola app responsiva para web y móvil",
            body: "Un solo código de frontend en lugar de una app nativa separada: menos superficie que mantener. Trade-off: sin acceso a funciones nativas del dispositivo.",
          },
          {
            title: "Agentes de IA detrás de la API",
            body: "Los agentes se invocan desde el backend, no desde el navegador, para no exponer credenciales de servicios externos en el cliente.",
          },
        ],
        security: [
          "Autenticación con JWT y REST APIs protegidas.",
          "Seguridad integrada de principio a fin en el despliegue en la nube.",
          "[COMPLETAR: detalles — HTTPS, manejo de secretos, roles]",
        ],
        impact: ["[COMPLETAR: usuarios activos, uso de los agentes o resultado principal]"],
      },
    },
    {
      slug: "mkdevsoft",
      title: "MKDevSoft",
      subtitle: "Emprendimiento propio · sitio de negocio",
      period: "2025 – Presente",
      summary:
        "Sitio institucional y de captación de clientes para mi iniciativa de desarrollo de software, dirigida a pequeñas y medianas empresas de Veracruz y Boca del Río: showcase de plantillas, servicios y formulario de contacto.",
      status: "personal",
      stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Netlify"],
      repoUrl: `${GITHUB_URL}/mkdevsoft`,
      mockUrl: "mkdevsoft.netlify.app",
      gallery: [
        {
          type: "video",
          src: "/images/mkdevsoft/recorrido-mkdevsoft.mp4",
          poster: "/images/mkdevsoft/recorrido-mkdevsoft-poster.jpg",
          alt: "Recorrido en video del sitio de MKDevSoft",
        },
        { type: "image", src: "/images/mkdevsoft/interfaz-mkdevsoft.png", alt: "Página principal del sitio de MKDevSoft" },
      ],
      caseStudy: {
        problem: [
          "Las pymes de la región necesitan ver ejemplos concretos y una forma directa de pedir una propuesta antes de contratar desarrollo de software.",
        ],
        role: ["Fundador: posicionamiento, diseño, desarrollo y despliegue del sitio."],
        architecture: {
          layers: [
            { title: "Visitante", nodes: [{ id: "browser", label: "Navegador", detail: "Pymes de Veracruz / Boca del Río" }] },
            { title: "Sitio", nodes: [{ id: "next", label: "Next.js", detail: "Páginas estáticas en Netlify CDN" }] },
            {
              title: "Contacto",
              nodes: [
                { id: "form", label: "Formulario", detail: "[COMPLETAR: servicio de formularios]" },
                { id: "wa", label: "WhatsApp", detail: "Contacto directo" },
              ],
            },
          ],
          edges: [
            { from: "browser", to: "next", label: "HTTPS" },
            { from: "next", to: "form", label: "solicitud de propuesta" },
            { from: "next", to: "wa", label: "enlace directo" },
          ],
          caption: "Sitio estático servido desde CDN, con dos canales de conversión: formulario y WhatsApp.",
        },
        decisions: [
          {
            title: "Generación estática con Next.js",
            body: "Las páginas se generan en el build y se sirven desde CDN: carga rápida y buen SEO local sin servidor que mantener. Trade-off: cambiar contenido requiere un nuevo deploy.",
          },
          {
            title: "Tailwind CSS + Framer Motion",
            body: "Sistema de estilos utilitario para iterar rápido el diseño y animaciones declarativas para las micro-interacciones del showcase.",
          },
        ],
        security: [
          "Sitio estático sin backend propio: superficie de ataque mínima.",
          "[COMPLETAR: protección anti-spam del formulario]",
        ],
        impact: ["[COMPLETAR: clientes o solicitudes de propuesta recibidas]"],
      },
    },
  ],
  // Slot para el primer proyecto de Ciencia de Datos. Descomenta y completa para mostrar la tarjeta "en construcción":
  // upcomingProject: {
  //   title: "[COMPLETAR: nombre del proyecto]",
  //   summary: "[COMPLETAR: qué datos, qué pregunta responde]",
  //   stack: ["[COMPLETAR]"],
  //   eta: "[COMPLETAR: mes año]",
  // },
  education: [
    {
      degree: "Maestría en Ciencia de Datos",
      institution: "[COMPLETAR: universidad]",
      period: "[COMPLETAR: mes año de inicio] – Presente · Título esperado: [COMPLETAR: mes año]",
      status: "in-progress",
      badge: "En curso",
    },
    {
      degree: "Ingeniería en Sistemas Computacionales",
      institution: "Universidad Cristóbal Colón",
      period: "2022 – 2026",
      status: "completed",
      badge: "Carrera concluida",
      note: "Carrera concluida · titulación vía maestría",
    },
  ],
  certifications: {
    featured: featuredCertifications,
    others: otherCertifications,
  },
  stack: [
    { category: "Frontend", icon: "code", skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3"] },
    { category: "Backend", icon: "server", skills: ["Node.js", "NestJS", "REST APIs", "JSON", "MongoDB", "JWT"] },
    { category: "Datos & IA", icon: "data", skills: ["[COMPLETAR: herramientas de datos]"] },
    { category: "Ciberseguridad", icon: "shield", skills: ["Redes", "Seguridad IoT", "Control de accesos", "Seguridad Web"] },
    { category: "Herramientas", icon: "wrench", skills: ["Git", "GitHub", "Notion", "MS Office"] },
  ],
  strengths: [
    "Liderazgo bajo presión",
    "Aprendizaje rápido / autodidacta",
    "Trabajo multidisciplinario",
    "Responsabilidad y compromiso",
    "Resolución de conflictos",
    "Comunicación clara",
  ],
  languages: [
    { name: "Español", level: "Nativo", proficiency: 100 },
    { name: "Inglés", level: "Intermedio", proficiency: 60 },
  ],
  interests: [
    "Desarrollo de Software",
    "Ciencia de Datos",
    "Machine Learning",
    "Agentes de IA",
    "Ciberseguridad Aplicada",
    "Arquitecturas Cloud",
    "DevSecOps",
  ],
  now: {
    building: [
      "La plataforma de evaluación de CVs de ASOMMMN, en producción.",
      "MKDevSoft, mi iniciativa de desarrollo de software para pymes.",
    ],
    learning: ["Maestría en Ciencia de Datos: [COMPLETAR: materias o temas de este periodo]"],
  },
  ui: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    goHome: "Marco Lagunes, ir al inicio",
    switchLanguage: "Read in English",
    sections: {
      experience: { eyebrow: "experiencia", title: "Trayectoria profesional" },
      projects: { eyebrow: "proyectos", title: "Proyectos destacados" },
      education: { eyebrow: "educación", title: "Educación" },
      certifications: { eyebrow: "certificaciones", title: "Certificaciones" },
      stack: { eyebrow: "stack", title: "Stack técnico" },
      strengths: { eyebrow: "fortalezas", title: "Fortalezas, idiomas e intereses" },
      now: { eyebrow: "ahora", title: "Ahora mismo" },
      contact: { eyebrow: "contacto", title: "Hablemos" },
    },
    projects: {
      status: { production: "En producción", personal: "Proyecto personal", academic: "Académico" },
      caseStudy: "Ver caso de estudio",
      visit: "Visitar sitio",
      repo: "Código",
      upcomingBadge: "En construcción",
      upcomingEta: "Estimado",
      galleryLabel: "Galería de",
      prevSlide: "Diapositiva anterior de",
      nextSlide: "Siguiente diapositiva de",
      goToSlide: "Ir a la diapositiva",
      opensInNewTab: "(se abre en una pestaña nueva)",
    },
    caseStudy: {
      label: "Caso de estudio",
      back: "Volver a proyectos",
      problem: "Problema",
      role: "Mi rol",
      architecture: "Arquitectura",
      decisions: "Decisiones técnicas y trade-offs",
      security: "Seguridad",
      impact: "Resultado e impacto",
      stack: "Stack",
      gallery: "Galería",
      links: "Links",
      nextProject: "Siguiente proyecto",
      period: "Periodo",
    },
    certifications: { showAll: "Ver todas", showLess: "Ver menos", more: "certificaciones más" },
    strengths: { strengths: "Fortalezas", languages: "Idiomas", interests: "Intereses" },
    now: {
      building: "Qué estoy construyendo",
      learning: "Qué estoy aprendiendo",
      repos: "Repos públicos recientes",
      reposEmpty: "Mira mi actividad completa en GitHub.",
      updated: "Actualizado",
      viewProfile: "Ver perfil de GitHub",
    },
    contact: {
      intro: "¿Tienes una vacante remota o híbrida, o un proyecto en mente? Escríbeme y te respondo pronto.",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando...",
      success: "Mensaje enviado. Gracias por escribir, te respondo pronto.",
      error: "No se pudo enviar el mensaje. Intenta de nuevo o escríbeme por email o WhatsApp.",
      errors: {
        name: "Escribe tu nombre (mínimo 2 caracteres).",
        email: "Escribe un email válido, por ejemplo nombre@empresa.com.",
        messageShort: "Cuéntame un poco más (mínimo 10 caracteres).",
        messageLong: "El mensaje es demasiado largo (máximo 4000 caracteres).",
      },
      honeypot: "No llenar este campo",
      call: "Llamar",
      cvUnavailable: "PDF en preparación",
    },
    footer: { role: ">_ Full-Stack Developer", rights: "Todos los derechos reservados." },
    cv: {
      title: "CV",
      print: "Imprimir / Guardar PDF",
      hint: "Versión imprimible generada desde el sitio: siempre está sincronizada con el portafolio.",
      summary: "Perfil",
      skills: "Habilidades técnicas",
      languages: "Idiomas",
      links: "Enlaces",
    },
    boot: { skip: "presiona cualquier tecla para omitir", soundOn: "Activar sonido de inicio", soundOff: "Silenciar sonido de inicio" },
    notFound: { title: "Página no encontrada", body: "La ruta que buscas no existe o cambió de lugar.", back: "Volver al inicio" },
    stackMarqueeLabel: "Tecnologías",
  },
};
