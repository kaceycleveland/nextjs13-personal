/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.ctfassets.net",
      "www.gravatar.com",
      "www.kleveland.dev",
      "cdn.sanity.io",
    ],
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
