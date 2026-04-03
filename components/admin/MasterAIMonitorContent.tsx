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
    Search
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
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[1600px] mx-auto pb-20">
            {/* 1. ELITE COMMAND HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 rtl:flex-row-reverse">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sahara-gold font-black tracking-[0.5em] text-[10px] mb-2 uppercase italic">
                        <Terminal size={14} />
                        {isArabic ? 'نظام_التنسيق_العصبي' : 'NEURAL_ORCHESTRATION_CORE_v3.6'}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white leading-none">
                        {isArabic ? (
                            <>تنسيق <span className="text-sahara-gold">الذكاء</span> الرقمي</>
                        ) : (
                            <>AI_AGENT_<span className="text-sahara-gold">COMMAND</span></>
                        )}
                    </h2>
                </div>
                <div className="flex gap-4 p-8 milky-glass rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] rtl:flex-row-reverse">
                    <div className="px-10 border-r rtl:border-r-0 rtl:border-l border-white/10 text-center">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mb-3 robotic-digits">{isArabic ? 'أقمار_نشطة' : 'ACTIVE_SATELLITES'}</p>
                        <p className="text-4xl font-black text-sahara-gold robotic-digits">14_CORE</p>
                    </div>
                    <div className="px-10 text-center">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mb-3 robotic-digits">{isArabic ? 'زمن_الاستجابة' : 'RESPONSE_LATENCY'}</p>
                        <p className="text-4xl font-black text-white robotic-digits">{latency}</p>
                    </div>
                </div>
            </div>

            {/* 2. OPERATIONAL GRID */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-10 px-8 uppercase italic ${isArabic ? 'text-right' : ''}`}>
                
                {/* 2a. AGENT MONITOR (Now more balanced) */}
                <div className="lg:col-span-2 milky-glass rounded-[4rem] p-12 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sahara-gold/40 to-transparent" />
                    
                    <div className="flex items-center justify-between mb-12 rtl:flex-row-reverse">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sahara-gold">
                                <Activity size={20} />
                            </div>
                            <h3 className="text-3xl font-black text-white tracking-tighter">
                                {isArabic ? 'قائمة_العملاء' : 'AGENT_DEPLOYMENT'}
                            </h3>
                        </div>
                        <span className="text-[10px] text-gray-500 font-black tracking-widest robotic-digits">SECURE_SYNC_LIVE</span>
                    </div>

                    <div className="space-y-6">
                        {agents.map((agent) => (
                            <div key={agent.id} className="flex items-center gap-8 p-10 milky-glass rounded-[2rem] border border-white/5 hover:border-sahara-gold/20 transition-all group cursor-pointer relative overflow-hidden rtl:flex-row-reverse">
                                <div className="absolute inset-0 bg-sahara-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex-1 flex items-center gap-6 rtl:flex-row-reverse">
                                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-black ${agent.status === 'ACTIVE' ? 'text-sahara-gold' : 'text-gray-600'}`}>
                                        <Zap size={16} />
                                    </div>
                                    <div>
                                        <div className="font-black text-white robotic-digits text-lg">{agent.id}</div>
                                        <div className="text-[10px] text-gray-600 font-bold">{agent.status}</div>
                                    </div>
                                </div>
                                <div className="flex-[3] text-gray-400 font-bold text-sm tracking-tight truncate">{agent.task}</div>
                                <div className="flex-1 text-right rtl:text-left">
                                    <div className="font-black text-sahara-gold robotic-digits text-xl">{agent.load}</div>
                                    <div className="text-[8px] text-gray-700 tracking-widest">LOAD</div>
                                </div>
                                <ArrowUpRight className="text-gray-800 opacity-0 group-hover:opacity-100 transition-all w-5 h-5" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2b. SYSTEM VITAL MONITOR */}
                <div className="flex flex-col gap-10">
                    <div className="milky-glass rounded-[4rem] p-12 border border-white/10 shadow-xl relative overflow-hidden backdrop-blur-2xl flex-1 group">
                        <div className="flex items-center gap-4 mb-10 text-white rtl:flex-row-reverse">
                            <div className="w-12 h-12 rounded-2xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sahara-gold">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-2xl font-black">{isArabic ? 'صحة_النظام' : 'CORE_VITALS'}</h3>
                        </div>
                        <div className="space-y-10">
                            <div>
                                <div className="flex justify-between text-[10px] font-black mb-4 rtl:flex-row-reverse">
                                    <span className="text-gray-500 uppercase tracking-widest">{isArabic ? 'تخصيص_الذاكرة' : 'CPU_ORCHESTRATION'}</span>
                                    <span className="text-sahara-gold robotic-digits">72%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-sahara-gold w-[72%] shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[10px] font-black mb-4 rtl:flex-row-reverse">
                                    <span className="text-gray-500 uppercase tracking-widest">{isArabic ? 'الكثافة_العصبية' : 'SYNAPTIC_DENSITY'}</span>
                                    <span className="text-sahara-gold robotic-digits">94%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-sahara-gold w-[94%] shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <div className="flex items-center justify-center gap-4 py-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                                    <Cpu size={24} className="text-sahara-gold/40 animate-pulse" />
                                    <span className="font-black text-gray-500 text-xs tracking-[0.2em]">{isArabic ? 'معالج_الذكاء_نشط' : 'INTEL_CORE_ONLINE'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. ABSOLUTE LIVE INTELLIGENCE LOG (FULL WIDTH) */}
            <div className="px-8 mt-12">
                <div className="milky-glass rounded-[4.5rem] p-12 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-3xl min-h-[500px] flex flex-col group">
                    <div className="absolute inset-0 bg-sahara-gold/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <div className="flex items-center justify-between mb-12 rtl:flex-row-reverse relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[2rem] bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sahara-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                <Satellite size={32} className="animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                                    {isArabic ? 'بث_الاستخبارات_المباشر' : 'LIVE_SIGNAL_HUB'}
                                </h3>
                                <div className="flex items-center gap-2 text-[10px] text-sahara-gold/60 font-black tracking-widest mt-1">
                                    <div className="w-2 h-2 bg-sahara-gold rounded-full animate-ping" />
                                    SCANNING_GIZA_CAIRO_DOMAINS...
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-8 text-[12px] font-black rtl:flex-row-reverse text-gray-400 robotic-digits">
                            <span className="flex items-center gap-2"><Network size={14} className="text-sahara-gold" /> NODE_04</span>
                            <span className="flex items-center gap-2 text-sahara-gold"><Search size={14} /> FILTER: ELITE</span>
                        </div>
                    </div>

                    <div className={`flex-1 overflow-y-auto space-y-5 font-mono text-[13px] text-gray-600 robotic-digits scrollbar-hide relative z-10 px-4 mb-4 ${isArabic ? 'text-right' : ''}`}>
                        <div className="py-4 border-b border-white/5 opacity-50 flex items-center justify-between rtl:flex-row-reverse font-black text-[10px] tracking-[0.4em]">
                            <span>SIGNAL_STAMP</span>
                            <span>SOURCE_ORIGIN</span>
                            <span>ACTION_EXECUTED</span>
                        </div>
                        
                        {events.map((event, idx) => (
                            <div key={event.id} className={`flex items-center gap-6 py-4 px-6 rounded-2xl transition-all border border-transparent hover:border-white/5 hover:bg-white/[0.02] animate-in slide-in-from-right-4 duration-500 rtl:flex-row-reverse ${idx === 0 ? 'bg-white/[0.03] border-white/5' : ''}`}>
                                <span className="text-[10px] opacity-40 whitespace-nowrap">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                <div className={`w-2 h-2 rounded-full ${event.signalColor ? 'bg-sahara-gold animate-pulse' : 'bg-gray-800'}`} />
                                <span className={`font-black flex-1 tracking-tight text-lg ${event.signalColor || (event.type === 'LEAD' ? 'text-sahara-gold' : event.type === 'MESSAGE' ? 'text-cyan-400' : 'text-gray-500 opacity-60')}`}>
                                    [{event.type}]: {event.content}
                                </span>
                            </div>
                        ))}
                        
                        {events.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center gap-6 opacity-20 py-20">
                                <Terminal size={80} strokeWidth={0.5} />
                                <p className="text-xl font-black tracking-[0.5em] animate-pulse">LISTENING_FOR_SIGNALS...</p>
                            </div>
                        )}
                        
                        <p className="text-sahara-gold/40 text-[10px] font-black italic pt-6 mt-10 border-t border-white/5">
                            &gt;&gt; [SYSTEM]: ELITE_CORE_STABLE // END_OF_BURST_BUFFER
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
