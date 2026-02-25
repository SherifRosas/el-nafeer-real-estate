'use client'

import { useLanguage } from '../LanguageContext'

interface Lead {
    id: string
    name: string
    phone: string
    status: string
    createdAt: string
    notes?: string
    property?: {
        title: string
    }
}

export default function LeadsFeed({ leads }: { leads: Lead[] }) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Leads Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
                <div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
                        {isArabic ? (
                            <>نبض <span className="text-sahara-gold">العملاء</span></>
                        ) : (
                            <>LEAD_<span className="text-sahara-gold">PULSE</span></>
                        )}
                    </h2>
                    <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">
                        {isArabic ? 'إشارات_العملاء_المحتملين_من_مساعد_المبيعات_الذكي' : 'REAL_TIME_SIGNALS_FROM_AI_SALES_ASSISTANT'}
                    </p>
                </div>
                <div className="flex gap-4 p-4 milky-glass rounded-3xl border border-white/5 rtl:flex-row-reverse">
                    <span className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest robotic-digits">{leads.length} TOTAL_SIGNALS</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
                {leads.length === 0 ? (
                    <div className="h-80 milky-glass rounded-[4rem] border border-white/10 flex flex-col items-center justify-center gap-8 text-center bg-black/20 shadow-2xl">
                        <span className="text-7xl grayscale opacity-10 filter blur-[2px]">📡</span>
                        <div className="space-y-4">
                            <p className="font-black uppercase tracking-[0.6em] text-[12px] robotic-digits text-gray-700">
                                {isArabic ? 'في_انتظار_إشارات_واردة' : 'AWAITING_INCOMING_SIGNALS'}
                            </p>
                            <p className="text-[10px] text-white/10 font-black uppercase tracking-[0.4em]">NEURAL_NETWORK_STANDBY_v3.5</p>
                        </div>
                    </div>
                ) : (
                    leads.map((lead) => (
                        <div
                            key={lead.id}
                            className="milky-glass rounded-[4.5rem] p-10 md:p-14 border border-white/10 hover:border-sahara-gold/40 transition-all duration-700 group relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                        >
                            <div className={`absolute top-0 ${isArabic ? 'left-0' : 'right-0'} w-96 h-96 bg-sahara-gold/[0.04] blur-[120px] -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000`} />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sahara-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

                            <div className="flex flex-col lg:flex-row lg:items-center gap-12 relative z-10">
                                {/* Profile Context */}
                                <div className="w-24 h-24 rounded-[2rem] bg-white border border-white/10 flex items-center justify-center text-4xl shadow-2xl group-hover:rotate-6 transition-transform duration-1000">
                                    👤
                                </div>

                                <div className="flex-1 space-y-4 text-center lg:text-left rtl:lg:text-right">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 justify-center lg:justify-start rtl:space-x-reverse">
                                        <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white leading-none group-hover:text-sahara-gold transition-colors duration-500">
                                            {lead.name}
                                        </h3>
                                        <div className="flex justify-center md:justify-start">
                                            <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] robotic-digits ${lead.status === 'new' ? 'bg-sahara-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/10 text-gray-400 border border-white/5'}`}>
                                                {lead.status === 'new' ? (isArabic ? 'عميل_ذكي' : 'SMART_LEAD') : lead.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-gray-500 font-bold text-[11px] uppercase tracking-[0.2em] robotic-digits">
                                        <span className="flex items-center gap-3"><span className="text-sahara-gold">PHO:</span> {lead.phone}</span>
                                        <span className="hidden md:block text-white/5 font-black text-xl">•</span>
                                        <span className="flex items-center gap-3 italic text-gray-600 lowercase tracking-wider">
                                            <span className="text-sahara-gold uppercase robotic-digits not-italic">AST:</span> {lead.property?.title || 'GLOBAL_ENTITY'}
                                        </span>
                                    </div>
                                </div>

                                <div className="lg:w-[450px] bg-black/40 p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl relative overflow-hidden group/intel hover:border-sahara-gold/20 transition-all duration-700">
                                    <div className="absolute top-4 right-6 text-[8px] font-black text-sahara-gold/40 uppercase tracking-[0.4em] robotic-digits">AI_INTEL_DIGEST</div>
                                    <p className="text-[10px] text-sahara-gold/60 font-black uppercase tracking-[0.3em] mb-4 robotic-digits leading-none">{isArabic ? 'ملخص_استشارة_الذكاء_الاصطناعي' : 'ASSISTANCE_SUMMARY'}</p>
                                    <p className="text-sm font-medium text-gray-300 leading-relaxed italic border-l-2 border-sahara-gold/20 pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pr-6">
                                        &quot;{lead.notes || 'The operational unit is processing high-fidelity acquisition queries for premium residential nodes.'}&quot;
                                    </p>
                                </div>

                                <div className="flex gap-6 justify-center lg:justify-start">
                                    <button className="px-12 py-6 rounded-[2rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.6em] hover:bg-sahara-gold hover:scale-105 transition-all shadow-xl active:scale-95 robotic-digits whitespace-nowrap">
                                        {isArabic ? 'تولي_المحادثة' : 'INTERCEPT_COMM'}
                                    </button>
                                    <button className="w-20 h-20 rounded-[2rem] milky-glass text-white flex items-center justify-center text-2xl hover:bg-white/10 transition-all border border-white/10 group-hover:border-sahara-gold/30 shadow-2xl active:scale-95">
                                        📞
                                    </button>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] font-black uppercase tracking-[0.5em] text-gray-700 robotic-digits">
                                <div className="flex gap-12">
                                    <span className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
                                        {isArabic ? 'تم الرصد: ' : 'CAPTURED_'} {new Date(lead.createdAt).toLocaleTimeString()}
                                    </span>
                                    <span>{isArabic ? 'قوة_الإشارة: عالي' : 'SIGNAL_STRENGTH: HIGH'}</span>
                                </div>
                                <span className="px-6 py-2 rounded-lg bg-white/5 border border-white/5 text-gray-800 italic group-hover:text-sahara-gold transition-colors duration-700">
                                    LEAD_ID: {lead.id.slice(-12).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
