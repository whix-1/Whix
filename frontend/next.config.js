import type { NextConfig } from 'next';
const withPWA = require('next-pwa');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    NEXT_PUBLIC_PAYSTACK_KEY: process.env.REACT_APP_PAYSTACK_KEY,
    NEXT_PUBLIC_FLUTTERWAVE_KEY: process.env.REACT_APP_FLUTTERWAVE_KEY,
  },
};

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  ...nextConfig,
});
