'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Radio } from 'lucide-react'

// --- IMPERIAL KINETIC CINEMA V26.0 (SENTIENT HOTSPOT) ---

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
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)
    const bgMusicRef = useRef<HTMLAudioElement | null>(null)

    const forceAudio = () => {
        if (!bgMusicRef.current) return;
        bgMusicRef.current.muted = false;
        bgMusicRef.current.volume = 1.0;
        bgMusicRef.current.play().catch(() => {});
    }

    const startUltimaSequence = () => {
        setIsAudioUnlocked(true)
        setPhase('descent')
        forceAudio();
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([200, 100, 200]); }
        setTimeout(() => { setPhase('stabilizing'); forceAudio(); }, 3000)
        setTimeout(() => {
            setPhase('active');
            forceAudio();
            playNarrative(0);
        }, 6500)
    }

    const playNarrative = (index: number) => {
        if (index >= CELEBRATION_SCRIPT.length) return;
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

            {/* --- MASTER PORTAL --- */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden p-6">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 flex flex-col items-center gap-24">
                        <div className="relative w-80 h-80 flex items-center justify-center">
                             <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-[-40px] border-2 border-cyan-400/20 rounded-full" />
                             <div className="w-full h-full relative rounded-full bg-white flex items-center justify-center p-14 overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.3)]">
                                <NextImage src="/clients/lever-pioneer/logo_mimic.png" alt="Logo" width={500} height={500} className="object-contain p-2 mix-blend-multiply scale-110" />
                             </div>
                        </div>
                        <div className="text-center space-y-12">
                             <h1 className="text-white font-black text-5xl lg:text-8xl tracking-[0.2em] robotic-digits uppercase">LEVER_v26</h1>
                             <p className="text-sahara-gold font-black text-2xl tracking-[0.2em] uppercase animate-pulse">[ TAP TO OPEN ]</p>
                        </div>
                    </motion.div>
                </div>
            )}
            
            {/* AD VIEWPORT (SMART FIT + INVISIBLE HOTSPOTS) */}
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1500 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 z-0 bg-black">
                         <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.2]" />
                     </div>

                     <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 60, repeat: Infinity }} className="relative w-full h-full z-10 flex items-center justify-center">
                         <div className="relative w-full h-auto aspect-square flex items-center justify-center px-4">
                            <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain" priority />

                            {/* --- INVISIBLE ACTION HOTSPOTS (Maps exactly over the HUD-box in artwork) --- */}
                            {phase === 'active' && (
                                <div className="absolute left-[3%] bottom-[5%] w-[42%] h-[28%] z-50 pointer-events-auto flex flex-col overflow-hidden">
                                     {/* TOP ZONE (WhatsApp) */}
                                     <div 
                                        onClick={(e) => { e.stopPropagation(); window.open('https://wa.me/201111171368', '_blank'); }} 
                                        className="h-1/3 w-full bg-transparent hover:bg-white/5 active:bg-green-500/10 cursor-pointer transition-colors" 
                                     />
                                     {/* MID ZONE (Call) */}
                                     <div 
                                        onClick={(e) => { e.stopPropagation(); window.open('tel:+201111171368', '_self'); }} 
                                        className="h-1/3 w-full bg-transparent hover:bg-white/5 active:bg-cyan-500/10 cursor-pointer transition-colors" 
                                     />
                                     {/* BOTTOM ZONE (Maps) */}
                                     <div 
                                        onClick={(e) => { e.stopPropagation(); window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank'); }} 
                                        className="h-1/3 w-full bg-transparent hover:bg-white/5 active:bg-sahara-gold/10 cursor-pointer transition-colors" 
                                     />
                                </div>
                            )}
                         </div>
                     </motion.div>
                </div>

                {/* STATUS INDICATOR */}
                {phase === 'active' && (
                    <div className="fixed inset-0 z-[100] h-full w-full pointer-events-none p-8 flex flex-col justify-between">
                         <div className="flex justify-between items-start text-cyan-400/60 text-[10px] robotic-digits tracking-[5px] uppercase font-black">
                              <div className="flex gap-4 items-center">
                                   <Box className="w-8 h-8 animate-spin-slow" />
                                   <span>LEVEL_26.0_HOTSPOT</span>
                              </div>
                              <Radio className="w-6 h-6 animate-pulse text-red-500" />
                         </div>

                         <div className="w-full flex justify-center pb-8 opacity-20">
                              <div className="flex gap-2 h-10 items-center">
                                   {[...Array(20)].map((_, i) => (
                                        <motion.div key={i} animate={{ height: [4, Math.random() * 30 + 4, 4] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-1 bg-cyan-400 rounded-full" />
                                   ))}
                              </div>
                         </div>
                    </div>
                )}

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
