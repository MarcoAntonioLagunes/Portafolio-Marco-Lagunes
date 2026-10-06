import { notFound } from "next/navigation";

/** El layout restringe [lang] a es/en; aquí se aceptan rutas arbitrarias para mostrar el 404 propio. */
export const dynamicParams = true;

/** Cualquier ruta desconocida bajo /es o /en muestra el 404 propio (con navbar y footer). */
export default function CatchAll() {
  notFound();
}
