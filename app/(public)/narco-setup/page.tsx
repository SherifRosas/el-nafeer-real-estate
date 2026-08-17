"use client";

import React, { useState } from "react";
import { Flame, Send, ArrowRight, Plus, Trash2, Wrench } from "lucide-react";
import Image from "next/image";

interface ProductInput {
  name: string;
  price: string;
  wholesalePrice: string;
  moq: string;
  weight: string;
  stockStatus: string;
  imageLink: string;
}

const defaultItem: ProductInput = {
  name: "",
  price: "",
  wholesalePrice: "",
  moq: "",
  weight: "",
  stockStatus: "متوفر",
  imageLink: ""
};

export default function NarcoSetupPage() {
  const [firewoodItems, setFirewoodItems] = useState<ProductInput[]>([{ ...defaultItem, name: "حطب سمر أفريقي" }]);
  const [charcoalItems, setCharcoalItems] = useState<ProductInput[]>([{ ...defaultItem, name: "فحم شواء أفريقي" }]);
  const [accessoriesItems, setAccessoriesItems] = useState<ProductInput[]>([{ ...defaultItem, name: "مشعل فحم / شواية" }]);
  const [deliveryAreas, setDeliveryAreas] = useState("");

  const handleAddItem = (setter: React.Dispatch<React.SetStateAction<ProductInput[]>>, items: ProductInput[], defaultName: string) => {
    setter([...items, { ...defaultItem, name: defaultName }]);
  };

  const handleRemoveItem = (setter: React.Dispatch<React.SetStateAction<ProductInput[]>>, items: ProductInput[], index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setter(newItems);
  };

  const updateItem = (setter: React.Dispatch<React.SetStateAction<ProductInput[]>>, items: ProductInput[], index: number, field: keyof ProductInput, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setter(newItems);
  };

  const formatSection = (title: string, items: ProductInput[]) => {
    if (items.length === 0 || (items.length === 1 && !items[0].name)) return "";
    let text = `${title}\n`;
    items.forEach(item => {
      text += `- ${item.name || "بدون اسم"}:\n`;
      text += `  التجزئة: ${item.price || "0"} ريال | الجملة: ${item.wholesalePrice || "0"} ريال (الحد الأدنى: ${item.moq || "غير محدد"})\n`;
      if (item.weight) text += `  الوزن: ${item.weight}\n`;
      text += `  الحالة: ${item.stockStatus === "متوفر" ? "متوفر 🟢" : "غير متوفر 🔴"}\n`;
      if (item.imageLink) text += `  رابط الصورة: ${item.imageLink}\n`;
      text += "\n";
    });
    return text;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let fwText = formatSection("🔥 منتجات الحطب:", firewoodItems);
    let chText = formatSection("🔥 منتجات الفحم:", charcoalItems);
    let accText = formatSection("🛠️ مستلزمات الشواء والتدفئة:", accessoriesItems);

    const message = `مرحباً مهندس شريف،
هذه تفاصيل المنتجات والأسعار لتحديث منصة ناركو:

${fwText}${chText}${accText}🚚 مناطق التوصيل المتاحة:
${deliveryAreas}

⚠️ ملاحظة: سأقوم بإرفاق صور المنتجات في المحادثة الآن.
شكراً لك.`;

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/201065661882?text=${encodedMessage}`;
  };

  const renderGrid = (items: ProductInput[], setter: React.Dispatch<React.SetStateAction<ProductInput[]>>, focusClass: string) => {
    return items.map((item, idx) => (
      <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-black p-5 rounded-xl border border-[#333] relative">
        <div className="col-span-12 md:col-span-4">
          <p className="text-xs text-gray-500 mb-1">الاسم/النوع</p>
          <input required type="text" value={item.name} onChange={(e) => updateItem(setter, items, idx, "name", e.target.value)} placeholder="اسم المنتج" className={`w-full bg-transparent border-b border-[#333] ${focusClass} py-2 text-white outline-none transition-colors`} />
        </div>
        <div className="col-span-6 md:col-span-2">
          <p className="text-xs text-gray-500 mb-1">سعر التجزئة (ريال)</p>
          <input required type="number" value={item.price} onChange={(e) => updateItem(setter, items, idx, "price", e.target.value)} placeholder="45" className={`w-full bg-transparent border-b border-[#333] ${focusClass} py-2 text-white outline-none transition-colors`} />
        </div>
        <div className="col-span-6 md:col-span-2">
          <p className="text-xs text-gray-500 mb-1">سعر الجملة (ريال)</p>
          <input type="number" value={item.wholesalePrice} onChange={(e) => updateItem(setter, items, idx, "wholesalePrice", e.target.value)} placeholder="35" className={`w-full bg-transparent border-b border-[#333] ${focusClass} py-2 text-white outline-none transition-colors`} />
        </div>
        <div className="col-span-6 md:col-span-2">
          <p className="text-xs text-gray-500 mb-1">الحد الأدنى للجملة</p>
          <input type="text" value={item.moq} onChange={(e) => updateItem(setter, items, idx, "moq", e.target.value)} placeholder="50 كرتون" className={`w-full bg-transparent border-b border-[#333] ${focusClass} py-2 text-white outline-none transition-colors`} />
        </div>
        <div className="col-span-6 md:col-span-2">
          <p className="text-xs text-gray-500 mb-1">الوزن التقريبي</p>
          <input type="text" value={item.weight} onChange={(e) => updateItem(setter, items, idx, "weight", e.target.value)} placeholder="10 كجم" className={`w-full bg-transparent border-b border-[#333] ${focusClass} py-2 text-white outline-none transition-colors`} />
        </div>
        
        {/* Row 2 */}
        <div className="col-span-12 md:col-span-5">
          <p className="text-xs text-gray-500 mb-1">رابط الصورة (اختياري)</p>
          <input type="url" value={item.imageLink} onChange={(e) => updateItem(setter, items, idx, "imageLink", e.target.value)} placeholder="https://..." className={`w-full bg-transparent border-b border-[#333] ${focusClass} py-2 text-white outline-none text-left transition-colors`} dir="ltr" />
        </div>
        <div className="col-span-12 md:col-span-3">
          <p className="text-xs text-gray-500 mb-1">حالة التوفر</p>
          <select value={item.stockStatus} onChange={(e) => updateItem(setter, items, idx, "stockStatus", e.target.value)} className={`w-full bg-black border-b border-[#333] ${focusClass} py-2 text-white outline-none transition-colors`}>
            <option value="متوفر">متوفر 🟢</option>
            <option value="غير متوفر">غير متوفر 🔴</option>
          </select>
        </div>

        {items.length > 1 ? (
          <div className="col-span-12 md:col-span-4 flex items-end justify-end mt-2 md:mt-0">
            <button type="button" onClick={() => handleRemoveItem(setter, items, idx)} className="text-red-500 hover:bg-red-500/10 p-2 border border-red-500/20 rounded-lg flex items-center gap-2 transition-all">
              <Trash2 className="w-4 h-4" /> إزالة المنتج
            </button>
          </div>
        ) : (
          <div className="col-span-12 md:col-span-4 flex items-end justify-end mt-2 md:mt-0 opacity-0 pointer-events-none">
            <button className="p-2"><Trash2 className="w-4 h-4" /></button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col items-center py-12 px-4 relative overflow-x-hidden" dir="rtl">
      {/* Background glow */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#ff6900] rounded-full blur-[120px] opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-4xl bg-[#111] border border-[#333] rounded-3xl p-6 md:p-10 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-[#ff6900] mb-4">
            <Image src="/campaigns/narco/logo.jpg" alt="Narco Logo" fill className="object-cover" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffae00] to-[#ff3300] mb-2">
            تحديث منتجات التجزئة والجملة - منصة ناركو
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            أهلاً بك أستاذ أحمد جاد. يمكنك هنا إدارة المخزون، الأسعار، وحالة التوفر لجميع منتجاتك.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          
          {/* Firewood Section */}
          <div className="bg-black/30 p-6 rounded-2xl border border-white/5 shadow-inner">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <label className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-[#ff6900]" />
                1. منتجات الحطب
              </label>
              <button type="button" onClick={() => handleAddItem(setFirewoodItems, firewoodItems, "نوع حطب آخر...")} className="text-sm bg-[#ff6900]/20 hover:bg-[#ff6900]/40 text-[#ff6900] px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-bold">
                <Plus className="w-4 h-4" /> إضافة حطب آخر
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {renderGrid(firewoodItems, setFirewoodItems, "focus:border-[#ff6900]")}
            </div>
          </div>

          {/* Charcoal Section */}
          <div className="bg-black/30 p-6 rounded-2xl border border-white/5 shadow-inner">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <label className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-[#00d2ff]" />
                2. منتجات الفحم
              </label>
              <button type="button" onClick={() => handleAddItem(setCharcoalItems, charcoalItems, "نوع فحم آخر...")} className="text-sm bg-[#00d2ff]/20 hover:bg-[#00d2ff]/40 text-[#00d2ff] px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-bold">
                <Plus className="w-4 h-4" /> إضافة فحم آخر
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {renderGrid(charcoalItems, setCharcoalItems, "focus:border-[#00d2ff]")}
            </div>
          </div>

          {/* Accessories Section */}
          <div className="bg-black/30 p-6 rounded-2xl border border-white/5 shadow-inner">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <label className="text-lg font-bold text-white flex items-center gap-2">
                <Wrench className="w-6 h-6 text-[#10b981]" />
                3. مستلزمات الشواء والتدفئة
              </label>
              <button type="button" onClick={() => handleAddItem(setAccessoriesItems, accessoriesItems, "منتج آخر...")} className="text-sm bg-[#10b981]/20 hover:bg-[#10b981]/40 text-[#10b981] px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-bold">
                <Plus className="w-4 h-4" /> إضافة منتج آخر
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {renderGrid(accessoriesItems, setAccessoriesItems, "focus:border-[#10b981]")}
            </div>
          </div>

          {/* Delivery Section */}
          <div className="bg-black/30 p-6 rounded-2xl border border-white/5 shadow-inner">
            <label className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <ArrowRight className="w-6 h-6 text-green-500 rotate-180" />
              4. مناطق التوصيل
            </label>
            <p className="text-sm text-gray-400 mb-3">ما هي المدن أو المناطق التي يتم تغطيتها لتوصيل الطلبات؟</p>
            <textarea
              required
              rows={3}
              value={deliveryAreas}
              onChange={(e) => setDeliveryAreas(e.target.value)}
              placeholder="مثال: التوصيل متاح داخل مدينة الرياض فقط..."
              className="w-full bg-black border border-[#333] focus:border-green-500 rounded-xl px-4 py-3 text-white outline-none transition-all resize-none"
            />
          </div>

          <div className="bg-[#ff6900]/10 border border-[#ff6900]/30 rounded-2xl p-4 text-[#ff6900] text-sm flex gap-3 items-start">
            <div className="text-2xl">⚠️</div>
            <div>
              <p className="font-bold mb-1">ملاحظة هامة بخصوص الصور:</p>
              <p>نظراً لقيود تطبيق واتساب، لا يمكن إرفاق ملفات الصور مباشرة من هذا النموذج. يرجى إضافة روابط الصور إن وجدت، أو تذكر إرسال صور المنتجات يدوياً في محادثة الواتساب بعد الضغط على زر الإرسال أدناه.</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff6900] to-[#ff3300] hover:shadow-[0_0_30px_rgba(255,105,0,0.4)] text-white font-bold text-xl py-5 rounded-2xl transition-all flex items-center justify-center gap-3 mt-2"
          >
            <span>حفظ وإرسال التحديثات عبر واتساب</span>
            <Send className="w-6 h-6 rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
}
