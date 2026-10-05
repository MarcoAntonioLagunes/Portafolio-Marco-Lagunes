# TODO: datos y acciones pendientes de Marco

Todo lo que aparece en el sitio como `[COMPLETAR: ...]` está listado aquí, con el archivo donde se edita.
Al completar un dato, bórralo de esta lista.

## Acciones en Netlify / dominios

- [ ] **Netlify Forms:** en *Site configuration → Forms*, verifica que **Form detection** esté activado. Después del primer deploy debe aparecer el formulario `contacto`. En *Forms → Notifications* agrega tu email para recibir cada mensaje.
- [ ] **UltraNube:** `ultranube.com.mx` no resuelve DNS (dominio vencido o sin registro A). Renueva o configura el dominio, o dame la URL nueva. Mientras tanto, el link del proyecto queda oculto.
- [ ] **MKDevSoft:** `mkdevsoft.netlify.app` da 404. Confirma la URL real del sitio. Mientras tanto, el link queda oculto.
- [ ] **MKDevSoft (en su propio sitio):** el video del recorrido muestra "Desplegado en Vercel" en la terminal del hero de MKDevSoft. Si ese sitio está en Netlify, corrígelo allá.
- [ ] **Sonido de arranque (opcional):** el intro intentaba reproducir `/sounds/boot.mp3`, que nunca existió. Ahora el audio solo se activa si pones un archivo en `public/sounds/boot.mp3`.
