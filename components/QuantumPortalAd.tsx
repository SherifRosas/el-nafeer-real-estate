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
            audioRef.current.play().catch(e => console.warn(e));
        }
    }

    if (!isMounted) return <div style={{ backgroundColor: 'black', width: '100%', height: '100vh' }} />;

    const CACHE_V = "?v=121.5";

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            color: '#fff',
            zIndex: 99999,
            overflow: 'hidden'
        }}>
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
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '20px'
                }}>
                    <h1 style={{ fontSize: '48px', fontWeight: 900, fontStyle: 'italic', margin: '0 0 20px 0' }}>
                        LEVER<br/><span style={{ color: '#06b6d4' }}>PIONEER</span>
                    </h1>
                    <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#6b7280', letterSpacing: '4px', margin: '0 0 40px 0' }}>
                        VERSION_v121.6_BULLETPROOF
                    </p>
                    <button 
                        onClick={initiateExperience}
                        style={{ padding: '25px 50px', backgroundColor: '#fff', color: '#000', borderRadius: '40px', fontWeight: 900, fontSize: '10px', letterSpacing: '4px', border: 'none' }}
                    >
                        BEGIN_ASCENT
                    </button>
                    <span style={{ fontSize: '8px', color: '#333', marginTop: '40px' }}>OPTIMIZED FOR LEGACY TERMINALS</span>
                </div>
            )}

            {/* --- CONTENT LAYER --- */}
            {isStarted && (
                <>
                    <audio ref={audioRef} loop playsInline src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" />
                    <Quantum3DLayer />
                    <SpeechHUD isStarted={isStarted} />

                    <div style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 50 }}>
                        <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '5px', color: '#06b6d4' }}>LEVER PIONEER</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', WebkitTransform: 'translateX(-50%)', width: '100%', display: 'flex', justifyContent: 'center', gap: '30px', zIndex: 50 }}>
                        <a href={CALL_URL} style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Phone style={{ width: '24px', height: '24px', color: '#000' }} />
                        </a>
                        <a href={WHATSAPP_URL} style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MessageCircle style={{ width: '24px', height: '24px', color: '#fff' }} />
                        </a>
                    </div>

                    <div 
                        onClick={() => { if (audioRef.current) { audioRef.current.muted = !isMuted; setIsMuted(!isMuted); } }}
                        style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 100, cursor: 'pointer' }}
                    >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isMuted ? <X size={16} color="#ef4444" /> : <Activity size={16} color="#06b6d4" />}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
