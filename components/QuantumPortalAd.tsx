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
        
        // Critical: User-triggered sound loop for Apple/Chrome
        if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.play().catch(() => {
                // Secondary fallback if first trigger fails
                audioRef.current?.play();
            });
        }

        // Reliable Speech Narration with Voice Discovery
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const text = "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب - اتصال - الموقع). للتواصل مع منصة النفير العالمية للاعلان اضغط على صقر النفير.";
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.8; // Further reduced for maximum compatibility
            
            // Wait for voices if needed (Legacy Safari)
            if (window.speechSynthesis.getVoices().length === 0) {
                window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.speak(utterance);
            } else {
                window.speechSynthesis.speak(utterance);
            }
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
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <img src={AD_IMAGE + CACHE_V} alt="Lever Pioneer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
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
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 100,
                    backgroundColor: 'rgba(0,0,0,0.1)', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>ULTIMATUM_v121.14</div>
                    
                    <button 
                        onClick={initiateExperience}
                        style={{ 
                            padding: '30px 70px', 
                            backgroundColor: 'rgba(255,255,255,0.01)', 
                            color: '#fff', 
                            borderRadius: '15px', 
                            fontWeight: 900, 
                            fontSize: '15px', 
                            letterSpacing: '6px', 
                            border: '2px solid #06b6d4',
                            animation: 'pulse-cyan 3s infinite',
                            cursor: 'pointer',
                            marginTop: '220px',
                            textShadow: '0 0 10px rgba(0,0,0,1)',
                            WebkitAppearance: 'none'
                        }}
                    >
                        BEGIN_ASCENT
                    </button>
                    
                    <div style={{ marginTop: '20px', fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '4px' }}>ACCESSING_CYBER_DOMAIN</div>
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
