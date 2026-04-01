'use client'

import { useState } from 'react'
import { useLanguage } from '../LanguageContext'

interface Lead {
    id: string
    name: string
    phone: string
    status: string
    createdAt: string
    notes?: string
    properties?: {
        title: string
    }
}

export default function MasterLeadsDashboard({ initialLeads }: { initialLeads: Lead[] }) {
    const [leads] = useState(initialLeads)
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    const parseTechnicalLead = (notes?: string) => {
        if (!notes || !notes.startsWith('PORTAL_GPS_LEAD:')) return null;
        
        try {
            const parts = notes.replace('PORTAL_GPS_LEAD: ', '').split(' | ');
            const type = parts[0] || 'Unknown';
            const floors = parts[1] || 'N/A';
            const shaft = parts[2]?.replace('Shaft: ', '') || 'N/A';
            const foundations = parts[3]?.replace('Found: ', '') || 'N/A';
            const locationStr = parts[4]?.replace('Loc: ', '') || 'N/A';
            const mapLink = parts[5]?.replace('Map: ', '') || null;
            
            return { type, floors, shaft, foundations, locationStr, mapLink: mapLink === 'None' ? null : mapLink };
        } catch (e) {
            return null;
        }
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="grid grid-cols-1 gap-10">
                {leads.length === 0 ? (
                    <div className="h-96 milky-glass rounded-[4.5rem] border border-white/10 flex flex-col items-center justify-center gap-8 text-gray-700 bg-black/20 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                        <span className="text-8xl opacity-10 filter grayscale">🎯</span>
                        <div className="text-center">
                            <p className="font-black uppercase tracking-[0.6em] text-[11px] robotic-digits leading-none mb-4">
                                {isArabic ? 'في_انتظار_تدفق_البيانات' : 'AWAITING_GLOBAL_DATA_STREAMS'}
                            </p>
                            <p className="text-sm font-bold opacity-30 italic">
                                {isArabic ? 'نواة الذكاء الاصطناعي نشطة وجاهزة لمعالجة إشارات العملاء الواردة.' : 'AI core is active and ready to process incoming lead signatures.'}
                            </p>
                        </div>
                    </div>
                ) : (
                    leads.map((lead) => {
                        const techData = parseTechnicalLead(lead.notes);
                        
                        return (
                            <div
                                key={lead.id}
                                className="milky-glass rounded-[4.5rem] p-12 md:p-14 border border-white/10 hover:border-sahara-gold/40 transition-all duration-700 group relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
                            >
                                <div className={`absolute top-0 ${isArabic ? 'left-0' : 'right-0'} w-96 h-96 bg-sahara-gold/[0.04] blur-[120px] -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000`} />

                                <div className="flex flex-col xl:flex-row xl:items-center gap-10 md:gap-14 relative z-10">
                                    {/* Profile Identity Node */}
                                    <div className="w-28 h-28 rounded-[2rem] bg-white border border-white/10 flex items-center justify-center p-[1px] shadow-[0_0_50px_rgba(255,255,255,0.05)] group-hover:rotate-6 transition-all duration-700">
                                        <div className="w-full h-full bg-[#050505] rounded-[1.9rem] flex items-center justify-center text-4xl italic font-black text-sahara-gold">
                                            {techData ? '⚙️' : lead.name.charAt(0)}
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-5 text-center md:text-left rtl:md:text-right">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 rtl:space-x-reverse justify-center md:justify-start">
                                            <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
                                                {lead.name}
                                            </h3>
                                            <div className="flex justify-center md:justify-start">
                                                <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.4em] robotic-digits border ${lead.status === 'new'
                                                    ? 'bg-sahara-gold text-black border-sahara-gold'
                                                    : 'bg-white/5 text-gray-400 border-white/10'
                                                    }`}>
                                                    {techData ? (isArabic ? 'تقـني_ليفر' : 'TECHNICAL_NODE') : (lead.status === 'new' ? (isArabic ? 'عميل_نخبة' : 'ELITE_LEAD') : lead.status.toUpperCase())}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-gray-500 font-bold text-sm uppercase tracking-tight">
                                            <span className="flex items-center gap-3"><span className="text-sahara-gold">{isArabic ? 'هاتف' : 'TEL'}</span> <span className="robotic-digits">{lead.phone}</span></span>
                                            <span className="hidden md:block text-white/5 font-black text-xl">•</span>
                                            <span className="flex items-center gap-3 italic text-gray-400 uppercase tracking-tighter leading-none">
                                                <span className="text-sahara-gold opacity-40">{isArabic ? 'الأصل //' : 'ASSET //'}</span> {lead.properties?.title || (techData ? 'LEVER_PIONEER_CAMPAIGN' : (isArabic ? 'استفسار_سوق_عالمي' : 'GLOBAL_MARKET_INQUIRY'))}
                                            </span>
                                        </div>
                                    </div>

                                    {techData ? (
                                        <div className="xl:max-w-md w-full bg-sahara-gold/[0.03] p-8 md:p-10 rounded-[2.5rem] border border-sahara-gold/10 group-hover:border-sahara-gold/30 transition-all duration-700">
                                            <p className="text-[9px] text-sahara-gold font-black uppercase tracking-[0.5em] mb-6 robotic-digits leading-none">
                                                {isArabic ? 'مواصفات_فنية_المصعد' : 'ELEVATOR_TECHNICAL_SPECS'}
                                            </p>
                                            <div className="grid grid-cols-2 gap-6 text-[11px] font-bold uppercase text-gray-300 italic tracking-tight">
                                                <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
                                                    <span className="text-sahara-gold/40 text-[9px]">{isArabic ? 'النوع' : 'TYPE'}</span>
                                                    <span>{techData.type}</span>
                                                </div>
                                                <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
                                                    <span className="text-sahara-gold/40 text-[9px]">{isArabic ? 'الأدوار' : 'FLOORS'}</span>
                                                    <span className="robotic-digits">{techData.floors}</span>
                                                </div>
                                                <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
                                                    <span className="text-sahara-gold/40 text-[9px]">{isArabic ? 'البئر' : 'SHAFT'}</span>
                                                    <span className="robotic-digits">{techData.shaft}</span>
                                                </div>
                                                <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
                                                    <span className="text-sahara-gold/40 text-[9px]">{isArabic ? 'الأساسات' : 'FOUNDATIONS'}</span>
                                                    <span>{techData.foundations}</span>
                                                </div>
                                            </div>
                                            {techData.mapLink && (
                                                <a 
                                                    href={techData.mapLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-6 flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-sahara-gold text-black font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-lg active:scale-95"
                                                >
                                                    📍 {isArabic ? 'معاينة_الموقع' : 'VIEW_SITE_LOCATION'}
                                                </a>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="xl:max-w-md w-full bg-white/[0.02] p-8 md:p-10 rounded-[2.5rem] border border-white/5 group-hover:border-sahara-gold/20 transition-all duration-700">
                                            <p className="text-[9px] text-sahara-gold font-black uppercase tracking-[0.5em] mb-4 robotic-digits leading-none">
                                                {isArabic ? 'ملخص_ذكاء_اصطناعي' : 'AI_INTEL_SUMMARY'}
                                            </p>
                                            <p className="text-sm md:text-base font-bold text-gray-300 leading-relaxed italic uppercase tracking-tight">
                                                &quot;{lead.notes || (isArabic ? 'أبدى العميل اهتماماً باستثمارات عالية الجودة في انتظار الموافقة.' : 'CLIENT_EXPRESSED_INTEREST_IN_HIGH_FIDELITY_INVESTMENTS_PENDING_PROTOCOL_APPROVAL.')}&quot;
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                                        <button className="px-12 py-6 rounded-[2rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:bg-sahara-gold hover:scale-105 transition-all shadow-xl active:scale-95">
                                            {isArabic ? 'اعتراض_الكرة' : 'INTERCEPT_NODE'}
                                        </button>
                                        <a href={`tel:${lead.phone}`} className="w-20 h-20 rounded-[2rem] milky-glass text-white flex items-center justify-center text-2xl hover:bg-white/10 transition-all border border-white/10 group-hover:border-sahara-gold/30 shadow-xl active:scale-95">
                                            📞
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-12 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] font-black uppercase tracking-[0.5em] text-gray-700 robotic-digits">
                                    <div className="flex gap-12">
                                        <span className="flex items-center gap-3 italic">
                                            <span className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
                                            {isArabic ? 'تم الالتقاط:' : 'CAPTURED:'} {new Date(lead.createdAt).toLocaleString(isArabic ? 'ar-EG' : 'en-US')}
                                        </span>
                                        <span className="opacity-40">{isArabic ? 'قوة_الإشارة: ١٠٠٪' : 'SIGNAL_STRENGTH: 100%'}</span>
                                    </div>
                                    <span className="px-6 py-2 rounded-lg bg-white/5 border border-white/5 text-gray-600">
                                        {isArabic ? 'بصمة_العميل:' : 'LEAD_HASH:'} {lead.id.slice(-12).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
