import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      // Legacy direct bucket URLs; new images are served locally via /api/asset
      {
        protocol: 'https',
        hostname: '*.idrivee2.com',
      },
    ],
  },
};

export default nextConfig;
