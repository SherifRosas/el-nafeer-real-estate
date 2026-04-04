'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Phone, MessageCircle, MapPin, X, Activity, ShieldCheck, Zap, Home, Layout, FileText } from 'lucide-react'
import { LEVER_PORTFOLIO } from '@/lib/lever-portfolio'

// Dynamically import the heavy 3D engine
const Quantum3DLayer = dynamic(() => import('./Quantum3DLayer'), { 
    ssr: false,
    loading: () => <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" /></div>
})

const DOMAIN = "https://el-nafeer-real-estate.vercel.app";
const AD_IMAGE = "/campaigns/lever-pioneer/lever_pioneer_v318_ultimate.png"
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=201111171368";
const CALL_URL = "tel:+201070615372";
const LOCATION_URL = "https://www.google.com/maps/place/Al+Omraneya,+Al+Haram,+Giza+Governorate/@29.9656242,31.0922895,17z/data=!4m15!1m8!3m7!1s0x14584fc2bfbefc07:0x5df1948b27a63882!2sAl+Omraneya,+Al+Haram,+Giza+Governorate!3b1!8m2!3d29.9656242!4d31.0922895!16s%2Fg%2F11c659wy1d!3m5!1s0x14584fc2bfbefc07:0x5df1948b27a63882!8m2!3d29.9656242!4d31.0922895!16s%2Fg%2F11c659wy1d?hl=en-EG&entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D";

// --- CAMPAIGN CONSTANTS ---
const fullText = "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب-اتصال-الموقع).";
const LEVER_BRAND_ID = "62c38934-4c4b-42be-98c9-06cbbee1af19";

