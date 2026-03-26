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
    const [isMuted, setIsMuted] = useState(true)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const initiateExperience = () => {
        setIsStarted(true)
        if (audioRef.current) {
            audioRef.current.muted = false;
            // Force play on interaction
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsMuted(false);
                }).catch(e => console.warn("Audio Context Wait:", e));
            }
        }
    }

    if (!isMounted) return <div style={{ backgroundColor: 'black', width: '100vw', height: '100dvh' }} />;

    const CACHE_V = "?v=121.7";

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
            touchAction: 'none'
        }}>
            
            <audio ref={audioRef} loop playsInline preload="auto">
                 <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
            </audio>

            {/* --- ARTWORK LAYER --- */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <img src={AD_IMAGE + CACHE_V} alt="Lever Pioneer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* --- THE CINEMATIC GATE --- */}
            {!isStarted && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 100,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <h1 style={{ fontSize: '48px', fontWeight: 900, fontStyle: 'italic', margin: '0 0 20px 0', letterSpacing: '-2px' }}>
                        LEVER<br/><span style={{ color: '#06b6d4' }}>PIONEER</span>
                    </h1>
                    <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#6b7280', letterSpacing: '4px', margin: '0 0 40px 0' }}>
                        ULTIMA_EXPERIENCE_v121.7
                    </p>
                    <button 
                        onClick={initiateExperience}
                        style={{ 
                            padding: '30px 60px', 
                            backgroundColor: '#fff', 
                            color: '#000', 
                            borderRadius: '50px', 
                            fontWeight: 900, 
                            fontSize: '12px', 
                            letterSpacing: '6px', 
                            border: 'none',
                            boxShadow: '0 0 40px rgba(6,182,212,0.3)'
                        }}
                    >
                        BEGIN_ASCENT
                    </button>
                    <span style={{ fontSize: '8px', color: '#444', marginTop: '40px', letterSpacing: '2px' }}>DESIGNED BY SHERIF ROSAS</span>
                </div>
            )}

            {/* --- CONTENT LAYER --- */}
            {isStarted && (
                <>
                    <Quantum3DLayer />
                    
                    <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 50 }}>
                        <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '8px', color: '#06b6d4', opacity: 0.6 }}>LEVER PIONEER</span>
                    </div>

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

                    <div 
                        onClick={() => { if (audioRef.current) { audioRef.current.muted = !isMuted; setIsMuted(!isMuted); } }}
                        style={{ position: 'absolute', top: '40px', right: '40px', zIndex: 100, cursor: 'pointer' }}
                    >
                        <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            borderRadius: '50%', 
                            border: `2px solid ${isMuted ? '#ef4444' : '#06b6d4'}`, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }}>
                            {isMuted ? <X size={20} color="#ef4444" /> : <Activity size={20} color="#06b6d4" />}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
