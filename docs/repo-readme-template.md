<!--
  Plantilla de README para los repos fijados (ASOMMMN-APP-WEB, UltraNube / ultranube-backend, mkdevsoft).
  Cómo usarla: copia este archivo como README.md del repo y reemplaza todo lo que está entre < >.
  Mantén el README en inglés (lo leen reclutadores de varios países). Si quieres, agrega un resumen
  en español al final dentro de un <details>.
  La captura es lo más importante: es lo primero que se ve.
-->

# <Nombre del proyecto>

<Una línea: qué es y para quién. Ej.: "Full-stack platform that digitizes résumé evaluation for a national merchant marine officers' association.">

![Status](https://img.shields.io/badge/status-<in%20production|in%20development>-<brightgreen|yellow>)
![Stack](https://img.shields.io/badge/stack-<React%20·%20Node.js%20·%20MongoDB>-7c6fe0)

**🔗 Live demo:** <https://...> · **📖 Case study:** <https://portafoliomarcolagunes.netlify.app/en/projects/<slug>>

![Screenshot of <proyecto>](./docs/screenshot.png)
<!-- Guarda una captura de 1600×900 aprox. en docs/screenshot.png. Un GIF corto (<5 MB) del flujo principal funciona aún mejor. -->

## The problem

<2–3 líneas: cómo se hacía antes y por qué era un problema. Mismo texto que "Problema" en el caso de estudio.>

## Features

- <Funcionalidad 1, p. ej. "Role-based access: applicant, evaluator and admin">
- <Funcionalidad 2, p. ej. "JWT authentication with protected REST endpoints">
- <Funcionalidad 3, p. ej. "Document panel with AI-assisted review">
- <Funcionalidad 4>

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | <React / Next.js, Tailwind CSS> |
| Backend | <Node.js / NestJS, REST API> |
| Database | <MongoDB> |
| Auth | <JWT, roles> |
| Hosting | <Netlify / proveedor del backend> |

## Architecture

```
<Browser> ──HTTPS──▶ <Frontend en Netlify>
    │
    └──REST + JWT──▶ <API Node.js> ──▶ <MongoDB>
                           └──────────▶ <Servicio de IA (si aplica)>
```

<1–2 líneas explicando el flujo. Puedes copiar el pie del diagrama del caso de estudio.>

## Getting started

### Prerequisites
- Node.js <20+>
- <MongoDB local o una URI de MongoDB Atlas>

### Installation

```bash
git clone https://github.com/MarcoAntonioLagunes/<repo>.git
cd <repo>
npm install
cp .env.example .env   # completa las variables
npm run dev            # http://localhost:<puerto>
```

### Environment variables

| Variable | Description |
|---|---|
| `<MONGODB_URI>` | <Connection string> |
| `<JWT_SECRET>` | <Secret used to sign tokens> |

> ⚠️ Nunca subas `.env` al repo. Incluye solo un `.env.example` con valores falsos.

## Security notes

- <Cómo se guardan las contraseñas (p. ej. bcrypt)>
- <Expiración de tokens y validación por rol en cada endpoint>
- <Validación de archivos subidos (tipo y tamaño)>

## Roadmap

- [ ] <Siguiente mejora>
- [ ] <Tests automatizados / CI>

## Author

**Marco Lagunes** — Full-Stack Developer · [Portfolio](https://portafoliomarcolagunes.netlify.app/en) · [LinkedIn](https://linkedin.com/in/marco-lagunes)
