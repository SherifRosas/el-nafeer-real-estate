'use client'

import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Phone, MessageCircle, MapPin, X, Activity, ShieldCheck, Zap } from 'lucide-react'

// Dynamically import the heavy 3D engine
const Quantum3DLayer = dynamic(() => import('./Quantum3DLayer'), { 
    ssr: false,
    loading: () => <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" /></div>
})

const DOMAIN = "https://www.al-nafeer.com";
const AD_IMAGE = "/campaigns/lever-pioneer/lever_pioneer_ultimate_v159_0.png"
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=201111171368";
const CALL_URL = "tel:+201070615372";
const LOCATION_URL = "https://www.google.com/maps/place/Al+Omraneya,+Al+Haram,+Giza+Governorate/@29.9656242,31.0922895,17z/data=!4m15!1m8!3m7!1s0x14584fc2bfbefc07:0x5df1948b27a63882!2sAl+Omraneya,+Al+Haram,+Giza+Governorate!3b1!8m2!3d29.9656242!4d31.0922895!16s%2Fg%2F11c659wy1d!3m5!1s0x14584fc2bfbefc07:0x5df1948b27a63882!8m2!3d29.9656242!4d31.0922895!16s%2Fg%2F11c659wy1d?hl=en-EG&entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D";

// --- CAMPAIGN CONSTANTS ---
const fullText = "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب - اتصال - الموقع). للتواصل مع منصة النفير العالمية للاعلان اضغط على صقر النفير.";
const LEVER_BRAND_ID = "62c38934-4c4b-42be-98c9-06cbbee1af19";

