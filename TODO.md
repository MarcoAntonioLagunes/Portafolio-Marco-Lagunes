# TODO: datos y acciones pendientes de Marco

Todo lo que aparece en el sitio como `[COMPLETAR: ...]` está listado aquí, con el archivo donde se edita.
Al completar un dato, bórralo de esta lista.

## Acciones en Netlify / dominios

- [ ] **Netlify Forms:** en *Site configuration → Forms*, verifica que **Form detection** esté activado. Después del primer deploy debe aparecer el formulario `contacto`. En *Forms → Notifications* agrega tu email para recibir cada mensaje.
- [ ] **UltraNube:** `ultranube.com.mx` no resuelve DNS (dominio vencido o sin registro A). Renueva o configura el dominio, o dame la URL nueva. Mientras tanto, el link del proyecto queda oculto.
- [ ] **MKDevSoft:** `mkdevsoft.netlify.app` da 404. Confirma la URL real del sitio. Mientras tanto, el link queda oculto.
- [ ] **MKDevSoft (en su propio sitio):** el video del recorrido muestra "Desplegado en Vercel" en la terminal del hero de MKDevSoft. Si ese sitio está en Netlify, corrígelo allá.
- [ ] **Rebuild diario:** crea el Build Hook en Netlify y guárdalo como secret `NETLIFY_BUILD_HOOK_URL` en GitHub (pasos en el README, sección "Rebuild diario").
- [ ] **Sonido de arranque (opcional):** el intro intentaba reproducir `/sounds/boot.mp3`, que nunca existió. Ahora el audio solo se activa si pones un archivo en `public/sounds/boot.mp3`.

## Datos personales (content/profile.es.ts)

- [ ] **Maestría:** universidad, mes y año de inicio, y mes y año esperado de titulación (`education[0]`).
- [ ] **Herramientas de datos que usas** (Python, pandas, SQL, Jupyter…). Categoría "Datos & IA" en `stack`. Solo las que realmente uses.
- [ ] **Qué estás aprendiendo en la maestría** (`now.learning`).
- [ ] **Proyecto de Ciencia de Datos:** cuando tengas uno, descomenta `upcomingProject` y aparecerá la tarjeta "En construcción".
- [ ] **Métrica de liderazgo:** se calcula sola desde nov 2023. Hoy muestra "2+ años" y cambiará a "3+" en noviembre de 2026 con el rebuild diario. Si prefieres contar desde otra fecha, cambia `LEADERSHIP_SINCE` en `content/derived.ts`.
- [ ] **"2 plataformas en producción":** confirma cuáles son (¿ASOMMMN + la app de Ultra Ingeniería?). Hoy UltraNube y MKDevSoft no responden.

## Casos de estudio (content/profile.es.ts → projects[].caseStudy)

Revisa que las decisiones técnicas reflejen lo que realmente hiciste y completa:
- [ ] ASOMMMN: proveedor o modelo del asistente IA, dónde corre la API, hash de contraseñas, expiración de tokens, validación de archivos, y métricas de impacto (aspirantes y evaluaciones procesadas, tiempo antes vs. después).
- [ ] UltraNube: para quién es y qué problema resuelve, proveedor cloud, detalles de seguridad e impacto.
- [ ] MKDevSoft: servicio de formularios, protección anti-spam y clientes o solicitudes recibidas.
- [ ] **Repos públicos:** `ASOMMMN-APP-WEB`, `UltraNube`, `ultranube-backend` y `mkdevsoft` son públicos y ya están enlazados en los casos de estudio. Revisa que el repo de ASOMMMN no tenga secretos (`.env`, llaves, datos de aspirantes) y que la asociación esté de acuerdo con que el código sea público. Si no, hazlo privado y borra su `repoUrl`.
