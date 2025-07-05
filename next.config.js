/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for better deployment
  output: 'standalone',

  // Ignore ESLint errors during build (for deployment)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Environment variables for client-side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  
  // Allow images from external domains if needed
  images: {
    domains: [],
  },
}

module.exports = nextConfig
