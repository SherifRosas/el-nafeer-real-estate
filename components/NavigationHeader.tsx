'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useLanguage } from './LanguageContext'
import { useState, useEffect } from 'react'

export default function NavigationHeader() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()
  const isArabic = language === 'ar'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  const formatDate = (date: Date) => {
    if (!mounted) return 'SYNCING...'
    return date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).toUpperCase()
  }

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { name: isArabic ? 'الفلل' : 'Villas', href: '/real-estate/villas' },
    { name: isArabic ? 'الشقق' : 'Apartments', href: '/real-estate/apartments' },
    { name: isArabic ? 'المشاريع' : 'Projects', href: '/real-estate/projects' },
  ]

  return (
    <nav
      dir={isArabic ? 'rtl' : 'ltr'}
      className="bg-[#010810]/90 backdrop-blur-3xl border-b border-white/5 sticky top-0 z-50 overflow-visible relative"
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 liquid-gloss opacity-10 pointer-events-none" />
      {/* HUD Scanline Effect */}
      <div className="absolute inset-x-0 h-[2px] bg-sahara-gold/10 top-0 animate-[scan_6s_linear_infinite]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex items-center justify-between h-24 md:h-32 overflow-hidden">
          {/* Animated Gloss Overlay */}
          <div className="absolute inset-0 liquid-gloss opacity-20 pointer-events-none" />

          <div className="flex items-center gap-10 relative z-10">
            <Link href="/" className="group flex items-center gap-6 relative">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white/10 to-transparent rounded-2xl md:rounded-[2.5rem] p-4 prestige-card flex items-center justify-center relative">
                <div className="absolute inset-0 bg-sahara-gold/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                <img
                  src={isArabic ? '/logos/logo-ar.png' : '/logos/logo-en.png'}
                  alt="EL-NAFEER Logo"
                  className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="hidden lg:block">
                <h1 className="text-2xl font-black tracking-tighter italic leading-none text-white group-hover:text-sahara-gold transition-colors">
                  EL-NAFEER
                </h1>
                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mt-2 block">
                  {isArabic ? 'العقارات الفاخرة' : 'PRESTIGE REAL ESTATE'}
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-6 md:gap-12 relative z-10">
            {/* Tech HUD Console (Clock/Version) */}
            <div className="hidden xl:flex items-center gap-8 px-8 py-4 bg-white/[0.03] rounded-[2rem] border border-white/10 prestige-card">
              <div className="flex flex-col items-end border-r border-white/10 pr-8">
                <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.3em] mb-1 leading-none">Global_Time</span>
                <span className="text-sm font-black text-white italic tracking-widest">{formatTime(time)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-1 leading-none">Engine_Ver</span>
                <span className="text-sm font-black text-white">v3.5_ELITE</span>
              </div>
            </div>

            <div className="flex items-center gap-6 md:gap-8">
              <button
                onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
                className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full border border-white/10 hover:border-sahara-gold/50 transition-all group prestige-card"
              >
                <span className={`text-[10px] font-black uppercase tracking-widest ${!isArabic ? 'text-white' : 'text-gray-600'}`}>EN</span>
                <div className="w-10 h-5 bg-white/10 rounded-full p-1 relative flex items-center">
                  <div className={`w-3.5 h-3.5 bg-sahara-gold rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(212,175,55,0.6)] ${isArabic ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isArabic ? 'text-white' : 'text-gray-600'}`}>AR</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[11px] font-black uppercase tracking-[0.4em] transition-all relative py-2 group ${isActive(item.href) ? 'text-cyan-400' : 'text-gray-200 hover:text-white'
                  }`}
              >
                {item.name}
                <div className={`absolute -bottom-1 left-0 w-full h-[2px] transition-transform duration-500 ${isActive(item.href) ? 'scale-x-100 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'scale-x-0 bg-white/20 group-hover:scale-x-100 group-hover:bg-cyan-500'
                  }`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Integrated Control Cockpit (HUD + Lang + Session) */}
        <div className="flex items-center gap-4 xl:gap-8">
          {/* Temporal & Version Nodes (Hidden on Small Desktop) */}
          <div className="hidden 2xl:flex items-center gap-6 border-x border-white/5 px-6">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-mono font-black text-cyan-400 leading-none">
                {formatTime(time)}
              </span>
              <span className="text-[6px] font-black text-gray-500 mt-1 uppercase">
                {formatDate(time)}
              </span>
            </div>

            <div className="h-6 w-px bg-white/5" />

            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <div className="w-1 h-1 rounded-full bg-sahara-gold animate-pulse" />
              <span className="text-[8px] font-black text-white tracking-widest uppercase">v3.5_ELITE</span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                {(session.user as any)?.role === 'main-admin' && (
                  <Link
                    href="/admin/master"
                    className="hidden sm:inline-block text-[10px] font-black text-cyan-400 hover:text-cyan-300 transition-all uppercase tracking-[0.2em] bg-cyan-500/5 px-6 py-3 rounded-xl border border-cyan-500/20"
                  >
                    Control Cockpit
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/10 flex items-center justify-center text-lg hover:bg-red-500/20 transition-all"
                >
                  🚀
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="group relative px-6 md:px-8 py-3 md:py-3.5 bg-cyan-500 text-black font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] rounded-xl md:rounded-2xl overflow-hidden transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                <span className="relative z-10">{isArabic ? 'دخول' : 'Access Node'}</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-1.5 transition-all hover:bg-white/5 active:scale-90"
            >
              <div className={`w-5 h-0.5 bg-cyan-400 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-5 h-0.5 bg-cyan-400 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-cyan-400 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-12" dir={isArabic ? 'rtl' : 'ltr'}>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-[0.4em] text-white hover:text-cyan-400 transition-all"
            >
              {item.name}
            </Link>
          ))}

          <div className="w-20 h-0.5 bg-cyan-500/20 my-4" />

          {/* Mobile Language Switcher */}
          <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 relative overflow-hidden w-40">
            <button
              onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all relative z-10 ${!isArabic ? 'text-black' : 'text-gray-500'}`}
            >
              EN
            </button>
            <button
              onClick={() => { setLanguage('ar'); setIsMobileMenuOpen(false); }}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all relative z-10 ${isArabic ? 'text-black' : 'text-gray-500'}`}
            >
              AR
            </button>
            <div
              className={`absolute inset-y-1 w-[46%] bg-cyan-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(0,242,254,0.4)] ${isArabic ? 'left-[51%]' : 'left-[3%]'}`}
            />
          </div>

          <span className="text-[10px] font-black text-cyan-500/40 uppercase tracking-[0.6em] mt-8">EL-NAFEER_OS_MOBILE</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-20px); opacity: 0; }
          40%, 60% { opacity: 0.8; }
          100% { transform: translateY(100px); opacity: 0; }
        }
      `}</style>
    </nav >
  )
}

