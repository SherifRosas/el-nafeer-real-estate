'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import AdvancedBeitAlKhairMesh from '@/components/AdvancedBeitAlKhairMesh'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ChevronDown, 
  Zap, 
  MapPin, 
  Maximize2, 
  Bed, 
  Bath, 
  Filter, 
  TrendingUp, 
  Phone,
  LayoutGrid,
  Activity,
  Target,
  Circle,
  Cpu
} from 'lucide-react'

// 💎 Elite Asset Node (The "Lovely" Look)
const AssetNode = ({ title, price, location, area, beds, baths, image, i, isArabic }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="relative group bg-[#020408]/60 backdrop-blur-[40px] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-sahara-gold/40 transition-all duration-1000 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
  >
    {/* High-Fidelity Rim Light */}
    <div className="absolute inset-px rounded-[2.5rem] border border-white/[0.05] pointer-events-none z-20" />
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    {/* Image Portal */}
    <div className="relative h-72 overflow-hidden">
      <motion.img 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 1.5 }}
        src={image} 
        alt={title} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent" />
      
      {/* Sovereign Badge */}
      <div className="absolute top-8 right-8 flex items-center gap-3 bg-black/80 backdrop-blur-2xl border border-sahara-gold/30 px-4 py-2 rounded-full shadow-2xl">
         <div className="w-1.5 h-1.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_10px_#d4af37]" />
         <span className="text-[8px] font-black text-sahara-gold uppercase tracking-[0.4em] italic">Asset_Secured</span>
      </div>

      {/* Floating Price Tag */}
      <div className="absolute bottom-8 right-8 text-right">
         <motion.div 
           initial={{ x: 20, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           className="space-y-1"
         >
            <p className="text-[9px] font-black text-sahara-gold/40 uppercase tracking-[0.6em] italic">ESTIMATED_VALUE</p>
            <h3 className="text-4xl font-black italic text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
               {price}
            </h3>
         </motion.div>
      </div>
    </div>

    {/* Content Architecture */}
    <div className="p-10 space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
           <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none group-hover:text-sahara-gold transition-colors duration-500">
              {title}
           </h3>
           <div className="flex items-center gap-3 text-white/30">
              <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center">
                 <MapPin size={10} className="text-sahara-gold/60" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">{location}</span>
           </div>
        </div>
        <div className="relative w-12 h-12 flex items-center justify-center">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 rounded-full border border-sahara-gold/10 border-dashed"
           />
           <Target size={20} className="text-sahara-gold/30 group-hover:text-sahara-gold group-hover:scale-110 transition-all duration-500" />
        </div>
      </div>

      {/* Technical Spec Matrix */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-3xl">
         {[
           { label: 'AREA', val: area, unit: 'm²', icon: Maximize2 },
           { label: 'UNITS', val: beds, unit: 'U', icon: Bed },
           { label: 'BATHS', val: baths, unit: 'B', icon: Bath }
         ].map((spec, idx) => (
           <div key={idx} className={`flex flex-col items-center justify-center py-5 space-y-2 ${idx === 1 ? 'bg-white/[0.05] rounded-2xl border-x border-white/5' : ''}`}>
              <spec.icon size={14} className="text-sahara-gold/40" />
              <div className="text-center">
                 <p className="text-xs font-black italic text-white">{spec.val}</p>
                 <p className="text-[7px] font-black text-white/20 uppercase tracking-widest">{spec.label}</p>
              </div>
           </div>
         ))}
      </div>

      <button className="w-full h-16 bg-sahara-gold text-black rounded-2xl font-black text-xs uppercase tracking-[0.5em] italic shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:bg-white hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all duration-500 flex items-center justify-center gap-4 group/btn overflow-hidden relative">
         <div className="absolute inset-0 bg-black/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
         <Zap size={18} className="relative z-10" />
         <span className="relative z-10">{isArabic ? 'تنفيذ_الاستحواذ' : 'EXECUTE_ACQUISITION'}</span>
      </button>
    </div>
  </motion.div>
)

export default function BeitAlKhairPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`relative min-h-screen w-screen bg-[#020408] text-white font-sans flex flex-col overflow-x-hidden selection:bg-sahara-gold selection:text-black ${isArabic ? 'rtl' : 'ltr'}`}>
      
      {/* 🌌 BASE LAYER: DYNAMIC NEURAL MESH */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <AdvancedBeitAlKhairMesh />
      </div>

      {/* 🛡️ ELITE SEARCH CONSOLE (The "Lovely" Header) */}
      <header className="sticky top-0 z-[100] h-28 bg-[#020408]/60 backdrop-blur-[50px] border-b border-white/5 px-10 lg:px-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-5 cursor-pointer"
          >
             <div className="w-14 h-14 rounded-2xl overflow-hidden border border-sahara-gold/40 bg-black p-2 shadow-[0_0_30px_rgba(212,175,55,0.25)] relative group">
                <div className="absolute inset-0 bg-sahara-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src="/campaigns/beit-alkhair/official-logo.jpg" alt="Logo" className="w-full h-full object-contain relative z-10" />
             </div>
             <div className="hidden md:block">
                <h1 className="text-2xl font-black italic tracking-tighter leading-none uppercase">
                   BEIT <span className="text-sahara-gold">AL-KHAIR</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                   <div className="h-[1px] w-8 bg-sahara-gold/40" />
                   <p className="text-[8px] font-black text-white/20 tracking-[0.6em] uppercase">Sovereign_System_v4.5</p>
                </div>
             </div>
          </motion.div>
          
          {/* Central Command Search */}
          <div className="relative hidden xl:block w-[600px] group">
             <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <Search size={20} className={`${isArabic ? 'right-6' : 'left-6'} absolute top-1/2 -translate-y-1/2 text-sahara-gold/30 group-focus-within:text-sahara-gold transition-colors`} />
             <input 
               type="text" 
               placeholder={isArabic ? 'البحث في المحفظة السيادية...' : 'SEARCH_SOVEREIGN_PORTFOLIO...'}
               className={`${isArabic ? 'pr-16 pl-8' : 'pl-16 pr-8'} w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl text-sm font-black italic focus:outline-none focus:border-sahara-gold/50 transition-all placeholder:text-white/5`}
             />
          </div>
        </div>

        <div className="flex items-center gap-10">
           <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.5em] mb-1">Neural_Uplink</span>
              <div className="flex items-center gap-3">
                 <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-sahara-gold/20 rounded-full overflow-hidden"><motion.div animate={{ y: [-12, 12] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="w-full h-full bg-sahara-gold" /></div>)}
                 </div>
                 <span className="text-[9px] font-black text-white uppercase italic">Active_Stable</span>
              </div>
           </div>
           <button className="bg-sahara-gold text-black w-16 h-16 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] hover:scale-105 transition-all flex items-center justify-center group">
              <Phone size={24} className="group-hover:rotate-12 transition-transform" />
           </button>
        </div>
      </header>

      <div className="flex-1 flex relative z-10">
        
        {/* 🏙️ PROPERTY ARCHIVE (The High-Fidelity Feed) */}
        <main className="flex-1 p-10 lg:p-24 order-1 lg:order-2">
           <div className="max-w-[1300px] mx-auto space-y-24">
              
              {/* Cinematic Section Header */}
              <div className="relative">
                 <div className="absolute -left-12 top-0 h-full w-[2px] bg-gradient-to-b from-sahara-gold via-transparent to-transparent opacity-40" />
                 <div className="space-y-4">
                    <div className="flex items-center gap-6">
                       <Cpu size={24} className="text-sahara-gold animate-spin-slow" />
                       <span className="text-[14px] font-black text-sahara-gold uppercase tracking-[0.8em] italic opacity-60">Sovereign_Feed_Active</span>
                    </div>
                    <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-none">
                       {isArabic ? 'المحفظة العقارية' : 'ESTATE_CORE'}
                    </h2>
                    <div className="flex items-center gap-8 pt-4">
                       <div className="flex items-center gap-3 text-[12px] font-black text-white/20 uppercase tracking-[0.4em]">
                          <Activity size={14} />
                          <span>SYNCING: 24_ASSET_NODES</span>
                       </div>
                       <div className="h-px flex-1 bg-white/5" />
                       <span className="text-sahara-gold text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Sort_By: Global_Prestige</span>
                    </div>
                 </div>
              </div>

              {/* Grid of Masterpieces */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-40">
                 {[
                   { title: 'Banha_Prime_Node_01', price: '4,250,000 EGP', location: 'Banha Central', area: '240', beds: '4', baths: '3', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop' },
                   { title: 'Toukh_Horizon_Alpha', price: '2,800,000 EGP', location: 'Toukh Central', area: '180', beds: '3', baths: '2', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop' },
                   { title: 'Qasr_Elite_Sovereign', price: '12,400,000 EGP', location: 'Banha Waterfront', area: '550', beds: '6', baths: '5', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop' },
                   { title: 'Zayed_Luxury_Terminal', price: '8,150,000 EGP', location: 'West Cairo Node', area: '320', beds: '4', baths: '4', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' }
                 ].map((asset, i) => (
                   <AssetNode key={i} {...asset} i={i} isArabic={isArabic} />
                 ))}
              </div>

           </div>
        </main>

        {/* 📑 PARAMETERS CONSOLE (The Side Panel) */}
        <aside className="hidden lg:flex w-[450px] h-[calc(100vh-112px)] sticky top-28 flex-col bg-black/40 backdrop-blur-[60px] border-l border-white/5 p-16 space-y-16 order-2 lg:order-1">
           <div className="space-y-12">
              <div className="flex items-center gap-6">
                 <div className="w-10 h-10 rounded-full border border-sahara-gold/30 flex items-center justify-center">
                    <Filter size={16} className="text-sahara-gold" />
                 </div>
                 <h2 className="text-xs font-black text-white uppercase tracking-[0.6em] italic">Parameters</h2>
              </div>
              
              <div className="space-y-12">
                 {/* Asset Class Selector */}
                 <div className="space-y-4">
                    <div className="flex justify-between items-end px-2">
                       <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">{isArabic ? 'فئة_الأصول' : 'ASSET_CLASS'}</label>
                       <span className="text-[8px] font-mono text-sahara-gold/40">SEL_01</span>
                    </div>
                    <div className="w-full h-20 bg-white/[0.02] border border-white/10 rounded-3xl px-8 flex items-center justify-between text-sm font-black italic cursor-pointer hover:bg-white/[0.05] hover:border-sahara-gold/40 transition-all group">
                       <span className="text-white group-hover:text-sahara-gold transition-colors">{isArabic ? 'قصور وفيلات' : 'PALACES & VILLAS'}</span>
                       <ChevronDown size={18} className="text-sahara-gold/40 group-hover:text-sahara-gold transition-all" />
                    </div>
                 </div>

                 {/* Price Matrix */}
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic ml-2">{isArabic ? 'نطاق_السعر' : 'PRICE_RANGE'}</label>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="relative group/field">
                          <span className="absolute top-4 left-6 text-[8px] font-black text-sahara-gold/40 uppercase">MIN</span>
                          <input type="text" placeholder="500K" className="w-full h-20 bg-white/[0.01] border border-white/5 rounded-2xl pl-6 pr-6 pt-6 text-sm font-black italic focus:border-sahara-gold/40 outline-none transition-all" />
                       </div>
                       <div className="relative group/field">
                          <span className="absolute top-4 left-6 text-[8px] font-black text-sahara-gold/40 uppercase">MAX</span>
                          <input type="text" placeholder="50M+" className="w-full h-20 bg-white/[0.01] border border-white/5 rounded-2xl pl-6 pr-6 pt-6 text-sm font-black italic focus:border-sahara-gold/40 outline-none transition-all" />
                       </div>
                    </div>
                 </div>

                 {/* Geographic Nodes */}
                 <div className="space-y-6">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic ml-2">{isArabic ? 'نطاق_الاستحواذ' : 'ACQUISITION_ZONE'}</label>
                    <div className="space-y-4">
                      {['BANHA_CENTRAL', 'TOUKH_HORIZON', 'QASR_ELITE'].map(loc => (
                        <div key={loc} className="flex items-center justify-between group cursor-pointer bg-white/[0.01] hover:bg-white/[0.04] p-5 rounded-2xl border border-transparent hover:border-white/10 transition-all">
                           <span className="text-[11px] font-black text-white/30 group-hover:text-white uppercase tracking-widest transition-colors italic">{loc}</span>
                           <div className="relative w-5 h-5 flex items-center justify-center">
                              <div className="absolute inset-0 rounded border border-white/10 group-hover:border-sahara-gold transition-all" />
                              <Circle size={8} className="text-sahara-gold scale-0 group-hover:scale-100 transition-transform fill-current" />
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Market Intel Module */}
           <div className="mt-auto p-8 bg-gradient-to-br from-sahara-gold/10 to-transparent border border-sahara-gold/30 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                 <Activity size={40} className="text-sahara-gold" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-sahara-gold rounded-full animate-ping" />
                   <span className="text-[10px] font-black text-sahara-gold uppercase tracking-widest">Market_Heat_Active</span>
                </div>
                <p className="text-[14px] font-black italic text-white leading-relaxed uppercase">
                   {isArabic ? 'سجلت بنها زيادة بنسبة 12.4٪ في قيمة الأصول هذا الشهر.' : 'Banha Prime Node has increased in value by 12.4% this month.'}
                </p>
              </div>
           </div>
        </aside>

      </div>

      {/* 🏙️ DEEP SYSTEM FOOTER */}
      <footer className="relative z-10 py-32 border-t border-white/5 bg-[#020408] text-center">
         <div className="max-w-4xl mx-auto space-y-10 opacity-10">
            <p className="text-[12px] font-mono text-sahara-gold tracking-[4em] uppercase">SOVEREIGN_SYSTEMS_2024</p>
            <div className="flex justify-center gap-12 text-[9px] font-black uppercase tracking-[0.8em] italic">
               <span>AR_ENCRYPTED</span>
               <span>PHD_LEVEL_LOGISTICS</span>
               <span>BANHA_CENTRAL</span>
            </div>
         </div>
      </footer>

      {/* 📺 CRT & NOISE OVERLAY (Final Polish) */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,4px_100%]" />
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

    </div>
  )
}
