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
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    }

    if (!isMounted) return <div style={{ backgroundColor: 'black', width: '100vw', height: '100dvh' }} />;

    const CACHE_V = "?v=121.9";
    const LOGO = "/logos/logo-ar.png";

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
                .text-gradient {
                    background: linear-gradient(to right, #06b6d4, #a855f7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .dir-rtl { direction: rtl; }
            `}} />
            
            <audio ref={audioRef} loop playsInline preload="auto">
                 <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
            </audio>

            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                <img src={AD_IMAGE + CACHE_V} alt="Lever Pioneer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

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
                    padding: '40px 20px',
                    textAlign: 'center'
                }}>
                    {/* --- TOP ROW --- */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '60px' }}>
                        <h2 className="text-gradient" style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '2px', margin: 0 }}>EL-NAFEER</h2>
                        <div style={{ width: '60px', height: '60px', background: '#000', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', padding: '5px' }}>
                            <img src={LOGO} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                    </div>

                    {/* --- CENTER BRANDING --- */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 className="text-gradient" style={{ fontSize: '42px', fontWeight: 900, fontStyle: 'italic', margin: '0 0 10px 0', letterSpacing: '4px' }}>
                            LEVER<br/>PIONEER
                        </h1>
                        <p className="dir-rtl" style={{ fontSize: '13px', color: '#ccc', maxWidth: '300px', lineHeight: '1.6', margin: '20px 0' }}>
                            التكنولوجيا الرائدة لتجربة عقارية استثنائية في قلب مصر. نعيد تعريف الفخامة العقارية من خلال قوة الذكاء الاصطناعي وفن التصميم المعاصر.
                        </p>
                        <span style={{ fontSize: '10px', color: '#444', letterSpacing: '3px' }}>ULTIMATUM_ASCENSION_v121.9</span>
                    </div>

                    {/* --- ACTION & PERSONNEL --- */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '2px' }}>SHERIF ROSAS</span>
                            <br/>
                            <span style={{ fontSize: '9px', color: '#666' }}>مطور الذكاء الاصطناعي وماستر المنصة</span>
                        </div>

                        <button 
                            onClick={initiateExperience}
                            style={{ 
                                padding: '25px 50px', 
                                backgroundColor: 'transparent', 
                                color: '#fff', 
                                borderRadius: '15px', 
                                fontWeight: 900, 
                                fontSize: '14px', 
                                letterSpacing: '6px', 
                                border: '2px solid #06b6d4',
                                boxShadow: '0 0 30px rgba(6,182,212,0.4)',
                                cursor: 'pointer'
                            }}
                        >
                            BEGIN_ASCENT
                        </button>

                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '2px' }}>AHMED ABDEL SATTAR</span>
                            <br/>
                            <span style={{ fontSize: '9px', color: '#666' }}>الماستر التنفيذي والتنسيق العام</span>
                            <div style={{ marginTop: '10px', color: '#06b6d4', fontSize: '12px', fontWeight: 'bold' }}>
                                <Phone size={12} style={{ display: 'inline', marginRight: '5px' }} /> 55907971 10 20+
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isStarted && (
                <>
                    <Quantum3DLayer />
                    <div style={{ position: 'absolute', bottom: '50px', left: '0', width: '100%', display: 'flex', justifyContent: 'center', gap: '30px', zIndex: 50 }}>
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
