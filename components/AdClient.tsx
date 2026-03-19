'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCheck } from 'lucide-react'

// --- IMPERIAL OMNI-SURFACE SUPREMACIST V42.0 (COORDINATE MAPPING) ---

const CELEBRATION_SCRIPT = [
    "شركة ليفر الرائدة للمصاعد",
    "تهنئكم بحلول عيد الفطر المبارك",
    "بمناسبة تدشين مقرها الجديد",
    "من قلب مصر... من الجيزة... حدائق الاهرام",
    "للتواصل... أضغط على الأيقونات"
];

const GOLD = "#c5a059"; 

export default function AdClient() {
    const { language } = useLanguage()
    const [phase, setPhase] = useState<'idle' | 'descent' | 'stabilizing' | 'active'>('idle')
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)
    const [audioIntensity, setAudioIntensity] = useState(0)
    const [lastClick, setLastClick] = useState<{ x: number, y: number } | null>(null)

    const bgMusicRef = useRef<HTMLAudioElement | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    const startInteractionEngine = () => {
        if (!bgMusicRef.current) return;
        const update = () => {
            const pulse = 0.4 + Math.sin(Date.now() / 240) * 0.45;
            setAudioIntensity(pulse);
            animationFrameRef.current = requestAnimationFrame(update);
        };
        update();
        bgMusicRef.current.muted = false; bgMusicRef.current.volume = 1.0;
        bgMusicRef.current.play().catch(() => {});
    }

    const startUltimaSequence = () => {
        setIsAudioUnlocked(true)
        setPhase('descent')
        startInteractionEngine()
        if (typeof window !== 'undefined' && window.navigator?.vibrate) { window.navigator.vibrate([150, 50, 150]); }
        setTimeout(() => setPhase('stabilizing'), 1000)
        setTimeout(() => { setPhase('active'); playNarrative(0); }, 2000)
    }

    const playNarrative = (index: number) => {
        if (index >= CELEBRATION_SCRIPT.length) return;
        const utterance = new SpeechSynthesisUtterance(CELEBRATION_SCRIPT[index])
        utterance.lang = 'ar-EG'
        utterance.pitch = 0.95; utterance.rate = 0.85;
        utterance.onend = () => setTimeout(() => playNarrative(index + 1), 1800);
        window.speechSynthesis.speak(utterance)
    }

    const handleAction = (url: string, isTel: boolean = false) => {
        if (typeof window !== 'undefined' && window.navigator?.vibrate) { window.navigator.vibrate(80); }
        window.open(url, isTel ? '_self' : '_blank');
    }

    return (
        <div className="fixed inset-0 z-[1] bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans">
            <audio ref={bgMusicRef} loop playsInline preload="auto">
                <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" type="audio/mpeg" />
            </audio>

            <style jsx global>{`
                footer, header, nav, #main-nav, .site-footer, div[data-footer], #footer { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }
                body { background: black !important; overflow: hidden !important; position: fixed !important; width: 100% !important; height: 100% !important; cursor: default; }
            `}</style>
            
            {/* --- INITIALIZATION (Z-9999) --- */}
            {!isAudioUnlocked && (
                <div className="fixed inset-0 z-[5000] bg-black flex flex-col items-center justify-center p-6">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-24">
                        <motion.div 
                            onTap={startUltimaSequence}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95, y: 5 }}
                            className="relative w-72 h-72 flex items-center justify-center cursor-pointer group pointer-events-auto"
                        >
                             <div 
                                 style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7), inset 0 -10px 20px rgba(0,0,0,0.2), inset 0 10px 20px rgba(255,255,255,0.8)' }}
                                 className="w-full h-full relative rounded-full bg-white flex items-center justify-center overflow-hidden p-10 border-4 border-white/50"
                             >
                                <NextImage 
                                    src="/clients/lever-pioneer/logo_mimic.png" 
                                    alt="Logo" 
                                    width={350} 
                                    height={350} 
                                    className="object-contain mix-blend-multiply scale-[0.85] transition-transform duration-300 group-hover:scale-[0.9]" 
                                />
                             </div>
                             {/* GLOW RING */}
                             <motion.div 
                                animate={{ scale: [1, 1.25], opacity: [0.5, 0] }} 
                                transition={{ duration: 2, repeat: Infinity }} 
                                className="absolute inset-0 rounded-full border-2 border-cyan-400/30 -z-10" 
                             />
                        </motion.div>
                        <div className="flex flex-col items-center gap-6 text-center text-white">
                             <h1 className="font-black text-4xl lg:text-7xl tracking-[0.2em] uppercase italic">SYSTEM</h1>
                             <p className="text-sahara-gold font-bold text-xl tracking-[0.3em] animate-pulse uppercase">
                                 [ PRESS TO ACTIVATE ]
                             </p>
                        </div>
                    </motion.div>
                </div>
            )}
            
            {/* --- ARTWORK & LIGHTS & INTERACTION (Z-10) --- */}
            <div className={`fixed inset-0 z-[10] transition-opacity duration-1500 pointer-events-none ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.25]" />
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.04 + (audioIntensity * 0.02), 1] }} className="relative w-full h-auto max-h-[96vh] aspect-square flex items-center justify-center px-4 overflow-hidden pointer-events-auto">
                        <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain" priority />
                        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                             <motion.div style={{ left: '59.5%', top: '47.5%', opacity: audioIntensity * 0.7, scale: 0.8 + (audioIntensity * 3.5) }} className="absolute w-20 h-20 bg-cyan-400 rounded-full blur-[45px] mix-blend-screen" />
                        </div>

                        {/* --- ART-LOCKED INTERACTION GRID --- */}
                        {phase === 'active' && (
                            <div className="absolute bottom-0 left-0 right-0 h-[45%] z-[99999999] pointer-events-none flex">
                                {/* LEFT COLUMN: ICONS (40% Width) */}
                                <div className="w-[40%] h-full flex flex-col pointer-events-none">
                                     <motion.div onTap={() => handleAction('https://wa.me/201111171368')} className="flex-1 cursor-pointer bg-white/0 hover:bg-white/5 active:bg-white/10 transition-colors pointer-events-auto touch-none" />
                                     <motion.div onTap={() => handleAction('tel:+201111171368', true)} className="flex-1 cursor-pointer bg-white/0 hover:bg-white/5 active:bg-white/10 transition-colors pointer-events-auto touch-none" />
                                     <motion.div onTap={() => handleAction('https://www.google.com/maps?q=29.9656242,31.0922895')} className="flex-1 cursor-pointer bg-white/0 hover:bg-white/5 active:bg-white/10 transition-colors pointer-events-auto touch-none" />
                                </div>

                                {/* RIGHT COLUMN: SIGNATURE (60% Width) */}
                                <div className="w-[60%] h-full flex flex-col pointer-events-none relative">
                                     <div className="flex-[2] pointer-events-none" />
                                     <motion.div onTap={() => handleAction('tel:+201065661882', true)} className="flex-1 cursor-pointer bg-white/0 hover:bg-white/5 active:bg-white/10 transition-colors flex items-end justify-end pr-12 pb-12 gap-4 pointer-events-auto touch-none">
                                          <div className="flex flex-col text-right pointer-events-none">
                                               <span className="text-[7px] text-cyan-400/20 tracking-[4px] uppercase font-bold italic">MASTER_DESIGNER</span>
                                               <span style={{ color: GOLD, fontFamily: 'Georgia, serif' }} className="font-medium text-xl lg:text-2xl italic tracking-wide">
                                                    Sherif Rosas
                                               </span>
                                          </div>
                                          <motion.div animate={{ scale: [1, 1.1 + (audioIntensity * 0.15), 1], rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ opacity: 0.4 + (audioIntensity * 0.4) }} className="w-10 h-10 rounded-full border border-[#c5a059]/40 flex items-center justify-center p-2 bg-black/40 relative pointer-events-none">
                                               <UserCheck className="w-5 h-5 text-[#c5a059]" />
                                          </motion.div>
                                     </motion.div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* --- HUD OVERLAY --- */}
            {phase === 'active' && (
                <div className="fixed left-[8%] bottom-[8%] z-[99999999] flex flex-col pointer-events-none opacity-50">
                    <div className="robotic-digits text-cyan-400/40 text-[8px] uppercase mb-16 font-bold tracking-[10px]">v45.2_RESTORATION</div>
                </div>
            )}
        </div>
    )
}
