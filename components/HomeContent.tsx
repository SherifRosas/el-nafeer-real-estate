'use client'

import Link from 'next/link'
import SocialShare from '@/components/SocialShare'
import { useLanguage } from './LanguageContext'

export default function HomeContent() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <div className="relative z-10 px-6 md:px-12 py-16 lg:py-32 overflow-hidden max-w-full">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Background Cyber Glows */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-sahara-gold/[0.03] blur-[120px] -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-cyan-500/[0.03] blur-[120px] -ml-32 -mb-32 pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-32 relative">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-xl border border-white/10 milky-glass mb-10 liquid-gloss prestige-card group">
          <span className="w-2 h-2 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
          <span className="text-[10px] font-black text-gray-300 group-hover:text-sahara-gold transition-colors uppercase tracking-[0.4em] robotic-digits">ESTABLISHMENT_PROTOCOL_v3.5_RELEASE</span>
        </div>

        <h1 className="text-5xl md:text-[clamp(3rem,8vw,9rem)] font-black mb-12 tracking-tighter uppercase italic leading-[0.85] animate-in fade-in transition-all duration-700">
          <span className="text-white block mb-6">{isArabic ? 'قيادة' : 'MASTER'}</span>
          <span className="block transition-all duration-1000 text-sahara-gold drop-shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:scale-105 transform cursor-default">
            {isArabic ? 'العقارات النخبة' : 'ELITE_PROPERTIES'}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 font-bold max-w-4xl mx-auto leading-tight mb-24 uppercase tracking-tighter opacity-80 border-y border-white/5 py-8">
          {isArabic
            ? 'الاندماج التام بين ذكاء الآلة والتفوق العقاري المطلق.'
            : 'The total fusion of machine intelligence and absolute real estate dominance.'}
        </p>

        {/* Action Node Buttons */}
        <div className="flex flex-wrap justify-center gap-10 mb-32 relative z-20">
          <Link
            href="/admin/login"
            className="group relative px-16 py-10 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.4em] overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-sahara-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-black">{isArabic ? 'تحميل الأصول' : 'LOAD_MASTER_ASSETS'}</span>
          </Link>
          <Link
            href="/apply"
            className="group relative px-16 py-10 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] overflow-hidden transition-all hover:bg-white/10 hover:border-sahara-gold/50 milky-glass"
          >
            <span className="relative z-10">{isArabic ? 'بدء التحليل' : 'INITIATE_ANALYSIS'}</span>
          </Link>
        </div>
      </div>

      {/* Robotic Metrics Mesh */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-40 border-t border-b border-white/10 py-24 milky-glass relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sahara-gold/[0.02] to-transparent pointer-events-none" />
        {[
          { label: isArabic ? 'الإحداثيات' : 'COORDINATES', value: 'CAIRO_EGY_02' },
          { label: isArabic ? 'الحالة التشغيلية' : 'SYSTEM_STATUS', value: 'OPERATIONAL_STABLE' },
          { label: isArabic ? 'نواة المعالجة' : 'NEURAL_CORE', value: 'ROBOTIC_ZENITH_X1' },
        ].map((metric) => (
          <div key={metric.label} className="text-center group px-12 relative">
            <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em] mb-4 group-hover:text-sahara-gold transition-colors robotic-digits">
              {metric.label}
            </div>
            <div className="text-2xl font-black text-white italic tracking-tighter uppercase group-hover:text-white transition-colors robotic-digits">
              {metric.value}
            </div>
            <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 w-0 h-[2px] bg-sahara-gold group-hover:w-full transition-all duration-700" />
          </div>
        ))}
      </div>

      {/* Specialized Nodes */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
        {/* Node A: Transaction Engine */}
        <div className="rounded-[2.5rem] p-16 md:p-24 relative group overflow-hidden milky-glass hover:border-sahara-gold/40 transition-all duration-500 hover:translate-y-[-10px]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sahara-gold/[0.05] blur-[100px] group-hover:opacity-100 opacity-0 transition-opacity" />
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center text-sahara-gold mb-12 border border-white/10 shadow-2xl group-hover:scale-110 transition-transform">
              <span className="text-4xl">⚙️</span>
            </div>
            <h2 className="text-4xl font-black mb-8 italic tracking-tighter uppercase text-white group-hover:text-sahara-gold transition-colors">
              {isArabic ? 'محرك الصفقات' : 'TRANSACTION_ENGINE'}
            </h2>
            <p className="text-sm text-gray-500 font-bold leading-relaxed uppercase tracking-widest leading-[2]">
              {isArabic
                ? 'استخدام خوارزميات الذكاء الاصطناعي لتحليل السوق وإغلاق الصفقات العقارية بدقة متناهية.'
                : 'Utilizing neural market analysis to verify and close high-prestige real estate nodes with robotic precision.'}
            </p>
          </div>
        </div>

        {/* Node B: Asset Protocol */}
        <div className="rounded-[2.5rem] p-16 md:p-24 relative group overflow-hidden milky-glass hover:border-cyan-500/40 transition-all duration-500 hover:translate-y-[-10px]">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/[0.05] blur-[100px] group-hover:opacity-100 opacity-0 transition-opacity" />
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center text-cyan-400 mb-12 border border-white/10 shadow-2xl group-hover:scale-110 transition-transform">
              <span className="text-4xl">🛰️</span>
            </div>
            <h2 className="text-4xl font-black mb-8 italic tracking-tighter uppercase text-white group-hover:text-cyan-400 transition-colors">
              {isArabic ? 'بروتوكول الأصول' : 'ASSET_PROTOCOL'}
            </h2>
            <p className="text-sm text-gray-500 font-bold leading-relaxed uppercase tracking-widest leading-[2]">
              {isArabic
                ? 'نظام مركزي لملاك العقارات يسمح بمراقبة الأداء المالي والنمو الاستراتيجي للمحفظة العقارية.'
                : 'Centralized orchestration node for asset owners, managing financial trajectory and strategic portfolio growth.'}
            </p>
          </div>
        </div>
      </div>

      {/* Global Status Bar */}
      <div className="max-w-7xl mx-auto mb-20 p-8 rounded-2xl border border-white/5 flex flex-wrap justify-between items-center gap-6 milky-glass">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            {['delay-75', 'delay-150', 'delay-300'].map((delay, i) => (
              <div key={i} className={`w-1 h-4 bg-sahara-gold animate-pulse ${delay}`} />
            ))}
          </div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] robotic-digits">
            NETWORK_UPTIME: 99.99% // RE_EGY_GRID_ACTIVE
          </p>
        </div>
        <div className="text-[10px] font-black text-sahara-gold bg-sahara-gold/10 px-4 py-2 rounded-lg robotic-digits">
          ENCRYPTED_LINK_ESTABLISHED
        </div>
      </div>

      {/* Floating AI Drone Visual */}
      <div className="fixed top-1/2 right-12 w-32 h-32 pointer-events-none z-0 opacity-10 hidden xl:block">
        <div className="absolute inset-0 bg-cyan-500/20 blur-3xl animate-pulse" />
        <div className="w-full h-full border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
          <div className="w-[80%] h-[80%] border border-cyan-500/20 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
          <div className="absolute w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,1)]" />
        </div>
      </div>
    </div>
  )
}
