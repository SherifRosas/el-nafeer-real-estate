import { Metadata } from 'next'
import QuantumPortalAd from '@/components/QuantumPortalAd'

// --- PORTAL V185 SERVER METADATA (NUCLEAR CACHE BUST) ---
const TITLE = "🚀 AL-NAFEER | LEVER PIONEER ELITE 🚀"
const DESC = "ليفر الرائدة للمصاعد - من قلب الجيزة - هضبة الأهرام. Vertical Excellence Defined."
const DOMAIN = "https://el-nafeer-real-estate.vercel.app"
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=201111171368";
const IMG_RAW = `logo-share.png`
const IMG = `${DOMAIN}/${IMG_RAW}?v=ROOT_v274`
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
    images: [{ url: IMG, width: 1200, height: 630 }],
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
    'og:image:alt': 'Lever Pioneer Elite Branding',
    'twitter:image:alt': 'Lever Pioneer Elite Branding'
  }
}

export default function PortalPageElite() {
  return (
    <main style={{ backgroundColor: '#000', width: '100%', minHeight: '100vh', position: 'relative' }}>
      <QuantumPortalAd />
    </main>
  )
}
