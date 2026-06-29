'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MapPin, X, Globe, FileText, CheckCircle, Calendar, Clipboard, Volume2, VolumeX, Shield } from 'lucide-react'
import { useLanguage } from './LanguageContext'
import DrShimaaClinicalMesh from './DrShimaaClinicalMesh'
import { neuralAudio } from '@/lib/neural-audio'

const WHATSAPP_URL = "https://wa.me/201224576070?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9%20%D8%B4%D9%8A%D9%85%D8%A7%D8%A1%20%D8%A8%D9%84%D8%A7%D9%84%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%88%D8%A7%D8%B9%D9%8A%D8%AF%20%D8%A7%D9%84%D9%83%D8%B4%D9%81%20%D9%88%D8%A7%D9%84%D8%AD%D8%AC%D8%B2";
const CALL_URL = "tel:+201555699437";
const LOCATION_URL = "https://www.google.com/maps?q=Helwan,Cairo,Egypt";
const SHIMAA_BRAND_ID = "dr-shimaa-obgyn-profile-uuid-v100";

const DICTIONARY = {
    ar: {
        tap_to_entry: "عيادة الدكتورة شيماء بلال | DR_SHIMAA_CLINIC",
        close: "إغلاق",
        intro: "ترحب بكم عيادة الدكتورة شيماء بلال - أستاذ مساعد واستشاري أمراض النساء والتوليد بكلية الطب جامعة حلوان. للاستشارة الطبية أو حجز موعد الكشف والمتابعة، يرجى استخدام الأيقونات التفاعلية أدناه.",
        wa: "واتساب",
        call: "اتصال هاتف",
        loc: "موقع العيادة",
        services: "الخدمات الطبية",
        book: "حجز موعد",
        form_title: "طلب حـجز مـوعد طـبي",
        form_success: "✅ تم إرسال طلب الحجز بنجاح. سنتواصل معكِ لتأكيد الموعد.",
        form_name: "الاسم الكامل للمريضة",
        form_phone: "رقم الهاتف",
        form_type: "نوع الخدمة المطلوبة",
        form_date: "التاريخ المفضل للزيارة",
        form_notes: "ملاحظات طبية أو أعراض (اختياري)",
        form_submit: "تأكـيد الـحجز",
        form_loc_btn: "مشاركة موقعك (GPS للملاحة)",
        form_loc_loading: "جاري تحديد موقعك...",
        form_loc_success: "✅ تم التقاط الموقع الجغرافي",
        services_title: "خدمات عيادة الدكتورة شيماء بلال",
        services_return: "العودة",
        types: {
            pregnancy: "متابعة الحمل الآمن",
            gynecology: "كشف أمراض نساء واستشارات",
            sonar3d: "سونار ثلاثي ورباعي الأبعاد (3D/4D)",
            delivery: "عمليات ولادة (طبيعي/قيصري)",
            delayed: "علاج تأخر الإنجاب وتكيس المبايض"
        }
    },
    en: {
        tap_to_entry: "DR. SHIMAA BELAL OB/GYN CLINIC | CLINICAL_PORTAL",
        close: "CLOSE",
        intro: "Dr. Shimaa Belal Clinic welcomes you. Assistant Professor and Consultant of Obstetrics and Gynecology, Faculty of Medicine, Helwan University. For booking or medical consultation, please use the interactive nodes below.",
        wa: "WhatsApp",
        call: "Call Us",
        loc: "Location",
        services: "Services",
        book: "Book Appt",
        form_title: "Medical Appointment Request",
        form_success: "✅ Booking request sent successfully. We will call you to confirm.",
        form_name: "Patient's Full Name",
        form_phone: "Phone Number",
        form_type: "Requested Service",
        form_date: "Preferred Visit Date",
        form_notes: "Medical notes or symptoms (Optional)",
        form_submit: "Confirm Booking",
        form_loc_btn: "Share Location (GPS for routing)",
        form_loc_loading: "Capturing location...",
        form_loc_success: "✅ Location Captured",
        services_title: "Dr. Shimaa Belal Clinic Services",
        services_return: "RETURN",
        types: {
            pregnancy: "Safe Pregnancy Follow-up",
            gynecology: "Gynecological Checkup & Consult",
            sonar3d: "3D/4D Fetal Ultrasound",
            delivery: "Childbirth Delivery (Natural/C-Section)",
            delayed: "Infertility & PCOS Treatment"
        }
    }
};

