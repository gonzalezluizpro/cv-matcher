/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
  // Enable image optimization if needed
  images: {
    domains: [],
  },
  // Add custom webpack config if needed
  webpack: (config, { isServer }) => {
    return config
  },
}

module.exports = nextConfig