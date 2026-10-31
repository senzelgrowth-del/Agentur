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
  title: "SenzelGrowth — Verlässlicher Content, der Anfragen bringt",
  description:
    "Kurzvideos und Posts für Selbständige und kleine Unternehmen, persönlich betreut und auf Anfragen ausgerichtet.",
  keywords: [
    "Content Marketing",
    "Performance Marketing",
    "KI-Automatisierung",
    "Leadgenerierung",
    "SenzelGrowth",
  ],
  authors: [{ name: "Celvin Senzel" }],
  openGraph: {
    title: "SenzelGrowth — Verlässlicher Content, der Anfragen bringt",
    description:
      "Kurzvideos und Posts, persönlich betreut und auf Anfragen ausgerichtet.",
    url: siteUrl,
    siteName: "SenzelGrowth",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SenzelGrowth — Verlässlicher Content, der Anfragen bringt",
    description:
      "Kurzvideos und Posts, persönlich betreut und auf Anfragen ausgerichtet.",
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
