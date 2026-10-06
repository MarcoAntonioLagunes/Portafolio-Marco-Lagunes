import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { homePath, isLocale, LOCALE_COOKIE, pickLocale } from "@/content";

/**
 * Respaldo de proxy.ts para "/": elige idioma por cookie (elección manual) o Accept-Language.
 * Normalmente el proxy redirige antes de llegar aquí.
 */
export default async function RootRedirect() {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value;
  const locale = saved && isLocale(saved) ? saved : pickLocale((await headers()).get("accept-language"));
  redirect(homePath(locale));
}
