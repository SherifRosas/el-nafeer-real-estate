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

const fullText = "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب - اتصال - الموقع). للتواصل مع منصة النفير العالمية للاعلان اضغط على صقر النفير.";

export default function QuantumPortalAd() {
    const [displayedText, setDisplayedText] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const [isLegacy, setIsLegacy] = useState(false);
    // Raw Audio element reference to bypass iOS 12 React-DOM locking
    const audioInstance = useRef<HTMLAudioElement | null>(null);

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
        
        // --- 1. RAW AUDIO iOS 12 FIX ---
        // Creating the Audio object instantly inside the native User Gesture handler
        // ensures Safari unlocks audio without waiting for DOM or Promise queues.
        if (!audioInstance.current) {
            audioInstance.current = new Audio("https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3");
            audioInstance.current.loop = true;
        }
        audioInstance.current.play().catch(e => console.warn("Browser Audio Block:", e));

        // --- 2. CINEMATIC TYPEWRITER ---
        let currentWordIndex = 0;
        const words = fullText.split(' ');
        
        setDisplayedText(words[0]); // Initial print
        currentWordIndex++;

        const typingInterval = setInterval(() => {
            if (currentWordIndex < words.length) {
                setDisplayedText(prev => prev + ' ' + words[currentWordIndex]);
                currentWordIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 350); // 350ms per word gives a reading-speed dramatic deployment
    }

    const CACHE_V = "?v=121.16";

    return (
        <div style={{
            position: 'absolute', 
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            color: '#fff',
            zIndex: 99999,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
            
            {/* Top Cinematic Typewriter Layer (Outside the 1:1 box, placed in top black space) */}
            {isStarted && (
                <div style={{ position: 'absolute', top: '4vh', width: '90%', maxWidth: '800px', textAlign: 'center', zIndex: 150, direction: 'rtl' }}>
                    <p style={{ color: '#06b6d4', fontSize: '14px', lineHeight: '1.8', fontWeight: 'bold', textShadow: '0 0 10px rgba(6,182,212,0.8)', margin: 0 }}>
                        {displayedText}
                    </p>
                </div>
            )}

            {/* Bottom Signature Layer (Placed in bottom black space) */}
            {(isStarted || !isStarted) && (
                <div style={{ position: 'absolute', bottom: '3vh', width: '100%', textAlign: 'center', zIndex: 150 }}>
                    <div style={{ color: '#fff', fontSize: '9px', letterSpacing: '5px', opacity: 0.5, marginBottom: '4px' }}>
                        ARCHITECTED BY
                    </div>
                    <div style={{ color: '#d4af37', fontSize: '14px', fontWeight: '900', letterSpacing: '8px', textShadow: '0 0 20px rgba(212,175,55,0.7)' }}>
                        SHERIF ROSAS
                    </div>
                </div>
            )}

            {/* --- 100vmin Master Grid --- 
                This acts as a perfect 1:1 square canvas matching the AI artwork logic.
                It forces exact coordinate mapping for our invisible CSS hotspots. */}
            <div style={{
                position: 'relative',
                width: '100vmin',
                height: '100vmin',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                {/* --- PRIMARY ASSET --- */}
                <img src={AD_IMAGE + CACHE_V} alt="Lever Pioneer" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
                
                {/* --- RED X OVERLAY PATCH --- */}
                <div style={{ 
                    position: 'absolute', 
                    top: '48.5%', 
                    right: '17.8%', 
                    width: '3.5%', 
                    height: '3.5%', 
                    backgroundColor: '#1a1a1a', 
                    borderRadius: '50%',
                    filter: 'blur(5px)',
                    zIndex: 2,
                    opacity: 0.95
                }} />

                {isLegacy && isStarted && (
                    <div style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 80%)',
                        zIndex: 3 
                    }} />
                )}

                {/* --- INVISIBLE CSS HOTSPOTS (Clickable Artwork Nodes) --- */}
                {/* These are precisely mapped to the '100vmin' 1:1 ratio. */}
                {isStarted && (
                    <>
                        <a href={WHATSAPP_URL} style={{ position: 'absolute', top: '70%', left: '4%', width: '38%', height: '8%', zIndex: 200, WebkitTapHighlightColor: 'rgba(6,182,212,0.3)' }} />
                        <a href={CALL_URL} style={{ position: 'absolute', top: '79%', left: '4%', width: '38%', height: '8%', zIndex: 200, WebkitTapHighlightColor: 'rgba(6,182,212,0.3)' }} />
                        <a href={LOCATION_URL} style={{ position: 'absolute', top: '88%', left: '4%', width: '38%', height: '8%', zIndex: 200, WebkitTapHighlightColor: 'rgba(6,182,212,0.3)' }} />
                    </>
                )}

                {/* --- 3D INTERACTIVE ASCENT --- */}
                {!isLegacy && isStarted && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
                        <Quantum3DLayer />
                    </div>
                )}

                {isLegacy && isStarted && (
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

                {/* --- TRIGGER HOTSPOT OVERLAY --- */}
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
                            paddingBottom: '10%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 30%)'
                        }}
                    >
                        <div style={{ position: 'absolute', top: '2%', right: '2%', fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>ULTIMATUM_v121.16</div>
                        
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

            </div>
        </div>
    )
}
