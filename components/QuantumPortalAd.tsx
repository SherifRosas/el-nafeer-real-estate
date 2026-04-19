'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Phone, MessageCircle, MapPin, X, Activity, ShieldCheck, Zap, Home, Layout, FileText, Globe } from 'lucide-react'
import { LEVER_PORTFOLIO } from '@/lib/lever-portfolio'
import AIChatbot from './AIChatbot'
import { useLanguage } from './LanguageContext'
import QuantumNeuralMesh from './QuantumNeuralMesh'

const DOMAIN = "https://el-nafeer-real-estate.vercel.app";
const AD_IMAGE = "/campaigns/lever-pioneer/lever_pioneer_v318_ultimate.png"
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=201111171368";
const CALL_URL = "tel:+201070615372";
const LOCATION_URL = "https://www.google.com/maps/place/Al+Omraneya,+Al+Haram,+Giza+Governorate/@29.9656242,31.0922895,17z/data=!4m15!1m8!3m7!1s0x14584fc2bfbefc07:0x5df1948b27a63882!2sAl+Omraneya,+Al+Haram,+Giza+Governorate!3b1!8m2!3d29.9656242!4d31.0922895!16s%2Fg%2F11c659wy1d!3m5!1s0x14584fc2bfbefc07:0x5df1948b27a63882!8m2!3d29.9656242!4d31.0922895!16s%2Fg%2F11c659wy1d?hl=en-EG&entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D";

// --- BILINGUAL DICTIONARY MAPPING ---
const DICTIONARY = {
    ar: {
        tap_to_ascent: "TAP_TO_ASCENT | ابدأ التجربة",
        close: "إغلاق",
        intro: "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب-اتصال-الموقع).",
        offer: "عرض حصري لسكان الجيزة وهضبة الأهرام: خصم استراتيجي 15% على عقود التأسيس والصيانة خلال شهر أكتوبر. ليفر.. شريكك في التميز الرأسي.",
        retarget: "نحن شركة ليفر نرحب بكم مجدداً - نخبة القاهرة والجيزة تستحق الأفضل. طلبك الفني القادم يحصل على خصم استراتيجي حصري.",
        wa: "واتساب",
        call: "اتصال",
        loc: "الموقع",
        port: "المعرض",
        quote: "طلب سعر",
        form_title: "طلب تـسعيرة فـني",
        form_success: "✅ تم إرسال الطلب بنجاح",
        form_name: "الاسم",
        form_phone: "الهاتف",
        form_loc_btn: "اضغط لمشاركة موقع العقار (خرائط جوجل)",
        form_loc_loading: "جاري التحديد...",
        form_loc_success: "✅ تم تحديد الموقع بنجاح",
        form_floors: "الأدوار",
        form_shaft: "بئر المصعد (مثلاً 1.5*1.5)",
        form_foundations: "الأساسات",
        form_foundations_yes: "الأساسات: يوجد",
        form_foundations_no: "الأساسات: لا يوجد",
        form_loc_text: "الموقع (الجيزه - هضبة الأهرام)",
        form_submit: "تأكـيد الطلـب الفـني",
        types: { residential: "سكني", commercial: "تجاري", panorama: "بانوراما المونيوم", maintenance: "صيانة وأعطال" },
        portfolio_title: "مـعرض الأعـمال",
        portfolio_all: "الكل",
        portfolio_return: "العودة",
        flash_gift: "هدية حصرية لمشاهدين البوابة! 🎁",
        flash_desc: "لقد تم اختيارك للحصول على **خصم فني استثنائي 15%** على عقود التأسيس أو الصيانة. \n\n العرض صالح لمدة ٢٤ ساعة فقط.",
        flash_btn: "تفعيل العرض عبر المحادثة الذكية ⚡"
    },
    en: {
        tap_to_ascent: "TAP_TO_ASCENT | START EXPERIENCE",
        close: "CLOSE",
        intro: "Now from the heart of Giza - El Haram, Lever Pioneer Elevators inaugurates its new headquarters. Contact us via icons (WhatsApp-Call-Location).",
        offer: "Exclusive offer for Giza residents: Strategic 15% discount on installation and maintenance contracts this month. Lever.. your vertical partner.",
        retarget: "Welcome back - the elite of Cairo and Giza deserve the best. Your next technical request gets an exclusive strategic discount.",
        wa: "WhatsApp",
        call: "Call",
        loc: "Location",
        port: "Portfolio",
        quote: "Quote",
        form_title: "Technical Quote Request",
        form_success: "✅ Request Sent Successfully",
        form_name: "Name",
        form_phone: "Phone",
        form_loc_btn: "Tap to share site location (Google Maps)",
        form_loc_loading: "Locating...",
        form_loc_success: "✅ Location Captured",
        form_floors: "Floors",
        form_shaft: "Elevator Shaft (e.g. 1.5x1.5)",
        form_foundations: "Foundations",
        form_foundations_yes: "Foundations: Yes",
        form_foundations_no: "Foundations: No",
        form_loc_text: "Location (Giza - El Haram)",
        form_submit: "Confirm Technical Request",
        types: { residential: "Residential", commercial: "Commercial", panorama: "Aluminium Panorama", maintenance: "Maintenance & Repair" },
        portfolio_title: "Case Studies Portfolio",
        portfolio_all: "All",
        portfolio_return: "RETURN",
        flash_gift: "Exclusive Portal Gift! 🎁",
        flash_desc: "You have been selected for an **Exclusive 15% Strategic Discount** on installation or maintenance contracts. \n\n Offer valid for 24 hours only.",
        flash_btn: "Activate Offer via Smart AI ⚡"
    }
};

