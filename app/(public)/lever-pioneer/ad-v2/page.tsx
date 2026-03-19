'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Phone, MessageCircle, MapPin, Zap, Activity, Box, Radio, Volume2
} from 'lucide-react'

// --- IMPERIAL KINETIC CINEMA V20.0 (SENTIENT ETERNITY) ---

const CELEBRATION_SCRIPT = [
    "شركة ليفر الرائدة للمصاعد",
    "تهنئكم بحلول عيد الفطر المبارك",
    "بمناسبة تدشين مقرها الجديد",
    "من قلب مصر... من الجيزة... حدائق الاهرام",
    "للتواصل... أضغط على الأيقونات"
];

export default function AdV2UltimaKineticCinema() {
    const { language } = useLanguage()
    const [phase, setPhase] = useState<'idle' | 'descent' | 'stabilizing' | 'active'>('idle')
    const [step, setStep] = useState(0) 
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)
    const [currentSentence, setCurrentSentence] = useState(-1)
    const bgMusicRef = useRef<HTMLAudioElement | null>(null)

    const forceAudio = () => {
        if (!bgMusicRef.current) return;
        bgMusicRef.current.muted = false;
        bgMusicRef.current.volume = 1.0;
        bgMusicRef.current.play().catch(() => {
            console.log("Waiting for user-initiated broadcast...");
        });
    }

    const startUltimaSequence = () => {
        if (typeof window !== 'undefined') {
            const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) { new AudioContext().resume(); }
        }
        setIsAudioUnlocked(true)
        setPhase('descent')
        forceAudio();
        
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([200, 100, 400]); }

        setTimeout(() => { setPhase('stabilizing'); forceAudio(); }, 3000)
        setTimeout(() => {
            setPhase('active');
            setStep(1);
            forceAudio();
            playNarrative(0);
        }, 6500)
    }

    const playNarrative = (index: number) => {
        if (index >= CELEBRATION_SCRIPT.length) return;
        setCurrentSentence(index)
        const utterance = new SpeechSynthesisUtterance(CELEBRATION_SCRIPT[index])
        utterance.lang = 'ar-EG'
        utterance.pitch = 0.95
        utterance.rate = 0.82
        utterance.onend = () => { setTimeout(() => playNarrative(index + 1), 1800); }
        window.speechSynthesis.speak(utterance)
    }

    return (
        <div 
            onClick={forceAudio} 
            onTouchStart={forceAudio} 
            className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans"
        >
            {/* THE IMPERIAL AUDIO CORE (Epic Celebration Track) */}
            <audio ref={bgMusicRef} loop playsInline src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" />

            {/* --- THE ENTRY GATEWAY (Original Branding) --- */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden p-6">
                    
                    {/* PERSPECTIVE GRID */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.2)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)_translateY(200px)] h-full w-full bottom-0" />
                    </div>

                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 flex flex-col items-center gap-24">
                        
                        {/* HOLOGRAPHIC LOGO CORRIDOR (RESPECTS ORIGINAL COLORS) */}
                        <div className="relative w-72 h-72 flex items-center justify-center">
                             <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-40px] border-2 border-cyan-400/20 rounded-full"
                             />
                             <motion.div 
                                animate={{ y: [-150, 150] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-[-20%] right-[-20%] h-[3px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-40"
                             />
                             
                             {/* THE STERILE WHITE ORB (Allows original logo colors to pop) */}
                             <div className="w-full h-full relative rounded-full bg-white flex items-center justify-center p-12 overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.3)]">
                                <NextImage 
                                    src="/clients/lever-pioneer/logo_mimic.png" 
                                    alt="Lever Pioneer" 
                                    width={400} 
                                    height={400} 
                                    className="object-contain p-2 mix-blend-multiply scale-110" // Multiplying kills the white square but keeps brand colors
                                />
                             </div>
                        </div>

                        <div className="text-center space-y-12">
                             <div className="space-y-4">
                                <h1 className="text-white font-black text-5xl lg:text-7xl tracking-[0.3em] uppercase robotic-digits glow-text">LEVEL_20.0</h1>
                                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,1)]" />
                             </div>
                             
                             <div className="flex flex-col items-center gap-8">
                                <p className="text-sahara-gold font-black text-3xl tracking-[0.2em] uppercase animate-pulse">
                                    [ TAP TO BROADCAST ]
                                </p>
                                <div className="flex items-center gap-4 text-cyan-400/40 text-[10px] robotic-digits uppercase tracking-[0.4em]">
                                    <Activity className="w-4 h-4 animate-bounce" />
                                    <span>SYSTEM_v20.0_ETERNITY</span>
                                    <Activity className="w-4 h-4 animate-bounce" />
                                </div>
                             </div>
                        </div>
                    </motion.div>
                </div>
            )}
            
            {/* INITIATION TRANSITION */}
            <AnimatePresence>
                {phase === 'descent' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[200] bg-black flex flex-col items-center justify-center p-12 overflow-hidden">
                        <h2 className="text-white font-black text-5xl lg:text-7xl tracking-[2rem] robotic-digits uppercase animate-pulse text-center">
                            ETERNITY<br/><span className="text-lg tracking-[0.5rem] opacity-50 italic">AUTHENTICATING_LINK</span>
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AD VIEWPORT (UNIVERSAL SMART FIT) */}
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1500 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                     {/* 1. IMPERCEPTIBLE BLURRED BACKDROP (Fills phone height) */}
                     <div className="absolute inset-0 z-0 bg-black">
                         <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Blur" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.2]" />
                     </div>

                     {/* 2. FOREGROUND AD (100% VISIBILITY ON ALL PHONES) */}
                     <motion.div 
                        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 60, repeat: Infinity }}
                        className="relative w-full h-full z-10 flex items-center justify-center"
                     >
                         <div className="relative w-full h-auto max-h-[95vh] aspect-square flex items-center justify-center px-2">
                            <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain drop-shadow-[0_0_80px_rgba(34,211,238,0.2)]" priority />

                            {/* HUD PANEL */}
                            <div className="absolute left-[5%] bottom-[5%] lg:left-[8%] lg:bottom-[10%] z-40 pointer-events-none flex flex-col items-start scale-[0.55] lg:scale-105 origin-bottom-left">
                                <motion.div initial={{ x: -100, opacity: 0 }} animate={step >= 2 ? { x: 0, opacity: 1 } : {}} transition={{ duration: 2 }} className="w-[420px] lg:w-[480px] flex flex-col gap-36 pointer-events-auto">
                                    <div className="flex items-center gap-8 cursor-pointer" onClick={() => window.open('https://wa.me/201111171368', '_blank')}>
                                        <div className="w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)] bg-black/80">
                                            <MessageCircle className="w-12 h-12 text-green-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] text-green-500 font-bold tracking-[0.2em]">WHATSAPP</span>
                                            <span className="text-[22px] text-white font-black italic">+20 111 117 1368</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8 cursor-pointer" onClick={() => window.open('tel:19XXX', '_self')}>
                                        <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.4)] bg-black/80">
                                            <Phone className="w-12 h-12 text-cyan-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] text-cyan-400 font-bold tracking-[0.2em]">CONTACT_CENTER</span>
                                            <span className="text-[22px] text-white font-black italic">19XXX</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8 cursor-pointer" onClick={() => window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank')}>
                                        <div className="w-24 h-24 rounded-full border-2 border-sahara-gold flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)] bg-black/80">
                                            <MapPin className="w-12 h-12 text-sahara-gold" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] text-sahara-gold font-bold tracking-[0.2em]">GIZA_BRANCH</span>
                                            <span className="text-[22px] text-white font-black italic">حدائق الأهرام</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                         </div>
                     </motion.div>
                </div>

                {/* STATUS BAR */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none z-50 p-6 flex flex-col items-center gap-4">
                     <div className="flex gap-1 h-6 items-end opacity-20">
                         {[...Array(24)].map((_, i) => (
                             <motion.div key={i} animate={{ height: [4, Math.random() * 20 + 4, 4] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-[1px] bg-cyan-400" />
                         ))}
                     </div>
                </div>

                <div className="absolute inset-0 pointer-events-none z-50 p-6 lg:p-12 flex flex-col justify-between">
                     <div className="flex justify-between items-start text-cyan-400/60 text-[10px] robotic-digits tracking-[5px]">
                         <div className="flex gap-4 items-center">
                              <Box className="w-6 h-6 animate-spin-slow" />
                              <span>LEVEL_20.0_ETERNITY</span>
                         </div>
                         <Radio className="w-5 h-5 animate-pulse text-red-500" />
                     </div>
                </div>

                <style jsx global>{`
                    footer, header { display: none !important; }
                    body { background-color: black !important; overflow: hidden; position: fixed; width: 100%; height: 100%; }
                    .robotic-digits { font-family: 'Courier New', Courier, monospace; }
                    .glow-text { text-shadow: 0 0 20px rgba(255,255,255,0.4); }
                    .animate-spin-slow { animation: spin 20s linear infinite; }
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                `}</style>
            </div>
        </div>
    )
}
