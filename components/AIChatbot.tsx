'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from './LanguageContext'

export default function AIChatbot() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [isOpen, setIsOpen] = useState(false)
  const [projectAwareness, setProjectAwareness] = useState(true)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [contextUsed, setContextUsed] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: isArabic
        ? 'مرحباً بك في النفير العقارية! أنا مستشارك العقاري الذكي. كيف يمكنني مساعدتك اليوم؟\n\n🏠 استكشاف الوحدات المتاحة\n📈 متابعة مبيعاتك (للملاك)\n🤝 حجز موعد معاينة\n🏢 معلومات عن مشاريعنا'
        : 'Welcome to EL-NAFEER Real Estate! I\'m your smart property consultant. How can I assist you today?\n\n🏠 Explore available units\n📈 Track your sales (for owners)\n🤝 Book a viewing appointment\n🏢 Information about our projects',
    },
  ])

  // Suggested questions
  const suggestedQuestions = isArabic
    ? [
      'ما هي العقارات المتاحة حالياً؟',
      'كيف يمكنني التسجيل كمالك عقار؟',
      'هل يمكنني معاينة وحدة سكنية؟',
      'ما هي العروض الحصرية المتاحة؟',
      'كيف يتم توثيق العقود؟',
      'ما هي خطوات الشراء الذكي؟',
    ]
    : [
      'What properties are currently available?',
      'How do I register as a property owner?',
      'Can I book a property viewing?',
      'What exclusive offers are available?',
      'How are contracts documented?',
      'What are the smart purchase steps?',
    ]
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize Session
  useEffect(() => {
    const storedSession = localStorage.getItem('naf_chat_session_id')
    if (storedSession) {
      setSessionId(storedSession)
    } else {
      const newId = `sess_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('naf_chat_session_id', newId)
      setSessionId(newId)
    }
  }, [])

  // Update welcome message when language changes
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([
        {
          role: 'assistant',
          content: isArabic
            ? 'مرحباً بك في النفير العقارية! أنا مستشارك العقاري الذكي. كيف يمكنني مساعدتك اليوم؟\n\n🏠 استكشاف الوحدات المتاحة\n📈 متابعة مبيعاتك (للملاك)\n🤝 حجز موعد معاينة\n🏢 معلومات عن مشاريعنا'
            : 'Welcome to EL-NAFEER Real Estate! I\'m your smart property consultant. How can I assist you today?\n\n🏠 Explore available units\n📈 Track your sales (for owners)\n🤝 Book a viewing appointment\n🏢 Information about our projects',
        },
      ])
      setShowSuggestions(true)
    }
  }, [isArabic, messages.length])

  const handleSuggestedQuestion = (question: string) => {
    if (loading || !question.trim()) return
    setShowSuggestions(false)
    handleSend(question)
  }

  useEffect(() => {
    if (!loading) {
      if (messages.length === 1) {
        setShowSuggestions(true)
      } else if (messages.length > 1) {
        const lastMessage = messages[messages.length - 1]
        if (lastMessage.role === 'assistant') {
          const timer = setTimeout(() => {
            setShowSuggestions(true)
          }, 500)
          return () => clearTimeout(timer)
        } else if (lastMessage.role === 'user') {
          setShowSuggestions(false)
        }
      }
    } else {
      setShowSuggestions(false)
    }
  }, [messages, loading])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (messageToSend?: string) => {
    const message = messageToSend || input.trim()
    if (!message || loading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: message }])
    setLoading(true)
    setContextUsed(false)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 12000) // Increased for RAG

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          sessionId,
          projectAwareness
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      if (data.success && data.response) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response },
        ])
        if (data.contextUsed) setContextUsed(true)
      } else {
        const errorMsg = isArabic
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.'
          : 'I apologize, but I encountered an error. Please try again later.'
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: errorMsg },
        ])
      }
    } catch (error: any) {
      // Handle sync issues
    } finally {
      setLoading(false)
    }
  }

  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-96 max-w-[calc(100vw-2rem)] h-[550px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col z-50 border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-black text-white p-5 flex justify-between items-center border-b border-white/10 uppercase italic">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                AI
              </div>
              <div>
                <h3 className="font-black text-sm tracking-tight text-white uppercase italic">
                  {isArabic ? 'مستشار النفير الذكي' : 'Al-Nafeer AI'}
                </h3>
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)] ${contextUsed ? 'bg-cyan-400' : 'bg-green-500'}`} />
                  <span className="text-[10px] text-cyan-500/60 uppercase font-black tracking-widest">
                    {contextUsed ? (isArabic ? 'وعي كامل مفعل' : 'Universal Context Loaded') : (isArabic ? 'متصل الآن' : 'Core Sync Active')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl transition-all ${showSettings ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-white/5 text-white/30 hover:bg-white/10'}`}
              >
                <span className="text-sm">⚙️</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
                aria-label={isArabic ? 'إغلاق' : 'Close'}
              >
                ✕
              </button>
            </div>
          </div>

          {showSettings && (
            <div className="bg-gray-900 p-4 border-b border-white/5 animate-in slide-in-from-top duration-300">
              <div className="flex items-center justify-between mb-4 px-1">
                <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">
                  {isArabic ? 'إعدادات الوعي الشامل' : 'Universal Settings'}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-black/40 p-3 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📂</span>
                    <div>
                      <p className="text-white text-xs font-bold">{isArabic ? 'الوعي بالمشروع' : 'Project Awareness'}</p>
                      <p className="text-white/40 text-[9px] uppercase tracking-tighter">{isArabic ? 'البحث الدلالي في الكود' : 'Semantic Search v1.0'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setProjectAwareness(!projectAwareness)}
                    className={`w-10 h-5 rounded-full transition-all relative ${projectAwareness ? 'bg-cyan-500' : 'bg-white/10'}`}
                    aria-label="Toggle Project Awareness"
                    title="Toggle Project Awareness"
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${projectAwareness ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50/50">
            {contextUsed && (
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-2 mb-2 text-center animate-in fade-in duration-500">
                <p className="text-[8px] text-cyan-600 font-black uppercase tracking-[0.2em]">
                  {isArabic ? 'تم تحميل سياق المشروع والمحادثات السابقة' : 'Codebase Context & History Loaded Success'}
                </p>
              </div>
            )}

            {messages.map((msg, idx) => {
              const isUserMsg = msg.role === 'user'
              const isRtl = /[\u0600-\u06FF]/.test(msg.content)
              return (
                <div
                  key={idx}
                  className={`flex ${isUserMsg ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[85%] rounded-[2rem] p-4 ${isUserMsg
                      ? 'bg-gray-900 text-white rounded-tr-none shadow-xl'
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-md'
                      }`}
                    dir={isRtl ? 'rtl' : 'ltr'}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words font-medium">
                      {msg.content}
                    </p>
                  </div>
                </div>
              )
            })}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-md">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}

            {showSuggestions && !loading && (
              <div className="space-y-2 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2 mb-3">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    {isArabic ? 'اقتراحات المستشار:' : 'Expert Suggestions:'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(question)}
                      disabled={loading}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-amber-500 hover:text-amber-600 transition-all text-sm font-bold text-gray-600 shadow-sm hover:shadow-md disabled:opacity-50"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={isArabic ? 'اكتب استفسارك هنا...' : 'Type your inquiry here...'}
                className="flex-1 bg-black/40 border-none rounded-2xl px-5 py-4 focus:ring-1 focus:ring-cyan-500/50 transition-all outline-none font-bold text-white placeholder:text-gray-600 italic"
                dir={isArabic ? 'rtl' : 'ltr'}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="bg-cyan-500 text-black w-14 h-14 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <span className="text-xl">⚡</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 group z-50 flex items-center gap-4"
        aria-label={isArabic ? 'فتح المستشار العقاري' : 'Open Property Consultant'}
      >
        {!isOpen && (
          <div className="hidden md:block bg-white px-6 py-3 rounded-2xl shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-right-4 duration-500">
            <p className="text-gray-900 font-black text-sm">
              {isArabic ? 'تحدث مع مستشارنا العقاري الذكي ✨' : 'Talk to our AI Consultant ✨'}
            </p>
          </div>
        )}
        <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all duration-500 shadow-2xl border-2 ${isOpen ? 'bg-gradient-to-br from-[#ff0055] to-[#a855f7] border-[#ff0055] rotate-180 shadow-[0_0_40px_rgba(255,0,85,0.6)]' : 'bg-gradient-to-br from-[#0a0e27] to-[#050811] border-[#00ffff] hover:scale-110 hover:-rotate-6 hover:shadow-[0_0_40px_rgba(0,255,255,0.8)] shadow-[0_0_30px_rgba(0,255,255,0.4)] animate-[pulse_2s_ease-in-out_infinite]'}`}>
          {isOpen ? (
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#00ffff]/30 animate-[spin_4s_linear_infinite]" />
              {/* Inner glow ring */}
              <div className="absolute inset-1 rounded-full border border-[#a855f7]/30 animate-[spin_6s_linear_infinite_reverse]" />
              {/* Chat bubble icon */}
              <svg className="w-10 h-10 relative z-10 text-[#00ffff] drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              {/* NAF Badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#00ffff] to-[#a855f7] rounded-lg flex items-center justify-center text-black text-[9px] font-black border-2 border-[#050811] shadow-[0_0_20px_rgba(0,255,255,0.6)] animate-bounce">
                NAF
              </div>
            </div>
          )}
        </div>
      </button>
    </>
  )
}
