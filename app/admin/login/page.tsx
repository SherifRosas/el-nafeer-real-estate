'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageContext'

export default function AdminLoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already logged in as admin
  useEffect(() => {
    const userRole = (session?.user as any)?.role
    if (status === 'authenticated' && (userRole === 'admin' || userRole === 'main-admin')) {
      router.push('/admin/master')
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(isArabic ? 'بوابة الوصول مرفوضة. يرجى التحقق من بيانات الاعتماد.' : 'ACCESS_DENIED. PLEASE_VERIFY_CREDENTIALS.')
        setLoading(false)
      } else if (result?.ok) {
        setTimeout(() => {
          window.location.replace('/admin/master')
        }, 800)
      }
    } catch (err) {
      setError('CRITICAL_SYSTEM_ERROR')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/grid.svg')] bg-repeat shadow-inner" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sahara-gold/[0.03] blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="max-w-xl w-full relative z-10 transition-all duration-1000 animate-in fade-in zoom-in-95">
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

        <div className="milky-glass rounded-[4rem] border border-white/10 p-12 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          {/* Interior HUD Lines */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sahara-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

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
              <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.5em] px-4 robotic-digits" htmlFor="email">
                {isArabic ? 'البريد_الإلكتروني' : 'OPERATOR_ID'}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all robotic-digits lowercase"
                style={{ color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.4)' }}
                placeholder="operator@nexus.ai"
                title={isArabic ? 'البريد الإلكتروني' : 'Operator Email'}
              />
            </div>

            <div className="space-y-4">
              <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.5em] px-4 robotic-digits" htmlFor="password">
                {isArabic ? 'كلمة_السر' : 'SECURITY_TOKEN'}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all robotic-digits"
                style={{ color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.4)' }}
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


