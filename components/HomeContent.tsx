'use client'

import Link from 'next/link'
import { useLanguage } from './LanguageContext'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ChevronDown, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  Cpu, 
  Briefcase, 
  ArrowUpRight,
  Phone,
  Building2,
  Wallet
} from 'lucide-react'

export default function HomeContent() {
  const { language, setLanguage } = useLanguage()
  const isArabic = language === 'ar'
  const [mounted, setMounted] = useState(false)
  const [telemetry, setTelemetry] = useState({ assets: '00.0B', users: '00,000' })

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTelemetry({
        assets: (Math.random() * 10 + 40).toFixed(1) + 'B',
        users: Math.floor(Math.random() * 1000 + 15000).toLocaleString()
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen w-full bg-[#020408] text-white font-sans selection:bg-sahara-gold selection:text-black overflow-x-hidden">
      
      {/* 🌌 ROYAL CYBER BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-sahara-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03]" />
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,4px_100%]" />
      </div>

      {/* 🛡️ SOVEREIGN TOP NAVIGATION */}
      <nav className="sticky top-0 z-[200] h-20 bg-black/40 backdrop-blur-2xl border-b border-white/5 px-8 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-black border border-sahara-gold/30 p-1.5 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <img src="/beit-alkhair-logo.jpg" alt="Logo" className="w-full h-full object-contain" />
             </div>
             <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">
                EL <span className="text-sahara-gold">NAFEER</span>
             </h1>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
             <Link href="/beit-alkhair" className="hover:text-sahara-gold transition-colors">{isArabic ? 'العقارات' : 'REAL ESTATE'}</Link>
             <Link href="/portal/lever-pioneer-elite" className="hover:text-sahara-gold transition-colors">{isArabic ? 'الصناعة' : 'INDUSTRIAL'}</Link>
             <Link href="/help" className="hover:text-sahara-gold transition-colors">{isArabic ? 'المساعدة' : 'HELP'}</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <button 
             onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
             className="text-[10px] font-black text-sahara-gold hover:text-white transition-colors"
           >
             {language === 'ar' ? 'ENGLISH' : 'العربية'}
           </button>
           <a href="https://wa.me/201558408659" className="bg-sahara-gold text-black px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              {isArabic ? 'تواصل سيادي' : 'VIP CONTACT'}
           </a>
        </div>
      </nav>

      {/* 👑 HERO: SOVEREIGN SEARCH HUB (The Nawy Convergence) */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-5xl"
        >
          <div className="flex items-center justify-center gap-4 opacity-50">
             <div className="h-px w-12 bg-sahara-gold" />
             <span className="text-[12px] font-black text-sahara-gold uppercase tracking-[0.8em] italic">SOVEREIGN_TECH_AGENCY</span>
             <div className="h-px w-12 bg-sahara-gold" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-[0.8]">
             {isArabic ? 'بوابة النفير' : 'EL-NAFEER'} <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-sahara-gold via-white to-sahara-gold">GATEWAY</span>
          </h1>
          
          {/* 🔍 SEARCH CONSOLE (The Functional Core) */}
          <div className="mt-16 w-full max-w-4xl mx-auto p-2 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl relative group">
             <div className="absolute inset-0 rounded-[2.5rem] border border-sahara-gold/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="flex flex-col md:flex-row items-stretch gap-2">
                <div className="flex-1 flex items-center px-8 h-20 bg-white/[0.02] rounded-[2rem] border border-white/5 group-focus-within:border-sahara-gold/40 transition-all">
                   <Search size={20} className="text-sahara-gold/40 mr-4" />
                   <input 
                     type="text" 
                     placeholder={isArabic ? 'ابحث عن أصل عقاري أو صناعي سيادي...' : 'SEARCH_SOVEREIGN_ASSETS...'}
                     className="bg-transparent border-none text-white font-black italic text-sm w-full outline-none placeholder:text-white/10"
                   />
                </div>
                <div className="hidden md:flex items-center px-8 h-20 bg-white/[0.02] border border-white/5 rounded-[2rem] cursor-pointer hover:bg-white/[0.05] transition-all">
                   <Building2 size={18} className="text-sahara-gold/40 mr-3" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{isArabic ? 'كل المشاريع' : 'ALL PROJECTS'}</span>
                   <ChevronDown size={14} className="ml-3 text-white/20" />
                </div>
                <button className="h-20 px-12 bg-sahara-gold text-black font-black uppercase text-xs tracking-[0.3em] rounded-[2rem] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 shrink-0">
                   <Zap size={18} />
                   {isArabic ? 'بدء الاستحواذ' : 'INITIATE ACQUISITION'}
                </button>
             </div>
          </div>
        </motion.div>

        {/* 📊 LIVE TELEMETRY BAR */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24 opacity-40">
           <div className="text-center">
              <p className="text-[10px] font-black text-sahara-gold uppercase tracking-widest mb-1">Managed_Assets</p>
              <p className="text-2xl font-black italic text-white robotic-digits">${telemetry.assets}</p>
           </div>
           <div className="text-center border-l border-r border-white/10 px-12 md:px-24">
              <p className="text-[10px] font-black text-sahara-gold uppercase tracking-widest mb-1">Sovereign_Investors</p>
              <p className="text-2xl font-black italic text-white robotic-digits">{telemetry.users}+</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] font-black text-sahara-gold uppercase tracking-widest mb-1">Global_Sync</p>
              <div className="flex items-center justify-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <p className="text-2xl font-black italic text-white robotic-digits">0.8ms</p>
              </div>
           </div>
        </div>
      </section>

      {/* 🏛️ FEATURED DESTINATIONS (Beit Al-Khair Integration) */}
      <section className="relative z-10 py-32 px-8 lg:px-16 max-w-7xl mx-auto space-y-16">
         <div className="flex justify-between items-end">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <Cpu size={18} className="text-sahara-gold" />
                  <span className="text-[12px] font-black text-sahara-gold uppercase tracking-[0.6em] italic">Strategic_Operations</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                  {isArabic ? 'القطاعات السيادية' : 'SOVEREIGN_SECTORS'}
               </h2>
            </div>
            <Link href="/properties" className="text-xs font-black text-white/40 uppercase tracking-widest hover:text-sahara-gold transition-colors flex items-center gap-2">
               {isArabic ? 'عرض المحفظة بالكامل' : 'VIEW FULL PORTFOLIO'} <ArrowUpRight size={14} />
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Real Estate Node */}
            <Link href="/beit-alkhair" className="group relative aspect-[16/9] bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden hover:border-sahara-gold/40 transition-all duration-700 shadow-2xl">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
               <div className="absolute bottom-10 left-10 right-10 space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-2 italic">Real_Estate_Core</p>
                        <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">{isArabic ? 'بيت الخير' : 'BEIT AL-KHAIR'}</h3>
                     </div>
                     <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-sahara-gold group-hover:text-black transition-all">
                        <ArrowUpRight size={24} />
                     </div>
                  </div>
               </div>
            </Link>

            {/* Industrial Node */}
            <Link href="/portal/lever-pioneer-elite" className="group relative aspect-[16/9] bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden hover:border-blue-400/40 transition-all duration-700 shadow-2xl">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
               <div className="absolute bottom-10 left-10 right-10 space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2 italic">Industrial_Intelligence</p>
                        <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">{isArabic ? 'رافع_بايونير' : 'LEVER PIONEER'}</h3>
                     </div>
                     <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-blue-400 group-hover:text-black transition-all">
                        <ArrowUpRight size={24} />
                     </div>
                  </div>
               </div>
            </Link>

            {/* Hardware Retail Node */}
            <Link href="/hadayek-al-ahram-screen-store-and-repair" className="group relative aspect-[16/9] bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden hover:border-purple-400/40 transition-all duration-700 shadow-2xl">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
               <div className="absolute bottom-10 left-10 right-10 space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2 italic">Hardware_Retail_Core</p>
                        <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">{isArabic ? 'متجر الشاشات' : 'SCREEN STORE'}</h3>
                     </div>
                     <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-purple-400 group-hover:text-black transition-all">
                        <ArrowUpRight size={24} />
                     </div>
                  </div>
               </div>
            </Link>
         </div>
      </section>

      {/* 🛠️ SERVICES HUB (The Functional Convergence) */}
      <section className="relative z-10 py-32 bg-white/[0.02] border-y border-white/5 px-8">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 p-8 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-sahara-gold/40 transition-all group">
               <div className="w-16 h-16 bg-sahara-gold/10 rounded-2xl flex items-center justify-center text-sahara-gold group-hover:bg-sahara-gold group-hover:text-black transition-all">
                  <Wallet size={32} />
               </div>
               <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">{isArabic ? 'التمويل السيادي' : 'SOVEREIGN CREDIT'}</h3>
               <p className="text-sm text-white/40 leading-relaxed italic">{isArabic ? 'حلول تمويل عقاري بنظام القسط الملكي الممتد حتى 10 سنوات.' : 'Premium real estate financing solutions with sovereign installment plans up to 10 years.'}</p>
            </div>
            <div className="space-y-6 p-8 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-sahara-gold/40 transition-all group">
               <div className="w-16 h-16 bg-sahara-gold/10 rounded-2xl flex items-center justify-center text-sahara-gold group-hover:bg-sahara-gold group-hover:text-black transition-all">
                  <Briefcase size={32} />
               </div>
               <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">{isArabic ? 'إدارة الأصول' : 'ASSET MANAGEMENT'}</h3>
               <p className="text-sm text-white/40 leading-relaxed italic">{isArabic ? 'إدارة عقاراتك وصيانة أصولك بذكاء اصطناعي سيادي كامل.' : 'Manage your real estate and maintain your assets with full sovereign AI integration.'}</p>
            </div>
            <div className="space-y-6 p-8 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-sahara-gold/40 transition-all group">
               <div className="w-16 h-16 bg-sahara-gold/10 rounded-2xl flex items-center justify-center text-sahara-gold group-hover:bg-sahara-gold group-hover:text-black transition-all">
                  <Globe size={32} />
               </div>
               <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">{isArabic ? 'الانتشار العالمي' : 'GLOBAL REACH'}</h3>
               <p className="text-sm text-white/40 leading-relaxed italic">{isArabic ? 'تسويق عقاراتك للنخبة من المستثمرين حول العالم عبر شبكتنا السيادية.' : 'Market your properties to elite global investors via our sovereign network.'}</p>
            </div>
         </div>
      </section>

      {/* 🏙️ FOOTER: GLOBAL UPLINK */}
      <footer className="relative z-10 py-32 border-t border-white/5 px-8">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 opacity-40">
            <div className="space-y-4 text-center md:text-left">
               <p className="text-[12px] font-mono text-sahara-gold tracking-[3em] uppercase">SOVEREIGN_SYSTEMS_2024</p>
               <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em] italic">Proprietary AI Architecture & Robotic Real Estate Orchestration.</p>
            </div>
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-white/40">
               <Link href="/terms" className="hover:text-sahara-gold">Terms</Link>
               <Link href="/privacy" className="hover:text-sahara-gold">Privacy</Link>
               <Link href="/verify" className="hover:text-sahara-gold">Verify_Agent</Link>
            </div>
         </div>
      </footer>

    </div>
  )
}
