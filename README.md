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

### CV imprimible

`/es/cv` y `/en/cv` generan el CV desde el perfil, en una columna compatible con ATS y con links clicables. Para actualizar el PDF, abre la ruta en Chrome, usa *Imprimir → Guardar como PDF* y reemplaza:
- `public/Marco_Lagunes_CV.pdf` (versión en español)
- `public/Marco_Lagunes_Resume.pdf` (versión en inglés)

Más detalles en `docs/cv-fixes.md`.

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

## Analytics (Umami, sin cookies)

El script solo se carga si existe la variable `NEXT_PUBLIC_UMAMI_WEBSITE_ID`. Sin ella no se carga nada.

1. Crea una cuenta en [Umami Cloud](https://cloud.umami.is) (plan gratuito) y agrega el sitio `portafoliomarcolagunes.netlify.app`.
2. Copia el *Website ID* y defínelo en Netlify (*Site configuration → Environment variables*) como `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
3. Si usas Umami self-hosted, define también `NEXT_PUBLIC_UMAMI_SRC` con la URL de tu `script.js`.
4. Haz un nuevo deploy: la variable se incorpora en el build.

Eventos que se registran (definidos en `lib/analytics.ts`):

| Evento | Cuándo | Propiedades |
|---|---|---|
| `download_cv` | Clic en "Descargar CV" | `locale` |
| `click_linkedin` / `click_github` / `click_whatsapp` / `click_email` / `click_phone` | Clic en esos links | `locale` |
| `click_project_demo` | Clic en el link al sitio de un proyecto | `locale`, `project` |
| `contact_form_submit` | Envío exitoso del formulario | `locale` |
| `case_study_view` | Visita a un caso de estudio | `slug`, `locale` |
| `change_language` | Uso del selector de idioma | `locale`, `to` |

Para registrar un evento nuevo en cualquier componente, incluso de servidor, agrega `data-event="nombre"` al elemento. Los atributos `data-event-*` se envían como propiedades. Cambiar de proveedor implica editar solo `lib/analytics.ts` y `components/Analytics.tsx`.

## SEO

- Rutas por idioma: `/es` y `/en`. `proxy.ts` redirige `/` según la cookie `NEXT_LOCALE` (elección manual) o el `Accept-Language`.
- Cada página tiene `canonical` y `hreflang` (`es`, `en`, `x-default`). `sitemap.xml` incluye las alternativas.
- JSON-LD `Person` por idioma en el home, generado desde el perfil (`lib/seo.ts`).
- Imágenes OG generadas con `next/og` para el home y cada caso de estudio.

## Despliegue

`netlify.toml` define el build (`npm run build`) y el redirect 301 de `/Marks_CV.pdf` a `/Marco_Lagunes_CV.pdf`, para no romper links viejos al CV.
