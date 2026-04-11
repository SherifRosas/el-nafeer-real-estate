'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/LanguageContext'
import NavigationHeader from '@/components/NavigationHeader'

export default function LoginPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-hidden relative">
      <NavigationHeader />

      {/* Background Cyber Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sahara-gold/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 h-[calc(100vh-80px)] flex items-center justify-center relative z-10">
        <div className="max-w-md w-full bg-[#050505] rounded-[2.5rem] md:rounded-[3rem] border border-sahara-gold/10 p-8 md:p-12 relative group overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* HUD Corner Accents */}
          <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-sahara-gold/20" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-sahara-gold/20" />

          <div className="text-center mb-10 md:mb-12">
            <div className="quantum-luxe-logo-container w-24 h-24 sm:w-32 sm:h-32 bg-white/5 border border-sahara-gold/20 rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center overflow-hidden p-3 sm:p-4 shadow-[0_0_50px_rgba(197,160,89,0.2)] mx-auto mb-8 md:mb-10 relative group-hover:scale-105 transition-all duration-500">
              <img
                src="/assets/branding/logo.png"
                alt="Beit Al-Khair Official Logo"
                className="w-full h-full object-contain relative z-10"
              />
              <div className="quantum-luxe-logo-shine" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter uppercase text-luxury-gold mb-3 md:mb-4">
              {isArabic ? 'بوابة الوصول' : 'Access Node'}
            </h1>
            <p className="text-[9px] sm:text-[11px] font-black text-sahara-gold/60 uppercase tracking-[0.4em] sm:tracking-[0.5em]">
              {isArabic ? 'مصادقة الذكاء الاصطناعي السيادي' : 'Sovereign AI Authentication'}
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-sahara-gold/10 relative group cursor-pointer hover:border-sahara-gold/30 transition-all border-dashed">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Protocol: Authorized Entry</p>
              <button
                onClick={() => router.push('/beit-alkhair')}
                className="w-full bg-sahara-gold text-black font-black py-5 rounded-2xl uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(197,160,89,0.3)] mb-4"
              >
                Manifest Domain
              </button>
              
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-4 mt-8 text-center">Protocol: QA_TEST_BYPASS</p>
              <button
                onClick={() => router.push('/apply?test=true')}
                className="w-full bg-sahara-gold text-black font-black py-5 rounded-2xl uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                Access_Test_Node
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
