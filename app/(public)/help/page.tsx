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
    question: 'How do I start the Acquisition Protocol?',
    questionAr: 'كيف أبدأ بروتوكول الاستحواذ؟',
    answer: 'Initiate the process by: 1) Accessing the Acquisition Node (Form), 2) Uploading Verification Media (ID), 3) System Eligibility Sync, 4) Access Token (Coupon) Generation.',
    answerAr: 'ابدأ العملية عبر: 1) الوصول إلى عقدة الاستحواذ (النموذج)، 2) تحميل وسائط التحقق (الهوية)، 3) مزامنة أهلية النظام، 4) توليد رمز الوصول (الكوبون).',
  },
  {
    question: 'What identifies a successful Sync?',
    questionAr: 'ما الذي يحدد المزامنة الناجحة؟',
    answer: 'A successful synchronization is marked by the generation of a unique Access Token (Coupon Code) and an Encrypted Hash. This token is required for physical property access.',
    answerAr: 'تتميز المزامنة الناجحة بتوليد رمز وصول فريد (كود الكوبون) وهاش مشفر. هذا الرمز مطلوب للوصول الفعلي للعقار.',
  },
  {
    question: 'Is there a processing fee?',
    questionAr: 'هل هناك رسوم معالجة؟',
    answer: 'Processing fees are currently bypassed in the Zenit V3.3 core. Registration protocol is immediate and requires no financial overhead at this stage.',
    answerAr: 'يتم حالياً تجاوز رسوم المعالجة في نواة Zenith V3.3. بروتوكول التسجيل فوري ولا يتطلب تكاليف مالية في هذه المرحلة.',
  },
  {
    question: 'What is the "Physical Sync"?',
    questionAr: 'ما هي "المزامنة الجسدية"؟',
    answer: 'Physical synchronization is the final verification stage where the proprietary identity meets the AI orchestration team at the property coordinate for final acquisition sign-off.',
    answerAr: 'المزامنة الجسدية هي مرحلة التحقق النهائية حيث تلتقي الهوية المسجلة مع فريق أتمتة الذكاء الاصطناعي في إحداثيات العقار للتوقيع النهائي على الاستحواذ.',
  },
]

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30">
      <NavigationHeader />

      <div className="max-w-5xl mx-auto py-24 px-6 relative z-10">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]" />
            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.4em]">Protocol_Documentation_v1</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-4">
            Documentation Node
          </h1>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">
            System Support & Protocol Clarifications
          </p>
        </header>

        {/* FAQ Section */}
        <div className="bg-[#050505] rounded-[3rem] border border-white/5 p-12 mb-12 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-10 text-white flex items-center gap-4">
            <span className="text-cyan-500 text-3xl">❓</span> Frequently Resolved Protocols
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 ${openIndex === index ? 'bg-cyan-500/[0.03] border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)]' : 'hover:bg-white/[0.02]'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-10 py-8 text-left flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-black text-sm uppercase tracking-tight text-white/80">{faq.question}</h3>
                    <p className="text-[10px] font-bold text-cyan-500/40 mt-1 uppercase tracking-widest">{faq.questionAr}</p>
                  </div>
                  <span className={`text-2xl transition-transform duration-500 ${openIndex === index ? 'rotate-45 text-cyan-500' : 'text-white/10'}`}>
                    +
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-10 pb-10 pt-2 animate-fade-in">
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{faq.answer}</p>
                    <p className="text-gray-600 text-xs italic leading-relaxed" dir="rtl">{faq.answerAr}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#050505] rounded-[2.5rem] border border-white/5 p-10 hover:border-cyan-500/20 transition-all">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="text-xl">📧</span> Master_Contact_Node
            </h3>
            <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest mb-1">sherifrosas.ai@gmail.com</p>
            <p className="text-[9px] text-gray-600 uppercase tracking-widest">Platform Master Email</p>
          </div>
          <div className="bg-[#050505] rounded-[2.5rem] border border-white/5 p-10 hover:border-cyan-500/20 transition-all">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="text-xl">💬</span> Integrated_Chat_Sync
            </h3>
            <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest mb-1">Live AI Assistant</p>
            <p className="text-[9px] text-gray-600 uppercase tracking-widest">Available on all nodes</p>
          </div>
        </div>

        {/* Footer Meta */}
        <footer className="text-center opacity-30 mt-20">
          <p className="text-[8px] font-black text-gray-600 uppercase tracking-[1em]">SYSTEM_VERSION_ZENITH_3.3 // MASTER: SHERIF_ROSAS</p>
        </footer>
      </div>
    </div>
  )
}
