'use client'

import { useRouter } from 'next/navigation'
import ApplicationProgress from '@/components/ApplicationProgress'
import NavigationHeader from '@/components/NavigationHeader'

export default function PaymentPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30">
      <NavigationHeader />

      <div className="max-w-5xl mx-auto py-24 px-6 relative z-10">
        <ApplicationProgress currentStep="coupon" className="mb-16 opacity-50 hover:opacity-100 transition-opacity" />

        <div className="max-w-2xl mx-auto bg-[#050505] rounded-[3rem] border border-white/5 p-16 relative group overflow-hidden shadow-2xl">
          {/* Cyber HUD Accents */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-500/10" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-cyan-500/10" />

          <div className="text-center mb-12 relative z-10">
            <div className="w-24 h-24 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-500 mx-auto mb-8 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <span className="text-4xl animate-pulse">⚡</span>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white mb-2">Protocol Link: Bypassed</h1>
            <p className="text-[10px] font-black text-cyan-500/40 uppercase tracking-[0.4em]">Financial Verification Stream Skipped</p>
          </div>

          <div className="space-y-8 relative z-10 text-center">
            <div className="p-8 rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10">
              <p className="text-sm font-medium text-gray-400 leading-relaxed mb-4" dir="rtl">
                في هذا الإصدار من النظام، لا توجد حاجة للدفع. يتم إنشاء الكوبون مباشرة بعد التقديم لضمان سرعة الوصول.
              </p>
              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                Payment nodes are currently bypassed for maximum acquisition velocity. Access token generation is immediate.
              </p>
            </div>

            <button
              onClick={() => router.push('/')}
              className="w-full bg-cyan-500 text-black font-black py-6 rounded-[2rem] uppercase tracking-[0.5em] text-xs hover:scale-[1.01] transition-all shadow-[0_0_50px_rgba(6,182,212,0.3)] group/btn relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">Return_to_Core_System</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
