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
      className="milky-glass border-b border-white/10 sticky top-0 z-50 transition-all duration-500"
    >
      {/* HUD Scanline Effect */}
      <div className="absolute inset-x-0 h-[2px] bg-sahara-gold/10 top-0 animate-[scan_6s_linear_infinite] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex items-center justify-between h-24 md:h-32">
        {/* Brand Node */}
        <div className="flex items-center gap-8 relative z-10">
          <Link href="/" className="group flex items-center gap-6 relative cursor-pointer">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:rotate-3 shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/20">
              <img
                src="/logos/official-logo-dark.jfif"
                alt="EL-NAFEER Logo"
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-3xl font-black tracking-tighter italic leading-none text-white group-hover:text-sahara-gold transition-colors">
                EL-NAFEER
              </h1>
              <span className="text-[9px] font-black text-sahara-gold bg-sahara-gold/5 px-3 py-1 rounded mt-2 block tracking-[0.5em] robotic-digits">
                {isArabic ? 'العقارات الفاخرة' : 'PRESTIGE_DOMAINS'}
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Core */}
        <div className="hidden lg:flex items-center space-x-12 xl:space-x-16 rtl:space-x-reverse">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all relative py-2 group ${isActive(item.href) ? 'text-sahara-gold' : 'text-gray-400 hover:text-white'
                }`}
            >
              {item.name.replace('_', ' ')}
              <div className={`absolute -bottom-1 left-0 w-full h-[1.5px] transition-transform duration-500 ${isActive(item.href) ? 'scale-x-100 bg-sahara-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'scale-x-0 bg-white/20 group-hover:scale-x-100 group-hover:bg-sahara-gold'
                }`} />
            </Link>
          ))}
        </div>

        {/* Temporal & Control Nodes */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Cockpit Node (Temporal) */}
          <div className="hidden xl:flex items-center gap-6 px-6 py-3 bg-white/[0.03] rounded-2xl border border-white/5 milky-glass">
            <div className="flex flex-col items-end border-r border-white/10 pr-6">
              <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1 robotic-digits">GMT_SYNC</span>
              <span className="text-sm font-black text-white italic tracking-[0.15em] robotic-digits">{formatTime(time)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-sahara-gold uppercase tracking-widest mb-1 robotic-digits">CORE_VER</span>
              <span className="text-sm font-black text-white robotic-digits">v3.5_E</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Lang Switcher (Robotic) */}
            <button
              onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
              className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-[10px] font-black hover:border-sahara-gold/50 transition-all milky-glass group"
            >
              <span className="text-gray-400 group-hover:text-sahara-gold transition-colors">{isArabic ? 'EN' : 'AR'}</span>
            </button>

            {session ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/admin/master"
                  className="hidden sm:flex w-14 h-14 rounded-2xl border border-white/10 items-center justify-center text-xl hover:bg-sahara-gold/20 transition-all milky-glass"
                  title="Control Cockpit"
                >
                  ⚡
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-xl hover:bg-red-500/20 transition-all milky-glass"
                  title="Sign Out"
                >
                  🚪
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="group relative px-8 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl overflow-hidden transition-all hover:bg-sahara-gold shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                <span className="relative z-10">{isArabic ? 'دخول' : 'AUTH_NODE'}</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-14 h-14 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-1.5 transition-all hover:bg-white/5 milky-glass"
            >
              <div className={`w-6 h-[2px] bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-sahara-gold' : ''}`} />
              <div className={`w-4 h-[2px] bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-[2px] bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-sahara-gold' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[100] bg-[#020202]/95 backdrop-blur-3xl transition-all duration-700 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-12 p-12">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-[0.5em] text-white hover:text-sahara-gold transition-all italic"
            >
              {item.name}
            </Link>
          ))}
          <div className="w-24 h-[1px] bg-white/10 my-6" />
          <button
            onClick={() => { setLanguage(isArabic ? 'en' : 'ar'); setIsMobileMenuOpen(false); }}
            className="text-sm font-black text-sahara-gold uppercase tracking-[1em] robotic-digits"
          >
            {isArabic ? 'SWITCH_TO_ENGLISH' : 'SWITCH_TO_ARABIC'}
          </button>
          <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.5em] robotic-digits absolute bottom-12">EL-NAFEER_E_CORE_MOBILE</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-20px); opacity: 0; }
          40%, 60% { opacity: 0.8; }
          100% { transform: translateY(120px); opacity: 0; }
        }
      `}</style>
    </nav >
  )
}

