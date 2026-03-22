import { Metadata } from 'next'
import AdClient from '@/components/AdClient'

// --- IMPERIAL SERVER-SIDE METADATA (THE WHATSAPP FIX) ---
// By using a Server Component for the page, WhatsApp will definitively find 
// the Lever Pioneer branding before the client-side code even runs.

const TITLE = "Lever Pioneer Elevators | The Ascension of Luxury"
const DESC = "Celebrating the launch of the new headquarters. Experience the future of vertical mobility with Lever Pioneer."
const IMG = "https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/ad-v2-quantum.png"
const PAGE_URL = "https://el-nafeer-real-estate.vercel.app/lever-pioneer/ad-v2"

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

export default function AdMasterPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        footer, header, nav, #main-nav, .site-footer, div[data-footer], #footer, .root-footer { 
          display: none !important; 
          visibility: hidden !important; 
          opacity: 0 !important; 
          pointer-events: none !important; 
          height: 0 !important;
          overflow: hidden !important;
        }
        body { 
          background: black !important; 
          overflow: hidden !important; 
          position: fixed !important; 
          width: 100% !important; 
          height: 100% !important; 
        }
      `}} />
      <AdClient />
    </>
  )
}
