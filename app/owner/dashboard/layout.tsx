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
            title: isArabic ? 'نظرة عامة' : 'Overview',
            icon: '📊',
            href: '/owner/dashboard',
        },
        {
            title: isArabic ? 'عقاراتي' : 'My Properties',
            icon: '🏠',
            href: '/owner/dashboard/properties',
        },
        {
            title: isArabic ? 'العملاء المهتمين' : 'Leads Feed',
            icon: '🎯',
            href: '/owner/dashboard/leads',
        },
        {
            title: isArabic ? 'الرسائل' : 'Messages',
            icon: '💬',
            href: '/owner/dashboard/messages',
        },
        {
            title: isArabic ? 'الأداء والتقارير' : 'Reports',
            icon: '📈',
            href: '/owner/dashboard/reports',
        },
        {
            title: isArabic ? 'الإعدادات' : 'Settings',
            icon: '⚙️',
            href: '/owner/dashboard/settings',
        },
    ]

    return (
        <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
            {/* Dynamic Glow Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            {/* Sidebar */}
            <aside className="w-80 h-screen glass-effect border-r border-white/10 flex flex-col relative z-20 transition-all duration-500">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform">
                            AR
                        </div>
                        <div>
                            <h2 className="font-black text-lg tracking-tight leading-none group-hover:text-amber-400 transition-colors">
                                {isArabic ? 'النفير' : 'EL-NAFEER'}
                            </h2>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                {isArabic ? 'شريك عقاري' : 'Property Partner'}
                            </span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                        ? 'bg-gradient-to-r from-amber-500/20 to-transparent border-l-4 border-amber-500 text-amber-500 shadow-lg shadow-amber-500/5'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                dir={isArabic ? 'rtl' : 'ltr'}
                            >
                                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className="font-bold tracking-wide">{item.title}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all group"
                        dir={isArabic ? 'rtl' : 'ltr'}
                    >
                        <span className="text-xl group-hover:rotate-12 transition-transform">🚪</span>
                        <span className="font-bold">{isArabic ? 'تسجيل الخروج' : 'Logout'}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-y-auto relative z-10 custom-scrollbar">
                {/* Header */}
                <header className="h-24 px-10 flex items-center justify-between border-b border-white/10 sticky top-0 bg-black/50 backdrop-blur-xl z-30">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-black tracking-tight">
                            {menuItems.find((item) => item.href === pathname)?.title || (isArabic ? 'لوحة التحكم' : 'Dashboard')}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors relative">
                            <span className="text-xl">🔔</span>
                            <span className="absolute top-3 right-3 w-2 h-2 bg-amber-500 rounded-full border-2 border-[#050505]" />
                        </button>
                        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center text-black font-black">
                                P
                            </div>
                            <div className="hidden md:block">
                                <p className="text-xs font-black text-white leading-none">Premium Owner</p>
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Verified Partner</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-10">
                    {children}
                </div>
            </main>

            <style jsx global>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </div>
    )
}
