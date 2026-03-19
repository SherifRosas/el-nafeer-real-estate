'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Radio, UserCheck, Activity } from 'lucide-react'

// --- IMPERIAL OMNI-TOUCH SOVEREIGNTY V38.0 (PC & MOBILE) ---

const CELEBRATION_SCRIPT = [
    "شركة ليفر الرائدة للمصاعد",
    "تهنئكم بحلول عيد الفطر المبارك",
    "بمناسبة تدشين مقرها الجديد",
    "من قلب مصر... من الجيزة... حدائق الاهرام",
    "للتواصل... أضغط على الأيقونات"
];

export default function AdClient() {
    const { language } = useLanguage()
    const [phase, setPhase] = useState<'idle' | 'descent' | 'stabilizing' | 'active'>('idle')
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)
    const [audioIntensity, setAudioIntensity] = useState(0)

    const bgMusicRef = useRef<HTMLAudioElement | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    const startSurvivorEngine = () => {
        if (!bgMusicRef.current) return;
        const updateVisuals = () => {
            const pulse = 0.4 + Math.sin(Date.now() / 240) * 0.45;
            setAudioIntensity(pulse);
            animationFrameRef.current = requestAnimationFrame(updateVisuals);
        };
        updateVisuals();
        bgMusicRef.current.muted = false; bgMusicRef.current.volume = 1.0;
        bgMusicRef.current.play().catch(() => {});
    }

    const startUltimaSequence = () => {
        setIsAudioUnlocked(true)
        setPhase('descent')
        startSurvivorEngine()
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([200, 100, 200]); }
        setTimeout(() => setPhase('stabilizing'), 1500)
        setTimeout(() => {
            setPhase('active');
            playNarrative(0);
        }, 3500)
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
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([100]); }
        window.open(url, isTel ? '_self' : '_blank');
    }

    return (
        <div className="fixed inset-0 z-[999999] bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans cursor-default">
            <audio ref={bgMusicRef} loop playsInline preload="auto">
                <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" type="audio/mpeg" />
            </audio>

            <style jsx global>{`
                footer, header, nav, #main-nav, .site-footer, div[data-footer], #footer { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }
                body { background: black !important; overflow: hidden !important; position: fixed !important; width: 100% !important; height: 100% !important; }
                * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
                *::-webkit-scrollbar { display: none !important; }
                .robotic-digits { font-family: 'Courier New', Courier, monospace; }
                .animate-spin-slow { animation: spin 25s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>

            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center cursor-pointer p-6">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-24">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                             <div className="w-full h-full relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.3)]">
                                <NextImage src="/clients/lever-pioneer/logo_mimic.png" alt="Logo" width={400} height={400} className="object-contain mix-blend-multiply scale-[1.05]" />
                             </div>
                        </div>
                        <div className="flex flex-col items-center gap-6 text-center text-white">
                             <h1 className="font-black text-4xl lg:text-7xl tracking-[0.2em] uppercase">SYSTEM</h1>
                             <p className="text-sahara-gold font-bold text-xl tracking-[0.3em] animate-pulse uppercase cursor-pointer pointer-events-auto">
                                 [ CLICK TO BROADCAST ]
                             </p>
                        </div>
                    </motion.div>
                </div>
            )}
            
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1500 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 z-0 bg-black">
                         <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.25]" />
                     </div>
                     <motion.div animate={{ scale: [1, 1.04 + (audioIntensity * 0.02), 1] }} className="relative w-full h-full z-10 flex items-center justify-center">
                         <div className="relative w-full h-auto max-h-[96vh] aspect-square flex items-center justify-center px-4 overflow-hidden">
                            <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain" priority />
                            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                                 <motion.div style={{ left: '59.5%', top: '47.5%', opacity: audioIntensity * 0.7, scale: 0.8 + (audioIntensity * 3.5) }} className="absolute w-20 h-20 bg-cyan-400 rounded-full blur-[45px] mix-blend-screen" />
                            </div>
                         </div>
                     </motion.div>
                </div>

                {/* --- OMNI-TOUCH OVERLAY (PC HOVER SUPPORT) --- */}
                {phase === 'active' && (
                    <div className="fixed inset-0 z-[1000000] h-full w-full pointer-events-none flex flex-col justify-between">
                         
                         <div className="p-8 flex justify-between items-start text-cyan-400/40 text-[10px] robotic-digits tracking-[5px] uppercase font-black">
                              <div className="flex gap-4 items-center">
                                   <Activity className="w-5 h-5 animate-pulse" />
                                   <span>v38.0_OMNI_TOUCH</span>
                              </div>
                              <Radio className="w-6 h-6 animate-pulse text-red-500" />
                         </div>

                         {/* ABSOLUTE CONTACT GRID (PC HOVER ACTIVE) */}
                         <div className="absolute left-[5%] bottom-[8%] w-[45%] h-[35%] pointer-events-auto flex flex-col group">
                              <div onClick={() => handleAction('https://wa.me/201111171368')} className="h-1/3 w-full cursor-pointer transition-colors duration-300 hover:bg-cyan-400/5 rounded-t-xl" />
                              <div onClick={() => handleAction('tel:+201111171368', true)} className="h-1/3 w-full cursor-pointer transition-colors duration-300 hover:bg-cyan-400/5" />
                              <div onClick={() => handleAction('https://www.google.com/maps?q=29.9656242,31.0922895')} className="h-1/3 w-full cursor-pointer transition-colors duration-300 hover:bg-cyan-400/5 rounded-b-xl" />
                         </div>

                         {/* SHERIF ROSAS SIGNATURE & ORB */}
                         <div className="flex justify-end p-8 pb-16">
                              <div onClick={() => handleAction('tel:+201065661882', true)} className="flex items-center gap-4 cursor-pointer pointer-events-auto group">
                                   <div className="flex flex-col text-right transition-opacity duration-300 group-hover:opacity-100">
                                        <span className="text-[7px] text-cyan-400/20 tracking-[4px] uppercase font-bold italic">MASTER_DESIGNER</span>
                                        <span className="text-sahara-gold font-medium text-xl lg:text-2xl italic tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                                             Sherif Rosas
                                        </span>
                                   </div>
                                   <motion.div animate={{ scale: [1, 1.1 + (audioIntensity * 0.15), 1], rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ opacity: 0.4 + (audioIntensity * 0.4) }} className="w-10 h-10 rounded-full border border-sahara-gold/40 flex items-center justify-center p-2 bg-black/40 relative">
                                        <UserCheck className="w-5 h-5 text-sahara-gold" />
                                        <motion.div animate={{ scale: [1, 2.5], opacity: [0.3, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 border border-sahara-gold rounded-full" />
                                   </motion.div>
                              </div>
                         </div>
                    </div>
                )}
            </div>
        </div>
    )
}
