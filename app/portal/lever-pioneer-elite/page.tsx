import { Metadata } from 'next'
import QuantumPortalAd from '@/components/QuantumPortalAd'

// --- PORTAL V185 SERVER METADATA (NUCLEAR CACHE BUST) ---
const TITLE = "🚀 AL-NAFEER | LEVER PIONEER ELITE 🚀"
const DESC = "ليفر الرائدة للمصاعد - من قلب الجيرة - هضبة الأهرام. Vertical Excellence Defined."
const DOMAIN = "https://el-nafeer-real-estate.vercel.app"
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=201111171368";
const IMG = `${DOMAIN}/campaigns/lever-pioneer/lever_pioneer_v318_ultimate.png?v=REVEAL_PROD_V1`
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
        url: IMG,
        width: 1200,
        height: 1200,
        alt: 'Lever Pioneer Cinematic Building Premium',
      },
    ],
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
    'og:image:secure_url': IMG,
    'og:image:alt': 'Lever Pioneer Elite Custom Elevator Solutions Giza',
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
      <QuantumPortalAd />
    </main>
  )
}
