'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Zap, Play, ShieldAlert, Cpu, Radio } from 'lucide-react'

export default function AdV2CinematicExperience() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [step, setStep] = useState(0) // 0: Start, 1: Intro/Pyramids, 2: Eagle Sync, 3: Signal Lock, 4: Global Protocol
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasVoice, setHasVoice] = useState(false)
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

    const script = "الآن من قلب مصر.. من الجيزة، حدائق الأهرام.. تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل، اضغط على الأيقونات: واتساب، أو الاتصال، أو الموقع. وللتواصل مع منصة النفير العالمية للإعلان، اضغط على صقر النفير."

    const startSequence = () => {
        setIsPlaying(true)
        setStep(1)
        
        // --- High-Fidelity Voiceover Protocol ---
        if (synth) {
            synth.cancel()
            const voices = synth.getVoices()
            const arabicVoice = voices.find(v => v.lang.includes('ar')) || voices.find(v => v.lang.includes('EG'))
            
            const utterance = new SpeechSynthesisUtterance(script)
            if (arabicVoice) utterance.voice = arabicVoice
            utterance.lang = 'ar-EG'
            utterance.rate = 0.85
            utterance.pitch = 1.0
            
            // Interaction ensures audio context
            synth.speak(utterance)
            setHasVoice(true)
        }

        // --- Imperial Timeline (30s) ---
        setTimeout(() => setStep(2), 6000)  // Eagle Takes Flight from Pyramids
        setTimeout(() => setStep(3), 16000) // Signal Hotspots Activation
        setTimeout(() => setStep(4), 26000) // Global Platform Lock-on
    }

    // Effect to pre-load voices
    useEffect(() => {
        if (synth) {
            synth.getVoices()
        }
    }, [synth])

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-0 m-0 overflow-hidden relative cursor-crosshair select-none">
            
            {/* --- LAYER 0: CINEMATIC GIZA ATMOSPHERE --- */}
            <div className="absolute inset-0 z-0">
                <motion.div 
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={isPlaying ? { scale: 1.1, opacity: 0.5 } : { opacity: 0.2 }}
                    transition={{ duration: 40, ease: "linear" }}
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale-[40%] brightness-[0.2]"
                />
                
                {/* Neural Dust Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div 
                            key={i}
                            animate={{ 
                                y: [-10, -1200], 
                                opacity: [0, 0.4, 0],
                                x: [0, (Math.random() - 0.5) * 400]
                            }}
                            transition={{ duration: 15 + Math.random() * 15, repeat: Infinity, delay: Math.random() * 5 }}
                            className="absolute w-1 h-1 bg-sahara-gold rounded-full blur-[1px]"
                            style={{ 
                                bottom: `${Math.random() * 20}%`, 
                                left: `${Math.random() * 100}%` 
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* --- LAYER 1: INITIATION PORTAL (High Security) --- */}
            <AnimatePresence>
                {step === 0 && (
                    <motion.div 
                        exit={{ opacity: 0, scale: 1.3, filter: 'blur(30px)' }}
                        className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl p-6"
                    >
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center space-y-12"
                        >
                            {/* The Eagle Pulse Button */}
                            <div className="relative group cursor-pointer" onClick={startSequence}>
                                <motion.div 
                                    animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="relative w-40 h-40 bg-zinc-900 border-2 border-sahara-gold/30 rounded-full flex items-center justify-center overflow-hidden"
                                >
                                    <NextImage 
                                        src="/logos/logo-en.png" 
                                        alt="El Nafeer Eagle" 
                                        width={100} 
                                        height={100}
                                        className="z-10 opacity-80 group-hover:scale-110 transition-transform"
                                    />
                                    <div className="absolute inset-0 bg-sahara-gold/5 animate-pulse" />
                                </motion.div>
                                <motion.div 
                                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="absolute inset-0 border-2 border-sahara-gold rounded-full"
                                />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-sahara-gold font-black tracking-[0.8em] uppercase text-xs mb-2 animate-pulse">EL_NAFEER_SYSTEM_ENGAGE</h2>
                                <h1 className="text-white font-black text-2xl tracking-tighter uppercase mb-6">
                                    {isArabic ? "اضغط لبدء تجربة الإطلاق" : "INITIATE BROADCAST"}
                                </h1>
                                <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                                    {isArabic ? "بروتوكول النفير: تفعيل النظام الصوتي والخرائط الجغرافية" : "PROTOCOL: ENABLE AUDIO_VISUAL_SYNC & GEO_MAPS"}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- LAYER 2: IMPERIAL AD CANVAS --- */}
            <div className="relative w-full max-w-[850px] aspect-square z-10 perspective-1000">
                <motion.div 
                    animate={isPlaying ? { 
                        scale: [1, 1.1, 1.15],
                        y: [0, -20, -40]
                    } : {}}
                    transition={{ duration: 30, ease: "easeInOut" }}
                    className="relative w-full h-full shadow-[0_0_150px_rgba(0,0,0,1)] rounded-[4rem] overflow-hidden"
                >
                    {/* The Base Creative */}
                    <NextImage 
                        src="/campaigns/lever-pioneer/ad-v2.png" 
                        alt="Lever Pioneer Ad v2" 
                        fill
                        className="object-contain"
                        priority
                    />

                    {/* --- KINETIC ANIMATIONS --- */}
                    
                    {/* 1. The Official Eagle Flight (صقر النفير) */}
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.div 
                                initial={{ top: "-30%", left: "50%", scale: 0.2, rotate: 45, opacity: 0 }}
                                animate={
                                    step === 1 ? { top: "15%", left: "15%", scale: 1.2, rotate: 0, opacity: 1 } :
                                    step === 2 ? { top: "12%", left: "75%", scale: 1.4, rotate: 5, opacity: 1 } :
                                    step === 3 ? { top: "45%", left: "20%", scale: 1.1, rotate: -5, opacity: 1 } :
                                    { top: "72%", left: "72%", scale: 1.6, rotate: 0, opacity: 1 }
                                }
                                transition={{ duration: 4, type: "spring", stiffness: 30 }}
                                className="absolute z-[100] pointer-events-none drop-shadow-[0_0_40px_rgba(212,175,55,1)]"
                            >
                                <div className="relative w-32 h-32">
                                    <NextImage 
                                        src="/logos/logo-en.png" 
                                        alt="Cinematic Eagle" 
                                        fill
                                        className="object-contain animate-[float_4s_infinite]"
                                    />
                                    <div className="absolute inset-x-0 -bottom-4 text-center">
                                        <span className="text-[8px] text-sahara-gold font-black uppercase tracking-[0.4em] drop-shadow-md">
                                            {isArabic ? "صقر النفير" : "EAGLE_PROTOCOL"}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 2. Tactical Contact Pulses (Level 3-4) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={step >= 2 ? { opacity: 1 } : {}}
                        className="absolute inset-0 z-40 pointer-events-none"
                    >
                         {/* WhatsApp Beacon */}
                        <div className="absolute top-[8%] left-[7%] w-[35%] h-[35%]">
                            <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0, 0.4, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-4 rounded-full border-2 border-green-500" />
                            <div className="absolute top-[35%] left-[35%] w-8 h-8 bg-green-500/10 rounded-full animate-pulse flex items-center justify-center">
                                <MessageCircle className="w-4 h-4 text-green-500/60" />
                            </div>
                        </div>

                        {/* Location Beacon */}
                        <div className="absolute top-[8%] right-[7%] w-[35%] h-[35%]">
                            <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0, 0.3, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute inset-8 rounded-full border-2 border-sahara-gold" />
                            <div className="absolute top-[30%] right-[30%] w-10 h-10 bg-sahara-gold/10 rounded-full animate-pulse flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-sahara-gold/60" />
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. Global Platform Call Node (Level 6) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={step >= 4 ? { opacity: 1, y: 0, scale: 1 } : {}}
                        className="absolute bottom-[6%] right-[6%] w-[50%] h-[24%] z-[120]"
                    >
                        <a 
                            href="tel:01065661882" 
                            className="block w-full h-full bg-zinc-950/80 backdrop-blur-3xl border-2 border-sahara-gold/40 rounded-[3rem] p-6 hover:bg-sahara-gold/20 transition-all cursor-pointer relative overflow-hidden group shadow-[0_0_60px_rgba(0,0,0,1)]"
                        >
                            <div className="flex items-center gap-6 h-full relative z-10">
                                <div className="p-4 bg-sahara-gold rounded-3xl shadow-[0_0_40px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform">
                                    <Phone className="w-6 h-6 text-black" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[14px] text-sahara-gold font-black uppercase tracking-[0.4em] block">
                                        {isArabic ? "نفير العالمية" : "NAFEER_GLOBAL"}
                                    </span>
                                    <span className="text-white font-black text-2xl tracking-tight robotic-digits">01065661882</span>
                                </div>
                            </div>
                            
                            {/* Scanning Light Sweep */}
                            <motion.div 
                                animate={{ left: ["-100%", "250%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 h-full w-40 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-30"
                            />
                        </a>
                    </motion.div>

                    {/* Cinematic Capion Overlay */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={isPlaying ? { opacity: 1, y: 0 } : {}}
                        className="absolute top-10 left-0 w-full z-50 flex justify-center pointer-events-none"
                    >
                        <div className="bg-black/70 backdrop-blur-xl px-10 py-3 border border-sahara-gold/20 rounded-full flex items-center gap-4 shadow-2xl">
                            <Radio className="w-3 h-3 text-red-600 animate-pulse" />
                            <span className="text-[10px] text-white font-black tracking-[0.6em] uppercase">
                                {step === 1 ? (isArabic ? "دفق الإشارة: صقر النفير" : "SIGNAL_STREAM: EAGLE_SYNC") :
                                 step === 2 ? (isArabic ? "تمركز جغرافي: حدائق الأهرام" : "GEO_LOCK: HADAYEK_AHRAM") :
                                 step === 3 ? (isArabic ? "شركة ليفر: التدشين الرسمي" : "OFFICIAL_LAUNCH: LEVER_PIONEER") :
                                 (isArabic ? "النفير العالمية: النشر الكامل" : "NAFEER_GLOBAL: FULL_SYNC")}
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* --- LAYER 3: PERIMETER HUD FRAME --- */}
            <div className="absolute inset-10 border border-white/5 rounded-[6rem] pointer-events-none z-50 p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start opacity-30">
                     <div className="space-y-2">
                         <div className="text-[10px] text-sahara-gold font-black tracking-widest robotic-digits uppercase">NAFEER_CINEMATIC_v6.0</div>
                         <div className="text-[7px] text-gray-500 uppercase">Status: Broadcasting_Giza_Node</div>
                     </div>
                     <div className="text-right">
                         <Zap className="w-5 h-5 text-sahara-gold ml-auto mb-2 animate-pulse" />
                         <div className="text-[7px] text-gray-600 robotic-digits tracking-[1em]">IMPERIAL_SYNC</div>
                     </div>
                </div>
                <div className="flex justify-between items-end opacity-20">
                     <div className="flex gap-4">
                         <div className="w-8 h-1 bg-sahara-gold/20" />
                         <div className="w-8 h-1 bg-blue-500/20" />
                         <div className="w-8 h-1 bg-sahara-gold/20" />
                     </div>
                     <div className="text-[6px] tracking-[2em] text-white/50 uppercase">© 2026_EL_NAFEER_GLOBAL_PLATFORM</div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0); }
                    50% { transform: translateY(-30px) rotate(3deg); }
                }
                .robotic-digits {
                    font-family: 'Courier New', Courier, monospace;
                    letter-spacing: 0.15rem;
                }
            `}</style>
        </div>
    )
}
