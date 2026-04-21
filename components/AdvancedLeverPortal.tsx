'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MapPin, X, Globe, Activity, ShieldCheck, Zap, Gauge, Layout, FileText, ChevronLeft, Music, Volume2 } from 'lucide-react'
import { useLanguage } from './LanguageContext'
import { LEVER_PORTFOLIO } from '@/lib/lever-portfolio'
import { neuralAudio } from '@/lib/neural-audio'
import AdvancedLeverMesh from './AdvancedLeverMesh'

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=201111171368";
const CALL_URL = "tel:+201065661882";
const LOCATION_URL = "https://www.google.com/maps/place/Al+Omraneya,+Al+Haram,+Giza+Governorate/@29.9656242,31.0922895,17z/data=!4m15!1m8!3m7!1s0x14584fc2bfbefc07:0x5df1948b27a63882!2sAl+Omraneya,+Al+Haram,+Giza+Governorate!3b1!8m2!3d29.9656242!4d31.0922895!16s%2Fg%2F11c659wy1d!3m5!1s0x14584fc2bfbefc07:0x5df1948b27a63882!8m2!3d29.9656242!4d31.0922895!16s%2Fg%2F11c659wy1d?hl=en-EG&entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D";
const LEVER_BRAND_ID = "62c38934-4c4b-42be-98c9-06cbbee1af19";

const DICTIONARY = {
    ar: {
        tap_to_ascent: "ليفر الرائدة للمصاعد | LEVER_PIONEER",
        close: "إغلاق",
        intro: "تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد بقلب الجيزة حدائق الأهرام البوابة الثانية القديمة \"341 ط\". للتواصل المباشر مع مستشارك الفني أو الوصول لموقعنا، اضغط على الأيقونات التفاعلية أدناه.",
        quantum_label: "قياسات الكم الرقمية",
        gravity: "موجات الجاذبية",
        neural: "الاستجابة العصبية",
        velocity: "سرعة الصعود",
        wa: "واتساب",
        call: "اتصال",
        loc: "الموقع",
        port: "المعرض",
        quote: "طلب عرض",
        form_title: "طلب تـسعيرة فـنية",
        form_success: "✅ تم إرسال الطلب بنجاح",
        form_name: "الاسم",
        form_phone: "الهاتف",
        form_loc_btn: "مشاركة موقع العقار (GPS)",
        form_loc_loading: "جاري التحديد...",
        form_loc_success: "✅ تم التحديد",
        form_submit: "تأكـيد الطلـب",
        portfolio_title: "معرض أعمال ليفر الرائدة للمصاعد",
        portfolio_return: "العودة",
        form_floors: "عدد الأدوار (اختياري)",
        form_type: "نوع المصعد",
        form_notes: "ملاحظات إضافية (اختياري)",
        types: { residential: "سكني", commercial: "تجاري", panorama: "بانوراما المونيوم", maintenance: "صيانة وتحديث" }
    },
    en: {
        tap_to_ascent: "LEVER PIONEER ELEVATORS | ASCENT_START",
        close: "CLOSE",
        intro: "Lever Pioneer Elevators inaugurates its new headquarters in the heart of Giza, Hadayek El Ahram, Old Second Gate \"341 T\". Connect with your technical consultant or navigate to our site via the nodes below.",
        quantum_label: "Quantum Telemetry Hub",
        gravity: "Gravity Waves",
        neural: "Neural Latency",
        velocity: "Ascent Velocity",
        wa: "WhatsApp",
        call: "Call",
        loc: "Location",
        port: "Portfolio",
        quote: "Quote",
        form_title: "Technical Quote Request",
        form_success: "✅ Request Sent Successfully",
        form_name: "Name",
        form_phone: "Phone",
        form_loc_btn: "Share Site GPS Location",
        form_loc_loading: "Locating...",
        form_loc_success: "✅ Location Captured",
        form_submit: "Confirm Request",
        portfolio_title: "Lever Pioneer Elevators Portfolio",
        portfolio_return: "RETURN",
        form_floors: "Number of Floors (Optional)",
        form_type: "Elevator Type",
        form_notes: "Additional Notes (Optional)",
        types: { residential: "Residential", commercial: "Commercial", panorama: "Aluminium Panorama", maintenance: "Maintenance & Modernization" }
    }
};

function QuantumMetric({ label, value, unit, icon: Icon }: any) {
    return (
        <div className="flex flex-col gap-1 bg-black/40 backdrop-blur-md border border-cyan-500/20 p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black tracking-widest uppercase mb-1">
                <Icon size={12} />
                <span>{label}</span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white tabular-nums">{value}</span>
                <span className="text-[10px] text-cyan-500/60 font-bold uppercase">{unit}</span>
            </div>
            <div className="w-full bg-cyan-900/30 h-[2px] mt-2 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.random() * 100}%` }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                    className="h-full bg-cyan-400"
                />
            </div>
        </div>
    )
}

