import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**', // Allow images from any path under /images/
      },
    ],
  },
  /* other config options can go here */
};

export default nextConfig;
