import type { Metadata } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Elegant italic used only for single highlighted words
const accent = Source_Serif_4({
  variable: "--font-accent",
  subsets: ["latin"],
  style: "italic",
  weight: ["500"],
});

const siteUrl = "https://senzelgrowth.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SenzelGrowth – Content Creation & Meta Ads für Selbstständige und kleine Unternehmen",
  description:
    "Social-Media-Content und Meta Ads, die Anfragen bringen. Reels, Posts und Werbeanzeigen für Selbstständige und kleine Unternehmen, persönlich betreut von Celvin Senzel.",
  keywords: [
    "Content Creation",
    "Social Media Marketing",
    "Meta Ads",
    "Performance Marketing",
    "Leadgenerierung",
    "Reels erstellen lassen",
    "SenzelGrowth",
  ],
  authors: [{ name: "Celvin Senzel" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "SenzelGrowth – Content und Werbeanzeigen, die Anfragen bringen",
    description:
      "Reels, Posts und Meta Ads für Selbstständige und kleine Unternehmen. Persönlich betreut, mit ehrlicher Auswertung.",
    url: siteUrl,
    siteName: "SenzelGrowth",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SenzelGrowth – Content und Werbeanzeigen, die Anfragen bringen",
    description:
      "Reels, Posts und Meta Ads für Selbstständige und kleine Unternehmen.",
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
      className={`${geistSans.variable} ${accent.variable} h-full antialiased`}
    >
      <body className="theme-light min-h-full flex flex-col bg-white text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
