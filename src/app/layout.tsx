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
  title: "SenzelGrowth — Content & Marketing für lokale Unternehmen",
  description:
    "Content und Marketing für lokale Unternehmen und Selbständige. KI-Automatisierung gibt es als Extra dazu.",
  keywords: [
    "Content Marketing",
    "Performance Marketing",
    "KI-Automatisierung",
    "Leadgenerierung",
    "SenzelGrowth",
  ],
  authors: [{ name: "Celvin Senzel" }],
  openGraph: {
    title: "SenzelGrowth — Content & Marketing für lokale Unternehmen",
    description:
      "Content und Marketing für lokale Unternehmen und Selbständige.",
    url: siteUrl,
    siteName: "SenzelGrowth",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SenzelGrowth — Content & Marketing für lokale Unternehmen",
    description:
      "Content und Marketing für lokale Unternehmen und Selbständige.",
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
