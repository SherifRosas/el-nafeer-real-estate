'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Phone, MessageCircle, MapPin, Zap, Activity, Box, Radio, Volume2
} from 'lucide-react'

// --- IMPERIAL KINETIC CINEMA V22.0 (SENTIENT PHANTOM) ---

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
        try {
            const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass();
            ctx.resume();
        } catch(e) {}
        
        bgMusicRef.current.muted = false;
        bgMusicRef.current.volume = 1.0;
        bgMusicRef.current.play().catch(() => {});
    }

    const startUltimaSequence = () => {
        setIsAudioUnlocked(true)
        setPhase('descent')
        forceAudio();
        
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([100, 50, 200]); }

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
        <div className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans">
            <audio ref={bgMusicRef} loop playsInline src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" />

            {/* --- MASTER PORTAL (ENTRY) --- */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden p-6">
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.2)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)_translateY(200px)] h-full w-full bottom-0" />
                    </div>

                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 flex flex-col items-center gap-24">
                        <div className="relative w-72 h-72 flex items-center justify-center">
                             <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-[-40px] border-2 border-cyan-400/20 rounded-full" />
                             <motion.div animate={{ y: [-150, 150] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute left-[-20%] right-[-20%] h-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-40" />
                             <div className="w-full h-full relative rounded-full bg-white flex items-center justify-center p-12 overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.3)]">
                                <NextImage src="/clients/lever-pioneer/logo_mimic.png" alt="Lever Pioneer" width={400} height={400} className="object-contain p-2 mix-blend-multiply scale-110" />
                             </div>
                        </div>
                        <div className="text-center space-y-12">
                             <h1 className="text-white font-black text-4xl lg:text-7xl tracking-[0.3em] robotic-digits uppercase skew-x-[-10deg]">LEVER_V22</h1>
                             <p className="text-sahara-gold font-black text-2xl tracking-[0.2em] uppercase animate-pulse">[ INITIATE BROADCAST ]</p>
                        </div>
                    </motion.div>
                </div>
            )}
            
            <AnimatePresence>
                {phase === 'descent' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[200] bg-black flex flex-col items-center justify-center text-center">
                        <h2 className="text-white font-black text-4xl tracking-[2rem] robotic-digits uppercase animate-pulse">PHANTOM_MODE</h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* AD VIEWPORT (SMART FIT + PHANTOM HUD) */}
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1500 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 z-0 bg-black">
                         <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.2]" />
                     </div>

                     <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 60, repeat: Infinity }} className="relative w-full h-full z-10 flex items-center justify-center">
                         <div className="relative w-full h-auto max-h-[96vh] aspect-square flex items-center justify-center px-4">
                            <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain" priority />

                            {/* PHANTOM HUD LAYER (Icons Only - No Text) */}
                            <div className="absolute left-[5%] bottom-[5%] lg:left-[8%] lg:bottom-[10%] z-40 flex flex-col items-start scale-[0.6] lg:scale-110 origin-bottom-left">
                                <div className="flex flex-col gap-40">
                                    {/* WHATSAPP ICON */}
                                    <motion.div 
                                        initial={{ x: -100, opacity: 0 }} animate={step >= 2 ? { x: 0, opacity: 1 } : {}}
                                        onClick={(e) => { e.stopPropagation(); window.open('https://wa.me/201111171368', '_blank'); }}
                                        className="w-24 h-24 rounded-full border-2 border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.6)] flex items-center justify-center bg-black/80 backdrop-blur-3xl cursor-pointer hover:scale-110 transition-transform active:scale-95 pointer-events-auto"
                                    >
                                        <MessageCircle className="w-12 h-12 text-green-500" />
                                    </motion.div>
                                    
                                    {/* CALL ICON */}
                                    <motion.div 
                                        initial={{ x: -100, opacity: 0 }} animate={step >= 2 ? { x: 0, opacity: 1 } : {}} transition={{ delay: 0.2 }}
                                        onClick={(e) => { e.stopPropagation(); window.open('tel:+201111171368', '_self'); }}
                                        className="w-24 h-24 rounded-full border-2 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.6)] flex items-center justify-center bg-black/80 backdrop-blur-3xl cursor-pointer hover:scale-110 transition-transform active:scale-95 pointer-events-auto"
                                    >
                                        <Phone className="w-12 h-12 text-cyan-400" />
                                    </motion.div>

                                    {/* LOCATION ICON */}
                                    <motion.div 
                                        initial={{ x: -100, opacity: 0 }} animate={step >= 2 ? { x: 0, opacity: 1 } : {}} transition={{ delay: 0.4 }}
                                        onClick={(e) => { e.stopPropagation(); window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank'); }}
                                        className="w-24 h-24 rounded-full border-2 border-sahara-gold shadow-[0_0_50px_rgba(212,175,55,0.6)] flex items-center justify-center bg-black/80 backdrop-blur-3xl cursor-pointer hover:scale-110 transition-transform active:scale-95 pointer-events-auto"
                                    >
                                        <MapPin className="w-12 h-12 text-sahara-gold" />
                                    </motion.div>
                                </div>
                            </div>
                         </div>
                     </motion.div>
                </div>

                {/* STATUS VISUALS */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none z-50 p-6 flex items-center justify-center">
                     <div className="flex gap-2 h-10 items-center opacity-40">
                         {[...Array(30)].map((_, i) => (
                             <motion.div key={i} animate={{ height: [4, Math.random() * 30 + 4, 4] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-1 bg-cyan-400 rounded-full" />
                         ))}
                     </div>
                </div>

                <div className="absolute inset-0 pointer-events-none z-50 p-12 flex flex-col justify-between">
                     <div className="flex justify-between items-start text-cyan-400/60 text-[10px] robotic-digits tracking-[5px]">
                         <div className="flex gap-4 items-center">
                              <Box className="w-8 h-8 animate-spin-slow" />
                              <span>LEVEL_22.0_PHANTOM</span>
                         </div>
                         <Radio className="w-6 h-6 animate-pulse text-red-500" />
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
