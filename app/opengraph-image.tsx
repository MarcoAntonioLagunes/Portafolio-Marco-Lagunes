import { ImageResponse } from "next/og";
import { getProfile } from "@/content";
import { SITE_HOST } from "@/lib/site";

export const alt = "Marco Lagunes — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen OG generada en build desde el perfil, con la estética dark/terminal del sitio. */
export default function OpengraphImage() {
  const { person, hero } = getProfile();
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
          background: "radial-gradient(circle at 15% 0%, rgba(124,111,224,0.35), transparent 55%), #06090F",
          color: "#F8FAFC",
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
              borderRadius: 16,
              background: "#131c2e",
              color: "#8b7ff0",
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
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(110,231,183,0.45)",
              color: "#6ee7b7",
              fontSize: 22,
            }}
          >
            ● {hero.badge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -2, color: "#E4E0FF" }}>{person.name}</div>
          <div style={{ marginTop: 12, fontSize: 32, color: "#8b7ff0" }}>{hero.subtitle}</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#cbd5e1", maxWidth: 980 }}>{hero.headline}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#94a3b8" }}>
          <span>$ whoami</span>
          <span>{SITE_HOST}</span>
        </div>
      </div>
    ),
    size,
  );
}
