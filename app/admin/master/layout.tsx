'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'


export default function MasterDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { language, setLanguage } = useLanguage()
  const isArabic = language === 'ar'
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [time, setTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    if (!mounted) return '--:--:--'
    return date.toLocaleTimeString(isArabic ? 'ar-EG' : 'en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

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
    <div
      className={`min-h-screen bg-[#020202] text-white flex overflow-hidden font-sans selection:bg-sahara-gold/30 ${isArabic ? 'font-arabic' : ''}`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Hyper-Tech Elite Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/grid.svg')] bg-repeat shadow-inner" />

      {/* Elite Cyber Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sahara-gold/[0.03] blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* Sidebar Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-xl z-[60] lg:hidden transition-opacity duration-700 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Master Elite Sidebar */}
      <aside className={`fixed lg:static inset-y-0 ${isArabic ? 'right-0' : 'left-0'} w-80 h-screen milky-glass border-x border-white/10 flex flex-col z-[70] transition-all duration-700 transform ${isSidebarOpen ? 'translate-x-0 shadow-[0_0_100px_rgba(212,175,55,0.2)]' : (isArabic ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0')} overflow-hidden`}>
        {/* Animated Scanline */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-sahara-gold/[0.02] to-transparent h-40 w-full animate-[scan_8s_linear_infinite]" />

        <div className="p-10 md:p-12 border-b border-white/5 relative group">
          <Link href="/" className="flex flex-col items-center gap-6 group" onClick={() => setIsSidebarOpen(false)}>
            <div className="w-24 h-24 bg-[#0a0a0a] rounded-2xl flex items-center justify-center overflow-hidden p-2 transition-all duration-700 group-hover:rotate-6 shadow-[0_0_40px_rgba(212,175,55,0.1)] border border-sahara-gold/20 relative">
              <img
                src={isArabic ? '/logos/logo-ar.png' : '/logos/logo-en.png'}
                alt="EL-NAFEER Logo"
                className="w-full h-full object-contain relative z-10"
              />
            </div>
            <div className="text-center">
              <h2 className="font-black text-xl tracking-tighter leading-none group-hover:text-sahara-gold transition-all uppercase italic text-white leading-none">
                {isArabic ? 'بوابة_الإدارة' : 'MASTER_PORTAL'}
              </h2>
              <span className="text-[10px] text-sahara-gold bg-sahara-gold/5 px-4 py-1.5 rounded-full uppercase tracking-[0.4em] font-black mt-4 block robotic-digits border border-sahara-gold/10 leading-none">
                ADMIN_v3.5_E
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-3 mt-10 overflow-y-auto custom-scrollbar-master">
          {masterMenuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-5 px-6 py-5 rounded-[2rem] transition-all duration-500 group relative ${isActive
                  ? 'bg-sahara-gold/10 text-sahara-gold border border-sahara-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]'
                  : 'text-gray-500 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {isActive && (
                  <div className={`absolute ${isArabic ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-1.5 h-10 bg-sahara-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.8)]`} />
                )}
                <span className={`text-2xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 ${isActive ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}>
                  {item.icon}
                </span>
                <span className={`font-black tracking-tighter text-sm uppercase italic ${isArabic ? 'text-lg' : ''}`}>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-10 border-t border-white/5">
          <div className="milky-glass rounded-[2rem] p-6 border border-white/5 relative group overflow-hidden">
            <div className="absolute inset-0 bg-sahara-gold/[0.03] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest leading-none mb-2 robotic-digits">{isArabic ? 'نبض_النظام' : 'SYS_PULSE'}</p>
                <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.2em] robotic-digits">{isArabic ? 'النواة_مستقرة' : 'ELITE_CORE_STABLE'}</p>
              </div>
              <div className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full mt-8 py-5 rounded-[2rem] bg-white/5 text-gray-600 hover:bg-red-500 hover:text-black transition-all font-black text-[10px] uppercase tracking-[0.4em] robotic-digits"
          >
            {isArabic ? 'إنهاء_الجلسة' : 'TERMINATE_SESSION'}
          </button>
        </div>
      </aside>

      {/* Main Orchestration Node */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 custom-scrollbar-master">
        {/* Elite Header */}
        <header className="h-28 md:h-32 px-8 md:px-16 flex items-center justify-between border-b border-white/10 sticky top-0 bg-black/44 backdrop-blur-3xl z-[40] overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-sahara-gold/20 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.2)]" />

          <div className="flex items-center gap-6 md:gap-10 relative z-10">
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-16 h-16 rounded-2xl milky-glass border border-white/10 flex items-center justify-center text-xl hover:bg-white/5 active:scale-95 transition-all"
            >
              ☰
            </button>
            <div className="hidden sm:block w-3 h-3 bg-sahara-gold rounded-sm group-hover:rotate-45 transition-transform" />
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic leading-tight text-white line-clamp-1">
              {masterMenuItems.find((item) => item.href === pathname)?.title || (isArabic ? 'التحكم_الرئيسي' : 'MASTER_COMMAND')}
            </h1>
          </div>

          <div className="flex items-center gap-6 md:gap-12 relative z-10">
            {/* Lang Switcher (HUD Style) */}
            <button
              onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
              className="hidden md:flex w-24 h-16 rounded-2xl border border-white/10 items-center justify-center text-[10px] font-black hover:border-sahara-gold/50 transition-all milky-glass group"
            >
              <span className="text-gray-500 group-hover:text-sahara-gold transition-colors">{isArabic ? 'ENGLISH' : 'العربية'}</span>
            </button>

            <div className="hidden xl:flex items-center gap-4 px-8 py-4 milky-glass rounded-[2rem] border border-white/10">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,1)]" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.4em] robotic-digits line-clamp-1">{isArabic ? 'مزامنة_عالمية' : 'GLOBAL_SYNC'}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] robotic-digits">{formatTime(time)}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 md:gap-8">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em] robotic-digits mb-1">{isArabic ? 'هوية_الآدمن' : 'MASTER_IDENTITY'}</p>
                <p className="text-sm font-black text-white italic uppercase leading-none">{isArabic ? 'شريف رصاص' : 'SHERIF_ROSAS'}</p>
              </div>
              <div className="w-16 h-16 bg-white rounded-2xl p-[1px] shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/20">
                <div className="w-full h-full bg-[#050505] rounded-[0.9rem] flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform italic font-black text-sahara-gold">
                  SR
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-16 relative">
          {children}
        </div>
      </main>
    </div>
  )
}
