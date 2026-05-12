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
      {/* CHAT WINDOW - floats freely via its own fixed positioning */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-36 right-6 w-[min(400px,calc(100vw-3rem))] h-[600px] bg-black/20 backdrop-blur-3xl rounded-[3rem] border border-sahara-gold/40 shadow-[0_0_100px_rgba(212,175,55,0.2)] flex flex-col overflow-hidden z-[100020]"
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

      {/* ROBOTIC SHINY ORB - floats freely with its own fixed positioning */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-12 right-6 z-[100025] transition-all duration-700 ${isOpen ? 'translate-y-32 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 hover:-translate-y-2'}`}
        aria-label="Open Property Consultant"
      >
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-xl border border-sahara-gold/50 shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] hover:border-white transition-all duration-500 overflow-hidden group">
          <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-sahara-gold/40 animate-[spin_10s_linear_infinite] group-hover:border-white/50" />
          <div className="absolute inset-2 rounded-full border border-sahara-gold/20 animate-[spin_6s_linear_infinite_reverse] group-hover:border-white/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.4)_0%,_rgba(0,0,0,0)_70%)] group-hover:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_0%,_rgba(0,0,0,0)_70%)] transition-colors duration-500" />
          <div className="absolute inset-0 rounded-full bg-sahara-gold/10 animate-ping" />
          <span className="text-3xl relative z-10 text-sahara-gold group-hover:text-white drop-shadow-[0_0_15px_#d4af37] group-hover:drop-shadow-[0_0_20px_#ffffff] transition-all duration-500 transform group-hover:scale-110">
            🏦
          </span>
        </div>
      </button>
    </>
  )
}

