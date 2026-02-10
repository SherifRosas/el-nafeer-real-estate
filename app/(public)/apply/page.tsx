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
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30">
      <NavigationHeader />

      <div className="max-w-5xl mx-auto py-20 px-6">
        <ApplicationProgress currentStep="apply" className="mb-12 opacity-50 hover:opacity-100 transition-opacity" />

        <div className="bg-[#050505] rounded-[2.5rem] md:rounded-[3rem] border border-white/5 p-8 md:p-12 relative group overflow-hidden shadow-2xl">
          {/* Cyber HUD Accents */}
          <div className="absolute top-6 left-6 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-cyan-500/10" />
          <div className="absolute bottom-6 right-6 w-12 h-12 md:w-20 md:h-20 border-b-2 border-r-2 border-cyan-500/10" />
          <div className="absolute inset-0 bg-cyan-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />

          <div className="relative z-10">
            <header className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]" />
                <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.4em]">Acquisition_Protocol_v4</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4 leading-none">
                {isArabic ? 'بروتوكول الاستحواذ' : 'Acquisition Protocol'}
              </h1>
              <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.5em]">
                {isArabic ? 'مزامنة بيانات العميل للتحقق من الأهلية' : 'Identity Synthesis & Eligibility Verification'}
              </p>
            </header>

            {/* Protocol Meta Info */}
            <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10 mb-10 md:mb-12 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-2xl md:text-3xl">ℹ️</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-[12px] md:text-sm font-black uppercase text-cyan-400 mb-1">{isArabic ? 'إجراءات ما بعد التسجيل' : 'Post-Registration Sequence'}</h3>
                <p className="text-[10px] md:text-[11px] font-medium text-gray-400 leading-relaxed">
                  {isArabic
                    ? 'بمجرد تنفيذ البروتوكول، سيتم توليد رمز وصول فريد وجدولة مزامنة جسدية (مقابلة). يرجى تأمين البيانات المدخلة.'
                    : 'System will generate unique access tokens and schedule physical synchronization (interview) upon successful data entry. Secure your input nodes.'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Inputs */}
                {[
                  { id: 'fullName', label: isArabic ? 'الاسم بالكامل' : 'Global Identity (Full Name)', placeholder: 'MASTER USER' },
                  { id: 'email', label: isArabic ? 'البريد الإلكتروني' : 'Communication Node (Email)', placeholder: 'NODE@ELNAFEER.AI' },
                  { id: 'phoneNumber', label: isArabic ? 'رقم الهاتف' : 'Contact Frequency (Phone)', placeholder: '+20 XXX XXX XXXX' },
                  { id: 'address', label: isArabic ? 'العنوان' : 'Geographic Cache (Address)', placeholder: 'CAIRO_SECTOR_7' },
                ].map((input) => (
                  <div key={input.id} className="space-y-3">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-2">{input.label}</label>
                    <input
                      type={input.id === 'email' ? 'email' : 'text'}
                      value={(formData as any)[input.id]}
                      onChange={(e) => setFormData({ ...formData, [input.id]: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white font-bold tracking-tight focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-800 italic"
                      placeholder={input.placeholder}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* ID Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { id: 'front', label: isArabic ? 'الهوية - وجه' : 'ID_IDENT_FRONT', state: nationalIdFront },
                  { id: 'back', label: isArabic ? 'الهوية - ظهر' : 'ID_IDENT_BACK', state: nationalIdBack },
                ].map((file) => (
                  <div key={file.id} className="relative">
                    <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3 block">{file.label}</label>
                    <div className="group/upload relative h-40 rounded-[2rem] border-2 border-dashed border-white/5 bg-white/5 flex flex-center hover:border-cyan-500/30 transition-all cursor-pointer">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, file.id === 'front')}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        accept="image/*"
                      />
                      <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl mb-2 opacity-40 group-hover/upload:scale-125 transition-transform">{file.state ? '✅' : '📤'}</span>
                        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{file.state ? file.state.name : 'Binary_Upload_Link'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkboxes */}
              <div className="space-y-6 pt-8 border-t border-white/5">
                {[
                  { id: 'requirementsAgreed', label: isArabic ? 'أوافق على الشروط' : 'Acknowledge System Prerequisites & Legal Bounds' },
                  { id: 'documentsAgreed', label: isArabic ? 'أقر بصحة البيانات' : 'Verify Data Integrity & Authenticity Signature' },
                ].map((check) => (
                  <label key={check.id} className="flex items-center gap-4 cursor-pointer group/check">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={(formData as any)[check.id]}
                        onChange={(e) => setFormData({ ...formData, [check.id]: e.target.checked })}
                        className="peer hidden"
                      />
                      <div className="w-6 h-6 rounded-lg border-2 border-white/10 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all shadow-[0_0_10px_rgba(6,182,212,0)] peer-checked:shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
                    </div>
                    <span className="text-[11px] font-black text-gray-500 group-hover/check:text-white transition-colors uppercase tracking-widest">
                      {check.label}
                    </span>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 text-black font-black py-8 rounded-[2rem] uppercase tracking-[0.5em] text-xs hover:scale-[1.01] transition-all shadow-[0_0_50px_rgba(6,182,212,0.3)] disabled:opacity-50 relative overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">{loading ? 'INITIALIZING_PROTOCOL...' : 'EXECUTE_REGISTRATION'}</span>
              </button>
            </form>

            {error && (
              <div className="mt-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase text-center tracking-widest">
                ALERT: {error}
              </div>
            )}

            {draftSaved && (
              <div className="fixed bottom-12 left-12 p-4 bg-cyan-500 text-black rounded-xl font-black text-[9px] uppercase tracking-widest shadow-2xl animate-fade-in z-[100]">
                ✓ Core_Cache_Updated
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HUD footer details */}
      <footer className="max-w-4xl mx-auto pb-20 text-center opacity-30">
        <p className="text-[8px] font-black text-gray-600 uppercase tracking-[0.5em]">Auth_Core_v3.3 // Stabilized_Active // Master: Sherif Rosas</p>
      </footer>
    </div>
  )
}
