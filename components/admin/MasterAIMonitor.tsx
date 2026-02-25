import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext'

export default function MasterAIMonitor() {
    const [latency, setLatency] = useState('2.4ms')
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    useEffect(() => {
        const interval = setInterval(() => {
            setLatency((2 + Math.random()).toFixed(1) + 'ms')
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const agents = [
        { id: 'ALPHA-01', status: 'ACTIVE', task: isArabic ? 'التفاوض_على_فيلا_٤٠٢' : 'NEGOTIATING_VILLA_402', load: '12%', color: 'bg-sahara-gold' },
        { id: 'BETA-02', status: 'IDLE', task: isArabic ? 'وضع_الاستعداد' : 'STANDBY_MODE', load: '2%', color: 'bg-gray-600' },
        { id: 'GAMMA-03', status: 'ACTIVE', task: isArabic ? 'تحليل_بيانات_العملاء' : 'ANALYZING_LEAD_DATA', load: '45%', color: 'bg-sahara-gold' },
        { id: 'DELTA-04', status: 'ACTIVE', task: isArabic ? 'مزامنة_أصول_المارينا' : 'SYNCING_MARINA_ASSETS', load: '28%', color: 'bg-sahara-gold' },
    ]

    return (
        <div className={`space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 uppercase italic ${isArabic ? 'text-right' : ''}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 milky-glass rounded-[4.5rem] p-12 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/40 to-transparent" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10 rtl:flex-row-reverse">
                            <span className="w-3 h-3 bg-sahara-gold rounded-full animate-ping" />
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                                {isArabic ? 'مركز_التنسيق' : 'ORCHESTRATION_HUB'}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 group hover:border-sahara-gold/20 transition-all text-center md:text-left rtl:md:text-right">
                                <p className="text-[10px] text-gray-600 font-black tracking-[0.4em] mb-4 robotic-digits">{isArabic ? 'الإنتاجية_العالمية' : 'GLOBAL_THROUGHPUT'}</p>
                                <p className="text-4xl font-black text-white robotic-digits">1,042_REQ/M</p>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 group hover:border-sahara-gold/20 transition-all text-center md:text-left rtl:md:text-right">
                                <p className="text-[10px] text-gray-600 font-black tracking-[0.4em] mb-4 robotic-digits">{isArabic ? 'متوسط_الاستجابة' : 'AVERAGE_LATENCY'}</p>
                                <p className="text-4xl font-black text-sahara-gold robotic-digits">{latency}</p>
                            </div>
                        </div>

                        <div className="mt-16 space-y-8">
                            <div className="flex items-center justify-between px-6 rtl:flex-row-reverse">
                                <span className="text-[10px] text-gray-500 font-black tracking-[0.2em]">{isArabic ? 'معرف_العميل' : 'AGENT_ID'}</span>
                                <span className="text-[10px] text-gray-500 font-black tracking-[0.2em]">{isArabic ? 'المهمة_الحالية' : 'CURRENT_MISSION'}</span>
                                <span className="text-[10px] text-gray-500 font-black tracking-[0.2em]">{isArabic ? 'تحميل_العقدة' : 'NODE_LOAD'}</span>
                            </div>
                            <div className="space-y-4">
                                {agents.map((agent) => (
                                    <div key={agent.id} className="flex items-center gap-6 p-8 milky-glass rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group rtl:flex-row-reverse">
                                        <div className="flex-1 flex items-center gap-6 rtl:flex-row-reverse">
                                            <div className={`w-3 h-3 rounded-full ${agent.color} shadow-[0_0_10px_rgba(212,175,55,1)]`} />
                                            <span className="font-black text-white robotic-digits">{agent.id}</span>
                                        </div>
                                        <div className="flex-[2] text-gray-400 font-bold text-sm tracking-tight text-center md:text-left rtl:md:text-right">{agent.task}</div>
                                        <div className="flex-1 text-right rtl:text-left font-black text-sahara-gold robotic-digits">{agent.load}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
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

                    <div className="milky-glass rounded-[4rem] p-12 border border-white/10 shadow-xl relative overflow-hidden group h-[400px]">
                        <h3 className="text-xl font-black mb-10 text-white flex items-center gap-4 rtl:flex-row-reverse">
                            <span className="w-10 h-10 rounded-xl bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-lg">📡</span>
                            {isArabic ? 'بث_السجل_المباشر' : 'LIVE_LOG_STREAM'}
                        </h3>
                        <div className={`space-y-4 font-mono text-[10px] text-gray-500 robotic-digits ${isArabic ? 'text-right dir-ltr' : ''}`}>
                            <p className="text-sahara-gold/50 animate-pulse">&gt;&gt; [SYSTEM]: INIT_V3.5_ELITE_CORE</p>
                            <p>&gt;&gt; [ALPHA-01]: SYNC_COMPLETE_VILLA_402</p>
                            <p>&gt;&gt; [NETWORK]: GLOBAL_NODES_STABLE</p>
                            <p className="text-green-500/50">&gt;&gt; [SECURITY]: ENCRYPTION_HASH_VERIFIED</p>
                            <p>&gt;&gt; [BETA-02]: STANDBY_MODE_ENGAGED</p>
                            <p className="text-sahara-gold/50">&gt;&gt; [SYSTEM]: DATA_LEAK_0%_DETECTED</p>
                            <p>&gt;&gt; [GAMMA-03]: PROCESSING_NEW_MARKET_SIGNAL</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
