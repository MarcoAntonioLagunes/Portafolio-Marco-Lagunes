/** Layout mínimo de "/": esta ruta solo redirige al idioma (respaldo si el proxy no corre). */
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
