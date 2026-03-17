'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
    Phone, MessageCircle, MapPin, Zap, Play, 
    ShieldCheck, Cpu, Radio, Globe, Crosshair, 
    Terminal, Activity, Lock, Layers
} from 'lucide-react'

// --- ULTIMA CINEMATIC PORTAL v10.0 ---

export default function AdV2UltimaUpdate() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    
    // Timeline States
    const [phase, setPhase] = useState<'idle' | 'descent' | 'stabilizing' | 'active'>('idle')
    const [step, setStep] = useState(0) // 0-4 cinematic sub-steps
    const [isNarrating, setIsNarrating] = useState(false)
    
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const script = "الآن من قلب مصر.. نطلق المرحلة القصوى. من الجيزة، حدائق الأهرام.. شركة ليفر الرائدة للمصاعد تبدأ التحليق الكامل. سيطر على تجربتك من خلال أيقونات التواصل، وارتبط بمنصة النفير العالمية عبر صقر النفير الرقمي. النظام جاهز للتحليق."

    const startUltimaSequence = () => {
        setPhase('descent')
        
        // --- Phase 0: The Satellite Descent (0-4s) ---
        setTimeout(() => {
            setPhase('stabilizing')
        }, 4000)

        // --- Phase 1: Landing & Initialization (4-8s) ---
        setTimeout(() => {
            setPhase('active')
            setStep(1)
            triggerVoiceover()
        }, 8000)

        // --- Phase 2: The Eagle Quest (8-18s) ---
        setTimeout(() => setStep(2), 12000)
        
        // --- Phase 3: Signal Lock (18-25s) ---
        setTimeout(() => setStep(3), 22000)
        
        // --- Phase 4: Extreme platform deployment (25s+) ---
        setTimeout(() => setStep(4), 28000)
    }

    const triggerVoiceover = () => {
        if (synth) {
            synth.cancel()
            const utterance = new SpeechSynthesisUtterance(script)
            utterance.lang = 'ar-EG'
            utterance.rate = 0.8
            utterance.pitch = 0.95
            synth.speak(utterance)
            setIsNarrating(true)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-0 m-0 overflow-hidden relative cursor-crosshair font-sans">
            
            {/* --- 1. THE SPACE DEPTH LAYER (Satellite Zoom) --- */}
            <AnimatePresence>
                {phase === 'descent' && (
                    <motion.div 
                        initial={{ scale: 50, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 4, ease: "circIn" }}
                        className="absolute inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.4]" />
                        <div className="relative z-10 flex flex-col items-center gap-6">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-96 h-96 border-4 border-sahara-gold/20 rounded-full flex items-center justify-center"
                            >
                                <Globe className="w-24 h-24 text-sahara-gold animate-pulse" />
                            </motion.div>
                            <h2 className="text-white font-black text-4xl tracking-[1em] robotic-digits">DESCENDING_GIZA_NODE</h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 2. THE STABILIZATION GRID --- */}
            <AnimatePresence>
                {phase === 'stabilizing' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[150] bg-black flex flex-col items-center justify-center"
                    >
                        <div className="w-full max-w-4xl space-y-8 px-12">
                            <div className="flex justify-between items-center text-sahara-gold font-mono text-xs">
                                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>SIGNAL_STABILIZING...</motion.span>
                                <span>PROTOCOL_V10.ULTIMA</span>
                            </div>
                            <div className="h-[2px] w-full bg-zinc-800 relative overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 4, ease: "linear" }}
                                    className="h-full bg-sahara-gold shadow-[0_0_20px_rgba(212,175,55,1)]"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-8 opacity-40">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-32 border border-sahara-gold/30 rounded-xl flex items-center justify-center">
                                        <Activity className="w-8 h-8 text-sahara-gold animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 3. MAIN CINEMATIC CANVAS (Active Phase) --- */}
            <div className={`relative w-full h-screen transition-opacity duration-1000 ${phase === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                
                {/* Background Layer: The Hyper-Giza */}
                <div className="absolute inset-0 z-0">
                    <motion.div 
                        animate={phase === 'active' ? { scale: [1.1, 1], rotate: [0, 1, 0, -1, 0] } : {}}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.2] saturate-150"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                </div>

                {/* --- THE HOLOGRAPHIC HUD (Layered Over Ad) --- */}
                <div className="absolute inset-0 z-50 pointer-events-none">
                    {/* Top Ticker: Real-time Simulation Feed */}
                    <div className="absolute top-0 w-full h-20 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center px-12 overflow-hidden">
                        <motion.div 
                            animate={{ x: [1000, -2000] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="flex gap-20 whitespace-nowrap text-[10px] items-center"
                        >
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="w-2 h-2 rounded-full bg-sahara-gold animate-pulse" />
                                    <span className="text-sahara-gold font-black uppercase tracking-[0.3em]">
                                        ELEVATOR_SPEED: 4.5M/S | GPS: 29.9792° N, 31.1342° E | BRAND_POWER: 100% | BROADCAST_ACTIVE_H_AHRAM
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Left Panel: Diagnostic Feed */}
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-6 opacity-60">
                        <div className="p-4 bg-zinc-900/50 border border-white/10 rounded-2xl backdrop-blur-xl">
                            <Terminal className="w-5 h-5 text-sahara-gold mb-4" />
                            <div className="space-y-2 font-mono text-[8px] text-gray-400">
                                <p>_INITIALIZING_EAGLE...</p>
                                <p className="text-green-500">_SYNC_SUCCESSFUL</p>
                                <p>_VOICE_STREAM_ACTIVE</p>
                                <p>_GEO_LOCK: AHRAM_GATE_4</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Crosshair className="w-6 h-6 text-sahara-gold/40 animate-spin-slow" />
                            <div className="w-[1px] h-20 bg-gradient-to-b from-sahara-gold/40 to-transparent" />
                        </div>
                    </div>

                    {/* Right Panel: Performance Nodes */}
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-8 items-end">
                        <div className="text-right space-y-4">
                            <div className="inline-block px-4 py-2 bg-sahara-gold/10 border border-sahara-gold/30 rounded-lg">
                                <span className="text-sahara-gold font-black robotic-digits text-xl">v10.0</span>
                            </div>
                            <div className="flex gap-4">
                                <Layers className="w-5 h-5 text-gray-700" />
                                <Lock className="w-5 h-5 text-gray-700" />
                                <ShieldCheck className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CENTRAL AD PERSPECTIVE CANVAS --- */}
                <div className="absolute inset-0 flex items-center justify-center p-20 z-10">
                    <motion.div 
                        animate={{ 
                            rotateX: [0, 2, -2, 0],
                            rotateY: [0, -2, 2, 0],
                            z: [0, 50, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity }}
                        className="relative w-full max-w-[800px] aspect-square rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] perspective-1000"
                    >
                        <NextImage 
                            src="/campaigns/lever-pioneer/ad-v2.png" 
                            alt="Lever Pioneer Ad v2" 
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* --- DYNAMIC ULTIMA LAYER: THE FALCON QUEST --- */}
                        <AnimatePresence>
                            {(step >= 1) && (
                                <motion.div 
                                    initial={{ top: "-50%", left: "50%", scale: 5, rotate: 90, opacity: 0 }}
                                    animate={
                                        step === 1 ? { top: "15%", left: "15%", scale: 1.2, rotate: 0, opacity: 1 } :
                                        step === 2 ? { top: "10%", left: "70%", scale: 1.4, rotate: 5, opacity: 1 } :
                                        step === 3 ? { top: "45%", left: "15%", scale: 1.3, rotate: -5, opacity: 1 } :
                                        { top: "72%", left: "70%", scale: 1.8, rotate: 0, opacity: 1 }
                                    }
                                    transition={{ duration: 4, type: "spring", stiffness: 20 }}
                                    className="absolute z-[100] pointer-events-none drop-shadow-[0_0_50px_rgba(212,175,55,1)]"
                                >
                                    <div className="relative w-40 h-40 group">
                                        <NextImage 
                                            src="/logos/logo-en.png" 
                                            alt="Falcon Ultima" 
                                            fill
                                            className="object-contain animate-float"
                                        />
                                        <motion.div 
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute -inset-10 border-2 border-sahara-gold rounded-full"
                                        />
                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                            <span className="text-[9px] text-sahara-gold font-black uppercase tracking-[0.5em]">{isArabic ? "صقر النفير" : "EAGLE_NAFEER"}</span>
                                            <span className="text-[6px] text-white/40 tracking-widest robotic-digits mt-1">STATUS: BROADCASTING</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* --- INTERACTIVE TACTICAL HOTSPOTS --- */}
                        
                        {/* WhatsApp Portal */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={step >= 2 ? { opacity: 1 } : {}}
                            className="absolute top-[8%] left-[7%] w-[35%] h-[35%] z-[60]"
                        >
                            <a href="https://wa.me/201111171368" target="_blank" className="block w-full h-full relative cursor-pointer group">
                                <motion.div animate={{ scale: [1, 2, 1], opacity: [0.1, 0.4, 0.1] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute inset-0 bg-green-500 rounded-full blur-2xl" />
                                <div className="absolute inset-4 rounded-full border-2 border-green-500/50 group-hover:border-green-400 transition-colors" />
                                <MessageCircle className="absolute top-[35%] left-[35%] w-8 h-8 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                            </a>
                        </motion.div>

                        {/* Location Command */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={step >= 2 ? { opacity: 1 } : {}}
                            className="absolute top-[8%] right-[7%] w-[35%] h-[35%] z-[60]"
                        >
                            <a href="https://www.google.com/maps?q=29.9656242,31.0922895" target="_blank" className="block w-full h-full relative cursor-pointer group">
                                <motion.div animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute inset-0 bg-sahara-gold rounded-full blur-2xl" />
                                <div className="absolute inset-4 rounded-full border-2 border-sahara-gold/50 group-hover:border-sahara-gold transition-colors" />
                                <MapPin className="absolute top-[30%] right-[30%] w-8 h-8 text-sahara-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                            </a>
                        </motion.div>

                        {/* --- THE ULTIMA NODE: EL NAFEER GLOBAL --- */}
                        <motion.div 
                            initial={{ opacity: 0, x: 200, skewX: 20 }}
                            animate={step >= 4 ? { opacity: 1, x: 0, skewX: 0 } : {}}
                            className="absolute bottom-[4%] right-[4%] w-[55%] h-[24%] z-[150]"
                        >
                            <a 
                                href="tel:01065661882" 
                                className="block w-full h-full bg-gradient-to-br from-zinc-900 to-black/80 backdrop-blur-3xl border-2 border-sahara-gold/60 rounded-[3.5rem] p-8 hover:bg-sahara-gold/10 transition-all cursor-pointer group shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden"
                            >
                                <div className="flex items-center gap-8 h-full relative z-20">
                                    <div className="p-5 bg-sahara-gold rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.7)] group-hover:scale-110 transition-transform">
                                        <Phone className="w-8 h-8 text-black" />
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[14px] text-sahara-gold font-black uppercase tracking-[0.5em] block">{isArabic ? "نفير العالمية" : "EL_NAFEER_GLOBAL"}</span>
                                        <span className="text-white font-black text-3xl tracking-tighter robotic-digits">01065661882</span>
                                    </div>
                                </div>
                                
                                {/* Energy Pulse Line */}
                                <motion.div 
                                    animate={{ left: ["-100%", "300%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-0 h-full w-40 bg-gradient-to-r from-transparent via-sahara-gold/20 to-transparent skew-x-12 z-0"
                                />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Cinematic Captains Overlay */}
                <div className="absolute bottom-12 w-full z-50 flex justify-center pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={phase === 'active' ? { opacity: 1, y: 0 } : {}}
                        className="bg-black/80 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-full flex items-center gap-8 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
                    >
                        <Radio className="w-5 h-5 text-red-600 animate-pulse" />
                        <span className="text-[12px] text-white font-black tracking-[0.8em] uppercase">
                            {step < 2 ? (isArabic ? "المحاكاة مفعلة: صقر النفير في سماء الجيزة" : "SIMULATION_INIT: EAGLE_OVER_GIZA") :
                             step < 4 ? (isArabic ? "تأمين الاتصال: ليفر الرائدة للمصاعد" : "COMMS_SECURED: LEVER_PIONEER_HQ") :
                             (isArabic ? "المرحلة القصوى: النفير العالمية - النشر الكامل" : "ULTIMA_PHASE: NAFEER_GLOBAL_SYNC")}
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* --- ULTIMA START TRIGGER (Chrome Compliance) --- */}
            {phase === 'idle' && (
                <div className="absolute inset-0 z-[300] bg-black flex flex-col items-center justify-center p-12">
                    <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        onClick={startUltimaSequence}
                        className="group relative cursor-pointer"
                    >
                        <div className="w-48 h-48 bg-sahara-gold rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
                            <Play className="w-16 h-16 text-black fill-current ml-2" />
                        </div>
                        <motion.div 
                            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 border-4 border-sahara-gold rounded-full"
                        />
                    </motion.div>
                    
                    <div className="mt-16 text-center space-y-4">
                        <h1 className="text-white font-black text-4xl tracking-tighter uppercase">{isArabic ? "بوابة النفير: المرحلة القصوى" : "EL NAFEER PORTAL: ULTIMA"}</h1>
                        <p className="text-sahara-gold font-mono text-xs tracking-widest uppercase animate-pulse">{isArabic ? "اضغط لبدء بروتوكول الهبوط والتحليق الكامل" : "CLICK TO INITIATE DESCENT & GLOBAL SYNC"}</p>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @font-face {
                    font-family: 'RoboticDigits';
                    src: url('https://fonts.cdnfonts.com/css/digital-numbers');
                }
                .robotic-digits {
                    font-family: 'Courier New', Courier, monospace;
                    letter-spacing: 0.2rem;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-40px) rotate(2deg); }
                }
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
