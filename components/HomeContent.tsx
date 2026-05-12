'use client'

import Link from 'next/link'
import { useLanguage } from './LanguageContext'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function HomeContent() {
  const { language, setLanguage } = useLanguage()
  const isArabic = language === 'ar'
  const [mounted, setMounted] = useState(false)
  const [digits, setDigits] = useState('000.000.000')

  useEffect(() => {
    setMounted(true)
    // Fancy data running in the background
    const interval = setInterval(() => {
      setDigits((Math.random() * 999999999).toFixed(0).padStart(9, '0').replace(/\B(?=(\d{3})+(?!\d))/g, "."))
    }, 150)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null;

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 overflow-hidden bg-[#030712] selection:bg-[#D4AF37] selection:text-[#030712] font-sans">
      
      {/* === LANGUAGE SWITCHER === */}
      <div className="absolute top-6 right-6 z-[200]">
        <button 
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-lg text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 font-black tracking-widest text-[10px] uppercase transition-all shadow-xl"
        >
          <span>{language === 'ar' ? 'EN' : 'العربية'}</span>
        </button>
      </div>

      {/* === ROYAL CYBER AMBIENCE === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep Blue/Gold Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_rgba(15,23,42,0)_70%)] rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(30,58,138,0.1)_0%,_rgba(3,7,18,0)_70%)] rounded-full blur-[100px]" />
        
        {/* Milky Silver Grid Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

        {/* Floating Modern Digits */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute top-10 left-4 md:left-10 text-3xl md:text-6xl font-mono font-black text-slate-700 tracking-[0.3em] md:tracking-[0.6em] robotic-digits"
        >
          {digits}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-4 md:right-10 text-2xl md:text-4xl font-mono font-black text-[#D4AF37] tracking-[0.3em] md:tracking-[0.6em] rotate-90 robotic-digits"
        >
          {digits}
        </motion.div>
      </div>

      {/* === CORE BRANDING === */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 text-center mb-16 md:mb-24 mt-10 w-full"
      >
        <h1 className="text-5xl md:text-[9rem] font-black tracking-tighter uppercase italic leading-none mb-4 md:mb-6 text-slate-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          {isArabic ? 'النفير' : 'EL-NAFEER'}
        </h1>
        <div className="flex items-center justify-center gap-2 md:gap-6 w-full px-4">
          <div className="h-[1px] flex-1 md:w-32 md:flex-none bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
          <h2 className="text-[9px] md:text-xl font-bold tracking-[0.2em] md:tracking-[0.6em] uppercase text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] whitespace-nowrap">
            {isArabic ? 'وكالة التقنية السيادية' : 'SOVEREIGN TECH AGENCY'}
          </h2>
          <div className="h-[1px] flex-1 md:w-32 md:flex-none bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
        </div>
      </motion.div>

      {/* === LUXURY PORTFOLIO LINKS === */}
      <div className="relative z-20 flex flex-col md:flex-row gap-8 md:gap-16 w-full max-w-5xl mx-auto mb-24">
        
        {/* Real Estate Link */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          <Link 
            href="/beit-alkhair" 
            className="group relative block p-12 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_80px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/50 hover:-translate-y-2 transition-all duration-700 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <span className="text-5xl mb-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] transition-all duration-500">🏛️</span>
            <h3 className="text-2xl font-black italic tracking-[0.2em] uppercase text-slate-200 group-hover:text-white mb-3 transition-colors">
              {isArabic ? 'القطاع العقاري' : 'REAL ESTATE'}
            </h3>
            <p className="text-[9px] font-bold text-[#D4AF37] tracking-[0.4em] uppercase">
              PRESTIGE COMMAND CENTER
            </p>
          </Link>
        </motion.div>

        {/* Industrial Link */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          <Link 
            href="/portal/lever-pioneer-elite" 
            className="group relative block p-12 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_80px_rgba(56,189,248,0.15)] hover:border-sky-400/50 hover:-translate-y-2 transition-all duration-700 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-b from-sky-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <span className="text-5xl mb-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.8)] transition-all duration-500">⚙️</span>
            <h3 className="text-2xl font-black italic tracking-[0.2em] uppercase text-slate-200 group-hover:text-white mb-3 transition-colors">
              {isArabic ? 'القطاع الصناعي' : 'INDUSTRIAL'}
            </h3>
            <p className="text-[9px] font-bold text-sky-400 tracking-[0.4em] uppercase">
              ELITE COMMAND CENTER
            </p>
          </Link>
        </motion.div>

      </div>

      {/* === VIP CONTACT ACTION === */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-20"
      >
        <a
          href="https://wa.me/201558408659?text=I%20want%20to%20build%20a%20Sovereign%20Command%20Center%20with%20EL-NAFEER"
          className="group relative inline-flex items-center justify-center px-12 py-5 bg-slate-800/80 backdrop-blur-md text-slate-200 border border-slate-600/50 text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase overflow-hidden rounded-sm hover:border-[#D4AF37]/80 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#D4AF37]/20 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 flex items-center gap-3 group-hover:text-[#D4AF37] transition-colors">
            {isArabic ? 'بدء التواصل السيادي' : 'INITIATE VIP CONTACT'}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>
      </motion.div>
    </div>
  )
}
