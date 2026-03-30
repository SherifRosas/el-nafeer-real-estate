import { Metadata } from 'next'
import QuantumPortalAd from '@/components/QuantumPortalAd'

// --- PORTAL V120 SERVER METADATA (GLOBAL REACH) ---
const TITLE = "🏆 LEVER PIONEER | THE ASCENT"
const DESC = "Unifying Vertical Excellence. The definitive cross-device simulation."
const DOMAIN = "https://el-nafeer-real-estate.vercel.app"
const IMG = `${DOMAIN}/campaigns/lever-pioneer/ad-v2-quantum (1).png?v=122.50`
const PAGE_URL = `${DOMAIN}/portal/lever-pioneer`

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
    siteName: 'Lever Pioneer',
    images: [
      {
        url: IMG,
        width: 1200,
        height: 1200,
        alt: 'Lever Pioneer Cinematic Building',
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
    'og:image:type': 'image/png',
    'og:image:width': '1200',
    'og:image:height': '1200'
  }
}

export default function PortalPage() {
  return (
    <main style={{ backgroundColor: '#000', width: '100%', minHeight: '100vh', position: 'relative' }}>
      <QuantumPortalAd />
    </main>
  )
}
