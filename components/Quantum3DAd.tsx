'use client'

import React, { useState, useEffect, useRef, Suspense, useCallback, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Text, MeshDistortMaterial, MeshWobbleMaterial, Environment, ContactShadows, PerspectiveCamera, Stars, Billboard, useTexture, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MapPin } from 'lucide-react'

// --- QUANTUM 3D AD ENGINE V3.0.0 (THE DIGITAL ASCENT) ---

function ElevatorPod() {
    const podRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        const t = state.clock.elapsedTime
        if (podRef.current) {
            // Smooth vertical ascension
            podRef.current.position.y = (Math.sin(t * 0.4) * 1.5) + 2.0
            podRef.current.position.x = 0.52 // Snap to building edge
        }
    })

    return (
        <group ref={podRef}>
            {/* Main Glass Cabin */}
            <mesh>
                <boxGeometry args={[0.12, 0.35, 0.12]} />
                <meshStandardMaterial 
                    color="#ffffff" 
                    transparent 
                    opacity={0.3} 
                    metalness={1} 
                    roughness={0} 
                />
            </mesh>
            
            {/* Gold Frame accents */}
            <mesh position={[0, 0.18, 0]}>
                <boxGeometry args={[0.13, 0.02, 0.13]} />
                <meshStandardMaterial color="#c5a059" metalness={1} />
            </mesh>
            <mesh position={[0, -0.18, 0]}>
                <boxGeometry args={[0.13, 0.02, 0.13]} />
                <meshStandardMaterial color="#c5a059" metalness={1} />
            </mesh>

            {/* Subtle Cyan Interior Glow */}
            <pointLight distance={1.5} intensity={4} color="#06b6d4" />
        </group>
    )
}

function Building() {
    // Load Ad V2 Artwork as the "Backdrop Soul"
    const texture = useTexture('/campaigns/lever-pioneer/ad-v2-quantum.png')
    
    // Generate thousands of window points
    const points = useMemo(() => {
        const p = []
        for (let i = 0; i < 300; i++) {
            const y = Math.random() * 4.5
            const side = Math.floor(Math.random() * 4)
            const x = side < 2 ? (side === 0 ? 0.51 : -0.51) : (Math.random() - 0.5)
            const z = side >= 2 ? (side === 2 ? 0.51 : -0.51) : (Math.random() - 0.5)
            p.push(x, y, z)
        }
        return new Float32Array(p)
    }, [])

    const scanRef = useRef<THREE.Mesh>(null)
    const buildingRef = useRef<THREE.Mesh>(null)
    
    useFrame((state) => {
        const t = state.clock.elapsedTime
        if (scanRef.current) {
            scanRef.current.position.y = (Math.sin(t * 1.5) * 2.2) + 2.2
            scanRef.current.scale.x = scanRef.current.scale.y = 1 + Math.sin(t * 8) * 0.05
        }
    })

    return (
        <group scale={[0.8, 1.2, 0.8]}>
            {/* Transparent Collision/Refraction Mesh (Invisible but captures light) */}
            <mesh ref={buildingRef} position={[0, 1.5, 0]}>
                <boxGeometry args={[1, 4.5, 1]} />
                <meshStandardMaterial 
                    transparent
                    opacity={0}
                />
            </mesh>

            {/* Kinetic Elevator System */}
            <ElevatorPod />

            {/* Point Cloud Windows (Digital Overlay) */}
            <points position={[0, 0, 0]}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[points, 3]} />
                </bufferGeometry>
                <pointsMaterial size={0.006} color="#ffffff" transparent opacity={0.3} />
            </points>

            {/* Digital Aura (Optional Scan Line) */}
            <mesh ref={scanRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.65, 0.005, 16, 100]} />
                <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={10} transparent opacity={0.3} />
            </mesh>
        </group>
    )
}

