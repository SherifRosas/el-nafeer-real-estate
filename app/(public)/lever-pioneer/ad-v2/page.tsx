'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Phone, MessageCircle, MapPin, Zap, Play, 
    ShieldCheck, Cpu, Radio, Globe, Crosshair, 
    Terminal, Activity, Lock, Layers, FastForward,
    CloudHail, Waves, Box
} from 'lucide-react'

// --- IMPERIAL KINETIC CINEMA V12.8 (FINAL REVISION) ---

export default function AdV2UltimaKineticCinema() {
    const { language } = useLanguage()
    
    // Timeline States
    const [phase, setPhase] = useState<'idle' | 'descent' | 'stabilizing' | 'active'>('idle')
    const [step, setStep] = useState(0) 
    const [isNarrating, setIsNarrating] = useState(false)
    const [showRipple, setShowRipple] = useState(false)
    
    // Audio References
    const bgMusicRef = useRef<HTMLAudioElement | null>(null)

    // --- INITIALIZATION (AUTOPLAY PROTOCOL) ---
    useEffect(() => {
        const timer = setTimeout(() => {
            startUltimaSequence()
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    const startUltimaSequence = () => {
        // 1. Haptic Feedback
        if (typeof window !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([50, 50, 50]) 
        }

        setPhase('descent')
        
        // 2. Play Cinematic Score
        if (bgMusicRef.current) {
            bgMusicRef.current.volume = 0.3
            bgMusicRef.current.play().catch(() => console.log('Autoplay audio requires interaction in some browsers.'))
        }

        // --- Cinematic Timeline ---
        setTimeout(() => setPhase('stabilizing'), 3000)
        setTimeout(() => {
            setPhase('active')
            setStep(1)
            const msg = "شركة ليفر الرائدة للمصاعد تهنئكم بحلول عيد الفطر المبارك بمناسبة تدشين مقرها الجديد من قلب مصر من الجيزة حدائق الاهرام للتواصل أضغط على الأيقونات"
            speak(msg)
        }, 6000)
        
        // Final Node Activations
        setTimeout(() => setStep(2), 8000)
        setTimeout(() => setStep(3), 10000)
        setTimeout(() => setStep(4), 13000)
    }

    const speak = (text: string) => {
        if (typeof window === 'undefined') return
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'ar-EG' // Egyptian Arabic
        utterance.pitch = 1.05
        utterance.rate = 0.9
        window.speechSynthesis.speak(utterance)
        setIsNarrating(true)
        utterance.onend = () => setIsNarrating(false)
    }

    const triggerRipple = () => {
        setShowRipple(true)
        setTimeout(() => setShowRipple(false), 1000)
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-0 m-0 overflow-hidden relative cursor-crosshair font-sans select-none noise-overlay">
            <div className="scanline" />
            
            {/* AUDIO NODE */}
            <audio ref={bgMusicRef} loop src="https://assets.mixkit.co/music/preview/mixkit-sci-fi-drone-ambience-925.mp3" />
            
            {/* --- 1. GLOBAL DESCENT LAYER --- */}
            <AnimatePresence>
                {phase === 'descent' && (
                    <motion.div 
                        initial={{ scale: 20, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 3, ease: "circIn" }}
                        className="absolute inset-0 z-[200] bg-black flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.3]" />
                        <div className="relative z-10 flex flex-col items-center gap-6">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-96 h-96 border border-cyan-500/40 rounded-full flex items-center justify-center border-dashed" />
                            <Globe className="absolute w-20 h-20 text-cyan-400 animate-pulse" />
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
                            <div className="flex justify-between items-center text-cyan-400 font-mono text-xs">
                                <span className="animate-pulse">_SENSORY_CALIBRATION_ACTIVE_</span>
                                <span>PHASE: KINETIC_CINEMA_v12.8</span>
                            </div>
                            <div className="h-[4px] w-full bg-zinc-900 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: "100%" }} 
                                    transition={{ duration: 3 }} 
                                    className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-red-500" 
                                />
                            </div>
                            <div className="flex justify-center gap-20">
                                <Waves className="w-10 h-10 text-cyan-500/20 animate-bounce" />
                                <Activity className="w-10 h-10 text-cyan-500/20 animate-bounce delay-100" />
                                <Zap className="w-10 h-10 text-cyan-500/20 animate-bounce delay-200" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 3. ACTIVE KINETIC CINEMA --- */}
            <div className={`relative w-full h-screen transition-opacity duration-1000 ${phase === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                
                {/* --- BACKGROUND: CINEMATIC PARALLAX --- */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.div 
                        animate={{ scale: [1, 1.05], x: [-5, 5] }} 
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-[-5%] inset-y-[-5%] bg-[url('https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" 
                    />
                    
                    {/* FLOATING NEON PARTICLES */}
                    {[...Array(30)].map((_, i) => (
                        <motion.div 
                            key={`p-${i}`}
                            initial={{ x: Math.random() * 2000 - 1000, y: Math.random() * 2000 - 1000, scale: Math.random() }}
                            animate={{ 
                                y: [null, Math.random() * -500], 
                                opacity: [0, 0.6, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{ duration: 10 + Math.random() * 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-[2px]"
                            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        />
                    ))}
                    
                    <motion.div 
                        animate={{ x: [-200, 200], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(34,211,238,0.2)_50%,transparent_60%)] bg-[length:200%_100%] pointer-events-none"
                    />
                </div>

                {/* --- THE CENTRAL CINEMATIC CANVAS --- */}
                <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-20 z-10 perspective-1000">
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.15],
                            rotateX: [0, 1, -1, 0], 
                            rotateY: [0, -1, 1, 0] 
                        }}
                        transition={{ 
                            scale: { duration: 40, repeat: Infinity, ease: "linear" },
                            default: { duration: 10, repeat: Infinity }
                        }}
                        className="relative w-full max-w-[800px] aspect-square rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.9)]"
                    >
                        <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad v2 Quantum" fill className="object-cover" priority />

                        {/* --- 3D FLIPPING HUD BOXES (RESPONSIVE GRID) --- */}
                        <motion.div initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} className="absolute inset-x-0 bottom-4 lg:bottom-12 z-40 p-4 lg:p-6 pointer-events-none grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 items-end">
                            
                            {/* WHATSAPP */}
                            <motion.div 
                                animate={{ rotateY: 360 }} 
                                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                                className="h-16 lg:h-20 bg-black/60 backdrop-blur-xl border border-green-500/40 rounded-2xl flex items-center px-3 lg:px-4 gap-2 lg:gap-4 shadow-[0_0_20px_rgba(34,197,94,0.3)] pointer-events-auto cursor-pointer"
                                onClick={() => window.open('https://wa.me/201111171368', '_blank')}
                            >
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-green-500 flex items-center justify-center">
                                    <MessageCircle className="w-4 h-4 lg:w-6 lg:h-6 text-green-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] lg:text-[10px] text-green-500 font-black uppercase">WHATSAPP</span>
                                    <span className="text-[10px] lg:text-[14px] text-white font-black italic">+20 111 117</span>
                                </div>
                            </motion.div>

                            {/* CALLING */}
                            <motion.div 
                                animate={{ rotateY: 360 }} 
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="h-16 lg:h-20 bg-black/60 backdrop-blur-xl border border-cyan-400/40 rounded-2xl flex items-center px-3 lg:px-4 gap-2 lg:gap-4 shadow-[0_0_20px_rgba(34,211,238,0.3)] pointer-events-auto cursor-pointer"
                                onClick={() => window.open('tel:19XXX', '_self')}
                            >
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-cyan-400 flex items-center justify-center">
                                    <Phone className="w-4 h-4 lg:w-6 lg:h-6 text-cyan-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] lg:text-[10px] text-cyan-400 font-black uppercase">CALL_US</span>
                                    <span className="text-[10px] lg:text-[14px] text-white font-black italic">19XXX</span>
                                </div>
                            </motion.div>

                            {/* LOCATION */}
                            <motion.div 
                                animate={{ rotateY: 360 }} 
                                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                                className="h-16 lg:h-20 bg-black/60 backdrop-blur-xl border border-sahara-gold/40 rounded-2xl flex items-center px-3 lg:px-4 gap-2 lg:gap-4 shadow-[0_0_20px_rgba(212,175,55,0.3)] pointer-events-auto cursor-pointer"
                                onClick={() => window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank')}
                            >
                                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-sahara-gold flex items-center justify-center">
                                    <MapPin className="w-4 h-4 lg:w-6 lg:h-6 text-sahara-gold" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] lg:text-[10px] text-sahara-gold font-black uppercase">LOCATION</span>
                                    <span className="text-[10px] lg:text-[14px] text-white font-black italic">GIZA_SAINT</span>
                                </div>
                            </motion.div>

                            {/* EL NAFEER GLOBAL (EAGLE & RED NODE) */}
                            <motion.div 
                                animate={{ rotateY: 360 }} 
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="h-16 lg:h-20 bg-black/80 backdrop-blur-3xl border border-red-500/60 rounded-2xl flex items-center px-3 lg:px-4 gap-2 lg:gap-4 shadow-[0_0_40px_rgba(239,68,68,0.4)] pointer-events-auto"
                            >
                                <div className="w-10 h-10 lg:w-12 lg:h-12 relative">
                                    <NextImage src="/logos/logo-en.png" alt="El Nafeer" fill className="object-contain" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[7px] lg:text-[9px] text-red-500 font-black">منصة النفير العالمية</span>
                                        <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                                    </div>
                                    <span className="text-[9px] lg:text-[11px] text-white font-black leading-none uppercase">ADVERTISING</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* FINAL GLOBAL CALL ACTION */}
                        <motion.div initial={{ opacity: 0, y: 100 }} animate={step >= 4 ? { opacity: 1, y: 0 } : {}} className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[40%] z-[150] pointer-events-auto hidden lg:flex">
                             <a href="tel:01065661882" className="block w-full h-full bg-black/95 backdrop-blur-3xl border-2 border-sahara-gold rounded-[4rem] p-12 hover:bg-sahara-gold/10 transition-all cursor-pointer group shadow-[0_0_200px_rgba(0,0,0,1)] relative overflow-hidden">
                                <div className="flex items-center gap-12 h-full relative z-20">
                                    <div className="p-10 bg-sahara-gold rounded-[2rem] shadow-[0_0_100px_rgba(212,175,55,0.8)] group-hover:scale-110 transition-transform">
                                        <motion.div animate={{ rotateY: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                                            <Phone className="w-16 h-16 text-black" />
                                        </motion.div>
                                    </div>
                                    <div className="space-y-4">
                                        <span className="text-[20px] text-sahara-gold font-black uppercase tracking-[0.5em] block">NAFEER_GLOBAL_SIM</span>
                                        <span className="text-white font-black text-6xl tracking-tighter robotic-digits">01065661882</span>
                                    </div>
                                </div>
                             </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* HUD FRAME: ULTIMA COMMAND (No Headers/Footers) */}
                <div className="absolute inset-4 lg:inset-10 border border-white/5 rounded-[3rem] lg:rounded-[6rem] pointer-events-none z-50 p-6 lg:p-16 flex flex-col justify-between">
                     <div className="flex justify-between text-cyan-400 opacity-60 font-black tracking-widest text-[8px] lg:text-[9px]">
                         <div className="flex gap-4 items-center">
                              <Box className="w-4 h-4 animate-pulse" />
                              <span className="robotic-digits">QUANTUM_CINEMA // LEV_12.8</span>
                         </div>
                         <div className="flex gap-6 lg:gap-10">
                              <span className="robotic-digits">29.98N 31.13E</span>
                               <Radio className="w-4 h-4 animate-pulse" />
                         </div>
                     </div>
                     <div className="flex justify-between items-end opacity-20">
                         <div className="flex flex-col gap-2">
                             <div className="w-20 lg:w-40 h-[1px] bg-sahara-gold/40" />
                         </div>
                         <div className="text-[6px] lg:text-[7px] text-white tracking-[1em] italic">© TACTICAL_CINEMA_2026</div>
                     </div>
                </div>
            </div>

            {/* AUTOPLAY INITIAL SEED (Hidden) */}
            {phase === 'idle' && (
                <div className="absolute inset-0 z-[300] bg-black opacity-100 pointer-events-none" />
            )}

            <style jsx global>{`
                .robotic-digits { font-family: 'Courier New', Courier, monospace; letter-spacing: 0.1rem; }
                .perspective-1000 { perspective: 1000px; }
                .noise-overlay::before {
                    content: ""; position: absolute; inset: -100%;
                    background-image: url("https://grainy-gradients.vercel.app/noise.svg");
                    opacity: 0.1; pointer-events: none; animation: noise 0.2s infinite; z-index: 1000;
                }
                .scanline {
                    width: 100%; height: 100px; z-index: 1001; pointer-events: none;
                    background: linear-gradient(0deg, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(0, 255, 255, 0) 100%);
                    position: absolute; bottom: 100%; animation: scanline 8s linear infinite;
                }
                @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: -100px; } }
                @keyframes noise {
                    0% { transform: translate(0, 0); }
                    10% { transform: translate(-2%, -2%); }
                    20% { transform: translate(-4%, 2%); }
                    30% { transform: translate(2%, -4%); }
                    100% { transform: translate(0, 0); }
                }
            `}</style>
        </div>
    )
}
