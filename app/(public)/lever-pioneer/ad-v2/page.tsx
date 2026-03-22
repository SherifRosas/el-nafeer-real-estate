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
        @keyframes ssr-ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes ssr-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255,255,255,0.2); }
          50% { transform: scale(1.05); box-shadow: 0 0 50px rgba(255,255,255,0.4); }
        }
      `}} />
      
      {/* --- SHADOW HYDRATION LAYER (SSR FALLBACK) --- */}
      <div className="fixed inset-0 z-0 bg-black flex flex-col items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-24">
              <div 
                  className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-white flex items-center justify-center p-10 border-4 border-white/50 relative"
                  style={{ animation: 'ssr-pulse 2s infinite ease-in-out' }}
              >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-10 shadow-2xl">
                      <img src="/clients/lever-pioneer/logo_mimic.png?v=105" alt="Loading..." className="w-full h-full object-contain mix-blend-multiply opacity-80" />
                  </div>
                  {/* Static Ripples */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20" style={{ animation: 'ssr-ripple 3s infinite', animationDelay: '0s' }} />
                  <div className="absolute inset-0 rounded-full border-2 border-white/20" style={{ animation: 'ssr-ripple 3s infinite', animationDelay: '1.5s' }} />
              </div>
              <div className="flex flex-col items-center gap-6 text-center">
                  <h1 className="text-white font-black text-4xl lg:text-7xl tracking-[0.2em] uppercase italic opacity-80">SYSTEM</h1>
                  <p className="text-sahara-gold font-bold text-lg lg:text-xl tracking-[0.15em] opacity-60 uppercase">[ INITIALIZING ]</p>
              </div>
          </div>
      </div>

      <AdClient />
    </>
  )
}
