'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
    PerspectiveCamera, 
    Sky, 
    Environment, 
    Float, 
    Stars, 
    Html,
    MeshDistortMaterial
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
    
    // Smooth Ascent Logic
    useFrame((state) => {
        if (groupRef.current) {
            // Simulate vertical rise
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5
        }
    })

    return (
        <group ref={groupRef}>
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
                    <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
                </mesh>
            ))}

            {/* Rear Wall (Glass with Logo) */}
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

            {/* 🏺 HOLOGRAPHIC_BRAND_HUB */}
            <Html transform position={[0, 0.5, -1.9]} scale={0.5}>
                <div className="flex flex-col items-center gap-6 select-none pointer-events-none">
                    <div className="w-48 h-48 bg-white/10 backdrop-blur-3xl rounded-3xl p-6 border border-sky-500/30 flex items-center justify-center relative overflow-hidden group">
                        <img 
                            src="/logos/logo-ar.png" 
                            alt="LEVER PIONEER" 
                            className="w-full h-full object-contain relative z-10"
                        />
                        <div className="absolute inset-0 bg-sky-500/20 blur-3xl animate-pulse" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-4xl font-black italic text-sky-400 tracking-widest uppercase mb-2">LEVER PIONEER</h2>
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-sky-500/50" />
                            <span className="text-[10px] font-black text-white/40 tracking-[1em] uppercase">GIZA_ASCENT_v4.5</span>
                            <div className="h-[1px] w-12 bg-sky-500/50" />
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
                <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
                
                {/* 🌅 ULTIMATE_GIZA_SUNSET */}
                <Sky
                  distance={450000}
                  sunPosition={[0, -0.015, -1]} // Deep horizon sunset
                  inclination={0.5}
                  azimuth={0.25}
                  turbidity={8}
                  rayleigh={6}
                  mieCoefficient={0.005}
                  mieDirectionalG={0.8}
                />
                
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#fb923c" /> {/* Sunset Light */}
                <pointLight position={[-5, 2, -5]} intensity={0.5} color="#0ea5e9" /> {/* Cyber Cyan Fill */}

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={null}>
                    {/* The Ascending Cabin */}
                    <ElevatorCabin />
                    
                    {/* The Giza Plateau */}
                    <group position={[0, -8, -40]} rotation={[0, Math.PI / 4, 0]}>
                        <Pyramid position={[0, 0, 0]} scale={[25, 25, 25]} />
                        <Pyramid position={[-30, 0, 15]} scale={[20, 20, 20]} />
                        <Pyramid position={[30, 0, -20]} scale={[18, 18, 18]} />
                        
                        {/* Sand Plane */}
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                            <planeGeometry args={[200, 200]} />
                            <meshStandardMaterial color="#1a120b" roughness={1} />
                        </mesh>
                    </group>

                    <Environment preset="city" />
                </Suspense>

            </Canvas>
            
            {/* Cinematic Overlay Script */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>
    )
}

function Suspense({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) {
    return <React.Suspense fallback={fallback}>{children}</React.Suspense>
}
