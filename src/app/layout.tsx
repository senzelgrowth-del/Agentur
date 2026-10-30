import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://senzelgrowth.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SenzelGrowth — Aus Reichweite werden gebuchte Erstgespräche",
  description:
    "Kurzvideos und ein automatisiertes Anfrage-System aus einer Hand, für Selbständige und Dienstleister, die über ein Erstgespräch verkaufen.",
  keywords: [
    "Content Marketing",
    "Performance Marketing",
    "KI-Automatisierung",
    "Leadgenerierung",
    "SenzelGrowth",
  ],
  authors: [{ name: "Celvin Senzel" }],
  openGraph: {
    title: "SenzelGrowth — Aus Reichweite werden gebuchte Erstgespräche",
    description:
      "Kurzvideos und ein Anfrage-System aus einer Hand, für Selbständige und Dienstleister.",
    url: siteUrl,
    siteName: "SenzelGrowth",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SenzelGrowth — Aus Reichweite werden gebuchte Erstgespräche",
    description:
      "Kurzvideos und ein Anfrage-System aus einer Hand, für Selbständige und Dienstleister.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-950 text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