function Hotspot({ position, label, icon: Icon, color, onClick }: any) {
    const [hovered, setHovered] = useState(false)
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group position={position}>
                {/* Hitbox (Invisible) */}
                <mesh 
                    onPointerOver={() => setHovered(true)} 
                    onPointerOut={() => setHovered(false)}
                    onClick={onClick}
                >
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshBasicMaterial transparent opacity={0} />
                </mesh>

                {/* Shimmering Core */}
                <mesh scale={hovered ? 1.5 : 1}>
                    <sphereGeometry args={[0.03, 16, 16]} />
                    <meshStandardMaterial 
                        color="#ffffff" 
                        emissive={color} 
                        emissiveIntensity={hovered ? 20 : 5} 
                    />
                </mesh>

                {/* Pulsing Halo */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.07, 0.003, 16, 50]} />
                    <meshStandardMaterial color={color} transparent opacity={0.3} />
                </mesh>
                {/* HTML HUD Label (Native Browser Fonts = No 404s) */}
                <Html 
                    position={[0, 0.4, 0]} 
                    center 
                    distanceFactor={6} 
                    occlude 
                    transform
                >
                    <div 
                        className={`px-4 py-2 transition-all duration-300 rounded-lg flex flex-col items-center border ${hovered ? 'scale-110' : 'scale-100'}`}
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.85)',
                            borderColor: hovered ? color : 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: hovered ? `0 0 20px ${color}33` : 'none',
                        }}
                    >
                        {/* Cyan accent bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 rounded-l-lg" />
                        
                        <span 
                            className="text-[14px] font-black uppercase tracking-[0.2em] whitespace-nowrap"
                            style={{ color: hovered ? 'white' : 'rgba(255,255,255,0.7)', fontFamily: 'sans-serif' }}
                        >
                            {label}
                        </span>
                    </div>
                </Html>

                {/* Always-visible Mini Label (Removed redundant) */}
            </group>
        </Float>
    )
}

