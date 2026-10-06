import fs from "node:fs";
import path from "node:path";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { BootProvider } from "@/lib/boot-context";
import { BootIntro } from "@/components/BootIntro";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getProfile } from "@/content";
import { GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/site";
import "./globals.css";

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

const BOOT_SOUND = "/sounds/boot.mp3";
const hasBootSound = fs.existsSync(path.join(process.cwd(), "public", BOOT_SOUND));

const profile = getProfile();

export const metadata: Metadata = {
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
    url: SITE_URL,
    siteName: `${profile.person.name} · Portafolio`,
    title: profile.meta.title,
    description: profile.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: profile.meta.title,
    description: profile.meta.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#06090F",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.person.name,
  url: SITE_URL,
  jobTitle: profile.person.jobTitle,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={profile.locale}
      className={`${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
            <BootIntro soundSrc={hasBootSound ? BOOT_SOUND : undefined} />
            <Navbar links={profile.nav} strings={profile.ui} />

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
