'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext'

interface MetricCardProps {
    label: string
    value: string | number
    trend?: number
    icon: string
}

const MetricCard = ({ label, value, trend, icon }: MetricCardProps) => (
    <div className="milky-glass border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group hover:border-sahara-gold/40 transition-all duration-700">
        <div className="absolute top-0 right-0 p-8 text-4xl grayscale opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700">
            {icon}
        </div>
        <div className="relative z-10">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-4">
                {label}
            </p>
            <div className="flex items-end gap-4">
                <h3 className="text-5xl font-black text-white italic tracking-tighter">
                    {value}
                </h3>
                {trend !== undefined && (
                    <span className={`text-[10px] font-bold italic pb-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                )}
            </div>
        </div>
    </div>
)

export default function AlNafeerTrackerHUD({ clientName }: { clientName: string }) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [currentTime, setCurrentTime] = useState(new Date())
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="min-h-screen bg-[#020202] text-white p-8 space-y-12">
            {/* Header HUD */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 px-4">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
                        <span className="text-[10px] font-bold text-sahara-gold uppercase tracking-[0.6em]">
                            {isArabic ? 'مراقب الحملات الذكي' : 'ELITE_CAMPAIGN_MONITOR'}
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                        {clientName}_<span className="text-sahara-gold">STATS</span>
                    </h1>
                </div>

                <div className="flex gap-8 milky-glass p-6 rounded-3xl border border-white/10">
                    <div className="text-right">
                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-1">{isArabic ? 'الوقت الحالي' : 'MONITOR_ACTIVE'}</p>
                        <p className="text-xl font-bold text-white">
                            {mounted ? currentTime.toLocaleTimeString() : 'SYNCING...'}
                        </p>
                    </div>
                    <div className="w-[1px] bg-white/10" />
                    <div>
                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-1">{isArabic ? 'الأمان' : 'SECURITY'}</p>
                        <p className="text-xl font-bold text-green-500">{isArabic ? 'مؤمن' : 'LIVE_SECURE'}</p>
                    </div>
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <MetricCard
                    label={isArabic ? 'إجمالي المشاهدات' : 'AUDIENCE_REACH'}
                    value="124,892"
                    trend={12.4}
                    icon="👁️"
                />
                <MetricCard
                    label={isArabic ? 'تحويلات الواتساب' : 'WHATSAPP_LEADS'}
                    value="842"
                    trend={45.8}
                    icon="💬"
                />
                <MetricCard
                    label={isArabic ? 'قوة التفاعل' : 'ENGAGEMENT_POWER'}
                    value="8.2%"
                    trend={2.1}
                    icon="⚡"
                />
                <MetricCard
                    label={isArabic ? 'الأداء العام' : 'GLOBAL_PERFORMANCE'}
                    value="+240%"
                    icon="🏆"
                />
            </div>

            {/* Geographic & Performance Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="milky-glass border border-white/5 rounded-[4rem] p-12 h-[500px] relative overflow-hidden group">
                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-10">
                        {isArabic ? 'التوزيع الجغرافي للجمهور' : 'GLOBAL_AUDIENCE_SPLIT'}
                    </h4>

                    <div className="flex flex-col h-full justify-between pb-10">
                        <div className="flex-1 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                            <div className="w-3/4 h-3/4 border border-sahara-gold/10 rounded-full animate-ping opacity-20" />
                            
                            <div className="absolute top-1/4 left-1/3 flex flex-col items-center gap-2">
                                <div className="w-4 h-4 bg-sahara-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,1)]" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-sahara-gold">{isArabic ? 'مصر' : 'EGYPT'}</span>
                                <span className="text-[14px] font-black">65%</span>
                            </div>

                            <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center gap-2">
                                <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-white">{isArabic ? 'السعودية' : 'KSA'}</span>
                                <span className="text-[14px] font-black">35%</span>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-white/5 flex justify-between uppercase tracking-[0.2em] font-bold text-[9px] text-gray-600">
                            <span>{isArabic ? 'نظام الحماية: نشط' : 'SYSTEM_SHIELD: ACTIVE'}</span>
                            <span className="text-sahara-gold">{isArabic ? 'الوصول الأقصى' : 'MAXIMUM_REACH'}</span>
                        </div>
                    </div>
                </div>

                <div className="milky-glass border border-white/5 rounded-[4rem] p-12 h-[500px] relative overflow-hidden">
                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-10">
                        {isArabic ? 'مؤشر النمو المتقدم' : 'MARKET_GROWTH_INDEX'}
                    </h4>

                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{isArabic ? 'المنافسة التقليدية' : 'TRADITIONAL_METHODS'}</span>
                                <span className="text-sm font-bold text-gray-500">12% REACH</span>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-600/40 w-[12%]" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[13px] font-black text-sahara-gold uppercase tracking-[0.2em] italic">AL_NAFEER_ADVANTAGE</span>
                                <span className="text-xl font-black text-sahara-gold">88% CONVERSION</span>
                            </div>
                            <div className="h-8 bg-black/40 rounded-full overflow-hidden border border-sahara-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                                <div className="h-full bg-gradient-to-r from-sahara-gold/40 to-sahara-gold w-[88%] relative">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-sahara-gold/5 border border-sahara-gold/20 rounded-3xl p-8 flex items-center gap-6">
                            <div className="text-4xl">💎</div>
                            <div>
                                <p className="text-[10px] font-bold text-sahara-gold uppercase tracking-widest mb-1">{isArabic ? 'نظرة النخبة' : 'EXECUTIVE_INSIGHT'}</p>
                                <p className="text-[11px] font-medium text-gray-400 leading-relaxed italic uppercase">
                                    {isArabic
                                        ? 'نظام النفير يحقق نتائج استثنائية من خلال دمج التكنولوجيا العالية مع الفخامة الرقمية.'
                                        : 'THE AL-NAFEER SYSTEM ACHIEVES EXCEPTIONAL RESULTS BY MERGING HIGH-TECHNOLOGY WITH DIGITAL LUXURY.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
