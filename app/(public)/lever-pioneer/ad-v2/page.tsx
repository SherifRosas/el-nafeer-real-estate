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

// --- IMPERIAL KINETIC CINEMA V16.0 (CELEBRATION BROADCASTER) ---

const CELEBRATION_SCRIPT = [
    "شركة ليفر الرائدة للمصاعد",
    "تهنئكم بحلول عيد الفطر المبارك",
    "بمناسبة تدشين مقرها الجديد",
    "من قلب مصر... من الجيزة... حدائق الاهرام",
    "للتواصل... أضغط على الأيقونات"
];

export default function AdV2UltimaKineticCinema() {
    const { language } = useLanguage()
    
    // Timeline States
    const [phase, setPhase] = useState<'idle' | 'descent' | 'stabilizing' | 'active'>('idle')
    const [step, setStep] = useState(0) 
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)
    const [currentSentence, setCurrentSentence] = useState(-1)
    
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
        
        // Play Epic Celebration Music
        if (bgMusicRef.current) {
            bgMusicRef.current.volume = 0.5
            bgMusicRef.current.play().catch(e => console.log('Audio Blocked:', e))
        }

        // Narrative Pacing
        setTimeout(() => setPhase('stabilizing'), 3000)
        setTimeout(() => {
            setPhase('active')
            setStep(1)
            playNarrative(0) // Start the Human Narrative
        }, 6000)
        
        setTimeout(() => setStep(2), 8000)
    }

    const playNarrative = (index: number) => {
        if (index >= CELEBRATION_SCRIPT.length) return;
        
        setCurrentSentence(index)
        const text = CELEBRATION_SCRIPT[index];
        
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'ar-EG'
        utterance.pitch = 1.05
        utterance.rate = 0.85 // Slower, more humane pace
        
        utterance.onend = () => {
            // Respectful Pause before next celebration sentence
            setTimeout(() => {
                playNarrative(index + 1)
            }, 1200)
        }
        
        window.speechSynthesis.speak(utterance)
    }

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none noise-overlay font-sans">
            <div className="scanline" />
            
            {/* NEW CELEBRATION THEME: Uplifting Epic Track */}
            <audio ref={bgMusicRef} loop src="https://assets.mixkit.co/music/preview/mixkit-epic-cinematic-trailer-91.mp3" />

            {/* BROADCAST SENSOR: Tap to UNLOCK */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black/98 flex flex-col items-center justify-center cursor-pointer overflow-hidden px-6">
                    {/* HOLOGRAPHIC ORBITAL RINGS */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-[320px] h-[320px] rounded-full border border-cyan-400/20 border-t-cyan-400" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[350px] h-[350px] rounded-full border border-dashed border-sahara-gold/10" />
                    </div>

                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 flex flex-col items-center gap-16">
                        <motion.div 
                            animate={{ scale: [1, 1.02, 1], boxShadow: ["0 0 20px rgba(34,211,238,0.1)", "0 0 80px rgba(34,211,238,0.4)", "0 0 20px rgba(34,211,238,0.1)"] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-64 h-64 relative rounded-full border-2 border-cyan-400/50 bg-white shadow-2xl overflow-hidden p-6"
                        >
                            <NextImage src="/clients/lever-pioneer/logo_mimic.png" alt="Lever Pioneer" fill className="object-contain p-6" />
                        </motion.div>

                        <div className="text-center space-y-8">
                             <div className="space-y-2">
                                <h1 className="text-white font-black text-4xl lg:text-5xl tracking-[0.2em] uppercase robotic-digits glow-text">CELEBRATION</h1>
                                <div className="h-[2px] w-64 mx-auto bg-gradient-to-r from-transparent via-sahara-gold to-transparent opacity-60" />
                             </div>
                             
                             <div className="flex flex-col items-center gap-4">
                                <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-sahara-gold font-black text-xl lg:text-2xl tracking-widest uppercase">
                                    [ INITIATE BROADCAST ]
                                </motion.p>
                                <p className="text-cyan-400/60 text-xs robotic-digits uppercase tracking-widest">
                                    ( Touch Logo to Celebrate )
                                </p>
                             </div>
                        </div>
                    </motion.div>
                </div>
            )}
            
            <AnimatePresence>
                {phase === 'descent' && (
                    <motion.div initial={{ scale: 20, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="absolute inset-0 z-[200] bg-black flex items-center justify-center px-10 text-center">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.2]" />
                        <h2 className="text-white font-black text-2xl lg:text-4xl tracking-[15px] robotic-digits uppercase animate-pulse">INITIATING_EXPERIENCE</h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAIN ACTIVE VIEW */}
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-opacity duration-1000 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 60, repeat: Infinity }} className="relative w-full h-full max-w-full max-h-full flex items-center justify-center perspective-1000">
                    <div className="relative w-full h-[85vh] lg:h-full max-w-[1400px] max-h-[1400px] aspect-square flex items-center justify-center">
                        <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad v2 Quantum" fill className="object-contain" priority />

                        {/* PHANTOM HUD */}
                        <div className="absolute left-[5%] bottom-[8%] lg:left-[8%] lg:bottom-[15%] z-40 pointer-events-none flex flex-col items-start scale-[0.6] lg:scale-100 origin-bottom-left">
                            <motion.div initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} transition={{ duration: 1.5 }} className="w-[380px] lg:w-[440px] flex flex-col gap-32 lg:gap-14 pointer-events-auto">
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('https://wa.me/201111171368', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-black/40">
                                        <MessageCircle className="w-9 h-9 text-green-500" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-green-500 font-black uppercase">WHATSAPP</span>
                                        <span className="text-[18px] text-white font-black italic">+20 111 117 1368</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('tel:19XXX', '_self')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] bg-black/40">
                                        <Phone className="w-9 h-9 text-cyan-400" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-cyan-400 font-black uppercase">CALL_US</span>
                                        <span className="text-[18px] text-white font-black italic">19XXX</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="w-16 h-16 rounded-full border-2 border-sahara-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] bg-black/40">
                                        <MapPin className="w-9 h-9 text-sahara-gold" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-sahara-gold font-black uppercase">LOCATION</span>
                                        <span className="text-[18px] text-white font-black italic">حدائق الأهرام</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* HUD FRAME */}
                <div className="absolute inset-0 pointer-events-none z-50 p-6 lg:p-12 flex flex-col justify-between">
                     <div className="flex justify-between items-start text-cyan-400/40 text-[9px] robotic-digits tracking-[3px]">
                         <div className="flex gap-4 items-center">
                              <Box className="w-3 h-3" />
                              <span>LEVEL_16.0_CELEBRATION</span>
                         </div>
                         <Radio className="w-3 h-3 animate-pulse" />
                     </div>
                </div>

                <style jsx global>{`
                    footer, header { display: none !important; }
                    body { background-color: black !important; overflow: hidden; position: fixed; width: 100%; height: 100%; }
                    .robotic-digits { font-family: 'Courier New', Courier, monospace; }
                    .glow-text { text-shadow: 0 0 20px rgba(255,255,255,0.4); }
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
