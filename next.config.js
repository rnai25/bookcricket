/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // If you're using images from external sources, add them here
  images: {
    domains: [],
  },
}

module.exports = nextConfig 