/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Monorepo: transpile shared packages
  transpilePackages: [
    '@rental-platform/types',
    '@rental-platform/config',
    '@rental-platform/validation',
    '@rental-platform/ui',
  ],
};

module.exports = nextConfig;
