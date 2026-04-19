'use client'

import { useLanguage } from '../LanguageContext'
import { useState, useEffect } from 'react'
import { supabase, TABLES } from '@/lib/supabase'
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
    BarChart3
} from 'lucide-react'
import BeitAlKhairNeuralGrid from './BeitAlKhairNeuralGrid'

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

        // Fetch Live Ad-Spend Telemetry
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
        
        // Filtered subscription for THIS brand only
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
                fetchSpend() // Refresh spend on new lead
            })
            .subscribe()

        return () => {
            clearInterval(interval)
            supabase.removeChannel(leadsChannel)
        }
    }, [brandProfile.id])

    return (
        <div 
            className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[1700px] mx-auto h-[calc(100vh-140px)] min-h-[600px] px-4" 
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            {/* 1. BRAND HEADER */}
            <div className="flex items-center justify-between gap-4 p-6 milky-glass rounded-[2rem] border border-sahara-gold/20 shadow-2xl shrink-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sahara-gold/5 blur-[80px] -mr-32 -mt-32" />
                
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-3 shadow-xl overflow-hidden">
                      {brandProfile.logoUrl ? (
                         <img src={brandProfile.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <Monitor size={30} className="text-sahara-gold" />
                      )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-sahara-gold font-black tracking-[0.4em] text-[10px] uppercase italic opacity-80">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            {isArabic ? 'منصة_العميل_السيادية' : 'CLIENT_SOVEREIGN_NODE'}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase text-white leading-none">
                            {brandProfile.companyName}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-8 text-right robotic-digits">
                    <div className="hidden md:block">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{isArabic ? 'استقرار_الشبكة' : 'GRID_STABILITY'}</p>
                        <p className="text-2xl font-black text-sahara-gold">99.9%</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{isArabic ? 'زمن_الاستجابة' : 'RESP_LATENCY'}</p>
                        <p className="text-2xl font-black text-white">{latency}</p>
                    </div>
                </div>
            </div>

            {/* 2. CORE PERFORMANCE GRID (Neural & Ad-Spend HUD) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 shrink-0 h-[220px]">
                {/* 2a. AD-SPEND HUD */}
                <div className="lg:col-span-1 milky-glass rounded-[2.5rem] p-8 border border-white/5 shadow-lg flex flex-col justify-between relative overflow-hidden">
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[9px] font-black text-sahara-gold uppercase tracking-[0.3em] mb-4">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> LIVE_AD_SPEND
                      </div>
                      <p className="text-4xl font-black text-white robotic-digits">${spendData?.totalSpend || '0.00'}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{isArabic ? 'التكلفة_لكل_عميل' : 'COST_PER_ACQUISITION'}: <span className="text-sahara-gold">${spendData?.costPerLead || '0.00'}</span></p>
                   </div>
                   <div className="mt-4 pt-4 border-t border-white/5 flex gap-10">
                      <div>
                        <p className="text-[8px] text-gray-600 font-black uppercase">{isArabic ? 'التحويلات' : 'CONV'}</p>
                        <p className="text-xs font-black text-white">{spendData?.conversions || '0'}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-gray-600 font-black uppercase">{isArabic ? 'الكفاءة' : 'EFF'}</p>
                        <p className="text-xs font-black text-sahara-gold">94.8%</p>
                      </div>
                   </div>
                </div>

                {/* 2b. NEURAL grid (Miniature War Room View) */}
                <div className="lg:col-span-2 milky-glass rounded-[2.5rem] p-4 border border-white/5 shadow-lg relative overflow-hidden">
                   <div className="absolute top-4 right-6 flex items-center gap-2 text-[8px] font-black text-gray-600 uppercase tracking-widest">
                      <Target size={10} className="text-sahara-gold" /> PROPERTY_WAR_ROOM
                   </div>
                   <div className="h-full scale-[0.6] -mt-16 origin-top pointer-events-none opacity-60">
                     {/* We use a simplified neural grid or placeholders here for the mini view */}
                     <div className="flex items-center justify-center h-full">
                        <Network size={100} className="text-sahara-gold/10" />
                        <span className="absolute text-[8px] font-black uppercase tracking-[1em] text-sahara-gold/40 animate-pulse">WAR_ROOM_ACTIVE</span>
                     </div>
                   </div>
                </div>

                {/* 2c. ACQUISITION VITALS */}
                <div className="lg:col-span-1 milky-glass rounded-[2.5rem] p-8 border border-white/5 shadow-lg flex flex-col justify-between">
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[9px] font-black text-sahara-gold uppercase tracking-[0.3em] mb-4">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg> NODAL_TRAFFIC
                      </div>
                      <p className="text-4xl font-black text-white robotic-digits">{events.filter(e => e.type === 'LEAD').length + 8}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{isArabic ? 'إجمالي_الإشارات' : 'TOTAL_SIGNALS'}</p>
                   </div>
                   <div className="bg-white/5 h-2 rounded-full overflow-hidden mt-4">
                      <div className="h-full bg-sahara-gold w-[82%] shadow-glow" />
                   </div>
                </div>
            </div>

            {/* 3. PRIVATE SIGNAL HUB */}
            <div className="flex-1 min-h-0">
                <div className="milky-glass rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-3xl h-full flex flex-col group">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-sahara-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                    
                    <div className="flex items-center justify-between mb-8 relative z-10 shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sahara-gold shadow-glow">
                                <Network size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-widest uppercase italic leading-none">
                                    {isArabic ? 'سجل_الإشارات_الخاص' : 'PRIVATE_SIGNAL_HUB'}
                                </h3>
                                <p className="text-[8px] text-gray-600 font-black tracking-[0.4em] mt-2 uppercase robotic-digits">DECRYPTING_REALTIME_STREAM_v1.2</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[11px] text-gray-600 robotic-digits relative z-10 px-4 pb-4 scrollbar-hide">
                        {events.map((event, idx) => (
                            <div key={event.id} className={`flex items-center gap-4 py-4 px-6 rounded-2xl transition-all border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] animate-in slide-in-from-bottom-2 ${idx === 0 ? 'ring-1 ring-sahara-gold/20' : ''}`}>
                                <span className="text-[10px] opacity-30 whitespace-nowrap">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${event.signalColor ? 'bg-sahara-gold animate-pulse shadow-glow' : 'bg-gray-700'}`} />
                                <span className={`font-black flex-1 tracking-tight text-sm uppercase ${event.signalColor || (event.type === 'LEAD' ? 'text-sahara-gold' : 'text-white/60')}`}>
                                    [{event.type}]: {event.content}
                                </span>
                                <ArrowUpRight size={14} className="opacity-20" />
                            </div>
                        ))}
                        
                        {events.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center gap-6 opacity-5 py-12">
                                <Terminal size={80} strokeWidth={0.5} />
                                <p className="text-sm font-black tracking-[0.8em] animate-pulse">MONITORING_PRIVATE_UPLINK...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ArrowUpRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
    </svg>
  )
}
