'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/LanguageContext'

export default function LoginPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-hidden relative">
      <NavigationHeader />

      {/* Background Cyber Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 h-[calc(100vh-80px)] flex items-center justify-center relative z-10">
        <div className="max-w-md w-full bg-[#050505] rounded-[2.5rem] md:rounded-[3rem] border border-white/5 p-8 md:p-12 relative group overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* HUD Corner Accents */}
          <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-cyan-500/20" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-cyan-500/20" />

          <div className="text-center mb-10 md:mb-12">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/5 border border-white/10 rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center overflow-hidden p-3 sm:p-4 shadow-[0_0_50px_rgba(6,182,212,0.2)] mx-auto mb-8 md:mb-10 relative group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-50" />
              <img
                src={isArabic ? '/logos/logo-ar.png' : '/logos/logo-en.png'}
                alt="EL-NAFEER Logo"
                className="w-full h-full object-contain relative z-10"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter uppercase text-white mb-3 md:mb-4">
              {isArabic ? 'بوابة الوصول' : 'Access Node'}
            </h1>
            <p className="text-[9px] sm:text-[11px] font-black text-cyan-500/60 uppercase tracking-[0.4em] sm:tracking-[0.5em]">
              {isArabic ? 'مصادقة الذكاء الاصطناعي' : 'Proprietary AI Authentication'}
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 relative group cursor-pointer hover:border-cyan-500/30 transition-all border-dashed">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Protocol: Direct Entry</p>
              <button
                onClick={() => router.push('/real-estate')}
                className="w-full bg-cyan-500 text-black font-black py-5 rounded-2xl uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                Proceed to Domain
              </button>
            </div>

            <p className="text-[9px] font-bold text-gray-600 text-center uppercase tracking-widest leading-relaxed">
              Global OAuth Mesh is currently in secondary status. <br />
              Identity verification handled by local AI orchestration.
            </p>
          </div>

          {/* Bottom Branding */}
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">SECURED BY PLATFORM MASTER</span>
          </div>
        </div>
      </div>
    </div>
  )
}
