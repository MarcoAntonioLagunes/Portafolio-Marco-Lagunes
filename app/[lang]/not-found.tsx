import Link from "next/link";
import { getProfile, homePath, LOCALES } from "@/content";

/** 404 bilingüe: not-found no recibe params, así que muestra ambos idiomas. */
export default function NotFound() {
  return (
    <main id="top" className="flex flex-1 items-center justify-center px-6 py-40">
      <div className="max-w-xl text-center">
        <p className="font-mono text-6xl font-semibold text-accent">404</p>
        {LOCALES.map((locale) => {
          const { ui } = getProfile(locale);
          return (
            <div key={locale} lang={locale} className="mt-8">
              <h1 className="text-2xl font-semibold text-foreground">{ui.notFound.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{ui.notFound.body}</p>
              <Link
                href={homePath(locale)}
                className="mt-4 inline-flex rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {ui.notFound.back}
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
