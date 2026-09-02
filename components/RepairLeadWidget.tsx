"use client"

import { useState } from "react"
import { submitRepairLeadAction } from "@/app/actions/repair-actions"

// Store owner's WhatsApp Number provided by the user
const STORE_OWNER_WA_NUMBER = "201288341064"

export default function RepairLeadWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const phone = formData.get("phone") as string
    const brand = formData.get("brand") as string
    const description = formData.get("description") as string

    // Basic client validation
    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      setError("رقم الهاتف غير صحيح. يجب أن يبدأ بـ 01")
      setIsSubmitting(false)
      return
    }

    const result = await submitRepairLeadAction(formData)

    setIsSubmitting(false)

    if (result.error) {
      setError(result.error)
    } else {
      setIsOpen(false)
      // Open WhatsApp in a new tab
      const text = `طلب صيانة شاشة جديد:%0Aالماركة: ${encodeURIComponent(brand)}%0Aالمشكلة: ${encodeURIComponent(description)}%0Aرقم العميل: ${encodeURIComponent(phone)}`
      window.open(`https://wa.me/${STORE_OWNER_WA_NUMBER}?text=${text}`, "_blank")
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-2.5 px-4 md:py-3 md:px-6 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center gap-2 hover:scale-105"
        style={{ direction: 'rtl' }}
      >
        <span className="text-xs md:text-base whitespace-nowrap">عطل في الشاشة؟ كلمنا</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" style={{ direction: 'rtl' }}>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900/50">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                طلب صيانة شاشة
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">رقم الهاتف (للتواصل)</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="010..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">ماركة الشاشة (اختياري)</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="مثال: LG, Samsung, Sony..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">وصف العطل</label>
                <textarea
                  name="description"
                  required
                  placeholder="مثال: الشاشة مكسورة، خطوط بالطول، لا تعمل..."
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الصيانة"}
              </button>
              
              <p className="text-xs text-center text-slate-500 mt-4">
                سيتم تحويلك إلى واتساب تلقائياً بعد الإرسال للتواصل المباشر معنا.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
