'use client'

import Link from 'next/link'
import SocialShare from '@/components/SocialShare'
import { useLanguage } from './LanguageContext'

export default function HomeContent() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <div className="relative z-10 px-6 md:px-12 py-16 lg:py-32 overflow-hidden max-w-full">
      {/* Background Cyber Glows */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/5 blur-[80px] -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/5 blur-[80px] -ml-32 -mb-32 pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-32 relative">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-sahara-gold/30 bg-sahara-gold/5 mb-10 liquid-gloss prestige-card">
          <span className="w-2 h-2 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)]" />
          <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em]">Establishment_Protocol_v3.5</span>
        </div>

        <h1 className="text-5xl md:text-[clamp(3rem,8vw,9rem)] font-black mb-12 tracking-tighter uppercase italic leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="text-white block mb-6">{isArabic ? 'امتلك' : 'COMMAND'}</span>
          <span className="block transition-colors duration-1000 text-sahara-gold drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            {isArabic ? 'الفخامة العقارية' : 'ELITE DOMAINS'}
          </span>
        </h1>

        <p className="text-xl md:text-3xl text-gray-400 font-black max-w-5xl mx-auto leading-tight mb-24 uppercase tracking-tighter opacity-90">
          {isArabic
            ? 'بوابتك الحصرية لأرقى العقارات في مصر. تكنولوجيا الذكاء الاصطناعي تلتقي بالتخصص العقاري المطلق.'
            : 'Your exclusive portal to Egypt\'s premier estates. Where AI intelligence meets pure real estate specialization.'}
        </p>

        {/* Action Node Buttons */}
        <div className="flex flex-wrap justify-center gap-10 mb-32 relative z-20">
          <Link
            href="/properties"
            className="group relative px-14 py-8 bg-sahara-gold text-black rounded-3xl font-black text-sm uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(212,175,55,0.3)] liquid-gloss"
          >
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10">{isArabic ? 'استكشف التحف العقارية' : 'Explore Masterpieces'}</span>
          </Link>
          <Link
            href="/apply"
            className="group relative px-14 py-8 bg-white/5 border border-white/10 text-white rounded-3xl font-black text-sm uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-white/10 hover:border-sahara-gold/50 prestige-card"
          >
            <span className="relative z-10">{isArabic ? 'مستشار النفير العقاري' : 'Al-Nafeer Domain Specialist'}</span>
          </Link>
        </div>
      </div>

      {/* Futuristic Metrics */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-16 lg:gap-32 mb-40 border-y border-white/5 py-20 bg-white/[0.01] liquid-gloss">
        {[
          { label: isArabic ? 'مقر المقصد' : 'LOCATION', value: 'CAIRO_EGY' },
          { label: isArabic ? 'حالة المزامنة' : 'SYNC_STATUS', value: 'STABLE_ACTIVE' },
          { label: isArabic ? 'النواة' : 'CORE_ENGINE', value: 'ROBOTIC_ZENITH' },
        ].map((metric) => (
          <div key={metric.label} className="text-center group min-w-[200px]">
            <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4 group-hover:text-cyan-500/60 transition-colors">
              {metric.label}
            </div>
            <div className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Grids */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-40">
        {/* Sales Specialist Card */}
        <div className="rounded-[3rem] md:rounded-[4rem] p-12 md:p-20 relative group overflow-hidden prestige-card">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sahara-gold/5 blur-[100px] -mr-40 -mt-40 group-hover:opacity-100 opacity-0 transition-opacity" />
          <div className="relative z-10">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-sahara-gold/10 rounded-[2rem] flex items-center justify-center text-sahara-gold mb-10 border border-sahara-gold/20 liquid-gloss">
              <span className="text-3xl md:text-4xl">🏅</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 italic tracking-tighter uppercase text-white">
              {isArabic ? 'إغلاق صفقات متخصص' : 'Specialist Domain Closing'}
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-bold leading-relaxed uppercase tracking-tight">
              {isArabic
                ? 'خوارزمياتنا المتخصصة تضمن الوصول إلى أفضل المستثمرين العقاريين وإتمام الصفقات بجودة عالمية.'
                : 'Our specialist algorithms ensure access to elite real estate investors, closing deals with global prestige standards.'}
            </p>
          </div>
        </div>

        {/* Multi-Owner Dashboard Card */}
        <div className="rounded-[3rem] md:rounded-[4rem] p-12 md:p-20 relative group overflow-hidden prestige-card">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 blur-[100px] -ml-40 -mb-40 group-hover:opacity-100 opacity-0 transition-opacity" />
          <div className="relative z-10">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-cyan-500/10 rounded-[2rem] flex items-center justify-center text-cyan-400 mb-10 border border-cyan-500/20 liquid-gloss">
              <span className="text-3xl md:text-4xl">🏛️</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 italic tracking-tighter uppercase text-white">
              {isArabic ? 'إدارة الأصول العقارية' : 'Asset Orchestration'}
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-bold leading-relaxed uppercase tracking-tight">
              {isArabic
                ? 'قمرة قيادة متطورة لملاك الأصول توفر نظرة شاملة على دورة حياة العقار وعوائد الاستثمار المتوقعة.'
                : 'A sophisticated orchestration node for property owners, providing global oversight of asset lifecycle and ROI trajectory.'}
            </p>
          </div>
        </div>
      </div>

      {/* Floating AI Drone Visual */}
      <div className="fixed top-1/2 right-12 w-32 h-32 pointer-events-none z-0 opacity-20 hidden xl:block">
        <div className="absolute inset-0 bg-cyan-500/20 blur-3xl animate-pulse" />
        <div className="w-full h-full border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
          <div className="w-[80%] h-[80%] border border-cyan-500/20 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
          <div className="absolute w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,1)]" />
        </div>
      </div>


    </div>
  )
}
