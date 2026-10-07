import { WithPlaceholders } from "@/components/WithPlaceholders";
import type { ArchitectureDiagram as Diagram } from "@/content/types";

type Box = { x: number; y: number; w: number; h: number };
type Orientation = "horizontal" | "vertical";

const NODE_H = 76;
const GAP = 36;
const TITLE_H = 34;

/** Calcula la posición de cada nodo: capas en columnas (horizontal) o en filas (vertical). */
function layout(diagram: Diagram, orientation: Orientation) {
  const boxes = new Map<string, Box>();
  const titles: { text: string; x: number; y: number }[] = [];
  const maxNodes = Math.max(...diagram.layers.map((l) => l.nodes.length));

  if (orientation === "horizontal") {
    const width = 960;
    const colW = width / diagram.layers.length;
    const nodeW = Math.min(210, colW - 110);
    const height = TITLE_H + maxNodes * NODE_H + (maxNodes - 1) * GAP + 16;
    diagram.layers.forEach((layer, li) => {
      const cx = colW * li + colW / 2;
      titles.push({ text: layer.title, x: cx, y: 18 });
      const stackH = layer.nodes.length * NODE_H + (layer.nodes.length - 1) * GAP;
      const top = TITLE_H + (height - TITLE_H - stackH) / 2;
      layer.nodes.forEach((node, ni) => {
        boxes.set(node.id, { x: cx - nodeW / 2, y: top + ni * (NODE_H + GAP), w: nodeW, h: NODE_H });
      });
    });
    return { width, height, boxes, titles };
  }

  const width = 360;
  const rowGap = 76;
  let y = 0;
  diagram.layers.forEach((layer) => {
    titles.push({ text: layer.title, x: 0, y: y + 16 });
    y += TITLE_H;
    const n = layer.nodes.length;
    const nodeW = (width - (n - 1) * 16) / n;
    layer.nodes.forEach((node, ni) => {
      boxes.set(node.id, { x: ni * (nodeW + 16), y, w: nodeW, h: NODE_H });
    });
    y += NODE_H + rowGap;
  });
  return { width, height: y - rowGap + 8, boxes, titles };
}

function edgePath(a: Box, b: Box, orientation: Orientation) {
  if (orientation === "horizontal" && b.x > a.x + a.w) {
    const x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = b.x - 6, y2 = b.y + b.h / 2;
    const mx = (x1 + x2) / 2;
    return { d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, lx: mx, ly: (y1 + y2) / 2 };
  }
  if (orientation === "horizontal") {
    // Misma columna: conexión vertical.
    const x = a.x + a.w / 2, y1 = a.y + a.h, y2 = b.y - 6;
    return { d: `M${x},${y1} L${x},${y2}`, lx: x, ly: (y1 + y2) / 2 };
  }
  const x1 = a.x + a.w / 2, y1 = a.y + a.h, x2 = b.x + b.w / 2, y2 = b.y - 6;
  const my = (y1 + y2) / 2;
  // Etiqueta en el hueco entre filas, sobre el tramo cercano al destino: no choca con títulos ni con otras conexiones.
  return { d: `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`, lx: x1 + (x2 - x1) * 0.8, ly: b.y - TITLE_H - 2 };
}

/** Parte una etiqueta en dos líneas por el espacio más cercano al centro si excede `max` caracteres. */
function splitLabel(label: string, max: number): string[] {
  if (label.length <= max || !label.includes(" ")) return [label];
  const mid = label.length / 2;
  let cut = -1;
  for (let i = 0; i < label.length; i++) if (label[i] === " " && (cut === -1 || Math.abs(i - mid) < Math.abs(cut - mid))) cut = i;
  return [label.slice(0, cut), label.slice(cut + 1)];
}

