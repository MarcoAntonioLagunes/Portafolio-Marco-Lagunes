# Auditoría del portafolio — Fase 0

**Sitio auditado:** https://portafoliomarcolagunes.netlify.app (producción, commit `d702ffd`)
**Auditoría inicial:** 2026-10-05
**Cierre de verificación Fase 8:** 2026-10-06 (deploy preview de Netlify, rama `portfolio-v2`)
**Herramientas:** Playwright 1.63 (Chrome) para links y SSR, Lighthouse 12 (mobile y desktop), `curl`, `dns.resolve4` de Node y perfiles CDP con CPU 4×.

Severidades:
- **Crítico:** un reclutador lo nota o se pierde un contacto.
- **Medio:** afecta SEO, accesibilidad o rendimiento de forma medible.
- **Bajo:** higiene o consistencia.

---

## Resumen ejecutivo

| # | Hallazgo | Severidad |
|---|---|---|
| C1 | El formulario de contacto **descarta los mensajes y muestra "Mensaje enviado"** | Crítico |
| C2 | El link de **UltraNube (ultranube.com.mx) no resuelve DNS** | Crítico |
| C3 | El link de **MKDevSoft (mkdevsoft.netlify.app) da 404** | Crítico |
| C4 | El footer enlaza a `portafolio-marco-lagunes.netlify.app`, que da **404** | Crítico |
| C5 | og:url, og:image, twitter:image, sitemap y robots apuntan a **marcolagunes.dev, que no existe en DNS** | Crítico |
| C6 | El **H1 "Marco Lagunes" llega vacío** en el HTML SSR | Crítico |
| C7 | Los contadores del hero llegan como **"0+, 0, 0%, 0"** en SSR | Crítico |
| C8 | Performance mobile **50** (TBT 1.58 s, Speed Index 7.0 s) | Crítico |
| M1 | El titular animado se lee "Construyendosoftwareseguro…" sin espacios | Medio |
| M2 | La marquesina del stack duplica las 20 tecnologías para lectores de pantalla (40 `<li>`) | Medio |
| M3 | Videos de **41 MB** (MKDevSoft) y **9.8 MB** (ASOMMMN), sin poster | Medio |
| M4 | `/sounds/boot.mp3` da 404 en cada primera visita (error en consola, penaliza Best Practices) | Medio |
| M5 | No hay `<link rel="canonical">` ni JSON-LD | Medio |
| M6 | Contraste insuficiente en el footer y el fondo de código (Lighthouse a11y) | Medio |
| M7 | "100% uptime operativo" es una métrica sin respaldo | Medio |
| M8 | El CV PDF no tiene links clicables y tiene el link del portafolio roto | Medio |
| B1 | 9 assets con espacios o paréntesis en el nombre | Bajo |
| B2 | 40 archivos de una página web guardada (`videoclipmkdevsoft_files/`, 4.6 MB) publicados en `public/` | Bajo |
| B3 | El CV se llama `Marks_CV.pdf` | Bajo |
| B4 | La tarjeta de MKDevSoft dice "Vercel", pero el sitio está en Netlify | Bajo |
| B5 | LinkedIn está escrito con mayúsculas distintas (`Marco-Lagunes` y `marco-lagunes`) | Bajo |
| B6 | El link del logo tiene un `aria-label` que no coincide con su texto visible (label-content-name-mismatch) | Bajo |
| B7 | Educación dice "Lic. en Ingeniería…", pero el título aún no se emite | Bajo |

---

## 1. Status HTTP de todos los links

Playwright renderizó la home y extrajo cada `a[href]`, `img/video/audio[src]` y meta OG/Twitter. Cada URL se comprobó con HEAD (con GET como respaldo).

