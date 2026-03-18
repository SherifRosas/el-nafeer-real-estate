'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from './LanguageContext'
import NavigationHeader from './NavigationHeader'

const BRAND_ID = '62c38934-4c4b-42be-98c9-06cbbee1af19'

export default function LeverPioneerLanding() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const [form, setForm] = useState({
        name: '',
        phone: '',
        service: 'Maintenance'
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    brandProfileId: BRAND_ID,
                    notes: `Requested service: ${form.service}`
                })
            })
            if (res.ok) {
                setSubmitted(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white">
            <NavigationHeader />
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 text-center lg:text-left">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-10 animate-in fade-in slide-in-from-left-10 duration-1000">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-xl border border-sahara-gold/20 bg-sahara-gold/5 group">
                            <span className="w-2 h-2 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]" />
                            <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] robotic-digits">GERMAN_ENGINEERING_NODE_v4.1</span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 rtl:flex-row-reverse lg:items-start">
                            <div className="relative w-full max-w-[300px] md:max-w-[400px] group">
                                <div className="absolute inset-0 bg-sahara-gold/10 blur-3xl rounded-full group-hover:bg-sahara-gold/20 transition-all duration-700" />
                                <Image 
                                    src="/clients/lever-pioneer/logo_mimic.png" 
                                    alt="Lever Pioneer Original Logo" 
                                    width={400} 
                                    height={320}
                                    className="relative z-10 w-full h-auto object-contain transition-transform duration-700 hover:scale-105" 
                                />
                            </div>
                        </div>

                        <div className="pt-2 pb-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                            <a href="https://www.google.com/maps?q=29.9656242,31.0922895" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-sahara-gold hover:text-black transition-all flex items-center gap-2">
                                📍 {isArabic ? 'القاهرة والجيزة' : 'CAIRO_&_GIZA'}
                            </a>
                            <a href="https://wa.me/201111171368" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all flex items-center gap-2">
                                💬 {isArabic ? 'واتساب' : 'WHATSAPP_SIGNAL'}
                            </a>
                            <a href="tel:+201070615372" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2">
                                📞 {isArabic ? 'اتصل الآن' : 'DIRECT_COMM'}
                            </a>
                            <a href="https://www.facebook.com/mohamed.sanad.473555" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">
                                👤 {isArabic ? 'المؤسس' : 'OWNER_NODE'}
                            </a>
                            <a href="/lever-pioneer/ad-v2" className="px-5 py-3 rounded-2xl bg-sahara-gold/10 border border-sahara-gold/30 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-sahara-gold hover:text-black transition-all flex items-center gap-2 group">
                                📡 <span className="animate-pulse">{isArabic ? 'مشاهدة البث السينمائي' : 'VIEW_CINEMATIC_BROADCAST'}</span>
                            </a>
                        </div>
                        
                        <p className="text-lg md:text-xl text-gray-500 font-bold uppercase tracking-tight max-w-2xl leading-relaxed">
                            {isArabic 
                                ? 'نحن ندمج الهندسة الألمانية المتقدمة مع الرؤية المصرية الحديثة لتوفير حلول نقل عمودي لا مثيل لها.'
                                : 'We synthesize advanced German engineering with modern Egyptian vision to orchestrate unparalleled vertical mobility solutions.'}
                        </p>

                        <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-10">
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-white italic robotic-digits">150+</span>
                                <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{isArabic ? 'مشروع نشط' : 'ACTIVE_PROJECTS'}</span>
                            </div>
                            <div className="w-px h-16 bg-white/5 hidden md:block" />
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-sahara-gold italic robotic-digits">24/7</span>
                                <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{isArabic ? 'دعم فني' : 'NEURAL_SUPPORT'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Elite Lead Capture Component */}
                    <div className="w-full lg:w-[450px] animate-in fade-in slide-in-from-right-10 duration-1000">
                        <div className="milky-glass border border-white/10 rounded-[3.5rem] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sahara-gold/[0.05] blur-3xl" />
                            
                            {!submitted ? (
                                <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                                    <div className="text-center mb-10">
                                        <h2 className="text-2xl font-black italic uppercase text-white mb-2">{isArabic ? 'الارتقاء يبدأ هنا' : 'ASCENT_BEGINS_HERE'}</h2>
                                        <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">{isArabic ? 'أدخل تفاصيل الإشارة' : 'INPUT_SIGNAL_PARAMETERS'}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em] px-4 robotic-digits">IDENTITY_TAG</label>
                                        <input 
                                            required
                                            value={form.name}
                                            onChange={e => setForm({...form, name: e.target.value})}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all placeholder:text-gray-800"
                                            placeholder={isArabic ? 'الاسم بالكامل' : 'FULL_NAME_EXE'}
                                            title="Full Name"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em] px-4 robotic-digits">SIGNAL_PHONE</label>
                                        <input 
                                            required
                                            value={form.phone}
                                            onChange={e => setForm({...form, phone: e.target.value})}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all placeholder:text-gray-800"
                                            placeholder="+20 1XX XXX XXXX"
                                            title="Phone Number"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[9px] text-gray-600 font-black uppercase tracking-[0.4em] px-4 robotic-digits">MODULE_REQUEST</label>
                                        <select 
                                            value={form.service}
                                            onChange={e => setForm({...form, service: e.target.value})}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-white font-black italic focus:border-sahara-gold/50 outline-none transition-all cursor-pointer appearance-none"
                                            title="Service Requested"
                                        >
                                            <option value="Maintenance">{isArabic ? 'صيانة_دورية' : 'MAINTENANCE_LOG'}</option>
                                            <option value="Modernization">{isArabic ? 'تحديث_النظام' : 'MODERNIZATION_UPGRADE'}</option>
                                            <option value="Installation">{isArabic ? 'تركيب_جديد' : 'NEW_INSTALLATION'}</option>
                                        </select>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-8 rounded-[2rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.6em] shadow-[0_15px_30px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? (isArabic ? 'جاري الإرسال...' : 'TRANSMITTING...') : (isArabic ? 'إرسال الإشارة' : 'SEND_SIGNAL')}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-20 space-y-8 animate-in zoom-in-50 duration-700">
                                    <div className="w-24 h-24 bg-sahara-gold/10 rounded-full flex items-center justify-center mx-auto border border-sahara-gold/30">
                                        <span className="text-4xl">⚡</span>
                                    </div>
                                    <h2 className="text-3xl font-black italic uppercase text-white">{isArabic ? 'تم تأكيد الإشارة' : 'SIGNAL_CONFIRMED'}</h2>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs leading-relaxed">
                                        {isArabic 
                                            ? 'تم استقبال بياناتك في المحرك المركزي. وكيل النخبة سيتواصل معك قريباً.'
                                            : 'Your payload has been successfully integrated. An elite agent will intercept shortly.'}
                                    </p>
                                    <button 
                                        onClick={() => setSubmitted(false)}
                                        className="text-[9px] font-black text-sahara-gold uppercase tracking-[0.4em] hover:text-white transition-colors"
                                    >
                                        {isArabic ? 'إعادة الإرسال' : 'RESEND_PROTOCOL'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services Mesh */}
            <section className="py-40 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { title: isArabic ? 'الصيانة' : 'MAINTENANCE', icon: '🛠️', desc: isArabic ? 'عقود صيانة ذكية تضمن استمرارية العمل بنسبة ١٠٠٪.' : 'Intelligent maintenance protocols ensuring 100% uptime.' },
                        { title: isArabic ? 'التحديث' : 'MODERNIZATION', icon: '🔋', desc: isArabic ? 'تحويل المصاعد القديمة إلى أنظمة موفرة للطاقة وذكية.' : 'Synthesizing legacy hardware into energy-efficient neural units.' },
                        { title: isArabic ? 'التركيب' : 'INSTALLATION', icon: '🏗️', desc: isArabic ? 'تصاميم مخصصة للمباني الفاخرة والمشاريع القومية.' : 'Bespoke vertical architecture for prestige developments.' }
                    ].map((s, i) => (
                        <div key={i} className="rounded-[3rem] p-12 milky-glass border border-white/5 hover:border-sahara-gold/30 transition-all duration-700 group">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-8 border border-white/10 group-hover:scale-110 transition-transform">{s.icon}</div>
                            <h3 className="text-2xl font-black italic uppercase text-white mb-4 group-hover:text-sahara-gold transition-colors">{s.title}</h3>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer HUD */}
            <footer className="py-20 border-t border-white/5 text-center">
                <p className="text-[9px] text-gray-700 font-black uppercase tracking-[1em] robotic-digits">
                    LEVER_PIONEER_SYSTEMS // POWERED_BY_EL_NAFEER_PRO
                </p>
            </footer>
            {/* Floating Communication Bar */}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 animate-in slide-in-from-bottom-10 duration-1000 delay-1000 mb-safe">
                <a href="https://wa.me/201111171368" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-2xl shadow-[0_10px_30px_rgba(22,163,74,0.4)] hover:scale-110 active:scale-95 transition-all group relative">
                    <span className="absolute right-full mr-4 px-4 py-2 rounded-xl bg-black/80 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">WHATSAPP</span>
                    💬
                </a>
                <a href="tel:+201070615372" className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-2xl shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-95 transition-all group relative">
                    <span className="absolute right-full mr-4 px-4 py-2 rounded-xl bg-black/80 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">CALL_DIRECT</span>
                    📞
                </a>
                <a href="https://www.google.com/maps?q=29.9656242,31.0922895" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-sahara-gold flex items-center justify-center text-2xl shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-110 active:scale-95 transition-all group relative">
                    <span className="absolute right-full mr-4 px-4 py-2 rounded-xl bg-black/80 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">GEOLOCATION</span>
                    📍
                </a>
            </div>
        </div>
    )
}
