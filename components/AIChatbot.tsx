'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { Zap } from 'lucide-react'

interface AIChatbotProps {
  vertical?: 'real-estate' | 'elevator'
  initialOpen?: boolean
  referralContext?: string
}

export default function AIChatbot({ vertical = 'real-estate', initialOpen = false, referralContext = 'direct' }: AIChatbotProps) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [projectAwareness, setProjectAwareness] = useState(true)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [contextUsed, setContextUsed] = useState(false)
  const [askedForPhone, setAskedForPhone] = useState(false)
  const [hasClaimedOffer, setHasClaimedOffer] = useState(false)

  // Listen for offer claims
  useEffect(() => {
    const checkOffer = () => {
      if (localStorage.getItem('LEVER_OFFER_CLAIMED') === 'true') {
        setHasClaimedOffer(true)
      }
    }
    const interval = setInterval(checkOffer, 1000)
    return () => clearInterval(interval)
  }, [])

  // Vertical-specific content
  const getWelcomeMessage = () => {
    if (vertical === 'elevator') {
      if (hasClaimedOffer) {
        return isArabic
          ? 'تهانينا! 🎉 تم تفعيل خصم الـ 15% الخاص بك. من فضلك زودني برقم هاتفك لحجز الخصم وإرسال المقايسة الفنية فوراً.'
          : 'Congratulations! 🎉 Your 15% discount has been activated. Please provide your phone number to reserve the discount and receive your technical quote immediately.'
      }

      // CONTEXTUAL GREETING LOGIC
      if (referralContext === 'fb_engine_elite' || referralContext === 'fb_organic_day1') {
        return isArabic 
          ? 'مرحباً بك! لقد لاحظت اهتمامك بالمحركات الإيطالية المتخصصة لـ 7 أدوار. 🇮🇹⚙️ أنا مستشارك الفني، كيف يمكنني مساعدتك في تفاصيل المقايسة؟'
          : 'Welcome! I noticed your interest in our 7-floor specialized Italian motors. 🇮🇹⚙️ I am your technical consultant, how can I assist you with the quote details?';
      }
      
      if (referralContext === 'fb_panorama_elite' || referralContext === 'fb_organic_day2') {
        return isArabic
          ? 'أهلاً بك في عالم الفخامة! 💎 هل تود معرفة تفاصيل تركيب مصاعد البانوراما الخارجية لمشروعك؟'
          : 'Welcome to the world of luxury! 💎 Would you like to know the details of installing external panorama elevators for your project?';
      }

      return isArabic
        ? 'مرحباً بك في لـيفر الرائدة للمصاعد! 🇮🇹✨\nأنا مستشارك الفني الذكي. هل تبحث عن مقايسة فنية لمبنى جديد أم صيانة دورية؟\n\n(يرجى تزويدي برقم هاتفك لنتمكن من إرسال عرض السعر الفني إليك فوراً)'
        : 'Welcome to Lever Pioneer Elevators! 🇮🇹✨\nI am your Technical Consultant. Are you looking for a new installation quote or regular maintenance?\n\n(Please provide your phone number so we can send the technical quote to you immediately)'
    }
    return isArabic
      ? 'مرحباً بك في النفير العقارية! أنا مستشارك العقاري الذكي. كيف يمكنني مساعدتك اليوم؟\n\n🏠 استكشاف الوحدات المتاحة\n📈 متابعة مبيعاتك (للملاك)\n🤝 حجز موعد معاينة\n🏢 معلومات عن مشاريعنا'
      : 'Welcome to EL-NAFEER Real Estate! I\'m your smart property consultant. How can I assist you today?\n\n🏠 Explore available units\n📈 Track your sales (for owners)\n🤝 Book a viewing appointment\n🏢 Information about our projects'
  }

  // --- IRONCLAD SENTINEL INITIALIZATION ---
  const hasGreetedRef = useRef(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // --- BILINGUAL SENTINEL INITIALIZATION ---
  // Initialize and Sync Welcome Message with Real-time Language Switching
  useEffect(() => {
    const welcome = getWelcomeMessage()
    
    // If it's the very first greeting
    if (!hasGreetedRef.current && messages.length === 0) {
      setMessages([{ role: 'assistant', content: welcome }])
      hasGreetedRef.current = true
      const timer = setTimeout(() => setShowSuggestions(true), 800)
      return () => clearTimeout(timer)
    } 
    
    // If the user hasn't typed anything yet but switched languages, update the greeting
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: welcome }])
    }
  }, [language, vertical, referralContext]) // Removed hasGreetedRef check here to allow bilingual updates

  // Ensure initialOpen works on mount
  useEffect(() => {
    if (initialOpen) setIsOpen(true)
  }, [initialOpen])

  // Initialize Session Identity
  useEffect(() => {
    const storedSession = localStorage.getItem('naf_chat_session_id')
    if (storedSession) {
      setSessionId(storedSession)
    } else {
      const newId = `sess_${Math.random().toString(36).substring(2, 9)}`
      localStorage.setItem('naf_chat_session_id', newId)
      setSessionId(newId)
    }
  }, [])

  // Suggested questions based on vertical
  const getSuggestedQuestions = () => {
    if (vertical === 'elevator') {
      return isArabic
        ? ['طلب عرض سعر فني', 'مواصفات المحركات الإيطالية', 'عقود صيانة معتمدة', 'تركيب مصعد خارجي (بانوراما)', 'معاينة فنية للموقع', 'مميزات ليفر الرائدة']
        : ['Request a technical quote', 'Italian motor specifications', 'Certified maintenance contracts', 'External elevator (Panorama)', 'Technical site inspection', 'Lever Pioneer advantages']
    }
    return isArabic
      ? ['ما هي العقارات المتاحة حالياً؟', 'كيف يمكنني التسجيل كمالك عقار؟', 'هل يمكنني معاينة وحدة سكنية؟', 'ما هي العروض الحصرية المتاحة؟', 'كيف يتم توثيق العقود؟', 'ما هي خطوات الشراء الذكي؟']
      : ['What properties are currently available?', 'How do I register as a property owner?', 'Can I book a property viewing?', 'What exclusive offers are available?', 'How are contracts documented?', 'What are the smart purchase steps?']
  }

  const suggestedQuestions = getSuggestedQuestions()

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

    // Handle Phone Number Capture (Lead Generation)
    const phoneRegex = /(\d{10,14})|(\+?\d{1,3}[\s-]?\d{10,12})/
    if (!askedForPhone && phoneRegex.test(message)) {
      setAskedForPhone(true)
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'AI Chat Lead',
          phone: message.match(phoneRegex)?.[0] || 'Unknown',
          notes: `ORGANIC_CHAT_LEAD [Vertical: ${vertical}]`,
          status: 'new'
        })
      }).catch(err => console.error("Lead Capture Error:", err))
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 12000)

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          sessionId,
          projectAwareness,
          vertical // Pass vertical context to backend
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      if (data.success && data.response) {
        let assistantContent = data.response

        // Inject phone request if not yet captured in elevator vertical
        if (vertical === 'elevator' && !askedForPhone && messages.length > 1) {
          const phonePrompt = isArabic
            ? '\n\n(يرجى تزويدي برقم هاتفك ليرسل لك أحد مهندسينا المقايسة الفنية الكاملة)'
            : '\n\n(Please provide your phone number so one of our engineers can send you the full technical quote)'
          assistantContent += phonePrompt
        }

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: assistantContent },
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
      // Silent error handler
    } finally {
      setLoading(false)
    }
  }

  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      {/* STEALTH-LUXE COMPACT WINDOW - MINIMIZED TO PROTECT AD BRANDING */}
      <div className={`fixed bottom-[115px] right-4 w-[310px] max-w-[calc(100vw-2rem)] h-[360px] bg-black/50 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] flex flex-col z-[100020] border border-white/5 overflow-hidden transition-all duration-500 transform ${isOpen ? 'scale-100 opacity-100 translate-y-0 translate-x-0' : 'scale-90 opacity-0 pointer-events-none translate-y-20 translate-x-10'}`}>
        <div className="bg-gradient-to-r from-black/80 to-cyan-950/30 text-white px-5 py-3 flex justify-between items-center border-b border-white/5 uppercase italic">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(6,182,212,0.3)] flex-shrink-0 text-[10px]">
              AI
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-[9px] tracking-widest text-white uppercase truncate opacity-90">
                {isArabic ? (vertical === 'elevator' ? 'مستشار ليفر' : 'مستشار النفير') : (vertical === 'elevator' ? 'PIONEER AI' : 'NAFEER AI')}
              </h3>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[8px] text-cyan-500/60 uppercase font-bold tracking-tighter">
                  CORE_ONLINE
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1.5 rounded-lg transition-all ${showSettings ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'text-white/20 hover:bg-white/5'}`}
            >
              <span className="text-xs">⚙️</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/30 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
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

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {contextUsed && (
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-2 mb-2 text-center animate-in fade-in duration-500">
              <p className="text-[8px] text-cyan-400 font-black uppercase tracking-[0.2em]">
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
                    ? 'bg-cyan-500/20 text-white rounded-tr-none border border-cyan-500/30'
                    : 'bg-white/5 text-gray-100 rounded-tl-none border border-white/10 backdrop-blur-md'
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
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-cyan-500 hover:text-cyan-400 transition-all text-sm font-bold text-gray-400 shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] disabled:opacity-50"
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
        <div className="p-5 bg-black/40 border-t border-white/5">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
              placeholder={isArabic ? 'اكتب استفسارك هنا...' : 'Type your inquiry...'}
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white placeholder-gray-500 transition-all"
              disabled={loading}
              dir={isArabic ? 'rtl' : 'ltr'}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center text-black hover:bg-cyan-400 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <span className="text-xl">⚡</span>
            </button>
          </div>
        </div>
      </div>

      {/* STABILIZED FAB - POSITIONED AWAY FROM BOTTOM ACTION BAR ICONS */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-32 right-6 group z-[100025] flex items-center gap-4 transition-all duration-500 ${isOpen ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
        aria-label={isArabic ? 'فتح المستشار العقاري' : 'Open Property Consultant'}
      >
        {!isOpen && (
          <div className="hidden md:block bg-black/90 backdrop-blur-3xl px-5 py-2 rounded-full shadow-2xl border border-cyan-500/40 animate-in fade-in slide-in-from-right-4 duration-500">
            <p className="text-cyan-400 font-black text-[9px] uppercase tracking-[0.2em] italic flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              {isArabic ? (vertical === 'elevator' ? 'استشارة ليفر الرائدة ✨' : 'استشارة النفير الذكية ✨') : 'QUANTUM_AI_INITIATE ✨'}
            </p>
          </div>
        )}
        <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl border-2 bg-black border-cyan-500/40 hover:border-cyan-500 hover:scale-110 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            <div className="absolute inset-0 rounded-full border border-sahara-gold/10 animate-[spin_8s_linear_infinite]" />
            {vertical === 'elevator' ? (
              <Zap className="w-8 h-8 relative z-10 text-sahara-gold drop-shadow-[0_0_15px_#c5a059]" />
            ) : (
              <svg className="w-8 h-8 relative z-10 text-sahara-gold drop-shadow-[0_0_15px_#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            )}
            <div className="absolute inset-0 rounded-full bg-sahara-gold/5 animate-ping" />
          </div>
        </div>
      </button>
    </>
  )
}
