'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { 
  Layout, 
  Briefcase, 
  TrendingUp, 
  Map as MapIcon, 
  FileText, 
  Settings, 
  Crown,
  LogOut,
  Globe,
  Bell,
  Cpu,
  Search
} from 'lucide-react'

export default function MasterDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { language, setLanguage } = useLanguage()
  const isArabic = language === 'ar'
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const menuItems = [
    { icon: Layout, href: '/admin/master', label: isArabic ? 'القيادة' : 'COMMAND' },
    { icon: Briefcase, href: '/admin/master/owners', label: isArabic ? 'البرندات' : 'BRANDS' },
    { icon: FileText, href: '/admin/master/applications', label: isArabic ? 'الطلبات' : 'APPS' },
    { icon: MapIcon, href: '/admin/master/properties', label: isArabic ? 'الأصول' : 'ASSETS' },
    { icon: TrendingUp, href: '/admin/master/leads', label: isArabic ? 'العملاء' : 'LEADS' },
    { icon: Cpu, href: '/admin/master/ai-monitor', label: isArabic ? 'الذكاء' : 'AI' },
  ]

  return (
    <div 
      className={`min-h-screen w-screen bg-[#020408] text-white flex overflow-hidden font-sans selection:bg-sahara-gold/30 ${isArabic ? 'font-arabic' : ''}`}
      dir="ltr" // Sidebar always on left to match mockup
    >
      {/* 🌑 AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sahara-gold/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-400/[0.02] blur-[120px] rounded-full" />
      </div>

      {/* ⬅️ ROYAL CYBER SIDEBAR (The Mockup's heart) */}
      <aside className="w-20 lg:w-24 h-screen bg-black/60 backdrop-blur-3xl border-r border-white/5 flex flex-col items-center py-10 gap-12 shrink-0 z-50 relative">
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-sahara-gold/20 to-transparent" />
        
        {/* LOGO NODE */}
        <Link href="/" className="group">
          <div className="w-12 h-12 bg-sahara-gold rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-500">
            <Crown size={24} className="text-black" />
          </div>
        </Link>
        
        {/* NAV NODES */}
        <nav className="flex-1 flex flex-col gap-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`group relative p-4 rounded-2xl transition-all duration-500 ${isActive ? 'bg-sahara-gold/10 text-sahara-gold' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon size={22} className={isActive ? 'shadow-glow' : ''} />
                {/* Tooltip Label */}
                <span className="absolute left-full ml-4 px-3 py-1 bg-black/90 border border-white/10 rounded-md text-[9px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sahara-gold rounded-full shadow-[0_0_15px_#d4af37]"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* BOTTOM NODES */}
        <div className="flex flex-col gap-6">
          <button 
            onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
            className="p-4 text-white/20 hover:text-sahara-gold transition-colors text-[10px] font-black"
          >
            {isArabic ? 'EN' : 'AR'}
          </button>
          <button 
            onClick={() => signOut()}
            className="p-4 text-white/20 hover:text-red-500 transition-colors"
          >
            <LogOut size={22} />
          </button>
        </div>
      </aside>

      {/* 🖥️ MAIN VIEWPORT */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 scrollbar-hide">
        {/* Transparent Header Hook (Optional) */}
        <header className="h-20 w-full flex items-center justify-between px-10 absolute top-0 z-20 pointer-events-none">
          <div />
          <div className="flex items-center gap-6 pointer-events-auto bg-black/60 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-sahara-gold rounded-full animate-pulse" />
              <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] robotic-digits">UPLINK_SECURE: 0.8ms</p>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <p className="text-[10px] font-black text-sahara-gold uppercase tracking-widest">{isArabic ? 'شريف رصاص' : 'SHERIF_ROSAS'}</p>
            <div className="w-[1px] h-4 bg-white/10" />
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-all font-bold text-[10px] uppercase tracking-wider"
              title="Sign Out"
            >
              <LogOut size={13} />
              <span>{isArabic ? 'خروج' : 'LOGOUT'}</span>
            </button>
          </div>
        </header>

        <div className="min-h-full">
          {children}
        </div>
      </main>

      {/* 📺 CRT SCANLINE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,4px_100%]" />
    </div>
  )
}
