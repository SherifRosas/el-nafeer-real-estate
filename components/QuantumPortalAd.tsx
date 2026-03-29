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
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
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

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = false;
        }
    }, []);

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
        // Fail-Safe Audio Activation (v121.23)
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current.volume = 0.8;
                audioRef.current.play().catch(e => {
                    console.warn("Retrying Audio Context:", e);
                    setTimeout(playAudio, 1000); // 1s delay for legacy stability
                });
            }
        };
        // Delay audio on legacy to prioritize UI mount
        if (isLegacy) setTimeout(playAudio, 500);
        else playAudio();

        const words = fullText.split(' ').filter(w => w.length > 0);
        let currentWordIndex = 0;
        
        setDisplayedText(words[0] || ""); 
        currentWordIndex = 1;

        const typingInterval = setInterval(() => {
            if (currentWordIndex < words.length) {
                const word = words[currentWordIndex];
                if (word) setDisplayedText(prev => prev + ' ' + word);
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
        
        const floors = formData.get('floors');
        const shaft = formData.get('shaft');
        const foundation = formData.get('foundation');
        const machineRoom = formData.get('machineRoom');
        const power = formData.get('power');
        const door = formData.get('door');
        const elevatorType = formData.get('elevatorType');

        const technicalNotes = `
            TECHNICAL_QUOTE_REQUEST:
            - Type: ${elevatorType}
            - Floors: ${floors}
            - Shaft: ${shaft}
            - Prep/Foundation: ${foundation}
            - Machine Room: ${machineRoom}
            - Power: ${power}
            - Doors: ${door}
            - Governorate: ${formData.get('governorate')}
            - City: ${formData.get('city')}
            - GeoLink: ${formData.get('locationLink')}
        `.trim();

        const payload = {
            name: formData.get('userName'),
            phone: formData.get('userPhone'),
            notes: technicalNotes,
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
            }, 3000);
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
            top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: '#000', color: '#fff', zIndex: 99999, overflow: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Inter, system-ui, sans-serif'
        }}>
            <style dangerouslySetInnerHTML={{ __html: `
                html, body, #__next, main { 
                    height: 100vh !important; width: 100vw !important; overflow: hidden !important; 
                    margin: 0 !important; padding: 0 !important; position: fixed !important; background: black !important;
                }
                @keyframes pulse-cyan {
                    0% { box-shadow: 0 0 10px rgba(6,182,212,0.3); }
                    50% { box-shadow: 0 0 40px rgba(6,182,212,0.6); }
                    100% { box-shadow: 0 0 10px rgba(6,182,212,0.3); }
                }
            `}} />
            
            {!isStarted && (
                <a 
                    href="#"
                    onClick={(e) => { e.preventDefault(); initiateExperience(); }}
                    onTouchStart={(e) => { e.preventDefault(); initiateExperience(); }}
                    style={{
                        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 999999999,
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
                        paddingBottom: '20vh', background: 'rgba(0,0,0,0.4)',
                        WebkitTapHighlightColor: 'rgba(255,255,255,0.1)', border: 'none', outline: 'none', padding: 0, margin: 0,
                        textDecoration: 'none', color: 'inherit', pointerEvents: 'auto'
                    }}
                >
                    <div style={{ position: 'absolute', top: '5%', right: '5%', fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>ULTIMATUM_v121.17</div>
                    <div style={{ padding: '15px 40px', backgroundColor: 'rgba(255,255,255,0.05)', border: '2px solid rgba(6,182,212,0.5)', borderRadius: '20px', color: '#fff', fontWeight: 900, fontSize: '14px', letterSpacing: '8px', animation: 'pulse-cyan 2s infinite' }}>
                        TAP_TO_ASCENT
                    </div>
                </a>
            )}

            <audio ref={audioRef} id="master-bg-audio" loop playsInline preload="auto" 
                src="https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg" 
                style={{ position: 'fixed', top: -100, left: -100, width: 1, height: 1, visibility: 'hidden' }} 
            />

            <div style={{ height: '15vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', zIndex: 150, direction: 'rtl' }}>
                {isStarted && (
                    <p style={{ color: '#06b6d4', fontSize: '16px', lineHeight: '1.6', fontWeight: 900, textShadow: '0 0 15px rgba(6,182,212,0.7)', margin: 0, textAlign: 'center' }}>
                        {displayedText}
                    </p>
                )}
            </div>

            <div style={{ height: '70vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'relative', width: '70vh', height: '70vh', maxWidth: '100vw', maxHeight: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={AD_IMAGE + CACHE_V} alt="Lever Pioneer" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} />
                    <div style={{ position: 'absolute', top: '48.5%', right: '17.8%', width: '3.5%', height: '3.5%', backgroundColor: '#1a1a1a', borderRadius: '50%', filter: 'blur(4px)', zIndex: 2, opacity: 0.95 }} />
                    
                    <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', height: '15%', background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.8) 0%, rgba(6,182,212,0.4) 30%, transparent 70%)', filter: 'blur(15px)', zIndex: 2, opacity: 1, mixBlendMode: 'screen', pointerEvents: 'none' }} />
                    
                    {isStarted && (
                        <>
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', position: 'absolute', top: '65%', left: '3%', width: '40%', height: '10%', zIndex: 1000, WebkitTapHighlightColor: 'rgba(6,182,212,0.3)', background: 'rgba(255,255,255,0.01)', pointerEvents: 'auto' }} />
                            <a href={CALL_URL} style={{ display: 'block', position: 'absolute', top: '75%', left: '3%', width: '40%', height: '10%', zIndex: 1000, WebkitTapHighlightColor: 'rgba(6,182,212,0.3)', background: 'rgba(255,255,255,0.01)', pointerEvents: 'auto' }} />
                            <div onClick={() => setActiveModal('portfolio')} onTouchEnd={() => setActiveModal('portfolio')} style={{ display: 'block', position: 'absolute', top: '85%', left: '3%', width: '40%', height: '10%', zIndex: 1000, WebkitTapHighlightColor: 'rgba(212,175,55,0.3)', cursor: 'pointer', background: 'rgba(255,255,255,0.01)', pointerEvents: 'auto' }} />
                        </>
                    )}

                    {activeModal === 'quote' && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                            <div style={{ width: '100%', maxWidth: '450px', background: '#050505', border: '2px solid rgba(6,182,212,0.4)', borderRadius: '30px', padding: '25px', position: 'relative', boxShadow: '0 0 30px rgba(6,182,212,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
                                <button onClick={() => setActiveModal(null)} onTouchStart={() => setActiveModal(null)} style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', zIndex: 10 }}>×</button>
                                <h3 style={{ fontSize: '20px', fontWeight: 900, fontStyle: 'italic', letterSpacing: '2px', color: '#06b6d4', marginBottom: '15px', textAlign: 'center', textShadow: '0 0 15px rgba(6,182,212,0.5)' }}>عـرض سـعر هنـدسي</h3>
                                {quoteSent ? (
                                    <div style={{ textAlign: 'center', padding: '40px 0', fontSize: '18px', fontWeight: 900, color: '#06b6d4' }}>✅ تـم إرسـال الطلب بـنجاح</div>
                                ) : (
                                    <form onSubmit={submitQuoteRequest} style={{ display: 'flex', flexDirection: 'column', gap: '8px', direction: 'rtl' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <input name="userName" required placeholder="الاسم / الشركة" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '11px', outline: 'none' }} />
                                            <input name="userPhone" required placeholder="رقم الهاتف" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '11px', outline: 'none' }} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <input name="governorate" required placeholder="المحافظة" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '11px', outline: 'none' }} />
                                            <input name="city" required placeholder="المدينة / المنطقة" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '11px', outline: 'none' }} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', position: 'relative' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5px' }}>
                                                <label style={{ fontSize: '9px', color: '#d4af37', fontWeight: 900 }}>موقع العقار</label>
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        const btn = document.getElementById('geo-btn');
                                                        if (btn) btn.innerText = 'جاري التحديد...';
                                                        navigator.geolocation.getCurrentPosition(
                                                            (pos) => {
                                                                const link = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
                                                                const input = document.getElementsByName('locationLink')[0] as HTMLInputElement;
                                                                if (input) input.value = link;
                                                                if (btn) {
                                                                    btn.innerText = '✅ تم التحديد';
                                                                    btn.style.color = '#06b6d4';
                                                                }
                                                            },
                                                            (err) => {
                                                                console.error(err);
                                                                if (btn) {
                                                                    btn.innerText = '❌ فشل التحديد';
                                                                    btn.style.color = '#ef4444';
                                                                }
                                                                alert('يرجى السماح بالوصول للموقع أو إدخال الرابط يدوياً');
                                                            }
                                                        );
                                                    }}
                                                    id="geo-btn"
                                                    style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.4)', borderRadius: '8px', color: '#d4af37', fontSize: '9px', padding: '4px 10px', cursor: 'pointer', fontWeight: 'bold' }}
                                                >
                                                    🚀 تحديد تلقائي
                                                </button>
                                            </div>
                                            <input name="locationLink" placeholder="أدخل الرابط أو استخدم التحديد التلقائي" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '11px', outline: 'none' }} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <label style={{ fontSize: '9px', color: '#06b6d4', paddingRight: '5px', fontWeight: 900 }}>نوع المصعد</label>
                                                <select name="elevatorType" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px', color: '#fff', fontSize: '11px', outline: 'none', width: '100%' }}>
                                                    <option>بانورامي</option>
                                                    <option>سكني</option>
                                                    <option>مستشفيات</option>
                                                    <option>بضائع</option>
                                                </select>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <label style={{ fontSize: '9px', color: '#06b6d4', paddingRight: '5px', fontWeight: 900 }}>عدد الأدوار</label>
                                                <input name="floors" placeholder="مثلاً: 5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '11px', outline: 'none' }} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                            <label style={{ fontSize: '9px', color: '#06b6d4', paddingRight: '5px', fontWeight: 900 }}>مساحة البير (طول * عرض م)</label>
                                            <input name="shaft" placeholder="مثلاً: 1.5 * 1.5 م" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '11px', outline: 'none' }} />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <label style={{ fontSize: '9px', color: '#666', paddingRight: '5px' }}>تأسيس المصعد</label>
                                                <select name="foundation" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px', color: '#fff', fontSize: '11px', outline: 'none' }}>
                                                    <option>يوجد</option>
                                                    <option>لا يوجد</option>
                                                </select>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <label style={{ fontSize: '9px', color: '#666', paddingRight: '5px' }}>غرفة ماكينة</label>
                                                <select name="machineRoom" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px', color: '#fff', fontSize: '11px', outline: 'none' }}>
                                                    <option>موجود</option>
                                                    <option>غير موجود</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <label style={{ fontSize: '9px', color: '#666', paddingRight: '5px' }}>نوع الكهرباء</label>
                                                <select name="power" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px', color: '#fff', fontSize: '11px', outline: 'none' }}>
                                                    <option>380 فولت</option>
                                                    <option>220 فولت</option>
                                                </select>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                                <label style={{ fontSize: '9px', color: '#666', paddingRight: '5px' }}>نوع الأبواب</label>
                                                <select name="door" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px', color: '#fff', fontSize: '11px', outline: 'none' }}>
                                                    <option>أوتوماتيك</option>
                                                    <option>نصف أوتوماتيك</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button disabled={quoteLoading} type="submit" style={{ background: 'linear-gradient(45deg, #06b6d4, #0891b2)', color: '#000', border: 'none', borderRadius: '15px', padding: '18px', fontWeight: '900', fontSize: '15px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 0 20px rgba(6,182,212,0.4)' }}>
                                            {quoteLoading ? 'جاري الإرسال...' : 'إرسـال طلب التـسعيرة الـنـهائي'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}

                    {activeModal === 'portfolio' && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '10px', overflowY: 'auto' }}>
                            <button onClick={() => setActiveModal(null)} onTouchStart={() => setActiveModal(null)} style={{ alignSelf: 'flex-end', margin: '10px 10px 0 0', background: 'none', border: 'none', color: '#fff', fontSize: '32px', cursor: 'pointer', zIndex: 10 }}>×</button>
                            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#d4af37', marginBottom: '15px', letterSpacing: '2px' }}>مـعـرض الأعـمـال الهنـدسـي</h3>
                            
                            {/* Category Filter Tabs */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', width: '100%', padding: '0 10px', direction: 'rtl' }}>
                                {['بانوراما خارجية', 'أوتوماتيك', 'نصف أوتوماتيك', 'بانوراما', 'فيلات'].map(cat => (
                                    <div key={cat} onClick={() => (window as any).LEVER_CAT = cat} style={{ flexShrink: 0, padding: '8px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '12px', fontSize: '11px', fontWeight: 900, color: '#d4af37', cursor: 'pointer' }}>
                                        {cat}
                                    </div>
                                ))}
                            </div>

                            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', paddingBottom: '40px' }}>
                                {[
                                    { title: "تنفيذ بانورامي خارجي (فيديو)", cat: "بانوراما خارجية", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.38.50.mp4" },
                                    { title: "حركة الأبواب الأوتوماتيكية", cat: "أوتوماتيك", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.38.51.mp4" },
                                    { title: "مصعد أوتوماتيك حديث (MOTION)", cat: "أوتوماتيك", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.240.mp4" },
                                    { title: "تشغيل أبواب نصف أوتوماتيك", cat: "نصف أوتوماتيك", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.2522.mp4" },
                                    { title: "مصعد بانورامي صاعد - ذهبي", cat: "بانوراما خارجية", img: "/campaigns/lever-pioneer/portfolio/pano-ext/ext-1.jpg" },
                                    { title: "مصعد خارجي أسود مودرن", cat: "بانوراما خارجية", img: "/campaigns/lever-pioneer/portfolio/pano-ext/ext-2.jpg" },
                                    { title: "مصعد أوتوماتيك - باب ذهبي", cat: "أوتوماتيك", img: "/campaigns/lever-pioneer/portfolio/auto/auto-1.jpg" },
                                    { title: "تجربة الصعود البانورامي", cat: "بانوراما خارجية", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.2566.mp4" },
                                    { title: "مصعد خدمة شاقة", cat: "أوتوماتيك", vid: "/campaigns/lever-pioneer/portfolio/videos/WhatsApp Video 2026-03-29 at 20.40.2400.mp4" }
                                ].map((p, idx) => (
                                    <div key={idx} style={{ width: '160px', background: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                                        {(p as any).vid ? (
                                            <video 
                                                src={(p as any).vid} 
                                                autoPlay muted loop playsInline 
                                                style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
                                            />
                                        ) : (
                                            <img src={p.img} alt={p.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                                        )}
                                        <div style={{ padding: '12px', fontSize: '9px', textAlign: 'center', direction: 'rtl', color: '#ccc' }}>
                                            <div style={{ color: '#d4af37', fontStyle: 'italic', marginBottom: '4px' }}>{p.cat}</div>
                                            {p.title}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!isLegacy && isStarted && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
                            <Quantum3DLayer />
                        </div>
                    )}
                </div>
            </div>

            <div style={{ height: '15vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 150, gap: '15px' }}>
                {isStarted && (
                    <div style={{ display: 'flex', gap: '15px', direction: 'rtl' }}>
                        <div onClick={() => setActiveModal('quote')} onTouchEnd={() => setActiveModal('quote')} style={{ padding: '12px 25px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.4)', borderRadius: '15px', color: '#06b6d4', fontSize: '11px', fontWeight: 900, cursor: 'pointer', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Zap size={14} /> طلب عرض سعر
                        </div>
                        <div onClick={() => setActiveModal('portfolio')} onTouchEnd={() => setActiveModal('portfolio')} style={{ padding: '12px 25px', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '15px', color: '#d4af37', fontSize: '11px', fontWeight: 900, cursor: 'pointer', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Activity size={14} /> معرض الأعمال
                        </div>
                    </div>
                )}
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ color: '#fff', fontSize: '8px', letterSpacing: '5px', opacity: 0.3, marginBottom: '4px' }}>ARCHITECTED BY</div>
                    <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: 900, letterSpacing: '4px', textShadow: '0 0 10px rgba(212,175,55,0.3)' }}>SHERIF ROSAS</div>
                </div>
            </div>
        </div>
    );
}