export default function QuantumPortalAd({ variant = 'v2' }: { variant?: 'v2' | 'v3' }) {
    const searchParams = useSearchParams();
    const referralId = searchParams.get('ref') || 'direct';
    
    // --- SENTINEL MEMORY (RETARGETING) LOGIC ---
    const [isReturningUser, setIsReturningUser] = useState(false);
    useEffect(() => {
        const hasVisited = localStorage.getItem('LEVER_PORTAL_VISITED');
        if (hasVisited) {
            setIsReturningUser(true);
        } else {
            localStorage.setItem('LEVER_PORTAL_VISITED', 'true');
        }
    }, []);

    const [displayedText, setDisplayedText] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null); // EXIT PROTOCOL LOCK
    const [activeModal, setActiveModal] = useState<null | 'quote' | 'portfolio'>(null);
    const [quoteSent, setQuoteSent] = useState(false);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('الكل');
    const [fullScreenVid, setFullScreenVid] = useState<string | null>(null);
    const [userLocLink, setUserLocLink] = useState<string | null>(null);
    const [locLoading, setLocLoading] = useState(false);

    const portfolioItems = LEVER_PORTFOLIO;
    const dynamicCategories = ['الكل', ...Array.from(new Set(portfolioItems.map(item => item.cat)))];
    const filteredPortfolio = selectedCategory === 'الكل' ? portfolioItems : portfolioItems.filter(item => item.cat === selectedCategory);

    useEffect(() => {
        if (!isStarted) {
            const handleGlobalTouch = () => { initiateExperience(); };
            window.addEventListener('touchstart', handleGlobalTouch);
            window.addEventListener('mousedown', handleGlobalTouch);
            return () => {
                window.removeEventListener('touchstart', handleGlobalTouch);
                window.removeEventListener('mousedown', handleGlobalTouch);
            };
        }
    }, [isStarted]);

    const trackEvent = (action: string, category: string) => {
        // --- GIZA-CAIRO GEOGRAPHIC SIGNAL MAPPING ---
        let signalLabel = `LEVER_PIONEER_REF_${referralId.toUpperCase()}`;
        if (referralId === 'ahmed' || referralId === 'hazem') signalLabel = 'GIZA_OWNER_SIGNAL';
        if (referralId === 'partner' || referralId === 'mohamed') signalLabel = 'CAIRO_PARTNER_SIGNAL';
        if (referralId === 'sherif') signalLabel = 'MASTER_CAIRO_SIGNAL';

        const payload = {
            category,
            action,
            label: signalLabel,
            location_memory: isReturningUser ? 'RETARGETED_ELITE' : 'NEW_ACQUISITION',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        fetch('/api/analytics/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).catch(err => console.log("Silent Analytics Catch:", err));
    }

    const initiateExperience = () => {
        if (isStarted) return;
        setIsStarted(true);
        trackEvent('EXPERIENCE_START', 'USER_INTERACTION');
        if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.volume = 0.9;
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    document.addEventListener('click', () => audioRef.current?.play(), { once: true });
                });
            }
        }

        const v3Text = "عرض حصري لسكان الجيزة وهضبة الأهرام: خصم استراتيجي 15% على عقود التأسيس والصيانة خلال شهر أكتوبر. ليفر.. شريكك في التميز الرأسي.";
        const retargetText = isReturningUser ? "نحن شركة ليفر نرحب بكم مجدداً - نخبة القاهرة والجيزة تستحق الأفضل. طلبك الفني القادم يحصل على خصم استراتيجي حصري." : fullText;
        const activeText = variant === 'v3' ? v3Text : retargetText;
        const words = activeText.split(' ').filter(w => w && w.trim().length > 0);
        let idx = 0;
        setDisplayedText(words[0] || ""); 
        idx = 1;

        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        
        typingIntervalRef.current = setInterval(() => {
            if (idx < words.length) {
                const nextWord = words[idx];
                if (nextWord !== undefined) {
                    setDisplayedText(prev => prev + ' ' + nextWord);
                    idx++;
                } else {
                    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
                }
            } else { 
                if (typingIntervalRef.current) clearInterval(typingIntervalRef.current); 
            }
        }, 350); 
    }

    const captureUserLocation = () => {
        setLocLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const link = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
                setUserLocLink(link);
                setLocLoading(false);
            }, (err) => {
                console.error("Loc err:", err);
                setLocLoading(false);
                alert("يرجى تفعيل الـ GPS لمشاركة الموقع");
            });
        } else {
            setLocLoading(false);
            alert("المتصفح لا يدعم تحديد الموقع");
        }
    }

    const submitQuoteRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuoteLoading(true);
        const formData = new FormData(e.currentTarget);
        const uName = formData.get('userName');
        const uPhone = formData.get('userPhone');
        const eType = formData.get('elevatorType');
        const eFloors = formData.get('floors');
        const eShaft = formData.get('shaftSize');
        const eFound = formData.get('foundations');
        const eLoc = formData.get('location');

        const fullNotes = `PORTAL_GPS_LEAD: ${eType} | ${eFloors} Floors | Shaft: ${eShaft} | Found: ${eFound} | Loc: ${eLoc} | Map: ${userLocLink || 'None'}`;
        
        const payload = { name: uName, phone: uPhone, notes: fullNotes, brandProfileId: LEVER_BRAND_ID, status: 'new' };
        
        try {
            await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            setQuoteSent(true);
            
            const waMsg = `السلام عليكم شركة ليفر الرائدة للمصاعد.\nأنا: ${uName}\nقمت بإرسال طلب عرض سعر فني للمصعد الخاص بي:\n\n• النوع: ${eType}\n• الأدوار: ${eFloors}\n• بئر المصعد: ${eShaft}\n• الأساسات: ${eFound}\n• الموقع: ${eLoc}\n• خرائط جوجل: ${userLocLink || 'لم يتم التحديد'}\n\nأتمنى التواصل بخصوص المواصفات الفنية.`;
            
            setTimeout(() => { 
                setActiveModal(null); 
                setQuoteSent(false); 
                window.location.href = `https://api.whatsapp.com/send?phone=201111171368&text=${encodeURIComponent(waMsg)}`; 
            }, 2500);
        } catch (error) { console.error("Lead error:", error); } finally { setQuoteLoading(false); }
    }

    const CACHE_V = "?v=174.0";

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse-cyan { 0% { box-shadow: 0 0 10px rgba(6,182,212,0.3); } 50% { box-shadow: 0 0 40px rgba(6,182,212,0.6); } 100% { box-shadow: 0 0 10px rgba(6,182,212,0.3); } }
                @keyframes pulse-gold { 0% { box-shadow: 0 0 10px rgba(197,160,89,0.3); } 50% { box-shadow: 0 0 40px rgba(197,160,89,0.6); } 100% { box-shadow: 0 0 10px rgba(197,160,89,0.3); } }
                @keyframes icon-float { 0% { transform: translateY(0) scale(1.02); } 50% { transform: translateY(-2px) scale(1.04); } 100% { transform: translateY(0) scale(1.02); } }
                @keyframes shimmer-pulse { 0% { filter: brightness(1) contrast(1); } 50% { filter: brightness(1.2) contrast(1.1); } 100% { filter: brightness(1) contrast(1); } }
                @keyframes shiny-shimmer { 0% { background-position: -200px; } 100% { background-position: 200px; } }
            `}} />
            
            {!isStarted && (
                <div onClick={initiateExperience} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99999, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: `url(${AD_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px) brightness(0.3)' }} />
                    <div style={{ padding: '20px 50px', border: `2px solid ${variant === 'v3' ? '#c5a059' : '#06b6d4'}`, borderRadius: '25px', color: '#fff', fontWeight: 900, animation: variant === 'v3' ? 'pulse-gold 2s infinite' : 'pulse-cyan 2s infinite', background: variant === 'v3' ? 'rgba(197,160,89,0.1)' : 'rgba(6,182,212,0.1)' }}>TAP_TO_ASCENT</div>
                </div>
            )}

            <audio ref={audioRef} loop src="https://audio-previews.elements.envatousercontent.com/files/234765669/preview.mp3" style={{ display: 'none' }} />

            {/* ELITE EXIT BUTTON - ONLY VISIBLE DURING EXPERIENCE & IF NO MODAL IS OPEN */}
            {isStarted && !activeModal && (
                <button 
                    onClick={() => {
                        if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                        }
                        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
                        setIsStarted(false);
                        setDisplayedText("");
                        setActiveModal(null);
                    }}
                    style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10000, background: 'rgba(0,0,0,0.5)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '8px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', backdropFilter: 'blur(15px)', transition: 'all 0.3s ease', cursor: 'pointer', gap: '2px' }}
                >
                    <X size={22} />
                    <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px' }}>إغلاق</span>
                </button>
            )}

            {/* TICKER BOX WITH SAFETY BUFFER (80PX RIGHT) */}
            {isStarted && !activeModal && (
                <div style={{ position: 'absolute', top: '20px', left: '20px', right: '85px', zIndex: 9001, direction: 'rtl', textAlign: 'center' }}>
                    <div style={{ background: variant === 'v3' ? 'rgba(197,160,89,0.02)' : 'rgba(6,182,212,0.02)', border: `1px solid ${variant === 'v3' ? 'rgba(197,160,89,0.1)' : 'rgba(6,182,212,0.1)'}`, borderRadius: '10px', padding: '10px', fontSize: '13px', fontWeight: 'bold', color: '#fff', lineHeight: '1.4', backdropFilter: 'blur(10px)', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                        {displayedText}
                    </div>
                </div>
            )}

            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* CINEMATIC BLUR GLOW TO FILL VOID */}
                    <div style={{ position: 'absolute', width: '100%', height: '100%', background: `url(${AD_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(30px) brightness(0.4)', opacity: 0.5 }} />
                    
                    <img src={AD_IMAGE + CACHE_V} alt="Lever" style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', animation: isStarted ? 'shimmer-pulse 3s infinite ease-in-out' : 'none' }} />
                </div>

                {isStarted && !activeModal && (
                    <div style={{ width: '100%', background: 'rgba(0,0,0,0.85)', padding: '10px 0', display: 'flex', justifyContent: 'center', gap: '15px', zIndex: 9000, borderTop: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(3px)' }}>
                        <a onClick={() => trackEvent('WHATSAPP_CONTACT', 'LEAD_ATTEMPT')} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(37,211,102,0.05)', border: `1.5px solid ${variant === 'v3' || isReturningUser ? '#d4af37' : '#25d366'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: variant === 'v3' || isReturningUser ? '#d4af37' : '#25d366', animation: 'icon-float 3s infinite ease-in-out' }}> <MessageCircle size={17} /> </a>
                        <a onClick={() => trackEvent('CALL_CONTACT', 'LEAD_ATTEMPT')} href={CALL_URL} style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(6,182,212,0.05)', border: `1.5px solid ${variant === 'v3' || isReturningUser ? '#d4af37' : '#06b6d4'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: variant === 'v3' || isReturningUser ? '#d4af37' : '#06b6d4', animation: 'icon-float 3.5s infinite ease-in-out' }}> <Phone size={17} /> </a>
                        <a onClick={() => trackEvent('LOCATION_VIEW', 'INTEREST_ATTEMPT')} href={LOCATION_URL} target="_blank" rel="noopener noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(212,175,55,0.05)', border: `1.5px solid #d4af37`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', animation: 'icon-float 4s infinite ease-in-out' }}> <MapPin size={17} /> </a>
                        <button onClick={() => { trackEvent('PORTFOLIO_VIEW', 'INTEREST_ATTEMPT'); setActiveModal('portfolio'); }} style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(197,160,89,0.05)', border: `1.5px solid #c5a059`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c5a059', animation: 'icon-float 4.5s infinite ease-in-out', cursor: 'pointer' }}> <Layout size={17} /> </button>
                        <button onClick={() => { trackEvent('QUOTE_REQUEST_START', 'LEAD_ATTEMPT'); setActiveModal('quote'); }} style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(6,182,212,0.05)', border: `1.5px solid #06b6d4`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', animation: 'icon-float 5s infinite ease-in-out', cursor: 'pointer' }}> <FileText size={17} /> </button>
                    </div>
                )}
                
                {activeModal === 'quote' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
                        <div style={{ width: '100%', maxWidth: '350px', background: '#0a0a0f', border: '1px solid #06b6d4', borderRadius: '25px', padding: '20px', position: 'relative', overflowY: 'auto', maxHeight: '85vh', direction: 'rtl' }}>
                            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 10, right: 15, color: '#666', background: 'none', border: 'none', fontSize: '24px' }}>×</button>
                            <h3 style={{ color: variant === 'v3' ? '#c5a059' : '#06b6d4', textAlign: 'center', fontWeight: 900, marginBottom: '15px' }}>طلب تـسعيرة فـني</h3>
                            {quoteSent ? ( <div style={{ textAlign: 'center', padding: '30px', color: '#fff' }}>✅ تم إرسال الطلب بنجاح</div> ) : (
                                <form onSubmit={submitQuoteRequest} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <input name="userName" required placeholder="الاسم" style={{ background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                                    <input name="userPhone" required placeholder="الهاتف" style={{ background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                                    <div onClick={captureUserLocation} style={{ cursor: 'pointer', background: userLocLink ? 'rgba(37,211,102,0.1)' : 'rgba(6,182,212,0.1)', border: `1px solid ${userLocLink ? '#25d366' : '#06b6d4'}`, padding: '10px', borderRadius: '8px', color: userLocLink ? '#25d366' : '#06b6d4', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        <MapPin size={16} />
                                        {locLoading ? 'جاري التحديد...' : userLocLink ? '✅ تم تحديد الموقع بنجاح' : 'اضغط لمشاركة موقع العقار (خرائط جوجل)'}
                                    </div>
                                    <select name="elevatorType" style={{ background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '12px' }}>
                                        <option value="سكني">سكني</option>
                                        <option value="تجاري">تجاري</option>
                                        <option value="بانوراما المونيوم">بانوراما المونيوم</option>
                                        <option value="صيانة">صيانة وأعطال</option>
                                    </select>
                                    <input name="floors" type="number" placeholder="الأدوار" style={{ background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                                    <input name="shaftSize" placeholder="بئر المصعد (مثلاً 1.5*1.5)" style={{ background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                                    <select name="foundations" style={{ background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '12px' }}>
                                        <option value="يوجد">الأساسات: يوجد</option>
                                        <option value="لا يوجد">الأساسات: لا يوجد</option>
                                    </select>
                                    <input name="location" placeholder="الموقع (الجيزه - هضبة الأهرام)" style={{ background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                                    <button type="submit" style={{ background: '#06b6d4', padding: '12px', borderRadius: '10px', fontWeight: 900, color: '#000', fontSize: '14px', marginTop: '10px' }}>تأكـيد الطلـب الفـني</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                {activeModal === 'portfolio' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column', padding: '10px', overflowY: 'auto' }}>
                        <button onClick={() => setActiveModal(null)} style={{ alignSelf: 'flex-end', color: '#fff', background: 'none', border: 'none', fontSize: '30px' }}>×</button>
                        <h2 style={{ textAlign: 'center', color: '#d4af37', fontWeight: 900, marginBottom: '20px' }}>مـعرض الأعـمال</h2>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {dynamicCategories.map(cat => (
                                <div key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '8px 15px', background: selectedCategory === cat ? '#d4af37' : '#111', color: selectedCategory === cat ? '#000' : '#d4af37', borderRadius: '10px', fontSize: '11px', fontWeight: 900, cursor: 'pointer', border: `1px solid ${selectedCategory === cat ? '#d4af37' : '#333'}` }}>{cat}</div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px', justifyContent: 'center' }}>
                            {filteredPortfolio.map((p, idx) => {
                                const isImage = /\.(jpg|jpeg|png|webp|gif|bmp)$/i.test(p.vid);
                                return (
                                    <div key={idx} onClick={() => setFullScreenVid(p.vid)} style={{ background: '#050505', border: '1px solid #222', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer' }}>
                                        {isImage ? (
                                            <img src={p.vid} alt={p.title} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                                        ) : (
                                            <video src={p.vid} autoPlay muted loop playsInline style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                                        )}
                                        <div style={{ padding: '8px', fontSize: '8px', textAlign: 'center', color: '#ccc' }}>{p.title}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {fullScreenVid && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000', zIndex: 30000, display: 'flex', flexDirection: 'column' }}>
                    <div onClick={() => setFullScreenVid(null)} style={{ padding: '20px', color: '#d4af37', fontSize: '16px', fontWeight: 900, cursor: 'pointer', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', gap: '10px' }}> <X size={20} /> RETURN | العودة </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}> 
                        {/\.(jpg|jpeg|png|webp|gif|bmp)$/i.test(fullScreenVid) ? (
                            <img src={fullScreenVid} alt="Full Screen" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        ) : (
                            <video src={fullScreenVid} controls autoPlay playsInline style={{ maxWidth: '100%', maxHeight: '100%' }} /> 
                        )}
                    </div>
                </div>
            )}

            {/* RAZOR THIN FOOTER (4VH) */}
            <div style={{ height: '4vh', width: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid #050505' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <a href="tel:+201065661882" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(6,182,212,0.05)', border: '1px solid #06b6d4', color: '#06b6d4', cursor: 'pointer' }}> <Phone size={8} /> </a>
                    <div style={{ fontSize: '6px', fontWeight: 900, letterSpacing: '1px', background: 'linear-gradient(90deg, #333 0%, #fff 50%, #333 100%)', backgroundSize: '180px', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shiny-shimmer 3s infinite linear' }}> ARCHITECTED BY SHERIF ROSAS </div>
                </div>
            </div>
        </div>
    );
}
