import { Metadata } from 'next'
import QuantumPortalAd from '@/components/QuantumPortalAd'

// --- PORTAL V120 SERVER METADATA (GLOBAL REACH) ---
const TITLE = "🏆 LEVER PIONEER | THE ASCENT"
const DESC = "Unifying Vertical Excellence. The definitive cross-device simulation."
const IMG = "https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/ad-v2-quantum.png"
const PAGE_URL = "https://el-nafeer-real-estate.vercel.app/portal/lever-pioneer"

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL('http://localhost:3000'),
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
  }
}

export default function PortalPage() {
  return (
    <main style={{ backgroundColor: '#000', width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <QuantumPortalAd />
    </main>
  )
}