function DiagramSvg({ diagram, orientation, labelledBy, className }: { diagram: Diagram; orientation: Orientation; labelledBy: string; className?: string }) {
  const { width, height, boxes, titles } = layout(diagram, orientation);
  const markerId = `arrow-${orientation}-${labelledBy}`;
  const fontScale = orientation === "vertical" ? 0.92 : 1;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-labelledby={labelledBy}>
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--accent))" />
        </marker>
      </defs>

      {titles.map((t) => (
        <text key={`${t.text}-${t.y}`} x={t.x} y={t.y} textAnchor={orientation === "vertical" ? "start" : "middle"} fill="hsl(var(--muted-foreground))" fontSize={11 * fontScale} fontFamily="var(--font-jetbrains-mono), monospace" letterSpacing="2">
          {t.text.toUpperCase()}
        </text>
      ))}

      {diagram.edges.map((edge) => {
        const a = boxes.get(edge.from);
        const b = boxes.get(edge.to);
        if (!a || !b) return null;
        const { d } = edgePath(a, b, orientation);
        return (
          <path key={`${edge.from}-${edge.to}`} d={d} fill="none" stroke="hsl(var(--accent) / 0.7)" strokeWidth="1.5" markerEnd={`url(#${markerId})`} />
        );
      })}

      {diagram.layers.flatMap((layer) =>
        layer.nodes.map((node) => {
          const box = boxes.get(node.id)!;
          return (
            <g key={node.id}>
              <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="12" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
              <text x={box.x + box.w / 2} y={box.y + (node.detail ? 31 : box.h / 2 + 5)} textAnchor="middle" fill="hsl(var(--foreground))" fontSize={14 * fontScale} fontWeight="600" fontFamily="var(--font-sans), sans-serif">
                {node.label}
              </text>
              {node.detail && (
                <text x={box.x + box.w / 2} y={box.y + 52} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize={11 * fontScale} fontFamily="var(--font-sans), sans-serif">
                  {node.detail.length > 34 ? `${node.detail.slice(0, 33)}…` : node.detail}
                </text>
              )}
            </g>
          );
        }),
      )}

      {/* Etiquetas al final para que queden sobre flechas y nodos; las largas se parten en dos líneas. */}
      {diagram.edges.map((edge) => {
        const a = boxes.get(edge.from);
        const b = boxes.get(edge.to);
        if (!a || !b || !edge.label) return null;
        const { lx, ly } = edgePath(a, b, orientation);
        const lines = splitLabel(edge.label, orientation === "horizontal" ? 14 : 30);
        return (
          <text key={`label-${edge.from}-${edge.to}`} x={lx} y={ly - 6 - (lines.length - 1) * 12} textAnchor="middle" fill="hsl(var(--beacon))" fontSize={10.5 * fontScale} fontFamily="var(--font-jetbrains-mono), monospace" paintOrder="stroke" stroke="hsl(var(--card))" strokeWidth="4">
            {lines.map((line, i) => (
              <tspan key={i} x={lx} dy={i === 0 ? 0 : 12}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}

/**
 * Diagrama de arquitectura en SVG generado desde los datos del perfil (sin dependencias).
 * Horizontal en desktop, vertical en mobile. El texto de los nodos y conexiones también se expone
 * como lista para lectores de pantalla (el SVG es una imagen con nombre).
 */
export function ArchitectureDiagram({ diagram, id, label }: { diagram: Diagram; id: string; label: string }) {
  const titleId = `${id}-title`;
  return (
    <figure className="rounded-xl border border-border bg-card p-4 sm:p-6">
      <span id={titleId} className="sr-only">{label}</span>
      <DiagramSvg diagram={diagram} orientation="horizontal" labelledBy={titleId} className="hidden h-auto w-full md:block" />
      <DiagramSvg diagram={diagram} orientation="vertical" labelledBy={titleId} className="mx-auto h-auto w-full max-w-sm md:hidden" />
      <ul className="sr-only">
        {diagram.layers.flatMap((layer) =>
          layer.nodes.map((node) => (
            <li key={node.id}>
              {layer.title}: {node.label}
              {node.detail ? ` (${node.detail})` : ""}
            </li>
          )),
        )}
        {diagram.edges.map((edge) => {
          const name = (nodeId: string) => diagram.layers.flatMap((l) => l.nodes).find((n) => n.id === nodeId)?.label ?? nodeId;
          return (
            <li key={`${edge.from}-${edge.to}`}>
              {name(edge.from)} → {name(edge.to)}
              {edge.label ? `: ${edge.label}` : ""}
            </li>
          );
        })}
      </ul>
      <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">
        <WithPlaceholders text={diagram.caption} />
      </figcaption>
    </figure>
  );
}
