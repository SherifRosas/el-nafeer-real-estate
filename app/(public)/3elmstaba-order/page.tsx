"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus, ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';

const MENU_ITEMS = [
  // Sandwiches (سندوتشات)
  { id: '1', name: 'سندوتش شاورما فراخ (خبز فرنساوي)', description: 'أصيل على الطريقة السورية', price: 98, category: 'سندوتشات' },
  { id: '2', name: 'سندوتش شاورما لحم (خبز فرنساوي)', description: 'شاورما لحم سوري', price: 104, category: 'سندوتشات' },
  { id: '3', name: 'سندوتش شاورما ميكس (خبز فرنساوي)', description: 'مزيج رائع من اللحم والفراخ', price: 100, category: 'سندوتشات' },
  { id: '4', name: 'سندوتش شيش طاووق (خبز فرنساوي)', description: 'مكعبات دجاج مشوية', price: 98, category: 'سندوتشات' },
  { id: '5', name: 'سندوتش زنجر', description: 'سندوتش دجاج متبل مع مايونيز', price: 98, category: 'سندوتشات' },
  { id: '6', name: 'سندوتش فاهيتا فراخ (خبز فرنساوي)', description: 'مع الفلفل والبصل', price: 91, category: 'سندوتشات' },
  { id: '7', name: 'سندوتش كفتة (خبز فرنساوي)', description: 'كفتة مشوية على الفحم', price: 85, category: 'سندوتشات' },
  { id: '8', name: 'سندوتش سوبر كرانشي (خبز فرنساوي)', description: 'دجاج مقرمش اكسترا', price: 104, category: 'سندوتشات' },
  
  // Meals (وجبات)
  { id: '9', name: 'طبق شاورما الشام (فراخ)', description: 'مع بطاطس، كبيبة، سمبوسك، أرز، تومية وخبز', price: 170, category: 'وجبات' },
  { id: '10', name: 'طبق شاورما الشام (لحم)', description: 'مع بطاطس، كبيبة، سمبوسك، أرز، وطحينة', price: 182, category: 'وجبات' },
  { id: '11', name: 'طبق شاورما الشام (ميكس)', description: 'مع بطاطس، كبيبة، سمبوسك، أرز', price: 175, category: 'وجبات' },
  { id: '12', name: 'وجبة كرسبي 3 قطع', description: 'مع أرز، بطاطس، تومية وخبز', price: 163, category: 'وجبات' },
  { id: '13', name: 'وجبة زنجر 3 قطع', description: 'مع أرز، بطاطس، تومية وخبز', price: 163, category: 'وجبات' },
  { id: '14', name: 'وجبة شيش 2 سيخ', description: 'مع أرز، بطاطس، تومية وخبز', price: 169, category: 'وجبات' },

  // Extras & Sides (إضافات ومقبلات)
  { id: '15', name: 'اكسترا شاورما فراخ', description: 'مشروم وموتزريلا', price: 117, category: 'إضافات ومقبلات' },
  { id: '16', name: 'اكسترا شاورما لحمة', description: 'مشروم وموتزريلا', price: 130, category: 'إضافات ومقبلات' },
  { id: '17', name: 'بطاطس جبنة', description: 'بطاطس مقرمشة مع الجبنة السايحة', price: 52, category: 'إضافات ومقبلات' },
  { id: '18', name: 'سندوتش بطاطس محمرة', description: 'في خبز فرنساوي', price: 40, category: 'إضافات ومقبلات' },
  { id: '19', name: 'طبق كبيبة', description: '2 حبة مع سمبوسك وتومية', price: 30, category: 'إضافات ومقبلات' },
  { id: '20', name: 'أرز بسمتي سادة', description: 'أرز طويل الحبة', price: 46, category: 'إضافات ومقبلات' },
];

const VODAFONE_CASH_NUMBER = "010xxxxxxxxx"; // Placeholder for the actual number
const WHATSAPP_NUMBER = "+2010xxxxxxxxx"; // Placeholder for the business WhatsApp