export default function QuantumPortalAd() {
    const [displayedText, setDisplayedText] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const [isLegacy, setIsLegacy] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    // Feature Modals
    const [activeModal, setActiveModal] = useState<null | 'quote' | 'portfolio'>(null);
    const [quoteSent, setQuoteSent] = useState(false);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('الكل');
    const [fullScreenVid, setFullScreenVid] = useState<string | null>(null);

    const portfolioItems = [
        { title: "تنفيذ بانورامي خارجي صاعد (ذهبي)", cat: "بانوراما خارجية", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.38.50.mp4" },
        { title: "تشغيل الأبواب الأوتوماتيكية - لوكس", cat: "أوتوماتيك", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.38.51.mp4" },
        { title: "مصعد أوتوماتيك حديث (فيديو)", cat: "أوتوماتيك", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.240.mp4" },
        { title: "تجربة فتح نصف أوتوماتيك", cat: "نصف أوتوماتيك", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.2522.mp4" },
        { title: "برج بانورامي واجهة عرض", cat: "بانوراما خارجية", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.2566.mp4" },
        { title: "كابينة بانورامية منحنية", cat: "بانوراما خارجية", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.2400.mp4" }
    ];

    const filteredPortfolio = selectedCategory === 'الكل' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.cat === selectedCategory);

    useEffect(() => {
        const ua = typeof navigator !== 'undefined' ? navigator.userAgent : "";
        const isOldIOS = /iPhone|iPad|iPod/.test(ua) && /OS (8|9|10|11|12)_/.test(ua);
        const isLowRam = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 2;
        
        if (isOldIOS || isLowRam) {
            setIsLegacy(true);
        }
    }, [])

    useEffect(() => {
        if (!isStarted) {
            const handleGlobalTouch = () => {
                initiateExperience();
                window.removeEventListener('touchstart', handleGlobalTouch);
                window.removeEventListener('mousedown', handleGlobalTouch);
            };
            window.addEventListener('touchstart', handleGlobalTouch);
            window.addEventListener('mousedown', handleGlobalTouch);
            return () => {
                window.removeEventListener('touchstart', handleGlobalTouch);
                window.removeEventListener('mousedown', handleGlobalTouch);
            };
        }
    }, [isStarted]);

    const initiateExperience = () => {
        if (isStarted) return;
        setIsStarted(true);
        if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.volume = 0.9;
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Critical fallback for mobile browsers
                    document.addEventListener('click', () => audioRef.current?.play(), { once: true });
                });
            }
        }

        const words = fullText.split(' ').filter(w => w.length > 0);
        let currentWordIndex = 0;
        setDisplayedText(words[0] || ""); 
        currentWordIndex = 1;

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
            notes: "QUICK_PORTAL_QUOTE_REQUEST",
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
                window.location.href = `https://api.whatsapp.com/send?phone=201111171368&text=${encodeURIComponent("طلب عرض سعر جديد من النفير")}`;
            }, 2500);
        } catch (error) {
            console.error("Lead error:", error);
        } finally {
            setQuoteLoading(false);
        }
    }

    const CACHE_V = "?v=145.00";

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse-cyan { 0% { box-shadow: 0 0 10px rgba(6,182,212,0.3); } 50% { box-shadow: 0 0 40px rgba(6,182,212,0.6); } 100% { box-shadow: 0 0 10px rgba(6,182,212,0.3); } }
                @keyframes icon-float { 
                    0% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-5px) scale(1.05); }
                    100% { transform: translateY(0) scale(1); }
                }
                @keyframes shimmer-pulse {
                    0% { filter: brightness(1) contrast(1); }
                    50% { filter: brightness(1.2) contrast(1.1); }
                    100% { filter: brightness(1) contrast(1); }
                }
                @keyframes shiny-shimmer {
                    0% { background-position: -200px; }
                    100% { background-position: 200px; }
                }
            `}} />
            
            {!isStarted && (
                <div 
                    onClick={initiateExperience} 
                    style={{ 
                        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99999, 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' 
                    }}
                >
                    {/* Atmospheric Preview Background */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: `url(${AD_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px) brightness(0.3)' }} />
                    
                    <div style={{ padding: '20px 50px', border: '2px solid #06b6d4', borderRadius: '25px', color: '#fff', fontWeight: 900, animation: 'pulse-cyan 2s infinite', background: 'rgba(6,182,212,0.1)' }}>TAP_TO_ASCENT</div>
                </div>
            )}

            <audio ref={audioRef} loop src="https://audio-previews.elements.envatousercontent.com/files/234765669/preview.mp3" style={{ display: 'none' }} />

            {/* MASTER INTERACTION SIDEBAR */}
            {isStarted && !activeModal && (
                <div style={{ position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 9500, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(37,211,102,0.1)', border: '2px solid #25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25d366', animation: 'icon-float 3s infinite ease-in-out', boxShadow: '0 0 15px rgba(37,211,102,0.3)' }}>
                        <MessageCircle size={24} />
                    </a>
                    <a href={CALL_URL} style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '2px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', animation: 'icon-float 3.5s infinite ease-in-out', boxShadow: '0 0 15px rgba(6,182,212,0.3)' }}>
                        <Phone size={24} />
                    </a>
                    <a href={LOCATION_URL} target="_blank" rel="noopener noreferrer" style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', border: '2px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', animation: 'icon-float 4s infinite ease-in-out', boxShadow: '0 0 15px rgba(212,175,55,0.3)' }}>
                        <MapPin size={24} />
                    </a>
                </div>
            )}

            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #0a1a1f 0%, #000 100%)' }}>
                    <img src={AD_IMAGE + CACHE_V} alt="Lever" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', animation: isStarted ? 'shimmer-pulse 3s infinite ease-in-out' : 'none' }} />
                </div>
                
                {activeModal === 'quote' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
                        <div style={{ width: '100%', maxWidth: '400px', background: '#0a0a0f', border: '1px solid #06b6d4', borderRadius: '25px', padding: '25px', position: 'relative' }}>
                            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 10, right: 15, color: '#666', background: 'none', border: 'none', fontSize: '24px' }}>×</button>
                            <h3 style={{ color: '#06b6d4', textAlign: 'center', fontWeight: 900 }}>طلب تـسعيرة فـني</h3>
                            {quoteSent ? (
                                <div style={{ textAlign: 'center', padding: '30px' }}>✅ تم الإرسال</div>
                            ) : (
                                <form onSubmit={submitQuoteRequest} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                                    <input name="userName" required placeholder="الاسم" style={{ background: '#111', border: '1px solid #333', padding: '12px', borderRadius: '10px', color: '#fff' }} />
                                    <input name="userPhone" required placeholder="الهاتف" style={{ background: '#111', border: '1px solid #333', padding: '12px', borderRadius: '10px', color: '#fff' }} />
                                    <button type="submit" style={{ background: '#06b6d4', padding: '15px', borderRadius: '10px', fontWeight: 900 }}>إرسـال</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                {activeModal === 'portfolio' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', flexDirection: 'column', padding: '10px', overflowY: 'auto' }}>
                        <button onClick={() => setActiveModal(null)} style={{ alignSelf: 'flex-end', color: '#fff', background: 'none', border: 'none', fontSize: '30px' }}>×</button>
                        <h3 style={{ textAlign: 'center', color: '#d4af37', fontWeight: 900, marginBottom: '20px' }}>مـعرض الأعـمال</h3>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {['الكل', 'بانوراما خارجية', 'أوتوماتيك', 'نصف أوتوماتيك'].map(cat => (
                                <div key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '8px 15px', background: selectedCategory === cat ? '#d4af37' : '#111', color: selectedCategory === cat ? '#000' : '#d4af37', borderRadius: '10px', fontSize: '11px', fontWeight: 900, cursor: 'pointer', border: `1px solid ${selectedCategory === cat ? '#d4af37' : '#333'}` }}>{cat}</div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px', justifyContent: 'center' }}>
                            {filteredPortfolio.map((p, idx) => (
                                <div key={idx} onClick={() => setFullScreenVid(p.vid)} style={{ background: '#050505', border: '1px solid #222', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer' }}>
                                    <video src={p.vid} autoPlay muted loop playsInline style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                    <div style={{ padding: '8px', fontSize: '9px', textAlign: 'center', color: '#ccc' }}>{p.title}</div>
                                </div>
                            ))}
                        </div>

                        {/* Full Screen Cinematic Overlay */}
                        {fullScreenVid && (
                            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000', zIndex: 3000, display: 'flex', flexDirection: 'column' }}>
                                <div onClick={() => setFullScreenVid(null)} style={{ padding: '20px', color: '#d4af37', fontSize: '16px', fontWeight: 900, cursor: 'pointer', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <X size={20} /> RETURN | العـودة
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                                    <video src={fullScreenVid} controls autoPlay playsInline style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div style={{ height: '22vh', width: '100%', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', borderTop: '1px solid #111' }}>
                {isStarted && (
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button onClick={() => setActiveModal('quote')} style={{ background: '#06b6d422', border: '1px solid #06b6d455', color: '#06b6d4', padding: '10px 20px', borderRadius: '12px', fontWeight: 900, fontSize: '11px', cursor: 'pointer' }}>طلب سعر</button>
                        <button onClick={() => setActiveModal('portfolio')} style={{ background: '#d4af3722', border: '1px solid #d4af3755', color: '#d4af37', padding: '10px 20px', borderRadius: '12px', fontWeight: 900, fontSize: '11px', cursor: 'pointer' }}>المعرض</button>
                    </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <a 
                        href="tel:+201065661882" 
                        style={{ 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            width: '24px', height: '24px', borderRadius: '50%', 
                            background: 'rgba(6,182,212,0.1)', border: '1px solid #06b6d4', 
                            color: '#06b6d4', cursor: 'pointer' 
                        }}
                        title="Call Sherif Rosas"
                    >
                        <Phone size={12} />
                    </a>
                    <div style={{ 
                        fontSize: '9px', fontWeight: 900, letterSpacing: '2px',
                        background: 'linear-gradient(90deg, #333 0%, #fff 50%, #333 100%)',
                        backgroundSize: '200px', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        animation: 'shiny-shimmer 3s infinite linear'
                    }}>
                        ARCHITECTED BY SHERIF ROSAS
                    </div>
                </div>
            </div>
        </div>
    );
}
