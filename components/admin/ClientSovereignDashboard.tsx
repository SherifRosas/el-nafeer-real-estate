'use client'

import { useLanguage } from '../LanguageContext'
import { useState, useEffect, useMemo } from 'react'
import { supabase, TABLES } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Activity, 
    Shield, 
    Zap, 
    Terminal, 
    Network,
    Monitor,
    Layout,
    User,
    TrendingUp,
    DollarSign,
    Target,
    BarChart3,
    Map as MapIcon,
    Cpu,
    Briefcase,
    Crown
} from 'lucide-react'

interface Event {
    id: string
    type: 'MESSAGE' | 'LEAD' | 'SYSTEM' | 'ACQUISITION'
    content: string
    timestamp: string
    signalColor?: string
}

interface ClientDashboardProps {
  brandProfile: any
  initialEvents: Event[]
}

// 📈 MINI GOLD CHART COMPONENT (Simulating Mockup)
const MiniGoldChart = () => {
  return (
    <div className="relative w-full h-32 mt-4 overflow-hidden">
      <svg viewBox="0 0 400 100" className="w-full h-full">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,10"
          fill="transparent"
          stroke="#d4af37"
          strokeWidth="3"
          filter="url(#glow)"
        />
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,10 V100 H0 Z"
          fill="url(#chartGradient)"
        />
      </svg>
    </div>
  )
}

