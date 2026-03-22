'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MapPin, ExternalLink } from 'lucide-react'

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

    useEffect(() => {
        // --- ATOMIC ACTIVATION SYNC (LEVEL 103.9) ---
        const checkbox = document.getElementById('activate-ad') as HTMLInputElement;
        
        const syncState = () => {
            if (checkbox?.checked && !isAudioUnlocked) {
                startUltimaSequence();
            }
        };

        // --- UNIFIED HANDOVER (LEVEL 103.8) ---
        setTimeout(() => {
            syncState();
            const shadow = document.getElementById('ssr-shadow-layer');
            const shadowHud = document.getElementById('ssr-active-hud-layer');
            if (shadow) {
                shadow.style.opacity = '0';
                setTimeout(() => shadow.style.display = 'none', 500);
            }
            if (shadowHud) {
                shadowHud.style.opacity = '0';
                setTimeout(() => shadowHud.style.display = 'none', 500);
            }
        }, 800);
    }, []);
    const [lastClick, setLastClick] = useState<{ x: number, y: number } | null>(null)

    const bgMusicRef = useRef<HTMLAudioElement | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    const startInteractionEngine = () => {
        try {
            if (!bgMusicRef.current) return;
            const update = () => {
                try {
                    const pulse = 0.4 + Math.sin(Date.now() / 240) * 0.45;
                    setAudioIntensity(pulse);
                    animationFrameRef.current = requestAnimationFrame(update);
                } catch (e) {
                    console.error("Pulse Engine Error:", e);
                }
            };
            update();
            bgMusicRef.current.muted = false; bgMusicRef.current.volume = 1.0;
            bgMusicRef.current.play().catch((e) => console.warn("Audio Play Blocked:", e));
        } catch (error) {
            console.error("Interaction Engine Failure:", error);
        }
    }

    const startUltimaSequence = () => {
        setIsAudioUnlocked(true)
        setPhase('descent')
        startInteractionEngine()

        // --- NARRATIVE UNLOCK (GESTURE CONSUMPTION) ---
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const unlocker = new SpeechSynthesisUtterance(" ");
            unlocker.volume = 0;
            window.speechSynthesis.speak(unlocker);
        }

        // --- CAMPAIGN ANALYTICS (OPEN EVENT) ---
        trackInteraction('OPEN', window.location.href);

        if (typeof window !== 'undefined' && window.navigator?.vibrate) { window.navigator.vibrate([150, 50, 150]); }
        setTimeout(() => setPhase('stabilizing'), 1000)
        setTimeout(() => { setPhase('active'); playNarrative(0); }, 2000)
    }

    const playNarrative = (index: number) => {
        if (index >= CELEBRATION_SCRIPT.length) return;
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

        try {
            const startSpeech = () => {
                try {
                    const utterance = new SpeechSynthesisUtterance(CELEBRATION_SCRIPT[index])
                    const voices = window.speechSynthesis.getVoices();
                    const preferredVoice = voices.find(v => v.lang === 'ar-EG') || 
                                           voices.find(v => v.lang.startsWith('ar')) ||
                                           null;
                    
                    if (preferredVoice) {
                        utterance.voice = preferredVoice;
                        utterance.lang = preferredVoice.lang;
                    } else {
                        utterance.lang = 'ar-EG';
                    }

                    utterance.volume = 1; utterance.pitch = 0.95; utterance.rate = 0.85;
                    utterance.onend = () => setTimeout(() => playNarrative(index + 1), 1800);
                    window.speechSynthesis.speak(utterance)
                } catch (e) {
                    console.error("Voice Track Error:", e);
                    setTimeout(() => playNarrative(index + 1), 2000); // Fallback to next track
                }
            }

            if (window.speechSynthesis.getVoices().length === 0) {
                window.speechSynthesis.onvoiceschanged = () => {
                    window.speechSynthesis.onvoiceschanged = null;
                    startSpeech();
                };
            } else {
                startSpeech();
            }
        } catch (error) {
            console.error("Speech Engine Error:", error);
        }
    }

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

    const handleAction = (actionType: string, url: string) => {
        if (typeof window !== 'undefined') {
             if (window.navigator?.vibrate) { window.navigator.vibrate(80); }
             console.log(`Interaction_[${actionType}]_LOG: `, url);
             trackInteraction(actionType, url);
        }
    }

    return (
        <div className="fixed inset-0 z-[1] bg-black flex items-center justify-center p-0 m-0 overflow-hidden select-none font-sans">
            <audio ref={bgMusicRef} loop playsInline preload="auto">
                <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" type="audio/mpeg" />
            </audio>

            <style jsx global>{`
                body { background: black !important; overflow: hidden !important; position: fixed !important; width: 100% !important; height: 100% !important; }
            `}</style>
            
            {/* --- INITIALIZATION (Z-9999) --- */}
            {!isAudioUnlocked && (
                <div className="fixed inset-0 z-[5000] bg-black flex flex-col items-center justify-center p-6">
                    <div className="flex flex-col items-center gap-24">
                        <div 
                            onClick={startUltimaSequence}
                            className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-white flex items-center justify-center p-10 border-4 border-white/50 cursor-pointer shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-transform active:scale-95"
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
                             {/* MULTI-STAGE RIPPLE ENGINE */}
                             {[1, 1.5, 2].map((s, i) => (
                                 <motion.div 
                                    key={i}
                                    animate={{ scale: [1, 1.4 + (i * 0.2)], opacity: [0.6, 0] }} 
                                    transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }} 
                                    className="absolute inset-0 rounded-full border-2 border-cyan-400/40 -z-10" 
                                 />
                             ))}
                             <motion.div 
                                animate={{ scale: [1, 1.1], opacity: [0.3, 0.6, 0.3] }} 
                                transition={{ duration: 1.5, repeat: Infinity }} 
                                className="absolute -inset-4 rounded-full bg-cyan-400/5 blur-2xl -z-20" 
                             />
                        </div>
                         <div className="flex flex-col items-center gap-6 text-center text-white">
                              <motion.h1 
                                 animate={{ textShadow: ["0 0 10px rgba(6,182,212,0.4)", "0 0 30px rgba(6,182,212,0.8)", "0 0 10px rgba(6,182,212,0.4)"] }}
                                 transition={{ duration: 2, repeat: Infinity }}
                                 className="font-black text-4xl lg:text-7xl tracking-[0.2em] uppercase italic"
                              >
                                  SYSTEM
                              </motion.h1>
                              <p className="text-sahara-gold font-bold text-lg lg:text-xl tracking-[0.15em] whitespace-nowrap uppercase">
                                   [ TAP TO ACTIVATE ]
                              </p>
                         </div>
                    </div>
                </div>
            )}
            
            {/* --- ARTWORK & LIGHTS & INTERACTION (Z-10) --- */}
            <div className={`fixed inset-0 z-[10] transition-opacity duration-[1500ms] pointer-events-none ${phase === 'active' || phase === 'stabilizing' ? 'opacity-100' : 'opacity-0'}`}>
                <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.25]" />
                <div className="relative w-full h-full flex items-center justify-center">
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

            {/* --- IMPERIAL ACTION HUD (MOBILE EMERGENCY V103.2) --- */}
            {phase === 'active' && (
                <div className="fixed left-1/2 -translate-x-1/2 top-10 md:top-20 z-[999999] w-[95%] max-w-[450px] pointer-events-auto">
                    <motion.div 
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-black/95 border-2 border-cyan-500/40 rounded-[2.5rem] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex justify-around items-center gap-4"
                    >
                        <a href="tel:+201070615372" className="block active:scale-90 transition-transform">
                            <div 
                                onClick={() => handleAction('CALLING', 'tel:+201070615372')}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="w-16 h-16 rounded-full bg-cyan-950/40 border-2 border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/40 transition-colors">
                                    <Phone className="w-7 h-7 text-cyan-400" />
                                </div>
                                <span className="text-[10px] robotic-digits text-cyan-400 font-bold uppercase tracking-[0.2em]">Call</span>
                            </div>
                        </a>

                        <a href="https://wa.me/201111171368" target="_blank" rel="noopener noreferrer" className="block active:scale-90 transition-transform">
                            <div 
                                onClick={() => handleAction('WHATSAPP', 'https://wa.me/201111171368')}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-950/40 border-2 border-green-500/30 flex items-center justify-center group-hover:bg-green-500/40 transition-colors">
                                    <MessageCircle className="w-7 h-7 text-green-400" />
                                </div>
                                <span className="text-[10px] robotic-digits text-green-400 font-bold uppercase tracking-[0.2em]">WhatsApp</span>
                            </div>
                        </a>

                        <a href="https://www.google.com/maps?q=29.9656242,31.0922895" target="_blank" rel="noopener noreferrer" className="block active:scale-90 transition-transform">
                            <div 
                                onClick={() => handleAction('LOCATION', 'https://www.google.com/maps?q=29.9656242,31.0922895')}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="w-16 h-16 rounded-full bg-blue-950/40 border-2 border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                                    <MapPin className="w-7 h-7 text-blue-400" />
                                </div>
                                <span className="text-[10px] robotic-digits text-blue-400 font-bold uppercase tracking-[0.2em]">Location</span>
                            </div>
                        </a>
                    </motion.div>

                    {/* --- DIAGNOSTIC WATERMARK (LEGACY SHIELD) --- */}
                    <div className="mt-4 flex justify-center">
                        <span className="bg-yellow-900/90 text-white text-[8px] px-3 py-1 rounded-full font-black tracking-widest uppercase italic border border-yellow-500/40 mb-2">
                            v103.1_LEGACY_SHIELD_ACTIVE
                        </span>
                    </div>
                </div>
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
