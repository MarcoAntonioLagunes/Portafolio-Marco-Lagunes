import { GITHUB_URL, LINKEDIN_URL, RESUME_EN_PATH } from "@/lib/site";
import { fullYearsSince, LEADERSHIP_SINCE } from "./derived";
import type { CertificationItem, Profile } from "./types";

const featuredCertifications: CertificationItem[] = [
  { name: "CCST Cybersecurity", issuer: "Cisco", date: "Feb 2026", note: "Valid 5 years" },
  { name: "Cyber Threat Management", issuer: "Cisco", date: "Feb 2026" },
  { name: "Network Defense", issuer: "Cisco", date: "Feb 2026" },
  { name: "Endpoint Security", issuer: "Cisco", date: "Nov 2025" },
];

const otherCertifications: CertificationItem[] = [
  { name: "Introduction to Cybersecurity", issuer: "Cisco", date: "Oct 2025" },
  { name: "Networking Devices and Initial Configuration", issuer: "Cisco", date: "Nov 2024" },
  { name: "Cisco Packet Tracer (Networking & IoT modules)", issuer: "Cisco", date: "Aug 2024" },
  { name: "Networking Basics", issuer: "Cisco", date: "Apr 2024" },
  { name: "Introduction to IoT", issuer: "Cisco", date: "Nov 2022" },
  { name: "Cybersecurity & Hacking", issuer: "Universidad Cristóbal Colón", date: "2023" },
];

const leadershipYears = fullYearsSince(LEADERSHIP_SINCE);

