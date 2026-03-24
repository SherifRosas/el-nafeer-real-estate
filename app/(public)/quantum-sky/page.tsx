import { Metadata } from 'next'
import QuantumSkyAd from '@/components/QuantumSkyAd'

export const metadata: Metadata = {
  title: 'LEVER PIONEER | SKY EDITION',
  description: 'Experience the Ascension of Luxury. Full-Screen Cinematic Simulation.',
  openGraph: {
    title: 'LEVER PIONEER | SKY EDITION',
    description: 'The Future of Vertical Transportation. Scan to Enter.',
    images: [{ url: '/campaigns/lever-pioneer/ad-v2-quantum.png' }],
  },
}

export default function QuantumSkyPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden font-sans">
      {/* 
          --- SSR PURE-CSS HUD (IMPERIAL SKY V110.15) --- 
          This layer appears instantly while JS loads to prevent "Layout Shift"
      */}
      
      {/* 100% FULL-SCREEN ARTWORK FALLBACK */}
      <div id="ssr-artwork-bg" className="fixed inset-0 z-[5] flex items-center justify-center translate-y-0 opacity-80 scale-105 blur-sm">
          <img 
            src="/campaigns/lever-pioneer/ad-v2-quantum.png" 
            alt="Artwork" 
            className="w-full h-full object-cover sm:object-contain" 
          />
      </div>

      {/* FLOATING SKY-ZONE HUD FALLBACK */}
      <div id="ssr-active-hud-layer" className="fixed left-1/2 -translate-x-1/2 top-[4vh] z-[100000] w-[95%] max-w-[450px] px-4 flex justify-around items-center gap-4 transition-opacity duration-500">
          <a href="tel:+201070615372" title="Call Us" className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/20 flex items-center justify-center shadow-2xl">
              <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
          </a>
          <a href="https://wa.me/201070615372" title="WhatsApp" className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-green-500/20 flex items-center justify-center shadow-2xl">
              <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
          </a>
          <div title="Access QR" className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl">
              <svg className="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
          </div>
          <a href="https://maps.app.goo.gl/r6vGf" title="Location" className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-[#c5a059]/20 flex items-center justify-center shadow-2xl">
              <svg className="w-7 h-7 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
          </a>
      </div>

      <div id="ssr-mute-ring" className="fixed bottom-6 left-6 z-[100000] w-14 h-14 rounded-full bg-black/60 border-2 border-red-500/50 flex items-center justify-center shadow-2xl pointer-events-none">
          <svg className="w-8 h-8 text-red-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
      </div>

      <QuantumSkyAd />
    </main>
  )
}
