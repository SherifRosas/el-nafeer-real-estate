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
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const initiateExperience = () => {
        setIsStarted(true)
        if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.play().catch(e => console.warn("Music play failed:", e));
        }
        if ('speechSynthesis' in window) {
            const text = "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب - اتصال - الموقع). للتواصل مع منصة النفير العالمية للاعلان اضغط على صقر النفير.";
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.95;
            window.speechSynthesis.speak(utterance);
        }
    }

    if (!isMounted) return <div style={{ backgroundColor: 'black', width: '100vw', height: '100dvh' }} />;

    const CACHE_V = "?v=121.10";

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
            `}} />
            
            <audio ref={audioRef} loop playsInline preload="auto">
                 <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
            </audio>

            {/* --- PRIMARY ASSET --- */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <img src={AD_IMAGE + CACHE_V} alt="Lever Pioneer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                    backgroundColor: 'rgba(0,0,0,0.3)', // Very subtle dimming to show background text clearly
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '8px', color: 'rgba(255,255,255,0.2)' }}>v121.11</div>
                    
                    {/* The Hotspot Button - Positioned exactly over the artwork button area */}
                    <button 
                        onClick={initiateExperience}
                        style={{ 
                            padding: '30px 70px', 
                            backgroundColor: 'rgba(255,255,255,0.01)', 
                            color: '#fff', 
                            borderRadius: '15px', 
                            fontWeight: 900, 
                            fontSize: '14px', 
                            letterSpacing: '8px', 
                            border: '2px solid #06b6d4',
                            boxShadow: '0 0 40px rgba(6,182,212,0.5)',
                            cursor: 'pointer',
                            marginTop: '220px', // Precise offset to match the artwork's button
                            textShadow: '0 0 10px rgba(0,0,0,1)'
                        }}
                    >
                        BEGIN_ASCENT
                    </button>
                    
                    <div style={{ marginTop: '20px', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>FOR THE VISIONARY</div>
                </div>
            )}

            {/* --- 3D INTERACTIVE ASCENT --- */}
            {isStarted && (
                <>
                    <Quantum3DLayer />
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '50px', 
                        left: '0', 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '30px', 
                        zIndex: 50 
                    }}>
                        <a href={CALL_URL} style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
                            <Phone style={{ width: '28px', height: '28px', color: '#000' }} />
                        </a>
                        <a href={WHATSAPP_URL} style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
                            <MessageCircle style={{ width: '28px', height: '28px', color: '#fff' }} />
                        </a>
                    </div>
                </>
            )}
        </div>
    )
}