export const profileEn: Profile = {
  locale: "en",
  localeName: "English",
  meta: {
    title: "Marco Lagunes — Full-Stack Developer · Next.js, NestJS & Data Science",
    description:
      "Full-Stack Developer based in Veracruz, Mexico, and Data Science master's student. Next.js, React, Node.js/NestJS and MongoDB with security by design. Open to remote and hybrid roles.",
    keywords: [
      "Marco Lagunes",
      "Full-Stack Developer",
      "Next.js",
      "NestJS",
      "React",
      "Node.js",
      "TypeScript",
      "Data Science",
      "Veracruz",
      "Mexico",
      "Remote",
      "Hybrid",
    ],
    ogLocale: "en_US",
  },
  person: {
    name: "Marco Lagunes",
    jobTitle: "Full-Stack Developer",
    location: "Boca del Río, Veracruz, Mexico",
    email: "marcolagunes.dev@proton.me",
    phone: "+522201064656",
    whatsapp: "522201064656",
  },
  cv: {
    href: RESUME_EN_PATH,
    fileName: "Marco_Lagunes_Resume.pdf",
  },
  nav: [
    { label: "About", href: "#sobre-mi" },
    { label: "Experience", href: "#experiencia" },
    { label: "Projects", href: "#proyectos" },
    { label: "Now", href: "#ahora" },
    { label: "Education", href: "#educacion" },
    { label: "Certifications", href: "#certificaciones" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contacto" },
  ],
  hero: {
    badge: "Available · Remote / Hybrid",
    subtitle: "Full-Stack Developer · Data Science Master's Student",
    headline: "Building secure, production-ready software, end to end.",
    summary:
      "Full-stack developer specialized in building complete web applications, from the interface and APIs to databases, authentication and deployment, with a security-by-design approach. I'm a Computer Systems Engineer with the Cisco CCST Cybersecurity certification. I'm currently building a production web platform used by evaluators at a national merchant marine association, while pursuing a Master's in Data Science to expand my profile into data analysis and artificial intelligence.",
    ctas: { projects: "View projects", cv: "Download résumé", contact: "Get in touch" },
    terminalTitle: "marco@portfolio:~",
    terminal: [
      { cmd: "whoami", resp: "Marco Lagunes — Full-Stack Developer" },
      { cmd: "ls projects/", resp: "asommmn/   ultranube/   mkdevsoft/" },
      { cmd: "cat stack.txt", resp: "React · Next.js · NestJS · MongoDB · JWT" },
      { cmd: "cat education.txt", resp: "M.S. in Data Science (in progress)" },
      { cmd: "./available --mode", resp: "true ✓ Remote / Hybrid" },
    ],
    avatarAlt: "Marco Lagunes, Full-Stack Developer",
  },
  metrics: [
    { value: `${leadershipYears}+`, label: "years leading teams" },
    { value: "2", label: "platforms in production" },
    { value: String(featuredCertifications.length + otherCertifications.length), label: "certifications" },
  ],
  socials: [
    { label: "GitHub", href: GITHUB_URL, icon: "github", event: "click_github" },
    { label: "LinkedIn", href: LINKEDIN_URL, icon: "linkedin", event: "click_linkedin" },
    { label: "Email", href: "mailto:marcolagunes.dev@proton.me", icon: "mail", event: "click_email" },
    { label: "WhatsApp", href: "https://wa.me/522201064656", icon: "whatsapp", event: "click_whatsapp" },
  ],
  experience: [
    {
      role: "Full-Stack Developer (Social Service)",
      organization: "ASOMMMN · National Merchant Marine Engineering Officers' Union",
      location: "Veracruz, Mexico",
      period: "Jun 2026 – Present",
      bullets: [
        "Architected and built from scratch a full-stack web platform (frontend, backend, REST API and database) that digitizes the organization's résumé evaluation process, which was previously entirely manual.",
        "Implemented JWT authentication and role-based access control with secure session handling.",
        "Built the business logic to manage users, résumés and evaluations, with a responsive UI focused on cutting review time.",
      ],
    },
    {
      role: "Systems Assistant (Professional Internship)",
      organization: "Ultra Ingeniería S.A. de C.V.",
      location: "Veracruz, Mexico",
      period: "Aug 2024 – Jul 2025",
      bullets: [
        "Designed and implemented a web/mobile application on a private cloud, removing the dependency on a single on-premises server.",
        "Migrated data from vulnerable on-premises infrastructure to a private cloud, achieving 100% availability during business hours.",
        "Configured network infrastructure and cybersecurity controls.",
      ],
    },
    {
      role: "Operations Leadership",
      organization: "McDonald's (Arcos Dorados)",
      location: "Veracruz, Mexico",
      period: "2022 – Present",
      bullets: [
        "Coordinate a team of 50 crew members across three shifts.",
        "Track sales KPIs and translate them into clear goals for the team.",
        "Make real-time operational decisions under pressure during peak hours.",
      ],
      timelineLabel: "Career progression",
      timeline: [
        { role: "Crew Member", period: "Nov 2022" },
        { role: "Trainer", period: "Nov 2023" },
        { role: "Area Manager", period: "Nov 2024" },
        { role: "Shift Manager", period: "May 2025" },
        { role: "Guest Experience Leader", period: "Jun 2026" },
      ],
    },
  ],
  projects: [
    {
      slug: "asommmn-reclutamiento",
      title: "Résumé Evaluation Platform",
      subtitle: "ASOMMMN",
      period: "Jun 2026 – Present",
      summary:
        "Production full-stack platform that digitizes résumé evaluation for a national merchant marine officers' association: JWT authentication, role-based access control and a REST API backend.",
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
          alt: "Walkthrough of the ASOMMMN platform sign-in flow",
        },
        { type: "image", src: "/images/asommmn/interfaz-admin.png", alt: "Admin dashboard of the résumé evaluation platform" },
        { type: "image", src: "/images/asommmn/interfaz-postulante.png", alt: "Applicant view of the résumé evaluation platform" },
        { type: "image", src: "/images/asommmn/panel-documentos-asistente-ia.png", alt: "Document panel with an AI assistant for résumé review" },
      ],
      caseStudy: {
        problem: [
          "The association reviewed applicants' résumés entirely by hand: scattered documents, one-by-one review and no central record of each application's status.",
          "It needed a platform where applicants submit their information and evaluators review it in one place, with controlled access to sensitive data.",
        ],
        role: [
          "Sole full-stack developer on the project (social service): architecture, frontend, backend, API, database and deployment.",
          "Designed the business logic for users, résumés and evaluations.",
        ],
        architecture: {
          layers: [
            { title: "Client", nodes: [{ id: "spa", label: "React SPA", detail: "Applicant · Evaluator · Admin" }] },
            {
              title: "Services",
              nodes: [
                { id: "cdn", label: "Netlify", detail: "Frontend hosting + CDN" },
                { id: "api", label: "REST API · Node.js", detail: "JWT auth + role middleware" },
              ],
            },
            {
              title: "Data",
              nodes: [
                { id: "db", label: "MongoDB", detail: "Users, résumés, evaluations" },
                { id: "ai", label: "AI assistant", detail: "[COMPLETAR: proveedor / modelo]" },
              ],
            },
          ],
          edges: [
            { from: "spa", to: "cdn", label: "HTTPS" },
            { from: "spa", to: "api", label: "REST + Bearer JWT" },
            { from: "api", to: "db", label: "queries" },
            { from: "api", to: "ai", label: "document review" },
          ],
          caption:
            "The frontend is served from Netlify; every API request carries a JWT and goes through middleware that checks the user's role before touching the database. Backend hosting: [COMPLETAR: dónde corre la API].",
        },
        decisions: [
          {
            title: "Stateless JWT instead of server-side sessions",
            body: "The API keeps no sessions: each request is validated from its token, which makes it simple to deploy the backend separately from the frontend. Trade-off: revoking a token before it expires requires short lifetimes or a revocation list.",
          },
          {
            title: "Role-based access control enforced in the backend",
            body: "Applicant, evaluator and admin permissions are checked in the API, not just by hiding buttons in the UI — the frontend is not a security boundary.",
          },
          {
            title: "MongoDB for variable-shape records",
            body: "Each résumé and evaluation is a document whose fields can vary between applicants; the document model avoids rigid migrations while the process is refined with the organization. Trade-off: cross-collection integrity is enforced in the application layer.",
          },
        ],
        security: [
          "JWT authentication with secure session handling.",
          "Role-based authorization on every API endpoint.",
          "Sensitive applicant and evaluator data is only accessible to authorized roles.",
          "[COMPLETAR: hash de contraseñas (¿bcrypt/argon2?), expiración de tokens y validación de archivos subidos]",
        ],
        impact: [
          "Résumé evaluation went from fully manual to digital — in production and used by real evaluators.",
          "[COMPLETAR: número de aspirantes / evaluaciones procesadas o tiempo de revisión antes vs. después]",
        ],
      },
    },
    {
      slug: "ultranube",
      title: "UltraNube",
      subtitle: "Full-stack web platform · ultranube.com.mx",
      period: "Mar 2025 – Present",
      summary:
        "Client-server application with JWT authentication, REST APIs and MongoDB, deployed to the cloud with end-to-end security and available on web and mobile. Includes AI agents for presentations and translation.",
      status: "personal",
      stack: ["React", "Node.js", "MongoDB", "JWT", "Cloud"],
      repoUrl: `${GITHUB_URL}/UltraNube`,
      mockUrl: "ultranube.com.mx",
      gallery: [
        { type: "image", src: "/images/ultranube/dashboard.png", alt: "UltraNube main dashboard with usage metrics" },
        { type: "image", src: "/images/ultranube/interfaz.png", alt: "UltraNube main user interface" },
        { type: "image", src: "/images/ultranube/agente-presentaciones.png", alt: "AI agent that generates presentations inside UltraNube" },
        { type: "image", src: "/images/ultranube/agente-traductor.png", alt: "Translator AI agent built into UltraNube" },
      ],
      caseStudy: {
        problem: [
          "Access information from anywhere without depending on an on-premises server, with secure authentication and a single app for web and mobile.",
          "[COMPLETAR: para quién es UltraNube y qué problema concreto resuelve]",
        ],
        role: ["Own project: design, full-stack development, cloud deployment and maintenance."],
        architecture: {
          layers: [
            { title: "Client", nodes: [{ id: "web", label: "React", detail: "Web and mobile (responsive)" }] },
            {
              title: "Services",
              nodes: [
                { id: "api", label: "REST API · Node.js", detail: "JWT auth" },
                { id: "agents", label: "AI agents", detail: "Presentations · Translator" },
              ],
            },
            { title: "Data", nodes: [{ id: "db", label: "MongoDB", detail: "[COMPLETAR: proveedor cloud]" }] },
          ],
          edges: [
            { from: "web", to: "api", label: "REST + JWT" },
            { from: "api", to: "agents", label: "AI tasks" },
            { from: "api", to: "db", label: "queries" },
          ],
          caption: "A single React client for web and mobile; the API centralizes authentication, data access and calls to the AI agents.",
        },
        decisions: [
          {
            title: "One responsive app for web and mobile",
            body: "A single frontend codebase instead of a separate native app: less surface to maintain. Trade-off: no access to native device features.",
          },
          {
            title: "AI agents behind the API",
            body: "Agents are invoked from the backend, not the browser, so third-party service credentials are never exposed to the client.",
          },
        ],
        security: [
          "JWT authentication and protected REST APIs.",
          "Security built in end to end across the cloud deployment.",
          "[COMPLETAR: detalles — HTTPS, manejo de secretos, roles]",
        ],
        impact: ["[COMPLETAR: usuarios activos, uso de los agentes o resultado principal]"],
      },
    },
    {
      slug: "mkdevsoft",
      title: "MKDevSoft",
      subtitle: "My own venture · business website",
      period: "2025 – Present",
      summary:
        "Company and lead-generation website for my software development venture, aimed at small and mid-sized businesses in Veracruz and Boca del Río: template showcase, services and a contact form.",
      status: "personal",
      stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Netlify"],
      repoUrl: `${GITHUB_URL}/mkdevsoft`,
      mockUrl: "mkdevsoft.netlify.app",
      gallery: [
        {
          type: "video",
          src: "/images/mkdevsoft/recorrido-mkdevsoft.mp4",
          poster: "/images/mkdevsoft/recorrido-mkdevsoft-poster.jpg",
          alt: "Video walkthrough of the MKDevSoft website",
        },
        { type: "image", src: "/images/mkdevsoft/interfaz-mkdevsoft.png", alt: "MKDevSoft home page" },
      ],
      caseStudy: {
        problem: [
          "Local small businesses need to see concrete examples and have a direct way to request a proposal before hiring a software developer.",
        ],
        role: ["Founder: positioning, design, development and deployment of the site."],
        architecture: {
          layers: [
            { title: "Visitor", nodes: [{ id: "browser", label: "Browser", detail: "SMBs in Veracruz / Boca del Río" }] },
            { title: "Site", nodes: [{ id: "next", label: "Next.js", detail: "Static pages on Netlify CDN" }] },
            {
              title: "Contact",
              nodes: [
                { id: "form", label: "Form", detail: "[COMPLETAR: servicio de formularios]" },
                { id: "wa", label: "WhatsApp", detail: "Direct contact" },
              ],
            },
          ],
          edges: [
            { from: "browser", to: "next", label: "HTTPS" },
            { from: "next", to: "form", label: "proposal request" },
            { from: "next", to: "wa", label: "direct link" },
          ],
          caption: "Static site served from a CDN with two conversion channels: a form and WhatsApp.",
        },
        decisions: [
          {
            title: "Static generation with Next.js",
            body: "Pages are generated at build time and served from a CDN: fast loads and good local SEO with no server to maintain. Trade-off: content changes require a new deploy.",
          },
          {
            title: "Tailwind CSS + Framer Motion",
            body: "A utility-first styling system to iterate on the design quickly, and declarative animations for the showcase's micro-interactions.",
          },
        ],
        security: [
          "Static site with no custom backend: minimal attack surface.",
          "[COMPLETAR: protección anti-spam del formulario]",
        ],
        impact: ["[COMPLETAR: clientes o solicitudes de propuesta recibidas]"],
      },
    },
  ],
  // Slot for the first Data Science project — mirror profile.es.ts when it's ready.
  // upcomingProject: { title: "...", summary: "...", stack: ["..."], eta: "..." },
  education: [
    {
      degree: "Master's in Data Science",
      institution: "[COMPLETAR: universidad]",
      period: "[COMPLETAR: mes año de inicio] – Present · Expected: [COMPLETAR: mes año]",
      status: "in-progress",
      badge: "In progress",
    },
    {
      degree: "Computer Systems Engineering",
      institution: "Universidad Cristóbal Colón",
      period: "2022 – 2026",
      status: "completed",
      badge: "Coursework completed",
      note: "Program completed · degree to be conferred through the master's program",
    },
  ],
  certifications: {
    featured: featuredCertifications,
    others: otherCertifications,
  },
  stack: [
    { category: "Frontend", icon: "code", skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3"] },
    { category: "Backend", icon: "server", skills: ["Node.js", "NestJS", "REST APIs", "JSON", "MongoDB", "JWT"] },
    { category: "Data & AI", icon: "data", skills: ["[COMPLETAR: herramientas de datos]"] },
    { category: "Cybersecurity", icon: "shield", skills: ["Networking", "IoT security", "Access control", "Web security"] },
    { category: "Tools", icon: "wrench", skills: ["Git", "GitHub", "Notion", "MS Office"] },
  ],
  strengths: [
    "Leadership under pressure",
    "Fast, self-directed learner",
    "Cross-functional collaboration",
    "Ownership and accountability",
    "Conflict resolution",
    "Clear communication",
  ],
  languages: [
    { name: "Spanish", level: "Native", proficiency: 100 },
    { name: "English", level: "Intermediate", proficiency: 60 },
  ],
  interests: [
    "Software Development",
    "Data Science",
    "Machine Learning",
    "AI Agents",
    "Applied Cybersecurity",
    "Cloud Architecture",
    "DevSecOps",
  ],
  now: {
    building: [
      "The ASOMMMN résumé evaluation platform, in production.",
      "MKDevSoft, my software development venture for small businesses.",
    ],
  },
  ui: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    goHome: "Marco Lagunes, go to home",
    switchLanguage: "Leer en español",
    sections: {
      experience: { eyebrow: "experience", title: "Professional experience" },
      projects: { eyebrow: "projects", title: "Featured projects" },
      education: { eyebrow: "education", title: "Education" },
      certifications: { eyebrow: "certifications", title: "Certifications" },
      stack: { eyebrow: "stack", title: "Tech stack" },
      strengths: { eyebrow: "strengths", title: "Strengths, languages and interests" },
      now: { eyebrow: "now", title: "Right now" },
      contact: { eyebrow: "contact", title: "Let's talk" },
    },
    projects: {
      status: { production: "In production", personal: "Personal project", academic: "Academic" },
      caseStudy: "Read case study",
      visit: "Visit site",
      repo: "Code",
      upcomingBadge: "In progress",
      upcomingEta: "Expected",
      galleryLabel: "Gallery for",
      prevSlide: "Previous slide of",
      nextSlide: "Next slide of",
      goToSlide: "Go to slide",
      opensInNewTab: "(opens in a new tab)",
    },
    caseStudy: {
      label: "Case study",
      back: "Back to projects",
      problem: "Problem",
      role: "My role",
      architecture: "Architecture",
      decisions: "Technical decisions & trade-offs",
      security: "Security",
      impact: "Outcome & impact",
      stack: "Stack",
      gallery: "Gallery",
      links: "Links",
      nextProject: "Next project",
      period: "Timeline",
    },
    certifications: { showAll: "Show all", showLess: "Show less", more: "more" },
    strengths: { strengths: "Strengths", languages: "Languages", interests: "Interests" },
    now: {
      building: "What I'm building",
      repos: "Recently updated public repos",
      reposEmpty: "See all my activity on GitHub.",
      updated: "Updated",
      viewProfile: "View GitHub profile",
    },
    contact: {
      intro: "Hiring for a remote or hybrid role, or have a project in mind? Send me a message and I'll get back to you soon.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending...",
      success: "Message sent. Thanks for reaching out — I'll reply soon.",
      error: "Your message couldn't be sent. Please try again, or reach me by email or WhatsApp.",
      errors: {
        name: "Please enter your name (at least 2 characters).",
        email: "Please enter a valid email, e.g. name@company.com.",
        messageShort: "Please tell me a bit more (at least 10 characters).",
        messageLong: "Your message is too long (4,000 characters max).",
      },
      honeypot: "Leave this field empty",
      call: "Call",
      cvUnavailable: "PDF coming soon",
    },
    footer: { role: ">_ Full-Stack Developer", rights: "All rights reserved." },
    cv: {
      title: "Résumé",
      print: "Print / Save as PDF",
      hint: "Printable version generated from the website, so it always matches the portfolio.",
      summary: "Summary",
      skills: "Technical skills",
      languages: "Languages",
      links: "Links",
    },
    boot: { skip: "press any key to skip", soundOn: "Turn on intro sound", soundOff: "Mute intro sound" },
    notFound: { title: "Page not found", body: "The page you are looking for does not exist or has moved.", back: "Back to home" },
    stackMarqueeLabel: "Technologies",
  },
};
