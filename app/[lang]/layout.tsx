import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono } from "next/font/google";
import { BootProvider } from "@/lib/boot-context";
import { BootIntro } from "@/components/BootIntro";
import { CustomCursor } from "@/components/CustomCursor";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getProfile, homePath, isLocale, LOCALES } from "@/content";
import { publicFileExists } from "@/lib/public-files";
import { BOOT_SOUND_PATH, SITE_URL } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const profile = getProfile(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: profile.meta.title,
      template: `%s · ${profile.person.name}`,
    },
    description: profile.meta.description,
    keywords: profile.meta.keywords,
    authors: [{ name: profile.person.name, url: SITE_URL }],
    creator: profile.person.name,
    openGraph: {
      type: "website",
      locale: profile.meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => getProfile(l).meta.ogLocale),
      siteName: profile.person.name,
      title: profile.meta.title,
      description: profile.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: profile.meta.title,
      description: profile.meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#06090F",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const profile = getProfile(lang);
  const other = LOCALES.find((l) => l !== lang)!;

  return (
    <html lang={lang} className={`${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#contenido"
          className="sr-only z-[200] rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {profile.ui.skipToContent}
        </a>
        <BootProvider>
          <CustomCursor />
          <ScrollProgress />

          <div className="relative z-10 flex min-h-screen flex-col">
            <BootIntro soundSrc={publicFileExists(BOOT_SOUND_PATH) ? BOOT_SOUND_PATH : undefined} />
            <Navbar
              links={profile.nav}
              strings={profile.ui}
              homePath={homePath(lang)}
              actions={<LanguageToggle current={lang} target={other} label={profile.ui.switchLanguage} />}
            />

            <div id="contenido" className="relative flex-1">
              {children}
            </div>

            <Footer profile={profile} />
          </div>
        </BootProvider>
      </body>
    </html>
  );
}
