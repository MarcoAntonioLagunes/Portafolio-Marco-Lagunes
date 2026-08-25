"use client";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-[#06090F] border-t border-white/5">

      {/* Texto grande animado al fondo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="animated-name whitespace-nowrap font-bold tracking-tight">
          Marco Lagunes
        </span>
      </div>

      {/* Fila superior */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-5 pb-1">
        <span className="text-white font-semibold text-sm">Marco Lagunes</span>
        <span className="text-white/40 text-xs text-center">
          © {year} Marco Lagunes &nbsp;·&nbsp; Boca del Río, Veracruz &nbsp;·&nbsp;
          <a
            href="https://portafolio-marco-lagunes.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            portafolio-marco-lagunes.netlify.app
          </a>
        </span>
      </div>

      {/* Fila inferior */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-10 pb-5">
        <span className="text-white/25 text-xs font-mono">&gt;_ Full Stack Developer</span>

        <div className="flex items-center gap-5">
          {/* GitHub */}
          <a href="https://github.com/MarcoAntonioLagunes" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-violet-400 transition-colors duration-200" aria-label="GitHub">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com/in/Marco-Lagunes" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-violet-400 transition-colors duration-200" aria-label="LinkedIn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="4" height="14" />
              <circle cx="4" cy="4" r="2" />
              <path d="M6 11a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v9h-4v-9a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v9H6z" />
            </svg>
          </a>

          {/* Email */}
          <a href="mailto:marcolagunes.dev@proton.me" className="text-white/30 hover:text-violet-400 transition-colors duration-200" aria-label="Email">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
          </a>

          {/* Teléfono */}
          <a href="tel:+522201064656" className="text-white/30 hover:text-violet-400 transition-colors duration-200" aria-label="Teléfono">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .animated-name {
          font-family: var(--font-space-grotesk, 'Space Grotesk', sans-serif);
          font-size: clamp(52px, 10vw, 96px);
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 15%,
            #e040a0 32%,
            #7C6FE0 50%,
            #40c8e0 68%,
            transparent 85%,
            transparent 100%
          );
          background-size: 300% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: sweep 7s ease-in-out infinite;
          opacity: 0.18;
        }

        @keyframes sweep {
          0%   { background-position: 120% 0; }
          45%  { background-position: 0% 0;   opacity: 0.22; }
          65%  { background-position: -10% 0; opacity: 0.22; }
          100% { background-position: -120% 0; opacity: 0.18; }
        }
      `}</style>
    </footer>
  );
}
