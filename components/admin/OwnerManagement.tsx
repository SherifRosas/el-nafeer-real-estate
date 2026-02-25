'use client'

import { useState } from 'react'
import { useLanguage } from '../LanguageContext'
import Image from 'next/image'

interface Owner {
  id: string
  companyName: string
  logoUrl: string
  users?: {
    email: string
    name: string
  }
}

export default function OwnerManagement({ initialOwners }: { initialOwners: Owner[] }) {
  const [owners, setOwners] = useState(initialOwners)
  const [showRegModal, setShowRegModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', companyName: '', logoUrl: '' })
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', ...formData })
      })
      const data = await res.json()
      if (data.success) {
        setOwners([data.owner, ...owners])
        setShowRegModal(false)
        setFormData({ email: '', companyName: '', logoUrl: '' })
      } else {
        alert(data.error)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Action Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
        <div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
            {isArabic ? (
              <>تنسيق <span className="text-sahara-gold">المستأجرين</span></>
            ) : (
              <>TENANT_<span className="text-sahara-gold">ORCHESTRATION</span></>
            )}
          </h2>
          <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">
            {isArabic ? 'إدارة_الأنظمة_الفرعية_والعملاء_النخبويين' : 'MANAGE_SUB_SYSTEMS_AND_ELITE_CLIENT_NODES'}
          </p>
        </div>
        <button
          onClick={() => setShowRegModal(true)}
          className="group relative px-12 py-6 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.4em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
        >
          <div className="absolute inset-0 bg-sahara-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 group-hover:text-black">{isArabic ? 'تسجيل_عميل_جديد' : 'REGISTER_NEW_CLIENT'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {owners.length === 0 ? (
          <div className="h-96 milky-glass rounded-[4.5rem] border border-white/10 flex flex-col items-center justify-center gap-10 text-center bg-black/20 shadow-2xl">
            <span className="text-9xl grayscale opacity-10 filter blur-[2px]">🏢</span>
            <div className="space-y-4">
              <p className="font-black uppercase tracking-[0.6em] text-[12px] robotic-digits text-gray-700">
                {isArabic ? 'لم_يتم_رصد_أنظمة_فرعية' : 'NO_TENANT_SUBSYSTEMS_DETECTED'}
              </p>
              <p className="text-[10px] text-white/10 font-black uppercase tracking-[0.4em]">INITIATE_CLIENT_PROTOCOL_TO_BEGIN</p>
            </div>
          </div>
        ) : (
          owners.map((owner) => (
            <div
              key={owner.id}
              className="milky-glass rounded-[4.5rem] p-12 md:p-14 border border-white/10 hover:border-sahara-gold/40 transition-all duration-700 group relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            >
              <div className={`absolute top-0 ${isArabic ? 'left-0' : 'right-0'} w-96 h-96 bg-sahara-gold/[0.04] blur-[120px] -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000`} />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

              <div className="flex flex-col xl:flex-row xl:items-center gap-12 md:gap-16 relative z-10">
                {/* Visual Identity Hub */}
                <div className="w-40 h-40 rounded-[3rem] bg-white border border-white/10 flex items-center justify-center p-6 shadow-2xl group-hover:rotate-3 group-hover:scale-105 transition-all duration-1000 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-black/5" />
                  {owner.logoUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={owner.logoUrl}
                        alt={owner.companyName}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-7xl grayscale opacity-20">🏢</span>
                  )}
                </div>

                <div className="flex-1 space-y-6 text-center md:text-left rtl:md:text-right">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 rtl:space-x-reverse">
                    <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-none group-hover:text-sahara-gold transition-colors duration-500">
                      {owner.companyName || (isArabic ? 'مطور_غير_معرف' : 'UNIDENTIFIED_DEVELOPER')}
                    </h3>
                    <div className="flex justify-center md:justify-start">
                      <span className="px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] bg-sahara-gold/10 text-sahara-gold border border-sahara-gold/20 robotic-digits shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                        {isArabic ? 'بروتوكول_محقق' : 'PROTOCOL_VERIFIED'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-10 text-gray-500 font-bold text-[11px] uppercase tracking-[0.2em] robotic-digits">
                    <span className="flex items-center gap-4"><span className="w-1.5 h-1.5 rounded-full bg-sahara-gold/40" /> {owner.users?.name || (isArabic ? 'المسؤول_الرئيسي' : 'MASTER_USER')}</span>
                    <span className="flex items-center gap-4 italic text-gray-600 lowercase tracking-[0.3em] font-black opacity-60">@{owner.users?.email || 'tenant@elnafeer.com'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                  <button className="px-14 py-6 rounded-[2.5rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.6em] hover:bg-sahara-gold hover:scale-105 transition-all shadow-xl active:scale-95 robotic-digits">
                    {isArabic ? 'تنفيذ_التدقيق' : 'EXECUTE_AUDIT'}
                  </button>
                  <button className="w-24 h-24 rounded-[2.5rem] milky-glass text-white flex items-center justify-center text-3xl hover:bg-white/10 transition-all border border-white/10 group-hover:border-sahara-gold/40 shadow-2xl active:scale-95">
                    🛠️
                  </button>
                </div>
              </div>

              <div className="mt-14 pt-14 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-10 text-[10px] font-black uppercase tracking-[0.5em] text-gray-700 robotic-digits">
                <div className="flex gap-16">
                  <span className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_20px_rgba(212,175,55,1)]" />
                    {isArabic ? 'آخر_مزامنة: متصل' : 'LAST_SYNC: LIVE_SIGNAL'}
                  </span>
                  <span className="hidden sm:block">{isArabic ? 'وقت_التشغيل: ٩٩.٩٩٪' : 'NETWORK_UPTIME: 99.99%'}</span>
                </div>
                <span className="px-8 py-3 rounded-2xl bg-white/5 border border-white/5 text-gray-700 italic group-hover:text-sahara-gold transition-colors duration-700">
                  {isArabic ? 'عقدة_فرعية:' : 'SUB_NODE:'} {owner.id.slice(-12).toUpperCase()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="absolute inset-0" onClick={() => setShowRegModal(false)} />
          <div className="milky-glass border border-white/10 rounded-[5rem] p-16 w-full max-w-3xl relative z-10 shadow-[0_50px_100px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-16 rtl:flex-row-reverse">
              <div>
                <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter mb-2">
                  {isArabic ? <>بروتوكول <span className="text-sahara-gold">التسجيل</span></> : <>REGISTRATION_<span className="text-sahara-gold">PROTOCOL</span></>}
                </h2>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] robotic-digits">SYSTEM_AUTH_REQUIRED_v3.5</p>
              </div>
              <button onClick={() => setShowRegModal(false)} className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-3xl hover:bg-sahara-gold hover:text-black transition-all">✕</button>
            </div>

            <form className="space-y-12" onSubmit={handleRegister}>
              <div className="space-y-4">
                <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-6 robotic-digits">{isArabic ? 'البريد_الإلكتروني' : 'OPERATOR_EMAIL'}</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all robotic-digits lowercase"
                  placeholder="client@elnafeer.com"
                  title={isArabic ? 'البريد الإلكتروني' : 'Operator Email'}
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em] px-6 robotic-digits">{isArabic ? 'اسم_الشركة/الكيان' : 'ENTITY_NAME'}</label>
                <input
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-10 py-6 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all"
                  placeholder={isArabic ? 'أدخل اسم الشركة...' : 'ENTER_ENTITY_NAME...'}
                  title={isArabic ? 'اسم الكيان' : 'Entity Name'}
                />
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8">
                <button
                  type="button"
                  onClick={() => setShowRegModal(false)}
                  className="py-7 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.6em] transition-all hover:bg-white/10"
                >
                  {isArabic ? 'إجهاض' : 'ABORT'}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-7 rounded-[2.5rem] bg-sahara-gold text-black font-black text-[11px] uppercase tracking-[0.6em] shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? (isArabic ? 'جاري_التنزيل...' : 'DOWNLOADING...') : (isArabic ? 'تنفيذ_التسجيل' : 'EXECUTE_REGISTRATION')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
