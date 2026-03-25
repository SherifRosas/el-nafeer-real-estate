import { Metadata } from 'next'
import QuantumRealEstateAd from '@/components/QuantumRealEstateAd'

// --- QUANTUM-9 SERVER-SIDE METADATA (SOCIAL SUPREMACY) ---
const TITLE = "💎 AL-NAFEER | REAL ESTATE AI"
const DESC = "Ascend with Machine Intelligence. The definitive property promotion protocol."
const IMG = "https://el-nafeer-real-estate.vercel.app/campaigns/al-nafeer/ad-v1.png"
const PAGE_URL = "https://el-nafeer-real-estate.vercel.app/quantum-9"

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL('https://el-nafeer-real-estate.vercel.app'),
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: PAGE_URL,
    siteName: 'Al-Nafeer Real Estate',
    images: [
      {
        url: IMG,
        width: 1200,
        height: 1200,
        alt: 'Al-Nafeer Real Estate AI Visualization',
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

export default function Quantum9Page() {
  return (
    <main className="min-h-screen bg-black overflow-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: `
        footer, header, nav, #main-nav, .site-footer, div[data-footer], #footer { 
          display: none !important; 
        }
        body { 
          background: black !important; 
          overflow: hidden !important; 
          position: fixed !important; 
          width: 100% !important; 
          height: 100% !important; 
        }
      `}} />
      <QuantumRealEstateAd />
    </main>
  )
}
