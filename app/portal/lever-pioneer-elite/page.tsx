import { Metadata } from 'next'
import { Suspense } from 'react'
import QuantumPortalAd from '@/components/QuantumPortalAd'

// --- PORTAL V190 SERVER METADATA (SOVEREIGN CACHE BUST) ---
const TITLE = "🚀 AL-NAFEER | LEVER PIONEER ELITE 🚀"
const DESC = "ليفر الرائدة للمصاعد - التكنولوجيا الإيطالية في قلب الجيزة. Vertical Excellence Defined."
const DOMAIN = "https://el-nafeer-real-estate.vercel.app"
const IMG_RAW = `logo-share-optimized.png`
const IMG = `${DOMAIN}/${IMG_RAW}?v=OPTIMIZED_v290`
const PAGE_URL = `${DOMAIN}/portal/lever-pioneer-elite`

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL(DOMAIN),
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: PAGE_URL,
    siteName: 'Lever Pioneer Elite',
    images: [{ url: IMG, width: 1200, height: 1200 }],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [IMG],
  },
  other: {
    'whatsapp:image': IMG,
    'whatsapp:title': TITLE,
    'whatsapp:description': DESC,
    'og:image': IMG,
    'og:image:url': IMG,
    'og:image:secure_url': IMG,
    'og:image:type': 'image/png',
    'og:image:width': '1200',
    'og:image:height': '1200',
    'twitter:image': IMG,
    'twitter:image:src': IMG,
    'itemprop:image': IMG,
    'al:web:url': PAGE_URL
  }
}

export default function PortalPageElite() {
  return (
    <main style={{ backgroundColor: '#000', width: '100%', minHeight: '100vh', position: 'relative' }}>
      <Suspense fallback={<div style={{ backgroundColor: '#000', height: '100vh', width: '100vw' }} />}>
        <QuantumPortalAd />
      </Suspense>
    </main>
  )
}
