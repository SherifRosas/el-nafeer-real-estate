'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { db } from '@/lib/supabase'
import ApplicationProgress from '@/components/ApplicationProgress'
import { useLanguage } from '@/components/LanguageContext'
import NavigationHeader from '@/components/NavigationHeader'

export default function CouponPage() {
  const params = useParams()
  const couponId = params.id as string
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [coupon, setCoupon] = useState<any>(null)
  const [application, setApplication] = useState<any>(null)
  const [appointment, setAppointment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        let couponData = await db.getCouponById(couponId)
        if (!couponData) {
          couponData = await db.getCouponByApplicationId(couponId)
        }
        if (!couponData) {
          setLoading(false)
          return
        }
        setCoupon(couponData)

        const applicationData = await db.getApplicationById(couponData.applicationId)
        if (applicationData) {
          setApplication(applicationData)
          const appointmentData = await db.getAppointmentByApplicationId(applicationData.id)
          if (appointmentData) {
            setAppointment(appointmentData)
          }
        }
      } catch (error) {
        console.error('Node retrieval error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [couponId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!coupon || !application) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center font-black uppercase tracking-widest text-[10px]">
        ERROR: Access Token Not Located
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      <NavigationHeader />

      <div className="max-w-4xl mx-auto py-24 px-6 relative z-10">
        <ApplicationProgress currentStep="coupon" className="mb-16 opacity-50 hover:opacity-100 transition-opacity" />

        <div className="bg-[#050505] rounded-[2.5rem] md:rounded-[3rem] border border-white/5 p-8 md:p-12 relative group overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          {/* Cyber HUD Accents */}
          <div className="absolute top-6 left-6 w-12 h-12 md:w-24 md:h-24 border-t-2 border-l-2 border-cyan-500/10" />
          <div className="absolute bottom-6 right-6 w-12 h-12 md:w-24 md:h-24 border-b-2 border-r-2 border-cyan-500/10" />
          <div className="absolute inset-0 bg-cyan-500/[0.02] -translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />

          <header className="text-center mb-12 md:mb-16 relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,1)]" />
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.4em]">Protocol_Execution_Verified</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4 leading-none text-balance">
              {isArabic ? 'تم تأكيد التنفيذ' : 'Protocol Executed'}
            </h1>
            <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.5em]">
              {isArabic ? 'تأمين الوصول إلى العقار والمزامنة الجسدية' : 'Securing Property Access & Physical Sync Nodes'}
            </p>
          </header>

          <div className="space-y-12 relative z-10">
            {/* Status confirmation */}
            <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-10 text-center relative overflow-hidden group/status">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover/status:translate-x-full transition-transform duration-1000" />
              <div className="text-4xl md:text-5xl mb-6">🔗</div>
              <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter mb-2 text-white">
                {isArabic ? 'تم التحقق من الأهلية' : 'Eligibility Sync Confirmed'}
              </h2>
              <p className="text-[9px] md:text-[11px] font-black text-cyan-500/60 uppercase tracking-widest">
                {isArabic ? 'نظام النفير الذكي متصل' : 'EL-NAFEER CORE ACCESS ENABLED'}
              </p>
            </div>

            {/* Token Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {[
                { label: isArabic ? 'الهويةProprietary ID' : 'Proprietary Identity', value: application.fullName, icon: '👤' },
                { label: isArabic ? 'رمز الوصولToken Code' : 'Access Token Code', value: coupon.couponCode, icon: '🎫', highlight: true },
                { label: isArabic ? 'تشفير الأمانSecurity Hash' : 'Encrypted Security Hash', value: coupon.securityMark.substring(0, 24) + '...', icon: '🛡️' },
                { label: isArabic ? 'الحالةStatus' : 'System Status', value: 'SYNCHRONIZED', icon: '⚡', color: 'text-green-500' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:border-cyan-500/20 transition-all group/item">
                  <p className="text-[8px] md:text-[9px] font-black text-gray-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span>{item.icon}</span> {item.label}
                  </p>
                  <p className={`text-xs md:text-sm font-black uppercase tracking-tight ${item.highlight ? 'text-cyan-400 font-mono text-lg md:text-xl' : 'text-white'} ${item.color || ''} break-all`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Physical Sync (Appointment) */}
            {appointment && (
              <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-cyan-500/20 bg-cyan-500/[0.03] space-y-8 md:space-y-10">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-2xl md:text-3xl">📅</div>
                  <div>
                    <h3 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-white">
                      {isArabic ? 'المزامنة الجسدية' : 'Physical Synchronization'}
                    </h3>
                    <p className="text-[8px] md:text-[9px] font-black text-cyan-500/40 uppercase tracking-[0.3em]">Temporal Node Reservation</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">{isArabic ? 'التاريخ' : 'DATE_TX'}</p>
                    <p className="font-bold text-sm text-cyan-400 uppercase">{new Date(appointment.date).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">{isArabic ? 'التوقيت' : 'TIME_UTC'}</p>
                    <p className="font-bold text-sm text-cyan-400 uppercase">{appointment.time}</p>
                  </div>
                  <button
                    onClick={() => window.open('https://maps.google.com/?q=29.976688,31.309752', '_blank')}
                    className="bg-black/40 p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all text-left group/map"
                  >
                    <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1 flex justify-between items-center">
                      {isArabic ? 'الموقع' : 'COORD_LOC'}
                      <span className="group-hover/map:translate-x-1 transition-transform">➡️</span>
                    </p>
                    <p className="font-bold text-[10px] text-gray-400 uppercase leading-tight truncate">{appointment.location}</p>
                  </button>
                </div>

                {/* Protocol Prerequisites */}
                <div className="p-8 rounded-2xl bg-black/60 border border-white/5 space-y-4">
                  <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-4">
                    {isArabic ? 'متطلبات البروتوكول:' : 'PROTOCOL_PREREQUISITES:'}
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { ar: 'بطاقة الهوية الأصلية', en: 'Physical ID Ident' },
                      { ar: 'رمز الوصول الرقمي', en: 'Digital Access Token' },
                      { ar: 'المستندات الأصلية', en: 'Binary Verification Media' },
                      { ar: 'الموقع الموثق', en: 'Verified Coordinate Arrival' },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                        {isArabic ? item.ar : item.en}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-6 pt-10">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-cyan-500 text-black font-black py-6 rounded-3xl uppercase tracking-[0.4em] text-[10px] hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                Output_Hardcopy (Print)
              </button>
              <button
                onClick={() => {
                  const text = `ID: ${application.fullName}\nTOKEN: ${coupon.couponCode}\nHASH: ${coupon.securityMark}`
                  navigator.clipboard.writeText(text)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black py-6 rounded-3xl uppercase tracking-[0.4em] text-[10px] transition-all"
              >
                {copied ? 'CACHED_TO_CLIPBOARD' : 'Sync_Metadata (Copy)'}
              </button>
            </div>
          </div>
        </div>

        {/* Global Node ID */}
        <div className="mt-16 text-center opacity-20">
          <p className="text-[8px] font-black text-gray-600 uppercase tracking-[1em]">PLATFORM_MASTER: SHERIF_ROSAS // NODE_ACTIVE_2026</p>
        </div>
      </div>
    </div>
  )
}
