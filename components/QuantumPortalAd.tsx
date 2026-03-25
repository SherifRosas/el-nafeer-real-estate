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
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'black',
            color: 'white',
            fontFamily: 'sans-serif',
            overflow: 'hidden',
            userSelect: 'none',
            touchAction: 'none',
            width: '100%',
            height: '100%',
            zIndex: 9999
        }}>
            
            <audio ref={audioRef} loop playsInline preload="auto">
                 <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
            </audio>

            {/* --- ARTWORK DEPTH LAYER (ULTRA RESILIENT) --- */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0
            }}>
                <img 
                    src={AD_IMAGE} 
                    alt="Lever Pioneer" 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                />
                {!isStarted && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        transition: 'opacity 1s'
                    }} />
                )}
            </div>

            {/* --- INTERACTIVE 3D ENGINE (CENTERED FOCUS) --- */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                opacity: isStarted ? 1 : 0,
                pointerEvents: isStarted ? 'auto' : 'none',
                transition: 'opacity 1s'
            }}>
                {isStarted && (
                    <Canvas 
                        dpr={[1, 1]} 
                        camera={{ position: [0, 0, 5], fov: 40 }}
                        gl={{ powerPreference: "high-performance", alpha: true }}
                    >
                        <ambientLight intensity={1.5} />
                        <pointLight position={[0, 0, 2]} intensity={2} color={CYAN} />
                        
                        <Suspense fallback={null}>
                            {/* Centered Focus Portal mapped to the Elevator Pod area */}
                            <group position={[0, 0.4, 0]}>
                                <PortalGate />
                                <ElevatorBeams />
                            </group>
                            
                            <Stars radius={100} depth={50} count={100} factor={4} saturation={0} fade speed={0.5} />
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
                <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}>
                    {/* MOBILE PRIMARY HUD (BOTTOM ACTION BAR) */}
                    <div style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        WebkitTransform: 'translateX(-50%)',
                        width: '100%',
                        maxWidth: '400px',
                        padding: '0 24px',
                        pointerEvents: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                            <a 
                                href={CALL_URL}
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(6,182,212,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                                }}
                            >
                                <Phone style={{ width: '28px', height: '28px', color: '#06b6d4' }} />
                            </a>

                            <a 
                                href={WHATSAPP_URL}
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(16,185,129,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                                }}
                            >
                                <MessageCircle style={{ width: '28px', height: '28px', color: '#10b981' }} />
                                
                            </a>

                            <a 
                                href={LOCATION_URL}
                                target="_blank"
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(197,160,89,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                                }}
                            >
                                <MapPin style={{ width: '28px', height: '28px', color: '#c5a059' }} />
                            </a>
                        </div>
                    </div>

                    {/* TOP BRANDING HUD */}
                    <div style={{ position: 'absolute', top: '40px', left: '40px', textAlign: 'left' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '8px', color: 'rgba(6,182,212,0.6)', textTransform: 'uppercase' }}>LEVER PIONEER</span>
                            <span style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-2px', color: 'white', textTransform: 'uppercase', fontStyle: 'italic', marginTop: '4px' }}>THE ASCENT</span>
                        </div>
                    </div>
                </div>
            )}

            {/* --- THE CINEMATIC GATE (ABSOLUTE STABILITY) --- */}
            {!isStarted && (
                <div 
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        padding: '40px'
                    }}
                >
                    <div style={{ maxWidth: '600px', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '60px', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', lineHeight: 1, margin: '0 0 40px 0' }}>
                            LEVER<br/>
                            <span style={{ color: '#06b6d4' }}>PIONEER</span>
                        </h1>

                        <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 60px 0' }}>
                            VERTICAL_EXPERIENCE_v121.1
                        </p>

                        <button 
                            onClick={initiateExperience}
                            style={{
                                position: 'relative',
                                padding: '30px 60px',
                                backgroundColor: 'white',
                                color: 'black',
                                borderRadius: '50px',
                                fontWeight: 900,
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '6px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 0 30px rgba(255,255,255,0.2)'
                            }}
                        >
                            BEGIN_ASCENT
                        </button>
                    </div>
                </div>
            )}

            {/* --- GLOBAL SIGNATURE --- */}
            <div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 100, opacity: 0.2, pointerEvents: 'none', textAlign: 'right' }}>
                <span style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '4px', color: '#06b6d4', display: 'block', marginBottom: '4px' }}>DESIGN_ENGINE_v121.1</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', letterSpacing: '2px', display: 'block' }}>Sherif Rosas</span>
            </div>

            {/* --- AUDIO TOGGLE --- */}
            {isStarted && (
                <div 
                    onClick={() => { if (audioRef.current) { audioRef.current.muted = !isMuted; setIsMuted(!isMuted); } }}
                    style={{ position: 'fixed', top: '40px', right: '40px', zIndex: 100, cursor: 'pointer' }}
                >
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: `2px solid ${isMuted ? 'rgba(239,68,68,0.5)' : 'rgba(6,182,212,0.5)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        {isMuted ? (
                             <X style={{ width: '20px', height: '20px', color: '#ef4444' }} />
                        ) : (
                             <Activity style={{ width: '20px', height: '20px', color: '#06b6d4' }} />
                        )}
                    </div>
                </div>
            )}
            
        </div>
    )
}

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
