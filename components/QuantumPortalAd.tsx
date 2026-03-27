'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Phone, MessageCircle, MapPin, X, Activity, ShieldCheck, Zap } from 'lucide-react'

// Dynamically import the heavy 3D engine
const Quantum3DLayer = dynamic(() => import('./Quantum3DLayer'), { 
    ssr: false,
    loading: () => <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" /></div>
})

const AD_IMAGE = "/campaigns/lever-pioneer/ad-v2-quantum.png";
const WHATSAPP_URL = "https://wa.me/201111171368";
const CALL_URL = "tel:+201070615372";
const LOCATION_URL = "https://maps.app.goo.gl/r6vGf";

// --- CINEMATIC SPEECH HUD (PURE CSS) ---
function SpeechHUD({ isStarted }: { isStarted: boolean }) {
    const text = "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب - اتصال - الموقع). للتواصل مع منصة النفير العالمية للاعلان اضغط على صقر النفير.";
    
    if (!isStarted) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '18vh',
            left: '50%',
            transform: 'translateX(-50%)',
            WebkitTransform: 'translateX(-50%)',
            zIndex: 100,
            width: '90%',
            maxWidth: '600px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: '20px',
            borderRadius: '20px',
            border: '1px solid rgba(6,182,212,0.2)',
            textAlign: 'right',
            direction: 'rtl'
        }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                {text}
            </p>
        </div>
    )
}

export default function QuantumPortalAd() {
    const [isStarted, setIsStarted] = useState(false)
    const [isLegacy, setIsLegacy] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        // Immediate hardware check for legacy survival
        const ua = typeof navigator !== 'undefined' ? navigator.userAgent : "";
        const isOldIOS = /iPhone|iPad|iPod/.test(ua) && /OS (8|9|10|11|12)_/.test(ua);
        const isLowRam = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 2;
        
        if (isOldIOS || isLowRam) {
            setIsLegacy(true);
        }
    }, [])

    const initiateExperience = () => {
        setIsStarted(true);
        
        // Critical: Strict Synchronous execution for iOS 12 Safari media unlock
        // Do NOT use Promises or async callbacks here, Safari will block them.
        if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.volume = 1.0;
            const playPromise = audioRef.current.play();
            // We gently catch the promise purely to avoid unhandled rejections in the console, 
            // but we absolutely do not chain logic off it.
            if (playPromise !== undefined) {
                playPromise.catch(() => { /* Silent fallback */ });
            }
        }

        // Reliable Speech Narration
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const text = "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب - اتصال - الموقع). للتواصل مع منصة النفير العالمية للاعلان اضغط على صقر النفير.";
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    }

    const CACHE_V = "?v=121.14";

    return (
        <div style={{
            position: 'absolute', // Standard position for legacy support
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            color: '#fff',
            zIndex: 99999,
            overflow: 'hidden',
        }}>
            <style dangerouslySetInnerHTML={{ __html: `
                html, body, #__next, main { 
                    height: 100% !important; 
                    width: 100% !important; 
                    overflow: hidden !important; 
                    margin: 0 !important; 
                    padding: 0 !important;
                    position: fixed !important;
                    background: black !important;
                }
                @keyframes pulse-cyan {
                    0% { box-shadow: 0 0 10px rgba(6,182,212,0.3); }
                    50% { box-shadow: 0 0 40px rgba(6,182,212,0.6); }
                    100% { box-shadow: 0 0 10px rgba(6,182,212,0.3); }
                }
            `}} />
            
            <audio ref={audioRef} loop playsInline preload="auto">
                 <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
            </audio>

            {/* --- PRIMARY ASSET --- */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
                <img src={AD_IMAGE + CACHE_V} alt="Lever Pioneer" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                
                {/* --- RED X OVERLAY (Digital Patch for Artwork Artifacts) --- */}
                <div style={{ 
                    position: 'absolute', 
                    top: '48.5%', 
                    right: '17.8%', 
                    width: '30px', 
                    height: '30px', 
                    backgroundColor: '#1a1a1a', 
                    borderRadius: '50%',
                    filter: 'blur(5px)',
                    zIndex: 5,
                    opacity: 0.9
                }} />

                {isLegacy && isStarted && (
                    <div style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 80%)',
                        zIndex: 2 
                    }} />
                )}
            </div>

            {/* --- INTERACTIVE HOTSPOT GATE --- */}
            {!isStarted && (
                <div 
                    onClick={initiateExperience}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 100,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: '8vh',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 30%)'
                    }}
                >
                    <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>ULTIMATUM_v121.15</div>
                    
                    <div style={{
                        padding: '15px 40px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '2px solid rgba(6,182,212,0.5)',
                        borderRadius: '20px',
                        color: '#fff',
                        fontWeight: 900,
                        fontSize: '14px',
                        letterSpacing: '8px',
                        animation: 'pulse-cyan 2s infinite',
                        textShadow: '0 0 10px rgba(0,0,0,1)'
                    }}>
                        TAP_TO_ASCENT
                    </div>
                    
                    <div style={{ marginTop: '15px', fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '4px' }}>INITIALIZE_AUDIO_VISUAL</div>
                </div>
            )}

            {/* --- INTERACTIVE ASYNC ASCENT --- */}
            {isStarted && (
                <>
                    {!isLegacy ? (
                        <Quantum3DLayer />
                    ) : (
                        <div style={{ 
                            position: 'absolute', 
                            top: '15px', 
                            left: '50%', 
                            transform: 'translateX(-50%)',
                            zIndex: 10,
                            color: '#06b6d4',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            letterSpacing: '3px'
                        }}>
                            CINEMATIC_STABILIZED
                        </div>
                    )}

                    {/* INTERFACE NODES */}
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '5vh', 
                        left: '0', 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '20px', 
                        zIndex: 200 
                    }}>
                        <a href={CALL_URL} style={{ 
                            width: '64px', 
                            height: '64px', 
                            borderRadius: '50%', 
                            backgroundColor: '#fff', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: '0 5px 20px rgba(0,0,0,0.4)',
                            textDecoration: 'none'
                        }}>
                            <Phone style={{ width: '28px', height: '28px', color: '#000' }} />
                        </a>
                        <a href={WHATSAPP_URL} style={{ 
                            width: '64px', 
                            height: '64px', 
                            borderRadius: '50%', 
                            backgroundColor: '#10b981', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: '0 5px 20px rgba(0,0,0,0.4)',
                            textDecoration: 'none'
                        }}>
                            <MessageCircle style={{ width: '32px', height: '32px', color: '#fff' }} />
                        </a>
                    </div>
                </>
            )}
        </div>
    )
}
