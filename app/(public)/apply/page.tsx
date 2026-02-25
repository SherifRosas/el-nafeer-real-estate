'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { applicationSchema } from '@/lib/validation'
import ApplicationProgress from '@/components/ApplicationProgress'
import { saveDraftToLocalStorage, loadDraftFromLocalStorage, clearDraft } from '@/lib/draft-save'
import { useLanguage } from '@/components/LanguageContext'
import NavigationHeader from '@/components/NavigationHeader'

export default function ApplyPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    phoneNumber: '',
    requirementsAgreed: false,
    documentsAgreed: false,
  })
  const [nationalIdFront, setNationalIdFront] = useState<File | null>(null)
  const [nationalIdBack, setNationalIdBack] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [draftSaved, setDraftSaved] = useState(false)
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const email = formData.email || 'anonymous'
    const draft = loadDraftFromLocalStorage(email)
    if (draft) {
      setFormData((prev) => ({
        ...prev,
        ...draft,
        email: prev.email,
      }))
    }
  }, [])

  useEffect(() => {
    const email = formData.email || 'anonymous'
    autoSaveIntervalRef.current = setInterval(() => {
      const saved = saveDraftToLocalStorage(email, formData)
      if (saved) {
        setDraftSaved(true)
        setTimeout(() => setDraftSaved(false), 2000)
      }
    }, 30000)

    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current)
      }
    }
  }, [formData])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === 'front') setNationalIdFront(file)
      else setNationalIdBack(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      applicationSchema.parse(formData)
      if (!nationalIdFront || !nationalIdBack) {
        throw new Error('Verification media required (ID Front/Back)')
      }

      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString())
      })
      formDataToSend.append('nationalIdFront', nationalIdFront)
      formDataToSend.append('nationalIdBack', nationalIdBack)

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Protocol submission failure')

      clearDraft(formData.email || 'anonymous')
      if (data.couponId) router.push(`/coupon/${data.couponId}`)
      else router.push(`/payment?applicationId=${data.applicationId}`)
    } catch (err: any) {
      setError(err.message || 'Node sync error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-sahara-gold/30">
      <NavigationHeader />

      <div className="max-w-5xl mx-auto py-20 px-6">
        <ApplicationProgress currentStep="apply" className="mb-12 opacity-50 hover:opacity-100 transition-opacity" />

        <div className="milky-glass rounded-[2.5rem] md:rounded-[4.5rem] border border-white/10 p-8 md:p-20 relative group overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          {/* Elite HUD Accents */}
          <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-sahara-gold/10" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-sahara-gold/10" />
          <div className="absolute inset-0 bg-sahara-gold/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />

          <div className="relative z-10">
            <header className="text-center mb-16 md:mb-24">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-xl border border-sahara-gold/20 bg-sahara-gold/5 mb-10 group/proto">
                <span className="w-2 h-2 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
                <span className="text-[10px] font-black text-gray-400 group-hover:text-sahara-gold transition-colors uppercase tracking-[0.5em] robotic-digits">ACQUISITION_PROTOCOL_v3.5_MASTER</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-none">
                {isArabic ? 'بروتوكول الاستحواذ' : 'Acquisition Protocol'}
              </h1>
              <p className="text-[10px] md:text-xs font-black text-gray-600 uppercase tracking-[0.5em] italic">
                {isArabic ? 'مزامنة بيانات العميل للتحقق من الأهلية' : 'Identity Synthesis // Eligibility Verification'}
              </p>
            </header>

            {/* Protocol Meta Info */}
            <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 mb-16 flex flex-col md:flex-row gap-10 items-center milky-glass">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-sahara-gold/5 border border-sahara-gold/10 rounded-3xl flex items-center justify-center text-3xl md:text-5xl shadow-2xl">🏛️</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-sm md:text-base font-black uppercase text-sahara-gold mb-3 tracking-widest">{isArabic ? 'إجراءات ما بعد التسجيل' : 'POST_REGISTRATION_SEQUENCE'}</h3>
                <p className="text-xs md:text-sm font-bold text-gray-500 leading-relaxed uppercase tracking-tight italic">
                  {isArabic
                    ? 'بمجرد تنفيذ البروتوكول، سيتم توليد رمز وصول فريد وجدولة مقابلة شخصية. يرجى تأمين دخلاتك.'
                    : 'System will generate unique master tokens and schedule physical synchronization nodes upon successful validation. Level 5 clearance required.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Inputs */}
                {[
                  { id: 'fullName', label: isArabic ? 'الاسم بالكامل' : 'GLOBAL_IDENTITY', placeholder: 'MASTER_USER_01' },
                  { id: 'email', label: isArabic ? 'البريد الإلكتروني' : 'COMMUNICATION_NODE', placeholder: 'MAIL@ELNAFEER.AI' },
                  { id: 'phoneNumber', label: isArabic ? 'رقم الهاتف' : 'CONTACT_FREQUENCY', placeholder: '+20 XX XXX XXXX' },
                  { id: 'address', label: isArabic ? 'العنوان' : 'GEOGRAPHIC_CACHE', placeholder: 'SECTOR_07_CAIRO' },
                ].map((input) => (
                  <div key={input.id} className="space-y-4">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-4 robotic-digits">{input.label}</label>
                    <input
                      type={input.id === 'email' ? 'email' : 'text'}
                      value={(formData as any)[input.id]}
                      onChange={(e) => setFormData({ ...formData, [input.id]: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-8 py-6 text-white font-black tracking-tight focus:border-sahara-gold/50 outline-none transition-all placeholder:text-gray-800 italic uppercase text-sm"
                      placeholder={input.placeholder}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* ID Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { id: 'front', label: isArabic ? 'الهوية - وجه' : 'ID_IDENT_FRONT_CORE', state: nationalIdFront },
                  { id: 'back', label: isArabic ? 'الهوية - ظهر' : 'ID_IDENT_BACK_CORE', state: nationalIdBack },
                ].map((file) => (
                  <div key={file.id} className="relative">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 block robotic-digits">{file.label}</label>
                    <div className="group/upload relative h-56 rounded-[2.5rem] border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-center hover:border-sahara-gold/30 transition-all cursor-pointer milky-glass shadow-inner">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, file.id as 'front' | 'back')}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        accept="image/*"
                      />
                      <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl mb-4 grayscale group-hover/upload:grayscale-0 group-hover/upload:scale-125 transition-all">{file.state ? '💎' : '📁'}</span>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] robotic-digits">{file.state ? file.state.name : 'BINARY_VUL_LINK'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkboxes */}
              <div className="space-y-8 pt-12 border-t border-white/5">
                {[
                  { id: 'requirementsAgreed', label: isArabic ? 'أوافق على الشروط' : 'ACKNOWLEDGE_ELITE_PREREQUISITES_&_SYSTEM_BOUNDS' },
                  { id: 'documentsAgreed', label: isArabic ? 'أقر بصحة البيانات' : 'VERIFY_DATA_INTEGRITY_&_MASTER_SIGNATURE' },
                ].map((check) => (
                  <label key={check.id} className="flex items-center gap-6 cursor-pointer group/check">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={(formData as any)[check.id]}
                        onChange={(e) => setFormData({ ...formData, [check.id]: e.target.checked })}
                        className="peer hidden"
                      />
                      <div className="w-7 h-7 rounded-xl border-2 border-white/10 peer-checked:bg-sahara-gold peer-checked:border-sahara-gold transition-all shadow-[0_0_20px_rgba(212,175,55,0)] peer-checked:shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center">
                        <span className="text-black text-[10px] font-black opacity-0 peer-checked:opacity-100 italic transition-opacity">OK</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-black text-gray-500 group-hover/check:text-sahara-gold transition-colors uppercase tracking-[0.2em]">
                      {check.label}
                    </span>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-black py-10 rounded-[3rem] uppercase tracking-[0.8em] text-[11px] hover:scale-[1.01] hover:bg-sahara-gold transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)] disabled:opacity-50 relative overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">{loading ? 'STABILIZING_PROTOCOL...' : 'EXECUTE_MASTER_REGISTRATION'}</span>
              </button>
            </form>

            {error && (
              <div className="mt-12 p-8 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase text-center tracking-[0.4em] robotic-digits">
                CRITICAL_ALERT: {error}
              </div>
            )}

            {draftSaved && (
              <div className="fixed bottom-12 left-12 p-6 bg-sahara-gold text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-[0_0_40px_rgba(212,175,55,0.4)] animate-fade-in z-[100] robotic-digits">
                ✓ CACHE_SYNC_STABLE
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="max-w-4xl mx-auto pb-20 text-center opacity-20">
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.8em] robotic-digits">V3.5_ELITE // AUTH_CORE_MASTER // OPERATIONAL</p>
      </footer>
    </div>
  )
}
