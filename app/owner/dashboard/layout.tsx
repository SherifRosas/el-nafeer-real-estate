'use client'

import { useLanguage } from '@/components/LanguageContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function OwnerDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const pathname = usePathname()

    const menuItems = [
        {
            title: isArabic ? 'نظرة_عامة' : 'OVERVIEW',
            icon: '📊',
            href: '/owner/dashboard',
        },
        {
            title: isArabic ? 'مخزون_العقارات' : 'INVENTORY',
            icon: '🏠',
            href: '/owner/dashboard/properties',
        },
        {
            title: isArabic ? 'نبض_العملاء' : 'CLIENT_PULSE',
            icon: '🎯',
            href: '/owner/dashboard/leads',
        },
        {
            title: isArabic ? 'مركز_الرسائل' : 'COMMUNICATIONS',
            icon: '💬',
            href: '/owner/dashboard/messages',
        },
        {
            title: isArabic ? 'تقارير_الذكاء' : 'INTEL_REPORTS',
            icon: '📈',
            href: '/owner/dashboard/reports',
        },
        {
            title: isArabic ? 'بروتوكولات_النظام' : 'SETTINGS',
            icon: '⚙️',
            href: '/owner/dashboard/settings',
        },
    ]

    return (
        <div className="min-h-screen bg-[#020202] text-white flex overflow-hidden font-sans selection:bg-sahara-gold/30">
            {/* Dynamic Glow Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sahara-gold/[0.03] blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full animate-pulse delay-700" />
            </div>

            {/* Sidebar */}
            <aside className="w-80 h-screen milky-glass border-r border-white/5 flex flex-col relative z-20 transition-all duration-700">
                <div className="p-10">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_40px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:bg-sahara-gold transition-all duration-500">
                            AR
                        </div>
                        <div>
                            <h2 className="font-black text-xl italic tracking-tighter leading-none group-hover:text-sahara-gold transition-all duration-500">
                                {isArabic ? 'النفير' : 'EL-NAFEER'}
                            </h2>
                            <span className="text-[9px] text-gray-600 uppercase tracking-[0.4em] font-black robotic-digits">
                                {isArabic ? 'شريك_نخبوي' : 'ELITE_PARTNER'}
                            </span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-3 mt-8 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-5 px-8 py-5 rounded-[2rem] transition-all duration-500 group relative overflow-hidden ${isActive
                                    ? 'bg-white/5 text-sahara-gold shadow-2xl'
                                    : 'text-gray-500 hover:bg-white/[0.02] hover:text-white'
                                    }`}
                                dir={isArabic ? 'rtl' : 'ltr'}
                            >
                                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sahara-gold rounded-r-full shadow-[0_0_15px_rgba(212,175,55,1)]" />}
                                <span className={`text-xl transition-all duration-500 group-hover:scale-110 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-black text-[10px] uppercase tracking-[0.4em] robotic-digits leading-none">{item.title}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-8 border-t border-white/[0.03]">
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-5 px-8 py-5 rounded-[2rem] text-gray-700 hover:bg-red-500/10 hover:text-red-500 transition-all duration-500 group robotic-digits"
                        dir={isArabic ? 'rtl' : 'ltr'}
                    >
                        <span className="text-xl group-hover:rotate-12 transition-transform opacity-40 group-hover:opacity-100">🚪</span>
                        <span className="font-black text-[10px] uppercase tracking-[0.4em]">{isArabic ? 'خروج' : 'TERMINATE'}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Hub */}
            <main className="flex-1 h-screen overflow-y-auto relative z-10 custom-scrollbar">
                {/* HUD Header */}
                <header className="h-28 px-12 flex items-center justify-between border-b border-white/[0.03] sticky top-0 bg-[#020202]/60 backdrop-blur-3xl z-40">
                    <div className="flex items-center gap-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-sahara-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)]" />
                        <h1 className="text-[10px] font-black tracking-[0.6em] uppercase text-gray-500 robotic-digits">
                            {menuItems.find((item) => item.href === pathname)?.title || (isArabic ? 'النظام' : 'NEXUS_V3.5')}
                        </h1>
                    </div>

                    <div className="flex items-center gap-10">
                        <button className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all relative group">
                            <span className="text-xl group-hover:scale-110 transition-transform">🔔</span>
                            <span className="absolute top-4 right-4 w-2 h-2 bg-sahara-gold rounded-full border border-black shadow-[0_0_10px_rgba(212,175,55,1)]" />
                        </button>
                        <div className="flex items-center gap-6 bg-white/[0.03] border border-white/5 px-8 py-3 rounded-3xl group hover:border-sahara-gold/30 transition-all duration-500">
                            <div className="w-10 h-10 bg-sahara-gold rounded-xl flex items-center justify-center text-black font-black robotic-digits shadow-lg">
                                Ω
                            </div>
                            <div className="hidden border-l border-white/10 pl-6 lg:block rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6">
                                <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none robotic-digits">ELITE_PARTNER</p>
                                <p className="text-[8px] text-sahara-gold/60 uppercase font-black tracking-[0.4em] mt-1.5">VERIFIED_NODE</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-12 xl:p-20">
                    {children}
                </div>
            </main>

            <style jsx global>{`
        .milky-glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.1);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.3);
        }
      `}</style>
        </div>
    )
}
