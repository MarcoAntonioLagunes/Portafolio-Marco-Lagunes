import { cn } from "@/lib/utils";

const W = 1200;
const H = 900;
const STEPS = 72;
const RINGS = 15;
/** Cada 4ª curva es "maestra": más visible y con su cota de profundidad, como en una carta náutica real. */
const INDEX_EVERY = 4;
const DEPTHS = ["5 m", "20 m", "50 m", "100 m"];

type Point = [number, number];

/** Curva cerrada suave (Catmull-Rom → Bézier cúbica). */
function closedPath(points: Point[]) {
  const n = points.length;
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return `${d}Z`;
}

/** Radio de la curva `i` en el ángulo `t`: armónicos deterministas, así el SSR y el cliente coinciden. */
function radius(i: number, t: number) {
  const wobble =
    Math.sin(2 * t + 0.6 + i * 0.32) * 0.55 + Math.sin(3 * t + 2.1 - i * 0.21) * 0.3 + Math.sin(5 * t + 4.0 + i * 0.47) * 0.15;
  return 70 + i * 46 + wobble * (18 + i * 5.5);
}

function ring(i: number, cx: number, cy: number): Point[] {
  return Array.from({ length: STEPS }, (_, k) => {
    const t = (k / STEPS) * Math.PI * 2;
    const r = radius(i, t);
    return [cx + Math.cos(t) * r * 1.3, cy + Math.sin(t) * r];
  });
}

/**
 * Fondo del hero: curvas batimétricas generadas en el servidor (cero JS en el cliente), con la retícula
 * de coordenadas de Boca del Río. Decorativo (aria-hidden). Las curvas se trazan al cargar (ver .bathymetry).
 */
export function Bathymetry({ className, cx = 860, cy = 420 }: { className?: string; cx?: number; cy?: number }) {
  const labelAngle = Math.PI * 0.82;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("bathymetry pointer-events-none", className)}
    >
      {/* Retícula de carta: meridianos y paralelos con sus coordenadas reales. */}
      <g opacity="0.07">
        {[200, 500, 800, 1100].map((x) => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} stroke="currentColor" strokeDasharray="2 8" />
        ))}
        {[150, 450, 750].map((y) => (
          <line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} stroke="currentColor" strokeDasharray="2 8" />
        ))}
      </g>
      <g opacity="0.35" fontSize="11" letterSpacing="1">
        <text x={1104} y={440}>19°06′N</text>
        <text x={804} y={890}>96°06′W</text>
      </g>

      {Array.from({ length: RINGS }, (_, i) => {
        const isIndex = i % INDEX_EVERY === 1;
        return (
          <path
            key={i}
            d={closedPath(ring(i, cx, cy))}
            pathLength={1}
            strokeWidth={isIndex ? 1.25 : 0.75}
            opacity={isIndex ? 0.32 : 0.14}
            style={{ animationDelay: `${0.15 + i * 0.07}s` }}
          />
        );
      })}

      {/* Cotas sobre las curvas maestras: el trazo de fondo "corta" la línea como en una carta impresa. */}
      {Array.from({ length: RINGS }, (_, i) => i)
        .filter((i) => i % INDEX_EVERY === 1)
        .map((i, n) => {
          const r = radius(i, labelAngle);
          const x = cx + Math.cos(labelAngle) * r * 1.3;
          const y = cy + Math.sin(labelAngle) * r;
          return (
            <text
              key={i}
              x={x}
              y={y}
              fontSize="11"
              textAnchor="middle"
              dominantBaseline="middle"
              opacity="0.6"
              stroke="hsl(var(--background))"
              strokeWidth="6"
              paintOrder="stroke"
            >
              {DEPTHS[n]}
            </text>
          );
        })}
    </svg>
  );
}
