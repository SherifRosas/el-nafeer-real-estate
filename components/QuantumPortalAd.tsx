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
    const [isMounted, setIsMounted] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [isLegacy, setIsLegacy] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        setIsMounted(true)
        // Detect iPhone 6/6+ (iOS 12 or below) or very low performance hardware
        const ua = navigator.userAgent;
        const isOldIOS = /iPhone|iPad|iPod/.test(ua) && /OS (8|9|10|11|12)_/.test(ua);
        const isLowRam = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 2;
        
        if (isOldIOS || isLowRam) {
            console.log("Legacy Hardware Detected: Activating Cinematic Fallback");
            setIsLegacy(true);
        }
    }, [])

    const initiateExperience = () => {
        setIsStarted(true);
        
        // Force Audio Playback with multiple attempts for older Safari
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current.volume = 1.0;
                audioRef.current.play().then(() => {
                    console.log("Music session initialized");
                }).catch(e => {
                    console.warn("Music retry needed", e);
                    // Single retry after small delay
                    setTimeout(() => audioRef.current?.play(), 500);
                });
            }
        };

        // Initialize Web Speech API Narration
        const speakNarration = () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel(); // Clear queue
                const text = "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب - اتصال - الموقع). للتواصل مع منصة النفير العالمية للاعلان اضغط على صقر النفير.";
                const utterance = new SpeechSynthesisUtterance(text);
                
                // Optimized for Arabic Narration
                utterance.lang = 'ar-SA';
                utterance.rate = 0.85; // Slower for clarity on legacy hardware
                utterance.pitch = 1.0;
                
                window.speechSynthesis.speak(utterance);
            }
        };

        playAudio();
        speakNarration();
    }

    if (!isMounted) return <div style={{ backgroundColor: 'black', width: '100vw', height: '100dvh' }} />;

    const CACHE_V = "?v=121.13";

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100dvw',
            height: '100dvh',
            backgroundColor: '#000',
            color: '#fff',
            zIndex: 99999,
            overflow: 'hidden',
        }}>
            <style dangerouslySetInnerHTML={{ __html: `
                html, body, #__next, main { 
                    height: 100dvh !important; 
                    width: 100vw !important; 
                    overflow: hidden !important; 
                    margin: 0 !important; 
                    padding: 0 !important;
                    position: fixed !important;
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
                {/* Visual Glow Fallback for Legacy Devices to prevent empty feel */}
                {isLegacy && isStarted && (
                    <div style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        width: '300px', 
                        height: '300px', 
                        background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
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
                    backgroundColor: 'rgba(0,0,0,0.2)', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '8px', color: 'rgba(255,255,255,0.2)' }}>v121.13 LEGACY_READY</div>
                    
                    <button 
                        onClick={initiateExperience}
                        style={{ 
                            padding: '35px 80px', 
                            backgroundColor: 'rgba(255,255,255,0.01)', 
                            color: '#fff', 
                            borderRadius: '20px', 
                            fontWeight: 900, 
                            fontSize: '16px', 
                            letterSpacing: '10px', 
                            border: '3px solid #06b6d4',
                            animation: 'pulse-cyan 2s infinite',
                            cursor: 'pointer',
                            marginTop: '220px',
                            textShadow: '0 0 10px rgba(0,0,0,1)',
                            WebkitAppearance: 'none'
                        }}
                    >
                        BEGIN_ASCENT
                    </button>
                </div>
            )}

            {/* --- INTERACTIVE ASCENT LAYER --- */}
            {isStarted && (
                <>
                    {/* ONLY Load 3D on modern devices. Legacy gets a clean 2D cinematic experience. */}
                    {!isLegacy ? (
                        <Quantum3DLayer />
                    ) : (
                        <div style={{ 
                            position: 'absolute', 
                            top: '50%', 
                            left: '50%', 
                            transform: 'translate(-50%, -50%)', 
                            textAlign: 'center',
                            zIndex: 10
                        }}>
                            <div style={{ fontSize: '12px', color: '#06b6d4', letterSpacing: '5px', fontWeight: 'bold' }}>SYSTEMS_ACTIVE</div>
                        </div>
                    )}

                    {/* CONTACT INTERFACE (LEGACY COMPATIBLE) */}
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '40px', 
                        left: '0', 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '25px', 
                        zIndex: 150 
                    }}>
                        <a href={CALL_URL} style={{ 
                            width: '70px', 
                            height: '70px', 
                            borderRadius: '50%', 
                            backgroundColor: '#fff', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            textDecoration: 'none'
                        }}>
                            <Phone style={{ width: '32px', height: '32px', color: '#000' }} />
                        </a>
                        <a href={WHATSAPP_URL} style={{ 
                            width: '70px', 
                            height: '70px', 
                            borderRadius: '50%', 
                            backgroundColor: '#10b981', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
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
