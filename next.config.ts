import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/**
 * Lista de archivos de public/ calculada en el build e inyectada como constante.
 * Permite saber si existe un PDF/imagen/audio sin usar fs en runtime: en Netlify, las páginas
 * regeneradas (ISR) corren en funciones donde public/ no necesariamente está en disco.
 */
function listPublicFiles(dir = path.join(process.cwd(), "public"), base = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = `${base}/${entry.name}`;
    return entry.isDirectory() ? listPublicFiles(path.join(dir, entry.name), rel) : [rel];
  });
}

const nextConfig: NextConfig = {
  env: {
    PUBLIC_FILES: listPublicFiles().join("|"),
  },
};

export default nextConfig;
