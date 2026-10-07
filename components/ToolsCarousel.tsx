import Image from "next/image";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  /** Nombre de archivo en /public/icons (sin extensión). */
  icon: string;
  /** Logos oscuros (Next.js, GitHub, WordPress): se invierten para verse sobre la tarjeta oscura. */
  invert?: boolean;
}

const ROW_FRONTEND: Tool[] = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "next-js", invert: true },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind CSS", icon: "tailwind-css" },
  { name: "Vue", icon: "vue-js" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "WordPress", icon: "wordpress", invert: true },
  { name: "PrestaShop", icon: "prestashop" },
  { name: "React Native", icon: "react-native" },
  { name: "Framer Motion", icon: "framer-motion" },
];

const ROW_BACKEND: Tool[] = [
  { name: "Node.js", icon: "node-js" },
  { name: "NestJS", icon: "nest-js" },
  { name: "MongoDB", icon: "mongo-db" },
  { name: "AWS S3", icon: "aws" },
  { name: "Netlify", icon: "netlify" },
  { name: "Render", icon: "render" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github", invert: true },
  { name: "Docker", icon: "docker" },
  { name: "Python", icon: "python" },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <li className="tool-card">
      <Image
        src={`/icons/${tool.icon}.svg`}
        alt=""
        aria-hidden="true"
        width={40}
        height={40}
        unoptimized
        className={cn("tool-card-icon", tool.invert && "tool-card-icon-invert")}
      />
      <span className="tool-card-name">{tool.name}</span>
    </li>
  );
}

function Row({ tools, label, durationSeconds, reverse }: { tools: Tool[]; label: string; durationSeconds: number; reverse?: boolean }) {
  return (
    <div className="marquee group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]">
      <div
        className="marquee-track flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSeconds}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <ul aria-label={label} className="marquee-list flex shrink-0 gap-4 pr-4">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </ul>
        <ul aria-hidden="true" className="marquee-copy flex shrink-0 gap-4 pr-4">
          {tools.map((tool) => (
            <ToolCard key={`${tool.name}-copy`} tool={tool} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Carrusel infinito de dos filas (sentidos opuestos) con las herramientas del día a día.
 * Logos de Devicon descargados a /public/icons (sin CDN); PrestaShop y Render son SVG propios.
 * Con prefers-reduced-motion las filas se muestran estáticas y envueltas (ver .marquee-* en globals.css).
 */
export function ToolsCarousel({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Row tools={ROW_FRONTEND} label={label} durationSeconds={38} />
      <Row tools={ROW_BACKEND} label={label} durationSeconds={44} reverse />
    </div>
  );
}
