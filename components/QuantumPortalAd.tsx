'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls, Float, Html, PerspectiveCamera, Backdrop } from '@react-three/drei'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Phone, MessageCircle, MapPin, X, ChevronRight, Activity, ShieldCheck, Zap } from 'lucide-react'
import NextImage from 'next/image'
import * as THREE from 'three'

// --- GLOBAL CROSS-DEVICE CONFIGURATION (PORTAL v120.2) ---
const GOLD = "#c5a059";
const CYAN = "#06b6d4";
const AD_IMAGE = "/campaigns/lever-pioneer/ad-v2-quantum.png";

const WHATSAPP_URL = "https://wa.me/201111171368";
const CALL_URL = "tel:+201070615372";
const LOCATION_URL = "https://maps.app.goo.gl/r6vGf";

// --- CINEMATIC HUD COMPONENT (SIMULATED LOTTIE) ---
function LottieHUDNode({ delay = 0 }: { delay?: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1],
                rotate: [0, 90, 180, 270, 360]
            }}
            transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear",
                delay 
            }}
            className="w-40 h-40 border border-cyan-500/10 rounded-full flex items-center justify-center relative"
        >
            <div className="absolute inset-0 border-t-2 border-cyan-500/20 rounded-full animate-spin" />
            <div className="w-4 h-4 bg-cyan-500/20 rounded-full" />
        </motion.div>
    )
}

// --- INTERACTIVE ELEVATOR BEAMS ---
function ElevatorBeams() {
    const beamsRef = useRef<THREE.Group>(null)
    
    useFrame((state) => {
        if (beamsRef.current) {
            beamsRef.current.rotation.y += 0.003
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
            beamsRef.current.scale.set(scale, 1, scale)
        }
    })

    return (
        <group ref={beamsRef}>
            {[...Array(12)].map((_, i) => (
                <mesh key={i} rotation={[0, (i * Math.PI * 2) / 12, 0]}>
                    <planeGeometry args={[0.05, 10]} />
                    <meshBasicMaterial 
                        color={CYAN} 
                        transparent 
                        opacity={0.15} 
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </group>
    )
}

// --- OPTICAL 3D PORTAL GATE ---
function PortalGate() {
    const meshRef = useRef<THREE.Mesh>(null)
    
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.002
            meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.02)
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <torusGeometry args={[1.5, 0.01, 16, 100]} />
                <meshBasicMaterial color={CYAN} transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1.5, 1.5, 0.01, 64]} />
                <meshBasicMaterial color={CYAN} transparent opacity={0.03} />
            </mesh>
        </Float>
    )
}

