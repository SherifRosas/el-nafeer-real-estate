'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageContext'

interface ProjectEntry {
    title: { en: string, ar: string }
    location: string
    year: string
    images: string[]
}

export default function BrandOnboardingTerminal() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [step, setStep] = useState(1)
    const [logs, setLogs] = useState<string[]>([])

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        companyName: '',
        industry: 'Elevators & Hydraulics',
        serviceArea: 'Egypt & KSA',
        location: 'Al-Ahram Garden, Fourth Gate, Egypt',
        phone: '',
        whatsapp: '',
        portfolio: [] as ProjectEntry[]
    })

    const [isDeploying, setIsDeploying] = useState(false)

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `>> [${new Date().toLocaleTimeString()}]: ${msg}`])
    }

    const handleComplete = async () => {
        if (!formData.email || !formData.companyName) {
            alert(isArabic ? 'يرجى ملء جميع البيانات المطلوبة' : 'Please fill in all required fields')
            return
        }

        setIsDeploying(true)
        setLogs([])
        
        addLog('INIT_BRAND_SYNTHESIS_PROTOCOL...')
        await new Promise(r => setTimeout(r, 800))
        
        addLog('VERIFYING_DOMAIN_AUTHORITY...')
        await new Promise(r => setTimeout(r, 1200))

        try {
            addLog('INJECTING_NEURAL_IDENTITY_DATA...')
            const res = await fetch('/api/admin/brands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    companyName: formData.companyName,
                    industry: formData.industry,
                    serviceArea: formData.serviceArea,
                    location: formData.location,
                    contactDetails: {
                        phone: formData.phone,
                        whatsapp: formData.whatsapp
                    }
                })
            })

            const data = await res.json()

            if (data.success) {
                addLog('ORCHESTRATING_MARKETING_NODES...')
                await new Promise(r => setTimeout(r, 1000))
                addLog('BRAND_SUCCESSFULLY_INTERNALIZED.')
                setStep(4)
            } else {
                addLog(`CRITICAL_ERROR: ${data.error || 'ACCESS_DENIED'}`)
                alert(data.error || 'Deployment failed')
            }
        } catch (error) {
            addLog('CONNECTION_INTERRUPTED_RETRY_SIGNAL_LOST')
            console.error(error)
        } finally {
            setIsDeploying(false)
        }
    }

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

                <div className="milky-glass border border-white/10 rounded-[4rem] p-12 md:p-20 relative overflow-hidden transition-all duration-700">
                    {/* Progress HUD */}
                    <div className="flex gap-4 mb-20 robotic-digits">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-700 ${i <= step ? 'bg-sahara-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'bg-white/10'}`} />
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
                            <div className="space-y-4">
                                <label htmlFor="email" className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Client_Email_Authentication</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="CLIENT@Vortex-Systems.ai"
                                    title="Client Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-black italic tracking-tighter focus:border-sahara-gold outline-none transition-all placeholder:text-white/10 robotic-digits"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label htmlFor="companyName" className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Company_Identity</label>
                                    <input
                                        id="companyName"
                                        type="text"
                                        placeholder="COMPANY_NAME_EXE"
                                        title="Company Name"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-black italic tracking-tighter focus:border-sahara-gold outline-none transition-all placeholder:text-white/10 robotic-digits"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label htmlFor="industry" className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Industry_Vertical</label>
                                    <select
                                        id="industry"
                                        value={formData.industry}
                                        title="Industry Vertical"
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-black italic tracking-tighter focus:border-sahara-gold outline-none transition-all robotic-digits appearance-none"
                                    >
                                        <option>Elevators & Hydraulics</option>
                                        <option>Real Estate Development</option>
                                        <option>Industrial Systems</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label htmlFor="location" className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4">Operational_HQ</label>
                                <input
                                    id="location"
                                    type="text"
                                    title="Operational HQ"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                            <h3 className="text-3xl font-black italic tracking-tighter uppercase font-outfit">Cross_Border_Portfolio</h3>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="aspect-square bg-white/5 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-sahara-gold/40 cursor-pointer transition-all group">
                                    <span className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">🇸🇦</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">Add_KSA_Project</span>
                                </div>
                                <div className="aspect-square bg-white/5 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-sahara-gold/40 cursor-pointer transition-all group">
                                    <span className="text-4xl opacity-20 group-hover:opacity-100 transition-opacity">🇪🇬</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">Add_Egypt_Project</span>
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
                                <label htmlFor="phone" className="sr-only">Primary Phone Line</label>
                                <div className="flex items-center gap-6 bg-white/5 p-8 rounded-3xl border border-white/10 group focus-within:border-sahara-gold transition-all">
                                    <span className="text-3xl">📱</span>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="PHONE_LINE_PRIMARY"
                                        title="Primary Phone Line"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-transparent border-none outline-none text-2xl font-black italic tracking-tight w-full placeholder:text-white/5 robotic-digits"
                                    />
                                </div>
                                <label htmlFor="whatsapp" className="sr-only">WhatsApp Signal</label>
                                <div className="flex items-center gap-6 bg-white/5 p-8 rounded-3xl border border-white/10 group focus-within:border-[#25D366] transition-all">
                                    <span className="text-3xl">WhatsApp</span>
                                    <input
                                        id="whatsapp"
                                        type="tel"
                                        placeholder="WHATSAPP_ENCRYPTED_SIGNAL"
                                        title="WhatsApp Signal"
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                        className="bg-transparent border-none outline-none text-2xl font-black italic tracking-tight w-full placeholder:text-white/5 robotic-digits"
                                    />
                                </div>
                            </div>

                            {/* Live Agent Logs */}
                            {isDeploying && (
                                <div className="bg-black/40 border border-white/5 rounded-3xl p-8 font-mono text-[10px] text-sahara-gold h-48 overflow-y-auto robotic-digits space-y-2">
                                    {logs.map((log, i) => (
                                        <p key={i} className="animate-in fade-in slide-in-from-left-4 duration-300">{log}</p>
                                    ))}
                                    <p className="animate-pulse">_</p>
                                </div>
                            )}

                            <button 
                                onClick={handleComplete}
                                disabled={isDeploying}
                                className="w-full bg-white text-black p-10 rounded-[3rem] font-black italic tracking-tighter text-3xl hover:bg-sahara-gold hover:scale-[1.02] transition-all shadow-[0_30px_60px_rgba(212,175,55,0.2)] disabled:opacity-50"
                            >
                                {isDeploying ? 'DEPLOYING_NEXUS...' : 'COMPLETE_DEPLOYMENT_PROTOCOL'}
                            </button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-12 animate-in zoom-in-50 fade-in duration-1000 text-center py-10">
                            <div className="w-40 h-40 bg-sahara-gold/10 border border-sahara-gold/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                                <span className="text-6xl animate-bounce">⚡</span>
                            </div>
                            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">BRAND_ORCHESTRATED</h2>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                                {isArabic ? 'تم تفعيل الملف التجاري بنجاح في النواة المركزية' : 'Profile successfully synthesized in center of nexus'}
                            </p>
                            <button 
                                onClick={() => setStep(1)}
                                className="mt-12 px-12 py-5 bg-white/5 border border-white/10 rounded-full font-black text-xs uppercase tracking-widest hover:bg-sahara-gold hover:text-black transition-all"
                            >
                                START_NEW_ONBOARDING
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
