import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