const LEVER_BRAND_ID = "62c38934-4c4b-42be-98c9-06cbbee1af19";

export default function QuantumPortalAd({ variant = 'v2', autoStart = false }: { variant?: 'v2' | 'v3', autoStart?: boolean }) {
    const { language, setLanguage } = useLanguage();
    const t = DICTIONARY[language];
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
    const [isStarted, setIsStarted] = useState(autoStart);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [activeModal, setActiveModal] = useState<null | 'quote' | 'portfolio'>(null);
    const [quoteSent, setQuoteSent] = useState(false);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('الكل');
    const [fullScreenVid, setFullScreenVid] = useState<string | null>(null);
    const [userLocLink, setUserLocLink] = useState<string | null>(null);
    const [locLoading, setLocLoading] = useState(false);
    const [showFlashOffer, setShowFlashOffer] = useState(false);

    const portfolioItems = LEVER_PORTFOLIO;
    const filteredPortfolio = selectedCategory === 'الكل' ? portfolioItems : portfolioItems.filter(item => item.cat === selectedCategory);

    // --- MAGNET PROTOCOL: FLASH OFFER TRIGGER ---
    useEffect(() => {
        const timer = setTimeout(() => {
            const hasClaimed = localStorage.getItem('LEVER_OFFER_CLAIMED');
            if (isStarted && !hasClaimed) {
                setShowFlashOffer(true);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [isStarted]);

    const trackEvent = (action: string, category: string) => {
        const payload = {
            category,
            action,
            label: `LEVER_PIONEER_REF_${referralId.toUpperCase()}`,
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

        const activeText = isReturningUser ? t.retarget : t.intro;
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
            
            const waMsg = language === 'ar' 
                ? `السلام عليكم شركة ليفر الرائدة للمصاعد.\nأنا: ${uName}\nقمت بإرسال طلب عرض سعر فني للمصعد الخاص بي:\n\n• النوع: ${eType}\n• الأدوار: ${eFloors}\n• بئر المصعد: ${eShaft}\n• الأساسات: ${eFound}\n• الموقع: ${eLoc}\n• خرائط جوجل: ${userLocLink || 'لم يتم التحديد'}\n\nأتمنى التواصل بخصوص المواصفات الفنية.`
                : `Hello Lever Pioneer Elevators.\nI am: ${uName}\nI sent a technical quote request for my elevator:\n\n• Type: ${eType}\n• Floors: ${eFloors}\n• Shaft Size: ${eShaft}\n• Foundations: ${eFound}\n• Location: ${eLoc}\n• Maps Link: ${userLocLink || 'Not Specified'}\n\nI look forward to discussing technical specs.`;
            
            setTimeout(() => { 
                setActiveModal(null); 
                setQuoteSent(false); 
                window.location.href = `${WHATSAPP_URL}&text=${encodeURIComponent(waMsg)}`; 
            }, 2500);
        } catch (error) { console.error("Lead error:", error); } finally { setQuoteLoading(false); }
    }

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'transparent', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse-cyan { 0% { box-shadow: 0 0 10px rgba(6,182,212,0.3); } 50% { box-shadow: 0 0 40px rgba(6,182,212,0.6); } 100% { box-shadow: 0 0 10px rgba(6,182,212,0.3); } }
                @keyframes icon-float { 0% { transform: translateY(0) scale(1.02); } 50% { transform: translateY(-2px) scale(1.04); } 100% { transform: translateY(0) scale(1.02); } }
                @keyframes shiny-shimmer { 0% { background-position: -200px; } 100% { background-position: 200px; } }
            `}} />
            
            {/* 🌌 SOVEREIGN_3D_BACKGROUND_LAYER (Variant: Cyan) */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <QuantumNeuralMesh variant="cyan" />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.4) 100%)', pointerEvents: 'none' }} />
            </div>

            <audio ref={audioRef} loop src="https://audio-previews.elements.envatousercontent.com/files/234765669/preview.mp3" style={{ display: 'none' }} />

            {/* 📦 PORTAL_UI_HUD_OVERLAYS */}
            {!activeModal && (
                <>
                    <button 
                        onClick={() => {
                            if (audioRef.current) {
                                audioRef.current.pause();
                                audioRef.current.currentTime = 0;
                            }
                            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
                            setIsStarted(false);
                            setDisplayedText("");
                        }}
                        style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10000, background: 'rgba(0,0,0,0.5)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '15px', padding: '8px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', backdropFilter: 'blur(15px)', transition: 'all 0.3s ease', cursor: 'pointer', gap: '2px' }}
                    >
                        <X size={22} />
                        <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px' }}>{t.close}</span>
                    </button>

                    <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10000, display: 'flex', gap: '8px' }}>
                        <button 
                            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                            style={{ background: 'rgba(6,182,212,0.2)', border: '1px solid #06b6d4', borderRadius: '12px', padding: '8px 12px', color: '#fff', fontWeight: 900, fontSize: '11px', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', boxShadow: '0 0 15px rgba(6,182,212,0.3)' }}
                        >
                            <Globe size={14} className="text-cyan-400" />
                            {language === 'ar' ? 'ENGLISH' : 'العربية'}
                        </button>
                    </div>

                    <div style={{ position: 'absolute', top: '80px', left: '20px', right: '20px', zIndex: 9001, direction: language === 'ar' ? 'rtl' : 'ltr', textAlign: 'center' }}>
                        <div style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.1)', borderRadius: '20px', padding: '15px', fontSize: '14px', fontWeight: 'bold', color: '#fff', lineHeight: '1.6', backdropFilter: 'blur(20px)', textShadow: '0 0 15px rgba(0,0,0,1)' }}>
                            {displayedText}
                        </div>
                    </div>
                </>
            )}

            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'transparent' }}>
                {/* INTERACTIVE ACTION BAR */}
                {!activeModal && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'rgba(0,0,0,0.85)', padding: '15px 0 30px 0', display: 'flex', justifyContent: 'center', gap: '15px', zIndex: 100050, borderTop: '1px solid rgba(6,182,212,0.2)', backdropFilter: 'blur(25px)', direction: language === 'ar' ? 'rtl' : 'ltr', pointerEvents: 'auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <a onClick={() => trackEvent('WHATSAPP_CONTACT', 'LEAD_ATTEMPT')} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(37,211,102,0.05)', border: '1.5px solid #25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25d366', animation: 'icon-float 3s infinite ease-in-out', cursor: 'pointer', textDecoration: 'none', pointerEvents: 'auto' }}> <MessageCircle size={20} /> </a>
                            <span style={{ fontSize: '10px', fontWeight: 900, color: '#25d366', opacity: 0.9 }}>{t.wa}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <a onClick={() => trackEvent('CALL_CONTACT', 'LEAD_ATTEMPT')} href={CALL_URL} style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(6,182,212,0.05)', border: '1.5px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', animation: 'icon-float 3.5s infinite ease-in-out', cursor: 'pointer', textDecoration: 'none', pointerEvents: 'auto' }}> <Phone size={20} /> </a>
                            <span style={{ fontSize: '10px', fontWeight: 900, color: '#06b6d4', opacity: 0.9 }}>{t.call}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <a onClick={() => trackEvent('LOCATION_VIEW', 'INTEREST_ATTEMPT')} href={LOCATION_URL} target="_blank" rel="noopener noreferrer" style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(6,182,212,0.05)', border: '1.5px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', animation: 'icon-float 4s infinite ease-in-out', cursor: 'pointer', textDecoration: 'none', pointerEvents: 'auto' }}> <MapPin size={20} /> </a>
                            <span style={{ fontSize: '10px', fontWeight: 900, color: '#06b6d4', opacity: 0.9 }}>{t.loc}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <button onClick={() => { trackEvent('PORTFOLIO_VIEW', 'INTEREST_ATTEMPT'); setActiveModal('portfolio'); }} style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1.5px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', animation: 'icon-float 4.5s infinite ease-in-out', cursor: 'pointer', pointerEvents: 'auto' }}>
                                <Globe size={20} />
                            </button>
                            <span style={{ fontSize: '10px', fontWeight: 900, color: '#06b6d4', opacity: 0.9 }}>{t.port}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <button onClick={() => { trackEvent('QUOTE_REQUEST_START', 'LEAD_ATTEMPT'); setActiveModal('quote'); }} style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1.5px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', animation: 'icon-float 5s infinite ease-in-out', cursor: 'pointer', pointerEvents: 'auto' }}>
                                <Activity size={20} />
                            </button>
                            <span style={{ fontSize: '10px', fontWeight: 900, color: '#06b6d4', opacity: 0.9 }}>{t.quote}</span>
                        </div>
                    </div>
                )}
                
                {activeModal === 'quote' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
                        <div style={{ width: '100%', maxWidth: '380px', background: '#0a0a0f', border: '1px solid #06b6d4', borderRadius: '30px', padding: '25px', position: 'relative', overflowY: 'auto', maxHeight: '90vh', direction: language === 'ar' ? 'rtl' : 'ltr', boxShadow: '0 0 50px rgba(6,182,212,0.2)' }}>
                            <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 15, right: 20, color: '#666', background: 'none', border: 'none', fontSize: '24px' }}>✕</button>
                            <h3 style={{ color: '#06b6d4', textAlign: 'center', fontWeight: 900, marginBottom: '20px', fontSize: '18px' }}>{t.form_title}</h3>
                            {quoteSent ? ( <div style={{ textAlign: 'center', padding: '40px', color: '#fff', fontSize: '16px' }}>{t.form_success}</div> ) : (
                                <form onSubmit={submitQuoteRequest} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <input name="userName" required placeholder={t.form_name} style={{ background: '#111', border: '1px solid #333', padding: '14px', borderRadius: '12px', color: '#fff', fontSize: '13px' }} />
                                    <input name="userPhone" required placeholder={t.form_phone} style={{ background: '#111', border: '1px solid #333', padding: '14px', borderRadius: '12px', color: '#fff', fontSize: '13px' }} />
                                    <div onClick={captureUserLocation} style={{ cursor: 'pointer', background: userLocLink ? 'rgba(37,211,102,0.1)' : 'rgba(6,182,212,0.1)', border: `1px solid ${userLocLink ? '#25d366' : '#06b6d4'}`, padding: '14px', borderRadius: '12px', color: userLocLink ? '#25d366' : '#06b6d4', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        <MapPin size={18} />
                                        {locLoading ? t.form_loc_loading : userLocLink ? t.form_loc_success : t.form_loc_btn}
                                    </div>
                                    <select name="elevatorType" style={{ background: '#111', border: '1px solid #333', padding: '14px', borderRadius: '12px', color: '#fff', fontSize: '13px' }}>
                                        <option value="سكني">{t.types.residential}</option>
                                        <option value="تجاري">{t.types.commercial}</option>
                                        <option value="بانوراما المونيوم">{t.types.panorama}</option>
                                        <option value="صيانة">{t.types.maintenance}</option>
                                    </select>
                                    <input name="floors" type="number" placeholder={t.form_floors} style={{ background: '#111', border: '1px solid #333', padding: '14px', borderRadius: '12px', color: '#fff', fontSize: '13px' }} />
                                    <button type="submit" style={{ background: '#06b6d4', padding: '16px', borderRadius: '15px', fontWeight: 900, color: '#000', fontSize: '16px', marginTop: '10px', boxShadow: '0 10px 20px rgba(6,182,212,0.3)' }}>{t.form_submit}</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                {activeModal === 'portfolio' && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column', padding: '20px', overflowY: 'auto' }}>
                        <button onClick={() => setActiveModal(null)} style={{ alignSelf: 'flex-end', color: '#fff', background: 'none', border: 'none', fontSize: '30px' }}>✕</button>
                        <h2 style={{ textAlign: 'center', color: '#06b6d4', fontWeight: 900, marginBottom: '30px' }}>{t.portfolio_title}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px', justifyContent: 'center' }}>
                            {filteredPortfolio.map((p, idx) => {
                                const isImage = /\.(jpg|jpeg|png|webp|gif|bmp)$/i.test(p.vid);
                                return (
                                    <div key={idx} onClick={() => setFullScreenVid(p.vid)} style={{ background: '#050505', border: '1px solid #222', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}>
                                        {isImage ? (
                                            <img src={p.vid} alt={p.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                        ) : (
                                            <video src={p.vid} autoPlay muted loop playsInline style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                        )}
                                        <div style={{ padding: '10px', fontSize: '9px', textAlign: 'center', color: '#ccc', fontWeight: 'bold' }}>{p.title}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {fullScreenVid && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000', zIndex: 30000, display: 'flex', flexDirection: 'column' }}>
                    <div onClick={() => setFullScreenVid(null)} style={{ padding: '20px', color: '#06b6d4', fontSize: '18px', fontWeight: 900, cursor: 'pointer', borderBottom: '1px solid #111', display: 'flex', alignItems: 'center', gap: '10px' }}> <X size={24} /> {t.portfolio_return} </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}> 
                        {/\.(jpg|jpeg|png|webp|gif|bmp)$/i.test(fullScreenVid) ? (
                            <img src={fullScreenVid} alt="Full Screen" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        ) : (
                            <video src={fullScreenVid} controls autoPlay playsInline style={{ maxWidth: '100%', maxHeight: '100%' }} /> 
                        )}
                    </div>
                </div>
            )}

            <div style={{ height: '5vh', width: '100%', background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid rgba(6,182,212,0.1)' }}>
                <div style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}> 
                    ARCHITECTED_BY_SHERIF_ROSAS // v4.0_DYNAMIC
                </div>
            </div>

            {/* MAGNET PROTOCOL: FLASH OFFER POPUP */}
            {showFlashOffer && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100010, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)', padding: '20px' }}>
                    <div style={{ width: '100%', maxWidth: '360px', background: 'linear-gradient(135deg, #0a0a0f 0%, #111 100%)', border: '2px solid #06b6d4', borderRadius: '35px', padding: '35px', position: 'relative', textAlign: 'center', animation: 'pulse-cyan 2s infinite' }}>
                        <button onClick={() => setShowFlashOffer(false)} style={{ position: 'absolute', top: 20, right: 25, color: '#666', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
                        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', color: '#06b6d4' }}>
                            <div style={{ fontSize: '35px' }}>🎁</div>
                        </div>
                        <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 900, marginBottom: '15px', direction: language === 'ar' ? 'rtl' : 'ltr' }}>{t.flash_gift}</h2>
                        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.7', marginBottom: '25px', direction: language === 'ar' ? 'rtl' : 'ltr' }}>
                            {t.flash_desc}
                        </p>
                        <button 
                            onClick={() => {
                                setShowFlashOffer(false);
                                localStorage.setItem('LEVER_OFFER_CLAIMED', 'true');
                                trackEvent('FLASH_OFFER_CLAIMED', 'MAGNET_PROTOCOL');
                            }}
                            style={{ width: '100%', background: '#06b6d4', color: '#000', padding: '18px', borderRadius: '20px', fontWeight: 900, fontSize: '15px', cursor: 'pointer', border: 'none', boxShadow: '0 15px 30px rgba(6,182,212,0.4)' }}
                        >
                            {t.flash_btn}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