const SHIMAA_SERVICES = [
    { 
        title_ar: "🤰 متابعة الحمل الآمن", 
        title_en: "🤰 Safe Pregnancy Follow-up", 
        desc_ar: "متابعة دورية دقيقة للحفاظ على صحة الأم ونمو الجنين وتفادي الحمل الحرج.", 
        desc_en: "Close monitoring to ensure maternal health and fetal development, avoiding high-risk pregnancy."
    },
    { 
        title_ar: "👶 السونار ثلاثي ورباعي الأبعاد (3D/4D)", 
        title_en: "👶 3D/4D Fetal Ultrasound", 
        desc_ar: "رؤية طفلك بوضوح تام والاطمئنان على تفاصيل نموه وحركته لحظة بلحظة بأحدث الأجهزة.", 
        desc_en: "Clearly view your baby, inspect development details, and monitor fetal movements using advanced imaging."
    },
    { 
        title_ar: "🏥 ولادة بدون ألم وقيصرية تجميلية", 
        title_en: "🏥 Painless & Aesthetic Delivery", 
        desc_ar: "رعاية كاملة في أرقى المستشفيات مع ولادة طبيعية بدون ألم وقيصري تجميلي دقيق بدون أثر.", 
        desc_en: "Comprehensive care in top hospitals featuring pain-free natural labor and scarless C-sections."
    },
    { 
        title_ar: "🧪 علاج تأخر الإنجاب وتكيس المبايض", 
        title_en: "🧪 Infertility & PCOS Treatment", 
        desc_ar: "تشخيص متكامل للزوجين وتنشيط الإباضة بأحدث البرتوكولات العلاجية الطبية العالمية.", 
        desc_en: "Full diagnostic workups for couples and ovulation induction using modern global protocols."
    }
];

