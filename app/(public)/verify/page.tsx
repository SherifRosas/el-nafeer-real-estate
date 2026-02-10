'use client'

import NavigationHeader from '@/components/NavigationHeader'

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-xl bg-[#050505] rounded-[3rem] border border-white/5 p-12 text-center relative z-10 shadow-2xl">
        <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-500 mx-auto mb-8 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <span className="text-3xl">🧩</span>
        </div>

        <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-6" dir="rtl">
          بروتوكول التحقق غير مفعل
        </h1>

        <div className="space-y-4 mb-10">
          <p className="text-gray-400 font-medium text-sm leading-relaxed" dir="rtl">
            لقد تم تحسين مسار الاستحواذ. لا يتطلب النظام حالياً مزامنة بريد إلكتروني أو رقم هاتف يدوية. يمكنك المتابعة مباشرة.
          </p>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] leading-relaxed">
            Verification protocol is deprecated in optimized flow. Identity synthesis is now direct. Proceed to acquisition node.
          </p>
        </div>

        <a
          href="/apply"
          className="inline-block bg-cyan-500 text-black font-black py-4 px-10 rounded-2xl uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)]"
        >
          EXECUTE_REGISTRATION
        </a>
      </div>
    </div>
  )
}
