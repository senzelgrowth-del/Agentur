import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://senzelgrowth.com";

  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/referenzen/starshine-emotions`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/impressum`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/datenschutz`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
