import { Metadata } from 'next'
import Quantum3DAd from '@/components/Quantum3DAd'

export const metadata: Metadata = {
  title: 'LEVER PIONEER | THE 3D ASCENT',
  description: 'Enter the Third Dimension. Real-time Interactive Simulation.',
  openGraph: {
    title: 'LEVER PIONEER | 3D EDITION',
    description: 'Rotate, Explore, and Connect in 3D. The Future of Vertical Ads.',
    images: [{ url: '/campaigns/lever-pioneer/ad-v2-quantum.png' }],
  },
}

export default function Quantum3DPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* 
          --- SSR FALLBACK (3D LOADING) --- 
          Shows a cinematic placeholder while the WebGL engine initializes.
      */}
      <div id="ssr-artwork-bg" className="fixed inset-0 z-0 flex flex-col items-center justify-center bg-black">
          <div className="w-16 h-16 border-4 border-[#c5a059]/20 border-t-[#c5a059] rounded-full animate-spin mb-8" />
          <h2 className="text-[#c5a059] font-serif italic tracking-[0.5em] uppercase opacity-40 animate-pulse">Initializing 3D Universe</h2>
          <p className="mt-4 text-[8px] text-white/20 tracking-widest uppercase">Please wait for compilation to complete...</p>
      </div>

      <Quantum3DAd />
    </main>
  )
}
