import { Metadata } from 'next'
import React, { Suspense } from 'react'
import AdvancedLeverPortal from '@/components/AdvancedLeverPortal'

export const metadata: Metadata = {
  title: 'LEVER PIONEER | METROPOLITAN_SOVEREIGN_ASCENT',
  description: 'Experience absolute urban dominance with the Lever Pioneer Metropolitan Sovereign Ascent. Advanced cinematic elevator solutions for the Cairo Skyline.',
  openGraph: {
    title: 'ليفر الرائدة للمصاعد | Lever Pioneer',
    description: 'تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد بقلب الجيزة حدائق الأهرام. تكنولوجيا إيطالية وتصميم عصري.',
    url: 'https://el-nafeer-real-estate.vercel.app/portal/lever-pioneer-sovereign',
    siteName: 'Lever Pioneer Elevators',
    images: [
      {
        url: 'https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/the-ascension-ad.png?v=ascension-1',
        width: 1200,
        height: 630,
        alt: 'Lever Pioneer Ascension of Luxury'
      }
    ],
    locale: 'ar_EG',
    type: 'website',
  }
}

export default function MetropolitanPortalPage() {
    <main className="w-screen h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-black to-black opacity-50" />
      
      <div className="relative z-10 prestige-glass p-12 md:p-20 rounded-[4rem] border border-cyan-500/20 max-w-3xl w-full text-center shadow-[0_0_100px_rgba(6,182,212,0.1)]">
          <div className="w-24 h-24 mx-auto mb-10 relative">
              <div className="absolute inset-0 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
              <div className="absolute inset-4 border border-cyan-500/40 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
              </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-[0.2em] mb-4">CAMPAIGN PAUSED</h1>
          <p className="text-cyan-500 text-xs md:text-sm tracking-[0.5em] uppercase font-black mb-10">METROPOLITAN_SOVEREIGN_ASCENT // UNAVAILABLE</p>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-10" />
          
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed mb-12">
            The direct booking portal for Lever Pioneer's Metropolitan Sovereign Ascent is currently undergoing maintenance or has concluded its active phase.
          </p>

          <a href="/" className="inline-block px-10 py-4 bg-cyan-950/40 border border-cyan-500/30 text-cyan-500 text-xs font-black uppercase tracking-widest rounded-full hover:bg-cyan-500 hover:text-black transition-all">
            RETURN TO NAFEER ELITE
          </a>
      </div>
    </main>
}
