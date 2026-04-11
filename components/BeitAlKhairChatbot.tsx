'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { neuralAudio } from '@/lib/neural-audio'

export default function BeitAlKhairChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'مرحباً بك في بيت الخير. أنا مستشارك المالي الذكي. كيف يمكنني مساعدتك اليوم في التخطيط لامتلاك وحدتك العقارية؟\n\n- استعلام عن الأسعار\n- حساب خطط التقسيط (على 3 سنوات)\n- معلومات عن القصر 18 و 19 و 21'
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text?: string) => {
    const message = text || input.trim()
    if (!message || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: message }])
    setLoading(true)
    neuralAudio.playNodeSync()

    try {
      const response = await fetch('/api/ai/beit-alkhair/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId: 'beit-alkhair-luxe' }),
      })

      const data = await response.json()
      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
        neuralAudio.playStatusPulse()
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'NEURAL_SYNC_ERROR: RECONNECTING...' }])
    } finally {
      setLoading(false)
    }
  }

  const suggestions = [
    'كيف يتم حساب التقسيط؟',
    'ما هو مقدم الحجز المطلوب؟',
    'سعر المتر في القصر 21؟',
    'طرق الدفع المتاحة؟'
  ]

  return (
    <>
      <div className="fixed bottom-12 right-12 z-[100]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-24 right-0 w-[400px] h-[600px] bg-[#020202] rounded-[3rem] border border-sahara-gold/40 shadow-[0_0_100px_rgba(212,175,55,0.2)] flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-8 border-b border-white/10 bg-gradient-to-r from-sahara-gold/10 to-transparent flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 bg-sahara-gold rounded-full animate-pulse" />
                    <span className="text-[8px] font-black text-sahara-gold uppercase tracking-[0.5em]">FINANCIAL_AI_ORCHESTRATOR</span>
                  </div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">BEIT_AL_KHAIR Assistant</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">✕</button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-sahara-gold text-black font-bold rounded-tr-none' 
                        : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-none font-medium'
                    }`}>
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </div>
                ))}
                {loading && <div className="text-[10px] font-black text-sahara-gold animate-pulse tracking-widest">CALCULATING_AMORTIZATION...</div>}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {!loading && messages.length === 1 && (
                <div className="px-8 flex flex-wrap gap-2 mb-4">
                  {suggestions.map(s => (
                    <button key={s} onClick={() => handleSend(s)} className="px-4 py-2 rounded-full border border-sahara-gold/20 text-[10px] font-bold text-gray-400 hover:bg-sahara-gold/10 hover:text-sahara-gold transition-all">
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Input */}
              <div className="p-8 border-t border-white/10">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    placeholder="TYPE_INPUT_SIGNAL..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xs outline-none focus:border-sahara-gold/40 transition-all font-bold placeholder:text-gray-700 italic"
                  />
                  <button onClick={() => handleSend()} className="absolute right-3 w-10 h-10 bg-sahara-gold text-black rounded-xl font-black hover:scale-110 active:scale-95 transition-all flex items-center justify-center">⚡</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-20 h-20 rounded-[2rem] border-2 shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-500 overflow-hidden ${
            isOpen ? 'bg-red-500 border-red-500 rotate-45 shadow-[0_0_40px_rgba(239,68,68,0.5)]' : 'bg-[#020202] border-sahara-gold/40 shadow-[0_0_40px_rgba(197,160,89,0.3)]'
          }`}
        >
          {isOpen ? (
            <span className="text-white text-2xl -rotate-45">✕</span>
          ) : (
            <div className="relative flex flex-col items-center">
                <span className="text-sahara-gold text-2xl mb-1">🏦</span>
                <span className="text-[6px] font-bold text-sahara-gold tracking-widest leading-none">AI_CONSULT</span>
            </div>
          )}
        </motion.button>
      </div>
    </>
  )
}
