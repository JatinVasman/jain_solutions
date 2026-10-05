/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode for catching issues early
  reactStrictMode: true,

  // Monorepo: transpile shared packages
  transpilePackages: [
    '@rental-platform/types',
    '@rental-platform/schemas',
    '@rental-platform/utils',
    '@rental-platform/config',
  ],

  // Configure image domains when product images are served from cloud storage
  images: {
    remotePatterns: [
      // Add Cloudinary/S3 domains here in Phase 15 (Media)
      // { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },

  // Environment variables exposed to the browser (must be prefixed NEXT_PUBLIC_)
  env: {
    // No secrets here — only non-sensitive public config
  },
};

module.exports = nextConfig;
