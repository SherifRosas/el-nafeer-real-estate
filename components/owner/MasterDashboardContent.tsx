'use client'

import { useLanguage } from '../LanguageContext'
import Link from 'next/link'

interface MasterDashboardContentProps {
    owner: any
    properties: any[]
    leads: any[]
    session: any
}

export default function MasterDashboardContent({ owner, properties, leads, session }: MasterDashboardContentProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <div className="space-y-16 animate-in fade-in duration-1000">
            {/* Master Welcome Header */}
            <div className="relative group overflow-hidden rounded-[4rem] p-16 milky-glass border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-sahara-gold/[0.03] blur-[120px] rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000" />
                <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-12">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
                            <span className="text-[10px] font-black text-sahara-gold/60 uppercase tracking-[0.6em] robotic-digits">
                                {isArabic ? 'جلسة_نشطة // وصول_المالك_مؤمن' : 'SESSION_ACTIVE // OWNER_ACCESS_SECURED'}
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-none">
                            {isArabic ? (
                                <>أهلاً بك، <span className="text-sahara-gold">{owner.companyName || session.user?.name}</span></>
                            ) : (
                                <>WELCOME, <span className="text-sahara-gold">{owner.companyName || session.user?.name}</span></>
                            )}
                        </h2>
                        <p className="text-xl text-gray-400 font-bold max-w-3xl leading-relaxed uppercase tracking-tight">
                            {isArabic
                                ? 'يقوم قلب الذكاء الاصطناعي حاليًا بمعالجة إشارات السوق لتحسين معدل دوران أصولك العقارية.'
                                : 'YOUR AI CORE IS CURRENTLY SYNCHRONIZING MARKET SIGNALS TO OPTIMIZE YOUR ASSET TURNOVER VELOCITY.'}
                        </p>
                    </div>
                    <div className="p-10 milky-glass border border-white/5 rounded-[3rem] hidden xl:block group-hover:border-sahara-gold/20 transition-all duration-700">
                        <div className="text-[10px] font-black text-gray-700 uppercase tracking-[0.5em] mb-3 robotic-digits">SYSTEM_SYNC_STATUS</div>
                        <div className="text-2xl font-black text-white robotic-digits italic">STABLE_v3.5</div>
                    </div>
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'UNIT_NODES', labelAr: 'إجمالي_الوحدات', value: properties.length, icon: '🏠', color: 'sahara-gold', trend: '+12%' },
                    { label: 'DATA_LEADS', labelAr: 'نبض_العملاء', value: leads.length, icon: '🎯', color: 'sahara-gold', trend: '+25%' },
                    { label: 'AI_EFFICIENCY', labelAr: 'كفاءة_الذكاء', value: '98.2%', icon: '🤖', color: 'sahara-gold', trend: '+5%' },
                    { label: 'ROI_PROJECTED', labelAr: 'العائد_المتوقع', value: '14.5M', icon: '💰', color: 'sahara-gold', trend: '+18%' },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="milky-glass rounded-[3.5rem] p-10 border border-white/5 hover:border-sahara-gold/30 transition-all duration-700 group relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sahara-gold/[0.02] blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-1000" />
                        <div className="relative z-10 space-y-8">
                            <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:bg-sahara-gold group-hover:text-black transition-all duration-500">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-3 robotic-digits">
                                    {isArabic ? stat.labelAr : stat.label}
                                </p>
                                <div className="flex items-baseline gap-6">
                                    <h3 className="text-5xl font-black text-white robotic-digits italic leading-none">{stat.value}</h3>
                                    <span className="text-[9px] font-black text-sahara-gold bg-sahara-gold/5 px-3 py-1.5 rounded-full border border-sahara-gold/10 robotic-digits uppercase">
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Asset & Engagement Node */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Active Grid Units */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="flex items-center justify-between px-8 rtl:flex-row-reverse">
                        <div className="flex items-center gap-6">
                            <div className="w-8 h-8 border border-sahara-gold/30 rounded-xl flex items-center justify-center text-[11px] font-black text-sahara-gold robotic-digits">01</div>
                            <h3 className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">
                                {isArabic ? 'أصول_عقارية_نشطة' : 'ACTIVE_ASSET_NODES'}
                            </h3>
                        </div>
                        <Link href="/owner/dashboard/properties" className="text-[10px] font-black text-sahara-gold hover:text-white flex items-center gap-4 group transition-all uppercase tracking-widest bg-sahara-gold/10 px-8 py-4 rounded-[1.5rem] border border-sahara-gold/20 shadow-2xl">
                            {isArabic ? 'إدارة_المخزون' : 'MANAGE_INVENTORY'}
                            <span className="group-hover:translate-x-2 transition-all">→</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {properties.slice(0, 4).map((p, i) => (
                            <div key={i} className="milky-glass rounded-[3.5rem] overflow-hidden border border-white/10 group hover:border-sahara-gold/40 transition-all duration-700 shadow-2xl h-[450px]">
                                <div className="h-56 bg-black relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent z-10" />
                                    <div className="absolute inset-0 flex items-center justify-center text-4xl grayscale opacity-[0.05] group-hover:scale-125 transition-transform duration-1000 italic font-black">EL_NAFEER</div>
                                    <div className="absolute top-8 left-8 z-20 bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full robotic-digits">
                                        {isArabic ? 'الحالة: ' : 'STATUS_'} {p.status.toUpperCase()}
                                    </div>
                                </div>
                                <div className="p-10 relative z-20">
                                    <div className="text-[10px] font-black text-gray-700 mb-3 robotic-digits uppercase">ENTITY_NODE_ID: #00{i + 1}</div>
                                    <h4 className="text-3xl font-black mb-4 group-hover:text-sahara-gold transition-colors uppercase tracking-tight italic text-white truncate">{isArabic ? (p.titleAr || p.title) : p.title}</h4>
                                    <p className="text-gray-500 text-[11px] font-bold mb-8 uppercase tracking-widest leading-none">{isArabic ? (p.locationAr || p.location) : p.location}</p>
                                    <div className="flex items-center justify-between border-t border-white/5 pt-8">
                                        <span className="text-2xl font-black text-white robotic-digits italic">{p.price.toLocaleString()} <span className="text-xs text-sahara-gold not-italic">EGP</span></span>
                                        <div className="flex items-center gap-5">
                                            <div className="flex -space-x-4">
                                                {[1, 2, 3].map(j => (
                                                    <div key={j} className="w-10 h-10 rounded-full border-2 border-black bg-white/5 milky-glass shadow-xl" />
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-gray-600 font-black robotic-digits">+LEADS</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Engagement Stream */}
                <div className="space-y-10">
                    <div className="flex items-center justify-between px-8">
                        <div className="flex items-center gap-6">
                            <div className="w-8 h-8 border border-white/20 rounded-xl flex items-center justify-center text-[11px] font-black text-white/40 robotic-digits">02</div>
                            <h3 className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">
                                {isArabic ? 'تدفق_البيانات' : 'DATA_STREAM'}
                            </h3>
                        </div>
                        <span className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
                    </div>

                    <div className="space-y-6">
                        {leads.slice(0, 5).map((l, i) => (
                            <Link key={i} href="/owner/dashboard/leads" className="block milky-glass rounded-[2.5rem] p-8 border border-white/10 hover:border-sahara-gold/40 transition-all duration-500 group relative">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-14 h-14 bg-white/5 rounded-[1.2rem] flex items-center justify-center text-2xl shadow-2xl group-hover:bg-white/10 transition-all">👤</div>
                                    <div className="flex-1">
                                        <h5 className="font-black text-lg uppercase tracking-tight text-white italic truncate">{l.name}</h5>
                                        <p className="text-[9px] text-gray-700 font-black robotic-digits uppercase mt-1.5">{new Date(l.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="bg-sahara-gold/[0.05] text-sahara-gold text-[9px] font-black uppercase px-4 py-1.5 rounded-full border border-sahara-gold/20 robotic-digits">
                                        {l.status}
                                    </div>
                                </div>
                                <div className="relative pl-8 rtl:pl-0 rtl:pr-8">
                                    <div className="absolute left-0 top-0 w-1 h-full bg-sahara-gold/20 group-hover:bg-sahara-gold transition-all duration-500 rounded-full rtl:left-auto rtl:right-0" />
                                    <p className="text-[11px] text-gray-500 italic font-bold leading-relaxed uppercase tracking-tight line-clamp-2">
                                        &quot;{l.notes || 'Interested in premium residential synchronization with automated payment protocols...'}&quot;
                                    </p>
                                </div>
                            </Link>
                        ))}
                        <Link href="/owner/dashboard/leads" className="block w-full py-8 rounded-[2.5rem] bg-white text-black hover:bg-sahara-gold text-[11px] font-black uppercase tracking-[0.5em] transition-all text-center shadow-2xl active:scale-95 robotic-digits">
                            {isArabic ? 'مركز_الذكاء_الاصطناعي' : 'LAUNCH_INTEL_CENTER'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
