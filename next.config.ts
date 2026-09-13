import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Canva serves design thumbnails from signed, short-lived URLs on these hosts.
    remotePatterns: [
      { protocol: "https", hostname: "**.canva.com" },
      { protocol: "https", hostname: "**.canvausercontent.com" },
    ],
  },
};

export default nextConfig;