// --- CINEMATIC SPEECH HUD (ARABIC TYPEWRITER) ---
function SpeechHUD({ isStarted }: { isStarted: boolean }) {
    const text = "الان من قلب مصر من الجيزة - حدائق الأهرام، تدشن شركة ليفر الرائدة للمصاعد مقرها الجديد. للتواصل اضغط على الأيقونات (واتساب - اتصال - الموقع). للتواصل مع منصة النفير العالمية للاعلان اضغط على صقر النفير.";
    
    return (
        <AnimatePresence>
            {isStarted && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-[18vh] left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[600px] text-center bg-black/40 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.1)]"
                >
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-lg md:text-xl font-bold text-white leading-relaxed dir-rtl text-right font-sans"
                        style={{ direction: 'rtl' }}
                    >
                        {text.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 + i * 0.03 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.p>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-600/80 rounded-full">
                        <span className="text-[10px] font-black tracking-[4px] text-white uppercase italic">AI_NARRATION_ACTIVE</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function QuantumPortalAd() {
    const [isMounted, setIsMounted] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const audioRef = useRef<HTMLAudioElement>(null)

    // Ensure hydration safety by waiting for mount
    useEffect(() => {
        setIsMounted(true)
    }, [])

    const initiateExperience = () => {
        setIsStarted(true)
        if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.volume = 0.6;
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => setIsMuted(false)).catch(e => console.warn("Audio Play Wait:", e));
            }
        }
    }

    /**
     * STABILITY LAYER (SSR-SAFE)
     * To avoid hydration mismatch and ensure mobile safety, we render a static
     * pure-CSS fallback on the server, then swap for the interaction engine.
     */
    if (!isMounted) {
        return (
            <div className="fixed inset-0 bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-cyan-500/20 rounded-full animate-spin border-t-cyan-500 mx-auto opacity-40" />
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none touch-none" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
            
            <audio ref={audioRef} loop playsInline preload="auto">
                 <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
            </audio>

            {/* --- ARTWORK DEPTH LAYER (RESTORED CLARITY) --- */}
            <div className="absolute inset-0 z-0 opacity-100">
                <img 
                    src={AD_IMAGE} 
                    alt="Lever Pioneer" 
                    className="w-full h-full object-cover"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
                <div className={`absolute inset-0 bg-black/10 transition-opacity duration-1000 ${isStarted ? 'opacity-30' : 'opacity-0'}`} />
            </div>

            {/* --- INTERACTIVE 3D ENGINE (CENTERED FOCUS) --- */}
            <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isStarted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {isStarted && (
                    <Canvas 
                        dpr={[1, 1]} 
                        camera={{ position: [0, 0, 5], fov: 40 }}
                        gl={{ powerPreference: "high-performance", alpha: true }}
                    >
                        <ambientLight intensity={1.2} />
                        <pointLight position={[0, 0, 2]} intensity={2} color={CYAN} />
                        
                        <Suspense fallback={null}>
                            {/* Centered Focus Portal mapped to the Elevator Pod area */}
                            <group position={[0, 0.4, 0]}>
                                <PortalGate />
                                <ElevatorBeams />
                            </group>
                            
                            <Stars radius={100} depth={50} count={150} factor={4} saturation={0} fade speed={0.5} />
                        </Suspense>

                        <OrbitControls 
                            enableZoom={false} 
                            enablePan={false}
                            autoRotate 
                            autoRotateSpeed={0.3}
                        />
                    </Canvas>
                )}
            </div>

            {/* --- SENSORY HUD LAYERS --- */}
            <SpeechHUD isStarted={isStarted} />

            {/* --- CINEMATIC HUD (LOTTIE-LIKE) --- */}
            {isStarted && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {/* Interactive Nodes HUD Overlay */}
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:block">
                        <LottieHUDNode />
                        <div className="mt-8 space-y-6">
                            <div className="flex items-center gap-4 text-cyan-400">
                                <ShieldCheck className="w-5 h-5" />
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase">SYSTEMS_STABLE</span>
                            </div>
                            <div className="flex items-center gap-4 text-emerald-400">
                                <Zap className="w-5 h-5 animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase">NEURAL_PULSE_ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE PRIMARY HUD (BOTTOM ACTION BAR) */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 pointer-events-auto">
                        <div className="flex justify-between items-center gap-6">
                            <motion.a 
                                href={CALL_URL}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-3xl border border-cyan-500/30 flex items-center justify-center shadow-2xl group"
                            >
                                <Phone className="w-7 h-7 text-cyan-400 transition-colors group-hover:text-white" />
                            </motion.a>

                            <motion.a 
                                href={WHATSAPP_URL}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-3xl border border-emerald-500/30 flex items-center justify-center shadow-2xl group"
                            >
                                <MessageCircle className="w-7 h-7 text-emerald-400 transition-colors group-hover:text-white" />
                            </motion.a>

                            <motion.a 
                                href={LOCATION_URL}
                                target="_blank"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-3xl border border-gold-500/30 flex items-center justify-center shadow-2xl group"
                            >
                                <MapPin className="w-7 h-7 text-[#c5a059] transition-colors group-hover:text-white" />
                            </motion.a>
                        </div>
                    </div>

                    {/* TOP BRANDING HUD */}
                    <div className="absolute top-10 left-10 text-left">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black tracking-[0.8em] text-cyan-500/60 uppercase italiic">LEVER PIONEER</span>
                            <span className="text-3xl font-black tracking-tighter text-white uppercase italic mt-1">THE ASCENT</span>
                        </div>
                    </div>
                </div>
            )}

            {/* --- THE CINEMATIC GATE (LEGACY FRIENDLY) --- */}
            {!isStarted && (
                <div 
                    className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-10 transition-opacity duration-1000"
                    style={{ opacity: isStarted ? 0 : 1 }}
                >
                    <div className="max-w-xl text-center">
                        <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-black/40 mb-12">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-black tracking-[0.5em] text-gray-500 uppercase">PROTOCOL_READY</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none mb-10">
                            LEVER<br/>
                            <span className="text-cyan-500">PIONEER</span>
                        </h1>

                        <p className="text-sm md:text-md text-gray-500 font-bold uppercase tracking-[0.3em] leading-relaxed mb-16 max-w-sm mx-auto opacity-60">
                            ENTER THE DEFINTIVE VERTICAL EXPERIENCE. OPTIMIZED FOR ALL TERMINALS.
                        </p>

                        <button 
                            onClick={initiateExperience}
                            className="relative px-20 py-8 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.8em] overflow-hidden group shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                        >
                            <span className="relative z-10">BEGIN_ASCENT</span>
                        </button>
                    </div>
                </div>
            )}

            {/* --- GLOBAL SIGNATURE --- */}
            <div className="fixed bottom-10 right-10 z-[100] opacity-20 pointer-events-none text-right">
                <span className="text-[8px] font-black tracking-[4px] text-cyan-500 mb-1 block">DESIGN_ENGINE_v7.0</span>
                <span className="text-xl font-bold italic text-white tracking-widest font-serif block">Sherif Rosas</span>
            </div>

            {/* --- AUDIO TOGGLE --- */}
            {isStarted && (
                <div 
                    onClick={() => { if (audioRef.current) { audioRef.current.muted = !isMuted; setIsMuted(!isMuted); } }}
                    className="fixed top-10 right-10 z-[100] cursor-pointer group"
                >
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${isMuted ? 'border-red-500/50' : 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'} active:scale-90`}>
                        {isMuted ? (
                             <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                        ) : (
                             <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        )}
                    </div>
                </div>
            )}
            
        </div>
    )
}