export default function Quantum3DAd() {
    const [isMounted, setIsMounted] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const bgMusicRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const startExperience = () => {
        setIsStarted(true);
        if (bgMusicRef.current) {
            bgMusicRef.current.muted = false;
            bgMusicRef.current.volume = 0.8;
            bgMusicRef.current.play().catch(e => console.warn("Audio Context Wait:", e));
        }
    }

    const handleAction = (type: string, url: string) => {
        if (typeof window !== 'undefined') {
            window.navigator?.vibrate?.(80);
            window.open(url, '_blank');
        }
    }

    if (!isMounted) return <div className="fixed inset-0 bg-black" />

    return (
        <div className="fixed inset-0 z-[999999] bg-black overflow-hidden select-none font-sans">
            <audio ref={bgMusicRef} loop playsInline preload="auto" muted>
                <source src="https://assets.mixkit.co/music/preview/mixkit-epic-hero-journey-trailer-104.mp3" type="audio/mpeg" />
            </audio>

            {/* --- PYRAMID SUNSET MATTE BACKDROP (Z-0) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none transition-transform duration-[4000ms] ease-out">
                <img 
                    src="/campaigns/lever-pioneer/ad-v2-quantum.png" 
                    className="w-full h-full object-cover opacity-100 brightness-[0.7] contrast-[1.1] scale-100" 
                    alt="Backdrop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/80" />
            </div>

            {/* --- CINEMATIC ENTRY OVERLAY --- */}
            <AnimatePresence>
                {!isStarted && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-black text-[#c5a059] italic tracking-tighter mb-2 underline underline-offset-8 decoration-cyan-500/50">QUORUM 3D</h2>
                            <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase">Phase 4.0 | Digital Ascent</p>
                        </motion.div>

                        <div 
                            onClick={startExperience}
                            className="group relative w-32 h-32 rounded-full border-2 border-red-500/50 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-90"
                        >
                            <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-[ping_2.5s_infinite] opacity-30" />
                            <div className="flex flex-col items-center">
                                <Phone className="w-8 h-8 text-red-500 animate-pulse mb-2" />
                                <span className="text-[10px] text-white/60 tracking-widest uppercase">ENTER</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                body { background: black !important; overflow: hidden !important; }
            `}</style>

            {/* --- 3D RENDER ENGINE (Z-10) --- */}
            {isStarted && (
                <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
                <Canvas 
                    shadows={false} 
                    dpr={[1, 2]}
                    gl={{ alpha: true, antialias: true }}
                    onCreated={({ gl }) => {
                        gl.setClearColor(0x000000, 0);
                    }}
                >
                    <PerspectiveCamera makeDefault position={[0, 2, 4]} fov={50} />
                    <ambientLight intensity={1} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#c5a059" />
                    <pointLight position={[-10, 5, -10]} intensity={1} color="#06b6d4" />
                    
                    <Suspense fallback={null}>
                        <group position={[1.4, 0, -1.2]} rotation={[0, -Math.PI / 12, 0]}>
                            <Building />
                            
                            {/* 3D Hotspots */}
                            <Hotspot 
                                position={[-0.7, 2.5, 0.6]} 
                                label="WhatsApp" 
                                color="#22c55e" 
                                onClick={() => handleAction('WA_3D', 'https://wa.me/201070615372')} 
                            />
                            <Hotspot 
                                position={[0.7, 1.8, 0.6]} 
                                label="Call Us" 
                                color="#06b6d4" 
                                onClick={() => handleAction('CALL_3D', 'tel:+201070615372')} 
                            />
                            <Hotspot 
                                position={[0, 0.8, 0.8]} 
                                label="Location" 
                                color="#c5a059" 
                                onClick={() => handleAction('MAP_3D', 'https://maps.app.goo.gl/r6vGf')} 
                            />
                        </group>
                        
                        <Stars radius={50} depth={50} count={400} factor={1.5} saturation={0} fade speed={0.2} />
                    </Suspense>

                    <OrbitControls 
                        enablePan={false} 
                        enableZoom={false} 
                        minPolarAngle={Math.PI / 3} 
                        maxPolarAngle={Math.PI / 1.5} 
                        autoRotate 
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
                </div>
            )}

            {/* --- TOP HUD --- */}
            {isStarted && (
                <div className="absolute top-[8vh] left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
                    <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 0.8 }} 
                        className="text-[12px] text-cyan-400 tracking-[0.6em] uppercase font-black"
                    >
                        &lt; INTERACTIVE PHASE &gt;
                    </motion.p>
                </div>
            )}

            {/* --- 3D RENDER ENGINE FOOTER --- */}
            {isStarted && (
                <div className="absolute bottom-[20vh] left-0 w-full flex flex-col items-center pointer-events-none">
                    <motion.div 
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-[8px] text-white/20 tracking-[0.6em] uppercase italic"
                    >
                        Rotate to Explore
                    </motion.div>
                </div>
            )}

            {/* --- MUTE RING (SYNC) --- */}
            {isStarted && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 left-6 z-50">
                    <div 
                        onClick={() => { if (bgMusicRef.current) { const n = !isMuted; bgMusicRef.current.muted = n; setIsMuted(n); } }}
                        className={`relative w-14 h-14 rounded-full bg-black/80 border-2 flex items-center justify-center cursor-pointer transition-all duration-500 ${isMuted ? 'border-red-500 animate-pulse' : 'border-[#c5a059] shadow-[0_0_20px_#c5a05933]'} active:scale-90`}
                    >
                        {isMuted ? (
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                        ) : (
                            <svg className="w-8 h-8 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        )}
                    </div>
                </motion.div>
            )}

            {/* --- IMPERIAL DESIGNER SIGNATURE --- */}
            {isStarted && (
                <div className="fixed right-6 bottom-6 z-50 scale-110 sm:scale-125 origin-bottom-right">
                    <div className="bg-black/90 p-5 rounded-2xl border border-[#c5a059]/40 flex items-center gap-5 text-right shadow-[0_0_30px_rgba(197,160,89,0.15)]">
                        <div>
                            <div className="text-[8px] text-cyan-400 tracking-[4px] uppercase italic font-black opacity-80">Director</div>
                            <div className="font-serif italic text-xl text-[#c5a059] font-bold leading-tight">Sherif Rosas</div>
                            <div className="text-[10px] text-white/50 mt-1 font-mono tracking-widest">EG01065661882</div>
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-[#c5a059]/50 flex items-center justify-center bg-[#c5a059]/5 shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                            <Phone className="w-5 h-5 text-[#c5a059] animate-pulse" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
