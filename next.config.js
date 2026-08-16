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
        source: '/narco-demo',
        destination: '/%D8%AD%D8%B7%D8%A8-%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A',
        permanent: true,
      },
      {
        source: '/lever-pioneer/((?!ad-v5|dashboard|quote|request-quote|official-quote).*)',
        destination: '/portal/lever-pioneer',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/%D8%AD%D8%B7%D8%A8-%D8%A3%D9%81%D8%B1%D9%8A%D9%82%D9%8A',
        destination: '/firewood-ar',
      },
      {
        source: '/حطب-أفريقي',
        destination: '/firewood-ar',
      },
    ]
  },
}

module.exports = nextConfig