| Contexto | Texto / atributo | URL | Status |
|---|---|---|---|
| nav | 9 anclas (#top, #sobre-mi … #contacto) | — | ✅ todas existen |
| hero | Descargar CV | /Marks_CV.pdf | ✅ 200 |
| hero | GitHub | https://github.com/MarcoAntonioLagunes | ✅ 200 |
| hero / contacto | LinkedIn | https://linkedin.com/in/marco-lagunes | ✅ 200 |
| hero / contacto | Email, Teléfono | mailto:, tel: | n/a |
| contacto | WhatsApp | https://wa.me/522201064656 | ✅ 200 |
| proyectos | ASOMMMN | https://reclutamiento-asommmn.netlify.app/ | ✅ 200 |
| proyectos | **UltraNube** | https://ultranube.com.mx/ | ❌ **ENOTFOUND** (sin registro A, también `www.`) |
| proyectos | **MKDevSoft** | https://mkdevsoft.netlify.app/ | ❌ **404** |
| footer | **Portafolio** | https://portafolio-marco-lagunes.netlify.app | ❌ **404** |
| footer | LinkedIn | https://linkedin.com/in/Marco-Lagunes | ✅ 200 (pero inconsistente) |
| head | **og:url** | https://marcolagunes.dev | ❌ **ENOTFOUND** |
| head | **og:image / twitter:image** | https://marcolagunes.dev/images/og-image.png | ❌ **ENOTFOUND** |
| recurso | **audio de arranque** | /sounds/boot.mp3 | ❌ **404** (`public/sounds/` está vacío) |
| recurso | avatar, imágenes, videos | /images/… | ✅ 200 |

Notas:
- `reclutamientoasommmn.netlify.app` (**sin** guion) da **404**. La URL correcta es **con** guion: `reclutamiento-asommmn.netlify.app`.
- Por eso, en el CV el link debe ir **con** guion. Lo que confunde en el PDF es que la URL se parte en dos líneas ("reclutamiento-/asommmn"), y se lee como guion de corte. Ver `docs/cv-fixes.md`.
- **Acción tuya:** confirma la URL real de MKDevSoft y si ultranube.com.mx sigue activo (dominio vencido o DNS sin configurar). Mientras tanto, esos proyectos no deben mostrar un link roto (ver TODO.md).

## 2. Formulario de contacto

- **Servicio:** ninguno. `app/api/contact/route.ts` valida los campos y responde `{"ok":true}` sin enviar nada (tiene un `// TODO: conectar Resend`).
- **Prueba en producción:** `POST /api/contact` → `200 {"ok":true}`.
- **Resultado:** el visitante ve "Mensaje enviado. Gracias por escribir." y **el mensaje se pierde**. No es una falla silenciosa: es un éxito falso. **Crítico.**

## 3. Lighthouse (producción, antes)

| Categoría | Mobile | Desktop |
|---|---|---|
| Performance | **50** | 90 |
| Accessibility | 97 | 97 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

| Métrica mobile | Valor |
|---|---|
| FCP | 2.3 s |
| LCP | 4.3 s |
| **TBT** | **1,580 ms** |
| Speed Index | 7.0 s |
| TTI | 4.8 s |
| Main-thread work | 12.9 s |
| CLS | 0.004 |

Auditorías que fallan:
- **Accessibility:** `color-contrast` (spans `.floating-code` y `text-white/25` del footer) y `label-content-name-mismatch` (logo con `aria-label="Ir al inicio"`).
- **Best Practices:** `errors-in-console` (404 de boot.mp3).
- **Performance:**
  - `mainthread-work-breakdown` / `bootup-time`
  - `unused-javascript` (23–26 KiB)
  - `legacy-javascript` (13 KiB)
  - `uses-responsive-images` (el avatar es un PNG de 1024×1536 y 1.1 MB)
  - `render-blocking` (CSS)
- **SEO:** 100, pero Lighthouse no valida que `og:*` apunte a un dominio inexistente.

## 4. Componentes vacíos o incorrectos en el HTML SSR

HTML obtenido con `curl` (lo que ven Google, LinkedIn y los lectores sin JS):

| Componente | En SSR | Esperado |
|---|---|---|
| **H1 (TerminalName)** | `<h1 aria-label="Marco Lagunes"><span aria-hidden></span>…</h1>`: **texto vacío** | "Marco Lagunes" |
| **Contadores (StatCounter)** | `0+`, `0`, `0%`, `0` | `4+`, `2`, `100%`, `10` |
| **Titular (TypewriterText)** | Texto plano: `Construyendosoftwareseguroylistoparaproducción,deprincipioafin.` | Con espacios. El espaciado sale de `mr-[0.3em]`, no de espacios reales |
| Titular: semántica | `<p role="text">`, un rol no estándar (ARIA no lo define) | `aria-label` + spans `aria-hidden` |
| Terminal del hero | `min-h-[210px]` vacío hasta que corre JS | Aceptable (decorativo), pero debería tener texto con reduced-motion |

## 5. Metadatos OG / Twitter / canonical

| Tag | Valor actual | Problema |
|---|---|---|
| `metadataBase` | https://marcolagunes.dev | El dominio **no existe** (`ENOTFOUND`) |
| `og:url` | https://marcolagunes.dev | ❌ |
| `og:image` | https://marcolagunes.dev/images/og-image.png | ❌ Al compartir en LinkedIn o WhatsApp **no aparece imagen** |
| `twitter:image` | igual | ❌ |
| `canonical` | **ausente** | ❌ |
| sitemap.xml / robots.txt | apuntan a marcolagunes.dev | ❌ Search Console no puede usarlos |
| JSON-LD | ausente | — |
| Imagen OG | `public/images/og-image.png` **existe**, 1200×630, 47 KB | ✅ Pero está desactualizada (acento azul y subtítulo viejo) |

**Conclusión:** marcolagunes.dev no resuelve DNS. Lo trato como **no tuyo**: en la Fase 1 se eliminan todas sus referencias. El email `marcolagunes.dev@proton.me` no es un dominio y se conserva. Si compras el dominio, basta con cambiar `SITE_URL`.

## 6. Assets con espacios o caracteres especiales

Archivos versionados:
- `public/images/asommmn/Interfaz admin.png`
- `public/images/asommmn/Interfaz mkdevsoft.png` (además, sin uso y en la carpeta equivocada)
- `public/images/asommmn/Interfaz postulante.png`
- `public/images/asommmn/Login asommmn.mp4`
- `public/images/asommmn/Panel de documentos y asistente IA.png`
- `public/images/ultranube/agente de presentaciones.png`
- `public/images/ultranube/agente traductor.png`
- `public/images/asommmn/videoclipmkdevsoft_files/js(1)`, `js(2)`

Otros:
- `public/images/ultranube/Dasboard.png`: errata ("Dashboard").
- `public/images/asommmn/videoclipmkdevsoft_files/` contiene 40 archivos (4.6 MB) de una página web guardada desde el navegador, con JS de terceros (`analytics.min.js`, `s.js`). Se publica en el sitio sin uso. **Eliminar.**
- `public/images/asommmn/videoclipmkdevsoft.mp4` (492 KB): sin uso.

## 7. Costo de rendimiento de los decorativos

Medido con CDP `Performance.getMetrics` durante 5 s con CPU 4×, en desktop 1440×900. Son números orientativos: la pintura en headless añade ruido.

| Escenario | Script | Style recalc | Layout |
|---|---|---|---|
| Baseline, mouse quieto | 345 ms | 1,231 ms | 137 ms |
| Baseline, **mouse en movimiento** | **520 ms** | **1,579 ms** | 177 ms |
| Sin animaciones CSS (floating code, blobs, anillos, marquesina) | — | **−38 % de style** (1,452 → 899 ms) | — |
| Sin timers (terminal escribiendo) | — | — | **≈0 ms** |

Hallazgos:
- **CustomCursor:**
  - `setVisible(true)` en **cada** `mousemove` y `setHovering` en cada `mouseover` re-renderizan React.
  - El loop rAF corre **siempre**, aunque el mouse esté quieto.
  - Transiciona `width/height` (provoca layout).
  - No respeta `prefers-reduced-motion`.
  - Mover el mouse suma unos **+175 ms de script y +350 ms de style cada 5 s**.
  - Usa `cursor: none !important` sobre `*`, lo que esconde el cursor en inputs.
- **FloatingCodeBackground:**
  - 13 + 9 + 6 spans con `filter: blur()` y `will-change: transform, opacity` animados **de forma permanente**, aunque no estén en pantalla.
  - Cada uno crea una capa de composición.
  - Es el mayor contribuyente al style recalc (≈ −340 ms al quitarlo) y falla el contraste.
  - Reduced-motion ya está cubierto en CSS, pero no hay lazy/pausa fuera del viewport.
- **Marquesina del stack:** animación `transform` en un `<ul>` de 40 items. Es barata en GPU, pero duplica el contenido para lectores de pantalla y se renderiza con un árbol distinto según `useReducedMotion` (riesgo de hydration mismatch).
- **Otros con costo continuo:**
  - Terminal del hero: un `setState` cada 45 ms, sin fin, incluso fuera de pantalla. Es lo único que provoca layout continuo.
  - 4 canvas de partículas: ya pausan fuera del viewport ✅.
  - 3 blobs con `blur(80px)`, el anillo cónico del avatar y el sweep del footer.
- **Imágenes:** avatar PNG de 1.1 MB. MKDevSoft: video de **41 MB** con autoplay al entrar en viewport, que en mobile consume datos.

---

## Confirmación de los problemas que ya detectaste

| Problema reportado | Veredicto | Evidencia |
|---|---|---|
| El footer enlaza a portafolio-marco-lagunes.netlify.app (404) | ✅ **Confirmado** | `curl` → 404 |
| og:image, og:url y twitter:image apuntan a marcolagunes.dev | ✅ **Confirmado**, y el dominio no resuelve DNS | Sitemap, robots y metadataBase también |
| Contadores "0+, 0, 0%, 0" en SSR | ✅ **Confirmado** | HTML SSR |
| Titular "Construyendosoftwareseguro…" sin espacios | ✅ **Confirmado** | textContent del `<p>` |
| Videos con espacios ("Login asommmn.mp4") | ✅ **Confirmado** | Más 6 imágenes con espacios |
| El CV se llama Marks_CV.pdf | ✅ **Confirmado** | — |
| MKDevSoft dice "Vercel", pero está en Netlify | ✅ **Confirmado** | `lib/data.ts` |
| La marquesina duplica la lista para lectores de pantalla | ✅ **Confirmado** | 40 `<li>` sin `aria-hidden` |
| LinkedIn con mayúsculas distintas | ✅ **Confirmado** | Footer `Marco-Lagunes` vs datos `marco-lagunes`. El CV también usa `Marco-Lagunes` |

Nuevos hallazgos que no estaban en tu lista: C1, C2, C3, C6, C8, M3, M4, M5, M6, B2.

---

## Fase 8 — verificación final (2026-10-06)

### Validaciones funcionales

| Verificación | Resultado |
|---|---|
| `npm run build` | ✅ Correcto; prerenderizó home ES/EN, los 6 casos de estudio, ambos CV, OG images, `robots.txt` y `sitemap.xml`. |
| `npx tsc --noEmit` | ✅ Sin errores. |
| `npm run lint` | ✅ Sin errores ni warnings. |
| Links del HTML en el deploy preview | ✅ 34 links HTTP únicos: 25 internos y 9 externos; los 34 respondieron `200`. `mailto:` y `tel:` se excluyeron porque no son URLs HTTP. |
| Anclas de la home ES | ✅ Los 20 links con fragmento apuntan a IDs presentes (`#contenido`, `#top` y las anclas de secciones). |
| Responsive | ✅ Probado en 375, 768 y 1440 px; sin overflow horizontal. |
| Teclado | ✅ Foco visible al recorrer navegación; en móvil el menú abre, Escape lo cierra y el foco vuelve al botón. |
| Rutas y redirects en Netlify | ✅ `/` usa `Accept-Language` y cookie; `/proyectos/...` se traduce a `/projects/...` en inglés. El CV anterior `/Marks_CV.pdf` redirige con 301 al nuevo PDF. |
| Recursos y SEO técnico | ✅ PDFs, videos, posters, imágenes OG, `robots.txt` y `sitemap.xml` responden `200`. La sitemap publica las 8 URLs localizadas y sus hreflang. |
| Links externos muertos encontrados en Fase 0 | ✅ UltraNube y MKDevSoft no muestran link de demo mientras sus URLs reales no se confirmen. |
| Assets publicados | ✅ Ya no hay nombres con espacios o paréntesis en `public/images`; también se quitó la carpeta guardada `videoclipmkdevsoft_files/`. |
| Formulario Netlify | ⚠️ Validación vacía muestra tres errores, enfoca el primer campo y no envía. Un envío válido en el preview obtiene `404` de `/__forms.html` y muestra estado de error, no un falso éxito. Falta activar Form detection en la cuenta de Netlify y repetir el envío. |

### Lighthouse en el deploy preview

Lighthouse 12.8.2, Chrome, una ejecución por ruta/dispositivo, el 2026-10-06. Las cifras se muestran tal cual; no se omiten los resultados por debajo de la meta.

| Ruta | Dispositivo | Performance | Accesibilidad | Best Practices | SEO | FCP | LCP | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/es` | Mobile | 59 | 100 | 96 | 69 | 2.1 s | 4.5 s | 740 ms |
| `/es` | Desktop | 78 | 100 | 96 | 69 | 0.9 s | 1.4 s | 240 ms |
| `/en` | Mobile | 43 | 100 | 96 | 69 | 2.7 s | 5.0 s | 1,880 ms |
| `/en` | Desktop | 83 | 100 | 96 | 69 | 1.2 s | 1.6 s | 100 ms |
| Caso ASOMMMN ES | Mobile | 43 | 100 | 96 | 66 | 2.5 s | 6.5 s | 1,400 ms |
| Caso ASOMMMN ES | Desktop | 88 | 100 | 96 | 66 | 0.7 s | 1.4 s | 140 ms |

**La meta de Performance ≥90 aún no se cumple**: el rango medido es 43–59 en mobile y 78–88 en desktop. El cuello de botella incluye ejecución/hidratación de JavaScript, trabajo de main thread y renderizado; hacen falta más optimizaciones antes de afirmar que el objetivo se alcanzó.

Las categorías SEO/Best Practices del preview no representan una evaluación limpia de producción: Netlify añade `X-Robots-Tag: noindex` al deploy preview (Lighthouse reporta `is-crawlable = 0`) y el drawer de colaboración inyecta `/.netlify/scripts/cdp`, que genera `inspector-issues`. El `noindex` del preview es intencional; no se debe quitar para inflar esos puntajes. Se debe revisar SEO y Best Practices de nuevo cuando la rama esté desplegada en el dominio productivo.

### Antes / después

| Hallazgo inicial | Estado al cierre |
|---|---|
| El formulario contestaba éxito sin entregar el mensaje | ✅ El éxito solo aparece después de un POST aceptado; el preview devuelve error visible hasta activar Netlify Forms. |
| URLs rotas de UltraNube y MKDevSoft | ✅ Se ocultan los links de demo hasta confirmar URLs; repos públicos responden `200`. |
| Footer enlazaba a un dominio de portafolio incorrecto | ✅ Un solo `SITE_URL`; el home productivo responde `200`. |
| `marcolagunes.dev` en OG, canonical, sitemap y robots | ✅ Metadata localizada, canonical/hreflang y sitemap apuntan al host Netlify. El texto `marcolagunes.dev` que permanece es solo parte del email proporcionado. |
| H1 vacío, métricas iniciales en cero y titular sin espacios | ✅ Nombre y valores finales presentes en SSR; titular con texto accesible y espacios reales. |
| Videos pesados o sin poster | ✅ Videos renombrados y comprimidos: ASOMMMN 9.8 MB → 1.57 MB; MKDevSoft 41 MB → 2.20 MB. Ambos con poster, `preload="metadata"`, `muted`, `playsInline` y `loop`. |
| Intro intentaba cargar un MP3 inexistente | ✅ El audio no se renderiza ni solicita si falta el archivo. |
| Problemas de contraste/label y duplicación accesible de la marquesina | ✅ Lighthouse reporta Accesibilidad 100 en las seis páginas; hit areas de galería ampliadas y el duplicado decorativo se oculta a lectores de pantalla. |
| CV `Marks_CV.pdf` y links del CV no imprimibles | ✅ CV ES y résumé EN generados desde el perfil, con links clicables; redirect 301 conserva la ruta antigua. |
| Lighthouse mobile 50 / desktop 90 en el baseline anterior | ⚠️ Accesibilidad sube de 97 a 100; Best Practices medido en preview queda en 96 y SEO queda afectado por `noindex`; Performance sigue bajo la meta y requiere otra iteración. |