export default function AdvancedLeverPortal() {
    const { language, setLanguage } = useLanguage();
    const t = DICTIONARY[language];
    const [isStarted, setIsStarted] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [activeModal, setActiveModal] = useState<null | 'quote' | 'portfolio'>(null);
    const [quoteSent, setQuoteSent] = useState(false);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [fullScreenVid, setFullScreenVid] = useState<string | null>(null);
    const [userLocLink, setUserLocLink] = useState<string | null>(null);
    const [locLoading, setLocLoading] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

    // 🛡️ HYDRATION_STABILIZER
    useEffect(() => {
        setMounted(true);
    }, []);

    // 🧠 NEURAL TYPING ENGINE (Handles Language Switches & Resets cleanly)
    useEffect(() => {
        if (!isStarted) {
            setDisplayedText("");
            if (typingTimerRef.current) clearInterval(typingTimerRef.current);
            return;
        }

        setDisplayedText(""); // Instantly wipe text on language switch
        const words = t.intro.split(' ');
        let idx = 0;
        
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        
        typingTimerRef.current = setInterval(() => {
            if (idx < words.length) {
                const word = words[idx];
                if (word) setDisplayedText(prev => (prev ? prev + " " : "") + word);
                idx++;
            } else {
                if (typingTimerRef.current) clearInterval(typingTimerRef.current);
            }
        }, 120);

        return () => {
            if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        };
    }, [isStarted, language, t.intro]);

    // Quantum Metrics Simulation
    const [metrics, setMetrics] = useState({ gw: 1.024, nl: 12, av: 450 });

    useEffect(() => {
        if (!isStarted) return;
        const interval = setInterval(() => {
            setMetrics({
                gw: Number((1 + Math.random() * 0.05).toFixed(3)),
                nl: Math.floor(8 + Math.random() * 10),
                av: Math.floor(440 + Math.random() * 20)
            });
        }, 1500);
        return () => clearInterval(interval);
    }, [isStarted]);

    const startExperience = () => {
        setIsStarted(true);
        neuralAudio.playNodeDecrypt();
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        }
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
            notes: `[METRO_ASCENT_LEAD] Type: ${formData.get('elevatorType')} | Floors: ${formData.get('floors')} | GPS: ${userLocLink || 'None'} | User Notes: ${formData.get('userNotes')}`,
            brandProfileId: LEVER_BRAND_ID 
        };
        try {
            await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            setQuoteSent(true);
            setTimeout(() => { setActiveModal(null); setQuoteSent(false); }, 3000);
        } catch (error) { console.error(error); } finally { setQuoteLoading(false); }
    }

    return (
        <div id="lever-sovereign-portal" className="relative w-full h-[100dvh] bg-black overflow-hidden font-sans select-none">
            <div className="absolute inset-0 z-0">
                <AdvancedLeverMesh />
            </div>

            <audio 
                ref={audioRef}
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
                loop
                muted={isMuted}
            />

            <AnimatePresence mode="wait">
                {!isStarted && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 1 }}
                        onClick={startExperience}
                        className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-md cursor-pointer group"
                    >
                        <div className="relative pointer-events-none">
                            <div className="absolute -inset-20 bg-cyan-500/10 blur-[120px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-1000" />
                            <motion.div 
                                className="relative px-8 md:px-16 py-6 md:py-8 bg-black/90 border border-cyan-500/40 rounded-3xl text-white font-black tracking-[0.4em] md:tracking-[0.6em] uppercase flex flex-col items-center gap-4 shadow-[0_0_80px_rgba(6,182,212,0.15)] ring-1 ring-white/5 text-center"
                            >
                                <span className="text-xs md:text-sm border-b border-cyan-500/30 pb-2 mb-2 w-full text-center">{mounted ? t.tap_to_ascent : ""}</span>
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-75" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse delay-150" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isStarted ? (
                <div className="absolute inset-0 z-[100] flex flex-col pointer-events-none p-2 md:p-6 safe-area-inset">
                    {/* TOP LEFT: ESCAPE / EXIT */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-[200] pointer-events-auto">
                        <button 
                            onClick={() => setIsStarted(false)}
                            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white/50 hover:text-red-400 hover:border-red-500/40 font-black tracking-widest text-[10px] uppercase transition-all shadow-xl group"
                        >
                            <X size={16} className="-ml-1 group-hover:rotate-90 transition-transform" />
                            <span>{t.close}</span>
                        </button>
                    </div>

                    {/* TOP RIGHT: MINIMAL CONFIG CLUSTER (Language Only) */}
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-row items-center gap-2 pointer-events-auto z-[200]">
                        <button 
                            onClick={() => mounted && setLanguage(language === 'ar' ? 'en' : 'ar')}
                            className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-[10px] text-white/70 font-black hover:text-cyan-400 hover:border-cyan-500/40 transition-all shadow-xl"
                        >
                            <span>{mounted ? (language === 'ar' ? 'EN' : 'AR') : <Globe size={14} />}</span>
                        </button>
                    </div>

                    <div className="mt-auto flex flex-col md:flex-row gap-6 md:gap-8 items-end justify-between w-full">
                        {/* LEFT/BOTTOM: The Transparent Float Dialogue */}
                        <div className="max-w-lg pointer-events-auto self-start md:self-end">
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="bg-transparent relative overflow-hidden group pointer-events-auto"
                            >
                                <span className="text-[8px] md:text-[9px] text-cyan-400 font-black tracking-[0.3em] uppercase mb-2 block">
                                    AMBIENT_DECRYPTION_UNIT
                                </span>
                                <p className="text-[12px] md:text-[14px] font-bold text-white leading-[1.8] tracking-normal" dir="auto" style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.8)" }}>
                                    {displayedText}
                                </p>
                            </motion.div>
                        </div>

                        {/* RIGHT: Action Nodes (Gallery, Quote, etc.) */}
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-3 pointer-events-auto w-full md:w-auto justify-center md:justify-end border-t border-cyan-500/10 md:border-none pt-2 md:pt-0">
                            {[
                                { icon: <MessageCircle size={20} />, url: WHATSAPP_URL, label: t.wa, color: 'text-green-400 border-green-500/40' },
                                { icon: <Phone size={20} />, url: CALL_URL, label: t.call, color: 'text-cyan-400 border-cyan-500/40' },
                                { icon: <MapPin size={20} />, url: LOCATION_URL, label: t.loc, color: 'text-amber-400 border-amber-500/40' },
                                { icon: <Layout size={20} />, action: () => setActiveModal('portfolio'), label: t.port, color: 'text-white border-white/40' },
                                { icon: <FileText size={20} />, action: () => setActiveModal('quote'), label: t.quote, color: 'text-cyan-500 border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.2)]' }
                            ].map((node, i) => (
                                <motion.a
                                    key={i}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    href={node.url}
                                    onClick={node.action}
                                    target={node.url ? "_blank" : undefined}
                                    className={`flex items-center gap-2 md:gap-4 text-white group cursor-pointer no-underline`}
                                >
                                    <span className="text-[8px] md:text-[9px] font-black tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 bg-black/80 px-2 md:px-3 py-1 rounded-lg border border-white/10 uppercase shadow-2xl hidden md:inline-block">{node.label}</span>
                                    <div className={`w-8 h-8 md:w-12 md:h-12 bg-black/60 backdrop-blur-2xl border ${node.color} rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black shadow-xl`}>
                                        {React.cloneElement(node.icon as React.ReactElement, { size: 16 })}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                    {/* SOVEREIGN_IDENTITY_SIGNATURE [RESTORED] */}
                    <div className="mt-4 md:mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-end items-center gap-4 pointer-events-auto pb-4">
                        <div className="flex flex-col items-center md:items-end group">
                            <span className="text-[7px] text-cyan-500/40 font-black tracking-[0.4em] uppercase mb-1">
                                ARCHITECTED_BY
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="relative text-xl font-black text-white tracking-[0.4em] uppercase transition-all group-hover:text-cyan-400 group-hover:tracking-[0.6em] duration-700">
                                    SHERIF ROSAS
                                </span>
                                <a href={CALL_URL} className="text-white/30 hover:text-cyan-400 transition-all duration-300 hover:scale-125 z-[300]">
                                    <Phone size={18} className="animate-pulse" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* MODAL_LAYERS: PORTFOLIO & QUOTE */}
            <AnimatePresence>
                {activeModal === 'portfolio' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[20000] bg-black/98 backdrop-blur-2xl p-6 md:p-20 overflow-y-auto">
                        <button onClick={() => setActiveModal(null)} className="fixed top-10 right-10 text-white/40 hover:text-white transition-colors"><X size={40} /></button>
                        <h2 className="text-4xl font-black text-cyan-400 tracking-[0.4em] uppercase text-center mb-20">{t.portfolio_title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {LEVER_PORTFOLIO.map((p, i) => (
                                <motion.div key={i} whileHover={{ y: -10 }} onClick={() => setFullScreenVid(p.vid)} className="group cursor-pointer bg-white/5 border border-white/10 rounded-3xl overflow-hidden aspect-video relative">
                                    {/\.(jpg|jpeg|png|webp)$/i.test(p.vid) ? <img src={p.vid} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={p.title} /> : <video src={p.vid} muted className="w-full h-full object-cover opacity-60 group-hover:opacity-100" />}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-6">
                                        <span className="text-white font-black tracking-widest text-xs uppercase">{p.title}</span>
                                        <div className="w-10 h-1 bg-cyan-500 mt-2" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeModal === 'quote' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[20000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6">
                        <div className="w-full max-w-xl bg-black border-2 border-cyan-500/40 rounded-[40px] p-12 relative shadow-[0_0_100px_rgba(6,182,212,0.15)]">
                            <button onClick={() => setActiveModal(null)} className="absolute top-8 right-8 text-white/40 hover:text-white"><X size={24} /></button>
                            <h3 className="text-2xl font-black text-cyan-400 tracking-widest uppercase text-center mb-10">{t.form_title}</h3>
                            {quoteSent ? <div className="text-white text-center py-20 font-black tracking-[0.4em] uppercase animate-pulse">{t.form_success}</div> : (
                                <form onSubmit={submitQuoteRequest} className="flex flex-col gap-4" dir="auto">
                                    <input name="userName" required placeholder={t.form_name} className="w-full bg-white/5 border border-cyan-500/30 p-5 rounded-2xl text-white placeholder:text-white/40 focus:border-cyan-400 outline-none transition-all shadow-inner" />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input name="userPhone" required placeholder={t.form_phone} className="w-full bg-white/5 border border-cyan-500/30 p-5 rounded-2xl text-white placeholder:text-white/40 focus:border-cyan-400 outline-none transition-all shadow-inner" />
                                        <select name="elevatorType" required defaultValue="" className="w-full bg-white/5 border border-cyan-500/30 p-5 rounded-2xl text-white focus:border-cyan-400 outline-none transition-all shadow-inner appearance-none">
                                            <option value="" disabled>{t.form_type}</option>
                                            <option value="Residential">{t.types.residential}</option>
                                            <option value="Commercial">{t.types.commercial}</option>
                                            <option value="Panorama">{t.types.panorama}</option>
                                            <option value="Maintenance">{t.types.maintenance}</option>
                                        </select>
                                    </div>
                                    
                                    <input name="floors" type="number" placeholder={t.form_floors} className="w-full bg-white/5 border border-cyan-500/30 p-5 rounded-2xl text-white placeholder:text-white/40 focus:border-cyan-400 outline-none transition-all shadow-inner" />
                                    
                                    <textarea name="userNotes" rows={2} placeholder={t.form_notes} className="w-full bg-white/5 border border-cyan-500/30 p-5 rounded-2xl text-white placeholder:text-white/40 focus:border-cyan-400 outline-none transition-all shadow-inner resize-none" />

                                    <button type="button" onClick={captureUserLocation} className="w-full bg-cyan-900/20 border border-cyan-500/40 p-5 rounded-2xl text-cyan-400 font-black tracking-widest uppercase hover:bg-cyan-900/40 transition-all flex justify-center items-center gap-3">
                                        <MapPin size={18} />
                                        {locLoading ? t.form_loc_loading : userLocLink ? t.form_loc_success : t.form_loc_btn}
                                    </button>

                                    <button type="submit" disabled={quoteLoading} className="w-full bg-cyan-500 p-6 opacity-90 rounded-2xl text-black font-black tracking-[0.5em] uppercase hover:bg-white hover:opacity-100 transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)] disabled:opacity-50 mt-2">
                                        {quoteLoading ? '...' : t.form_submit}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {fullScreenVid && (
                <div className="fixed inset-0 z-[30000] bg-black flex flex-col">
                    <button onClick={() => setFullScreenVid(null)} className="p-10 text-cyan-400 font-black tracking-[0.5em] group flex items-center gap-4 uppercase no-underline">
                        <X size={24} /> {t.portfolio_return}
                    </button>
                    <div className="flex-1 flex items-center justify-center p-6">
                        {/\.(jpg|jpeg|png|webp)$/i.test(fullScreenVid) ? <img src={fullScreenVid} className="max-w-full max-h-full shadow-2xl rounded-2xl" /> : <video src={fullScreenVid} controls autoPlay className="max-w-full max-h-full shadow-2xl rounded-2xl" />}
                    </div>
                </div>
            )}
        </div>
    )
}
