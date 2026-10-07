import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        navy: {
          DEFAULT: "hsl(var(--navy) / <alpha-value>)",
          foreground: "hsl(var(--navy-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        surface2: "hsl(var(--surface-2) / <alpha-value>)",
        surface3: "hsl(var(--surface-3) / <alpha-value>)",
        beacon: "hsl(var(--beacon) / <alpha-value>)",
        sonar: "hsl(var(--sonar) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Entrada sin opacidad: el texto cuenta como pintado desde el primer frame (no retrasa el LCP).
        rise: {
          "0%": { transform: "translateY(16px)" },
          "100%": { transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        rise: "rise 0.6s ease-out both",
        marquee: "marquee 26s linear infinite",
        "float-y": "float-y 4s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(ellipse at 70% 0%, hsl(var(--sonar) / 0.10), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