export default function DrShimaaClinicalPortal() {
    const { language, setLanguage } = useLanguage();
    const t = DICTIONARY[language];
    const [isStarted, setIsStarted] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [activeModal, setActiveModal] = useState<null | 'book' | 'services'>(null);
    const [bookingSent, setBookingSent] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    
    const [workingHours, setWorkingHours] = useState({ start: "13:30", end: "20:30" });
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMounted(true);
        fetch('/api/dr-shimaa-settings')
            .then(res => res.json())
            .then(data => {
                if (data.workingHours) {
                    setWorkingHours(data.workingHours);
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        const generateTimeSlots = (start: string, end: string) => {
            const slots = [];
            const [startHr, startMin] = start.split(':').map(Number);
            const [endHr, endMin] = end.split(':').map(Number);
            
            let current = new Date();
            current.setHours(startHr, startMin, 0, 0);
            
            const endTime = new Date();
            endTime.setHours(endHr, endMin, 0, 0);
            
            while (current <= endTime) {
                slots.push(current.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
                current.setMinutes(current.getMinutes() + 15);
            }
            return slots;
        };
        
        setAvailableTimes(generateTimeSlots(workingHours.start, workingHours.end));
    }, [workingHours]);

    // Clinical Typing Engine
    useEffect(() => {
        if (!isStarted) {
            setDisplayedText("");
            if (typingTimerRef.current) clearInterval(typingTimerRef.current);
            return;
        }

        setDisplayedText("");
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
        }, 100);

        return () => {
            if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        };
    }, [isStarted, language, t.intro]);

    const startExperience = () => {
        setIsStarted(true);
        // Play node decrypt noise safely
        if (typeof neuralAudio !== 'undefined' && neuralAudio.playNodeDecrypt) {
            neuralAudio.playNodeDecrypt();
        }
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        }
    }

    const submitBookingRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBookingLoading(true);
        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get('userName'),
            phone: formData.get('userPhone'),
            notes: `[SHIMAA_CLINICAL_PORTAL] Service: ${formData.get('serviceType')} | Visit Date: ${formData.get('visitDate')} | Time: ${formData.get('visitTime')} | Notes: ${formData.get('userNotes')}`,
            brandProfileId: SHIMAA_BRAND_ID
        };
        try {
            await fetch('/api/leads', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(payload) 
            });
            setBookingSent(true);
            setTimeout(() => { setActiveModal(null); setBookingSent(false); }, 3500);
        } catch (error) { 
            console.error(error); 
        } finally { 
            setBookingLoading(false); 
        }
    }

    return (
        <div id="shimaa-sovereign-portal" className="relative w-full h-[100dvh] bg-black overflow-hidden font-sans select-none">
            <div className="absolute inset-0 z-0">
                <DrShimaaClinicalMesh />
            </div>

            {/* Ambient Clinical Relaxation Music */}
            <audio
                ref={audioRef}
                src="https://assets.mixkit.co/music/preview/mixkit-serene-view-1372.mp3"
                loop
                muted={isMuted}
            />

            <AnimatePresence mode="wait">
                {!isStarted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                        onClick={startExperience}
                        className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-md cursor-pointer group"
                    >
                        <div className="relative pointer-events-none p-4 max-w-lg w-full">
                            <div className="absolute -inset-10 bg-sky-500/10 blur-[80px] rounded-full group-hover:bg-sky-500/15 transition-all duration-1000" />
                            <motion.div
                                className="relative px-6 py-8 md:px-12 md:py-10 bg-black/85 border border-sky-500/30 rounded-[2.5rem] text-white flex flex-col items-center gap-5 shadow-[0_0_80px_rgba(14,165,233,0.15)] ring-1 ring-white/5 text-center"
                            >
                                <span className="text-xs md:text-sm font-black tracking-widest text-sky-400 border-b border-sky-500/20 pb-3 mb-2 w-full text-center">
                                    {mounted ? t.tap_to_entry : ""}
                                </span>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse delay-75" />
                                    <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse delay-150" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isStarted && (
                <div className="absolute inset-0 z-[100] flex flex-col pointer-events-none p-4 md:p-8 safe-area-inset">
                    {/* Top Action Header */}
                    <div className="w-full flex justify-between items-center z-[200] pointer-events-auto">
                        <button
                            onClick={() => setIsStarted(false)}
                            className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-red-400 hover:border-red-500/30 font-black tracking-widest text-[10px] uppercase transition-all shadow-lg group"
                        >
                            <X size={14} className="group-hover:rotate-90 transition-transform" />
                            <span>{t.close}</span>
                        </button>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/70 hover:text-sky-400 hover:border-sky-500/40 transition-all shadow-lg"
                            >
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            <button
                                onClick={() => mounted && setLanguage(language === 'ar' ? 'en' : 'ar')}
                                className="w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs text-white/80 font-black hover:text-sky-400 hover:border-sky-500/40 transition-all shadow-lg"
                            >
                                <span>{mounted ? (language === 'ar' ? 'EN' : 'AR') : <Globe size={14} />}</span>
                            </button>
                        </div>
                    </div>

                    {/* Bottom Console Elements */}
                    <div className="mt-auto flex flex-col md:flex-row gap-6 items-end justify-between w-full">
                        {/* Dynamic Decryption Welcome Message */}
                        <div className="max-w-lg pointer-events-auto self-start md:self-end bg-black/30 p-4 rounded-2xl backdrop-blur-sm border border-white/5 shadow-2xl">
                            <span className="text-[8px] text-sky-400 font-black tracking-[0.25em] uppercase mb-2 block">
                                SOVEREIGN_HEALTHCARE_TERMINAL
                            </span>
                            <p className="text-[12px] md:text-[14px] font-semibold text-white/95 leading-[1.8] tracking-normal" dir="auto">
                                {displayedText}
                            </p>
                        </div>

                        {/* Interactive Clinic Nodes */}
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-3 pointer-events-auto w-full md:w-auto justify-center md:justify-end border-t border-sky-500/10 md:border-none pt-4 md:pt-0">
                            {[
                                { icon: <MessageCircle size={20} />, url: WHATSAPP_URL, label: t.wa, color: 'text-green-400 border-green-500/30' },
                                { icon: <Phone size={20} />, url: CALL_URL, label: t.call, color: 'text-sky-400 border-sky-500/30' },
                                { icon: <MapPin size={20} />, url: LOCATION_URL, label: t.loc, color: 'text-amber-400 border-amber-500/30' },
                                { icon: <Clipboard size={20} />, action: () => setActiveModal('services'), label: t.services, color: 'text-white border-white/30' },
                                { icon: <Calendar size={20} />, action: () => setActiveModal('book'), label: t.book, color: 'text-sky-400 border-sky-500/70 shadow-[0_0_15px_rgba(14,165,233,0.25)]' }
                            ].map((node, i) => (
                                <motion.a
                                    key={i}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    href={node.url}
                                    onClick={node.action}
                                    target={node.url ? "_blank" : undefined}
                                    className="flex items-center gap-3 text-white group cursor-pointer no-underline"
                                >
                                    <span className="text-[8px] md:text-[9px] font-black tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-3 group-hover:translate-x-0 bg-black/85 px-3 py-1.5 rounded-lg border border-white/10 uppercase shadow-2xl hidden md:inline-block">
                                        {node.label}
                                    </span>
                                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-black/60 backdrop-blur-2xl border ${node.color} rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:bg-sky-500 group-hover:text-black shadow-2xl`}>
                                        {React.cloneElement(node.icon as React.ReactElement, { size: 16 })}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Agency Signature */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-end items-center gap-4 pointer-events-auto">
                        <div className="flex flex-col items-center md:items-end group">
                            <span className="text-[7px] text-sky-500/40 font-black tracking-[0.4em] uppercase mb-1">
                                POWERED_BY
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-black text-white tracking-[0.3em] uppercase transition-all group-hover:text-sky-400 group-hover:tracking-[0.45em] duration-700">
                                    EL NAFEER AGENCY
                                </span>
                                <a href="https://wa.me/201558408659" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-white transition-all duration-300 hover:scale-115">
                                    <MessageCircle size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Interactive Modals */}
            <AnimatePresence>
                {/* Services Modal */}
                {activeModal === 'services' && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 z-[20000] bg-black/98 backdrop-blur-3xl p-6 md:p-16 overflow-y-auto"
                    >
                        <button 
                            onClick={() => setActiveModal(null)} 
                            className="fixed top-6 right-6 md:top-10 md:right-10 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <h2 className="text-3xl font-black text-sky-400 tracking-widest uppercase text-center mb-12 md:mb-16">
                            {t.services_title}
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {SHIMAA_SERVICES.map((s, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ y: -5 }} 
                                    className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col gap-3 shadow-xl backdrop-blur-md"
                                >
                                    <span className="text-xl font-bold text-white tracking-wide">
                                        {language === 'ar' ? s.title_ar : s.title_en}
                                    </span>
                                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                        {language === 'ar' ? s.desc_ar : s.desc_en}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Booking Form Modal */}
                {activeModal === 'book' && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 z-[20000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <div className="w-full max-w-lg bg-black border border-sky-500/30 rounded-[2.5rem] p-8 md:p-10 relative shadow-[0_0_100px_rgba(14,165,233,0.15)] my-8">
                            <button 
                                onClick={() => setActiveModal(null)} 
                                className="absolute top-6 right-6 text-white/40 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-xl font-black text-sky-400 tracking-widest uppercase text-center mb-8">
                                {t.form_title}
                            </h3>
                            
                            {bookingSent ? (
                                <div className="text-white text-center py-16 flex flex-col items-center gap-4">
                                    <CheckCircle size={48} className="text-sky-400 animate-bounce" />
                                    <p className="font-black text-sm tracking-wide leading-relaxed px-4 text-center">
                                        {t.form_success}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={submitBookingRequest} className="flex flex-col gap-4" dir="auto">
                                    <input 
                                        name="userName" 
                                        required 
                                        placeholder={t.form_name} 
                                        className="w-full bg-white/5 border border-sky-500/20 p-4 rounded-xl text-white placeholder:text-white/30 focus:border-sky-400 outline-none text-sm transition-all" 
                                    />

                                    <input 
                                        name="userPhone" 
                                        required 
                                        placeholder={t.form_phone} 
                                        className="w-full bg-white/5 border border-sky-500/20 p-4 rounded-xl text-white placeholder:text-white/30 focus:border-sky-400 outline-none text-sm transition-all" 
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <select 
                                            name="serviceType" 
                                            required 
                                            defaultValue="" 
                                            className="w-full bg-white/5 border border-sky-500/20 p-4 rounded-xl text-white focus:border-sky-400 outline-none text-sm transition-all appearance-none"
                                        >
                                            <option value="" disabled className="bg-black text-white/50">{t.form_type}</option>
                                            <option value="PregnancyCare" className="bg-black">{t.types.pregnancy}</option>
                                            <option value="GynecologyCheck" className="bg-black">{t.types.gynecology}</option>
                                            <option value="Ultrasound3D4D" className="bg-black">{t.types.sonar3d}</option>
                                            <option value="Delivery" className="bg-black">{t.types.delivery}</option>
                                            <option value="Infertility" className="bg-black">{t.types.delayed}</option>
                                        </select>

                                        <div className="flex gap-2 w-full">
                                            <input 
                                                type="date" 
                                                name="visitDate" 
                                                required 
                                                className="w-1/2 bg-white/5 border border-sky-500/20 p-4 rounded-xl text-white focus:border-sky-400 outline-none text-sm transition-all" 
                                            />
                                            <select 
                                                name="visitTime" 
                                                required 
                                                defaultValue="" 
                                                className="w-1/2 bg-white/5 border border-sky-500/20 p-4 rounded-xl text-white focus:border-sky-400 outline-none text-sm transition-all appearance-none"
                                            >
                                                <option value="" disabled className="bg-black text-white/50">{language === 'ar' ? "الوقت المفضل" : "Time"}</option>
                                                {availableTimes.map((time, idx) => (
                                                    <option key={idx} value={time} className="bg-black">{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <textarea 
                                        name="userNotes" 
                                        rows={2} 
                                        placeholder={t.form_notes} 
                                        className="w-full bg-white/5 border border-sky-500/20 p-4 rounded-xl text-white placeholder:text-white/30 focus:border-sky-400 outline-none text-sm transition-all resize-none" 
                                    />



                                    <button 
                                        type="submit" 
                                        disabled={bookingLoading} 
                                        className="w-full bg-sky-500 p-5 rounded-xl text-black font-black text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] disabled:opacity-50 mt-2"
                                    >
                                        {bookingLoading ? '...' : t.form_submit}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
