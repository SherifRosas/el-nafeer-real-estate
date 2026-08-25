"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, MapPin, ShieldCheck, Flame, ArrowRight, MessageCircle, Star, ChevronDown } from "lucide-react";
import NarcoChatBot from "./components/NarcoChatBot";

// CONSTANTS - Easy to change prices
const PRICE_10KG = 32;
const PRICE_5KG = 18;

export default function NarcoPage() {
  const shouldReduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "ما هو حطب السمر الأفريقي وما هي مميزاته؟",
      a: "حطب السمر الأفريقي هو من أجود أنواع الحطب المستخدم للتدفئة والشواء. يتميز بسرعة اشتعاله، وقوة حرارته، وطول فترة بقائه جمراً، بالإضافة إلى قلة الدخان المنبعث منه."
    },
    {
      q: "هل تقومون بالتوصيل لجميع مناطق المملكة؟",
      a: "نعم، نقدم خدمة توصيل آمنة وسريعة لجميع مناطق المملكة العربية السعودية. أسطولنا يغطي الرياض، جدة، الدمام، وكافة المدن الكبرى لضمان وصول طلبك لمنزلك في أسرع وقت."
    },
    {
      q: "ما هو حجم أكياس الحطب المتوفرة؟",
      a: "نوفر حالياً أكياس فاخرة بحجمين لتناسب جميع احتياجاتكم: كيس 10 كجم للعائلات والمخيمات، وكيس 5 كجم للرحلات السريعة."
    },
    {
      q: "هل الحطب جاهز للاستخدام مباشرة؟",
      a: "بالتأكيد. حطب ناركو الإفريقي مجفف طبيعياً ونظيف جداً، مما يجعله جاهزاً للاشتعال فوراً بدون رطوبة تدخن أو تفسد الجلسة."
    },
    {
      q: "ما هي طرق الدفع المتاحة لديكم؟",
      a: "نقبل الدفع النقدي (كاش)، مدى، STC Pay، والتحويل البنكي. نحرص على توفير خيارات مرنة لتسهيل عملية الشراء لعملائنا."
    }
  ];

  const animationProps = shouldReduceMotion ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } } : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#ff6900] selection:text-white relative pb-24 md:pb-0">
      
      {/* Version & Build Info */}
      <div className="absolute top-0 left-0 w-full bg-black/50 backdrop-blur-md text-[10px] md:text-xs text-gray-500 py-1 px-4 flex justify-between items-center z-50 border-b border-white/5 font-mono">
        <span className="text-[#00d2ff]">V23.0.1 - B2C Retail</span>
        <span>Build: 18-08-2026 04:30 AST</span>
      </div>

      {/* Cinematic Background - Teal & Orange Lighting */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6900] rounded-full blur-[120px] opacity-10 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d2ff] rounded-full blur-[120px] opacity-10 mix-blend-screen" />
      </div>

      {/* Visual Breadcrumbs */}
      <nav className="relative z-10 container mx-auto px-4 py-4 pt-10 text-sm text-gray-400">
        <ol className="flex items-center gap-2">
          <li><a href="/" className="hover:text-[#ff6900] transition-colors p-2 -m-2">الرئيسية</a></li>
          <li>/</li>
          <li className="text-[#ff6900]" aria-current="page">ناركو - حطب أفريقي</li>
        </ol>
      </nav>

      <main className="relative z-10 container mx-auto px-4 pb-20 flex flex-col items-center justify-center">
        
        {/* Logo Reveal */}
        <motion.div 
          {...(shouldReduceMotion ? {} : { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1 } })}
          className="relative w-48 h-48 md:w-64 md:h-64 mb-8 mt-8 rounded-full overflow-hidden border-4 border-[#333] shadow-[0_0_50px_rgba(255,105,0,0.3)]"
        >
          <Image 
            src="/campaigns/narco/logo.jpg" 
            alt="شعار مؤسسة ناركو لتجارة الحطب الإفريقي"
            fill
            sizes="(max-width: 768px) 192px, 256px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Headlines */}
        <motion.div {...animationProps} transition={{ duration: 0.8 }} className="text-center max-w-3xl mb-16">
          <div className="inline-block mb-4 px-5 py-2 rounded-full border border-[#ff6900] text-[#ff6900] text-sm md:text-base font-medium tracking-widest bg-[#ff6900]/10 backdrop-blur-sm">
            ناركو - جودة استثنائية للعائلات والمخيمات
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffae00] to-[#ff3300] py-2">
            حطب أفريقي مستورد - نخب أول
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            مؤسسة ناركو توفر لك أجود أنواع حطب السمر الإفريقي المستورد في تغليف فاخر وآمن. نضمن لك جودة احتراق فائقة، دفء يدوم طويلاً، وتوصيل سريع لباب بيتك أينما كنت في المملكة.
          </p>
        </motion.div>

        {/* Features */}
        <section id="why-us" className="w-full max-w-5xl mb-24">
          <motion.h2 {...animationProps} className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
            لماذا يفضلنا عملاؤنا؟
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Flame, title: "احتراق مثالي بلا دخان", desc: "حطب مجفف طبيعياً يشتعل بسرعة ويعطيك جمراً يدوم لساعات طويلة، لضمان جلسة شتاء دافئة." },
              { icon: ShieldCheck, title: "تغليف فاخر وآمن", desc: "نحرص على تعبئة الحطب في أكياس متينة وفاخرة تحافظ على نظافة المكان وسهلة التخزين." },
              { icon: MapPin, title: "توصيل سريع للمنزل", desc: "لا داعي للانتظار، فريقنا يوصل طلبك لحد باب بيتك أو مخيمك في أسرع وقت داخل السعودية." },
            ].map((feature, idx) => (
              <motion.div key={idx} {...animationProps} transition={{ delay: shouldReduceMotion ? 0 : idx * 0.2 }} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-[#ff6900]/50 hover:shadow-[0_0_20px_rgba(255,105,0,0.1)] transition-all duration-300 group">
                <feature.icon className="w-12 h-12 text-[#ff6900] mb-6 group-hover:scale-110 transition-all duration-300" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section id="products" className="w-full max-w-5xl mb-24">
          <motion.h2 {...animationProps} className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
            تشكيلة حطب السمر الإفريقي (درجة أولى)
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product 1: 10 KG */}
            <motion.div {...animationProps} className="bg-gradient-to-b from-[#1a1a1a] to-black border border-[#333] rounded-3xl overflow-hidden flex flex-col hover:border-[#ff6900]/50 transition-colors duration-300">
              <div className="h-80 w-full relative">
                <Image src="/campaigns/narco/10kg_sack.jpg" alt="كيس حطب سمر أفريقي 10 كيلو" fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-[#ff6900] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">الأكثر مبيعاً</div>
              </div>
              <div className="p-8 flex-1 flex flex-col relative z-10 -mt-6 bg-gradient-to-t from-black via-[#111] to-transparent">
                <h3 className="text-2xl font-bold mb-2 pt-6">كيس حطب سمر أفريقي (10 كجم)</h3>
                <p className="text-gray-400 mb-6 text-base leading-relaxed">الخيار المثالي للمخيمات والجلسات العائلية الطويلة. يضمن لك دفئاً يمتد طوال الليل.</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-4xl font-bold text-white">{PRICE_10KG} <span className="text-lg text-gray-500 font-normal">ريال</span></span>
                  <a href={`https://wa.me/966559715915?text=أريد طلب كيس حطب 10 كيلو بسعر ${PRICE_10KG} ريال`} target="_blank" rel="noopener noreferrer" className="bg-[#ff6900] hover:bg-[#ff3300] transition-colors p-3 rounded-xl min-w-[48px] min-h-[48px] flex items-center justify-center shadow-[0_0_15px_rgba(255,105,0,0.4)]">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Product 2: 5 KG */}
            <motion.div {...animationProps} transition={{ delay: 0.2 }} className="bg-gradient-to-b from-[#1a1a1a] to-black border border-[#333] rounded-3xl overflow-hidden flex flex-col group hover:border-[#ff6900]/50 transition-colors duration-300">
              <div className="h-80 w-full relative">
                <Image src="/campaigns/narco/5kg_sack.jpg" alt="كيس حطب سمر أفريقي 5 كيلو" fill className="object-cover" />
              </div>
              <div className="p-8 flex-1 flex flex-col relative z-10 -mt-6 bg-gradient-to-t from-black via-[#111] to-transparent">
                <h3 className="text-2xl font-bold mb-2 pt-6">كيس حطب سمر أفريقي (5 كجم)</h3>
                <p className="text-gray-400 mb-6 text-base leading-relaxed">سهل الحمل والتنقل، ممتاز لطلعات الشواء الخفيفة والرحلات السريعة.</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-4xl font-bold text-white">{PRICE_5KG} <span className="text-lg text-gray-500 font-normal">ريال</span></span>
                  <a href={`https://wa.me/966559715915?text=أريد طلب كيس حطب 5 كيلو بسعر ${PRICE_5KG} ريال`} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#ff6900] hover:shadow-[0_0_15px_rgba(255,105,0,0.4)] transition-all p-3 rounded-xl min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="w-full max-w-5xl mb-24">
          <motion.h2 {...animationProps} className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
            ماذا يقول عملاؤنا؟
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { text: "أفضل حطب جربته للمخيم، حرارته ممتازة وجمره يطول جداً بدون ما يدخن ويخرب علينا القعدة.", name: "خالد العتيبي", role: "عميل مميز" },
              { text: "التغليف فاخر جداً، الكيس متين وشكله يفتح النفس، وسرعة التوصيل خيالية.", name: "أبو فهد", role: "عميل مميز" },
              { text: "طلبت كيس الـ 10 كيلو، الكمية وافية جداً والسعر مقارنة بالجودة ممتاز.", name: "محمد الدوسري", role: "عميل مميز" },
              { text: "تعامل راقي، الحطب يوصلك نظيف وجاهز للشب، اعتمدتهم لفصل الشتاء.", name: "عبدالله الراجحي", role: "عميل مميز" }
            ].map((review, idx) => (
              <motion.div key={idx} {...animationProps} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#ffae00] text-[#ffae00]" />)}
                </div>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff6900] to-[#ff3300] flex items-center justify-center font-bold">{review.name.charAt(0)}</div>
                  <div>
                    <div className="font-bold text-white">{review.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full max-w-3xl mb-24">
          <motion.h2 {...animationProps} className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
            أسئلة متكررة
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} {...animationProps} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-right flex items-center justify-between min-h-[60px]"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#ff6900]' : 'text-gray-400'}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-400 text-base leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section id="contact" className="w-full max-w-4xl bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#ff6900]/20 rounded-3xl p-8 md:p-16 text-center shadow-[0_20px_50px_rgba(255,105,0,0.05)] relative overflow-hidden">
          {/* Cyber Glow Overlay inside CTA */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff6900]/10 via-transparent to-transparent pointer-events-none" />
          
          <motion.h2 {...animationProps} className="relative z-10 text-3xl md:text-5xl font-bold mb-6 text-white">
            جاهز لطلب حطب ناركو؟
          </motion.h2>
          <p className="relative z-10 text-gray-300 text-lg mb-8 max-w-2xl mx-auto">تواصل معنا الآن لطلب كراتين الحطب وتحديد موعد التوصيل لمنزلك.</p>
          <a href="https://wa.me/966559715915" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#ff6900] to-[#ff3300] text-white px-8 py-5 rounded-xl font-bold text-xl hover:shadow-[0_0_30px_rgba(255,105,0,0.5)] transition-all duration-300 transform hover:-translate-y-1 min-w-[200px] min-h-[56px]">
            <MessageCircle className="w-6 h-6" />
            <span>الطلب عبر الواتساب</span>
          </a>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/5 bg-[#0a0a0a] pt-8 pb-32 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 rounded-2xl p-6 md:px-10 bg-[#111]/80 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            
            <div className="flex flex-col items-center md:items-start text-center md:text-right order-2 md:order-1">
              <div className="flex items-center gap-4 mb-3">
                <a href="#" className="text-[#ff6900] font-bold text-lg hover:text-white transition-colors">سياسة الخصوصية</a>
                <span className="text-[#ff6900]/50 font-light">|</span>
                <a href="#" className="text-[#ff6900] font-bold text-lg hover:text-white transition-colors">شروط الخدمة</a>
              </div>
              <p className="text-[#64748b] text-sm font-medium">جميع الحقوق محفوظة © مؤسسة ناركو ٢٠٢٤</p>
            </div>

            <div className="flex items-center gap-6 order-1 md:order-2" dir="ltr">
              <div className="flex flex-col items-end text-right">
                <span className="text-[#64748b] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-1">Architecture By</span>
                <span className="text-white font-black text-xl md:text-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-wide">El-Nafeer Tech</span>
              </div>
              <a href="tel:+201065661882" className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#ff6900]/30 flex items-center justify-center bg-black/50 hover:bg-[#ff6900]/10 hover:border-[#ff6900] transition-all duration-300 group shadow-[inset_0_0_15px_rgba(255,105,0,0.15)]">
                <Phone className="w-6 h-6 md:w-7 md:h-7 text-[#ff6900] group-hover:scale-110 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-50 md:hidden flex justify-center pointer-events-none">
        <a href="https://wa.me/966559715915" className="pointer-events-auto flex w-full max-w-sm items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(37,211,102,0.3)] min-h-[56px]">
          <MessageCircle className="w-6 h-6" />
          <span>تواصل عبر واتساب فوراً</span>
        </a>
      </div>
      
      {/* Smart Assistant Chat Bot */}
      <NarcoChatBot />
    </div>
  );
}
