'use client'

import React from 'react'
import { db } from '@/lib/supabase'
import BeitAlKhairUnifiedConsole from '@/components/BeitAlKhairUnifiedConsole'
import QuantumNeuralMesh from '@/components/QuantumNeuralMesh'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguage } from '@/components/LanguageContext'

// --- BEIT AL-KHAIR BILINGUAL DICTIONARY ---
const DICTIONARY = {
  ar: {
    title: 'بيت الخير للتطوير العقاري',
    subtitle: 'منصة بيت الخير | الإصدار ٣.٥.٠ - مستقر',
    node: 'عقدة_سيادية',
    domain: 'نطاق_القليوبية_٤',
    console_title: 'وحدة التحكم',
    console_subtitle: 'النظام',
    intel_stream: 'تدفق_معلومات_الآدمن',
    reservation: 'ابدأ_الحجز_الآن',
    status: 'مستقر',
    footer_text: 'تأسيس الهيمنة السيادية للنود...'
  },
  en: {
    title: 'BEIT AL-KHAIR REAL ESTATE',
    subtitle: 'BEIT_AL_KHAIR_PLATFORM // v3.5.0-ESTABLISHED',
    node: 'SOVEREIGN_NODE',
    domain: 'QALYUBIA_DOMAIN_IV',
    console_title: 'CONSOLE',
    console_subtitle: 'SYSTEM',
    intel_stream: 'ADMIN_INTEL_STREAM',
    reservation: 'INITIATE_RESERVATION',
    status: 'STABLE',
    footer_text: 'ESTABLISHING_SOVEREIGN_NODE_DOMINANCE...'
  }
}

export default function BeitAlKhairPage() {
  const { language } = useLanguage()
  const t = DICTIONARY[language]
  
  // Note: Properties will be fetched inside the console or passed down if we convert this to a Client Component fully
  // For now, keeping it consistent with the existing UnifiedConsole logic.
  
  return (
    <main className="h-screen w-screen bg-[#050811] text-white overflow-hidden flex flex-col p-2 lg:p-6 selection:bg-sahara-gold selection:text-black font-sans relative">
      {/* 🚀 NEURAL_MESH_BASE_LAYER - COVERS ALL OF EGYPT */}
      <QuantumNeuralMesh />

      {/* 📟 TOP_LEVEL_SYMMETRIC_HEADER */}
      <header className="flex justify-between items-center mb-1 lg:mb-4 border-b border-sahara-gold/10 pb-1 lg:pb-3 px-2 lg:px-6 relative z-50 bg-black/40 backdrop-blur-2xl rounded-3xl">
        <div className="flex items-center gap-3 lg:gap-6">
            <div className="w-10 h-10 lg:w-16 lg:h-16 flex items-center justify-center overflow-hidden rounded-xl border border-sahara-gold/20 bg-black/50 shadow-[0_0_20px_rgba(197,160,89,0.1)]">
                <img 
                    src="/campaigns/beit-alkhair/official-logo.jpg" 
                    alt="Beit Al-Khair Official" 
                    className="w-full h-full object-contain brightness-110"
                />
            </div>
            <div className="flex flex-col">
                <h1 className={`text-sm lg:text-2xl font-bold text-[#fcfcfc] uppercase tracking-wide leading-none mb-0.5 lg:mb-1 ${language === 'ar' ? 'font-["Cairo"]' : ''}`}>
                  {t.title}
                </h1>
                <div className="flex items-center gap-1.5 lg:gap-2 opacity-40">
                  <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-sahara-gold rounded-full" />
                  <p className="text-[5px] lg:text-[7px] font-black text-white uppercase tracking-[0.2em] lg:tracking-[0.4em] robotic-digits leading-none">
                    {t.subtitle}
                  </p>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-16">
            <LanguageSwitcher />
            <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[5px] lg:text-[7px] font-black text-sahara-gold/50 uppercase tracking-[0.4em] leading-none mb-1">{t.node}</span>
                <span className="text-[6px] lg:text-[10px] font-black text-white/80 italic uppercase tracking-[0.1em] border-b border-sahara-gold/20 pb-0.5">{t.domain}</span>
            </div>
        </div>
      </header>

      {/* 🕹️ MAIN_CONSOLE_BODY */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 min-h-0 relative z-40">
        
        {/* 📋 TACTICAL_SIDEBAR */}
        <aside className="lg:col-span-3 hidden lg:flex flex-col gap-6 min-h-0 order-2 lg:order-1">
            {/* Project HUD */}
            <div className="flex-1 prestige-glass rounded-[3.5rem] p-10 flex flex-col justify-between relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-sahara-gold to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-sahara-gold/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-[1px] bg-sahara-gold shadow-[0_0_10px_#c5a059]" />
                      <span className="text-[9px] font-black text-sahara-gold uppercase tracking-[0.6em] italic">{t.intel_stream}</span>
                    </div>
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-[0.8] mb-4">
                      {t.console_subtitle}<br/><span className="text-luxury-gold">{t.console_title}</span>
                    </h2>
                </div>

                <div className="space-y-8">
                    {[
                        { label: 'FINANCE_ENGINE_v3', value: '10%_REDUCING' },
                        { label: 'LIQUIDITY_MANDATE', value: '40%_DOWN' },
                        { label: 'SYNC_PERIOD', value: '12-36_MO' }
                    ].map((item, idx) => (
                        <div key={idx} className="space-y-2">
                            <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-none">{item.label}</p>
                            <p className="text-xs font-black text-white uppercase tracking-[0.3em] robotic-digits border-l-2 border-sahara-gold/20 pl-4">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/10">
                   <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-relaxed italic opacity-60">
                       {t.footer_text}
                   </p>
                </div>
            </div>

            {/* CTA_BUTTON_LUXE */}
            <div className="bg-sahara-gold rounded-[3rem] p-8 shadow-[0_30px_80px_rgba(212,175,55,0.25)] flex flex-col gap-4 group cursor-pointer hover:scale-[1.03] transition-all hover:rotate-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <a 
                    href="https://wa.me/201033332112?text=I%20am%20interested%20in%20Beit%20Al-Khair%20Quantum%20Acquisition%20(Ref:beit-alkhair-quantum)"
                    className="flex flex-col gap-3"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-black/60 uppercase tracking-[0.5em]">DIRECT_LINK</span>
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-sahara-gold animate-bounce">⚡</div>
                    </div>
                    <span className="text-xl font-black text-black uppercase tracking-tighter italic leading-none">{t.reservation}</span>
                </a>
            </div>
        </aside>

        {/* 🕸️ THE_NEURAL_COMMAND_CENTER (Quantum Unified Console) */}
        <section className="lg:col-span-9 bg-black/40 backdrop-blur-3xl rounded-[2rem] lg:rounded-[4rem] border-2 border-white/5 relative overflow-hidden order-1 lg:order-2 shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            <BeitAlKhairUnifiedConsole 
              properties={[]} 
            />
        </section>

      </div>
    </main>
  )
}
