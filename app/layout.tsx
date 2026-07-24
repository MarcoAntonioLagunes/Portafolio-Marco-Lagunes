import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BootProvider } from "@/lib/boot-context";
import { BootIntro } from "@/components/BootIntro";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://marcolagunes.dev";
const SITE_TITLE = "Marco Lagunes — Desarrollador Full-Stack";
const SITE_DESCRIPTION =
  "Ingeniero en Sistemas Computacionales y desarrollador full-stack certificado en Cisco CCST Cybersecurity. Diseño y despliego aplicaciones web completas con foco en seguridad desde el diseño.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Marco Lagunes",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Marco Lagunes",
    "desarrollador full-stack",
    "ciberseguridad",
    "React",
    "Next.js",
    "Node.js",
    "Veracruz México",
    "portafolio desarrollador",
  ],
  authors: [{ name: "Marco Lagunes", url: SITE_URL }],
  creator: "Marco Lagunes",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "Marco Lagunes · Portafolio",
    title: SITE_TITLE,
    description:
      "Construyendo software seguro y listo para producción, de principio a fin.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Marco Lagunes — Desarrollador Full-Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Ingeniero en Sistemas Computacionales · Full-Stack · Ciberseguridad Aplicada",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <BootProvider>
          <ParticleBackground />

          <div className="relative z-10 flex min-h-screen flex-col">
            <BootIntro />
            <Navbar />

            <main className="relative flex-1">
              {children}
            </main>

            <Footer />
          </div>
        </BootProvider>
      </body>
    </html>
  );
}