'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Radio, UserCheck, Activity } from 'lucide-react'

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
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([100, 50, 100]); }
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

    // THE OMNI-PROCESSOR (Maps screen coordinates to actions)
    const handleOmniTouch = (e: React.MouseEvent | React.TouchEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        
        const xPercent = ((clientX - rect.left) / rect.width) * 100;
        const yPercent = ((clientY - rect.top) / rect.height) * 100;

        // Visual Feedback (Pulse)
        const feedbackX = clientX - rect.left;
        const feedbackY = clientY - rect.top;

        setLastClick({ x: clientX, y: clientY });
        setTimeout(() => setLastClick(null), 400);
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate(80); }

        // MAPPING LOGIC
        if (xPercent < 50) {
            // LEFT SIDE (Artwork Box Region)
            if (yPercent < 33) handleAction('https://wa.me/201111171368');
            else if (yPercent < 66) handleAction('tel:+201111171368', true);
            else handleAction('https://www.google.com/maps?q=29.9656242,31.0922895');
        } else {
            // RIGHT SIDE (Signature Region)
            if (yPercent > 50) handleAction('tel:+201065661882', true);
        }
    }

    const handleAction = (url: string, isTel: boolean = false) => {
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
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center cursor-pointer p-6">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-24">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                             <div className="w-full h-full relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.3)]">
                                <NextImage src="/clients/lever-pioneer/logo_mimic.png" alt="Logo" width={400} height={400} className="object-contain mix-blend-multiply scale-[1.05]" />
                             </div>
                        </div>
                        <div className="text-white text-center">
                             <h1 className="font-black text-4xl lg:text-7xl tracking-[0.2em] uppercase italic">SYSTEM</h1>
                             <p className="text-sahara-gold font-bold text-xl tracking-[0.3em] animate-pulse uppercase cursor-pointer">[ ACTIVATE ]</p>
                        </div>
                    </motion.div>
                </div>
            )}
            
            {/* --- ARTWORK & LIGHTS (Z-10) --- */}
            <div className={`fixed inset-0 z-[10] transition-opacity duration-1500 pointer-events-none ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.25]" />
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.04 + (audioIntensity * 0.02), 1] }} className="relative w-full h-auto max-h-[96vh] aspect-square flex items-center justify-center px-4 overflow-hidden">
                        <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain" priority />
                        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                             <motion.div style={{ left: '59.5%', top: '47.5%', opacity: audioIntensity * 0.7, scale: 0.8 + (audioIntensity * 3.5) }} className="absolute w-20 h-20 bg-cyan-400 rounded-full blur-[45px] mix-blend-screen" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- OMNI-TOUCH CONTROLLER SURFACE (Z-1000) --- */}
            {phase === 'active' && (
                <div onMouseDown={handleOmniTouch} onTouchStart={handleOmniTouch} className="fixed bottom-0 left-0 right-0 h-[45%] z-[1000] cursor-pointer pointer-events-auto bg-black/0 select-none overflow-hidden">
                    
                    {/* FEEDBACK PING */}
                    {lastClick && (
                        <motion.div initial={{ scale: 0, opacity: 0.8 }} animate={{ scale: 2, opacity: 0 }} className="absolute w-12 h-12 bg-cyan-400 rounded-full blur-xl pointer-events-none" style={{ left: lastClick.x - 24, top: lastClick.y - ((typeof window !== 'undefined' ? window.innerHeight : 1000) * 0.55) - 24 }} />
                    )}

                    {/* VISUAL OVERLAYS (STILL PURE, BUT STRUCTURALLY LOCKED) */}
                    <div className="absolute left-[8%] bottom-[8%] flex flex-col pointer-events-none opacity-50">
                         <div className="robotic-digits text-cyan-400/40 text-[8px] tracking-[4px] uppercase mb-16">v42.1_SUPREME_FIX</div>
                    </div>

                    <div className="absolute right-[5%] bottom-[12%] pointer-events-none flex items-center gap-4">
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
                </div>
            )}
        </div>
    )
}
