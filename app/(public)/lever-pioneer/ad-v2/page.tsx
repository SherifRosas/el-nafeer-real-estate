'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Phone, MessageCircle, MapPin, Zap, Play, 
    ShieldCheck, Cpu, Radio, Globe, Crosshair, 
    Terminal, Activity, Lock, Layers, FastForward,
    CloudHail, Waves, Box, Volume2
} from 'lucide-react'

// --- IMPERIAL KINETIC CINEMA V14.8 (OMNI-FIT & AUDIO RECOVERY) ---

export default function AdV2UltimaKineticCinema() {
    const { language } = useLanguage()
    
    // Timeline States
    const [phase, setPhase] = useState<'idle' | 'descent' | 'stabilizing' | 'active'>('idle')
    const [step, setStep] = useState(0) 
    const [isNarrating, setIsNarrating] = useState(false)
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)
    
    // Audio References
    const bgMusicRef = useRef<HTMLAudioElement | null>(null)

    const startUltimaSequence = () => {
        // --- 1. FORCE UNLOCK AUDIO CONTEXT ---
        if (typeof window !== 'undefined') {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();
                ctx.resume().then(() => console.log('Audio Engine Woken Up.'));
            }
        }
        
        setIsAudioUnlocked(true)
        
        // 2. Haptic Feedback
        if (typeof window !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([100, 50, 100]) 
        }

        setPhase('descent')
        
        // 3. Play Cinematic Score
        if (bgMusicRef.current) {
            bgMusicRef.current.volume = 0.5
            bgMusicRef.current.play().catch(e => console.log('Final Audio Blocked:', e))
        }

        // --- Cinematic Timeline ---
        setTimeout(() => setPhase('stabilizing'), 3000)
        setTimeout(() => {
            setPhase('active')
            setStep(1)
            const msg = "شركة ليفر الرائدة للمصاعد تهنئكم بحلول عيد الفطر المبارك بمناسبة تدشين مقرها الجديد من قلب مصر من الجيزة حدائق الاهرام للتواصل أضغط على الأيقونات"
            speak(msg)
        }, 6000)
        
        setTimeout(() => setStep(2), 8000)
        setTimeout(() => setStep(3), 10000)
    }

    const speak = (text: string) => {
        if (typeof window === 'undefined') return
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'ar-EG'
        utterance.pitch = 1.05
        utterance.rate = 0.95
        window.speechSynthesis.speak(utterance)
        setIsNarrating(true)
        utterance.onend = () => setIsNarrating(false)
    }

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden cursor-crosshair font-sans select-none noise-overlay">
            <div className="scanline" />
            <audio ref={bgMusicRef} loop src="https://assets.mixkit.co/music/preview/mixkit-sci-fi-drone-ambience-925.mp3" />

            {/* BROADCAST SENSOR: Tap to UNLOCK (Center Focus) */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black/98 flex flex-col items-center justify-center cursor-pointer">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center gap-10"
                    >
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-40 h-40 rounded-full border-4 border-cyan-400 flex items-center justify-center bg-black/50"
                        >
                            <Volume2 className="w-16 h-16 text-cyan-400" />
                        </motion.div>
                        <div className="text-center space-y-4">
                             <h1 className="text-white font-black text-3xl tracking-[0.2em] uppercase robotic-digits">TAP TO BROADCAST</h1>
                             <p className="text-sahara-gold font-black tracking-widest animate-pulse">[ ENABLE EGYPTIAN AUDIO ]</p>
                        </div>
                    </motion.div>
                </div>
            )}
            
            <AnimatePresence>
                {phase === 'descent' && (
                    <motion.div 
                        initial={{ scale: 20, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 3, ease: "circIn" }}
                        className="absolute inset-0 z-[200] bg-black flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.2]" />
                        <div className="relative z-10 flex flex-col items-center gap-6 scale-75 lg:scale-100">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-96 h-96 border border-cyan-500/40 rounded-full flex items-center justify-center border-dashed" />
                            <Globe className="absolute w-20 h-20 text-cyan-400 animate-pulse" />
                            <h2 className="text-white font-black text-2xl tracking-[12px] robotic-digits">DESCENT_GIZA</h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                <span className="animate-pulse">_SENSORY_CALIBRATION_</span>
                                <span>LEV_14.8_OMNI_FIT</span>
                            </div>
                            <div className="h-[4px] w-full bg-zinc-900 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }} className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-sahara-gold" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`relative w-full h-full min-h-screen transition-opacity duration-1000 ${phase === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 z-0 bg-black">
                    <motion.div 
                        animate={{ x: [-100, 100], opacity: [0.1, 0.15, 0.1] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(34,211,238,0.05)_50%,transparent_60%)] bg-[length:200%_100%] pointer-events-none"
                    />
                </div>

                {/* THE OMNI-FIT CINEMATIC CANVAS (Fills Device Screen) */}
                <div className="absolute inset-0 flex items-center justify-center z-10 perspective-1000">
                    <motion.div 
                        animate={{ scale: [1, 1.1], rotateX: [0, 0.5, -0.5, 0], rotateY: [0, -0.5, 0.5, 0] }}
                        transition={{ scale: { duration: 60, repeat: Infinity, ease: "linear" }, default: { duration: 20, repeat: Infinity } }}
                        className="relative w-full h-full lg:w-[85%] lg:h-[85%] lg:aspect-square lg:rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                    >
                        <NextImage 
                            src="/campaigns/lever-pioneer/ad-v2-quantum.png" 
                            alt="Ad v2 Quantum" 
                            fill 
                            className="object-cover lg:object-contain bg-black" 
                            priority 
                        />

                        {/* PHANTOM HUD - FLOATING OVER OMNI AD */}
                        <div className="absolute left-[8%] bottom-[12%] lg:left-[5%] lg:bottom-[15%] z-40 pointer-events-none flex flex-col items-start translate-x-[-15%] lg:translate-x-0 scale-[0.75] lg:scale-100 origin-bottom-left">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={step >= 2 ? { opacity: 1 } : {}}
                                transition={{ duration: 1.5 }}
                                className="w-[380px] lg:w-[440px] p-6 lg:p-8 flex flex-col gap-10 lg:gap-12 pointer-events-auto"
                            >
                                {/* WHATSAPP */}
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('https://wa.me/201111171368', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                        <MessageCircle className="w-9 h-9 text-green-500" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-green-500 font-black tracking-widest uppercase">WHATSAPP</span>
                                        <span className="text-[18px] text-white font-black italic">+20 111 117 1368</span>
                                    </div>
                                </div>
                                
                                {/* CALL US */}
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('tel:19XXX', '_self')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                                        <Phone className="w-9 h-9 text-cyan-400" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-cyan-400 font-black tracking-widest uppercase">CALL_US</span>
                                        <span className="text-[18px] text-white font-black italic">19XXX</span>
                                    </div>
                                </div>

                                {/* LOCATION */}
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-sahara-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                                        <MapPin className="w-9 h-9 text-sahara-gold" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-sahara-gold font-black tracking-widest uppercase">LOCATION</span>
                                        <span className="text-[18px] text-white font-black italic">GIZA, حدائق الأهرام</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* HUD FRAME */}
                <div className="absolute inset-4 lg:inset-10 border border-white/5 rounded-[3rem] lg:rounded-[6rem] pointer-events-none z-50 p-6 lg:p-16 flex flex-col justify-between">
                     <div className="flex justify-between text-cyan-400 opacity-60 font-black tracking-widest text-[8px] lg:text-[10px]">
                         <div className="flex gap-4 items-center">
                              <Box className="w-4 h-4" />
                              <span className="robotic-digits">ULTRA_AD_v14.8 // OMNI_FIT</span>
                         </div>
                         <Radio className="w-4 h-4 animate-pulse" />
                     </div>
                     <div className="flex justify-between items-end opacity-20">
                         <div className="text-[8px] text-white tracking-[0.5em] italic">© LEVER_PIONEER_2026</div>
                     </div>
                </div>

                <style jsx global>{`
                    footer, header { display: none !important; }
                    body { background-color: black !important; overflow: hidden; position: fixed; width: 100%; height: 100%; }
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
                        100% { transform: translate(0, 0); }
                    }
                `}</style>
            </div>
        </div>
    )
}
