'use client'

import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
    PerspectiveCamera, 
    Sky, 
    Environment, 
    Float, 
    Stars, 
    Html,
    MeshDistortMaterial,
    useTexture
} from '@react-three/drei'
import * as THREE from 'three'

interface PyramidProps {
    position: [number, number, number]
    scale: [number, number, number]
}

function Pyramid({ position, scale }: PyramidProps) {
    const meshRef = useRef<THREE.Mesh>(null)
    
    return (
        <mesh position={position} scale={scale} ref={meshRef}>
            <coneGeometry args={[1, 1, 4]} />
            <meshStandardMaterial 
                color="#5a4c3a" 
                roughness={0.8}
                metalness={0.2}
                emissive="#0ea5e9"
                emissiveIntensity={0.1}
            />
            {/* Cyber-Luxe Edge Lines */}
            <mesh scale={[1.01, 1.01, 1.01]}>
                <coneGeometry args={[1, 1, 4]} />
                <meshBasicMaterial color="#0ea5e9" wireframe={true} transparent opacity={0.1} />
            </mesh>
        </mesh>
    )
}

function ElevatorCabin() {
    const groupRef = useRef<THREE.Group>(null)
    const [floor, setFloor] = useState(1)
    
    // 🏺 IDENTITY_MANIFEST
    const logoTexture = useTexture('/campaigns/lever-pioneer/lever_minimalist_profile_v221_0_cleaned_1775081914737.png')
    
    // 🚀 CONTINUOUS_ASCENT_ENGINE
    useFrame((state) => {
        if (groupRef.current) {
            // Steady vertical rise synchronized with the cinematic journey
            const time = state.clock.elapsedTime
            const speed = 0.5
            groupRef.current.position.y = (time * speed) % 50 
            
            // Derive "Fancy Digits" floor number
            const currentFloor = Math.floor((groupRef.current.position.y * 2) + 1)
            if (currentFloor !== floor) setFloor(currentFloor)
        }
    })

    return (
        <group ref={groupRef}>
            {/* 👁️ INTERNAL_CAMERA_LOCK: Parented to the vessel's movement */}
            <PerspectiveCamera makeDefault position={[0, 0, 1.5]} fov={60} />
            
            {/* Internal Vessel Lighting */}
            <pointLight position={[0, 1, 0]} intensity={0.5} color="#fff" />

            {/* Bottom Base */}
            <mesh position={[0, -1.8, 0]}>
                <boxGeometry args={[4, 0.2, 4]} />
                <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
            </mesh>
            
            {/* Top Ceiling */}
            <mesh position={[0, 2.2, 0]}>
                <boxGeometry args={[4, 0.2, 4]} />
                <meshStandardMaterial color="#050505" metalness={1} roughness={0} />
            </mesh>
            
            {/* Glass Pillars / Corners */}
            {[[1.9, 0, 1.9], [-1.9, 0, 1.9], [1.9, 0, -1.9], [-1.9, 0, -1.9]].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <boxGeometry args={[0.2, 4, 0.2]} />
                    <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.8} />
                </mesh>
            ))}

            {/* Rear Wall (Glass with Identity Logo) */}
            <mesh position={[0, 0, -1.95]}>
                <boxGeometry args={[3.8, 4, 0.05]} />
                <meshStandardMaterial 
                    color="#0ea5e9" 
                    transparent 
                    opacity={0.15} 
                    metalness={1} 
                    roughness={0} 
                />
            </mesh>

            {/* 🏺 HOLOGRAPHIC_BRAND_HUB (100/100 Manifestation) */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh position={[0, 0.8, -1.9]}>
                    <planeGeometry args={[1.5, 1.5]} />
                    <meshStandardMaterial 
                        transparent 
                        opacity={0.95} 
                        map={logoTexture}
                        emissive="#fff" 
                        emissiveIntensity={0.15}
                        alphaTest={0.5}
                    />
                </mesh>
            </Float>

            {/* 🔢 MODERN_FANCY_DIGITS (Floor Tracking HUD) */}
            <Html transform position={[0, -0.6, -1.89]} scale={0.5}>
                <div className="flex flex-col items-center gap-4 select-none pointer-events-none">
                    <div className="flex flex-col items-center bg-black/40 backdrop-blur-xl border-y-2 border-sky-500/50 px-12 py-6 rounded-2xl shadow-[0_0_50px_rgba(14,165,233,0.3)]">
                        <span className="text-[10px] text-sky-400 font-black tracking-[0.6em] uppercase mb-2">FLR_LEVEL</span>
                        <h2 className="text-8xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            {floor < 10 ? `0${floor}` : floor}
                        </h2>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <h2 className="text-2xl font-black italic text-sky-400 tracking-widest uppercase">LEVER PIONEER</h2>
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-20 bg-sky-500/50" />
                            <span className="text-[10px] font-black text-white/60 tracking-[1em] uppercase">SUNSHINE_ASCENT_v7.5</span>
                            <div className="h-[1px] w-20 bg-sky-500/50" />
                        </div>
                    </div>
                </div>
            </Html>
        </group>
    )
}

export default function GizaHorizonMesh() {
    return (
        <div className="absolute inset-0 z-0 bg-transparent overflow-hidden">
            <Canvas shadows={false} dpr={[1, 2]}>
                
                {/* 🌅 ULTIMATE_GIZA_SUNSHINE (High-Noon Clarity) */}
                <Sky
                  distance={450000}
                  sunPosition={[0, 1, -1]} 
                  inclination={0.5}
                  azimuth={0.25}
                  turbidity={0.2}
                  rayleigh={1.2}
                  mieCoefficient={0.005}
                  mieDirectionalG={0.8}
                />
                
                <ambientLight intensity={1.2} />
                <directionalLight position={[10, 10, 5]} intensity={2.5} color="#fff" />
                <pointLight position={[5, 5, 5]} intensity={1.5} color="#fff" />
                <pointLight position={[-5, 2, -5]} intensity={0.8} color="#0ea5e9" />

                <Suspense fallback={null}>
                    {/* The Ascending Cabin */}
                    <ElevatorCabin />
                    
                    {/* The Giza Plateau (Three Pyramids) */}
                    <group position={[0, -8, -40]} rotation={[0, Math.PI / 4, 0]}>
                        <Pyramid position={[0, 0, 0]} scale={[25, 25, 25]} />
                        <Pyramid position={[-30, 0, 15]} scale={[20, 20, 20]} />
                        <Pyramid position={[30, 0, -20]} scale={[18, 18, 18]} />
                        
                        {/* Sand Plane */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                            <planeGeometry args={[200, 200]} />
                            <meshStandardMaterial color="#fcd34d" roughness={0.6} metalness={0.1} />
                        </mesh>
                    </group>

                    <Environment preset="city" />
                </Suspense>

            </Canvas>
            
            {/* Cinematic High-Noon Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-white/10" />
        </div>
    )
}

function Suspense({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) {
    return <React.Suspense fallback={fallback}>{children}</React.Suspense>
}
