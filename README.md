# Portafolio — Marco Lagunes

Portafolio personal de Marco Lagunes (Full-Stack Developer · Maestría en Ciencia de Datos).
Desplegado en Netlify: **https://portafoliomarcolagunes.netlify.app**

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3 y Framer Motion. Netlify Forms para el contacto.

## Correr en local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run lint
```

## Dónde se edita el contenido

**Todo el texto del sitio sale de una sola fuente.** Los componentes no tienen texto propio.

| Archivo | Qué contiene |
|---|---|
| `content/profile.es.ts` | Perfil en español: hero, métricas, experiencia, proyectos y casos de estudio, educación, certificaciones, stack, "Ahora mismo" y textos de interfaz |
| `content/types.ts` | Esquema que debe cumplir cada perfil |
| `content/derived.ts` | Valores calculados en el build, como los años de liderazgo desde `LEADERSHIP_SINCE` |
| `lib/site.ts` | URL del sitio (`SITE_URL`), GitHub, LinkedIn y ruta del CV |

Los datos pendientes aparecen en el sitio como `[COMPLETAR: ...]`, resaltados, y se listan en `TODO.md`.

### Agregar un proyecto

Agrega un objeto a `projects` en el perfil, con un `slug` único. Con eso se generan solos:
- la tarjeta del home,
- la página `/proyectos/<slug>`,
- su imagen OG,
- su diagrama de arquitectura (a partir de `caseStudy.architecture`).

## Formulario de contacto (Netlify Forms)

- `public/__forms.html` contiene el formulario estático que Netlify detecta en el build. Sus campos deben coincidir con `components/ContactForm.tsx`.
- El componente envía por `fetch` un POST a `/__forms.html`, con honeypot `bot-field`.
- En Netlify: *Site configuration → Forms → Form detection* debe estar activado. Configura las notificaciones por email en *Forms → Notifications*.
- En `npm run dev` el envío falla (no hay Netlify), así que el formulario muestra su estado de error. Es lo esperado.

## Rebuild diario

La sección **"Ahora mismo"** muestra los 3 repos públicos con push más reciente (API de GitHub, `revalidate` de 24 h). Algunos valores, como los años de liderazgo, se calculan en el build. Un rebuild diario mantiene ambos al día.

1. **Crea el Build Hook en Netlify:** *Site configuration → Build & deploy → Continuous deployment → Build hooks → Add build hook*. Nómbralo, por ejemplo, `rebuild-diario`, con la rama `main`. Copia la URL (`https://api.netlify.com/build_hooks/...`).
2. **Guárdala como secret en GitHub:** *Settings → Secrets and variables → Actions → New repository secret*.
   - Nombre: `NETLIFY_BUILD_HOOK_URL`
   - Valor: la URL del paso 1.
3. **Listo.** `.github/workflows/daily-rebuild.yml` hace un POST al hook todos los días a las 12:00 UTC (06:00 en Veracruz). Puedes dispararlo a mano desde *Actions → Rebuild diario en Netlify → Run workflow*.

Probar el hook desde la terminal:

```bash
curl -X POST -d '{}' "https://api.netlify.com/build_hooks/<ID>"
```

> La URL del hook permite disparar builds: trátala como secreto y no la pongas en el código.

**Opcional:** define la variable `GITHUB_TOKEN` en Netlify (*Site configuration → Environment variables*), con un token sin permisos (solo lectura pública), para subir el límite de la API de GitHub durante el build. Sin token también funciona: si la API falla, la sección muestra un link al perfil en lugar de los repos.

## Despliegue

`netlify.toml` define el build (`npm run build`) y el redirect 301 de `/Marks_CV.pdf` a `/Marco_Lagunes_CV.pdf`, para no romper links viejos al CV.
