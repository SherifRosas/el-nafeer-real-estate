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

// --- IMPERIAL KINETIC CINEMA V17.0 (SENTIENT IMPERIAL) ---

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
        if (typeof window !== 'undefined') {
            const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) { new AudioContext().resume(); }
        }
        setIsAudioUnlocked(true)
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([100, 30, 100, 30, 200]); }
        setPhase('descent')
        if (bgMusicRef.current) { bgMusicRef.current.volume = 0.6; bgMusicRef.current.play(); }

        setTimeout(() => setPhase('stabilizing'), 3000)
        setTimeout(() => {
            setPhase('active')
            setStep(1)
            playNarrative(0)
        }, 6000)
    }

    const playNarrative = (index: number) => {
        if (index >= CELEBRATION_SCRIPT.length) return;
        setCurrentSentence(index)
        const utterance = new SpeechSynthesisUtterance(CELEBRATION_SCRIPT[index])
        utterance.lang = 'ar-EG'
        utterance.pitch = 1.05
        utterance.rate = 0.85
        utterance.onend = () => { setTimeout(() => playNarrative(index + 1), 1500); }
        window.speechSynthesis.speak(utterance)
    }

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans">
            <div className="scanline" />
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none noise-overlay" />
            
            {/* SENTIENT CINEMATIC OST (Deep Trailer Build-up) */}
            <audio ref={bgMusicRef} loop src="https://assets.mixkit.co/music/preview/mixkit-epic-cinematic-trailer-91.mp3" />

            {/* --- THE SENTIENT ENTRANCE PORTAL --- */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden p-6">
                    
                    {/* MATRIX FALLING NUMBERS (Elevator Logic) */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                         {[...Array(20)].map((_, i) => (
                             <motion.div 
                                key={`num-${i}`}
                                initial={{ y: -100, x: Math.random() * 100 + "%" }}
                                animate={{ y: 1000 }}
                                transition={{ duration: 5 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                                className="absolute text-cyan-400 font-mono text-xs robotic-digits"
                             >
                                {['G', '1', '2', '3', '4', '5', 'R'][Math.floor(Math.random() * 7)]}
                             </motion.div>
                         ))}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[450px] h-[450px] rounded-full border border-cyan-400/5 border-t-cyan-400/60" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute w-[500px] h-[500px] rounded-full border border-dashed border-sahara-gold/5" />
                    </div>

                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 flex flex-col items-center gap-20 scale-90 lg:scale-100">
                        
                        {/* THE HOLOGRAPHIC LOGO CORE (NO WHITE BOX) */}
                        <div className="relative w-64 h-64 group">
                             {/* SCANNING LASER */}
                             <motion.div 
                                animate={{ y: [-130, 130] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-30"
                             />
                             
                             <motion.div 
                                animate={{ boxShadow: ["0 0 40px rgba(34,211,238,0)", "0 0 100px rgba(34,211,238,0.3)"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-full h-full relative rounded-full border-2 border-cyan-400/30 bg-black overflow-hidden flex items-center justify-center"
                             >
                                <div className="absolute inset-0 bg-cyan-950/20 mix-blend-overlay" />
                                <NextImage 
                                    src="/clients/lever-pioneer/logo_mimic.png" 
                                    alt="Lever Pioneer" 
                                    fill 
                                    className="object-contain p-10 grayscale brightness-200 contrast-150 mix-blend-screen"
                                />
                             </motion.div>
                        </div>

                        <div className="text-center space-y-12">
                             <div className="space-y-4">
                                <motion.h1 
                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                    className="text-white font-black text-4xl lg:text-6xl tracking-[0.4em] robotic-digits uppercase skew-x-[-10deg]"
                                >
                                    SENTIENT_LINK
                                </motion.h1>
                                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,1)]" />
                             </div>
                             
                             <div className="flex flex-col items-center gap-6">
                                <p className="text-sahara-gold font-black text-2xl tracking-[0.3em] uppercase animate-pulse">
                                    [ AUTHENTICATE BROADCAST ]
                                </p>
                                <div className="flex items-center gap-4 text-cyan-400/40 text-xs robotic-digits uppercase">
                                    <Activity className="w-4 h-4 animate-bounce" />
                                    <span>SYSTEM_AWAITING_TOUCH</span>
                                    <Activity className="w-4 h-4 animate-bounce" />
                                </div>
                             </div>
                        </div>
                    </motion.div>
                </div>
            )}
            
            {/* THE IMPERIAL CINEMATIC EXPERIENCE */}
            <AnimatePresence>
                {phase === 'descent' && (
                    <motion.div initial={{ scale: 30, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 3 }} className="absolute inset-0 z-[200] bg-black flex items-center justify-center p-12 overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full" />
                        <h2 className="text-white font-black text-4xl lg:text-7xl tracking-[2rem] robotic-digits uppercase animate-pulse text-center leading-relaxed">
                            LEV_17.0<br/><span className="text-xl tracking-[1rem] opacity-40 italic">SENTIENT_IMPERIAL</span>
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-opacity duration-1000 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                
                {/* 100% OMNI-SCREEN CANVAS */}
                <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 80, repeat: Infinity }} className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad v2" fill className="object-cover lg:object-contain" priority />

                        {/* PHANTOM HUD - ADVANCED GLOW */}
                        <div className="absolute left-[5%] bottom-[10%] lg:left-[8%] lg:bottom-[15%] z-40 pointer-events-none flex flex-col items-start scale-[0.6] lg:scale-100 origin-bottom-left">
                            <motion.div initial={{ x: -100, opacity: 0 }} animate={step >= 2 ? { x: 0, opacity: 1 } : {}} transition={{ duration: 2, ease: "circOut" }} className="w-[380px] lg:w-[440px] flex flex-col gap-36 pointer-events-auto">
                                <div className="flex items-center gap-6 cursor-pointer group" onClick={() => window.open('https://wa.me/201111171368', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)] bg-black/60 backdrop-blur-md">
                                        <MessageCircle className="w-10 h-10 text-green-500" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-green-500 font-black tracking-tighter">WHATSAPP_LINK</span>
                                        <span className="text-[20px] text-white font-black italic">+20 111 117 1368</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 cursor-pointer group" onClick={() => window.open('tel:19XXX', '_self')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }} className="w-20 h-20 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.4)] bg-black/60 backdrop-blur-md">
                                        <Phone className="w-10 h-10 text-cyan-400" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-cyan-400 font-black tracking-tighter">CALL_CENTRAL</span>
                                        <span className="text-[20px] text-white font-black italic">19XXX</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 cursor-pointer group" onClick={() => window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="w-20 h-20 rounded-full border-2 border-sahara-gold flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] bg-black/60 backdrop-blur-md">
                                        <MapPin className="w-10 h-10 text-sahara-gold" />
                                    </motion.div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[14px] text-sahara-gold font-black tracking-tighter uppercase font-mono">GIZA_NODE_MAP</span>
                                        <span className="text-[20px] text-white font-black italic">حدائق الأهرام</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* HUD FRAME */}
                <div className="absolute inset-0 pointer-events-none z-50 p-6 lg:p-12 flex flex-col justify-between">
                     <div className="flex justify-between items-start text-cyan-400 opacity-60 text-[10px] robotic-digits tracking-[5px] uppercase">
                         <div className="flex gap-4 items-center">
                              <Box className="w-5 h-5 animate-spin-slow" />
                              <span>SYSTEM_v17.0_SENTIENT_IMPERIAL</span>
                         </div>
                         <div className="flex flex-col items-end gap-1">
                              <Radio className="w-4 h-4 animate-pulse" />
                              <span className="text-[8px] tracking-normal">BROADCASTING...</span>
                         </div>
                     </div>
                </div>

                <style jsx global>{`
                    footer, header { display: none !important; }
                    body { background-color: black !important; overflow: hidden; position: fixed; width: 100%; height: 100%; }
                    .robotic-digits { font-family: 'Courier New', Courier, monospace; }
                    .animate-spin-slow { animation: spin 20s linear infinite; }
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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
