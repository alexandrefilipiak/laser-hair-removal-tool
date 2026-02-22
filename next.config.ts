import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Using default output for Vercel (supports API routes)

  async redirects() {
    return [
      // Redirect old /is-it-a-real-laser paths to new /equipment-verification-tool paths
      {
        source: '/is-it-a-real-laser',
        destination: '/equipment-verification-tool',
        permanent: true,
      },
      {
        source: '/is-it-a-real-laser/contact',
        destination: '/equipment-verification-tool/contact',
        permanent: true,
      },
      {
        source: '/is-it-a-real-laser/equipment-costs',
        destination: '/equipment-verification-tool/equipment-costs',
        permanent: true,
      },
      {
        source: '/is-it-a-real-laser/home-laser-vs-clinical-laser',
        destination: '/equipment-verification-tool/home-laser-vs-clinical-laser',
        permanent: true,
      },
      {
        source: '/is-it-a-real-laser/purpose-built-vs-multi-purpose',
        destination: '/equipment-verification-tool/purpose-built-vs-multi-purpose',
        permanent: true,
      },
      // Catch-all for dynamic [slug] routes (equipment pages)
      {
        source: '/is-it-a-real-laser/:slug',
        destination: '/equipment-verification-tool/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
