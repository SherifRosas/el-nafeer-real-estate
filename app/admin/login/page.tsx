'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import { LogOut, ArrowRight, ShieldCheck } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const userRole = (session?.user as any)?.role
  const userIdentifier = session?.user?.name || session?.user?.email || 'Active Admin'

  const handleContinueToDashboard = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const callbackUrl = searchParams.get('callbackUrl')
    if (userRole === 'screen-admin') {
      router.push(callbackUrl || '/admin/screen-uploader')
    } else {
      router.push(callbackUrl || '/admin/master')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Aggressive normalization for phone numbers
      // 1. Convert Eastern Arabic numerals to Western Arabic
      // 2. Remove all spaces, tabs, and non-breaking spaces
      const normalizedEmail = email
        .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString())
        .replace(/[\s\uFEFF\xA0]/g, '')
        .trim();

      const result = await signIn('credentials', {
        email: normalizedEmail,
        password: password.trim(),
        redirect: false,
      })

      if (result?.error) {
        setError(isArabic ? 'بوابة الوصول مرفوضة. يرجى التحقق من بيانات الاعتماد.' : 'ACCESS_DENIED. PLEASE_VERIFY_CREDENTIALS.')
        setLoading(false)
      } else if (result?.ok) {
        // Redirection is handled by the useEffect above, but we can do a fallback reload
        setTimeout(() => {
          const searchParams = new URLSearchParams(window.location.search)
          const callbackUrl = searchParams.get('callbackUrl')
          window.location.replace(callbackUrl || '/admin') // Base admin route handles role routing
        }, 800)
      }
    } catch (err) {
      setError('CRITICAL_SYSTEM_ERROR')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Quantum Luxury Background - BRIGHTENED */}
      <div className="absolute inset-0 bg-[url('/ad-v2-quantum.png')] bg-cover bg-center opacity-40 mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1930]/70 via-[#050B14]/80 to-[#122340]/90 backdrop-blur-[4px]" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/grid.svg')] bg-repeat shadow-inner" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sahara-gold/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="max-w-xl w-full relative z-10">
        {/* Visual Identity HUD */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 milky-glass mb-10 shadow-xl">
            <span className="w-2 h-2 bg-sahara-gold rounded-full animate-ping shadow-[0_0_15px_rgba(212,175,55,1)]" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em] robotic-digits">
              {isArabic ? 'مدخل_المسؤول_v3.5' : 'ADMIN_INGRESS_v3.5'}
            </span>
          </div>
          <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-2 text-white leading-none">
            {isArabic ? (
              <>تسجيل <span className="text-sahara-gold">الدخول</span></>
            ) : (
              <>SYSTEM_<span className="text-sahara-gold">ACCESS</span></>
            )}
          </h1>
          <p className="text-[9px] font-black text-gray-700 uppercase tracking-[1em] robotic-digits ml-[1em]">
            {isArabic ? 'التحقق_من_الهوية' : 'AUTHORIZATION_PENDING'}
          </p>
        </div>

        <div className="milky-glass rounded-[4rem] border-2 border-white/20 p-12 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.1)] relative overflow-hidden group bg-white/[0.03]">
          {/* Interior HUD Lines */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sahara-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

          {/* ACTIVE SESSION CARD IF AUTHENTICATED */}
          {status === 'authenticated' && (
            <div className="mb-10 p-6 rounded-3xl bg-sahara-gold/10 border-2 border-sahara-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] animate-in fade-in">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck size={20} className="text-sahara-gold" />
                <p className="text-xs font-black text-white uppercase tracking-wider">
                  {isArabic ? 'جلسة نشطة حالياً' : 'ACTIVE_SESSION_DETECTED'}
                </p>
              </div>
              <p className="text-xs text-gray-300 mb-6 font-medium">
                {isArabic ? `أنت مسجل حالياً كـ: ` : `Logged in as: `}
                <span className="text-sahara-gold font-bold">{userIdentifier}</span>
                <span className="text-[10px] text-gray-400 block mt-1 uppercase tracking-widest robotic-digits">Role: {userRole}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleContinueToDashboard}
                  className="flex-1 py-3 px-5 bg-sahara-gold text-black rounded-2xl font-black text-[11px] uppercase tracking-wider hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>{isArabic ? 'المتابعة للوحة التحكم' : 'CONTINUE_TO_DASHBOARD'}</span>
                  <ArrowRight size={14} className="rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/admin/login' })}
                  className="py-3 px-5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-2xl font-black text-[11px] uppercase tracking-wider hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                  <span>{isArabic ? 'تسجيل الخروج (Sign Out)' : 'SIGN_OUT'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Default Creds Info HUD (Sleek) */}
          <div className="mb-12 p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative group/info hover:border-sahara-gold/20 transition-all">
            <div className="flex items-center gap-4 mb-4 rtl:flex-row-reverse">
              <span className="w-1.5 h-1.5 bg-sahara-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,1)]" />
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{isArabic ? 'بيانات الاعتماد الافتراضية' : 'DEFAULT_ACCESS_PROTOCOLS'}:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rtl:text-right">
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tight robotic-digits">
                {isArabic ? 'البريد: ' : 'MAIL: '}
                <span className="text-sahara-gold/60">admin@example.com</span>
              </p>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tight robotic-digits">
                {isArabic ? 'السر: ' : 'KEY: '}
                <span className="text-sahara-gold/60">admin123</span>
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-10 p-6 rounded-2xl bg-red-500/5 border border-red-500/20 animate-in slide-in-from-top-4">
              <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center italic robotic-digits">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <label className="text-xs text-cyan-200 font-black uppercase tracking-[0.3em] px-4 robotic-digits" htmlFor="email">
                {isArabic ? 'البريد_الإلكتروني / رقم_الهاتف' : 'OPERATOR_ID / PHONE'}
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                className="w-full bg-[#111a2c]/80 border-2 border-white/20 rounded-[2.5rem] px-10 py-6 text-white font-black text-lg focus:border-sahara-gold focus:bg-[#1a263d] outline-none transition-all robotic-digits lowercase shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] placeholder:text-gray-400"
                placeholder="operator@nexus.ai / 010xxxxxxxx"
                title={isArabic ? 'البريد الإلكتروني / رقم الهاتف' : 'Operator Email or Phone'}
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs text-cyan-200 font-black uppercase tracking-[0.3em] px-4 robotic-digits" htmlFor="password">
                {isArabic ? 'كلمة_السر' : 'SECURITY_TOKEN'}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-[#111a2c]/80 border-2 border-white/20 rounded-[2.5rem] px-10 py-6 text-white font-black text-lg focus:border-sahara-gold focus:bg-[#1a263d] outline-none transition-all robotic-digits shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] placeholder:text-gray-400"
                placeholder="••••••••••••"
                title={isArabic ? 'كلمة السر' : 'Security Token'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-8 mt-4 bg-white text-black rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.8em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] disabled:opacity-50 robotic-digits"
            >
              <div className="absolute inset-0 bg-sahara-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-black">
                {loading ? (isArabic ? 'جاري_التنزيل...' : 'SYNCHRONIZING...') : (isArabic ? 'تنفيذ_الدخول' : 'EXECUTE_LOGIN')}
              </span>
            </button>
          </form>
        </div>

        {/* Cyber Security Disclaimer */}
        <div className="mt-12 text-center text-[8px] font-black text-white/5 uppercase tracking-[0.6em] robotic-digits">
          {isArabic ? (
            'يتم تشفير جميع حزم البيانات بمستوى عسكري v3.5'
          ) : (
            'ALL_DATA_PACKETS_ENCRYPTED_WITH_MILITARY_GRADE_v3.5'
          )}
        </div>
      </div>
    </div>
  )
}


