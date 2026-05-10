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

  return (
    <div className="relative z-10 px-6 md:px-12 py-16 lg:py-24 overflow-hidden max-w-full">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/grid.svg')] bg-repeat" />

      {/* Background Cyber Glows */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-sahara-gold/[0.03] blur-[120px] -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-cyan-500/[0.03] blur-[120px] -ml-32 -mb-32 pointer-events-none" />

      {/* === HERO SECTION: AGENCY BRANDING === */}
      <div className="max-w-7xl mx-auto text-center mb-24 relative">
        
        {/* Version Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-xl border border-white/10 milky-glass mb-10 liquid-gloss prestige-card group">
          <span className="w-2 h-2 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
          <span className="text-[10px] font-black text-gray-300 group-hover:text-sahara-gold transition-colors uppercase tracking-[0.4em] robotic-digits">EL_NAFEER_SOVEREIGN_AGENCY_v4.0</span>
        </div>

        <h1 className="text-6xl md:text-[clamp(4rem,10vw,12rem)] font-black mb-8 tracking-tighter uppercase italic leading-[0.85] animate-in fade-in transition-all duration-700">
          <span className="text-white block mb-2">{isArabic ? 'النفير' : 'EL-NAFEER'}</span>
          <span className="block text-2xl md:text-5xl transition-all duration-1000 text-sahara-gold drop-shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:scale-105 transform cursor-default tracking-[0.2em] md:tracking-[0.5em]">
            {isArabic ? 'القيادة الرقمية السيادية' : 'SOVEREIGN_TECH_AGENCY'}
          </span>
        </h1>

        <p className="text-sm md:text-xl text-gray-400 font-bold max-w-4xl mx-auto leading-relaxed mb-16 uppercase tracking-[0.2em] opacity-80 py-4">
          {isArabic
            ? 'نحن لا نصمم مواقع إلكترونية. نحن نهندس منصات قيادة سينمائية مدعومة بالذكاء الاصطناعي لكبرى شركات التطوير العقاري والمؤسسات الصناعية في مصر والمملكة العربية السعودية.'
            : 'We do not build websites. We engineer cinematic AI command centers for elite real estate developers and industrial enterprises across Egypt and KSA.'}
        </p>

        {/* Action Node Buttons */}
        <div className="flex flex-wrap justify-center gap-6 relative z-20">
          <a
            href="https://wa.me/201033332112?text=I%20want%20to%20build%20a%20Sovereign%20Command%20Center%20with%20EL-NAFEER"
            className="group relative px-12 py-6 bg-sahara-gold text-black rounded-2xl font-black text-xs uppercase tracking-[0.4em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-black flex items-center gap-3">
              <span>{isArabic ? 'تواصل مع الإدارة' : 'CONTACT_DIRECTOR'}</span>
              <span className="text-lg">⚡</span>
            </span>
          </a>
        </div>
      </div>

      {/* === THE PORTFOLIO: LIVE DEMOS === */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-4">
              {isArabic ? 'محفظة المشاريع الحية' : 'LIVE_PORTFOLIO_NODES'}
            </h2>
            <div className="w-24 h-1 bg-sahara-gold mx-auto shadow-[0_0_15px_#c5a059]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          
          {/* REAL ESTATE ENGINE (KSA & EGYPT) */}
          <Link href="/beit-alkhair" className="col-span-1 rounded-[3rem] p-8 md:p-12 relative group overflow-hidden bg-black/40 border border-sahara-gold/20 hover:border-sahara-gold/60 transition-all duration-700 shadow-[0_0_50px_rgba(212,175,55,0.05)] hover:shadow-[0_0_100px_rgba(212,175,55,0.2)] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-sahara-gold/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sahara-gold/10 blur-[120px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 bg-sahara-gold/10 rounded-2xl flex items-center justify-center text-sahara-gold border border-sahara-gold/30 mb-8 shadow-xl">
                <span className="text-2xl">🏗️</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-white mb-2">
                  {isArabic ? 'القطاع العقاري' : 'REAL_ESTATE_ENGINE'}
              </h3>
              <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-6">
                EGYPT // KSA VISION 2030
              </p>
              
              <p className="text-sm text-gray-400 font-bold leading-relaxed uppercase tracking-[0.1em] mb-12 flex-1">
                  {isArabic 
                      ? 'منصة المبيعات السينمائية الأقوى للمطورين العقاريين. تتميز بالخرائط العصبية الثلاثية الأبعاد، عرض حي للوحدات، ومستشار ذكاء اصطناعي.'
                      : 'The ultimate cinematic sales platform for elite developers. Featuring 3D neural maps, live unit tracking, and AI-driven client consultation.'}
              </p>
              
              <div className="flex justify-between items-center border-t border-sahara-gold/20 pt-6">
                <div className="px-6 py-3 bg-sahara-gold text-black rounded-xl font-black text-[10px] uppercase tracking-[0.3em] group-hover:scale-105 transition-all">
                     {isArabic ? 'فتح مشروع بيت الخير' : 'LAUNCH_BEIT_ALKHAIR'}
                </div>
                <span className="text-white opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all">➔</span>
              </div>
            </div>
          </Link>

          {/* INDUSTRIAL ENGINE (EGYPT) */}
          <Link href="/portal/lever-pioneer-elite" className="col-span-1 rounded-[3rem] p-8 md:p-12 relative group overflow-hidden bg-black/40 border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-700 shadow-[0_0_50px_rgba(6,182,212,0.05)] hover:shadow-[0_0_100px_rgba(6,182,212,0.2)] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/30 mb-8 shadow-xl">
                <span className="text-2xl">⚙️</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-white mb-2">
                  {isArabic ? 'القطاع الصناعي والهندسي' : 'INDUSTRIAL_ENGINE'}
              </h3>
              <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-6">
                HEAVY_MACHINERY // AUTOMOTIVE
              </p>
              
              <p className="text-sm text-gray-400 font-bold leading-relaxed uppercase tracking-[0.1em] mb-12 flex-1">
                  {isArabic 
                      ? 'غرفة تحكم رقمية للمصانع، شركات المصاعد، والسيارات الفارهة. مزودة بأنظمة تتبع جرد ولوحات بيانات سيادية.'
                      : 'Digital command rooms for factories, elevator firms, and luxury automotive. Equipped with inventory tracking and sovereign data dashes.'}
              </p>
              
              <div className="flex justify-between items-center border-t border-cyan-500/20 pt-6">
                <div className="px-6 py-3 bg-cyan-500 text-black rounded-xl font-black text-[10px] uppercase tracking-[0.3em] group-hover:scale-105 transition-all">
                     {isArabic ? 'فتح مشروع روساس' : 'LAUNCH_ROSSAS_ELITE'}
                </div>
                <span className="text-white opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all">➔</span>
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* Global Status Bar */}
      <div className="max-w-7xl mx-auto mb-10 p-8 rounded-[2rem] border border-white/5 flex flex-wrap justify-between items-center gap-6 milky-glass">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            {['delay-75', 'delay-150', 'delay-300'].map((delay, i) => (
              <div key={i} className={`w-1 h-4 bg-sahara-gold animate-pulse ${delay}`} />
            ))}
          </div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] robotic-digits">
            EL_NAFEER_MAIN_SERVER: 99.99% // SECURE
          </p>
        </div>
        <div className="text-[10px] font-black text-sahara-gold bg-sahara-gold/10 px-6 py-3 rounded-xl robotic-digits">
          AGENCY_PORTFOLIO_ONLINE
        </div>
      </div>
    </div>
  )
}
