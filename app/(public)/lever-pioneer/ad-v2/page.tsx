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

// --- IMPERIAL KINETIC CINEMA V15.0 (MASTER-FIT PRODUCTION) ---

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
        // --- FORCE AUDIO DRIVER ---
        if (typeof window !== 'undefined') {
            const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();
                ctx.resume();
            }
        }
        
        setIsAudioUnlocked(true)
        
        // Haptic Feedback
        if (typeof window !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([100, 50, 100]) 
        }

        setPhase('descent')
        
        // Play OST
        if (bgMusicRef.current) {
            bgMusicRef.current.volume = 0.5
            bgMusicRef.current.play().catch(e => console.log('Final Audio Blocked:', e))
        }

        // Timeline
        setTimeout(() => setPhase('stabilizing'), 3000)
        setTimeout(() => {
            setPhase('active')
            setStep(1)
            const msg = "شركة ليفر الرائدة للمصاعد تهنئكم بحلول عيد الفطر المبارك بمناسبة تدشين مقرها الجديد من قلب مصر من الجيزة حدائق الاهرام للتواصل أضغط على الأيقونات"
            speak(msg)
        }, 6000)
        
        setTimeout(() => setStep(2), 8000)
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
        <div className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none noise-overlay">
            <div className="scanline" />
            <audio ref={bgMusicRef} loop src="https://assets.mixkit.co/music/preview/mixkit-sci-fi-drone-ambience-925.mp3" />

            {/* BROADCAST SENSOR: Tap to UNLOCK */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black/98 flex flex-col items-center justify-center cursor-pointer">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center gap-10"
                    >
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-40 h-40 rounded-full border-4 border-cyan-400 flex items-center justify-center"
                        >
                            <Volume2 className="w-16 h-16 text-cyan-400" />
                        </motion.div>
                        <div className="text-center space-y-4">
                             <h1 className="text-white font-black text-3xl tracking-widest uppercase robotic-digits">START BROADCAST</h1>
                             <p className="text-sahara-gold font-black animate-pulse">[ ENABLE CINEMATIC AUDIO ]</p>
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
                        className="absolute inset-0 z-[200] bg-black flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.2]" />
                        <h2 className="text-white font-black text-2xl tracking-[12px] robotic-digits animate-pulse">INITIATING_DESC</h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAIN ACTIVE VIEW */}
            <div className={`relative w-full h-full flex items-center justify-center transition-opacity duration-1000 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                
                {/* CINEMATIC VIEWPORT (100% VISIBILITY) */}
                <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 60, repeat: Infinity }}
                    className="relative w-full h-full max-w-full max-h-full flex items-center justify-center perspective-1000"
                >
                    {/* THE AD IMAGE: 100% CONTAINED (Zero Crop) */}
                    <div className="relative w-full h-full max-w-[1200px] max-h-[1200px] aspect-square flex items-center justify-center shadow-[0_0_100px_rgba(34,211,238,0.2)]">
                        <NextImage 
                            src="/campaigns/lever-pioneer/ad-v2-quantum.png" 
                            alt="Ad v2 Quantum" 
                            fill 
                            className="object-contain" 
                            priority 
                        />

                        {/* PHANTOM HUD - RELATIVE TO AD BOUNDARIES */}
                        <div className="absolute left-[5%] bottom-[12%] lg:left-[8%] lg:bottom-[15%] z-40 pointer-events-none flex flex-col items-start scale-[0.65] lg:scale-100 origin-bottom-left">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={step >= 2 ? { opacity: 1 } : {}}
                                transition={{ duration: 1.5 }}
                                className="w-[380px] lg:w-[440px] flex flex-col gap-10 lg:gap-14 pointer-events-auto"
                            >
                                {/* WHATSAPP */}
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('https://wa.me/201111171368', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-black/40 backdrop-blur-sm">
                                        <MessageCircle className="w-9 h-9 text-green-500" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-green-500 font-black tracking-widest uppercase">WHATSAPP</span>
                                        <span className="text-[18px] text-white font-black italic">+20 111 117 1368</span>
                                    </div>
                                </div>
                                
                                {/* CALL US */}
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('tel:19XXX', '_self')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] bg-black/40 backdrop-blur-sm">
                                        <Phone className="w-9 h-9 text-cyan-400" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-cyan-400 font-black tracking-widest uppercase">CALL_US</span>
                                        <span className="text-[18px] text-white font-black italic">19XXX</span>
                                    </div>
                                </div>

                                {/* LOCATION */}
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-sahara-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] bg-black/40 backdrop-blur-sm">
                                        <MapPin className="w-9 h-9 text-sahara-gold" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-sahara-gold font-black tracking-widest uppercase">LOCATION</span>
                                        <span className="text-[18px] text-white font-black italic">حدائق الأهرام</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* HUD FRAME INFO (Top Left) */}
                <div className="absolute inset-0 pointer-events-none z-50 p-6 lg:p-12 flex flex-col justify-between">
                     <div className="flex justify-between items-start text-cyan-400/40 text-[9px] robotic-digits tracking-[3px]">
                         <div className="flex gap-4 items-center">
                              <Box className="w-3 h-3" />
                              <span>LEVEL_15.0_MASTER_FIT</span>
                         </div>
                         <Radio className="w-3 h-3 animate-pulse" />
                     </div>
                </div>

                <style jsx global>{`
                    footer, header { display: none !important; }
                    body { background-color: rgb(0,0,0) !important; overflow: hidden; position: fixed; width: 100%; height: 100%; }
                    .robotic-digits { font-family: 'Courier New', Courier, monospace; }
                    .noise-overlay::before {
                        content: ""; position: absolute; inset: -100%;
                        background-image: url("https://grainy-gradients.vercel.app/noise.svg");
                        opacity: 0.1; pointer-events: none; animation: noise 0.2s infinite; z-index: 1000;
                    }
                    .scanline {
                        width: 100%; height: 100px; z-index: 1001; pointer-events: none;
                        background: linear-gradient(0deg, transparent 0%, rgba(34,211,238,0.05) 50%, transparent 100%);
                        position: absolute; bottom: 100%; animation: scanline 8s linear infinite;
                    }
                    @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: -100px; } }
                    @keyframes noise { 0% { transform: translate(0,0); } 100% { transform: translate(1%,1%); } }
                `}</style>
            </div>
        </div>
    )
}
