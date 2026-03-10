/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed @xenova/transformers to allow Vercel Serverless deployment without OOM crashes
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/auth/register',
        destination: '/apply',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig


