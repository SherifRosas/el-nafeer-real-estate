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

// --- IMPERIAL KINETIC CINEMA V13.5 (PRODUCTION FINAL) ---

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
                
                {/* --- BACKGROUND: CLEAN BLACK VOID --- */}
                <div className="absolute inset-0 z-0 bg-black" />
                    
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

                        {/* THE UNIFIED QUANTUM HUD (MASTER ALIGNED: 3 ROWS) */}
                        <div className="absolute left-[8%] bottom-[12%] lg:left-[5%] lg:bottom-[15%] z-40 pointer-events-none flex flex-col items-start translate-x-[-15%] lg:translate-x-0 scale-[0.85] lg:scale-100 origin-bottom-left">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={step >= 2 ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 1 }}
                                className="w-[380px] lg:w-[440px] bg-black/95 backdrop-blur-3xl border-2 border-cyan-400/60 rounded-[2.5rem] lg:rounded-[3rem] p-6 lg:p-8 flex flex-col gap-5 lg:gap-7 shadow-[0_0_120px_rgba(0,0,0,1)] pointer-events-auto"
                            >
                                {/* WHATSAPP */}
                                <div className="flex items-center gap-6 cursor-pointer group" onClick={() => window.open('https://wa.me/201111171368', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                                        <MessageCircle className="w-8 h-8 text-green-500" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] lg:text-[12px] text-green-500 font-black uppercase tracking-[0.2em]">WHATSAPP</span>
                                        <span className="text-[16px] lg:text-[18px] text-white font-black italic">+20 111 117 1368</span>
                                    </div>
                                </div>

                                <div className="h-[1px] w-full bg-white/10" />

                                {/* CALL US */}
                                <div className="flex items-center gap-6 cursor-pointer group" onClick={() => window.open('tel:19XXX', '_self')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }} className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                                        <Phone className="w-8 h-8 text-cyan-400" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[20px] lg:text-[12px] text-cyan-400 font-black uppercase tracking-[0.2em]">CALL_US</span>
                                        <span className="text-[16px] lg:text-[18px] text-white font-black italic">19XXX</span>
                                    </div>
                                </div>

                                <div className="h-[1px] w-full bg-white/10" />

                                {/* LOCATION */}
                                <div className="flex items-center gap-6 cursor-pointer group" onClick={() => window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-sahara-gold flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                        <MapPin className="w-8 h-8 text-sahara-gold" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] lg:text-[12px] text-sahara-gold font-black uppercase tracking-[0.2em]">LOCATION</span>
                                        <span className="text-[16px] lg:text-[18px] text-white font-black italic">حدائق الأهرام</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* HUD FRAME (No Headers/Footers) */}
                <div className="absolute inset-4 lg:inset-10 border border-white/5 rounded-[3rem] lg:rounded-[6rem] pointer-events-none z-50 p-6 lg:p-16 flex flex-col justify-between">
                     <div className="flex justify-between text-cyan-400 opacity-60 font-black tracking-widest text-[8px] lg:text-[9px]">
                         <div className="flex gap-4 items-center">
                              <Box className="w-4 h-4 animate-pulse" />
                              <span className="robotic-digits">QUANTUM_CINEMA // LEV_14.0_FOCUS</span>
                         </div>
                         <div className="flex gap-6 lg:gap-10">
                               <Radio className="w-4 h-4 animate-pulse" />
                         </div>
                     </div>
                     <div className="flex justify-between items-end opacity-20">
                         <div className="text-[6px] lg:text-[7px] text-white tracking-[0.5em] italic uppercase">© LEVER_PIONEER_2026</div>
                     </div>
                </div>
            </div>

            {/* AUTOPLAY INITIAL SEED (Force Full Page Black Overlay) */}
            <div className={`fixed inset-0 z-[500] bg-black transition-opacity duration-1000 ${phase === 'idle' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

            <style jsx global>{`
                /* FORCE HIDE FOOTER/HEADER */
                footer, header { display: none !important; }
                body { background-color: black !important; overflow: hidden; }

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
