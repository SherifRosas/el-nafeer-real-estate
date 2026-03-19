'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Radio, UserCheck } from 'lucide-react'

// --- IMPERIAL KINETIC CINEMA V29.0 (SENTIENT RESCUE) ---

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
    const [audioIntensity, setAudioIntensity] = useState(0)

    const bgMusicRef = useRef<HTMLAudioElement | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    // THE ROBUST ENGINE: Real analysis if possible, Heartbeat fallback if blocked
    const startInteractionEngine = () => {
        if (!bgMusicRef.current) return;
        
        const update = () => {
            let intensity = 0;
            if (analyserRef.current) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                intensity = Math.min((dataArray[1] || 0) / 180, 1);
            } else {
                // FALLBACK: Pulse based on time (120bpm simulated heartbeat)
                intensity = 0.3 + Math.sin(Date.now() / 250) * 0.4;
            }
            setAudioIntensity(intensity);
            animationFrameRef.current = requestAnimationFrame(update);
        };

        // 1. Force the music to play first - No matter what
        bgMusicRef.current.muted = false;
        bgMusicRef.current.volume = 1.0;
        bgMusicRef.current.play().then(() => {
            // 2. Try to setup analysis only AFTER music is confirmed playing
            try {
                const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
                const ctx = new AudioContextClass();
                const source = ctx.createMediaElementSource(bgMusicRef.current!);
                const analyser = ctx.createAnalyser();
                analyser.fftSize = 64; 
                source.connect(analyser); analyser.connect(ctx.destination);
                analyserRef.current = analyser;
                console.log("Acoustic Link Synchronized.");
            } catch (err) {
                console.log("Using Digital Heartbeat Fallback.");
            }
            update();
        }).catch((e) => {
            console.log("User Interaction Required for Sound.");
            update(); // Still pulse the lights even if sound fails to start
        });
    }

    const startUltimaSequence = () => {
        setIsAudioUnlocked(true)
        setPhase('descent')
        startInteractionEngine();
        setTimeout(() => setPhase('stabilizing'), 3000)
        setTimeout(() => { setPhase('active'); playNarrative(0); }, 6500)
    }

    const playNarrative = (index: number) => {
        if (index >= CELEBRATION_SCRIPT.length) return;
        const utterance = new SpeechSynthesisUtterance(CELEBRATION_SCRIPT[index])
        utterance.lang = 'ar-EG'
        utterance.pitch = 0.95; utterance.rate = 0.82;
        utterance.onend = () => setTimeout(() => playNarrative(index + 1), 2200);
        window.speechSynthesis.speak(utterance)
    }

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans">
            <audio ref={bgMusicRef} loop playsInline src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" />

            {/* --- MASTER PORTAL --- */}
            {!isAudioUnlocked && (
                <div onClick={startUltimaSequence} className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center cursor-pointer">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-24">
                        <div className="relative w-80 h-80 flex items-center justify-center">
                             <div className="w-full h-full relative rounded-full bg-white flex items-center justify-center p-14 shadow-[0_0_80px_rgba(34,211,238,0.3)] border-2 border-cyan-400/20">
                                <NextImage src="/clients/lever-pioneer/logo_mimic.png" alt="Logo" width={500} height={500} className="object-contain p-2 mix-blend-multiply" />
                             </div>
                        </div>
                        <h1 className="text-white font-black text-5xl lg:text-8xl tracking-[0.2em] robotic-digits uppercase">LEVER</h1>
                        <p className="text-sahara-gold font-black text-2xl tracking-[0.2em] animate-pulse">[ BROADCAST_RECOVERY_v29 ]</p>
                    </motion.div>
                </div>
            )}
            
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1500 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 z-0 bg-black">
                         <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.2]" />
                     </div>

                     <motion.div animate={{ scale: [1, 1.05 + (audioIntensity * 0.02), 1] }} className="relative w-full h-full z-10 flex items-center justify-center">
                         <div className="relative w-full h-auto max-h-[96vh] aspect-square flex items-center justify-center px-4">
                            <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain" priority />

                            {/* --- KINETIC LIGHT PULSE (RESCUE MODE) --- */}
                            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                                 <motion.div style={{ left: '59%', top: '47.5%', opacity: audioIntensity * 0.8, scale: 0.5 + (audioIntensity * 3.5) }} className="absolute w-24 h-24 bg-cyan-400 rounded-full blur-[45px] mix-blend-screen" />
                            </div>

                            {/* --- INVISIBLE ACTION HOTSPOTS --- */}
                            {phase === 'active' && (
                                <div className="absolute left-[3%] bottom-[5%] w-[42%] h-[28%] z-50 pointer-events-auto flex flex-col">
                                     <div onClick={(e) => { e.stopPropagation(); window.open('https://wa.me/201111171368', '_blank'); }} className="h-1/3 w-full cursor-pointer" />
                                     <div onClick={(e) => { e.stopPropagation(); window.open('tel:+201111171368', '_self'); }} className="h-1/3 w-full cursor-pointer" />
                                     <div onClick={(e) => { e.stopPropagation(); window.open('https://www.google.com/maps?q=29.9656242,31.0922895', '_blank'); }} className="h-1/3 w-full cursor-pointer" />
                                </div>
                            )}
                         </div>
                     </motion.div>
                </div>

                {/* --- SOVEREIGN LAYER --- */}
                {phase === 'active' && (
                    <div className="fixed inset-0 z-[100] h-full w-full pointer-events-none p-8 flex flex-col justify-between">
                         <div className="flex justify-between items-start text-cyan-400/60 text-[10px] robotic-digits tracking-[5px] uppercase font-black">
                              <div className="flex gap-4 items-center">
                                   <Box className="w-8 h-8 animate-spin-slow" />
                                   <span>LEVEL_29.0_RESCUE</span>
                              </div>
                              <Radio className="w-6 h-6 animate-pulse text-red-500" />
                         </div>

                         <div className="flex justify-between items-end pb-4">
                              <div className="flex flex-col gap-2 scale-75 origin-bottom-left opacity-30">
                                   <div className="flex gap-1 h-12 items-end">
                                        {[...Array(30)].map((_, i) => (
                                             <motion.div key={i} style={{ height: (audioIntensity * 20) + 4 + 'px' }} className="w-1 bg-cyan-400 rounded-full" />
                                        ))}
                                   </div>
                              </div>

                              {/* MASTER SIGNATURE & SOVEREIGN ORB (Recovery Build) */}
                              <div className="flex flex-col items-end gap-2 pointer-events-auto">
                                   <div onClick={() => window.open('tel:+201065661882', '_self')} className="flex items-center gap-4 cursor-pointer">
                                        <div className="text-right flex flex-col">
                                             <span className="text-cyan-400/40 text-[8px] tracking-[4px] font-black uppercase">MASTER_DESIGNER</span>
                                             <span className="text-sahara-gold font-medium text-2xl lg:text-3xl italic tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                                                  Sherif Rosas
                                             </span>
                                        </div>
                                        <motion.div animate={{ scale: [1, 1.2, 1], rotate: 360 }} transition={{ duration: 4, repeat: Infinity }} style={{ opacity: 0.5 + (audioIntensity * 0.5) }} className="w-12 h-12 rounded-full border border-sahara-gold flex items-center justify-center p-2 shadow-[0_0_30px_rgba(212,175,55,0.3)] bg-black/60 relative">
                                             <UserCheck className="w-6 h-6 text-sahara-gold" />
                                             <motion.div animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 border border-sahara-gold rounded-full" />
                                        </motion.div>
                                   </div>
                                   <div className="text-[7px] text-cyan-400/20 tracking-[2px] font-black italic uppercase">PROJECT_SAVED_v29.0</div>
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
