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

// --- IMPERIAL KINETIC CINEMA V17.5 (ACOUSTIC SHOCK) ---

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

    const forceAudio = () => {
        if (bgMusicRef.current) {
            bgMusicRef.current.muted = false;
            bgMusicRef.current.volume = 1.0;
            bgMusicRef.current.play().catch(e => console.log("Force Attempt Failed:", e));
        }
    }

    const startUltimaSequence = () => {
        // RESUME CONTEXT
        if (typeof window !== 'undefined') {
            const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) { new AudioContext().resume(); }
        }
        
        setIsAudioUnlocked(true)
        setPhase('descent')
        
        // --- TRIP-WIRE AUDIO INITIATION ---
        forceAudio();
        
        // Haptics
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([100, 30, 200]); }

        // Secondary and Tertiary Audio Triggers (To bypass strict mobile blocks)
        setTimeout(() => {
            setPhase('stabilizing');
            forceAudio();
        }, 3000)

        setTimeout(() => {
            setPhase('active');
            setStep(1);
            forceAudio();
            playNarrative(0);
        }, 6000)
    }

    const playNarrative = (index: number) => {
        if (index >= CELEBRATION_SCRIPT.length) return;
        setCurrentSentence(index)
        const utterance = new SpeechSynthesisUtterance(CELEBRATION_SCRIPT[index])
        utterance.lang = 'ar-EG'
        utterance.pitch = 1.05
        utterance.rate = 0.82
        utterance.onend = () => { setTimeout(() => playNarrative(index + 1), 1600); }
        window.speechSynthesis.speak(utterance)
    }

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans">
            <div className="scanline" />
            
            {/* HIGH-STABILITY IMPERIAL SOUNDTRACK */}
            <audio 
                ref={bgMusicRef} 
                loop 
                playsInline
                src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" 
            />

            {/* --- THE SENTIENT ENTRANCE PORTAL --- */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden p-6">
                    
                    {/* MATRIX BACKGROUND */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                         {[...Array(20)].map((_, i) => (
                             <motion.div 
                                key={`num-${i}`}
                                initial={{ y: -100, x: Math.random() * 100 + "%" }}
                                animate={{ y: 1200 }}
                                transition={{ duration: 6 + Math.random() * 8, repeat: Infinity, ease: "linear" }}
                                className="absolute text-cyan-400 font-mono text-[10px] robotic-digits"
                             >
                                {['G', '1', '2', '3', 'L', 'E', 'V'][Math.floor(Math.random() * 7)]}
                             </motion.div>
                         ))}
                    </div>

                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 flex flex-col items-center gap-20">
                        
                        {/* HOLOGRAPHIC LOGO CORE (SCANNER ACTIVE) */}
                        <div className="relative w-64 h-64">
                             <motion.div 
                                animate={{ y: [-130, 130] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute left-[-20%] right-[-20%] h-[3px] bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,1)] z-30"
                             />
                             
                             <motion.div 
                                animate={{ boxShadow: ["0 0 20px rgba(34,211,238,0.1)", "0 0 100px rgba(34,211,238,0.4)"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-full h-full relative rounded-full border-2 border-cyan-400/40 bg-black flex items-center justify-center overflow-hidden"
                             >
                                <NextImage 
                                    src="/clients/lever-pioneer/logo_mimic.png" 
                                    alt="Lever Pioneer" 
                                    fill 
                                    className="object-contain p-12 grayscale brightness-200 contrast-150 mix-blend-screen"
                                />
                             </motion.div>
                        </div>

                        <div className="text-center space-y-12">
                             <div className="space-y-4">
                                <h1 className="text-white font-black text-4xl lg:text-6xl tracking-[0.4em] robotic-digits uppercase">SENTIENT_AI</h1>
                                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                             </div>
                             
                             <div className="flex flex-col items-center gap-6">
                                <p className="text-sahara-gold font-black text-2xl tracking-[0.3em] uppercase animate-pulse">
                                    [ TOUCH LOGO TO BROADCAST ]
                                </p>
                                <div className="flex items-center gap-4 text-cyan-400/40 text-[10px] robotic-digits">
                                    <Volume2 className="w-4 h-4 animate-ping" />
                                    <span>SYSTEM_CALIBRATING_AUDIO...</span>
                                </div>
                             </div>
                        </div>
                    </motion.div>
                    
                    {/* AUDIO WARNING */}
                    <p className="absolute bottom-10 text-[9px] text-white/20 uppercase tracking-[5px] robotic-digits">
                        Unmuting Global Sentient Interface
                    </p>
                </div>
            )}
            
            {/* DESCENDING SEQUENCE */}
            <AnimatePresence>
                {phase === 'descent' && (
                    <motion.div initial={{ scale: 30, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 3 }} className="absolute inset-0 z-[200] bg-black flex flex-col items-center justify-center p-12 overflow-hidden">
                        <h2 className="text-white font-black text-4xl lg:text-7xl tracking-[2rem] robotic-digits uppercase animate-pulse text-center">
                            LEVEL_17.5<br/><span className="text-lg tracking-[0.5rem] opacity-50 italic">ACOUSTIC_SHOCK</span>
                        </h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AD VIEWPORT */}
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-opacity duration-1000 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 80, repeat: Infinity }} className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad v2" fill className="object-cover lg:object-contain" priority />

                        {/* PHANTOM HUD */}
                        <div className="absolute left-[5%] bottom-[10%] lg:left-[8%] lg:bottom-[15%] z-40 pointer-events-none flex flex-col items-start scale-[0.6] lg:scale-100 origin-bottom-left">
                            <motion.div initial={{ x: -100, opacity: 0 }} animate={step >= 2 ? { x: 0, opacity: 1 } : {}} transition={{ duration: 2, ease: "circOut" }} className="w-[380px] lg:w-[440px] flex flex-col gap-36 pointer-events-auto">
                                <div className="flex items-center gap-6 cursor-pointer group" onClick={() => window.open('https://wa.me/201111171368', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)] bg-black/60">
                                        <MessageCircle className="w-10 h-10 text-green-500" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-green-500 font-black">WHATSAPP</span>
                                        <span className="text-[20px] text-white font-black italic">+20 111 117 1368</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('tel:19XXX', '_self')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }} className="w-20 h-20 rounded-full border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.4)] bg-black/60">
                                        <Phone className="w-10 h-10 text-cyan-400" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-cyan-400 font-black">SUPPORT_CALL</span>
                                        <span className="text-[20px] text-white font-black italic">19XXX</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 cursor-pointer" onClick={() => window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank')}>
                                    <motion.div animate={{ rotateY: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="w-20 h-20 rounded-full border-2 border-sahara-gold flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] bg-black/60">
                                        <MapPin className="w-10 h-10 text-sahara-gold" />
                                    </motion.div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] text-sahara-gold font-black">GIZA_HQ</span>
                                        <span className="text-[20px] text-white font-black italic">حدائق الأهرام</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* HUD STATUS BAR (Proof of sound) */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none z-50 p-6 flex flex-col gap-4">
                     <div className="flex items-center justify-center gap-1 h-8 opacity-40">
                         {[...Array(20)].map((_, i) => (
                             <motion.div 
                                key={`wave-${i}`}
                                animate={{ height: [4, Math.random() * 20 + 8, 4] }}
                                transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                                className="w-1 bg-cyan-400 rounded-full"
                             />
                         ))}
                     </div>
                </div>

                <div className="absolute inset-0 pointer-events-none z-50 p-6 flex flex-col justify-between">
                     <div className="flex justify-between items-start text-cyan-400 opacity-60 text-[10px] robotic-digits tracking-[5px]">
                         <div className="flex gap-4 items-center">
                              <Box className="w-5 h-5 animate-spin-slow" />
                              <span>LEVEL_17.5_ACOUSTIC_SHOCK</span>
                         </div>
                         <Radio className="w-4 h-4 animate-pulse text-red-500" />
                     </div>
                </div>

                <style jsx global>{`
                    footer, header { display: none !important; }
                    body { background-color: black !important; overflow: hidden; position: fixed; width: 100%; height: 100%; }
                    .robotic-digits { font-family: 'Courier New', Courier, monospace; }
                    .animate-spin-slow { animation: spin 20s linear infinite; }
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    @keyframes noise { 0% { transform: translate(0,0); } 100% { transform: translate(1%,1%); } }
                `}</style>
            </div>
        </div>
    )
}
