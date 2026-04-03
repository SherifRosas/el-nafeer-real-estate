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
    Monitor,
    Layout
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
        
        // Subscriptions stay exactly the same for total data integrity
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
        { id: 'ALPHA-01', status: 'ACTIVE', task: isArabic ? 'تفاوض_٤٠٢' : 'NEGOTIATING_402', load: '12%', color: 'bg-sahara-gold' },
        { id: 'BETA-02', status: 'IDLE', task: isArabic ? 'استعداد' : 'STANDBY', load: '2%', color: 'bg-gray-600' },
        { id: 'GAMMA-03', status: 'ACTIVE', task: isArabic ? 'تحليل_بيانات' : 'ANALYZING_DATA', load: '45%', color: 'bg-sahara-gold' },
        { id: 'DELTA-04', status: 'ACTIVE', task: isArabic ? 'مزامنة_أقمار' : 'SYNCING_SATS', load: '28%', color: 'bg-sahara-gold' },
    ]

    return (
        <div 
            className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[1700px] mx-auto overflow-hidden h-[calc(100vh-140px)] min-h-[600px] px-4" 
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            
            {/* 1. ZERO-SCROLL HEADER TICKER */}
            <div className="flex items-center justify-between gap-4 p-4 milky-glass rounded-[1.5rem] border border-white/10 shadow-lg shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-sahara-gold font-black tracking-[0.3em] text-[8px] uppercase italic opacity-60">
                            <Monitor size={10} />
                            {isArabic ? 'نظام_التنسيق_العصبي' : 'NEURAL_ORCHESTRATION_CORE'}
                        </div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tighter italic uppercase text-white leading-none">
                            {isArabic ? (
                                <>تنسيق <span className="text-sahara-gold">الذكاء</span></>
                            ) : (
                                <>AI_<span className="text-sahara-gold">COMMAND</span>_CENTER</>
                            )}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 pe-6 border-e border-white/10 hidden md:flex">
                        <div className="text-right">
                            <p className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.1em]">{isArabic ? 'أقمار' : 'SATS'}</p>
                            <p className="text-lg font-black text-sahara-gold robotic-digits">14_CORE</p>
                        </div>
                        <Satellite size={20} className="text-sahara-gold/40" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.1em]">{isArabic ? 'زمن' : 'PING'}</p>
                            <p className="text-lg font-black text-white robotic-digits">{latency}</p>
                        </div>
                        <Activity size={20} className="text-white/20" />
                    </div>
                </div>
            </div>

            {/* 2. OPERATIONAL GRID (Strict Fixed Height Alignment) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1 min-h-0">
                
                {/* 2a. AGENT MICRO-MONITOR (3/4 Width) */}
                <div className="lg:col-span-3 milky-glass rounded-[2.5rem] p-6 border border-white/10 shadow-xl relative overflow-hidden backdrop-blur-xl flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                            <Layout size={16} className="text-sahara-gold" />
                            <h3 className="text-lg font-black text-white tracking-widest italic">{isArabic ? 'العملاء_النشطون' : 'AGENT_MONITOR'}</h3>
                        </div>
                        <span className="text-[8px] text-gray-500 font-black tracking-widest robotic-digits opacity-40">UPLINK_STABLE</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto pr-2 scrollbar-hide py-2">
                        {agents.map((agent) => (
                            <div key={agent.id} className="flex items-center gap-4 p-4 milky-glass rounded-[1.2rem] border border-white/5 hover:border-sahara-gold/20 transition-all group cursor-pointer relative overflow-hidden backdrop-blur-lg">
                                <div className="absolute inset-0 bg-sahara-gold/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-black shrink-0 shadow-lg">
                                    <Zap size={14} className={agent.status === 'ACTIVE' ? 'text-sahara-gold shadow-glow' : 'text-gray-600'} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-black text-white robotic-digits text-xs tracking-wider">{agent.id}</div>
                                    <div className="text-[7px] text-gray-500 font-bold truncate opacity-60 uppercase">{agent.task}</div>
                                </div>
                                <div className="text-right shrink-0 pe-2">
                                    <div className="font-black text-sahara-gold robotic-digits text-sm">{agent.load}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2b. CORE VITALS (1/4 Width - Vertical Compact) */}
                <div className="lg:col-span-1 milky-glass rounded-[2.5rem] p-6 border border-white/10 shadow-lg relative overflow-hidden backdrop-blur-xl flex flex-col justify-between min-h-0">
                    <div className="flex items-center gap-2 mb-4 text-white shrink-0">
                        <Shield size={16} className="text-sahara-gold" />
                        <h3 className="text-sm font-black tracking-widest italic">{isArabic ? 'حالة_النواة' : 'CORE_VITALS'}</h3>
                    </div>
                    <div className="space-y-4 shrink-0">
                        <div>
                            <div className="flex justify-between text-[7px] font-black mb-1 opacity-50">
                                <span className="uppercase tracking-widest">{isArabic ? 'المعالجة' : 'CPU'}</span>
                                <span className="text-sahara-gold robotic-digits">72%</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-sahara-gold w-[72%] shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[7px] font-black mb-1 opacity-50">
                                <span className="uppercase tracking-widest">{isArabic ? 'الذاكرة' : 'RAM'}</span>
                                <span className="text-sahara-gold robotic-digits">94%</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-sahara-gold w-[94%] shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center gap-2 shrink-0">
                        <Cpu size={14} className="text-sahara-gold/40" />
                        <span className="font-black text-gray-500 text-[7px] tracking-[0.2em]">{isArabic ? 'النواة_متصلة' : 'CORE_ONLINE'}</span>
                    </div>
                </div>
            </div>

            {/* 3. ABSOLUTE ZERO-SCROLL SIGNAL HUB (Dynamic Height Growth) */}
            <div className="flex-1 min-h-0">
                <div className="milky-glass rounded-[3rem] p-6 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-3xl h-full flex flex-col group">
                    <div className="absolute inset-0 bg-sahara-gold/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <div className="flex items-center justify-between mb-4 relative z-10 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sahara-gold shadow-glow">
                                <Satellite size={20} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white tracking-widest uppercase italic leading-none">
                                    {isArabic ? 'بث_الاستخبارات_المباشر' : 'LIVE_SIGNAL_HUB'}
                                </h3>
                                <div className="flex items-center gap-1 text-[7px] text-sahara-gold/50 font-black tracking-widest mt-1">
                                    <div className="w-1 h-1 bg-sahara-gold rounded-full animate-ping" />
                                    SCANNING_DOMAINS...
                                </div>
                            </div>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-4 text-[9px] font-black text-gray-600 robotic-digits">
                            <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 uppercase"><Network size={10} className="text-sahara-gold" /> NODE_04</span>
                            <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-sahara-gold/10 text-sahara-gold uppercase"><Search size={10} /> {isArabic ? 'تصفية_النخبة' : 'ELITE_FILTER'}</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[10px] text-gray-600 robotic-digits relative z-10 px-2 pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <div className="py-2 border-b border-white/5 opacity-40 flex items-center justify-between font-black text-[7px] tracking-[0.3em] mb-2 uppercase">
                            <span>STAMP</span>
                            <span>SOURCE_SIGNAL</span>
                            <span>DATA_STREAM</span>
                        </div>
                        
                        {events.map((event, idx) => (
                            <div key={event.id} className={`flex items-center gap-3 py-2 px-4 rounded-xl transition-all border border-transparent hover:border-white/5 hover:bg-white/[0.01] animate-in slide-in-from-right-4 duration-500 ${idx === 0 ? 'bg-white/[0.02] border-white/5' : ''}`}>
                                <span className="text-[8px] opacity-25 whitespace-nowrap">{new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                <div className={`w-1 h-1 rounded-full shrink-0 ${event.signalColor ? 'bg-sahara-gold animate-pulse shadow-glow' : 'bg-gray-800'}`} />
                                <span className={`font-black flex-1 tracking-tight text-xs truncate uppercase ${event.signalColor || (event.type === 'LEAD' ? 'text-sahara-gold' : event.type === 'MESSAGE' ? 'text-cyan-400/80' : 'text-gray-500 opacity-60')}`}>
                                    [{event.type}]: {event.content}
                                </span>
                            </div>
                        ))}
                        
                        {events.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center gap-4 opacity-5 py-6">
                                <Terminal size={50} strokeWidth={0.5} />
                                <p className="text-[9px] font-black tracking-[0.5em] animate-pulse">WAITING_FOR_SIGNALS...</p>
                            </div>
                        )}
                        
                        <p className="text-sahara-gold/30 text-[8px] font-black italic pt-4 opacity-40">
                            &gt;&gt; [SYSTEM]: ELITE_CORE_LOCKED // ZERO_SCROLL_MANIFESTED
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
