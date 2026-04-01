import { Metadata } from 'next'
import QuantumPortalAd from '@/components/QuantumPortalAd'

// --- PORTAL V185 SERVER METADATA (NUCLEAR CACHE BUST) ---
const TITLE = "🚀 AL-NAFEER | LEVER PIONEER ELITE 🚀"
const DESC = "ليفر الرائدة للمصاعد - من قلب الجيزة - هضبة الأهرام. Vertical Excellence Defined."
const DOMAIN = "https://el-nafeer-real-estate.vercel.app"
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=201111171368";
const IMG_RAW = `/campaigns/lever-pioneer/lever_pioneer_v318_ultimate.png`
const IMG = `${DOMAIN}${IMG_RAW}`
// Vercel Dynamic Signal Optimization (Force-Compacts to ~150KB for WhatsApp)
const IMG_OPTIMIZED = `${DOMAIN}/_next/image?url=${encodeURIComponent(IMG_RAW)}&w=1200&q=75`
const PAGE_URL = `${DOMAIN}/portal/lever-pioneer-elite`

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: PAGE_URL,
    siteName: 'Lever Pioneer Elite',
    images: [
      {
        url: IMG_OPTIMIZED,
        width: 1200,
        height: 630,
        alt: 'Lever Pioneer Elite Optimized Ad',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [IMG_OPTIMIZED],
  },
  other: {
    'whatsapp:image': IMG_OPTIMIZED,
    'whatsapp:title': TITLE,
    'whatsapp:description': DESC,
    'og:image:url': IMG_OPTIMIZED,
    'og:image:secure_url': IMG_OPTIMIZED,
    'og:image:alt': 'Lever Pioneer Elite Custom Elevator Solutions Giza',
    'og:image:type': 'image/png',
    'og:image:width': '1024',
    'og:image:height': '1024',
    'twitter:image': IMG_OPTIMIZED,
    'twitter:image:src': IMG_OPTIMIZED,
    'itemprop:image': IMG_OPTIMIZED,
    'al:web:url': PAGE_URL
  }
}

export default function PortalPageElite() {
  return (
    <main style={{ backgroundColor: '#000', width: '100%', minHeight: '100vh', position: 'relative' }}>
      <QuantumPortalAd />
    </main>
  )
}
