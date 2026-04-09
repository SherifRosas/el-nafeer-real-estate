/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed @xenova/transformers to allow Vercel Serverless deployment without OOM crashes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qtmaaomweaqoumbclpox.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
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
      {
        source: '/lever-pioneer/:path*',
        destination: '/portal/lever-pioneer',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig


