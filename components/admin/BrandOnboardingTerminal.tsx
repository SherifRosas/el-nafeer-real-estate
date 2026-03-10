'use client'

import { useState } from 'react'
import { useLanguage } from '../LanguageContext'

interface ProjectEntry {
    title: en: string, ar: string
    location: string
    year: string
    images: string[]
}

export default function BrandOnboardingTerminal() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [step, setStep] = useState(1)

    // Form State
    const [formData, setFormData] = useState({
        companyName: '',
        industry: 'Electric & Hydraulic Elevators',
        serviceArea: 'Egypt & KSA',
        location: 'Al-Ahram Garden, Fourth Gate',
        phone: '',
        whatsapp: '',
        portfolio: [] as ProjectEntry[]
    })

    return (
        <div className="min-h-screen bg-[#020202] text-white p-8 md:p-24 flex items-center justify-center">
            <div className="max-w-4xl w-full">
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[2px] w-12 bg-sahara-gold" />
                        <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.6em] robotic-digits">
                            CLIENT_ONBOARDING_PROTOCOL_v4.0
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                        ORCHESTRATE_<span className="text-sahara-gold">BRAND</span>
                    </h1>
                </div>

                <div className="milky-glass border border-white/10 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
                    {/* Progress HUD */}
                    <div className="flex gap-4 mb-20 robotic-digits">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-700 ${i <= step ? 'bg-sahara-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'bg-white/10'}`} />
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Company_Identity</label>
                                    <input
                                        type="text"
                                        placeholder="COMPANY_NAME_EXE"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-black italic tracking-tighter focus:border-sahara-gold outline-none transition-all placeholder:text-white/10 robotic-digits"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Industry_Vertical</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-black italic tracking-tighter focus:border-sahara-gold outline-none transition-all robotic-digits appearance-none"
                                    >
                                        <option>Elevators & Hydraulics</option>
                                        <option>Real Estate Development</option>
                                        <option>Industrial Systems</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Operational_HQ</label>
                                <input
                                    type="text"
                                    defaultValue="Al-Ahram Garden, Fourth Gate, Egypt"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-black italic tracking-tighter focus:border-sahara-gold outline-none transition-all robotic-digits"
                                />
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full group mt-12 bg-white text-black p-8 rounded-3xl font-black italic tracking-tighter text-2xl flex items-center justify-center gap-4 hover:bg-sahara-gold transition-all"
                            >
                                NEXT_PROTOCOL_SIGNAL
                                <span className="group-hover:translate-x-4 transition-transform">→</span>
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-700">
                            <h3 className="text-3xl font-black italic tracking-tighter uppercase">Cross_Border_Portfolio</h3>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="aspect-square bg-white/5 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-sahara-gold/40 cursor-pointer transition-all">
                                    <span className="text-4xl opacity-20">🇸🇦</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Add_KSA_Project</span>
                                </div>
                                <div className="aspect-square bg-white/5 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-sahara-gold/40 cursor-pointer transition-all">
                                    <span className="text-4xl opacity-20">🇪🇬</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Add_Egypt_Project</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setStep(1)} className="flex-1 bg-white/5 p-8 rounded-3xl font-black italic text-xl hover:bg-white/10 transition-all">BACK</button>
                                <button onClick={() => setStep(3)} className="flex-[2] bg-sahara-gold text-black p-8 rounded-3xl font-black italic text-xl hover:bg-white transition-all">INJECT_CONTACT_CHANNELS</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
                            <h3 className="text-3xl font-black italic tracking-tighter uppercase whitespace-pre-line">
                                {isArabic ? 'تنشيط_قنوات_الاتصال' : 'ACTIVATE_CONTACT_CHANNELS'}
                            </h3>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 bg-white/5 p-8 rounded-3xl border border-white/10 group focus-within:border-sahara-gold transition-all">
                                    <span className="text-3xl">📱</span>
                                    <input
                                        type="tel"
                                        placeholder="PHONE_LINE_PRIMARY"
                                        className="bg-transparent border-none outline-none text-2xl font-black italic tracking-tight w-full placeholder:text-white/5 robotic-digits"
                                    />
                                </div>
                                <div className="flex items-center gap-6 bg-white/5 p-8 rounded-3xl border border-white/10 group focus-within:border-[#25D366] transition-all">
                                    <span className="text-3xl">WhatsApp</span>
                                    <input
                                        type="tel"
                                        placeholder="WHATSAPP_ENCRYPTED_SIGNAL"
                                        className="bg-transparent border-none outline-none text-2xl font-black italic tracking-tight w-full placeholder:text-white/5 robotic-digits"
                                    />
                                </div>
                            </div>

                            <button className="w-full bg-white text-black p-10 rounded-[3rem] font-black italic tracking-tighter text-3xl hover:bg-sahara-gold hover:scale-[1.02] transition-all shadow-[0_30px_60px_rgba(212,175,55,0.2)]">
                                COMPLETE_DEPLOYMENT_PROTOCOL
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
