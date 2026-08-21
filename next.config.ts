import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fdn.gsmarena.com',
      },
      {
        protocol: 'https',
        hostname: 'fdn2.gsmarena.com',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/articles/:slug*',
        destination: '/news/:slug*',
        permanent: true,
      },
      {
        source: '/phones/motorola/thinkphone-by-motorola',
        destination: '/phones/motorola/motorola-thinkphone',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
