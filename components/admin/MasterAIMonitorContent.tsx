'use client'

import { useLanguage } from '../LanguageContext'
import { useState, useEffect } from 'react'

interface Event {
    id: string
    type: 'MESSAGE' | 'LEAD' | 'SYSTEM'
    content: string
    timestamp: string
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
        return () => clearInterval(interval)
    }, [])

    const agents = [
        { id: 'ALPHA-01', status: 'ACTIVE', task: isArabic ? 'التفاوض_على_الأصل_٤٠٢' : 'NEGOTIATING_ASSET_402', load: '12%', color: 'bg-sahara-gold' },
        { id: 'BETA-02', status: 'IDLE', task: isArabic ? 'وضع_الاستعداد' : 'STANDBY_MODE', load: '2%', color: 'bg-gray-600' },
        { id: 'GAMMA-03', status: 'ACTIVE', task: isArabic ? 'تحليل_بيانات_العملاء' : 'ANALYZING_LEAD_DATA', load: '45%', color: 'bg-sahara-gold' },
        { id: 'DELTA-04', status: 'ACTIVE', task: isArabic ? 'مزامنة_أقمار_المحيط_الزايد' : 'SYNCING_ZAYED_OCEAN_NODES', load: '28%', color: 'bg-sahara-gold' },
    ]

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* AI Monitor Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
                <div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
                        {isArabic ? (
                            <>تنسيق <span className="text-sahara-gold">عملاء</span> الذكاء الاصطناعي</>
                        ) : (
                            <>AI_AGENT_<span className="text-sahara-gold">ORCHESTRATION</span></>
                        )}
                    </h2>
                    <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">
                        {isArabic ? 'مراقبة_العمليات_العصبية_في_الوقت_الحقيقي' : 'MONITOR_REAL-TIME_SYNAPTIC_OPERATIONS_ACROSS_THE_ELITE_CORE'}
                    </p>
                </div>
                <div className="flex gap-6 p-6 milky-glass rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] rtl:flex-row-reverse">
                    <div className="px-10 border-r rtl:border-r-0 rtl:border-l border-white/10 text-center">
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em] mb-2 robotic-digits">{isArabic ? 'العملاء_النشطون' : 'ACTIVE_AGENTS'}</p>
                        <p className="text-3xl font-black text-sahara-gold robotic-digits">24_CORE</p>
                    </div>
                    <div className="px-10 text-center">
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em] mb-2 robotic-digits">{isArabic ? 'الحمل_العصبي' : 'NEURAL_LOAD'}</p>
                        <p className="text-3xl font-black text-white robotic-digits">14.8%</p>
                    </div>
                </div>
            </div>

            <div className={`space-y-16 uppercase italic ${isArabic ? 'text-right' : ''}`}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Node Monitor */}
                    <div className="lg:col-span-2 milky-glass rounded-[4.5rem] p-12 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/40 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10 rtl:flex-row-reverse">
                                <span className="w-3 h-3 bg-sahara-gold rounded-full animate-ping" />
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white italic truncate">
                                    {isArabic ? 'محور_التنسيق' : 'ORCHESTRATION_HUB'}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 text-center md:text-left rtl:md:text-right">
                                <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 group hover:border-sahara-gold/20 transition-all">
                                    <p className="text-[10px] text-gray-600 font-black tracking-[0.4em] mb-4 robotic-digits">{isArabic ? 'الإنتاجية_العالمية' : 'GLOBAL_THROUGHPUT'}</p>
                                    <p className="text-4xl font-black text-white robotic-digits">1,042_REQ/M</p>
                                </div>
                                <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 group hover:border-sahara-gold/20 transition-all">
                                    <p className="text-[10px] text-gray-600 font-black tracking-[0.4em] mb-4 robotic-digits">{isArabic ? 'متوسط_الاستجابة' : 'AVERAGE_LATENCY'}</p>
                                    <p className="text-4xl font-black text-sahara-gold robotic-digits">{latency}</p>
                                </div>
                            </div>

                            <div className="mt-16 space-y-8">
                                <div className="flex items-center justify-between px-6 rtl:flex-row-reverse text-[10px] text-gray-500 font-black tracking-[0.2em]">
                                    <span>{isArabic ? 'معرف_العميل' : 'AGENT_ID'}</span>
                                    <span>{isArabic ? 'المهمة_الحالية' : 'CURRENT_MISSION'}</span>
                                    <span>{isArabic ? 'تحميل_العقدة' : 'NODE_LOAD'}</span>
                                </div>
                                <div className="space-y-4">
                                    {agents.map((agent) => (
                                        <div key={agent.id} className="flex items-center gap-6 p-8 milky-glass rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group rtl:flex-row-reverse">
                                            <div className="flex-1 flex items-center gap-6 rtl:flex-row-reverse">
                                                <div className={`w-3 h-3 rounded-full ${agent.color} shadow-[0_0_10px_rgba(212,175,55,1)]`} />
                                                <span className="font-black text-white robotic-digits">{agent.id}</span>
                                            </div>
                                            <div className="flex-[2] text-gray-400 font-bold text-sm tracking-tight text-center md:text-left rtl:md:text-right truncate">{agent.task}</div>
                                            <div className="flex-1 text-right rtl:text-left font-black text-sahara-gold robotic-digits">{agent.load}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar HUD */}
                    <div className="space-y-10">
                        {/* System Health Node */}
                        <div className="milky-glass rounded-[4rem] p-12 border border-white/10 shadow-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-sahara-gold/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <h3 className="text-xl font-black mb-10 text-white flex items-center gap-4 rtl:flex-row-reverse">
                                <span className="w-10 h-10 rounded-xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-lg">⚙️</span>
                                {isArabic ? 'صحة_النظام' : 'SYSTEM_HEALTH'}
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between text-[10px] font-black mb-3 rtl:flex-row-reverse">
                                        <span className="text-gray-600">{isArabic ? 'تخصيص_الذاكرة' : 'MEMORY_ALLOCATION'}</span>
                                        <span className="text-sahara-gold robotic-digits">64%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-sahara-gold w-[64%] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-black mb-3 rtl:flex-row-reverse">
                                        <span className="text-gray-600">{isArabic ? 'الكثافة_العصبية' : 'NEURAL_DENSITY'}</span>
                                        <span className="text-sahara-gold robotic-digits">89%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-sahara-gold w-[89%] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Live Log Node */}
                        <div className="milky-glass rounded-[4rem] p-12 border border-white/10 shadow-xl relative overflow-hidden group h-[500px] flex flex-col">
                            <h3 className="text-xl font-black mb-10 text-white flex items-center gap-4 rtl:flex-row-reverse">
                                <span className="w-10 h-10 rounded-xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-lg">📡</span>
                                {isArabic ? 'بث_السجل_المباشر' : 'LIVE_LOG_STREAM'}
                            </h3>
                            <div className={`flex-1 overflow-y-auto space-y-4 font-mono text-[10px] text-gray-500 robotic-digits scrollbar-hide ${isArabic ? 'text-right' : ''}`}>
                                <p className="text-sahara-gold/50 animate-pulse">&gt;&gt; [SYSTEM]: INIT_V3.5_ELITE_CORE</p>
                                {events.map((event) => (
                                    <p key={event.id} className={event.type === 'LEAD' ? 'text-sahara-gold' : event.type === 'MESSAGE' ? 'text-blue-400' : ''}>
                                        &gt;&gt; [{event.type}]: {event.content}
                                    </p>
                                ))}
                                {events.length === 0 && (
                                    <p className="opacity-20">&gt;&gt; [LISTENING_FOR_SIGNALS...]</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
