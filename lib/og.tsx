import { ImageResponse } from "next/og";
import { SITE_HOST } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

/** Plantilla de imágenes OG con la estética de carta náutica del sitio. */
export function renderOgImage({ badge, title, subtitle, body, footerLeft }: { badge: string; title: string; subtitle: string; body?: string; footerLeft: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 0%, rgba(79,209,197,0.22), transparent 55%), #071319",
          color: "#EAF2F0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 10, border: "2px solid rgba(255,181,71,0.5)",
              background: "#0C1E26",
              color: "#FFB547",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            ML
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(79,209,197,0.45)",
              color: "#4FD1C5",
              fontSize: 22,
            }}
          >
            ● {badge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: title.length > 24 ? 72 : 92, fontWeight: 700, letterSpacing: -2, color: "#EAF2F0" }}>{title}</div>
          <div style={{ marginTop: 12, fontSize: 32, color: "#FFB547" }}>{subtitle}</div>
          {body && <div style={{ marginTop: 28, fontSize: 28, color: "#C9D8DA", maxWidth: 1000 }}>{body}</div>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#93ADB3" }}>
          <span>{footerLeft}</span>
          <span>{SITE_HOST}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
