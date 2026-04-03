'use client'

import { useLanguage } from '../LanguageContext'
import { useState, useEffect } from 'react'
import { supabase, TABLES } from '@/lib/supabase'
import { 
    Satellite, 
    Activity, 
    Shield, 
    Cpu, 
    Zap, 
    Terminal, 
    Network,
    ArrowUpRight,
    Search,
    Monitor
} from 'lucide-react'

interface Event {
    id: string
    type: 'MESSAGE' | 'LEAD' | 'SYSTEM' | 'ACQUISITION'
    content: string
    timestamp: string
    signalColor?: string
}

interface AIMonitorProps {
    initialEvents: Event[]
}

export default function MasterAIMonitorContent({ initialEvents }: AIMonitorProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [latency, setLatency] = useState('2.4ms')
    const [events, setEvents] = useState(initialEvents)

    useEffect(() => {
        const interval = setInterval(() => {
            setLatency((2 + Math.random()).toFixed(1) + 'ms')
        }, 3000)
        
        // Subscribe to NEW LEADS
        const leadsChannel = supabase
            .channel('public:leads')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: TABLES.leads }, (payload) => {
                const newLead = payload.new as any
                setEvents(prev => [{
                    id: `lead-${newLead.id}`,
                    type: 'LEAD' as const,
                    content: `NEW_ACQUISITION_SIGNAL: ${newLead.name}`,
                    timestamp: newLead.createdAt
                }, ...prev].slice(0, 50))
            })
            .subscribe()

        // Subscribe to NEW MESSAGES
        const messagesChannel = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: TABLES.messages }, (payload) => {
                const newMsg = payload.new as any
                setEvents(prev => [{
                    id: `msg-${newMsg.id}`,
                    type: 'MESSAGE' as const,
                    content: `INBOUND_ENCRYPTED_QUERY: ${newMsg.type}`,
                    timestamp: newMsg.sentAt
                }, ...prev].slice(0, 50))
            })
            .subscribe()

        // Subscribe to PORTAL_EVENTS (GIZA-CAIRO SIGNALS)
        const eventsChannel = supabase
            .channel('public:portal_events')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'portal_events' }, (payload) => {
                const newEvt = payload.new as any
                let color = ''
                if (newEvt.label?.includes('GIZA')) color = 'text-sahara-gold font-black underline'
                if (newEvt.label?.includes('CAIRO')) color = 'text-cyan-400 font-black italic'
                if (newEvt.location_memory === 'RETARGETED_ELITE') color = 'text-purple-400 font-black'

                setEvents(prev => [{
                    id: `p-evt-${newEvt.id}`,
                    type: 'ACQUISITION' as const,
                    content: `${newEvt.label}: ${newEvt.action}`,
                    timestamp: newEvt.createdAt,
                    signalColor: color
                }, ...prev].slice(0, 50))
            })
            .subscribe()

        return () => {
            clearInterval(interval)
            supabase.removeChannel(leadsChannel)
            supabase.removeChannel(messagesChannel)
            supabase.removeChannel(eventsChannel)
        }
    }, [])

    const agents = [
        { id: 'ALPHA-01', status: 'ACTIVE', task: isArabic ? 'التفاوض_على_الأصل_٤٠٢' : 'NEGOTIATING_ASSET_402', load: '12%', color: 'bg-sahara-gold' },
        { id: 'BETA-02', status: 'IDLE', task: isArabic ? 'وضع_الاستعداد' : 'STANDBY_MODE', load: '2%', color: 'bg-gray-600' },
        { id: 'GAMMA-03', status: 'ACTIVE', task: isArabic ? 'تحليل_بيانات_العملاء' : 'ANALYZING_LEAD_DATA', load: '45%', color: 'bg-sahara-gold' },
        { id: 'DELTA-04', status: 'ACTIVE', task: isArabic ? 'مزامنة_أقمار_المحيط_الزايد' : 'SYNCING_ZAYED_OCEAN_NODES', load: '28%', color: 'bg-sahara-gold' },
    ]

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[1600px] mx-auto pb-10" dir={isArabic ? 'rtl' : 'ltr'}>
            
            {/* 1. COMPACT COMMAND HEADER (Minimized) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sahara-gold font-black tracking-[0.4em] text-[9px] uppercase italic opacity-70">
                        <Monitor size={12} />
                        {isArabic ? 'نظام_التنسيق_العصبي' : 'NEURAL_ORCHESTRATION_v3.7_LOCKED'}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase text-white leading-tight">
                        {isArabic ? (
                            <>تنسيق <span className="text-sahara-gold">الذكاء</span> الرقمي</>
                        ) : (
                            <>AI_AGENT_<span className="text-sahara-gold">COMMAND</span></>
                        )}
                    </h2>
                </div>
                
                <div className="flex gap-3 p-4 milky-glass rounded-[2rem] border border-white/10 shadow-xl">
                    <div className="px-6 border-e border-white/10 text-center">
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1 robotic-digits">{isArabic ? 'أقمار_نشطة' : 'SATELLITES'}</p>
                        <p className="text-2xl font-black text-sahara-gold robotic-digits">14_CORE</p>
                    </div>
                    <div className="px-6 text-center">
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1 robotic-digits">{isArabic ? 'الاستجابة' : 'LATENCY'}</p>
                        <p className="text-2xl font-black text-white robotic-digits">{latency}</p>
                    </div>
                </div>
            </div>

            {/* 2. OPERATIONAL GRID (Minimized Padding) */}
            <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 uppercase italic`}>
                
                {/* 2a. AGENT MONITOR (3/4 Width) */}
                <div className="lg:col-span-3 milky-glass rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sahara-gold/40 to-transparent" />
                    
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sahara-gold">
                                <Activity size={16} />
                            </div>
                            <h3 className="text-2xl font-black text-white tracking-tighter">
                                {isArabic ? 'قائمة_العملاء' : 'AGENT_DEPLOYMENT'}
                            </h3>
                        </div>
                        <span className="text-[9px] text-gray-500 font-black tracking-widest robotic-digits hidden md:block">MASTER_SECURE_SYNC_LOCKED</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {agents.map((agent) => (
                            <div key={agent.id} className="flex items-center gap-4 p-5 milky-glass rounded-[1.5rem] border border-white/5 hover:border-sahara-gold/20 transition-all group cursor-pointer relative overflow-hidden">
                                <div className="absolute inset-0 bg-sahara-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-xs font-black shrink-0">
                                    <Zap size={14} className={agent.status === 'ACTIVE' ? 'text-sahara-gold' : 'text-gray-600'} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-black text-white robotic-digits text-sm">{agent.id}</div>
                                    <div className="text-[8px] text-gray-500 font-bold truncate max-w-full">{agent.task}</div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="font-black text-sahara-gold robotic-digits text-lg leading-none">{agent.load}</div>
                                    <ArrowUpRight className="text-gray-800 opacity-0 group-hover:opacity-100 transition-all w-3 h-3 ms-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2b. SYSTEM VITALS (1/4 Width) */}
                <div className="lg:col-span-1 milky-glass rounded-[3rem] p-8 border border-white/10 shadow-xl relative overflow-hidden backdrop-blur-xl flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-6 text-white">
                        <div className="w-10 h-10 rounded-xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sahara-gold">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-xl font-black">{isArabic ? 'الحالة' : 'VITALS'}</h3>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-[8px] font-black mb-2 opacity-60">
                                <span className="uppercase tracking-widest">{isArabic ? 'المعالجة' : 'CPU'}</span>
                                <span className="text-sahara-gold robotic-digits">72%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-sahara-gold w-[72%] shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[8px] font-black mb-2 opacity-60">
                                <span className="uppercase tracking-widest">{isArabic ? 'الذاكرة' : 'RAM'}</span>
                                <span className="text-sahara-gold robotic-digits">94%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-sahara-gold w-[94%] shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                            <Cpu size={16} className="text-sahara-gold/40 animate-pulse" />
                            <span className="font-black text-gray-500 text-[8px] tracking-[0.2em]">{isArabic ? 'معالج_نشط' : 'CORE_ONLINE'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. ABSOLUTE LIVE INTELLIGENCE HUB (Compact Width & Height) */}
            <div className="px-4">
                <div className="milky-glass rounded-[3.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-3xl min-h-[380px] max-h-[400px] flex flex-col group">
                    <div className="absolute inset-0 bg-sahara-gold/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-[1.5rem] bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sahara-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                <Satellite size={24} className="animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">
                                    {isArabic ? 'بث_الاستخبارات_المباشر' : 'LIVE_SIGNAL_HUB'}
                                </h3>
                                <div className="flex items-center gap-2 text-[8px] text-sahara-gold/60 font-black tracking-widest mt-1">
                                    <div className="w-1.5 h-1.5 bg-sahara-gold rounded-full animate-ping" />
                                    SCANNING_DOMAINS_GIZA_CAIRO...
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-6 text-[10px] font-black text-gray-500 robotic-digits">
                            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5"><Network size={12} className="text-sahara-gold" /> NODE_04</span>
                            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-sahara-gold/10 text-sahara-gold"><Search size={12} /> {isArabic ? 'تصفية_النخبة' : 'FILTER_ELITE'}</span>
                        </div>
                    </div>

                    <div className={`flex-1 overflow-y-auto space-y-3 font-mono text-[11px] text-gray-600 robotic-digits scrollbar-hide relative z-10 px-2 pb-4`}>
                        <div className="py-2 border-b border-white/5 opacity-50 flex items-center justify-between font-black text-[8px] tracking-[0.3em] mb-4">
                            <span>STAMP</span>
                            <span>TYPE_OF_SIGNAL</span>
                            <span>CONTENT_MANIFEST</span>
                        </div>
                        
                        {events.map((event, idx) => (
                            <div key={event.id} className={`flex items-center gap-4 py-2 px-4 rounded-xl transition-all border border-transparent hover:border-white/5 hover:bg-white/[0.02] animate-in slide-in-from-right-4 duration-500 ${idx === 0 ? 'bg-white/[0.03] border-white/5' : ''}`}>
                                <span className="text-[9px] opacity-30 whitespace-nowrap">{new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${event.signalColor ? 'bg-sahara-gold animate-pulse' : 'bg-gray-800'}`} />
                                <span className={`font-black flex-1 tracking-tight text-sm truncate ${event.signalColor || (event.type === 'LEAD' ? 'text-sahara-gold' : event.type === 'MESSAGE' ? 'text-cyan-400' : 'text-gray-500 opacity-60')}`}>
                                    [{event.type}]: {event.content}
                                </span>
                            </div>
                        ))}
                        
                        {events.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center gap-4 opacity-10 py-10">
                                <Terminal size={60} strokeWidth={0.5} />
                                <p className="text-sm font-black tracking-[0.4em] animate-pulse uppercase">WAITING_FOR_SIGNALS...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
