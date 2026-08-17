"use client";

import React, { useState, useRef, useEffect } from "react";
import { Flame, Send, MessageCircle, X } from "lucide-react";

export default function NarcoChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [messages, setMessages] = useState([
    { role: "bot", text: "أهلاً بك في مؤسسة ناركو! كيف يمكنني مساعدتك اليوم؟" }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedInputs = [
    "بكم أكياس حطب السمر؟",
    "هل توصلون للبيوت؟",
    "أريد طلب الحطب الآن",
    "ما هي مناطق التوصيل؟"
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHasNewMessage(false);
  };

  const generateBotResponse = (userText: string): string => {
    const text = userText.trim();

    if (text.includes("حطب") || text.includes("سمر") || text.includes("سعر") || text.includes("بكم")) {
      return "أسعارنا الحالية لحطب السمر الإفريقي: كيس 10 كجم بـ 32 ريال، وكيس 5 كجم بـ 18 ريال. للطلب يرجى التواصل مع المبيعات عبر زر الواتساب أدناه.";
    }

    if (text.includes("توصيل") || text.includes("مناطق") || text.includes("بيت")) {
      return "نوفر خدمة توصيل سريعة ومريحة لجميع مناطق المملكة. يصلك الحطب لغاية باب بيتك أو مخيمك.";
    }

    return "شكراً لتواصلك معنا. لإتمام طلبك أو لأي استفسارات أخرى، نرجو الضغط على زر الواتساب بالأسفل للتحدث مع المبيعات مباشرة.";
  };

  const handleSend = (textParam?: string) => {
    const textToSend = typeof textParam === "string" ? textParam : input;
    if (!textToSend.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: "user", text: textToSend }];
    setMessages(newMessages);
    if (typeof textParam !== "string") setInput("");

    // Simulate smart bot response
    setTimeout(() => {
      const botReply = generateBotResponse(textToSend);
      setMessages([...newMessages, { role: "bot", text: botReply }]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* ===== CHAT WINDOW ===== */}
      <div
        className={`fixed bottom-24 right-6 z-[9940] w-[calc(100vw-3rem)] max-w-[360px] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[#333] flex flex-col bg-[#0a0a0a] transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ff6900] to-[#ff3300] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">مساعد ناركو الذكي</h3>
              <p className="text-[10px] text-white/80">متصل الآن</p>
            </div>
          </div>
          <button onClick={handleToggle} className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 h-[60vh] max-h-[320px] overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-[#ff6900] to-[#ff3300] text-white rounded-tr-sm' 
                  : 'bg-[#1a1a1a] text-gray-200 border border-[#333] rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mt-2 justify-start" dir="rtl">
              {suggestedInputs.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="bg-white/5 border border-white/10 hover:bg-[#ff6900]/20 hover:border-[#ff6900]/30 hover:text-[#ff6900] text-gray-300 text-xs px-3 py-2 rounded-xl transition-all duration-300"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#111] border-t border-[#333]">
          <div className="flex items-center gap-2 mb-2" dir="rtl">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب سؤالك هنا..."
              className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#ff6900]/40 focus:ring-1 focus:ring-[#ff6900]/20 transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-gradient-to-l from-[#ff6900] to-[#ff3300] flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(255,105,0,0.3)] transition-all disabled:opacity-30 disabled:shadow-none disabled:cursor-not-allowed flex-shrink-0"
              aria-label="إرسال"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <a
            href="https://wa.me/966559715915?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B7%D9%84%D8%A8%20%D8%AD%D8%B7%D8%A8%20%D9%85%D9%86%20%D9%86%D8%A7%D8%B1%D9%83%D9%88"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/20 transition-all"
          >
            <MessageCircle className="w-3 h-3" />
            <span>التواصل المباشر لطلب الحطب</span>
          </a>
        </div>
      </div>

      {/* ===== FLOATING BUTTON ===== */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-6 right-6 z-[9941] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "opacity-0 scale-0 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #ff6900 0%, #ff3300 100%)",
          boxShadow: "0 4px 25px rgba(255, 105, 0, 0.4)",
        }}
        aria-label="فتح المحادثة"
      >
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{
            background: "linear-gradient(135deg, #ff6900, #ff3300)",
            animationDuration: "2.5s",
          }}
        />

        <Flame className="w-6 h-6 text-white relative z-10" />

        {hasNewMessage && !isOpen && (
          <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#0a0a0a] z-20">
            1
          </span>
        )}
      </button>
    </>
  );
}
