'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Radio, Play, ShieldCheck, Zap } from 'lucide-react'

export default function AdV2CinematicPreview() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [step, setStep] = useState(0) // 0: Idle/Start, 1: Intro, 2: Eagle Flight, 3: Contact signals, 4: Final Hub
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

    const script = "الان من قلب مصر من الجيزه حدايق الاهرام تدشن شركة ليفر الرائده للمصاعد مقرها الجديد للتواصل اضغط علي الايقونات واتساب او الاتصال او الموقع و للتواصل مع المنصه النفير العالميه للاعلان اضغط علي صقر النفير"

    const startSequence = () => {
        setIsPlaying(true)
        setStep(1)
        
        // Voiceover Protocol
        if (synth) {
            synth.cancel() // Stop any previous speech
            const utterance = new SpeechSynthesisUtterance(script)
            utterance.lang = 'ar-EG'
            utterance.rate = 0.9
            utterance.pitch = 1.1
            synth.speak(utterance)
        }

        // Timeline Management
        setTimeout(() => setStep(2), 5000)  // Eagle Descends
        setTimeout(() => setStep(3), 15000) // Call Icons Pulse
        setTimeout(() => setStep(4), 25000) // Platform Node Lock
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-0 m-0 overflow-hidden relative font-sans">
            
            {/* --- BACKGROUND LAYER: NEURAL GIZA --- */}
            <div className="absolute inset-0 z-0">
                <motion.div 
                    initial={{ scale: 1.2, opacity: 0.3 }}
                    animate={isPlaying ? { scale: 1, opacity: 0.6 } : {}}
                    transition={{ duration: 30, ease: "linear" }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale-[60%] brightness-[40%]"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=2000')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                
                {/* Neural Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div 
                            key={i}
                            animate={{ 
                                y: [-20, -1000], 
                                opacity: [0, 0.5, 0],
                                x: [0, (Math.random() - 0.5) * 200]
                            }}
                            transition={{ 
                                duration: 10 + Math.random() * 20, 
                                repeat: Infinity,
                                delay: Math.random() * 10
                            }}
                            className="absolute w-1 h-1 bg-sahara-gold rounded-full"
                            style={{ 
                                bottom: `${Math.random() * 20}%`, 
                                left: `${Math.random() * 100}%` 
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* --- START OVERLAY (Chrome Block Bypass) --- */}
            <AnimatePresence>
                {step === 0 && (
                    <motion.div 
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
                    >
                        <div className="text-center space-y-6 max-w-md px-6">
                            <motion.div 
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-24 h-24 bg-sahara-gold rounded-full mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)]"
                            >
                                <Play className="w-10 h-10 text-black fill-current ml-1" />
                            </motion.div>
                            <h2 className="text-sahara-gold font-black tracking-[0.3em] uppercase text-sm robotic-digits">Initiate Cinematic Sequence</h2>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-loose">
                                {isArabic ? "اضغط لبدء تجربة الإعلان السينمائي المتكامل" : "CLICK TO START EL NAFEER CINEMATIC EXPERIENCE"}
                            </p>
                            <button 
                                onClick={startSequence}
                                className="px-10 py-4 bg-white text-black font-black uppercase tracking-tighter hover:bg-sahara-gold transition-colors rounded-full text-xs"
                            >
                                {isArabic ? "ابدأ الآن" : "START NOW"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- MAIN AD CANVAS --- */}
            <motion.div 
                animate={isPlaying ? { 
                    scale: [1, 1.15, 1.2],
                    y: [0, -20, -50]
                } : {}}
                transition={{ duration: 30, ease: "easeInOut" }}
                className="relative w-full max-w-[850px] aspect-square z-10 shadow-[0_0_100px_rgba(0,0,0,1)] rounded-[3.5rem] overflow-hidden"
            >
                {/* The Ad Creative */}
                <NextImage 
                    src="/campaigns/lever-pioneer/ad-v2.png" 
                    alt="Lever Pioneer Ad v2" 
                    fill
                    className="object-contain"
                    priority
                />

                {/* --- HUD & SCANNER --- */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <motion.div 
                        animate={{ y: [0, 800, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-[2px] bg-sahara-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                    />
                </div>

                {/* --- THE EL NAFEER EAGLE (Cinematic Layer) --- */}
                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div 
                            initial={{ top: "-20%", left: "50%", scale: 2, opacity: 0 }}
                            animate={
                                step === 2 ? { top: "15%", left: "15%", scale: 1, opacity: 1 } :
                                step === 3 ? { top: "60%", left: "15%", scale: 1.2, opacity: 1 } :
                                { top: "70%", left: "70%", scale: 1.5, opacity: 1 }
                            }
                            transition={{ duration: 3, ease: "backOut" }}
                            className="absolute z-[60] pointer-events-none"
                        >
                            {/* Eagle Visual Representative (Eagle Silhouette) */}
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <motion.div 
                                    animate={{ 
                                        rotateY: [0, 180, 0],
                                        scale: [1, 1.1, 1] 
                                    }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-24 h-24 text-sahara-gold fill-current drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]">
                                        <path d="M12 2L9 9H2L7 14L5 21L12 17L19 21L17 14L22 9H15L12 2Z" />
                                    </svg>
                                </motion.div>
                                <motion.div 
                                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -inset-4 border border-sahara-gold rounded-full"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- INTERACTIVE PULSES (Sequential Activation) --- */}
                
                {/* WhatsApp Signal */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={step >= 2 ? { opacity: 1 } : {}}
                    className="absolute top-[8%] left-[7%] w-[35%] h-[35%] z-40 group"
                >
                    <a href="https://wa.me/201111171368" target="_blank" className="block w-full h-full relative cursor-pointer">
                        <span className="absolute inset-4 rounded-full border border-green-500/40 animate-ping" />
                        <span className="absolute inset-8 rounded-full bg-green-500/5 animate-pulse" />
                    </a>
                </motion.div>

                {/* Location Signal */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={step >= 2 ? { opacity: 1 } : {}}
                    className="absolute top-[8%] right-[7%] w-[35%] h-[35%] z-40 group"
                >
                    <a href="https://www.google.com/maps?q=29.9656242,31.0922895" target="_blank" className="block w-full h-full relative cursor-pointer">
                        <span className="absolute inset-8 rounded-full border border-sahara-gold/40 animate-ping" />
                        <span className="absolute inset-12 rounded-full bg-sahara-gold/5 animate-pulse" />
                    </a>
                </motion.div>

                {/* Lever Direct Call */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={step >= 3 ? { opacity: 1 } : {}}
                    className="absolute bottom-[22%] left-[7%] w-[35%] h-[28%] z-40 group"
                >
                    <a href="tel:+201070615372" className="block w-full h-full relative cursor-pointer">
                        <span className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
                        <span className="absolute inset-4 rounded-full bg-white/5 animate-pulse" />
                    </a>
                </motion.div>

                {/* --- EL NAFEER GLOBAL CALL (Clickable Eagle Icon) --- */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={step >= 4 ? { opacity: 1, scale: 1 } : {}}
                    className="absolute bottom-[5%] right-[5%] w-[45%] h-[20%] z-[70] group"
                >
                    <a 
                        href="tel:01065661882" 
                        className="block w-full h-full bg-black/40 backdrop-blur-md rounded-3xl border border-sahara-gold/30 hover:bg-sahara-gold/20 transition-all cursor-pointer relative overflow-hidden p-4"
                    >
                        <div className="flex items-center gap-4 h-full">
                            <div className="bg-sahara-gold p-2 rounded-xl">
                                <Phone className="w-5 h-5 text-black" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-sahara-gold font-black uppercase tracking-widest">{isArabic ? "اتصل بـ النفير" : "CALL EL NAFEER"}</span>
                                <span className="text-white font-black text-sm robotic-digits">01065661882</span>
                            </div>
                        </div>
                        <motion.div 
                            animate={{ x: [-200, 400] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        />
                    </a>
                </motion.div>

                {/* Cinematic Caption Overlay */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={isPlaying ? { opacity: 1, y: 0 } : {}}
                    className="absolute top-10 left-0 w-full z-40 text-center pointer-events-none px-20"
                >
                    <div className="inline-block bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                        <span className="text-[10px] text-sahara-gold font-black uppercase tracking-[0.5em] animate-pulse">
                            {step === 1 ? (isArabic ? "البداية: التمركز الجغرافي" : "INIT: GEO_POSITIONING") :
                             step === 2 ? (isArabic ? "تحليق الصقر: إشارات التواصل" : "EAGLE_FLIGHT: SIGNAL_LOCK") :
                             step === 3 ? (isArabic ? "تفعيل: قنوات الاتصال" : "ENABLE: COMMS_CHANNEL") :
                             (isArabic ? "النفير العالمية: النشر الكامل" : "EL_NAFEER_GLOBAL: FULL_SYNC")}
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            {/* --- HUD FRAME (Level 5) --- */}
            <div className="absolute inset-0 z-50 pointer-events-none p-6 sm:p-12 border-[20px] border-black">
                <div className="h-full w-full border border-white/5 rounded-[4rem] flex flex-col justify-between p-10">
                    <div className="flex justify-between items-start opacity-60">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-sahara-gold/10 rounded-lg">
                                    <Zap className="w-4 h-4 text-sahara-gold animate-pulse" />
                                </div>
                                <h1 className="text-sm font-black text-white uppercase tracking-[0.3em] robotic-digits">EL_NAFEER_CINEMATIC_v5.0</h1>
                            </div>
                            <div className="text-[8px] font-mono text-gray-500 space-y-1">
                                <p>COORD: 29.9792° N, 31.1342° E [PYRAMIDS_NODE]</p>
                                <p>BRAND: LEVER_PIONEER_ELEVATORS</p>
                            </div>
                        </div>
                        <div className="text-right space-y-2">
                             <span className="px-3 py-1 rounded-full border border-green-500/30 text-[8px] text-green-500 font-black tracking-widest uppercase">
                                {isPlaying ? "Sequencing..." : "Standby"}
                             </span>
                             <div className="text-[10px] text-gray-700 robotic-digits">BPM_SYNC: 120</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-end opacity-40">
                         <div className="flex gap-10">
                            <ShieldCheck className="w-5 h-5 text-sahara-gold" />
                            <Radio className="w-5 h-5 text-blue-500 animate-pulse" />
                         </div>
                         <div className="text-[8px] tracking-[1em] text-gray-600 font-black uppercase">
                            © 2026_EL_NAFEER_GLOBAL_PLATFORM
                         </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @font-face {
                    font-family: 'RoboticDigits';
                    src: url('https://fonts.cdnfonts.com/css/digital-numbers');
                }
                .robotic-digits {
                    font-family: 'Courier New', Courier, monospace;
                    letter-spacing: 0.2rem;
                }
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
            `}</style>
        </div>
    )
}
