import { Terminal } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { SocialIcon } from "@/components/SocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {year} Marco Lagunes</p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-foreground"
            >
              <SocialIcon icon={link.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="flex items-center gap-1.5 font-mono text-xs">
          <Terminal className="h-3.5 w-3.5" />
          Hecho por Marco Lagunes
        </p>
      </div>
    </footer>
  );
}
