'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function MasterDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const masterMenuItems = [
    {
      title: isArabic ? 'قمرة القيادة' : 'Control Cockpit',
      icon: '🧠',
      href: '/admin/master',
    },
    {
      title: isArabic ? 'إدارة الملاك' : 'Owner Orchestration',
      icon: '🏢',
      href: '/admin/master/owners',
    },
    {
      title: isArabic ? 'تحليلات العملاء' : 'Global Leads',
      icon: '🎯',
      href: '/admin/master/leads',
    },
    {
      title: isArabic ? 'مراقبة الذكاء الاصطناعي' : 'AI Agent Monitor',
      icon: '🤖',
      href: '/admin/master/ai-monitor',
    },
    {
      title: isArabic ? 'التحكم المالي' : 'Financial Hub',
      icon: '💳',
      href: '/admin/master/finance',
    },
    {
      title: isArabic ? 'إعدادات النظام' : 'System Nexus',
      icon: '⚡',
      href: '/admin/master/settings',
    },
  ]

  return (
    <div className="min-h-screen bg-[#020202] text-white flex overflow-hidden font-sans selection:bg-cyan-500/30">
      {/* Hyper-Tech Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 cyber-grid" />

      {/* Cyber Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* Sidebar Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Master Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-80 h-screen bg-black/40 backdrop-blur-3xl border-r border-cyan-500/10 flex flex-col z-50 transition-transform duration-500 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} overflow-hidden`}>
        {/* Animated Scanline */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-20 w-full animate-[scan_4s_linear_infinite]" />

        <div className="p-8 md:p-10 border-b border-white/5">
          <Link href="/" className="flex items-center gap-6 group" onClick={() => setIsSidebarOpen(false)}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden p-3 shadow-[0_0_40px_rgba(6,182,212,0.2)] group-hover:rotate-[360deg] transition-all duration-1000 relative">
              <div className={`absolute inset-0 opacity-40 ${isArabic ? 'bg-gradient-to-tr from-yellow-500/20 to-transparent' : 'bg-gradient-to-tr from-cyan-500/20 to-transparent'}`} />
              <img
                src={isArabic ? '/logos/logo-ar.png' : '/logos/logo-en.png'}
                alt="EL-NAFEER Logo"
                className="w-full h-full object-contain relative z-10"
              />
            </div>
            <div>
              <h2 className="font-black text-xl md:text-2xl tracking-tighter leading-none group-hover:text-cyan-400 transition-all uppercase italic text-white">
                Sherif Rosas
              </h2>
              <span className="text-[9px] md:text-[10px] text-cyan-500/70 uppercase tracking-[0.3em] font-black mt-2.5 block">
                Platform Master
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8 overflow-y-auto custom-scrollbar-master">
          {masterMenuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl md:rounded-[2rem] transition-all duration-500 group relative ${isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                  : 'text-gray-500 hover:bg-white/5 hover:text-white'
                  }`}
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-500 rounded-r-full shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                )}
                <span className={`text-xl md:text-2xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'grayscale group-hover:grayscale-0'}`}>
                  {item.icon}
                </span>
                <span className="font-black tracking-tight text-xs md:text-sm uppercase">{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-8 border-t border-white/5">
          <div className="bg-white/5 rounded-[1.5rem] md:rounded-3xl p-5 md:p-6 border border-white/5 relative group overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Status</p>
                <p className="text-[10px] md:text-xs font-black text-cyan-400 uppercase tracking-tighter">Hyper-Core Active</p>
              </div>
              <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-ping" />
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full mt-6 py-4 rounded-xl md:rounded-2xl bg-red-500/5 text-red-400/50 hover:bg-red-500/20 hover:text-red-400 transition-all font-black text-[10px] md:text-xs uppercase tracking-[0.2em]"
          >
            Terminal Shutdown
          </button>
        </div>
      </aside>

      {/* Main Orchestration Node */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 custom-scrollbar-master">
        {/* Hyper Header */}
        <header className="h-24 md:h-28 px-6 md:px-12 flex items-center justify-between border-b border-white/5 sticky top-0 bg-black/60 backdrop-blur-2xl z-30 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-[100%] bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />

          <div className="flex items-center gap-4 md:gap-6 relative z-10">
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-xl hover:bg-white/5 active:scale-95 transition-all"
            >
              ☰
            </button>
            <div className="hidden sm:block w-1.5 h-10 bg-gradient-to-b from-cyan-400 to-purple-600 rounded-full" />
            <h1 className="text-xl md:text-3xl font-black tracking-tighter uppercase italic leading-tight">
              {masterMenuItems.find((item) => item.href === pathname)?.title || 'Master Command'}
            </h1>
          </div>

          <div className="flex items-center gap-4 md:gap-8 relative z-10">
            <div className="hidden sm:flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-[8px] md:text-[10px] font-black text-cyan-400 uppercase tracking-widest">Global Sync</span>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Master Identity</p>
                <p className="text-xs md:text-sm font-black text-white italic">Sherif Rosas</p>
              </div>
              <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl md:rounded-2xl p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <div className="w-full h-full bg-black rounded-[0.7rem] md:rounded-[0.9rem] flex items-center justify-center text-lg md:text-xl">
                  🎖️
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-12 relative">
          {children}
        </div>
      </main>
    </div>
  )
}
