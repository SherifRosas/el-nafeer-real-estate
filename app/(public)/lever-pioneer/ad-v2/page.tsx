'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Radio } from 'lucide-react'

// --- IMPERIAL KINETIC CINEMA V27.0 (SENTIENT KINETICS) ---

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
    const [audioIntensity, setAudioIntensity] = useState(0) // 0 to 1 real-time value
    
    const bgMusicRef = useRef<HTMLAudioElement | null>(null)
    const audioCtxRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    // THE AUDIO-VISUAL ANALYZER (Listens to the music and updates visual intensity)
    const setupAudioAnalysis = () => {
        if (!bgMusicRef.current || analyserRef.current) return;
        
        try {
            const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass();
            const source = ctx.createMediaElementSource(bgMusicRef.current);
            const analyser = ctx.createAnalyser();
            
            analyser.fftSize = 64; 
            source.connect(analyser);
            analyser.connect(ctx.destination);
            
            audioCtxRef.current = ctx;
            analyserRef.current = analyser;

            const update = () => {
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);
                
                // Average intensity (focusing on low-end/bass for impact)
                const bassValue = dataArray[1] || 0; 
                const normalized = Math.min(bassValue / 180, 1);
                setAudioIntensity(normalized);
                
                animationFrameRef.current = requestAnimationFrame(update);
            };
            update();
        } catch (e) {
            console.log("Audio Analysis Pending Broadcast...");
        }
    }

    const forceAudio = () => {
        if (!bgMusicRef.current) return;
        bgMusicRef.current.muted = false;
        bgMusicRef.current.volume = 1.0;
        bgMusicRef.current.play().then(setupAudioAnalysis).catch(() => {});
    }

    const startUltimaSequence = () => {
        setIsAudioUnlocked(true)
        setPhase('descent')
        forceAudio();
        if (typeof window !== 'undefined' && navigator.vibrate) { navigator.vibrate([100, 10, 100]); }
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

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        }
    }, []);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans">
            {/* CROSS-ORIGIN ANONYMOUS helps the Analyser handle external MP3s */}
            <audio ref={bgMusicRef} crossOrigin="anonymous" loop playsInline src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" />

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
                             <h1 className="text-white font-black text-5xl lg:text-8xl tracking-[0.2em] robotic-digits uppercase">LEVER</h1>
                             <p className="text-sahara-gold font-black text-2xl tracking-[0.2em] uppercase animate-pulse">[ INITIATE KINETICS ]</p>
                        </div>
                    </motion.div>
                </div>
            )}
            
            <div className={`relative w-full h-full flex flex-col items-center justify-center transition-all duration-1500 ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                     {/* BLURRED BACKDROP */}
                     <div className="absolute inset-0 z-0 bg-black">
                         <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.2]" />
                     </div>

                     {/* MAIN AD (100% VISIBILITY) */}
                     <motion.div animate={{ scale: [1, 1.05 + (audioIntensity * 0.02), 1] }} transition={{ duration: 0.1 }} className="relative w-full h-full z-10 flex items-center justify-center">
                         <div className="relative w-full h-auto max-h-[96vh] aspect-square flex items-center justify-center px-4">
                            <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain" priority />

                            {/* --- THE KINETIC LIGHT BEAMS (Reactive to Music) --- */}
                            {phase === 'active' && (
                                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                                     {/* ELEVATOR CENTER CORE (Reactive Pulse) */}
                                     {/* Positioned roughly at 60.5% X, 48% Y based on image data */}
                                     <motion.div 
                                        style={{ 
                                            left: '59%', 
                                            top: '47.5%',
                                            opacity: audioIntensity * 0.8,
                                            scale: 1 + (audioIntensity * 2.5) 
                                        }}
                                        className="absolute w-24 h-24 bg-cyan-400 rounded-full blur-[40px] mix-blend-screen"
                                     />

                                     {/* STARBURST BEAMS (Angular Reactivity) */}
                                     <div 
                                        style={{ left: '60.5%', top: '48%' }} 
                                        className="absolute flex items-center justify-center"
                                     >
                                         {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                                             <motion.div 
                                                key={deg}
                                                style={{ 
                                                    rotate: deg, 
                                                    opacity: 0.1 + (audioIntensity * 0.6),
                                                    width: 40 + (audioIntensity * 600) + 'px'
                                                }}
                                                className="absolute h-[2px] bg-gradient-to-r from-cyan-400 via-white to-transparent origin-left blur-[2px]"
                                             />
                                         ))}
                                     </div>
                                </div>
                            )}

                            {/* --- INVISIBLE ACTION HOTSPOTS (Kept from V26) --- */}
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

                {/* STATUS INDICATOR (Sync with real engine data) */}
                {phase === 'active' && (
                    <div className="fixed inset-0 z-[100] h-full w-full pointer-events-none p-8 flex flex-col justify-between">
                         <div className="flex justify-between items-start text-cyan-400/60 text-[10px] robotic-digits tracking-[5px] uppercase font-black">
                              <div className="flex gap-4 items-center">
                                   <Box className="w-8 h-8 animate-spin-slow" />
                                   <span>LEVEL_27.0_KINETICS</span>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                   <Radio className="w-6 h-6 animate-pulse text-red-500" />
                                   <span className="text-[8px] animate-pulse">AUDIO_SYNC_ACTV</span>
                              </div>
                         </div>

                         <div className="w-full flex justify-center pb-8 opacity-40">
                              <div className="flex gap-1 h-32 items-end">
                                   {[...Array(60)].map((_, i) => (
                                        <motion.div 
                                            key={i} 
                                            style={{ height: (audioIntensity * (Math.random() * 100)) + 4 + 'px' }}
                                            className="w-1 bg-cyan-400 rounded-full" 
                                        />
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
