'use client'

import Link from 'next/link'
import SocialShare from '@/components/SocialShare'
import { useLanguage } from './LanguageContext'
import { useState, useEffect } from 'react'

export default function HomeContent() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [isFlipped, setIsFlipped] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Auto-flip the coin every 4 seconds
    const flipTimer = setInterval(() => {
      setIsFlipped(prev => !prev)
    }, 4000)
    return () => clearInterval(flipTimer)
  }, [])

  const logoSrc = isArabic ? '/logos/logo-ar.png' : '/logos/logo-en.png'

    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 overflow-hidden">
      {/* Absolute Minimalist Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sahara-gold/[0.02] blur-[150px] pointer-events-none rounded-full" />

      {/* === CORE BRANDING === */}
      <div className="relative z-20 text-center mb-16">
        <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter uppercase italic leading-none mb-4 text-white drop-shadow-2xl">
          {isArabic ? 'النفير' : 'EL-NAFEER'}
        </h1>
        <h2 className="text-sm md:text-2xl font-bold tracking-[0.4em] md:tracking-[0.8em] uppercase text-sahara-gold opacity-90">
          {isArabic ? 'القيادة التقنية السيادية' : 'SOVEREIGN TECH AGENCY'}
        </h2>
      </div>

      {/* === SLEEK PORTFOLIO LINKS === */}
      <div className="relative z-20 flex flex-col md:flex-row gap-6 md:gap-12 w-full max-w-4xl mx-auto mb-16">
        
        {/* Real Estate Link */}
        <Link 
          href="/beit-alkhair" 
          className="flex-1 group relative p-8 border-y border-white/10 hover:border-sahara-gold/50 transition-all duration-500 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-sahara-gold/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
          <span className="text-3xl mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">🏗️</span>
          <h3 className="text-xl font-black italic tracking-[0.2em] uppercase text-white mb-2">
            {isArabic ? 'القطاع العقاري' : 'REAL ESTATE'}
          </h3>
          <p className="text-[10px] text-sahara-gold tracking-[0.3em] uppercase opacity-60">
            LIVE COMMAND CENTER
          </p>
        </Link>

        {/* Industrial Link */}
        <Link 
          href="/portal/lever-pioneer-elite" 
          className="flex-1 group relative p-8 border-y border-white/10 hover:border-cyan-500/50 transition-all duration-500 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyan-500/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
          <span className="text-3xl mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">⚙️</span>
          <h3 className="text-xl font-black italic tracking-[0.2em] uppercase text-white mb-2">
            {isArabic ? 'القطاع الصناعي' : 'INDUSTRIAL'}
          </h3>
          <p className="text-[10px] text-cyan-400 tracking-[0.3em] uppercase opacity-60">
            ELITE COMMAND CENTER
          </p>
        </Link>

      </div>

      {/* === CONTACT / ACTION === */}
      <div className="relative z-20">
        <a
          href="https://wa.me/201033332112?text=I%20want%20to%20build%20a%20Sovereign%20Command%20Center%20with%20EL-NAFEER"
          className="inline-block px-10 py-4 border border-white/20 text-white text-[10px] md:text-xs font-black tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all duration-500"
        >
          {isArabic ? 'تواصل مع الإدارة العليا' : 'INITIATE CONTACT'}
        </a>
      </div>
    </div>
  )
}
