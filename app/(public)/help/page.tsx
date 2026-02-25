'use client'

import { useState } from 'react'
import NavigationHeader from '@/components/NavigationHeader'

interface FAQItem {
  question: string
  questionAr: string
  answer: string
  answerAr: string
}

const faqs: FAQItem[] = [
  {
    question: 'How do I initiate the Elite Acquisition Protocol?',
    questionAr: 'كيف أبدأ بروتوكول الاستحواذ النخوبي؟',
    answer: 'Begin by: 1) Accessing the Acquisition Node, 2) Uploading biometric verification data (Official ID), 3) Elite Eligibility Sync, 4) Secure Access Token (Coupon) Generation.',
    answerAr: 'ابدأ بالآتي: 1) الوصول إلى عقدة الاستحواذ، 2) تحميل بيانات التحقق البيومترية (الهوية الرسمية)، 3) مزامنة الأهلية النخبوية، 4) توليد رمز وصول آمن (كوبون).',
  },
  {
    question: 'What identifies a successful Master Sync?',
    questionAr: 'ما الذي يحدد المزامنة الرئيسية الناجحة؟',
    answer: 'A successful Master Sync is encrypted via a unique 12-digit Secure Access Token and an immutable hash. This token is your required credential for physical node interaction.',
    answerAr: 'يتم تشفير المزامنة الرئيسية الناجحة عبر رمز وصول آمن مكون من 12 رقماً وهاش غير قابل للتغيير. هذا الرمز هو اعتمادك المطلوب للتفاعل المادي مع العقدة.',
  },
  {
    question: 'Are there financial overheads for registration?',
    questionAr: 'هل هناك تكاليف مالية للتسجيل؟',
    answer: 'Protocol overheads are currently waived under the v3.5_Elite framework. Registration sync is immediate and requires no initial capital injection at this stage.',
    answerAr: 'يتم حالياً التنازل عن رسوم البروتوكول بموجب إطار v3.5_Elite. مزامنة التسجيل فورية ولا تتطلب ضخ رأس مال أولي في هذه المرحلة.',
  },
  {
    question: 'What is the "Physical Site Synchronization"?',
    questionAr: 'ما هي "مزامنة الموقع المادي"؟',
    answer: 'Physical Site Synchronization is the terminal verification phase where your digital identity is matched with our orchestration masters at the asset coordinate for final acquisition.',
    answerAr: 'مزامنة الموقع المادي هي مرحلة التحقق النهائية حيث تتم مطابقة هويتك الرقمية مع أساتذة التنسيق لدينا في إحداثيات العقار للاستحواذ النهائي.',
  },
]

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-sahara-gold/30">
      <NavigationHeader />

      {/* Cyber Elite Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-sahara-gold/[0.02] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/[0.01] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto py-24 md:py-32 px-8 relative z-10">
        <header className="text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 milky-glass mb-10">
            <span className="w-2.5 h-2.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em] robotic-digits">ELITE_PROTOCOL_DOCS_v3.5_E</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 text-white leading-none">
            DOCUMENTATION_<span className="text-sahara-gold">NODE</span>
          </h1>
          <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.8em] robotic-digits">
            SYSTEM_INTEGRITY_SUPPORT // PROTOCOLS
          </p>
        </header>

        {/* FAQ Section */}
        <div className="milky-glass rounded-[4.5rem] border border-white/10 p-12 md:p-16 mb-16 relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/30 to-transparent scale-x-75" />
          <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-12 text-white flex items-center justify-center md:justify-start gap-6">
            <span className="text-sahara-gold bg-sahara-gold/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-sahara-gold/20 italic">?</span>
            FREQUENTLY_RESOLVED_PROTOCOLS
          </h2>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-700 ${openIndex === index ? 'bg-sahara-gold/[0.03] border-sahara-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.05)]' : 'hover:bg-white/[0.02]'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-10 py-10 text-left flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <h3 className={`font-black text-lg md:text-xl uppercase italic tracking-tighter transition-colors duration-500 ${openIndex === index ? 'text-sahara-gold' : 'text-white/80'}`}>{faq.question}</h3>
                    <p className="text-[11px] font-bold text-gray-600 mt-2 uppercase tracking-widest">{faq.questionAr}</p>
                  </div>
                  <span className={`text-4xl font-light transition-all duration-700 ${openIndex === index ? 'rotate-[225deg] text-sahara-gold' : 'text-white/10 group-hover:text-white/30'}`}>
                    +
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-10 pb-12 pt-4 animate-in fade-in slide-in-from-top-4 duration-700">
                    <p className="text-gray-400 text-lg md:text-xl font-bold leading-relaxed mb-6 uppercase tracking-tight">{faq.answer}</p>
                    <div className="p-8 md:p-10 rounded-[2rem] bg-black/40 border border-white/5">
                      <p className="text-gray-600 text-base md:text-lg italic font-bold leading-relaxed text-right md:text-left" dir="rtl">{faq.answerAr}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Grid Node */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 md:mb-32">
          <div className="milky-glass rounded-[3.5rem] p-12 hover:border-sahara-gold/40 transition-all duration-700 shadow-xl group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-8 group-hover:bg-sahara-gold group-hover:text-black transition-all">
              ✉️
            </div>
            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4 robotic-digits">MASTER_CONTACT_HUB</h3>
            <p className="text-xl font-black text-white italic truncate robotic-digits">sherifrosas.ai@gmail.com</p>
          </div>
          <div className="milky-glass rounded-[3.5rem] p-12 hover:border-sahara-gold/40 transition-all duration-700 shadow-xl group">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-8 group-hover:bg-sahara-gold group-hover:text-black transition-all">
              💬
            </div>
            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4 robotic-digits">INTEGRATED_AI_SYNC</h3>
            <p className="text-xl font-black text-sahara-gold italic robotic-digits uppercase">LIVE_ELITE_ASSISTANT</p>
          </div>
        </div>

        {/* Elite Footer Meta */}
        <footer className="text-center opacity-40 py-20 border-t border-white/5">
          <p className="text-[10px] font-black text-gray-700 uppercase tracking-[1.2em] robotic-digits">
            ZENITH_ELITE_v3.5_E // AUTHORIZED_BY: SHERIF_ROSAS & AHMED_ABDEL_SATTAR
          </p>
        </footer>
      </div>
    </div>
  )
}
