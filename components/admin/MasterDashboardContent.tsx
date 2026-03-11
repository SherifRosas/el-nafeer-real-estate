'use client'

import { useLanguage } from '../LanguageContext'

interface DashboardProps {
    globalStats: any[]
    subsystems: any[]
}

export default function MasterDashboardContent({ globalStats, subsystems }: DashboardProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    const localizedStats = [
        {
            label: isArabic ? 'وصول العقد العالمية' : 'Global Node Reach',
            value: globalStats[0].value,
            icon: '📡',
            trend: isArabic ? '١٢.٥٪+' : '+12.5%',
        },
        {
            label: isArabic ? 'أنظمة المستأجرين' : 'Tenant Systems',
            value: isArabic ? '٢٤ نشط' : '24 Active',
            icon: '🏢',
            trend: isArabic ? '٨ جديد' : '8 New',
        },
        {
            label: isArabic ? 'حجم مبيعات الذكاء الاصطناعي' : 'AI Sales Volume',
            value: globalStats[2].value,
            icon: '🧠',
            trend: isArabic ? 'كفاءة ٩٤٪' : '94% Efficiency',
        },
        {
            label: isArabic ? 'السيولة الرئيسية' : 'Master Liquidity',
            value: globalStats[3].value,
            icon: '💎',
            trend: isArabic ? 'مؤمن' : 'Secured',
        }
    ]

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Hyper-Intelligence Elite Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 relative group rounded-[4.5rem] p-12 md:p-16 milky-glass border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                    <div className={`absolute top-0 ${isArabic ? 'left-0' : 'right-0'} w-96 h-96 bg-sahara-gold/[0.05] blur-[120px] rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700`} />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-8 rtl:flex-row-reverse">
                                <span className="px-6 py-2 rounded-2xl bg-sahara-gold/10 border border-sahara-gold/20 text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] robotic-digits leading-none">
                                    {`${isArabic ? 'نواة_النظام_الرئيسي' : 'MASTER_SYSTEM_CORE'} // ${isArabic ? 'الحالة_الأمثل' : 'STATUS_OPTIMIZED'}`}
                                </span>
                                <span className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-ping shadow-[0_0_15px_rgba(212,175,55,1)]" />
                            </div>
                            <h2 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 italic leading-none uppercase">
                                {isArabic ? (
                                    <>البروتوكولات <span className="text-sahara-gold">العالمية</span> نشطة</>
                                ) : (
                                    <>THE GLOBAL <br /><span className="text-sahara-gold">PROTOCOLS</span> ARE ACTIVE</>
                                )}
                            </h2>
                            <p className="text-xl text-gray-500 font-bold max-w-2xl leading-relaxed uppercase tracking-tight">
                                {isArabic ? (
                                    <>سلامة المنصة بمستوى <span className="text-white">كفاءة ١٠٠٪</span>. عقد الذكاء الاصطناعي الخاصة بنا متزامنة حالياً عبر <span className="text-sahara-gold robotic-digits">١٢ منطقة أساسية</span> مع بدء بروتوكولات التوسع العالمي.</>
                                ) : (
                                    <>Platform integrity is at <span className="text-white">100% efficiency</span>. Our proprietary AI nodes are currently synchronized across <span className="text-sahara-gold robotic-digits">12 core regions</span> with global expansion protocols initiated.</>
                                )}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-8 mt-16 justify-center md:justify-start">
                            <button className="px-12 py-6 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:bg-sahara-gold transition-all hover:scale-105 active:scale-95 leading-none">
                                {isArabic ? 'تنفيذ_مستأجر_جديد' : 'EXECUTE_NEW_TENANT'}
                            </button>
                            <Link href="/admin/master/properties" className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-[2rem] hover:bg-white/10 transition-all hover:border-sahara-gold/30 leading-none">
                                {isArabic ? 'الوصول_للسجلات_العالمية' : 'ACCESS_GLOBAL_LOGS'}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="milky-glass rounded-[4.5rem] border border-white/10 p-12 flex flex-col justify-between group overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                    <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-sahara-gold/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-10 flex items-center justify-between italic tracking-tighter uppercase rtl:flex-row-reverse">
                            {isArabic ? 'النبض_الحي' : 'LIVE_PULSE'}
                            <span className="text-xs font-black text-sahara-gold italic robotic-digits tracking-[0.2em]">2.4MS_LATENCY</span>
                        </h3>
                        <div className="space-y-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-6 p-5 rounded-3xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group/item rtl:flex-row-reverse">
                                    <div className="w-14 h-14 rounded-2xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-2xl group-hover/item:rotate-12 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.1)]">🤖</div>
                                    <div className="flex-1 text-center md:text-left rtl:md:text-right">
                                        <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-none mb-2 robotic-digits">AGENT_ALPHA-{i}</p>
                                        <p className="font-black text-sm text-gray-300 uppercase italic tracking-tighter">
                                            {isArabic ? `مزامنة_الأصل_${400 + i}` : `SYNCHRONIZING_ASSET_${400 + i}`}
                                        </p>
                                    </div>
                                    <div className="w-2 h-2 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="relative z-10 w-full py-5 rounded-[2rem] border border-sahara-gold/20 text-sahara-gold font-black text-[10px] uppercase tracking-[0.4em] mt-12 hover:bg-sahara-gold/5 transition-all robotic-digits leading-none">
                        {isArabic ? 'تشغيل_سرب_الذكاء_الاصطناعي' : 'ENGAGE_AI_SWARM'}
                    </button>
                </div>
            </div>

            {/* Global Metrics Node */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {localizedStats.map((stat, i) => (
                    <div key={i} className="milky-glass rounded-[3.5rem] p-12 border border-white/10 hover:border-sahara-gold/50 transition-all duration-700 group relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sahara-gold/5 blur-3xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative z-10">
                            <div className="text-5xl mb-8 group-hover:scale-110 group-hover:-rotate-12 transition-transform inline-block filter grayscale group-hover:grayscale-0">{stat.icon}</div>
                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.5em] mb-4 robotic-digits">{stat.label}</p>
                            <div className="flex flex-col gap-3">
                                <h4 className="text-3xl font-black tracking-tighter italic uppercase text-white truncate">{stat.value}</h4>
                                <div className="flex">
                                    <span className="text-[9px] font-black text-sahara-gold bg-sahara-gold/10 px-4 py-1.5 rounded-full uppercase italic robotic-digits border border-sahara-gold/20">
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* HUD Status Bar */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/30 to-transparent scale-x-0 group-hover:scale-x-75 transition-transform duration-1000" />
                    </div>
                ))}
            </div>

            {/* Active Subsystems Node */}
            <div className="space-y-12">
                <div className="flex items-center justify-between px-8 rtl:flex-row-reverse">
                    <div className="flex items-center gap-6 rtl:flex-row-reverse">
                        <div className="w-2.5 h-10 bg-sahara-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,1)]" />
                        <h3 className="text-4xl font-black tracking-tighter italic uppercase text-white">
                            {isArabic ? 'عقد_الأنظمة_الفرعية' : 'SUBSYSTEM_NODES'}
                        </h3>
                    </div>
                    <div className="text-[10px] font-black text-gray-700 uppercase tracking-[0.6em] robotic-digits">
                        {isArabic ? 'تحكم_النخبة_مستقر' : 'ELITE_CONTROL_STABLE'}
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 text-left">
                    {[1, 2].map(i => (
                        <div key={i} className="milky-glass rounded-[4.5rem] p-12 md:p-14 border border-white/10 hover:border-sahara-gold/30 transition-all duration-700 group overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-sahara-gold/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 rtl:flex-row-reverse">
                                <div className="w-32 h-32 bg-white rounded-[2.5rem] border border-white/10 flex items-center justify-center text-5xl group-hover:scale-110 group-hover:rotate-6 transition-all shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                                    🏢
                                </div>
                                <div className="flex-1 text-center md:text-left rtl:md:text-right">
                                    <div className="flex flex-col md:flex-row items-center gap-4 mb-4 rtl:flex-row-reverse justify-center md:justify-start">
                                        <h4 className="text-3xl font-black uppercase italic tracking-tighter">Optimum_{i === 1 ? 'Prime' : 'Direct'}</h4>
                                        <span className="px-5 py-2 rounded-full bg-sahara-gold/10 text-sahara-gold text-[9px] font-black uppercase tracking-[0.3em] border border-sahara-gold/20 robotic-digits">
                                            {isArabic ? 'فئة_الماستر' : 'MASTER_TIER'}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 font-bold mb-6 text-sm uppercase tracking-widest italic leading-relaxed">
                                        {isArabic ? 'العقد النشطة: القاهرة الجديدة // الشيخ زايد // الساحل الشمالي' : 'Active Nodes: New Cairo // Sheikh Zayed // N.Coast'}
                                    </p>
                                    <div className="flex justify-center md:justify-start gap-12">
                                        <div>
                                            <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 robotic-digits">{isArabic ? 'عقد_الأصول' : 'ASSET_NODES'}</p>
                                            <p className="text-xl font-black text-white italic robotic-digits">{i === 1 ? '42' : '18'}_U</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 robotic-digits">{isArabic ? 'تدفق_البيانات' : 'DATA_STREAMS'}</p>
                                            <p className="text-xl font-black text-sahara-gold italic robotic-digits">{i === 1 ? '1,204' : '482'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex md:flex-col gap-4">
                                    <button className="w-20 h-20 milky-glass rounded-3xl flex items-center justify-center hover:bg-sahara-gold/20 transition-all border border-white/10 group-hover:border-sahara-gold/30 text-2xl shadow-xl active:scale-95 leading-none">
                                        🛠️
                                    </button>
                                    <button className="w-20 h-20 milky-glass rounded-3xl flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 group-hover:border-white/20 text-2xl shadow-xl active:scale-95 leading-none">
                                        🔍
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
