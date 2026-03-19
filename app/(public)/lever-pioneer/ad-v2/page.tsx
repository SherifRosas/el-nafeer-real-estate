'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Phone, MessageCircle, MapPin, Zap, Play, 
    ShieldCheck, Cpu, Radio, Globe, Crosshair, 
    Terminal, Activity, Lock, Layers, FastForward,
    CloudHail, Waves, Box, Volume2, Triangle
} from 'lucide-react'

// --- IMPERIAL KINETIC CINEMA V18.0 (SENTIENT TRANSCENDENCE) ---

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
        if (bgMusicRef.current) {
            bgMusicRef.current.muted = false;
            bgMusicRef.current.volume = 1.0;
            bgMusicRef.current.play().catch(() => {});
        }
    }

    const startUltimaSequence = () => {
        if (typeof window !== 'undefined') {
            const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) { new AudioContext().resume(); }
        }
        setIsAudioUnlocked(true)
        setPhase('descent')
        forceAudio();
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([100, 50, 200, 50, 400]); }

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
        utterance.pitch = 0.95 // Imperial Deep Tone
        utterance.rate = 0.8
        utterance.onend = () => { setTimeout(() => playNarrative(index + 1), 1800); }
        window.speechSynthesis.speak(utterance)
    }

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_70%)]" />
            
            {/* THE IMPERIAL AUDIO CORE */}
            <audio ref={bgMusicRef} loop playsInline src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" />

            {/* --- THE TRANSCENDENT PORTAL --- */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                    
                    {/* PERSPECTIVE GRID (Floor & Ceiling) */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.2)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)_translateY(200px)] h-full w-full bottom-0" />
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:80px_80px] [transform:perspective(500px)_rotateX(-60deg)_translateY(-200px)] h-full w-full top-0" />
                    </div>

                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 flex flex-col items-center gap-24 scale-90 lg:scale-110">
                        
                        {/* HOLOGRAPHIC TRANSCENDENT LOGO (Final Background Kill) */}
                        <div className="relative w-72 h-72 flex items-center justify-center">
                             {/* ROTATING HEXAGON SHIELD */}
                             <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-40px] border border-cyan-400/20 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]"
                             />
                             <motion.div 
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-60px] border border-dashed border-cyan-400/10 rounded-full"
                             />
                             
                             {/* BIOMETRIC SCANNER (Vertical Pulse) */}
                             <motion.div 
                                animate={{ y: [-150, 150] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute left-[-50px] right-[-50px] h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_30px_rgba(34,211,238,1)] z-40"
                             />
                             
                             <div className="w-full h-full relative rounded-full border-2 border-cyan-400/40 bg-black/40 backdrop-blur-3xl flex items-center justify-center p-12 overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)]">
                                <NextImage 
                                    src="/clients/lever-pioneer/logo_mimic.png" 
                                    alt="Lever Pioneer" 
                                    width={400} 
                                    height={400} 
                                    className="object-contain invert brightness-150 contrast-200 mix-blend-screen opacity-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                                />
                             </div>
                        </div>

                        <div className="text-center space-y-16">
                             <div className="space-y-4">
                                <motion.h1 
                                    animate={{ 
                                        textShadow: ["0 0 10px rgba(34,211,238,0.5)", "0 0 40px rgba(34,211,238,1)", "0 0 10px rgba(34,211,238,0.5)"]
                                    }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="text-white font-black text-5xl lg:text-7xl tracking-[0.5em] robotic-digits uppercase skew-x-[-12deg]"
                                >
                                    TRANSCEND
                                </motion.h1>
                                <div className="flex gap-2 justify-center opacity-30">
                                     {[...Array(5)].map((_, i) => <div key={i} className="w-8 h-[2px] bg-cyan-400" />)}
                                </div>
                             </div>
                             
                             <div className="flex flex-col items-center gap-8">
                                <div className="flex items-center gap-6 px-10 py-4 border border-sahara-gold/40 rounded-full bg-sahara-gold/5 backdrop-blur-md">
                                     <Zap className="w-6 h-6 text-sahara-gold animate-bounce" />
                                     <p className="text-sahara-gold font-black text-3xl tracking-widest uppercase">
                                         INITIALIZE LINK
                                     </p>
                                </div>
                                <div className="flex flex-col items-center gap-2 robotic-digits text-cyan-400/40 text-xs tracking-[0.4em]">
                                     <span>( Biometric Authentication Required )</span>
                                     <div className="flex gap-1 animate-pulse">
                                         {[...Array(30)].map((_, i) => <div key={i} className="w-[2px] h-3 bg-cyan-400/20" />)}
                                     </div>
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
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 100 }} transition={{ duration: 4 }} className="absolute w-10 h-10 bg-cyan-400 rounded-full blur-[100px] opacity-20" />
                        <h2 className="text-white font-black text-5xl lg:text-8xl tracking-[2rem] robotic-digits uppercase animate-pulse text-center leading-loose">
                            v18.0<br/><span className="text-xl tracking-[1rem] opacity-60 italic drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">TRANSCENDENCE</span>
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1500 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                
                {/* TRANSCENDENT VIEWPORT */}
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }} className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad v18" fill className="object-cover lg:object-contain scale-110" priority />

                        {/* PHANTOM HUD - TRANSCENDENT GLOW */}
                        <div className="absolute left-[5%] bottom-[8%] lg:left-[8%] lg:bottom-[15%] z-40 pointer-events-none flex flex-col items-start scale-[0.6] lg:scale-110 origin-bottom-left">
                            <motion.div initial={{ x: -200, opacity: 0 }} animate={step >= 2 ? { x: 0, opacity: 1 } : {}} transition={{ duration: 2.5, ease: "backOut" }} className="w-[400px] lg:w-[480px] flex flex-col gap-40 pointer-events-auto">
                                <div className="flex items-center gap-8 cursor-pointer group" onClick={() => window.open('https://wa.me/201111171368', '_blank')}>
                                    <div className="relative">
                                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-[-10px] border border-green-500 rounded-full blur-sm" />
                                         <div className="w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.6)] bg-black/80 backdrop-blur-xl">
                                             <MessageCircle className="w-12 h-12 text-green-500" />
                                         </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-green-500 font-black tracking-widest uppercase">WHATSAPP_LINK</span>
                                        <span className="text-[24px] text-white font-black italic drop-shadow-md">+20 111 117 1368</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 cursor-pointer group" onClick={() => window.open('tel:19XXX', '_self')}>
                                    <div className="relative">
                                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2.2, repeat: Infinity }} className="absolute inset-[-10px] border border-cyan-400 rounded-full blur-sm" />
                                         <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.6)] bg-black/80 backdrop-blur-xl">
                                             <Phone className="w-12 h-12 text-cyan-400" />
                                         </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-cyan-400 font-black tracking-widest uppercase">CALL_DIRECT</span>
                                        <span className="text-[24px] text-white font-black italic drop-shadow-md">19XXX</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 cursor-pointer group" onClick={() => window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank')}>
                                    <div className="relative">
                                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="absolute inset-[-10px] border border-sahara-gold rounded-full blur-sm" />
                                         <div className="w-24 h-24 rounded-full border-2 border-sahara-gold flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.6)] bg-black/80 backdrop-blur-xl">
                                             <MapPin className="w-12 h-12 text-sahara-gold" />
                                         </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-sahara-gold font-black tracking-widest uppercase">HEADQUARTERS</span>
                                        <span className="text-[24px] text-white font-black italic drop-shadow-md">حدائق الأهرام</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* HUD STATUS INDICATOR */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none z-50 p-6 flex items-center justify-center gap-6">
                     <div className="flex items-center gap-2 text-cyan-400 opacity-40 robotic-digits text-[9px]">
                         <Activity className="w-3 h-3" />
                         <span>BROADCASTING_IMPERIAL_CELEBRATION_V18.0</span>
                     </div>
                     <div className="flex gap-1 h-4 items-end">
                         {[...Array(12)].map((_, i) => (
                             <motion.div 
                                key={`wave-${i}`}
                                animate={{ height: [2, Math.random() * 12 + 4, 2] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="w-[1px] bg-cyan-400/60"
                             />
                         ))}
                     </div>
                </div>

                <div className="absolute inset-0 pointer-events-none z-50 p-6 lg:p-12 flex flex-col justify-between">
                     <div className="flex justify-between items-start text-cyan-400/60 text-[10px] robotic-digits tracking-[6px] uppercase font-black">
                         <div className="flex gap-4 items-center">
                              <Box className="w-6 h-6 animate-spin-slow" />
                              <span>LEVEL_18.0_TRANSCENDENCE</span>
                         </div>
                         <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]" />
                              <span className="text-red-500">LIVE</span>
                         </div>
                     </div>
                </div>

                <style jsx global>{`
                    footer, header { display: none !important; }
                    body { background-color: black !important; overflow: hidden; position: fixed; width: 100%; height: 100%; }
                    .robotic-digits { font-family: 'Courier New', Courier, monospace; }
                    .animate-spin-slow { animation: spin 20s linear infinite; }
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                `}</style>
            </div>
        </div>
    )
}
