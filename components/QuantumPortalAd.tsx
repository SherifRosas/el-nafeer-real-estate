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

// --- CAMPAIGN CONSTANTS ---
const fullText = "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب - اتصال - الموقع). للتواصل مع منصة النفير العالمية للاعلان اضغط على صقر النفير.";
const LEVER_BRAND_ID = "62c38934-4c4b-42be-98c9-06cbbee1af19";
const LEVER_PROJECTS = [
    { title: "برج الفاتح - القاهرة", year: "2024", type: "مصعد بانورامي", img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800" },
    { title: "فيلا النرجس - التجمع الخامس", year: "2023", type: "مصعد منزلي (فيلات)", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
    { title: "مجموعة حدائق الأهرام - البوابات", year: "2024", type: "مصعد حمولات ثقيلة", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" }
];

export default function QuantumPortalAd() {
    const [displayedText, setDisplayedText] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const [isLegacy, setIsLegacy] = useState(false);
    
    // Feature Modals
    const [activeModal, setActiveModal] = useState<null | 'quote' | 'portfolio'>(null);
    const [quoteSent, setQuoteSent] = useState(false);
    const [quoteLoading, setQuoteLoading] = useState(false);

    useEffect(() => {
        const ua = typeof navigator !== 'undefined' ? navigator.userAgent : "";
        const isOldIOS = /iPhone|iPad|iPod/.test(ua) && /OS (8|9|10|11|12)_/.test(ua);
        const isLowRam = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 2;
        
        if (isOldIOS || isLowRam) {
            setIsLegacy(true);
        }
    }, [])

    const initiateExperience = () => {
        setIsStarted(true);
        const audioEl = document.getElementById("master-bg-audio") as HTMLAudioElement;
        if (audioEl) {
            audioEl.volume = 1.0;
            audioEl.play().catch(() => {});
        }

        let currentWordIndex = 0;
        const words = fullText.split(' ');
        setDisplayedText(words[0]); 
        currentWordIndex++;

        const typingInterval = setInterval(() => {
            if (currentWordIndex < words.length) {
                setDisplayedText(prev => prev + ' ' + words[currentWordIndex]);
                currentWordIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 350); 
    }

    const submitQuoteRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuoteLoading(true);
        const formData = new FormData(e.currentTarget);
        
        const payload = {
            name: formData.get('userName'),
            phone: formData.get('userPhone'),
            notes: `QUOTE_REQUEST: Floors: ${formData.get('floors')} | Type: ${formData.get('elevatorType')}`,
            brandProfileId: LEVER_BRAND_ID,
            status: 'new'
        };

        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            setQuoteSent(true);
            setTimeout(() => {
                setActiveModal(null);
                setQuoteSent(false);
            }, 2500);
        } catch (error) {
            console.error("Lead submission error:", error);
        } finally {
            setQuoteLoading(false);
        }
    }

    const CACHE_V = "?v=121.17";

    return (
        <div style={{
            position: 'absolute', 
            top: 0,
            left: 0,
            width: '100vw',
            height: '100dvh',
            backgroundColor: '#000',
            color: '#fff',
            zIndex: 99999,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, system-ui, sans-serif'
        }}>
            <style dangerouslySetInnerHTML={{ __html: `
                html, body, #__next, main { 
                    height: 100dvh !important; 
                    width: 100vw !important; 
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
            
            <audio id="master-bg-audio" loop playsInline preload="auto" src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" style={{ display: 'none' }} />

            <div style={{ height: '15dvh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', zIndex: 150, direction: 'rtl' }}>
                {isStarted && (
                    <p style={{ color: '#06b6d4', fontSize: 'clamp(12px, 2.2vh, 18px)', lineHeight: '1.6', fontWeight: 900, textShadow: '0 0 15px rgba(6,182,212,0.7)', margin: 0, textAlign: 'center' }}>
                        {displayedText}
                    </p>
                )}
            </div>

            <div style={{ height: '70dvh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                
                <div style={{
                    position: 'relative',
                    width: 'min(100vw, 70dvh)',
                    height: 'min(100vw, 70dvh)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <img src={AD_IMAGE + CACHE_V} alt="Lever Pioneer" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
                    
                    <div style={{ position: 'absolute', top: '48.5%', right: '17.8%', width: '3.5%', height: '3.5%', backgroundColor: '#1a1a1a', borderRadius: '50%', filter: 'blur(4px)', zIndex: 2, opacity: 0.95 }} />

                    {isStarted && (
                        <>
                            <a href={WHATSAPP_URL} style={{ position: 'absolute', top: '70%', left: '4%', width: '38%', height: '8%', zIndex: 200, WebkitTapHighlightColor: 'rgba(6,182,212,0.3)' }} />
                            <a href={CALL_URL} style={{ position: 'absolute', top: '79%', left: '4%', width: '38%', height: '8%', zIndex: 200, WebkitTapHighlightColor: 'rgba(6,182,212,0.3)' }} />
                            <div 
                                onClick={() => setActiveModal('portfolio')}
                                style={{ position: 'absolute', top: '88%', left: '4%', width: '38%', height: '8%', zIndex: 200, WebkitTapHighlightColor: 'rgba(212,175,55,0.3)', cursor: 'pointer' }} 
                            />
                            <div 
                                onClick={() => setActiveModal('quote')}
                                style={{ 
                                    position: 'absolute', 
                                    top: '40%', 
                                    left: '50%', 
                                    transform: 'translateX(-50%)',
                                    zIndex: 250,
                                    padding: '10px 20px',
                                    background: 'rgba(6,182,212,0.1)',
                                    border: '1px solid rgba(6,182,212,0.5)',
                                    borderRadius: '50px',
                                    backdropFilter: 'blur(10px)',
                                    color: '#fff',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    cursor: 'pointer',
                                    animation: 'pulse-cyan 2s infinite'
                                }}
                            >
                                اطلب تسعيرة
                            </div>
                        </>
                    )}

                    {activeModal === 'quote' && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                            <div style={{ width: '100%', maxWidth: '400px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '30px', padding: '30px', position: 'relative' }}>
                                <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>×</button>
                                
                                <h3 style={{ fontSize: '18px', fontWeight: 900, italic: true, letterSpacing: '2px', color: '#06b6d4', marginBottom: '20px', textAlign: 'center' }}>عرض سعر هندسي</h3>
                                
                                {quoteSent ? (
                                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>✅</div>
                                        <p style={{ fontSize: '12px', fontWeight: 'bold' }}>تم إرسال الطلب بنجاح</p>
                                    </div>
                                ) : (
                                    <form onSubmit={submitQuoteRequest} style={{ display: 'flex', flexDirection: 'column', gap: '15px', direction: 'rtl' }}>
                                        <input name="userName" required placeholder="الاسم / الشركة المنفذة" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '12px', outline: 'none' }} />
                                        <input name="userPhone" required placeholder="رقم الهاتف" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '12px', outline: 'none' }} />
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <input name="floors" placeholder="عدد الأدوار" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '12px', outline: 'none' }} />
                                            <select name="elevatorType" style={{ flex: 2, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '12px', outline: 'none' }}>
                                                <option>مصعد بانورامي</option>
                                                <option>مصعد سكني</option>
                                                <option>مصعد مستشفيات</option>
                                                <option>مصعد بضائع</option>
                                            </select>
                                        </div>
                                        <button disabled={quoteLoading} type="submit" style={{ background: '#06b6d4', color: '#000', border: 'none', borderRadius: '12px', padding: '15px', fontWeight: '900', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}>
                                            {quoteLoading ? 'جاري الإرسال...' : 'إرسال طلب التسعيرة'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}

                    {activeModal === 'portfolio' && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}>×</button>
                            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#d4af37', letterSpacing: '2px', marginBottom: '30px' }}>معرض الأعمال الهندسي</h3>
                            
                            <div style={{ width: '100%', display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0' }}>
                                {LEVER_PROJECTS.map((p, idx) => (
                                    <div key={idx} style={{ flexShrink: 0, width: '240px', background: '#111', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <img src={p.img} alt={p.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                        <div style={{ padding: '15px' }}>
                                            <div style={{ fontSize: '12px', fontWeight: '900', direction: 'rtl', marginBottom: '5px' }}>{p.title}</div>
                                            <div style={{ fontSize: '9px', color: '#666', letterSpacing: '2px' }}>{p.type} | {p.year}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '30px', fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', fontWeight: 'bold' }}>اسحب لاستكشاف المشاريع</div>
                        </div>
                    )}

                    {!isLegacy && isStarted && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
                            <Quantum3DLayer />
                        </div>
                    )}

                    {!isStarted && (
                        <div 
                            onClick={initiateExperience}
                            style={{
                                position: 'absolute',
                                width: '100vw',
                                height: '100dvh',
                                zIndex: 9999,
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                paddingBottom: '20dvh',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 30%)'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '5%', right: '5%', fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>ULTIMATUM_v121.17</div>
                            <div style={{ padding: '15px 40px', backgroundColor: 'rgba(255,255,255,0.05)', border: '2px solid rgba(6,182,212,0.5)', borderRadius: '20px', color: '#fff', fontWeight: 900, fontSize: '14px', letterSpacing: '8px', animation: 'pulse-cyan 2s infinite' }}>
                                TAP_TO_ASCENT
                            </div>
                            <div style={{ marginTop: '15px', fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '4px' }}>INITIALIZE_PORTFOLIO_NEXUS</div>
                        </div>
                    )}

                </div>
            </div>

            <div style={{ height: '15dvh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 150 }}>
                <div style={{ color: '#fff', fontSize: 'clamp(8px, 1vh, 10px)', letterSpacing: '5px', opacity: 0.5, marginBottom: '4px' }}>
                    ARCHITECTED BY
                </div>
                <div style={{ color: '#d4af37', fontSize: 'clamp(12px, 2vh, 16px)', fontWeight: '900', letterSpacing: '8px', textShadow: '0 0 20px rgba(212,175,55,0.7)' }}>
                    SHERIF ROSAS
                </div>
            </div>
        </div>
    )
}
