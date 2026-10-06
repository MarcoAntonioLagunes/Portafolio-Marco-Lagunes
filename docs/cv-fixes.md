# Correcciones al CV PDF actual

Archivo revisado: `public/Marco_Lagunes_CV.pdf` (antes `Marks_CV.pdf`), 1 página. El texto se extrajo con `pypdf` y los links se verificaron con `curl` el 2026-10-05.

Orden: de lo que más ve un reclutador a lo menos visible.

## 1. Las que pediste

### 1.1 Link del portafolio roto
- **Dice:** `portafolio-marco-lagunes.netlify.app` (con guiones). Da **404**.
- **Debe decir:** `portafoliomarcolagunes.netlify.app`
- Mejor aún, enlaza directo al idioma: `portafoliomarcolagunes.netlify.app/es` en el CV en español y `/en` en el résumé en inglés.

### 1.2 Link de ASOMMMN: el guion **sí** va
- Revisé ambas variantes:
  - `reclutamiento-asommmn.netlify.app` (**con** guion) → **200**. Es la correcta.
  - `reclutamientoasommmn.netlify.app` (**sin** guion) → **404**.
- **No quites el guion.** El problema real es que en la tarjeta de proyectos la URL se parte en dos líneas ("reclutamiento-" / "asommmn.netlify.app"), y el guion parece un corte de palabra.
- **Corrección:** evita el salto de línea. Reduce el tamaño de fuente de esa línea, pon la URL en su propia línea o usa `nowrap`.

### 1.3 Agregar la maestría
En **Educación**, arriba de la ingeniería:

> **Maestría en Ciencia de Datos** — [COMPLETAR: universidad]
> [COMPLETAR: mes año de inicio] – presente · Título esperado: [COMPLETAR: mes año]

Agrégala también en el titular del perfil, igual que en el sitio:
> Full-Stack Developer · Estudiante de Maestría en Ciencia de Datos

### 1.4 "Ing." → carrera concluida, sin título
- **Dice:** `Ing. en Sistemas Computacionales · 2022 — 2026`
- **Debe decir:** `Ingeniería en Sistemas Computacionales · Universidad Cristóbal Colón · 2022 – 2026` y, en la línea siguiente, `Carrera concluida · titulación vía maestría`.
- Revisa también el perfil profesional: dice "Ingeniero en Sistemas Computacionales con certificación…". Cámbialo por "Desarrollador full-stack con la carrera de Ingeniería en Sistemas Computacionales concluida y certificación…", que es la misma redacción del sitio.

### 1.5 Años de liderazgo
- **Dice:** "más de cuatro años dirigiendo equipos operativos".
- **Pediste:** "3+ años".
- ⚠️ **Ojo con la fecha:** el liderazgo empieza en **nov. 2023** (Entrenador). A hoy, octubre de 2026, son **2 años y 11 meses**, así que "3+ años" será cierto a partir de **noviembre de 2026**.
  - Hasta entonces: "casi 3 años liderando equipos" o "liderando equipos desde 2023".
  - Desde nov. 2026: "3+ años liderando equipos".
  - El sitio ya hace este cálculo solo (muestra "2+" hoy y "3+" desde noviembre).

## 2. Otras correcciones que encontré

### 2.1 Los links del PDF no son clicables
El PDF no tiene anotaciones de enlace: LinkedIn, GitHub, el portafolio y los proyectos son texto plano. Muchos reclutadores revisan el CV en pantalla. Al exportar:
- **Canva / Figma:** selecciona cada texto y asígnale el link (Canva: botón de enlace; Figma: *Link*). Exporta como "PDF estándar", no "PDF para imprimir".
- **Word / Google Docs:** Ctrl+K sobre cada URL.

### 2.2 Typo
- **Dice:** "Arquitecturé y construí desde cero…"
- **Debe decir:** "Arquitecté y construí desde cero…"

### 2.3 "Misión crítica"
Aparece dos veces ("plataforma de misión crítica", "Sistema full-stack de misión crítica"). Cámbialo por **"plataforma en producción, usada por evaluadores reales"**, como en el sitio. Es más verificable y no exagera.

### 2.4 Nombre de ASOMMMN
- **Dice:** "Asociación de Oficiales de la Marina Mercante Nacional".
- La propia plataforma muestra **"Asociación Sindical de Oficiales de Máquinas de la Marina Mercante Nacional"**, que es el nombre que corresponde a las siglas A-S-O-M-M-M-N.

### 2.5 Encabezado de McDonald's
- **Dice:** "Gerente de Turno & Líder de Experiencia al Cliente · NOV 2022 — PRESENTE". Se lee como si fueras gerente desde 2022.
- **Sugerencia (igual que el sitio):** "Liderazgo operativo — McDonald's (Arcos Dorados) · 2022 – Presente", con una línea de progresión: Crew Member (2022) → Entrenador (2023) → Gerente de Área (2024) → Gerente de Turno (2025) → Líder de Experiencia al Cliente (2026).

### 2.6 Links de proyectos caídos
- **MKDevSoft:** `mkdevsoft.netlify.app` → **404**. Corrige la URL o quítala mientras tanto.
- **UltraNube:** `ultranube.com.mx` → **no resuelve DNS**. No lo pongas como link hasta que vuelva a estar en línea. Puedes enlazar el repo `github.com/MarcoAntonioLagunes/UltraNube`.

### 2.7 LinkedIn
- **Dice:** `linkedin.com/in/Marco-Lagunes`.
- **Estandarízalo a:** `linkedin.com/in/marco-lagunes` (minúsculas), igual que en el sitio.

### 2.8 Nombre del archivo
Ya está renombrado en el sitio a `Marco_Lagunes_CV.pdf` (el link viejo `/Marks_CV.pdf` redirige). Cuando subas la versión corregida, usa ese mismo nombre.

## 3. Versión en inglés

Falta `public/Marco_Lagunes_Resume.pdf`. Mientras no exista, el botón de `/en` dice "PDF coming soon". Opciones:
- Tradúcelo partiendo de `content/profile.en.ts`, que ya tiene todos los textos en inglés.
- O usa la ruta imprimible `/en/cv` (ver sección 4): ábrela en Chrome, *Imprimir → Guardar como PDF*, y guárdala como `public/Marco_Lagunes_Resume.pdf`.

## 4. Propuesta: CV generado desde el sitio (`/es/cv` y `/en/cv`)

**Ya está implementada.** `/es/cv` y `/en/cv` son una versión imprimible del CV generada desde `content/profile.*.ts`. Así el CV y el sitio **nunca se desincronizan**: corriges un dato una vez y cambia en ambos.

- Diseño claro, de una columna, pensado para ATS (los sistemas de reclutamiento leen mejor texto lineal que columnas y gráficos).
- Con `Ctrl+P` se ocultan navbar, footer y decoraciones, y queda en formato carta.
- Todos los links son clicables en el PDF resultante.
- Flujo sugerido: corrige el perfil → abre `/es/cv` → *Guardar como PDF* → reemplaza `public/Marco_Lagunes_CV.pdf`. Repite con `/en/cv` → `Marco_Lagunes_Resume.pdf`.

Si prefieres conservar tu diseño actual de Canva, úsalo y aplica las correcciones de las secciones 1 y 2. La ruta `/cv` queda como respaldo y como fuente de verdad del texto.