export default function OrderingApp() {
  const [cart, setCart] = useState<{id: string, name: string, price: number, quantity: number}[]>([]);
  const [view, setView] = useState<'menu' | 'checkout' | 'success'>('menu');
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [orderId, setOrderId] = useState('');

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;
    
    // Generate a random 4 digit order ID
    const newOrderId = '#' + Math.floor(1000 + Math.random() * 9000);
    setOrderId(newOrderId);
    setView('success');
  };

  const handleWhatsAppRedirect = () => {
    const message = `أهلاً 3Elmastaba Shawarma! 🛵\n\nأريد تأكيد طلبي.\n\n*رقم الطلب:* ${orderId}\n*الإجمالي:* ${cartTotal} ج.م\n\n*الاسم:* ${formData.name}\n*رقم الهاتف:* ${formData.phone}\n*العنوان:* ${formData.address}\n\nقمت بتحويل المبلغ عبر فودافون كاش ومرفق إيصال التحويل.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md overflow-hidden relative">
              <span className="text-2xl">🥙</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-800 leading-tight" dir="ltr" style={{textAlign: "right"}}>3Elmstaba Shawarma</h1>
              <p className="text-xs text-orange-500 font-medium">طوخ • توصيل أونلاين</p>
            </div>
          </div>
          {view === 'menu' && cartItemCount > 0 && (
            <button 
              onClick={() => setView('checkout')}
              className="relative p-2 text-slate-600 hover:text-orange-500 transition-colors"
            >
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/4 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto p-4">
        
        {/* Menu View */}
        {view === 'menu' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Banner */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-90 z-10 flex flex-col justify-center px-6">
                <h2 className="text-2xl font-bold text-white mb-1">نفسك في شاورما؟</h2>
                <p className="text-orange-100 text-sm">اطلب دلوقتي، ادفع بفودافون كاش، ويوصلك لحد باب البيت في طوخ.</p>
              </div>
              {/* Fallback for Image */}
              <div className="absolute inset-0 bg-orange-200 flex items-center justify-center text-orange-800 text-xs text-center z-0">
                جاري التحميل...
              </div>
              <Image src="/3elmstaba-concept.png" alt="Shawarma" fill className="object-cover z-10" />
            </div>

            {/* Categories */}
            {['سندوتشات', 'وجبات', 'إضافات ومقبلات'].map(category => (
              <div key={category}>
                <h3 className="font-bold text-slate-800 text-lg mb-3 border-b border-slate-200 pb-2">{category}</h3>
                <div className="space-y-3">
                  {MENU_ITEMS.filter(i => i.category === category).map(item => {
                    const cartItem = cart.find(c => c.id === item.id);
                    return (
                      <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                        <div className="pl-4 w-3/4">
                          <h4 className="font-semibold text-slate-800">{item.name}</h4>
                          {item.description && <p className="text-xs text-slate-500 mt-1">{item.description}</p>}
                          <div className="text-orange-600 font-bold mt-2">{item.price} ج.م</div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          {cartItem ? (
                            <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-lg border border-slate-200">
                              <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center text-slate-600 bg-white rounded shadow-sm">
                                <Plus size={16} />
                              </button>
                              <span className="font-bold w-4 text-center">{cartItem.quantity}</span>
                              <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center text-slate-600 bg-white rounded shadow-sm">
                                <Minus size={16} />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => addToCart(item)}
                              className="w-10 h-10 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
                            >
                              <Plus size={20} />
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Checkout View */}
        {view === 'checkout' && (
          <div className="animate-in slide-in-from-left-4 fade-in">
            <button onClick={() => setView('menu')} className="text-orange-500 font-medium mb-4 flex items-center gap-1 text-sm hover:underline">
              <ArrowLeft size={16} /> الرجوع للقائمة
            </button>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-6">
              <h2 className="font-bold text-lg border-b border-slate-100 pb-3 mb-3">ملخص الطلب</h2>
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">{item.quantity}x {item.name}</span>
                    <span className="font-medium">{item.price * item.quantity} ج.م</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-slate-100 pt-3">
                <span>الإجمالي</span>
                <span className="text-orange-600">{cartTotal} ج.م</span>
              </div>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
              <h2 className="font-bold text-lg mb-4">بيانات التوصيل (طوخ)</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">الاسم بالكامل</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-orange-500 transition-colors" placeholder="مثال: أحمد علي" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">رقم الهاتف (واتساب)</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-orange-500 transition-colors text-right" placeholder="01X XXXX XXXX" dir="ltr" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">العنوان بالتفصيل في طوخ</label>
                  <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-orange-500 transition-colors" placeholder="الشارع، العمارة، الدور..." rows={3} />
                </div>
              </div>

              <button type="submit" className="w-full bg-orange-500 text-white font-bold text-lg py-4 rounded-xl mt-6 flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
                المتابعة للدفع <ArrowLeft size={20} />
              </button>
            </form>
          </div>
        )}

        {/* Success / Payment View */}
        {view === 'success' && (
          <div className="animate-in slide-in-from-bottom-4 fade-in text-center pt-8">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 size={40} />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-2">تم إنشاء الطلب!</h2>
            <p className="text-slate-500 mb-6">طلبك رقم <strong className="text-slate-800">{orderId}</strong> في انتظار تأكيد الدفع.</p>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 text-right">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 justify-start">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">فودافون كاش</span> الدفع عبر
              </h3>
              
              <ol className="list-decimal list-inside space-y-4 text-sm text-slate-700">
                <li>قم بتحويل مبلغ <strong className="text-lg text-red-600">{cartTotal} ج.م</strong></li>
                <li>إلى رقم فودافون كاش التالي:<br/>
                  <span className="inline-block mt-2 font-mono text-xl font-bold bg-slate-100 p-3 rounded-lg border border-slate-200 w-full text-center tracking-widest" dir="ltr">{VODAFONE_CASH_NUMBER}</span>
                </li>
                <li>قم بالتقاط صورة (سكرين شوت) لإيصال التحويل الناجح.</li>
                <li>اضغط على الزر بالأسفل لإرسال الإيصال عبر الواتساب.</li>
              </ol>
            </div>

            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full bg-[#25D366] text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-200 hover:bg-[#1ebd5a] transition-all active:scale-95"
            >
              <MessageCircle size={24} />
              إرسال الإيصال عبر الواتساب
            </button>
            
            <button onClick={() => { setView('menu'); setCart([]); setFormData({name:'', phone:'', address:''}); setOrderId('') }} className="mt-6 text-slate-500 text-sm font-medium hover:text-slate-700">
              إلغاء والبدء من جديد
            </button>
          </div>
        )}

      </main>

      {/* Floating Cart Button (Menu View Only) */}
      {view === 'menu' && cartItemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-slate-200 z-50">
          <div className="max-w-lg mx-auto">
            <button 
              onClick={() => setView('checkout')}
              className="w-full bg-orange-500 text-white font-bold text-lg py-4 rounded-xl flex items-center justify-between px-6 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-transform active:scale-95 hover:bg-orange-600"
            >
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-2 py-1 rounded text-sm">{cartItemCount} عناصر</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{cartTotal} ج.م</span>
                <ArrowLeft size={20} />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
