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

            {/* 🏺 HOLOGRAPHIC_BRAND_HUB (High-Fidelity Restoration) */}
            <mesh position={[0, 0.5, -1.9]}>
                <planeGeometry args={[1.5, 1.5]} />
                <meshStandardMaterial 
                    transparent 
                    opacity={0.95} 
                    emissive="#0ea5e9" 
                    emissiveIntensity={8}
                    map={new THREE.TextureLoader().load('/campaigns/lever-pioneer/pioneer-ultra.png')}
                    alphaTest={0.01}
                />
            </mesh>
            
            <Html transform position={[0, -0.6, -1.89]} scale={0.5}>
                <div className="flex flex-col items-center gap-2 select-none pointer-events-none drop-shadow-[0_0_25px_rgba(14,165,233,0.7)]">
                    <h2 className="text-4xl font-black italic text-sky-400 tracking-widest uppercase">LEVER PIONEER</h2>
                    <div className="flex items-center gap-4">
                        <div className="h-[2px] w-24 bg-sky-500/80 shadow-[0_0_30px_#0ea5e9]" />
                        <span className="text-[12px] font-black text-white tracking-[1.4em] uppercase">GIZA_HORIZON_v5.5</span>
                        <div className="h-[2px] w-24 bg-sky-500/80 shadow-[0_0_30px_#0ea5e9]" />
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
                
                {/* 🌅 ULTIMATE_GIZA_SUNSET (High Intensity Burst) */}
                <Sky
                  distance={450000}
                  sunPosition={[0, -0.012, -1]} 
                  inclination={0.52}
                  azimuth={0.25}
                  turbidity={10}
                  rayleigh={8}
                  mieCoefficient={0.008}
                  mieDirectionalG={0.85}
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
