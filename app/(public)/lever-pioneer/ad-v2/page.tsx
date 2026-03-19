'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Phone, MessageCircle, MapPin, Zap, Activity, Box, Radio, Volume2
} from 'lucide-react'

// --- IMPERIAL KINETIC CINEMA V21.0 (ACOUSTIC FINALITY) ---

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
    const audioContextRef = useRef<AudioContext | null>(null)

    // THE MASTER UNLOCKER: Generates a local beep to force the browser to unlock audio
    const unlockAudioDevice = () => {
        try {
            const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass();
            const oscillator = ctx.createOscillator();
            const gain = ctx.createGain();
            oscillator.connect(gain);
            gain.connect(ctx.destination);
            gain.gain.value = 0.01; // Tiny audible beep
            oscillator.start(0);
            oscillator.stop(0.1);
            ctx.resume();
            audioContextRef.current = ctx;
            console.log("Audio Engine Transcended.");
        } catch (e) {
            console.error("Critical Audio Fail:", e);
        }
    }

    const forceAudio = () => {
        if (!bgMusicRef.current) return;
        unlockAudioDevice(); // Force local generation first
        bgMusicRef.current.muted = false;
        bgMusicRef.current.volume = 1.0;
        bgMusicRef.current.play().catch(e => console.log("Music Bridge Pending..."));
    }

    const startUltimaSequence = () => {
        setIsAudioUnlocked(true)
        setPhase('descent')
        forceAudio();
        
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([100, 10, 100, 10, 400]); }

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
        utterance.rate = 0.8
        utterance.onend = () => { setTimeout(() => playNarrative(index + 1), 2000); }
        window.speechSynthesis.speak(utterance)
    }

    return (
        <div 
            onClick={forceAudio} 
            className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans"
        >
            {/* TRIPLE REDUNDANT SOURCE (High Availability) */}
            <audio 
                ref={bgMusicRef} 
                loop 
                playsInline 
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" 
            />

            {/* --- MASTER PORTAL --- */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden px-6">
                    
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 flex flex-col items-center gap-24">
                        
                        {/* THE BRAND ORB (Respecting Colors) */}
                        <div className="relative w-80 h-80 flex items-center justify-center">
                             <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[-50px] border border-cyan-400/30 rounded-full" />
                             <motion.div animate={{ y: [-160, 160] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute left-[-30%] right-[-30%] h-[3px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-40" />
                             
                             <div className="w-full h-full relative rounded-full bg-white flex items-center justify-center p-14 overflow-hidden border-4 border-cyan-400/20">
                                <NextImage 
                                    src="/clients/lever-pioneer/logo_mimic.png" 
                                    alt="Brand" width={500} height={500} 
                                    className="object-contain p-2 mix-blend-multiply scale-110" 
                                />
                             </div>
                        </div>

                        <div className="text-center space-y-12">
                             <h1 className="text-white font-black text-5xl lg:text-8xl tracking-[0.3em] robotic-digits uppercase skew-x-[-12deg] glow-text">V21_FINAL</h1>
                             <div className="flex flex-col items-center gap-8">
                                <p className="text-sahara-gold font-black text-3xl tracking-[0.2em] uppercase animate-pulse">
                                    [ TAP TO FORCE SOUND ]
                                </p>
                                <div className="flex items-center gap-4 text-cyan-400/40 text-[10px] robotic-digits">
                                    <Volume2 className="w-5 h-5 animate-ping text-cyan-400" />
                                    <span>ULTRASONIC_WAKE_V21.0</span>
                                </div>
                             </div>
                        </div>
                    </motion.div>
                </div>
            )}
            
            <AnimatePresence>
                {phase === 'descent' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[200] bg-black flex flex-col items-center justify-center">
                        <h2 className="text-white font-black text-4xl tracking-[2rem] robotic-digits uppercase animate-pulse">BREAKTHROUGH</h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AD VIEWPORT (CINEMATIC OMNI-FIT) */}
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1500 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                     {/* 1. BLURRED BACKDROP */}
                     <div className="absolute inset-0 z-0 bg-black">
                         <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-50 brightness-[0.2]" />
                     </div>

                     {/* 2. MAIN AD (ZERO CROP) */}
                     <motion.div 
                        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 60, repeat: Infinity }}
                        className="relative w-full h-full z-10 flex items-center justify-center"
                     >
                         <div className="relative w-full h-auto max-h-[96vh] aspect-square flex items-center justify-center">
                            <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain" priority />

                            {/* HUD PANEL */}
                            <div className="absolute left-[5%] bottom-[5%] lg:left-[8%] lg:bottom-[10%] z-40 pointer-events-none flex flex-col items-start scale-[0.6] lg:scale-110 origin-bottom-left">
                                <div className="w-[420px] lg:w-[480px] flex flex-col gap-40 pointer-events-auto">
                                    <div className="flex items-center gap-10 cursor-pointer" onClick={() => window.open('https://wa.me/201111171368', '_blank')}>
                                        <div className="w-24 h-24 rounded-full border-2 border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.5)] flex items-center justify-center bg-black/80 backdrop-blur-3xl">
                                            <MessageCircle className="w-12 h-12 text-green-500" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] text-green-500 font-black">WHATSAPP</span>
                                            <span className="text-[24px] text-white font-black">+20 111 117 1368</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-10 cursor-pointer" onClick={() => window.open('tel:19XXX', '_self')}>
                                        <div className="w-24 h-24 rounded-full border-2 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.5)] flex items-center justify-center bg-black/80 backdrop-blur-3xl">
                                            <Phone className="w-12 h-12 text-cyan-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] text-cyan-400 font-black">CALL_US</span>
                                            <span className="text-[24px] text-white font-black">19XXX</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-10 cursor-pointer" onClick={() => window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank')}>
                                        <div className="w-24 h-24 rounded-full border-2 border-sahara-gold shadow-[0_0_50px_rgba(212,175,55,0.5)] flex items-center justify-center bg-black/80 backdrop-blur-3xl">
                                            <MapPin className="w-12 h-12 text-sahara-gold" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] text-sahara-gold font-black">LOCATION</span>
                                            <span className="text-[24px] text-white font-black">حدائق الأهرام</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                     </motion.div>
                </div>

                {/* VISUAL SOUND PROOF (Waveform) */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none z-50 p-6 flex items-center justify-center">
                     <div className="flex gap-2 h-12 items-center opacity-40">
                         {[...Array(30)].map((_, i) => (
                             <motion.div key={i} animate={{ height: [4, Math.random() * 40 + 8, 4] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
                         ))}
                     </div>
                </div>

                <div className="absolute inset-0 pointer-events-none z-50 p-6 lg:p-12 flex flex-col justify-between">
                     <div className="flex justify-between items-start text-cyan-400/60 text-[10px] robotic-digits tracking-[5px]">
                         <div className="flex gap-4 items-center">
                              <Box className="w-8 h-8 animate-spin-slow" />
                              <span>LEVEL_21.0_BREAKTHROUGH</span>
                         </div>
                         <div className="flex flex-col items-end gap-2">
                             <Radio className="w-6 h-6 animate-pulse text-red-500" />
                             <span className="text-red-500 font-bold">LIVE_MODE</span>
                         </div>
                     </div>
                </div>

                <style jsx global>{`
                    footer, header { display: none !important; }
                    body { background-color: black !important; overflow: hidden; position: fixed; width: 100%; height: 100%; }
                    .robotic-digits { font-family: 'Courier New', Courier, monospace; }
                    .glow-text { text-shadow: 0 0 40px rgba(34,211,238,0.8); }
                    .animate-spin-slow { animation: spin 20s linear infinite; }
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                `}</style>
            </div>
        </div>
    )
}
