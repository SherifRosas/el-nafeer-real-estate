'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Zap, Play, ShieldAlert, Cpu } from 'lucide-react'

export default function AdV2CinematicExperience() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [step, setStep] = useState(0) // 0: Start, 1: Intro/Pyramids, 2: Eagle Sync, 3: Signal Lock, 4: Platform Connect
    const [isPlaying, setIsPlaying] = useState(false)
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

    const script = "الآن من قلب مصر.. من الجيزة، حدائق الأهرام.. تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل، اضغط على الأيقونات: واتساب، أو الاتصال، أو الموقع. وللتواصل مع منصة النفير العالمية للإعلان، اضغط على صقر النفير."

    const startSequence = () => {
        setIsPlaying(true)
        setStep(1)
        
        // --- Neural Voiceover Sequence ---
        if (synth) {
            synth.cancel()
            const utterance = new SpeechSynthesisUtterance(script)
            utterance.lang = 'ar-EG'
            utterance.rate = 0.85
            utterance.pitch = 1.0
            synth.speak(utterance)
        }

        // --- Cinematic Timeline ---
        setTimeout(() => setStep(2), 6000)  // Eagle Takes Flight
        setTimeout(() => setStep(3), 16000) // Signal Hotspots Active
        setTimeout(() => setStep(4), 26000) // Platform Lock-on
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-0 m-0 overflow-hidden relative cursor-none select-none">
            
            {/* --- LUXURY BACKGROUND: GIZA NEURAL NODE --- */}
            <div className="absolute inset-0 z-0 opacity-40">
                <motion.div 
                    initial={{ scale: 1.3 }}
                    animate={isPlaying ? { scale: 1.1 } : {}}
                    transition={{ duration: 40, ease: "linear" }}
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* --- INITIATION OVERLAY --- */}
            <AnimatePresence>
                {step === 0 && (
                    <motion.div 
                        exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                        className="absolute inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
                    >
                        <div className="text-center space-y-12 px-6">
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={startSequence}
                                className="w-32 h-32 bg-sahara-gold rounded-full mx-auto flex items-center justify-center cursor-pointer shadow-[0_0_80px_rgba(212,175,55,0.4)] transition-all group"
                            >
                                <Play className="w-12 h-12 text-black fill-current ml-2 group-hover:scale-125 transition-transform" />
                            </motion.div>
                            <div className="space-y-4">
                                <h2 className="text-sahara-gold font-black tracking-[0.5em] uppercase text-sm animate-pulse">EL_NAFEER_SYSTEM_INIT</h2>
                                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                                    {isArabic ? "اضغط لتفعيل تجربة الصقر السينمائية للمصاعد" : "INITIATE EAGLE CINEMATIC SEQUENCE"}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- CINEMATIC CANVAS --- */}
            <div className="relative w-full max-w-[900px] aspect-square z-10">
                
                {/* 3D PERSPECTIVE AD WRAPPER */}
                <motion.div 
                    animate={isPlaying ? { 
                        scale: [1, 1.15, 1.1],
                        rotateX: [0, 2, 0],
                        y: [0, -40, 0]
                    } : {}}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full shadow-[0_0_150px_rgba(0,0,0,1)] rounded-[4rem] overflow-hidden"
                >
                    <NextImage 
                        src="/campaigns/lever-pioneer/ad-v2.png" 
                        alt="Lever Pioneer Ad v2" 
                        fill
                        className="object-contain"
                        priority
                    />

                    {/* --- LIGHTNING & NEON EFFECTS --- */}
                    <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay">
                        <motion.div 
                            animate={{ opacity: [0, 0.4, 0] }}
                            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
                            className="absolute inset-0 bg-white/20"
                        />
                    </div>

                    {/* --- THE EL NAFEER EAGLE (Cinematic Master) --- */}
                    <AnimatePresence>
                        {step >= 2 && (
                            <motion.div 
                                initial={{ top: "-30%", left: "50%", scale: 3, rotate: 45, opacity: 0 }}
                                animate={
                                    step === 2 ? { top: "15%", left: "20%", scale: 1.2, rotate: 0, opacity: 1 } :
                                    step === 3 ? { top: "45%", left: "25%", scale: 1.0, rotate: -5, opacity: 1 } :
                                    { top: "72%", left: "75%", scale: 1.4, rotate: 0, opacity: 1 }
                                }
                                transition={{ duration: 4, type: "spring", stiffness: 30 }}
                                className="absolute z-[80] pointer-events-none drop-shadow-[0_0_30px_rgba(212,175,55,1)]"
                            >
                                {/* EAGLE ICON SYMBOL ( صقر النفير ) */}
                                <div className="relative">
                                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L13.5 7.5L19 9L13.5 10.5L12 16L10.5 10.5L5 9L10.5 7.5L12 2Z" fill="#D4AF37" />
                                        <path d="M12 1L8 12L12 23L16 12L12 1Z" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5" />
                                        <motion.path 
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            d="M12 2L12 16M5 9L19 9" stroke="white" strokeWidth="0.5" 
                                        />
                                    </svg>
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                        <span className="text-[7px] text-sahara-gold font-black uppercase tracking-widest">{isArabic ? "صقر النفير" : "EAGLE_NAFEER"}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* --- CONTACT BEACONS --- */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={step >= 2 ? { opacity: 1 } : {}}
                        className="absolute top-[8%] left-[7%] w-[35%] h-[35%] z-40"
                    >
                        <a href="https://wa.me/201111171368" target="_blank" className="block w-full h-full relative cursor-pointer">
                            <motion.span animate={{ scale: [1, 1.5, 1], opacity: [0, 0.4, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-4 rounded-full border-2 border-green-500" />
                            <MessageCircle className="absolute top-[35%] left-[35%] w-6 h-6 text-green-500/40" />
                        </a>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={step >= 2 ? { opacity: 1 } : {}}
                        className="absolute top-[8%] right-[7%] w-[35%] h-[35%] z-40"
                    >
                        <a href="https://www.google.com/maps?q=29.9656242,31.0922895" target="_blank" className="block w-full h-full relative cursor-pointer">
                            <motion.span animate={{ scale: [1, 2, 1], opacity: [0, 0.3, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute inset-8 rounded-full border-2 border-sahara-gold" />
                            <MapPin className="absolute top-[30%] right-[30%] w-6 h-6 text-sahara-gold/40" />
                        </a>
                    </motion.div>

                    {/* --- EL NAFEER GLOBAL LOCKUP --- */}
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={step >= 4 ? { opacity: 1, x: 0 } : {}}
                        className="absolute bottom-[5%] right-[5%] w-[48%] h-[22%] z-[90]"
                    >
                        <a 
                            href="tel:01065661882" 
                            className="block w-full h-full bg-black/60 backdrop-blur-xl border-2 border-sahara-gold/40 rounded-[2.5rem] p-6 hover:bg-sahara-gold/10 transition-all cursor-pointer group overflow-hidden"
                        >
                            <div className="flex items-center gap-6 h-full relative z-10">
                                <div className="bg-sahara-gold p-3 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                                    <Phone className="w-6 h-6 text-black group-hover:rotate-12 transition-transform" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] text-sahara-gold font-black uppercase tracking-[0.3em]">{isArabic ? "نفير العالمية" : "EL_NAFEER_GLOBAL"}</span>
                                    <span className="text-white font-black text-xl tracking-tighter robotic-digits">01065661882</span>
                                </div>
                            </div>
                            {/* Scanning Sweep */}
                            <motion.div 
                                animate={{ left: ["-100%", "200%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                            />
                        </a>
                    </motion.div>
                </motion.div>

                {/* --- CINEMATIC TEXT BANNER --- */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={isPlaying ? { opacity: 1, y: 0 } : {}}
                    className="absolute top-12 left-0 w-full z-50 flex justify-center pointer-events-none"
                >
                    <div className="bg-black/80 backdrop-blur-lg px-8 py-3 border border-white/10 rounded-full flex items-center gap-4">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                        <span className="text-[9px] text-white font-black tracking-[0.6em] uppercase">
                            {step === 1 ? (isArabic ? "الموقع: الجيزة - حدائق الأهرام" : "TARGET: GIZA_HADAYEK_AHRAM") :
                             step === 2 ? (isArabic ? "تحليق الصقر: تفعيل الروابط" : "EAGLE_SYNC: SIGNAL_ACTIVE") :
                             step === 3 ? (isArabic ? "ليفر الرائدة: المصاعد الذكية" : "BRAND_LOCK: LEVER_PIONEER") :
                             (isArabic ? "النفير العالمية: النشر الكامل" : "NAFEER_GLOBAL: FULL_SYNC")}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* --- HUD FRAME DECORATION --- */}
            <div className="absolute inset-x-8 inset-y-12 border-[2px] border-white/5 rounded-[5rem] pointer-events-none z-50">
                <div className="absolute top-10 left-10 flex flex-col gap-1 opacity-20">
                    <div className="text-[8px] text-sahara-gold font-mono tracking-widest uppercase">Network_Protocol_v5.5</div>
                    <div className="w-32 h-[1px] bg-sahara-gold/40" />
                </div>
                <div className="absolute bottom-10 right-10 opacity-20 text-right">
                    <Cpu className="w-6 h-6 text-sahara-gold ml-auto mb-2" />
                    <div className="text-[8px] text-white font-mono tracking-widest uppercase italic">Design by Antigravity AI</div>
                </div>
            </div>

            <style jsx global>{`
                .robotic-digits {
                    font-family: 'Courier New', Courier, monospace;
                    letter-spacing: 0.1rem;
                    font-feature-settings: 'tnum';
                }
            `}</style>
        </div>
    )
}
