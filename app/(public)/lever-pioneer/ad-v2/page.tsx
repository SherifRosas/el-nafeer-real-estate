'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Phone, MessageCircle, MapPin, Zap, Play, 
    ShieldCheck, Cpu, Radio, Globe, Crosshair, 
    Terminal, Activity, Lock, Layers, FastForward,
    CloudHail, Waves
} from 'lucide-react'

// --- IMPERIAL ULTIMA V10.2 (FULL SENSORY SYNC) ---

export default function AdV2UltimaSensoryUpdate() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    
    // Timeline States
    const [phase, setPhase] = useState<'idle' | 'descent' | 'stabilizing' | 'active'>('idle')
    const [step, setStep] = useState(0) 
    const [isNarrating, setIsNarrating] = useState(false)
    const [showRipple, setShowRipple] = useState(false)
    
    // Audio References
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    const bgMusicRef = useRef<HTMLAudioElement | null>(null)
    const sfxRef = useRef<HTMLAudioElement | null>(null)

    const script = "الآن من قلب مصر.. نطلق المرحلة القصوى. من الجيزة، حدائق الأهرام.. شركة ليفر الرائدة للمصاعد تبدأ التحليق الكامل. سيطر على تجربتك من خلال أيقونات التواصل، وارتبط بمنصة النفير العالمية عبر صقر النفير الرقمي. النظام جاهز للتحليق."

    // --- SENSORY TRIGGER: START ---
    const startUltimaSequence = () => {
        // 1. Haptic Feedback (Tactile Start)
        if (typeof window !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([100, 50, 200]) // Tactical "Thump"
        }

        setPhase('descent')
        
        // 2. Play Cinematic Score (Music)
        // Note: Using a public cinematic loop for demonstration
        if (bgMusicRef.current) {
            bgMusicRef.current.volume = 0.3
            bgMusicRef.current.play().catch(() => console.log('Music blocked by browser - Click to bypass'))
        }

        // --- Timeline Management ---
        setTimeout(() => setPhase('stabilizing'), 4000)
        setTimeout(() => {
            setPhase('active')
            setStep(1)
            triggerVoiceover()
        }, 8000)
        
        // Eagle Transitions with Ripples
        setTimeout(() => { setStep(2); triggerRipple(); }, 12000)
        setTimeout(() => { setStep(3); triggerRipple(); }, 22000)
        setTimeout(() => { setStep(4); triggerRipple(); }, 28000)
    }

    const triggerRipple = () => {
        setShowRipple(true)
        if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(50)
        setTimeout(() => setShowRipple(false), 1000)
    }

    const triggerVoiceover = () => {
        if (synth) {
            synth.cancel()
            const utterance = new SpeechSynthesisUtterance(script)
            utterance.lang = 'ar-EG'
            utterance.rate = 0.85
            synth.speak(utterance)
            setIsNarrating(true)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-0 m-0 overflow-hidden relative cursor-crosshair font-sans select-none">
            
            {/* AUDIO NODES */}
            <audio ref={bgMusicRef} loop src="https://assets.mixkit.co/music/preview/mixkit-sci-fi-drone-ambience-925.mp3" />
            
            {/* --- 1. GLOBAL DESCENT LAYER --- */}
            <AnimatePresence>
                {phase === 'descent' && (
                    <motion.div 
                        initial={{ scale: 50, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 4, ease: "circIn" }}
                        className="absolute inset-0 z-[200] bg-black flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.4]" />
                        <div className="relative z-10 flex flex-col items-center gap-6">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-96 h-96 border border-sahara-gold/40 rounded-full flex items-center justify-center border-dashed" />
                            <Globe className="absolute w-20 h-20 text-sahara-gold animate-pulse" />
                            <h2 className="text-white font-black text-2xl tracking-[1.5em] robotic-digits">DESCENDING_GIZA_NODE</h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 2. STABILIZATION GRID --- */}
            <AnimatePresence>
                {phase === 'stabilizing' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[150] bg-black flex flex-col items-center justify-center"
                    >
                        <div className="w-full max-w-4xl space-y-12 px-12">
                            <div className="flex justify-between items-center text-sahara-gold font-mono text-xs">
                                <span className="animate-pulse">_SENSORY_CALIBRATION_ACTIVE_</span>
                                <span>PHASE: ALPHA_ULTIMA</span>
                            </div>
                            <div className="h-[2px] w-full bg-zinc-900 overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 4 }} className="h-full bg-sahara-gold" />
                            </div>
                            <div className="flex justify-center gap-20">
                                <Waves className="w-10 h-10 text-sahara-gold/20 animate-bounce" />
                                <CloudHail className="w-10 h-10 text-sahara-gold/20 animate-bounce delay-100" />
                                <Activity className="w-10 h-10 text-sahara-gold/20 animate-bounce delay-200" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 3. ACTIVE IMPERIAL SIMULATION --- */}
            <div className={`relative w-full h-screen transition-opacity duration-1000 ${phase === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                
                {/* --- BACKGROUND: GIZA NEURAL --- */}
                <div className="absolute inset-0 z-0">
                    <motion.div animate={{ scale: [1.05, 1], filter: ['brightness(0.3)', 'brightness(0.2)'] }} transition={{ duration: 20, repeat: Infinity }} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
                    
                    {/* GOD RAYS FX */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-br from-sahara-gold/40 via-transparent to-transparent mix-blend-screen" />
                    <motion.div 
                        animate={{ x: [-100, 100], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(212,175,55,0.4)_50%,transparent_60%)] bg-[length:200%_100%]"
                    />
                </div>

                {/* --- THE SHOCKWAVE LAYER --- */}
                <AnimatePresence>
                    {showRipple && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 4, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute z-50 pointer-events-none inset-0 flex items-center justify-center"
                        >
                            <div className="w-[800px] h-[800px] border-[50px] border-sahara-gold/30 rounded-full blur-xl" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- THE HOLOGRAPHIC ASSISTANT (AI Node) --- */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
                    <motion.div 
                         animate={{ y: [0, -20, 0] }}
                         transition={{ duration: 4, repeat: Infinity }}
                         className="relative w-40 h-64 border-l-2 border-sahara-gold/20 flex flex-col justify-end p-6 gap-4"
                    >
                        <div className="w-12 h-12 bg-sahara-gold/10 rounded-full flex items-center justify-center border border-sahara-gold/40">
                             <Cpu className="w-5 h-5 text-sahara-gold animate-spin-slow" />
                        </div>
                        <div className="space-y-1 font-mono text-[8px] text-sahara-gold/60">
                            <p className="font-black text-[10px] text-sahara-gold">_AI_ASSISTANT_</p>
                            <p>MODE: BROADCASTING</p>
                            <p>VOICE: ENABLED_EG</p>
                        </div>
                        <div className="flex gap-1 h-8 items-end">
                            {[...Array(8)].map((_, i) => (
                                <motion.div 
                                    key={i} 
                                    animate={{ height: [4, 16, 8, 20, 4] }}
                                    transition={{ duration: 1 + Math.random(), repeat: Infinity }}
                                    className="w-1 bg-sahara-gold" 
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* --- CENTRAL CANVAS --- */}
                <div className="absolute inset-0 flex items-center justify-center p-20 z-10 perspective-1000">
                    <motion.div 
                        animate={{ rotateX: [0, 1, -1, 0], rotateY: [0, -1, 1, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="relative w-full max-w-[800px] aspect-square rounded-[4rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.8)]"
                    >
                        <NextImage src="/campaigns/lever-pioneer/ad-v2.png" alt="Ad v2" fill className="object-cover" priority />

                        {/* THE EAGLE (Ultima Path) */}
                        <AnimatePresence>
                            {step >= 1 && (
                                <motion.div 
                                    initial={{ top: "-30%", left: "50%", scale: 0.5, opacity: 0 }}
                                    animate={
                                        step === 1 ? { top: "15%", left: "15%", scale: 1.2, opacity: 1 } :
                                        step === 2 ? { top: "12%", left: "75%", scale: 1.4, opacity: 1 } :
                                        step === 3 ? { top: "42%", left: "22%", scale: 1.1, opacity: 1 } :
                                        { top: "70%", left: "72%", scale: 1.8, opacity: 1 }
                                    }
                                    transition={{ duration: 4, type: "spring", stiffness: 30 }}
                                    className="absolute z-[100] pointer-events-none drop-shadow-[0_0_40px_rgba(212,175,55,1)]"
                                >
                                    <div className="relative w-36 h-36">
                                        <NextImage src="/logos/logo-en.png" alt="Eagle" fill className="object-contain animate-float" />
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                            <span className="text-[8px] text-sahara-gold font-black uppercase tracking-[0.5em]">{isArabic ? "صقر النفير الرقمي" : "CORE_NAFEER_EAGLE"}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* SIGNALS */}
                        <motion.div initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} className="absolute inset-0 z-40 pointer-events-none">
                            <div className="absolute top-[8%] left-[7%] w-[35%] h-[35%] cursor-pointer pointer-events-auto">
                                <a href="https://wa.me/201111171368" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Contact" className="block w-full h-full relative">
                                    <motion.div animate={{ scale: [1, 2, 1], opacity: [0.1, 0.4, 0.1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-4 rounded-full border-4 border-green-500" />
                                    <MessageCircle className="absolute top-[35%] left-[35%] w-8 h-8 text-green-500 drop-shadow-xl" />
                                </a>
                            </div>
                            <div className="absolute top-[8%] right-[7%] w-[35%] h-[35%] cursor-pointer pointer-events-auto">
                                <a href="https://www.google.com/maps?q=29.9656242,31.0922895" target="_blank" rel="noopener noreferrer" aria-label="Google Maps Location" className="block w-full h-full relative">
                                    <motion.div animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute inset-8 rounded-full border-4 border-sahara-gold" />
                                    <MapPin className="absolute top-[30%] right-[30%] w-8 h-8 text-sahara-gold drop-shadow-xl" />
                                </a>
                            </div>
                        </motion.div>

                        {/* GLOBAL NODE */}
                        <motion.div initial={{ opacity: 0, x: 200 }} animate={step >= 4 ? { opacity: 1, x: 0 } : {}} className="absolute bottom-[5%] right-[5%] w-[58%] h-[24%] z-[150]">
                            <a href="tel:01065661882" aria-label="Call El Nafeer Global" className="block w-full h-full bg-black/80 backdrop-blur-3xl border-2 border-sahara-gold rounded-[3rem] p-8 hover:bg-sahara-gold/10 transition-all cursor-pointer group shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden">
                                <div className="flex items-center gap-8 h-full relative z-20">
                                    <div className="p-5 bg-sahara-gold rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.7)] group-hover:scale-110 transition-transform">
                                        <Phone className="w-8 h-8 text-black" />
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[14px] text-sahara-gold font-black uppercase tracking-[0.5em] block">{isArabic ? "منصة النفير العالمية" : "NAFEER_GLOBAL_SIM"}</span>
                                        <span className="text-white font-black text-3xl tracking-tighter robotic-digits">01065661882</span>
                                    </div>
                                </div>
                                <motion.div animate={{ left: ["-100%", "300%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute top-0 h-full w-40 bg-gradient-to-r from-transparent via-sahara-gold/30 to-transparent skew-x-30" />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* HUD FRAME: ULTIMA COMMAND */}
                <div className="absolute inset-10 border border-white/10 rounded-[6rem] pointer-events-none z-50 p-16 flex flex-col justify-between">
                     <div className="flex justify-between text-sahara-gold opacity-50 font-black tracking-widest text-[9px]">
                         <div className="flex gap-4 items-center">
                              <Zap className="w-4 h-4 animate-pulse" />
                              <span>LEVEL_10_ULTIMA_BROADCAST // SIM_01</span>
                         </div>
                         <div className="flex gap-10">
                              <span>COORD: 29.98N 31.13E</span>
                               <Radio className="w-4 h-4 animate-pulse text-red-600" />
                         </div>
                     </div>
                     <div className="flex justify-between items-end opacity-20">
                         <div className="flex flex-col gap-2">
                             <div className="w-40 h-1 bg-sahara-gold/40" />
                             <div className="w-60 h-[1px] bg-sahara-gold/20" />
                         </div>
                         <div className="text-[7px] text-white tracking-[1.5em] italic">© TACTICAL_MARKETING_EL_NAFEER_2026</div>
                     </div>
                </div>
            </div>

            {/* INITIAL START OVERLAY */}
            {phase === 'idle' && (
                <div className="absolute inset-0 z-[300] bg-black flex flex-col items-center justify-center gap-12 text-center p-10">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={startUltimaSequence}
                        className="group relative cursor-pointer"
                    >
                        <div className="w-48 h-48 bg-sahara-gold rounded-full flex items-center justify-center shadow-[0_0_120px_rgba(212,175,55,0.5)] group-hover:scale-110 transition-transform">
                             <Play className="w-16 h-16 text-black fill-current ml-2" />
                        </div>
                        <motion.div animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 border-4 border-sahara-gold rounded-full" />
                    </motion.div>
                    <div className="space-y-4">
                        <h1 className="text-white font-black text-4xl tracking-tighter uppercase">{isArabic ? "محاكاة النفير: المرحلة النهائية" : "EL NAFEER: ULTIMA SIMULATION"}</h1>
                        <p className="text-sahara-gold font-mono text-xs tracking-[0.5em] animate-pulse">{isArabic ? "اضغط لتفعيل تجربة الحواس المتكاملة" : "ACTIVATE MULTI-SENSORY BROADCAST"}</p>
                        <div className="flex justify-center gap-6 pt-6 opacity-40">
                             <Waves className="w-6 h-6 text-white" />
                             <Zap className="w-6 h-6 text-white" />
                             <Globe className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .robotic-digits {
                    font-family: 'Courier New', Courier, monospace;
                    letter-spacing: 0.1rem;
                }
                .perspective-1000 { perspective: 1000px; }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0); }
                    50% { transform: translateY(-40px) rotate(3deg); }
                }
                .animate-float { animation: float 5s ease-in-out infinite; }
                .animate-spin-slow { animation: spin 10s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    )
}
