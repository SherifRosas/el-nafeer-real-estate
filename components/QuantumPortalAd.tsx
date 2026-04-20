'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Phone, MessageCircle, MapPin, X, Activity, ShieldCheck, Zap, Home, Layout, FileText, Globe } from 'lucide-react'
import { LEVER_PORTFOLIO } from '@/lib/lever-portfolio'
import AIChatbot from './AIChatbot'
import { useLanguage } from './LanguageContext'
import GizaHorizonMesh from './GizaHorizonMesh'

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=201111171368";
const CALL_URL = "tel:+201070615372";
const LOCATION_URL = "https://www.google.com/maps/place/Al+Omraneya,+Al+Haram,+Giza+Governorate/@29.9656242,31.0922895,17z/data=!4m15!1m8!3m7!1s0x14584fc2bfbefc07:0x5df1948b27a63882!2sAl+Omraneya,+Al+Haram,+Giza+Governorate!3b1!8m2!3d29.9656242!4d31.0922895!16s%2Fg%2F11c659wy1d!3m5!1s0x14584fc2bfbefc07:0x5df1948b27a63882!8m2!3d29.9656242!4d31.0922895!16s%2Fg%2F11c659wy1d?hl=en-EG&entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D";

const DICTIONARY = {
    ar: {
        tap_to_ascent: "TAP_TO_ASCENT | ابدأ صعود الهضبة",
        close: "إغلاق",
        intro: "أهلاً بكم في صعود هضبة الجيزة مع شركة ليفر. استمتعوا برؤية الأهرامات تحت شمس الظهيرة الصافية. ليفر.. شريكك في التميز الرأسي.",
        offer: "عرض حصري في هضبة الأهرام: خصم استراتيجي 15% على عقود التأسيس والصيانة. ليفر.. القمة هي وجهتنا.",
        retarget: "نُحب رؤيتكم مجدداً في رحاب الأهرامات. شركة ليفر تمنحكم خصماً استثنائياً لصعودكم القادم نحو القمة.",
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
        form_submit: "تأكـيد الطلـب الفـني",
        types: { residential: "سكني", commercial: "تجاري", panorama: "بانوراما المونيوم", maintenance: "صيانة وأعطال" },
        portfolio_title: "مـعرض الأعـمال",
        portfolio_return: "العودة",
        flash_gift: "هدية حصرية لمشاهدين البوابة! 🎁",
        flash_desc: "لقد تم اختيارك للحصول على **خصم فني استثنائي 15%** على عقود التأسيس أو الصيانة. \n\n العرض صالح لمدة ٢٤ ساعة فقط.",
        flash_btn: "تفعيل العرض عبر المحادثة الذكية ⚡"
    },
    en: {
        tap_to_ascent: "TAP_TO_ASCENT | START PLATEAU ASCENT",
        close: "CLOSE",
        intro: "Welcome to the Giza Plateau ascent with Lever Pioneer. Experience the majesty of the pyramids under the brilliant high-noon sun. Lever.. your partner in vertical excellence.",
        offer: "Exclusive Giza Plateau offer: Strategic 15% discount on installation and maintenance. Lever.. the summit is our destination.",
        retarget: "Welcome back to the Giza horizon. Lever Pioneer offers you a strategic discount for your next ascent to the summit.",
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
        form_submit: "Confirm Technical Request",
        types: { residential: "Residential", commercial: "Commercial", panorama: "Aluminium Panorama", maintenance: "Maintenance & Repair" },
        portfolio_title: "Case Studies Portfolio",
        portfolio_return: "RETURN",
        flash_gift: "Exclusive Portal Gift! 🎁",
        flash_desc: "You have been selected for an **Exclusive 15% Strategic Discount** on installation or maintenance contracts. \n\n Offer valid for 24 hours only.",
        flash_btn: "Activate Offer via Smart AI ⚡"
    }
};

const LEVER_BRAND_ID = "62c38934-4c4b-42be-98c9-06cbbee1af19";

