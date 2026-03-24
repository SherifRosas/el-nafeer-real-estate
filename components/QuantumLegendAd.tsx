'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MapPin, QrCode, X } from 'lucide-react'

// --- IMPERIAL LEGEND STANDARD V110.17 (UNIFIED BOX-HUD) ---

const GOLD = "#c5a059";

export default function QuantumLegendAd() {
    const { language } = useLanguage()
    const [phase, setPhase] = useState<'active'>('active')
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false)
    const [audioIntensity, setAudioIntensity] = useState(0)
    const [isMuted, setIsMuted] = useState(true)
    const [showQR, setShowQR] = useState(false)

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
                    campaignId: 'quantum-legend-v1',
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
            bgMusicRef.current.muted = false;
            bgMusicRef.current.volume = 1.0;
            const playPromise = bgMusicRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsAudioUnlocked(true);
                    setIsMuted(false);
                    startInteractionEngine();
                    window.removeEventListener('click', unlockMusic);
                    window.removeEventListener('touchstart', unlockMusic);
                }).catch(e => console.warn("Music Play Still Blocked:", e));
            }
        }
    }, [isAudioUnlocked, startInteractionEngine]);

    useEffect(() => {
        window.addEventListener('click', unlockMusic);
        window.addEventListener('touchstart', unlockMusic);
        trackInteraction('OPEN_LEGEND_V1', window.location.href);

        const cleanupSSR = () => {
            ['ssr-active-hud-layer', 'ssr-artwork-bg', 'ssr-mute-ring'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.remove();
            });
        };
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
            </audio>

            <style jsx global>{`
                body { background: black !important; overflow: hidden !important; position: fixed !important; width: 100% !important; height: 100% !important; }
            `}</style>
            
            {/* --- 100% FULL-SCREEN CINEMATIC ARTWORK (Z-10) --- */}
            <div className={`fixed inset-0 z-[10] transition-opacity duration-[1500ms] pointer-events-none ${phase === 'active' ? 'opacity-100' : 'opacity-0'}`}>
                <NextImage src="/campaigns/lever-pioneer/ad-v2-quantum.png" alt="BG" fill className="object-cover scale-150 blur-3xl opacity-40 brightness-[0.25]" />
                
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ 
                            scale: [1, 1.04 + (audioIntensity * 0.02), 1],
                            opacity: 1
                        }} 
                        transition={{ 
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 1.5 }
                        }}
                        className="relative w-full h-full pointer-events-auto transform-gpu"
                    >
                        <NextImage 
                            src="/campaigns/lever-pioneer/ad-v2-quantum.png" 
                            alt="Ad" 
                            fill 
                            className="object-cover sm:object-contain" 
                            priority 
                        />
                        
                        {/* Interactive Pulsing Light (Elevator Portal) */}
                        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                             <motion.div 
                                animate={{ opacity: audioIntensity * 0.7, scale: 0.8 + (audioIntensity * 3.5) }} 
                                className="absolute left-[59.5%] top-[47.5%] w-20 h-20 bg-cyan-400 rounded-full blur-[45px] mix-blend-screen transform-gpu" 
                             />
                        </div>

                        {/* --- UNIFIED BOX-HUD HOTSPOTS (LEVEL 110.18) --- */}
                        <div className="absolute left-[4.8%] bottom-[10%] w-[27%] h-[24%] z-30 flex flex-col pointer-events-none">
                            {/* WhatsApp Hotspot */}
                            <div className="w-full h-1/3 flex items-center pl-[2%] pointer-events-auto cursor-pointer group"
                                 onClick={() => {
                                     handleAction('WHATSAPP_EMBEDDED', 'https://wa.me/201070615372');
                                     unlockMusic();
                                 }}>
                                <div className="w-10 h-10 rounded-full group-hover:bg-green-500/10 transition-all group-active:scale-90 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border border-green-500/0 group-hover:border-green-500/40 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all" />
                                </div>
                                <span className="ml-2 text-[0px] opacity-0 group-hover:text-[10px] group-hover:opacity-40 text-green-400 transition-all uppercase tracking-tighter invisible sm:visible">WhatsApp</span>
                            </div>

                            {/* Call Hotspot */}
                            <div className="w-full h-1/3 flex items-center pl-[2%] pointer-events-auto cursor-pointer group"
                                 onClick={() => {
                                     handleAction('CALL_EMBEDDED', 'tel:+201070615372');
                                     unlockMusic();
                                 }}>
                                <div className="w-10 h-10 rounded-full group-hover:bg-cyan-500/10 transition-all group-active:scale-90 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border border-cyan-500/40 group-hover:border-cyan-500/60 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all" />
                                </div>
                                <span className="ml-2 text-[0px] opacity-0 group-hover:text-[10px] group-hover:opacity-40 text-cyan-400 transition-all uppercase tracking-tighter invisible sm:visible">Call Us</span>
                            </div>

                            {/* Location Hotspot */}
                            <div className="w-full h-1/3 flex items-center pl-[2%] pointer-events-auto cursor-pointer group"
                                 onClick={() => {
                                     handleAction('LOCATION_EMBEDDED', 'https://maps.app.goo.gl/r6vGf');
                                     unlockMusic();
                                 }}>
                                <div className="w-12 h-12 rounded-full group-hover:bg-[#c5a059]/10 transition-all group-active:scale-95 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border border-[#c5a059]/0 group-hover:border-[#c5a059]/40 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all" />
                                </div>
                                <span className="ml-2 text-[0px] opacity-0 group-hover:text-[10px] group-hover:opacity-40 text-[#c5a059] transition-all uppercase tracking-tighter invisible sm:visible">Location</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- DYNAMIC QR MODAL --- */}
            <AnimatePresence>
                {showQR && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative bg-zinc-900 border border-white/10 p-8 rounded-[2rem] max-w-sm w-full text-center shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest font-serif">Legendary Access</h3>
                            <p className="text-zinc-500 text-xs mb-8 tracking-widest uppercase">Scan to share simulation</p>
                            <div className="bg-white p-4 rounded-3xl inline-block shadow-2xl">
                                <NextImage src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.href)}&color=000&bgcolor=fff&margin=1`} alt="QR" width={250} height={250} className="w-48 h-48" />
                            </div>
                            <p className="mt-8 text-[10px] text-[#c5a059] tracking-[0.3em] font-black uppercase italic">Lever Pioneer | Legend</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- MUTE RING (AUDIO TOGGLE V110.17) --- */}
            {phase === 'active' && (
                <motion.div initial={{ scale: 0, x: -20 }} animate={{ scale: 1, x: 0 }} className="fixed bottom-6 left-6 z-[999999]">
                    <div 
                        onClick={() => {
                            if (!isAudioUnlocked) { unlockMusic(); } 
                            else { if (bgMusicRef.current) { const n = !isMuted; bgMusicRef.current.muted = n; setIsMuted(n); } }
                        }}
                        className={`group relative w-14 h-14 rounded-full bg-black/60 backdrop-blur-xl border-2 flex items-center justify-center cursor-pointer transition-all duration-500 ${!isAudioUnlocked || isMuted ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse' : 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]'} hover:scale-110 active:scale-90`}
                    >
                        {(!isAudioUnlocked || isMuted) && <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-[ping_2s_infinite] opacity-20" />}
                        {!isAudioUnlocked || isMuted ? (
                            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                        ) : (
                            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        )}
                        <div className="absolute left-full ml-4 whitespace-nowrap bg-black/80 px-3 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-[10px] tracking-widest text-white/70 uppercase">
                           {!isAudioUnlocked ? 'Unlock Experience' : isMuted ? 'Unmute Audio' : 'Mute Audio'}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* --- IMPERIAL DESIGNER SIGNATURE (V110.17) --- */}
            {phase === 'active' && (
                <div className="fixed right-[4%] bottom-[4%] z-[999999]">
                    <a href="tel:+201065661882" className="block active:scale-95 transition-transform group">
                        <div 
                             onClick={() => handleAction('SIGNATURE_CALL', 'tel:+201065661882')} 
                             className="cursor-pointer bg-black/90 rounded-2xl p-4 border border-white/10 flex items-center gap-4 shadow-2xl group-hover:border-[#c5a059]/40 transition-colors"
                        >
                             <div className="flex flex-col text-right">
                                  <span className="text-[7px] text-cyan-400/60 tracking-[4px] uppercase font-black italic">ARTISTIC DIRECTOR</span>
                                  <span className="font-bold text-base italic tracking-wide text-[#c5a059] font-serif">Sherif Rosas</span>
                                  <span className="text-[8px] text-white/40 tracking-[2px] mt-1 font-mono">EG01065661882</span>
                             </div>
                             <div className="w-10 h-10 rounded-full border-2 border-[#c5a059]/50 flex items-center justify-center bg-black/40 group-hover:bg-[#c5a059]/10 transition-all">
                                  <Phone className="w-4 h-4 text-[#c5a059] animate-pulse" />
                             </div>
                        </div>
                    </a>
                </div>
            )}
        </div>
    )
}
