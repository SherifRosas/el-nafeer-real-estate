'use client'

import React, { useState, useEffect, useRef, Suspense, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls, Float, Html, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Facebook, X, Info, Layers } from 'lucide-react'
import NextImage from 'next/image'

// --- HIGH-FIDELITY CONFIGURATION (QUANTUM-9 STANDARD) ---
const EMERALD = "#10b981";
const GOLD = "#c5a059";
const CYAN = "#06b6d4";

const AD_IMAGE = "/campaigns/al-nafeer/ad-v1.png";
const FB_URL = "https://www.facebook.com/profile.php?id=100076259227704";
const WHATSAPP_URL = "https://wa.me/201065661882"; // Admin Node

// --- INTERACTIVE VILLA NODE ---
function VillaNode() {
    const meshRef = useRef<THREE.Group>(null)
    const floatRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005
        }
    })

    return (
        <group ref={floatRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <group ref={meshRef}>
                    {/* Futuristic Glass Villa Core */}
                    <mesh>
                        <boxGeometry args={[1, 0.6, 1]} />
                        <meshPhysicalMaterial 
                            color={EMERALD} 
                            transparent 
                            opacity={0.2} 
                            roughness={0} 
                            transmission={0.9} 
                            thickness={1}
                        />
                    </mesh>
                    <mesh position={[0, -0.35, 0]}>
                        <boxGeometry args={[1.2, 0.1, 1.2]} />
                        <meshStandardMaterial color="#111" roughness={0.5} />
                    </mesh>
                    {/* Glowing Framework */}
                    <mesh>
                        <boxGeometry args={[1.02, 0.62, 1.02]} />
                        <meshBasicMaterial color={EMERALD} wireframe transparent opacity={0.1} />
                    </mesh>
                </group>
            </Float>
            
            {/* Holographic Pulse */}
            <pointLight position={[0, 0, 0]} color={EMERALD} intensity={1} distance={5} />
        </group>
    )
}

// --- INTERACTIVE HOTSPOT ---
function Hotspot({ position, label, sublabel, icon: Icon, onClick, color = EMERALD }: any) {
    const [hovered, setHovered] = useState(false)
    
    return (
        <group position={position}>
            <Html center distanceFactor={10} zIndexRange={[10, 0]}>
                <div 
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={onClick}
                >
                    {/* Pulsing Core */}
                    <div className="w-4 h-4 rounded-full bg-white relative">
                        <div className={`absolute inset-0 rounded-full animate-ping opacity-40`} style={{ backgroundColor: color }} />
                        <div className={`absolute inset-[-4px] rounded-full border border-white/20 animate-[spin_4s_linear_infinite]`} />
                    </div>

                    {/* Information Bridge */}
                    <AnimatePresence>
                        {(hovered || true) && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-4 pointer-events-none"
                            >
                                <div className="w-px h-12 bg-gradient-to-t from-transparent via-white/40 to-transparent" />
                                <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl min-w-[200px] shadow-2xl">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Icon className="w-4 h-4" style={{ color }} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">{label}</span>
                                    </div>
                                    <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black italic">{sublabel}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Html>
        </group>
    )
}

export default function QuantumRealEstateAd() {
    const [isStarted, setIsStarted] = useState(false)
    const [audioIntensity, setAudioIntensity] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)

    const handleEnter = () => {
        setIsStarted(true)
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.warn("Audio Context Blocked:", e))
        }
    }

    return (
        <div className="fixed inset-0 bg-black overflow-hidden select-none font-sans flex items-center justify-center">
            
            <audio ref={audioRef} loop>
                <source src="https://assets.mixkit.co/music/preview/mixkit-sci-fi-drone-background-2834.mp3" type="audio/mpeg" />
            </audio>

            {/* --- ARTWORK DEPTH LAYER --- */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isStarted ? 'opacity-40' : 'opacity-100'}`}>
                <NextImage 
                    src={AD_IMAGE} 
                    alt="Al-Nafeer Real Estate" 
                    fill 
                    className={`object-cover ${isStarted ? 'blur-sm grayscale' : ''} transition-all duration-2000`}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            </div>

            {/* --- 3D INTERACTION ENGINE --- */}
            <AnimatePresence>
                {isStarted && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="absolute inset-0 z-10"
                    >
                        <Canvas shadows dpr={[1, 2]}>
                            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
                            <ambientLight intensity={0.2} />
                            <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={2} color={EMERALD} />
                            
                            <Suspense fallback={null}>
                                <group position={[1.2, 0, 0]} rotation={[0, -Math.PI / 12, 0]}>
                                    <VillaNode />
                                    
                                    {/* Interaction Nodes */}
                                    <Hotspot 
                                        position={[-1.5, 0.8, 0]} 
                                        label="Property Node" 
                                        sublabel="Verified Asset Analysis" 
                                        icon={Layers}
                                        onClick={() => window.open(FB_URL, '_blank')}
                                    />
                                    <Hotspot 
                                        position={[-1.8, -0.6, 0.5]} 
                                        label="AI Advisor" 
                                        sublabel="Instant Valuation Node" 
                                        icon={MessageCircle} 
                                        color={CYAN}
                                        onClick={() => window.location.href = WHATSAPP_URL}
                                    />
                                    <Hotspot 
                                        position={[-1.2, -1.5, -0.5]} 
                                        label="Connect HQ" 
                                        sublabel="Direct Protocol Access" 
                                        icon={Facebook}
                                        onClick={() => window.open(FB_URL, '_blank')}
                                    />
                                </group>

                                <Stars radius={50} depth={50} count={300} factor={2} saturation={0} fade speed={0.5} />
                            </Suspense>

                            <OrbitControls 
                                enableZoom={false} 
                                enablePan={false}
                                autoRotate 
                                autoRotateSpeed={0.5} 
                                minPolarAngle={Math.PI / 3}
                                maxPolarAngle={Math.PI / 1.5}
                            />
                        </Canvas>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- INITIAL INTERFACE --- */}
            <AnimatePresence>
                {!isStarted && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="relative z-20 text-center px-6"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-emerald-500/30 bg-black/40 backdrop-blur-xl mb-12 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em] italic">QUANTUM_9_SERIES_ACTIVE</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white mb-8 leading-none">
                            AL-NAFEER <br/>
                            <span className="text-emerald-500">REAL ESTATE AI</span>
                        </h1>

                        <p className="max-w-xl mx-auto text-sm md:text-md text-gray-400 font-bold uppercase tracking-widest leading-relaxed mb-16 opacity-60">
                            The definitive fusion of architectural supremacy and machine intelligence. Welcome to the future of interaction.
                        </p>

                        <button 
                            onClick={handleEnter}
                            className="relative px-20 py-8 bg-white text-black rounded-[2.5rem] font-black text-xs uppercase tracking-[0.8em] overflow-hidden group transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                        >
                            <div className="absolute inset-0 bg-emerald-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                            <span className="relative z-10 group-hover:text-black">INITIATE_BROADCAST</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- HUD WATERMARK --- */}
            <div className="fixed bottom-10 right-10 z-[100] opacity-30 flex flex-col text-right">
                <span className="text-[8px] font-black text-emerald-500 tracking-[4px] italic">ESTABLISHMENT_NODE_EG</span>
                <span className="text-xl font-black italic text-white tracking-widest font-serif">Sherif Rosas</span>
            </div>
            
        </div>
    )
}
