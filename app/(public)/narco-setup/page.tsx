"use client";

import React, { useState } from "react";
import { Flame, Send, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function NarcoSetupPage() {
  const [firewoodPrice, setFirewoodPrice] = useState("");
  const [charcoalPrice, setCharcoalPrice] = useState("");
  const [deliveryAreas, setDeliveryAreas] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the WhatsApp message with the answers
    const message = `مرحباً مهندس شريف،
هذه تفاصيل أسعار التجزئة (B2C) لتحديث منصة ناركو:

🔥 سعر كرتون الحطب (ووزنه):
${firewoodPrice}

🔥 سعر كرتون الفحم (ووزنه):
${charcoalPrice}

🚚 مناطق التوصيل المتاحة للأفراد:
${deliveryAreas}

شكراً لك.`;

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect to WhatsApp to send the message to El-Nafeer Tech (Sherif)
    window.location.href = `https://wa.me/201065661882?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6900] rounded-full blur-[120px] opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-lg bg-[#111] border border-[#333] rounded-3xl p-8 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-[#ff6900] mb-4">
            <Image src="/campaigns/narco/logo.jpg" alt="Narco Logo" fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffae00] to-[#ff3300] mb-2">
            تحديث أسعار التجزئة - منصة ناركو
          </h1>
          <p className="text-gray-400 text-sm">
            أهلاً بك أستاذ أحمد جاد. نرجو تعبئة البيانات التالية لنتمكن من تحويل المنصة فوراً إلى نظام بيع التجزئة (للأفراد والعائلات).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Firewood */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-200 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#ff6900]" />
              1. حطب السمر الإفريقي
            </label>
            <p className="text-xs text-gray-500 mb-1">كم سعر الكرتون؟ وكم وزنه التقريبي؟ (مثال: 45 ريال - كرتون 10 كيلو)</p>
            <input
              required
              type="text"
              value={firewoodPrice}
              onChange={(e) => setFirewoodPrice(e.target.value)}
              placeholder="اكتب الإجابة هنا..."
              className="w-full bg-black border border-[#333] focus:border-[#ff6900] rounded-xl px-4 py-3 text-white outline-none transition-all"
            />
          </div>

          {/* Charcoal */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-200 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#00d2ff]" />
              2. فحم الشواء الإفريقي
            </label>
            <p className="text-xs text-gray-500 mb-1">كم سعر الكرتون؟ وكم وزنه التقريبي؟ (مثال: 30 ريال - كرتون 5 كيلو)</p>
            <input
              required
              type="text"
              value={charcoalPrice}
              onChange={(e) => setCharcoalPrice(e.target.value)}
              placeholder="اكتب الإجابة هنا..."
              className="w-full bg-black border border-[#333] focus:border-[#00d2ff] rounded-xl px-4 py-3 text-white outline-none transition-all"
            />
          </div>

          {/* Delivery */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-200 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-green-500 rotate-180" />
              3. مناطق التوصيل
            </label>
            <p className="text-xs text-gray-500 mb-1">ما هي المدن أو المناطق التي يمكنكم توصيل كراتين الأفراد إليها؟</p>
            <input
              required
              type="text"
              value={deliveryAreas}
              onChange={(e) => setDeliveryAreas(e.target.value)}
              placeholder="مثال: الرياض فقط، أو كافة المناطق..."
              className="w-full bg-black border border-[#333] focus:border-green-500 rounded-xl px-4 py-3 text-white outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-gradient-to-r from-[#ff6900] to-[#ff3300] hover:shadow-[0_0_20px_rgba(255,105,0,0.4)] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span>إرسال البيانات لتحديث المنصة</span>
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
}