export default function ClientSovereignDashboard({ brandProfile, initialEvents }: ClientDashboardProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [latency, setLatency] = useState('1.8ms')
    const [events, setEvents] = useState(initialEvents)
    const [spendData, setSpendData] = useState<any>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setLatency((1 + Math.random()).toFixed(1) + 'ms')
        }, 3000)

        const fetchSpend = async () => {
          try {
            const res = await fetch(`/api/ads/spend?brandId=${brandProfile.id}`)
            const data = await res.json()
            if (data.success) setSpendData(data.telemetry)
          } catch (e) {
            console.error('Spend fetch error:', e)
          }
        }
        fetchSpend()
        
        const leadsChannel = supabase
            .channel(`client:${brandProfile.id}:leads`)
            .on('postgres_changes', { 
              event: 'INSERT', 
              schema: 'public', 
              table: TABLES.leads,
              filter: `brandProfileId=eq.${brandProfile.id}`
            }, (payload) => {
                const newLead = payload.new as any
                setEvents(prev => [{
                    id: `lead-${newLead.id}`,
                    type: 'LEAD' as const,
                    content: `CLIENT_ACQUISITION_SIGNAL: ${newLead.name}`,
                    timestamp: newLead.createdAt,
                    signalColor: 'text-sahara-gold font-black shadow-glow'
                }, ...prev].slice(0, 50))
                fetchSpend()
            })
            .subscribe()

        return () => {
            clearInterval(interval)
            supabase.removeChannel(leadsChannel)
        }
    }, [brandProfile.id])

    return (
        <div 
            className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[1800px] mx-auto h-[calc(100vh-140px)] min-h-[700px] px-6 py-4" 
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            {/* 👑 ROYAL HEADER (Mimicking Mockup) */}
            <div className="flex items-center justify-between gap-4 p-8 bg-black/40 backdrop-blur-3xl rounded-[2.5rem] border border-sahara-gold/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-sahara-gold/5 via-transparent to-cyan-400/5 opacity-50" />
                
                <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-black/60 border border-sahara-gold/30 flex items-center justify-center p-3 shadow-[0_0_30px_rgba(212,175,55,0.2)] group transition-all duration-500 hover:border-sahara-gold">
                      {brandProfile.logoUrl ? (
                         <img src={brandProfile.logoUrl} alt="Logo" className="w-full h-full object-contain brightness-110 group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <Crown size={40} className="text-sahara-gold animate-pulse" />
                      )}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 text-sahara-gold font-black tracking-[0.6em] text-[10px] uppercase italic opacity-80 mb-2">
                            <span className="w-2 h-2 bg-sahara-gold rounded-full animate-ping" />
                            {isArabic ? 'رويال_سايبر | لوحة_تحكم_السيادة' : 'ROYAL_CYBER | SOVEREIGN_DASHBOARD'}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase text-white leading-none">
                            {brandProfile.companyName} <span className="text-sahara-gold/40">v4.0</span>
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-12 text-right robotic-digits relative z-10">
                    <div className="hidden lg:block border-r border-white/10 pr-12">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mb-1">{isArabic ? 'حالة_النظام' : 'SYSTEM_STATUS'}</p>
                        <p className="text-2xl font-black text-cyan-400">OPTIMAL</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mb-1">{isArabic ? 'زمن_الاستجابة' : 'RESP_LATENCY'}</p>
                        <p className="text-3xl font-black text-white">{latency}</p>
                    </div>
                </div>
            </div>

            {/* 📊 MAIN ANALYTICS GRID (The Mockup Core) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 shrink-0 h-[380px]">
                
                {/* 2a. FINANCIAL ANALYTICS (Gold Chart) */}
                <div className="lg:col-span-4 bg-black/40 backdrop-blur-3xl rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-sahara-gold/5 blur-3xl rounded-full -mr-16 -mt-16" />
                   
                   <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em]">{isArabic ? 'التحليلات_المالية' : 'FINANCIAL_ANALYTICS'}</p>
                        <h3 className="text-2xl font-black text-white italic uppercase">{isArabic ? 'النمو_الاقتصادي' : 'ECONOMIC_GROWTH'}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-cyan-400 robotic-digits">+14.8%</p>
                        <p className="text-[8px] text-gray-600 font-bold uppercase">YTD_PERFORMANCE</p>
                      </div>
                   </div>

                   <MiniGoldChart />

                   <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-[8px] text-gray-600 font-black uppercase mb-1">{isArabic ? 'النشطة' : 'ACTIVE'}</p>
                        <p className="text-lg font-black text-white robotic-digits">28</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-gray-600 font-black uppercase mb-1">{isArabic ? 'العوائد' : 'REVENUE'}</p>
                        <p className="text-lg font-black text-sahara-gold robotic-digits">$1.2M</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-gray-600 font-black uppercase mb-1">{isArabic ? 'الأهداف' : 'TARGET'}</p>
                        <p className="text-lg font-black text-cyan-400 robotic-digits">94%</p>
                      </div>
                   </div>
                </div>

                {/* 2b. NEURAL AI MONITOR (The Glowing Ring) */}
                <div className="lg:col-span-4 bg-black/40 backdrop-blur-3xl rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
                   <div className="absolute top-8 left-8">
                      <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-1">{isArabic ? 'مراقب_الذكاء_الاصطناعي' : 'NEURAL_AI_MONITOR'}</p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest italic">ACTIVE_CORE</span>
                      </div>
                   </div>

                   {/* Rotating Neural Ring */}
                   <div className="relative w-48 h-48 mt-4">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/20"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 rounded-full border border-sahara-gold/30 border-t-transparent"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Cpu size={48} className="text-white/20 mb-1" />
                        <p className="text-2xl font-black text-white robotic-digits">98.9%</p>
                        <p className="text-[7px] text-gray-500 font-bold uppercase tracking-widest">INTEGRITY</p>
                      </div>
                   </div>

                   <div className="absolute bottom-8 text-center">
                      <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.5em] animate-pulse">NEURAL_THREADS_ACTIVE</p>
                   </div>
                </div>

                {/* 2c. OPERATIONAL OVERVIEW (The Map) */}
                <div className="lg:col-span-4 bg-black/40 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                   <div className="p-8 pb-0">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em]">{isArabic ? 'نظرة_عملياتية' : 'OPERATIONAL_OVERVIEW'}</p>
                        <MapIcon size={16} className="text-white/20" />
                      </div>
                   </div>
                   
                   {/* Simulating the Dark Map from Mockup */}
                   <div className="relative h-full w-full bg-[#0a0c10] overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                      
                      {/* Simulated Map Pins */}
                      {[
                        { t: '20%', l: '30%', label: 'TOUKH' },
                        { t: '60%', l: '70%', label: 'BANHA' },
                        { t: '40%', l: '50%', label: 'CENTRAL' }
                      ].map((pin, i) => (
                        <motion.div 
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.5 }}
                          style={{ top: pin.t, left: pin.l }}
                          className="absolute w-3 h-3 bg-sahara-gold rounded-full shadow-[0_0_15px_#d4af37]"
                        >
                          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[7px] font-black text-white/40 uppercase whitespace-nowrap">{pin.label}</span>
                        </motion.div>
                      ))}
                      
                      <div className="absolute bottom-12 left-8 right-8">
                         <div className="p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                            <p className="text-[8px] font-black text-gray-500 uppercase mb-1">LIVE_VEHICLE_TRACKING</p>
                            <div className="flex justify-between items-center">
                               <p className="text-xs font-bold text-white uppercase italic">Sovereign_Fleet_Active</p>
                               <span className="text-[10px] font-mono text-sahara-gold">14:38 GMT</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            </div>

            {/* 📋 LIVE FLEET & SIGNALS (Mockup Lists) */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 3a. PRIVATE SIGNAL HUB */}
                <div className="lg:col-span-8 bg-black/40 backdrop-blur-3xl rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-8 shrink-0 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sahara-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                <Network size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-widest uppercase italic leading-none">
                                    {isArabic ? 'سجل_الإشارات_الخاص' : 'PRIVATE_SIGNAL_HUB'}
                                </h3>
                                <p className="text-[8px] text-gray-600 font-black tracking-[0.4em] mt-2 uppercase robotic-digits">DECRYPTING_REALTIME_STREAM_v4.0</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 font-mono text-[11px] relative z-10 px-4 pb-4 scrollbar-hide">
                        {events.map((event, idx) => (
                            <motion.div 
                              key={event.id} 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className={`flex items-center gap-6 py-5 px-8 rounded-2xl transition-all border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 group/item ${idx === 0 ? 'ring-1 ring-sahara-gold/30 bg-sahara-gold/[0.02]' : ''}`}
                            >
                                <span className="text-[10px] text-gray-700 robotic-digits whitespace-nowrap">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                <div className={`w-2 h-2 rounded-full shrink-0 ${event.signalColor ? 'bg-sahara-gold animate-pulse shadow-[0_0_10px_#d4af37]' : 'bg-white/10'}`} />
                                <div className="flex-1">
                                   <span className={`font-black tracking-tight text-sm uppercase ${event.signalColor || (event.type === 'LEAD' ? 'text-sahara-gold' : 'text-white/60')}`}>
                                       [{event.type}]: {event.content}
                                   </span>
                                </div>
                                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                                   <Zap size={14} className="text-sahara-gold" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 3b. QUICK ACTIONS / FLEET STATUS */}
                <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                    <div className="flex-1 bg-black/40 backdrop-blur-3xl rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                              <Briefcase size={20} />
                           </div>
                           <p className="text-xs font-black text-white uppercase tracking-widest">{isArabic ? 'إدارة_الأسطول' : 'FLEET_STATION'}</p>
                        </div>
                        <div className="space-y-4">
                           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center hover:border-sahara-gold/20 transition-all cursor-pointer">
                              <span className="text-[10px] font-black text-gray-400 uppercase">VIP_TRANSPORT</span>
                              <span className="px-3 py-1 bg-sahara-gold/10 text-sahara-gold text-[8px] font-black rounded-full uppercase">12 ACTIVE</span>
                           </div>
                           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center hover:border-sahara-gold/20 transition-all cursor-pointer">
                              <span className="text-[10px] font-black text-gray-400 uppercase">EVENT_LOGISTICS</span>
                              <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[8px] font-black rounded-full uppercase">8 CONFIRMED</span>
                           </div>
                        </div>
                    </div>
                    
                    <button className="h-24 bg-sahara-gold text-black rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                       <span>⚡</span> {isArabic ? 'توليد_تقرير_سيادي' : 'GENERATE_SOVEREIGN_REPORT'}
                    </button>
                </div>
            </div>
        </div>
    )
}
