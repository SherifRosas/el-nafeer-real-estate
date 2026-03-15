'use client'

import { useLanguage } from '../LanguageContext'
import { useState } from 'react'

interface Campaign {
    id: string
    name: string
    description?: string
    type: string
    platforms: string[]
    status: string
    scheduleType: string
    startDate?: string
    executions?: any[]
}

interface GlobalMetrics {
    totalReach: number
    totalEngagement: number
    totalClicks: number
    totalExecutions: number
    activeCampaigns: number
    averageConversionRate: number
}

interface MasterCampaignsContentProps {
    initialCampaigns: Campaign[]
    globalMetrics: GlobalMetrics
    onCreateRequest: () => void
}

export default function MasterCampaignsContent({ initialCampaigns, globalMetrics, onCreateRequest }: MasterCampaignsContentProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Campaign Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
                <div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
                        {isArabic ? (
                            <>برمجيات <span className="text-sahara-gold">الترويج</span></>
                        ) : (
                            <>CAMPAIGN_<span className="text-sahara-gold">ORCHESTRATION</span></>
                        )}
                    </h2>
                    <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">
                        {isArabic ? 'إدارة_ونشر_الحملات_التسويقية_العالمية' : 'MANAGE_AND_DEPLOY_GLOBAL_MARKETING_CAMPAIGNS'}
                    </p>
                </div>
                <button
                    onClick={onCreateRequest}
                    className="group relative px-12 py-6 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.4em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                >
                    <div className="absolute inset-0 bg-sahara-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 group-hover:text-black">{isArabic ? 'إنشاء_حملة_جديدة' : 'INITIATE_NEW_CAMPAIGN'}</span>
                </button>
            </div>

            {/* Campaign Metrics HUD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="milky-glass rounded-[3.5rem] p-12 border border-white/10 relative overflow-hidden group">
                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.5em] mb-4 robotic-digits">{isArabic ? 'الوصول_الإجمالي' : 'TOTAL_REACH'}</p>
                    <h4 className="text-4xl font-black text-white italic robotic-digits">
                        {globalMetrics.totalReach > 1000000 
                            ? `${(globalMetrics.totalReach / 1000000).toFixed(1)}M+` 
                            : globalMetrics.totalReach > 1000 
                                ? `${(globalMetrics.totalReach / 1000).toFixed(1)}K+` 
                                : globalMetrics.totalReach}
                    </h4>
                    <div className="mt-6 flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-1 flex-1 bg-sahara-gold animate-pulse" />)}
                    </div>
                </div>
                <div className="milky-glass rounded-[3.5rem] p-12 border border-white/10 relative overflow-hidden group">
                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.5em] mb-4 robotic-digits">{isArabic ? 'معدل_التحويل' : 'CONVERSION_RATE'}</p>
                    <h4 className="text-4xl font-black text-sahara-gold italic robotic-digits">{globalMetrics.averageConversionRate.toFixed(1)}%</h4>
                    <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden flex items-center justify-between gap-4">
                        <div className="h-full bg-sahara-gold transition-all duration-1000" style={{ width: `${Math.min(globalMetrics.averageConversionRate * 10, 100)}%` }} />
                        <button 
                            onClick={() => fetch('/api/campaigns/process', { method: 'POST' }).then(() => window.location.reload())}
                            className="bg-sahara-gold text-black rounded-full p-2 text-[8px] font-black animate-pulse hover:scale-110 transition-all"
                            title={isArabic ? 'تحديث الإشارات' : 'SYNC_SIGNALS_NOW'}
                        >
                            ⚡
                        </button>
                    </div>
                </div>
                <div className="milky-glass rounded-[3.5rem] p-12 border border-white/10 relative overflow-hidden group">
                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.5em] mb-4 robotic-digits">{isArabic ? 'الحملات_النشطة' : 'ACTIVE_CAMPAIGNS'}</p>
                    <h4 className="text-4xl font-black text-white italic robotic-digits">{globalMetrics.activeCampaigns}</h4>
                    <div className="mt-6 flex justify-between gap-2">
                        {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= globalMetrics.activeCampaigns ? 'bg-sahara-gold' : 'bg-white/10'}`} />)}
                    </div>
                </div>
            </div>

            {/* Campaign Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {initialCampaigns.length === 0 ? (
                    <div className="xl:col-span-2 h-96 milky-glass rounded-[4.5rem] border border-white/10 flex flex-col items-center justify-center gap-8 text-center bg-black/20">
                        <span className="text-8xl grayscale opacity-10">📡</span>
                        <p className="text-[12px] font-black text-gray-700 uppercase tracking-[0.6em] robotic-digits">
                            {isArabic ? 'لا_يوجد_بث_نشط_حاليًا' : 'NO_ACTIVE_BROADCASTS_DETECTED'}
                        </p>
                    </div>
                ) : (
                    initialCampaigns.map((campaign) => (
                        <div key={campaign.id} className="milky-glass rounded-[4rem] p-12 border border-white/10 hover:border-sahara-gold/40 transition-all duration-700 group relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

                            <div className="flex justify-between items-start mb-10 rtl:flex-row-reverse">
                                <div>
                                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white group-hover:text-sahara-gold transition-colors mb-2">
                                        {campaign.name}
                                    </h3>
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest robotic-digits">{campaign.type} {" // "} {campaign.scheduleType}</p>
                                </div>
                                <span className={`px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest robotic-digits ${campaign.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-white/5 text-gray-500 border-white/10'
                                    }`}>
                                    {campaign.status}
                                </span>
                            </div>

                            <div className="space-y-8">
                                <p className="text-gray-400 font-bold leading-relaxed truncate uppercase text-sm">{campaign.description || 'NO_DESCRIPTION_PROVIDED'}</p>

                                <div className="flex gap-4 flex-wrap rtl:flex-row-reverse">
                                    {campaign.platforms.map(platform => (
                                        <span key={platform} className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-gray-500 tracking-widest robotic-digits uppercase">
                                            {platform}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-white/5 flex items-center justify-between rtl:flex-row-reverse">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-sahara-gold/10 flex items-center justify-center text-sahara-gold">📊</div>
                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest robotic-digits">KPI_SYNC_COMPLETE</span>
                                    </div>
                                    <button className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-sahara-gold hover:text-black transition-all">
                                        {isArabic ? 'فتح_التحليلات' : 'OPEN_ANALYTICS'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
