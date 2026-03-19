'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Radio, UserCheck, Activity } from 'lucide-react'

// --- IMPERIAL TRANSCENDENCE V41.0 (FLAT SOVEREIGN ARCHITECTURE) ---

const CELEBRATION_SCRIPT = [
    "شركة ليفر الرائدة للمصاعد",
    "تهنئكم بحلول عيد الفطر المبارك",
    "بمناسبة تدشين مقرها الجديد",
    "من قلب مصر... من الجيزة... حدائق الاهرام",
    "للتواصل... أضغط على الأيقونات"
];

const GOLD = "#c5a059"; // Imperial Sahara Gold

export default function AdClient() {
    const { language } = useLanguage()
    const [phase, setPhase] = useState<'idle' | 'descent' | 'stabilizing' | 'active'>('idle')
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)
    const [audioIntensity, setAudioIntensity] = useState(0)

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
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([200, 100, 200]); }
        setTimeout(() => setPhase('stabilizing'), 1000)
        setTimeout(() => { setPhase('active'); playNarrative(0); }, 3000)
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
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([100, 50, 100]); }
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
                * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
                *::-webkit-scrollbar { display: none !important; }
            `}</style>

            {/* --- INITIALIZATION (ROOT SIBLING Z-9999) --- */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-pointer p-6">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-24">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                             <div className="w-full h-full relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.3)]">
                                <NextImage src="/clients/lever-pioneer/logo_mimic.png" alt="Logo" width={400} height={400} className="object-contain mix-blend-multiply scale-[1.05]" />
                             </div>
                        </div>
                        <div className="flex flex-col items-center gap-6 text-center text-white">
                             <h1 className="font-black text-4xl lg:text-7xl tracking-[0.2em] uppercase italic">SYSTEM</h1>
                             <p className="text-sahara-gold font-bold text-xl tracking-[0.3em] animate-pulse uppercase cursor-pointer">[ BROADCAST CELEBRATION ]</p>
                        </div>
                    </motion.div>
                </div>
            )}
            
            {/* --- ARTWORK BACKGROUND (ROOT SIBLING Z-5) --- */}
            <div className={`fixed inset-0 z-[5] bg-black transition-opacity duration-1500 pointer-events-none ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.25]" />
            </div>

            {/* --- MAIN AD ARTWORK (ROOT SIBLING Z-10) --- */}
            <div className={`fixed inset-0 z-[10] pointer-events-none flex items-center justify-center transition-opacity duration-1500 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                <motion.div animate={{ scale: [1, 1.04 + (audioIntensity * 0.02), 1] }} className="relative w-full h-auto max-h-[96vh] aspect-square flex items-center justify-center px-4 overflow-hidden">
                    <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain" priority />
                    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                         <motion.div style={{ left: '59.5%', top: '47.5%', opacity: audioIntensity * 0.7, scale: 0.8 + (audioIntensity * 3.5) }} className="absolute w-20 h-20 bg-cyan-400 rounded-full blur-[45px] mix-blend-screen" />
                    </div>
                </motion.div>
            </div>

            {/* --- FLAT INTERACTION SURFACE GRID (ROOT SIBLING Z-100) --- */}
            {phase === 'active' && (
                <>
                    {/* HUD METADATA (ROOT Z-100) */}
                    <div className="fixed top-8 left-8 right-8 z-[100] flex justify-between items-start text-cyan-400/40 text-[10px] robotic-digits tracking-[5px] uppercase font-black pointer-events-none">
                         <div className="flex gap-4 items-center">
                              <Activity className="w-5 h-5 animate-pulse" />
                              <span>v41.0_TRANSCENDENCE</span>
                         </div>
                         <Radio className="w-6 h-6 animate-pulse text-red-500" />
                    </div>

                    {/* --- THE SUPREME FLAT HOTSPOTS (ROOT SIBLINGS Z-500) --- */}
                    {/* WhatsApp */}
                    <div onClick={() => handleAction('https://wa.me/201111171368')} className="fixed left-[2.5%] bottom-[29%] w-[45%] h-[11%] z-[500] cursor-pointer hover:bg-cyan-400/5 transition-colors duration-300" />
                    
                    {/* Call */}
                    <div onClick={() => handleAction('tel:+201111171368', true)} className="fixed left-[2.5%] bottom-[17%] w-[45%] h-[11%] z-[500] cursor-pointer hover:bg-cyan-400/5 transition-colors duration-300" />
                    
                    {/* Location */}
                    <div onClick={() => handleAction('https://www.google.com/maps?q=29.9656242,31.0922895')} className="fixed left-[2.5%] bottom-[5%] w-[45%] h-[11%] z-[500] cursor-pointer hover:bg-cyan-400/5 transition-colors duration-300" />

                    {/* SIGNATURE & SOVEREIGN ORB (ROOT Z-500) */}
                    <div onClick={() => handleAction('tel:+201065661882', true)} className="fixed right-[5%] bottom-[8%] z-[500] cursor-pointer group flex items-center gap-4">
                         <div className="flex flex-col text-right">
                              <span className="text-[7px] text-cyan-400/20 tracking-[4px] uppercase font-bold italic">MASTER_DESIGNER</span>
                              <span style={{ color: GOLD, fontFamily: 'Georgia, serif' }} className="font-medium text-xl lg:text-2xl italic tracking-wide">
                                   Sherif Rosas
                              </span>
                         </div>
                         <motion.div animate={{ scale: [1, 1.1 + (audioIntensity * 0.15), 1], rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ opacity: 0.4 + (audioIntensity * 0.4) }} className="w-10 h-10 rounded-full border border-[#c5a059]/40 flex items-center justify-center p-2 bg-black/40 relative">
                              <UserCheck className="w-5 h-5 text-[#c5a059]" />
                         </motion.div>
                    </div>
                </>
            )}
        </div>
    )
}
