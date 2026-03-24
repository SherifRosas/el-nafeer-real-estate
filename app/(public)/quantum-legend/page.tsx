import { Metadata } from 'next'
import QuantumLegendAd from '@/components/QuantumLegendAd'

export const metadata: Metadata = {
  title: 'LEVER PIONEER | THE LEGEND',
  description: 'Unifying Vertical Excellence. The Definitive Cinematic Simulation.',
  openGraph: {
    title: 'LEVER PIONEER | THE LEGEND',
    description: 'The Future of Interaction. Unified Box-HUD Standard.',
    images: [{ url: '/campaigns/lever-pioneer/ad-v2-quantum.png' }],
  },
}

export default function QuantumLegendPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden font-sans">
      {/* 
          --- SSR PURE-CSS UNIFIED HUD (IMPERIAL LEGEND V110.17) --- 
          Instant immersion layer matching 100vh artwork and 4-row box.
      */}
      
      {/* 100% FULL-SCREEN ARTWORK FALLBACK */}
      <div id="ssr-artwork-bg" className="fixed inset-0 z-[5] flex items-center justify-center opacity-80 scale-105 blur-sm">
          <img 
            src="/campaigns/lever-pioneer/ad-v2-quantum.png" 
            alt="Artwork" 
            className="w-full h-full object-cover sm:object-contain" 
          />
      </div>

      {/* UNIFIED BOX-HUD FALLBACK (3-ROW) */}
      <div id="ssr-active-hud-layer" className="fixed left-[4.8%] bottom-[10%] w-[27%] h-[24%] z-[100000] flex flex-col pointer-events-none transition-opacity duration-700">
          <div className="w-full h-1/3 flex items-center pl-[5%]">
              <div className="w-8 h-8 rounded-full border border-white/10 bg-black/40" />
          </div>
          <div className="w-full h-1/3 flex items-center pl-[5%]">
              <div className="w-8 h-8 rounded-full border border-white/10 bg-black/40" />
          </div>
          <div className="w-full h-1/3 flex items-center pl-[5%]">
              <div className="w-8 h-8 rounded-full border border-white/10 bg-black/40" />
          </div>
      </div>

      {/* DESIGNER SIGNATURE FALLBACK */}
      <div className="fixed right-[4%] bottom-[4%] z-[100000] opacity-40">
          <div className="bg-black/90 p-4 rounded-2xl border border-white/10 flex items-center gap-4">
               <div className="flex flex-col text-right">
                    <span className="text-[7px] text-cyan-400/40 tracking-[4px] uppercase font-black italic">DESIGNER</span>
                    <span className="font-bold text-base italic tracking-wide text-[#c5a059] font-serif">Sherif Rosas</span>
               </div>
          </div>
      </div>

      {/* MUTE RING FALLBACK */}
      <div id="ssr-mute-ring" className="fixed bottom-6 left-6 z-[100000] w-14 h-14 rounded-full bg-black/60 border-2 border-red-500/50 flex items-center justify-center shadow-2xl pointer-events-none">
          <svg className="w-8 h-8 text-red-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
      </div>

      <QuantumLegendAd />
    </main>
  )
}
