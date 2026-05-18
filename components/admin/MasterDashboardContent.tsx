'use client'

import { useLanguage } from '../LanguageContext'
import Link from 'next/link'
import ManifestToukhButton from './ManifestToukhButton'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Activity, 
    Shield, 
    Zap, 
    Terminal, 
    Network,
    Monitor,
    Layout,
    User,
    TrendingUp,
    DollarSign,
    Target,
    BarChart3,
    Cpu,
    Briefcase,
    Crown,
    ArrowUpRight,
    Globe,
    Lock,
    Settings,
    FileText,
    Map as MapIcon,
    Bell,
    Search
} from 'lucide-react'

interface DashboardProps {
    globalStats: any[]
    subsystems: any[]
}

// 🛡️ REUSABLE GLASS CARD (MOCKUP STYLE)
const MockupCard = ({ children, className = "", title = "", subtitle = "", icon: Icon }: any) => (
  <div className={`bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden group hover:border-sahara-gold/30 transition-all duration-500 ${className}`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-sahara-gold/5 blur-3xl -mr-16 -mt-16 group-hover:scale-125 transition-transform" />
    <div className="relative z-10 h-full flex flex-col">
      {(title || Icon) && (
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-sahara-gold uppercase tracking-[0.4em] robotic-digits">{title}</p>
            {subtitle && <p className="text-sm font-black text-white italic uppercase tracking-tighter">{subtitle}</p>}
          </div>
          {Icon && <Icon size={18} className="text-white/20 group-hover:text-sahara-gold transition-colors" />}
        </div>
      )}
      {children}
    </div>
  </div>
)

export default function MasterDashboardContent({ globalStats, subsystems }: DashboardProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    const localizedStats = [
        {
            label: isArabic ? 'نطاق_العقد_العالمي' : 'GLOBAL_NODE_REACH',
            value: globalStats[0]?.value || '152,000',
            icon: <Globe className="text-sahara-gold" />,
            trend: isArabic ? '١٢.٥٪+' : '+12.5%',
            color: 'text-sahara-gold'
        },
        {
            label: isArabic ? 'أنظمة_الشركاء_النشطة' : 'ACTIVE_TENANT_SYSTEMS',
            value: isArabic ? '٢٤ نشط' : '24 ACTIVE',
            icon: <Layout className="text-cyan-400" />,
            trend: isArabic ? '٨ جديد' : '8 NEW',
            color: 'text-cyan-400'
        },
        {
            label: isArabic ? 'حجم_التدفق_المالي' : 'AI_SALES_VOLUME',
            value: globalStats[2]?.value || '1.2M EGP',
            icon: <TrendingUp className="text-white" />,
            trend: isArabic ? 'كفاءة ٩٤٪' : '94% EFFICIENCY',
            color: 'text-white'
        },
        {
            label: isArabic ? 'السيولة_المركزية' : 'MASTER_LIQUIDITY',
            value: globalStats[3]?.value || '850K EGP',
            icon: <DollarSign className="text-sahara-gold" />,
            trend: isArabic ? 'مؤمن_بأمان' : 'SECURED',
            color: 'text-sahara-gold'
        }
    ]

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#020408] text-white selection:bg-sahara-gold selection:text-black">
            
            {/* ⬅️ LEFT SIDEBAR (Mimicking Mockup) */}
            <aside className="w-20 lg:w-24 h-full bg-black/80 border-r border-white/5 flex flex-col items-center py-10 gap-10 shrink-0 z-50">
                <div className="w-12 h-12 bg-sahara-gold rounded-2xl flex items-center justify-center shadow-[0_0_20px_#d4af37] cursor-pointer">
                    <Crown size={24} className="text-black" />
                </div>
                
                <nav className="flex-1 flex flex-col gap-8">
                    <div className="p-3 text-sahara-gold bg-sahara-gold/10 rounded-xl cursor-pointer"><Layout size={22} /></div>
                    <div className="p-3 text-white/40 hover:text-white transition-colors cursor-pointer"><Briefcase size={22} /></div>
                    <div className="p-3 text-white/40 hover:text-white transition-colors cursor-pointer"><TrendingUp size={22} /></div>
                    <div className="p-3 text-white/40 hover:text-white transition-colors cursor-pointer"><MapIcon size={22} /></div>
                    <div className="p-3 text-white/40 hover:text-white transition-colors cursor-pointer"><FileText size={22} /></div>
                </nav>

                <div className="p-3 text-white/20 hover:text-white transition-colors cursor-pointer"><Settings size={22} /></div>
            </aside>

            {/* 🖥️ MAIN CONTENT AREA */}
            <main className="flex-1 h-full overflow-y-auto p-6 lg:p-10 space-y-8 scrollbar-hide">
                
                {/* 👑 TOP HUD */}
                <header className="flex justify-between items-center mb-10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3 text-[10px] font-black text-sahara-gold uppercase tracking-[0.6em] opacity-60">
                            <span className="w-2 h-2 bg-sahara-gold rounded-full animate-ping" />
                            {isArabic ? 'رويال_سايبر | لوحة_القيادة' : 'ROYAL_CYBER | MASTER_COMMAND'}
                        </div>
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                            {isArabic ? 'قمة_القيادة' : 'PEAK_OF_COMMAND'} <span className="text-sahara-gold/40 text-xl font-mono">v4.2</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end robotic-digits border-r border-white/10 pr-6">
                            <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">SYSTEM_TIME</p>
                            <p className="text-lg font-black text-white">{new Date().toLocaleTimeString()}</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
                            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center border border-white/10 overflow-hidden">
                                <img src="/campaigns/beit-alkhair/official-logo.jpg" alt="Admin" className="w-full h-full object-cover" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-[9px] font-black text-sahara-gold uppercase tracking-widest">ADMIN_SOVEREIGN</p>
                                <p className="text-xs font-black text-white italic">SHERIF_ROSAS</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 📊 DENSE INFORMATION GRID (2x2 MAIN) */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    
                    {/* 1. FINANCIAL ANALYTICS (The Gold Area Chart) */}
                    <MockupCard 
                      className="xl:col-span-8 h-[400px]" 
                      title={isArabic ? 'التحليلات_المالية' : 'FINANCIAL_ANALYTICS'} 
                      subtitle={isArabic ? 'النمو_الاقتصادي' : 'ECONOMIC_GROWTH'}
                      icon={TrendingUp}
                    >
                        <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-4xl font-black text-white robotic-digits tracking-tighter">+14.8%</p>
                                    <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">YTD_NET_PROFIT_SIGNAL</p>
                                </div>
                                <div className="text-right flex gap-4">
                                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold">ALL_2024</div>
                                </div>
                            </div>
                            
                            {/* Area Chart SVG */}
                            <div className="flex-1 relative mt-4">
                                <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d">
                                    <defs>
                                        <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <motion.path 
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2 }}
                                        d="M0,150 Q100,50 200,120 T400,80 T600,140 T800,40"
                                        fill="none"
                                        stroke="#d4af37"
                                        strokeWidth="4"
                                        className="drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                                    />
                                    <motion.path 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        d="M0,150 Q100,50 200,120 T400,80 T600,140 T800,40 V200 H0 Z"
                                        fill="url(#goldArea)"
                                    />
                                </svg>
                            </div>

                            {/* Legend / Months */}
                            <div className="flex justify-between text-[9px] font-black text-gray-700 uppercase pt-4 border-t border-white/5 robotic-digits">
                                <span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span><span>DEC</span>
                            </div>
                        </div>
                    </MockupCard>

                    {/* 2. NEURAL AI MONITOR (Circular Ring) */}
                    <MockupCard 
                      className="xl:col-span-4 h-[400px] flex flex-col items-center justify-center" 
                      title={isArabic ? 'مراقب_الذكاء' : 'NEURAL_AI_MONITOR'}
                    >
                        <div className="flex-1 flex flex-col items-center justify-center relative w-full">
                            <div className="relative w-64 h-64">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/20"
                                />
                                <motion.div 
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-4 rounded-full border-2 border-sahara-gold/40 border-t-transparent shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="w-32 h-32 bg-cyan-400/5 rounded-full flex flex-col items-center justify-center backdrop-blur-3xl border border-cyan-400/10">
                                        <p className="text-4xl font-black text-white italic tracking-tighter robotic-digits">98.9%</p>
                                        <p className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">INTEGRITY</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 text-center space-y-2">
                                <div className="flex items-center gap-3 justify-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <p className="text-xs font-black text-white uppercase tracking-widest italic">{isArabic ? 'النواة_مستقرة' : 'SYSTEM_OPTIMAL'}</p>
                                </div>
                                <p className="text-[8px] text-gray-600 font-black uppercase tracking-[0.4em]">NEURAL_THREADS_STABLE</p>
                            </div>
                        </div>
                    </MockupCard>
                </div>

                {/* 📊 SECONDARY GRID (Stats & Map) */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    
                    {/* 3. KEY METRICS HUB */}
                    <div className="xl:col-span-7 grid grid-cols-2 gap-6 h-[240px]">
                        {localizedStats.map((stat, i) => (
                          <div key={i} className="bg-black/60 backdrop-blur-3xl border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-sahara-gold/20 transition-all group">
                             <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sahara-gold group-hover:bg-sahara-gold/10 transition-colors">
                                    {stat.icon}
                                </div>
                                <span className={`text-[10px] font-black ${stat.color} robotic-digits`}>{stat.trend}</span>
                             </div>
                             <div>
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1 robotic-digits">{stat.label}</p>
                                <p className="text-3xl font-black text-white robotic-digits italic tracking-tighter">{stat.value}</p>
                             </div>
                          </div>
                        ))}
                    </div>

                    {/* 4. OPERATIONAL OVERVIEW (Dark Map) */}
                    <MockupCard 
                      className="xl:col-span-5 h-[240px] p-0" 
                      title={isArabic ? 'نظرة_عملياتية' : 'OPERATIONAL_OVERVIEW'}
                      icon={MapIcon}
                    >
                        <div className="relative h-full w-full bg-[#0a0c10] overflow-hidden rounded-b-[2rem]">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                            
                            {/* Map Pins */}
                            {[
                                { t: '30%', l: '40%', label: 'HQ' },
                                { t: '70%', l: '80%', label: 'NODE_01' }
                            ].map((pin, i) => (
                                <div key={i} className="absolute w-3 h-3 bg-sahara-gold rounded-full shadow-[0_0_15px_#d4af37] z-20" style={{ top: pin.t, left: pin.l }}>
                                    <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[8px] font-black text-white/40 uppercase whitespace-nowrap">{pin.label}</span>
                                </div>
                            ))}

                            <div className="absolute bottom-6 left-8 right-8 z-20">
                                <div className="p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl flex justify-between items-center">
                                    <p className="text-[8px] font-black text-gray-500 uppercase italic">Live_Unit_Tracking</p>
                                    <span className="text-[10px] font-black text-sahara-gold robotic-digits">ACTIVE</span>
                                </div>
                            </div>
                        </div>
                    </MockupCard>
                </div>

                {/* 📋 LIVE FLEET / SUBSYSTEMS LIST */}
                <MockupCard 
                  title={isArabic ? 'الأنظمة_الفرعية_النشطة' : 'ACTIVE_SUBSYSTEMS'} 
                  subtitle={isArabic ? 'إدارة_الأصول_العالمية' : 'GLOBAL_ASSET_MANAGEMENT'}
                  className="min-h-[300px]"
                >
                    <div className="space-y-4 mt-4">
                        {subsystems.map((sub, i) => (
                            <div key={i} className="flex items-center gap-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-sahara-gold/20 transition-all group/item">
                                <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-3xl group-hover/item:border-sahara-gold/40 transition-all">
                                    {i === 0 ? '🏎️' : '🏗️'}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">{sub.title}</h4>
                                        <span className="px-3 py-0.5 bg-sahara-gold/10 text-sahara-gold text-[8px] font-black rounded-full uppercase">ELITE_TIER</span>
                                    </div>
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{isArabic ? 'عقد_نشطة: مصر // السعودية // الإمارات' : 'ACTIVE_NODES: EGYPT // KSA // UAE'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-8 text-right pr-6 border-r border-white/5">
                                    <div>
                                        <p className="text-[8px] text-gray-700 font-black uppercase mb-1 robotic-digits">NODES</p>
                                        <p className="text-lg font-black text-white robotic-digits">{sub.nodes}</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] text-gray-700 font-black uppercase mb-1 robotic-digits">TRAFFIC</p>
                                        <p className="text-lg font-black text-sahara-gold robotic-digits">{sub.streams}</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={20} className="text-white/10 group-hover/item:text-sahara-gold transition-colors" />
                            </div>
                        ))}
                    </div>
                </MockupCard>

            </main>

            {/* 🌋 SCANLINE OVERLAY */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-[100] opacity-10 bg-[length:100%_4px,4px_100%]" />
        </div>
    )
}