export default function QuantumPortalAd({ autoStart = false }) {
    const { language, setLanguage } = useLanguage();
    const t = DICTIONARY[language];
    const searchParams = useSearchParams();
    const referralId = searchParams.get('ref') || 'direct';
    
    const [isReturningUser, setIsReturningUser] = useState(false);
    useEffect(() => {
        const hasVisited = localStorage.getItem('LEVER_PORTAL_VISITED');
        if (hasVisited) setIsReturningUser(true);
        else localStorage.setItem('LEVER_PORTAL_VISITED', 'true');
    }, []);

    const [displayedText, setDisplayedText] = useState("");
    const [isStarted, setIsStarted] = useState(autoStart);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [activeModal, setActiveModal] = useState<null | 'quote' | 'portfolio'>(null);
    const [quoteSent, setQuoteSent] = useState(false);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [fullScreenVid, setFullScreenVid] = useState<string | null>(null);
    const [userLocLink, setUserLocLink] = useState<string | null>(null);
    const [locLoading, setLocLoading] = useState(false);
    const [showFlashOffer, setShowFlashOffer] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isStarted && !localStorage.getItem('LEVER_OFFER_CLAIMED')) setShowFlashOffer(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isStarted]);

    const trackEvent = (action: string, category: string) => {
        const payload = { category, action, label: `LEVER_PIONEER_STABILITY_v5.6`, timestamp: new Date().toISOString() };
        fetch('/api/analytics/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {});
    }

    const initiateExperience = () => {
        if (isStarted) return;
        setIsStarted(true);
        if (audioRef.current) { audioRef.current.muted = false; audioRef.current.play().catch(() => {}); }

        const activeText = isReturningUser ? t.retarget : t.intro;
        const words = activeText.split(' ').filter(w => w && w.trim().length > 0);
        let idx = 0;
        setDisplayedText(words[0] || "");
        idx = 1;

        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = setInterval(() => {
            if (idx < words.length) {
                setDisplayedText(prev => prev + ' ' + words[idx]);
                idx++;
            } else { if (typingIntervalRef.current) clearInterval(typingIntervalRef.current); }
        }, 350);
    }

    const captureUserLocation = () => {
        setLocLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setUserLocLink(`https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`);
                setLocLoading(false);
            }, () => setLocLoading(false));
        } else setLocLoading(false);
    }

    const submitQuoteRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuoteLoading(true);
        const formData = new FormData(e.currentTarget);
        const payload = { 
            name: formData.get('userName'), 
            phone: formData.get('userPhone'), 
            notes: `v5.6_LOCKED: ${formData.get('elevatorType')} | Floors: ${formData.get('floors')} | GPS: ${userLocLink || 'No'}`,
            brandProfileId: LEVER_BRAND_ID 
        };
        try {
            await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            setQuoteSent(true);
            setTimeout(() => { setActiveModal(null); setQuoteSent(false); }, 3000);
        } catch (error) { console.error(error); } finally { setQuoteLoading(false); }
    }

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse-cyan { 0% { box-shadow: 0 0 10px rgba(6,182,212,0.3); } 50% { box-shadow: 0 0 40px rgba(6,182,212,0.6); } 100% { box-shadow: 0 0 10px rgba(6,182,212,0.3); } }
                @keyframes icon-float { 0% { transform: translateY(0); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0); } }
            `}} />
            
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <GizaHorizonMesh />
            </div>

            {!isStarted && (
                <div onClick={initiateExperience} style={{ position: 'absolute', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)', cursor: 'pointer' }}>
                    <div style={{ padding: '20px 40px', background: 'rgba(6,182,212,0.2)', border: '2px solid #06b6d4', borderRadius: '50px', color: '#fff', fontWeight: 900, fontSize: '18px', letterSpacing: '2px', animation: 'pulse-cyan 2s infinite' }}>
                        {t.tap_to_ascent}
                    </div>
                </div>
            )}

            {isStarted && !activeModal && (
                <>
                    <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10000 }}>
                        <button onClick={() => setIsStarted(false)} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid #fff3', borderRadius: '12px', padding: '8px 15px', color: '#fff', fontWeight: 900, cursor: 'pointer' }}>{t.close}</button>
                    </div>
                    <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10000 }}>
                        <button onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} style={{ background: 'rgba(251,191,36,0.2)', border: '2px solid #fbbf24', borderRadius: '15px', padding: '10px 18px', color: '#fff', fontWeight: 900, cursor: 'pointer', backdropFilter: 'blur(15px)', boxShadow: '0 0 20px rgba(251,191,36,0.3)' }}>
                            <Globe size={18} style={{ display: 'inline', marginRight: '8px' }} />
                            {language === 'ar' ? 'ENGLISH' : 'العربية'}
                        </button>
                    </div>
                    <div style={{ position: 'absolute', top: '100px', left: '20px', right: '20px', zIndex: 9000, textAlign: 'center' }}>
                        <div style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid #fbbf2444', borderRadius: '25px', padding: '25px', color: '#fff', fontWeight: 'bold', backdropFilter: 'blur(15px)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', fontSize: '15px', lineHeight: '1.6' }}>
                            {displayedText}
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'rgba(0,0,0,0.96)', padding: '20px 0 50px 0', display: 'flex', justifyContent: 'center', gap: '22px', borderTop: '2.5px solid #fbbf2488', backdropFilter: 'blur(30px)' }}>
                         {[
                             { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.2h.5"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>, label: t.wa, color: '#25d366', url: WHATSAPP_URL },
                             { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: t.call, color: '#fbbf24', url: CALL_URL },
                             { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: t.loc, color: '#fbbf24', url: LOCATION_URL },
                             { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/></svg>, label: t.port, color: '#fbbf24', action: () => setActiveModal('portfolio') },
                             { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14.5 2 14.5 7.5 20 7.5"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>, label: t.quote, color: '#fff', action: () => setActiveModal('quote') }
                         ].map((btn, i) => (
                             <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                 <a onClick={btn.action} href={btn.url} target={btn.url ? "_blank" : undefined} style={{ width: '60px', height: '60px', borderRadius: '50%', border: `2.5px solid ${btn.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: btn.color, animation: `icon-float ${3+i*0.5}s infinite ease-in-out`, cursor: 'pointer', background: 'rgba(0,0,0,0.5)', textDecoration: 'none', boxShadow: `0 0 15px ${btn.color}33` }}>
                                     {btn.icon}
                                 </a>
                                 <span style={{ fontSize: '11px', fontWeight: 900, color: btn.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{btn.label}</span>
                             </div>
                         ))}
                    </div>
                </>
            )}

            {activeModal === 'quote' && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 20000, background: 'rgba(0,0,0,0.9)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '400px', background: '#0a0a0a', border: '1px solid #06b6d4', borderRadius: '30px', padding: '30px', position: 'relative' }}>
                        <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: 20, right: 20, color: '#fff', background: 'none', border: 'none', fontSize: '20px' }}>✕</button>
                        <h3 style={{ color: '#06b6d4', textAlign: 'center', fontWeight: 900, marginBottom: '20px' }}>{t.form_title}</h3>
                        {quoteSent ? <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>{t.form_success}</div> : (
                            <form onSubmit={submitQuoteRequest} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <input name="userName" required placeholder={t.form_name} style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '15px', color: '#fff' }} />
                                <input name="userPhone" required placeholder={t.form_phone} style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '15px', color: '#fff' }} />
                                <div onClick={captureUserLocation} style={{ padding: '15px', background: 'rgba(6,182,212,0.1)', border: '1px dashed #06b6d4', borderRadius: '15px', color: '#06b6d4', textAlign: 'center', cursor: 'pointer' }}>
                                    {locLoading ? t.form_loc_loading : userLocLink ? t.form_loc_success : t.form_loc_btn}
                                </div>
                                <select name="elevatorType" style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '15px', color: '#fff' }}>
                                    <option value="سكني">{t.types.residential}</option>
                                    <option value="تجاري">{t.types.commercial}</option>
                                    <option value="صيانة">{t.types.maintenance}</option>
                                </select>
                                <input name="floors" type="number" placeholder={t.form_floors} style={{ background: '#111', border: '1px solid #333', padding: '15px', borderRadius: '15px', color: '#fff' }} />
                                <button type="submit" style={{ background: '#06b6d4', padding: '18px', borderRadius: '15px', fontWeight: 900, color: '#000', fontSize: '16px' }}>{t.form_submit}</button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {activeModal === 'portfolio' && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 20000, background: 'rgba(0,0,0,0.98)', padding: '20px', overflowY: 'auto' }}>
                    <button onClick={() => setActiveModal(null)} style={{ color: '#fff', fontSize: '30px', float: language === 'ar' ? 'left' : 'right' }}>✕</button>
                    <h2 style={{ color: '#06b6d4', textAlign: 'center', fontWeight: 900, margin: '40px 0' }}>{t.portfolio_title}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
                        {LEVER_PORTFOLIO.map((p, i) => (
                            <div key={i} onClick={() => setFullScreenVid(p.vid)} style={{ background: '#111', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #222' }}>
                                {/\.(jpg|jpeg|png|webp)$/i.test(p.vid) ? <img src={p.vid} style={{ width: '100%', height: '100px', objectFit: 'cover' }} /> : <video src={p.vid} muted style={{ width: '100%', height: '100px', objectFit: 'cover' }} />}
                                <div style={{ padding: '10px', fontSize: '10px', color: '#fff', textAlign: 'center' }}>{p.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {fullScreenVid && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 30000, background: '#000', display: 'flex', flexDirection: 'column' }}>
                    <button onClick={() => setFullScreenVid(null)} style={{ padding: '20px', color: '#06b6d4', fontWeight: 900 }}>✕ {t.portfolio_return}</button>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/\.(jpg|jpeg|png|webp)$/i.test(fullScreenVid) ? <img src={fullScreenVid} style={{ maxWidth: '100%', maxHeight: '100%' }} /> : <video src={fullScreenVid} controls autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }} />}
                    </div>
                </div>
            )}

            <div style={{ height: '3vh', width: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#444', letterSpacing: '2px' }}>
                ARCHITECTED_BY_SHERIF_ROSAS // v5.6_MEANINGFUL_LOCKED
            </div>

            {showFlashOffer && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100010, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)', padding: '20px' }}>
                    <div style={{ width: '100%', maxWidth: '360px', background: '#0a0a0f', border: '2px solid #06b6d4', borderRadius: '35px', padding: '35px', textAlign: 'center' }}>
                        <button onClick={() => setShowFlashOffer(false)} style={{ position: 'absolute', top: 20, right: 25, color: '#666', fontSize: '24px' }}>✕</button>
                        <div style={{ fontSize: '40px', marginBottom: '20px' }}>🎁</div>
                        <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 900, marginBottom: '15px' }}>{t.flash_gift}</h2>
                        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px' }}>{t.flash_desc}</p>
                        <button onClick={() => { setShowFlashOffer(false); localStorage.setItem('LEVER_OFFER_CLAIMED', 'true'); window.location.href = WHATSAPP_URL; }} style={{ width: '100%', background: '#06b6d4', color: '#000', padding: '18px', borderRadius: '20px', fontWeight: 900 }}>{t.flash_btn}</button>
                    </div>
                </div>
            )}
        </div>
    );
}
