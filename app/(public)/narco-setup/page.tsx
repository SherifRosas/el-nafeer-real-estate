"use client";

import React, { useState } from "react";
import { Flame, Send, ArrowRight, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface ProductInput {
  name: string;
  price: string;
  weight: string;
}

export default function NarcoSetupPage() {
  const [firewoodItems, setFirewoodItems] = useState<ProductInput[]>([
    { name: "حطب سمر أفريقي", price: "", weight: "" }
  ]);
  const [charcoalItems, setCharcoalItems] = useState<ProductInput[]>([
    { name: "فحم شواء أفريقي", price: "", weight: "" }
  ]);
  const [deliveryAreas, setDeliveryAreas] = useState("");

  const handleAddFirewood = () => {
    setFirewoodItems([...firewoodItems, { name: "نوع حطب آخر...", price: "", weight: "" }]);
  };

  const handleRemoveFirewood = (index: number) => {
    const newItems = [...firewoodItems];
    newItems.splice(index, 1);
    setFirewoodItems(newItems);
  };

  const handleAddCharcoal = () => {
    setCharcoalItems([...charcoalItems, { name: "نوع فحم آخر...", price: "", weight: "" }]);
  };

  const handleRemoveCharcoal = (index: number) => {
    const newItems = [...charcoalItems];
    newItems.splice(index, 1);
    setCharcoalItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let fwText = firewoodItems.map((item, i) => `- ${item.name}: ${item.price} ريال (وزن ${item.weight})`).join("\n");
    let chText = charcoalItems.map((item, i) => `- ${item.name}: ${item.price} ريال (وزن ${item.weight})`).join("\n");

    const message = `مرحباً مهندس شريف،
هذه تفاصيل المنتجات والأسعار لتحديث منصة ناركو:

🔥 منتجات الحطب:
${fwText}

🔥 منتجات الفحم:
${chText}

🚚 مناطق التوصيل المتاحة:
${deliveryAreas}

شكراً لك.`;

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/201065661882?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col items-center py-12 px-4 relative overflow-x-hidden" dir="rtl">
      {/* Background glow */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#ff6900] rounded-full blur-[120px] opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-2xl bg-[#111] border border-[#333] rounded-3xl p-6 md:p-10 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-[#ff6900] mb-4">
            <Image src="/campaigns/narco/logo.jpg" alt="Narco Logo" fill className="object-cover" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffae00] to-[#ff3300] mb-2">
            تحديث منتجات التجزئة - منصة ناركو
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            أهلاً بك أستاذ أحمد جاد. يمكنك هنا إضافة جميع أنواع وأوزان الحطب والفحم المتوفرة لديكم، بالإضافة لتحديد مناطق التوصيل.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          
          {/* Firewood Section */}
          <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <label className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-[#ff6900]" />
                1. منتجات الحطب
              </label>
              <button type="button" onClick={handleAddFirewood} className="text-xs bg-[#ff6900]/20 hover:bg-[#ff6900]/40 text-[#ff6900] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all">
                <Plus className="w-3 h-3" />
                إضافة حطب آخر
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {firewoodItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-black p-4 rounded-xl border border-[#333] relative">
                  <div className="col-span-12 md:col-span-4">
                    <p className="text-xs text-gray-500 mb-1">الاسم/النوع</p>
                    <input required type="text" value={item.name} onChange={(e) => { const newItems = [...firewoodItems]; newItems[idx].name = e.target.value; setFirewoodItems(newItems); }} placeholder="حطب سمر أفريقي" className="w-full bg-transparent border-b border-[#333] focus:border-[#ff6900] py-2 text-white outline-none" />
                  </div>
                  <div className="col-span-6 md:col-span-4">
                    <p className="text-xs text-gray-500 mb-1">سعر الكرتون (ريال)</p>
                    <input required type="number" value={item.price} onChange={(e) => { const newItems = [...firewoodItems]; newItems[idx].price = e.target.value; setFirewoodItems(newItems); }} placeholder="45" className="w-full bg-transparent border-b border-[#333] focus:border-[#ff6900] py-2 text-white outline-none" />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <p className="text-xs text-gray-500 mb-1">الوزن التقريبي</p>
                    <input required type="text" value={item.weight} onChange={(e) => { const newItems = [...firewoodItems]; newItems[idx].weight = e.target.value; setFirewoodItems(newItems); }} placeholder="10 كجم" className="w-full bg-transparent border-b border-[#333] focus:border-[#ff6900] py-2 text-white outline-none" />
                  </div>
                  {firewoodItems.length > 1 && (
                    <div className="col-span-12 md:col-span-1 flex items-end justify-end mt-2 md:mt-0">
                      <button type="button" onClick={() => handleRemoveFirewood(idx)} className="text-red-500 hover:text-red-400 p-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Charcoal Section */}
          <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <label className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-[#00d2ff]" />
                2. منتجات الفحم
              </label>
              <button type="button" onClick={handleAddCharcoal} className="text-xs bg-[#00d2ff]/20 hover:bg-[#00d2ff]/40 text-[#00d2ff] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all">
                <Plus className="w-3 h-3" />
                إضافة فحم آخر
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {charcoalItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-black p-4 rounded-xl border border-[#333] relative">
                  <div className="col-span-12 md:col-span-4">
                    <p className="text-xs text-gray-500 mb-1">الاسم/النوع</p>
                    <input required type="text" value={item.name} onChange={(e) => { const newItems = [...charcoalItems]; newItems[idx].name = e.target.value; setCharcoalItems(newItems); }} placeholder="فحم شواء أفريقي" className="w-full bg-transparent border-b border-[#333] focus:border-[#00d2ff] py-2 text-white outline-none" />
                  </div>
                  <div className="col-span-6 md:col-span-4">
                    <p className="text-xs text-gray-500 mb-1">سعر الكرتون (ريال)</p>
                    <input required type="number" value={item.price} onChange={(e) => { const newItems = [...charcoalItems]; newItems[idx].price = e.target.value; setCharcoalItems(newItems); }} placeholder="30" className="w-full bg-transparent border-b border-[#333] focus:border-[#00d2ff] py-2 text-white outline-none" />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <p className="text-xs text-gray-500 mb-1">الوزن التقريبي</p>
                    <input required type="text" value={item.weight} onChange={(e) => { const newItems = [...charcoalItems]; newItems[idx].weight = e.target.value; setCharcoalItems(newItems); }} placeholder="5 كجم" className="w-full bg-transparent border-b border-[#333] focus:border-[#00d2ff] py-2 text-white outline-none" />
                  </div>
                  {charcoalItems.length > 1 && (
                    <div className="col-span-12 md:col-span-1 flex items-end justify-end mt-2 md:mt-0">
                      <button type="button" onClick={() => handleRemoveCharcoal(idx)} className="text-red-500 hover:text-red-400 p-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Section */}
          <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
            <label className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <ArrowRight className="w-6 h-6 text-green-500 rotate-180" />
              3. مناطق التوصيل
            </label>
            <p className="text-sm text-gray-400 mb-3">ما هي المدن أو المناطق التي يتم تغطيتها لتوصيل طلبات الأفراد؟</p>
            <textarea
              required
              rows={3}
              value={deliveryAreas}
              onChange={(e) => setDeliveryAreas(e.target.value)}
              placeholder="مثال: التوصيل متاح داخل مدينة الرياض فقط..."
              className="w-full bg-black border border-[#333] focus:border-green-500 rounded-xl px-4 py-3 text-white outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff6900] to-[#ff3300] hover:shadow-[0_0_20px_rgba(255,105,0,0.4)] text-white font-bold text-lg py-5 rounded-2xl transition-all flex items-center justify-center gap-3 mt-4"
          >
            <span>إرسال البيانات لتحديث المنصة</span>
            <Send className="w-6 h-6 rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
}
