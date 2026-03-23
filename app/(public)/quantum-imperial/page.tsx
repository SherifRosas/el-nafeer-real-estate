import { Metadata } from 'next'
import AdClient from '@/components/QuantumAd'

// --- IMPERIAL SERVER-SIDE METADATA (THE WHATSAPP FIX) ---
// By using a Server Component for the page, WhatsApp will definitively find 
// the Lever Pioneer branding before the client-side code even runs.

const TITLE = "🏆 LEVER PIONEER | ULTIMA EDITION"
const DESC = "The definitive ad experience. Clean, fast, and optimized."
const IMG = "https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/ad-v2-quantum.png"
const PAGE_URL = "https://el-nafeer-real-estate.vercel.app/quantum-imperial"

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
        /* --- NO-JS INTERACTION ENGINE --- */
        #ssr-active-hud-layer { 
          display: flex !important; 
          animation: fade-in-hud 0.5s forwards;
        }
        #ssr-artwork-bg {
          opacity: 1 !important;
          filter: blur(0px) !important;
        }
        @keyframes fade-in-hud {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}} />
      

      {/* --- SSR PURE-CSS HUD (FALLBACK FOR SLOW JS) --- */}
      <div id="ssr-active-hud-layer" className="fixed left-1/2 -translate-x-1/2 top-[90px] z-[100000] w-[95%] max-w-[450px] px-4 flex justify-around items-center gap-4 transition-opacity duration-500">
          <a href="tel:+201065661882" className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
          </a>
          <a href="https://wa.me/201065661882" className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-green-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
          </a>
          <a href="https://maps.app.goo.gl/r6vGf" className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-[#c5a059]/50 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <svg className="w-7 h-7 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
          </a>
      </div>

      {/* --- SSR MUTE RING (VISUAL CUE) --- */}
      <div 
          id="ssr-mute-ring" 
          className="fixed bottom-6 left-6 z-[100000] w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center animate-pulse cursor-pointer"
      >
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
          (function() {
              var btn = document.getElementById('ssr-mute-ring');
              if (btn) {
                  btn.onclick = function() {
                      var a = document.getElementById('quantum-bg-audio');
                      if (a) { 
                          a.muted = false; 
                          a.play().then(function(){ 
                              btn.style.display = 'none'; 
                          }).catch(function(e){ 
                              console.log(e); 
                          }); 
                      }
                  };
              }
          })();
      `}} />

      {/* --- CINEMATIC BACKGROUND ARTWORK (LEVEL 110.2 RESTORED) --- */}
      <div id="ssr-artwork-bg" className="fixed inset-0 z-[5] opacity-0 ssr-artwork-bg pointer-events-none flex items-center justify-center">
          <img src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Artwork" className="w-full h-auto max-h-[90vh] object-contain" />
      </div>

      <AdClient />
    </>
  )
}
