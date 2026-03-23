'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MapPin, ExternalLink } from 'lucide-react'

// --- IMPERIAL OMNI-SURFACE SUPREMACIST V42.0 (COORDINATE MAPPING) ---

const GOLD = "#c5a059";

export default function QuantumAd() {
    const { language } = useLanguage()
    const [phase, setPhase] = useState<'active'>('active')
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)
    const [audioIntensity, setAudioIntensity] = useState(0)
    const [isMuted, setIsMuted] = useState(true)

    const bgMusicRef = useRef<HTMLAudioElement | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    const trackInteraction = async (action: string, url: string) => {
        try {
            const searchParams = new URLSearchParams(window.location.search);
            const source = searchParams.get('src') || 'direct';
            
            await fetch('/api/campaign/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    campaignId: 'lever-pioneer-v2',
                    action,
                    url,
                    source
                })
            });
        } catch (error) {
            console.warn('Track Error:', error);
        }
    }

    const startInteractionEngine = useCallback(() => {
        try {
            if (!bgMusicRef.current) return;
            const update = () => {
                const pulse = 0.4 + Math.sin(Date.now() / 240) * 0.45;
                setAudioIntensity(pulse);
                animationFrameRef.current = requestAnimationFrame(update);
            };
            update();
        } catch (error) {
            console.error("Interaction Engine Failure:", error);
        }
    }, []);

    const unlockMusic = useCallback(() => {
        if (bgMusicRef.current && !isAudioUnlocked) {
            // Ensure audio is ready to fire
            bgMusicRef.current.muted = false;
            bgMusicRef.current.volume = 1.0;
            
            const playPromise = bgMusicRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsAudioUnlocked(true);
                        setIsMuted(false);
                        startInteractionEngine();
                        // Only remove listeners if play succeeded
                        window.removeEventListener('click', unlockMusic);
                        window.removeEventListener('touchstart', unlockMusic);
                    })
                    .catch(e => {
                        console.warn("Music Play Still Blocked - Retrying on next touch:", e);
                    });
            }
        }
    }, [isAudioUnlocked, startInteractionEngine]);

    useEffect(() => {
        window.addEventListener('click', unlockMusic);
        window.addEventListener('touchstart', unlockMusic);

        trackInteraction('OPEN_INSTANT', window.location.href);

        // --- HUD TAKEOVER (LEVEL 110.5) ---
        // Forcefully remove SSR fallback elements to prevent overlap
        const cleanupSSR = () => {
            const ssrHud = document.getElementById('ssr-active-hud-layer');
            const ssrBg = document.getElementById('ssr-artwork-bg');
            const ssrMute = document.getElementById('ssr-mute-ring');
            if (ssrHud) ssrHud.remove();
            if (ssrBg) ssrBg.remove();
            if (ssrMute) ssrMute.remove();
        };

        // Delay slightly to ensure React has painted its own HUD
        const timer = setTimeout(cleanupSSR, 100);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('click', unlockMusic);
            window.removeEventListener('touchstart', unlockMusic);
        };
    }, [unlockMusic]);

    const handleAction = (actionType: string, url: string) => {
        if (typeof window !== 'undefined') {
             if (window.navigator && window.navigator.vibrate) { window.navigator.vibrate(80); }
             trackInteraction(actionType, url);
        }
    }

    return (
        <div className="fixed inset-0 z-[1] bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans">
            <audio id="quantum-bg-audio" ref={bgMusicRef} loop playsInline preload="auto" muted>
                <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" type="audio/mpeg" />
            </audio>

            <style jsx global>{`
                body { background: black !important; overflow: hidden !important; position: fixed !important; width: 100% !important; height: 100% !important; }
            `}</style>
            
            {/* --- ARTWORK & LIGHTS & INTERACTION (Z-10) --- */}
            <div className={`fixed inset-0 z-[10] transition-opacity duration-[1500ms] pointer-events-none ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.25]" />
                <div className="relative w-full h-full flex items-center justify-center translate-y-[40px]">
                    <motion.div 
                        animate={{ scale: [1, 1.04 + (audioIntensity * 0.02), 1] }} 
                        className="relative w-full h-auto max-h-[96vh] aspect-square flex items-center justify-center overflow-hidden pointer-events-auto transform-gpu"
                    >
                        <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="Ad" fill className="object-contain" priority />
                        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                             <motion.div style={{ left: '59.5%', top: '47.5%', opacity: audioIntensity * 0.7, scale: 0.8 + (audioIntensity * 3.5) }} className="absolute w-20 h-20 bg-cyan-400 rounded-full blur-[45px] mix-blend-screen transform-gpu" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- IMPERIAL ACTION HUD (COMPACT CALIBRATION V110.5) --- */}
            {phase === 'active' && (
                <div className="fixed left-1/2 -translate-x-1/2 top-[130px] z-[999999] w-[95%] max-w-[450px] px-4 flex justify-around items-center gap-4 pointer-events-auto">
                    <motion.a 
                        href="tel:+201070615372" 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="block active:scale-90 transition-transform"
                    >
                        <div 
                            onClick={(e) => {
                                handleAction('CALLING', 'tel:+201070615372');
                                unlockMusic();
                            }}
                            className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:bg-cyan-500/20 transition-colors group"
                        >
                            <Phone className="w-7 h-7 text-cyan-400" />
                        </div>
                    </motion.a>

                    <motion.a 
                        href="https://wa.me/201111171368" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="block active:scale-90 transition-transform"
                    >
                        <div 
                            onClick={(e) => {
                                handleAction('WHATSAPP', 'https://wa.me/201111171368');
                                unlockMusic();
                            }}
                            className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-green-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:bg-green-500/20 transition-colors group"
                        >
                            <MessageCircle className="w-7 h-7 text-green-400" />
                        </div>
                    </motion.a>

                    <motion.a 
                        href="https://www.google.com/maps?q=29.9656242,31.0922895" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="block active:scale-90 transition-transform"
                    >
                        <div 
                            onClick={(e) => {
                                handleAction('LOCATION', 'https://www.google.com/maps?q=29.9656242,31.0922895');
                                unlockMusic();
                            }}
                            className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-[#c5a059]/40 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:bg-[#c5a059]/20 transition-colors group"
                        >
                            <MapPin className="w-7 h-7 text-[#c5a059]" />
                        </div>
                    </motion.a>
                </div>
            )}

            {/* --- MUTE RING (AUDIO TOGGLE V110.5) --- */}
            {phase === 'active' && (
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="fixed bottom-6 left-6 z-[999999]"
                >
                    <div 
                        onClick={() => {
                            if (!isAudioUnlocked) {
                                unlockMusic();
                            } else {
                                if (bgMusicRef.current) {
                                    bgMusicRef.current.muted = !isMuted;
                                    setIsMuted(!isMuted);
                                }
                            }
                        }}
                        className={`w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer transition-all ${!isAudioUnlocked ? 'animate-pulse' : ''} hover:bg-white/10`}
                    >
                        {!isAudioUnlocked || isMuted ? (
                            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        )}
                    </div>
                </motion.div>
            )}

            {/* --- EXTERIOR SIGNATURE (LEGACY SHIELD - NO BLUR) --- */}
            {phase === 'active' && (
                <div className="fixed right-[4%] bottom-[4%] z-[999999]">
                    <a href="tel:+201065661882" className="block active:scale-95 transition-transform">
                        <div 
                             onClick={() => handleAction('SIGNATURE_DIRECT', 'tel:+201065661882')} 
                             className="cursor-pointer bg-black/90 rounded-2xl p-4 border border-white/20 transition-all flex items-center gap-4 shadow-2xl"
                        >
                             <div className="flex flex-col text-right">
                                  <span className="text-[7px] text-cyan-400/60 tracking-[4px] uppercase font-black italic">DESIGNER</span>
                                  <span style={{ color: GOLD, fontFamily: 'Georgia, serif' }} className="font-bold text-base italic tracking-wide">
                                       Sherif Rosas
                                  </span>
                             </div>
                             <div className="w-10 h-10 rounded-full border-2 border-[#c5a059]/50 flex items-center justify-center bg-black/40">
                                  <Phone className="w-4 h-4 text-[#c5a059]" />
                             </div>
                        </div>
                    </a>
                </div>
            )}

        </div>
    )
}
