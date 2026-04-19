'use client'

import React, { useMemo, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, PerspectiveCamera, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

interface Node {
  id: number
  x: number
  y: number
  label?: string
  priority?: boolean
  status?: number // 0 to 100 completion
}

interface QuantumNeuralMeshProps {
  variant?: 'gold' | 'cyan'
}

// --- 🌅 GERRY_BAX_HORIZON_SHADER ---
const getAtmosphereShader = (color: string) => ({
    uniforms: {
        glowColor: { value: new THREE.Color(color) },
        viewVector: { value: new THREE.Vector3(0, 0, 5) }
    },
    vertexShader: `
        varying float intensity;
        void main() {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * vec3(0,0,1) );
            intensity = pow( 0.7 - dot(vNormal, vNormel), 2.0 );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4( glow, 1.0 );
        }
    `
})

// --- 🌏 GERRY_BAX_GLOBE_CORE ---
function GerryBaxGlobe({ variant = 'gold' }: { variant: 'gold' | 'cyan' }) {
    const groupRef = useRef<THREE.Group>(null)
    const atmosphereRef = useRef<THREE.Mesh>(null)
    
    const accentColor = variant === 'cyan' ? '#0ea5e9' : '#c5a059'
    
    // Autonomous Global Drift
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
        }
    })

    const nodes: Node[] = [
        { id: 1, x: 2, y: 3.5, label: variant === 'cyan' ? 'PIONEER_CORE' : 'TOUKH_CORE', priority: true, status: 85 },
        { id: 2, x: 2.5, y: 3.2, label: variant === 'cyan' ? 'ZAYED_HQ' : 'BANHA_HQ', priority: true, status: 92 },
        { id: 3, x: 1.5, y: 3.0, label: 'ELITE_NODE', priority: true, status: 45 },
        { id: 4, x: 3, y: 4, label: 'CAIRO_LINK', priority: true, status: 70 },
        { id: 5, x: 1.2, y: 4.5, label: 'SOVEREIGN_NODE', status: 60 },
        { id: 6, x: 3.8, y: 1.8, label: 'DELTA_STREAM', status: 75 },
    ]

    const shader = useMemo(() => getAtmosphereShader(accentColor), [accentColor])

    return (
        <group ref={groupRef}>
            {/* 🌌 MAIN_SPHERE_GRID (The Gerry Bax Look) */}
            <mesh>
                <sphereGeometry args={[3.5, 32, 32]} />
                <meshStandardMaterial 
                    color="#050a15" 
                    emissive={accentColor} 
                    emissiveIntensity={variant === 'cyan' ? 0.5 : 0.4} 
                    wireframe={false} 
                    roughness={0.4} 
                    metalness={0.5}
                />
            </mesh>

            {/* 🌅 HORIZON_GLOW_ATMOSPHERE */}
            <mesh ref={atmosphereRef} scale={[1.1, 1.1, 1.1]}>
                <sphereGeometry args={[3.5, 32, 32]} />
                <shaderMaterial 
                    attach="material"
                    args={[shader]}
                    side={THREE.BackSide}
                    transparent={true}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* 🛸 HUD_TACTICAL_RINGS */}
            <group rotation={[Math.PI / 4, 0.2, 0]}>
                <mesh>
                    <torusGeometry args={[9, 0.01, 16, 120]} />
                    <meshBasicMaterial color={accentColor} transparent opacity={0.15} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[8.5, 0.005, 16, 120]} />
                    <meshBasicMaterial color={variant === 'cyan' ? "#fcfcfc" : "#0ea5e9"} transparent opacity={0.05} />
                </mesh>
            </group>

            {/* 🏛️ FLOATING_TACTICAL_PILLARS */}
            {nodes.map((node) => (
                <group key={node.id} position={[node.x, node.y, 6.5]}>
                    {/* The Anchor Point */}
                    <mesh>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshBasicMaterial color={node.priority ? accentColor : "#ffffff"} />
                    </mesh>

                    {/* Status Pillar (Completion) */}
                    <mesh position={[0, (node.status || 0) / 100, 0]}>
                        <cylinderGeometry args={[0.01, 0.01, (node.status || 0) / 50, 8]} />
                        <meshBasicMaterial color={accentColor} transparent opacity={0.3} />
                    </mesh>

                    {/* Glowing Apex & Point Light */}
                    <mesh position={[0, (node.status || 0) / 25, 0]}>
                        <sphereGeometry args={[0.04, 8, 8]} />
                        <meshBasicMaterial color={accentColor} toneMapped={false} />
                        <pointLight color={accentColor} intensity={3} distance={5} />
                    </mesh>

                    {/* 📊 HUD_DATA_TAG */}
                    <Html distanceFactor={10} position={[0.2, 0.5, 0]} transform>
                        <div className={`bg-black/80 backdrop-blur-3xl border ${variant === 'cyan' ? 'border-sky-500/30' : 'border-cyan-500/30'} p-2 rounded-lg pointer-events-none whitespace-nowrap`}>
                            <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 ${variant === 'cyan' ? 'bg-sky-400' : 'bg-cyan-400'} rounded-full animate-pulse`} />
                                <span className="text-[6px] font-black text-white/80 uppercase tracking-widest robotic-digits">{node.label}</span>
                            </div>
                            <div className={`h-[1px] w-full ${variant === 'cyan' ? 'bg-sky-400/20' : 'bg-cyan-400/20'} my-1`} />
                            <div className={`text-[5px] font-black ${variant === 'cyan' ? 'text-sky-400' : 'text-cyan-400'} robotic-digits`}>STATUS: {node.status}% // ACTIVE</div>
                        </div>
                    </Html>
                </group>
            ))}

            {/* 🕸️ NEURAL_ARC_SYSTEM */}
            {[...Array(5)].map((_, i) => (
                <line key={i}>
                    <primitive object={new THREE.BufferGeometry().setFromPoints(
                        new THREE.QuadraticBezierCurve3(
                            new THREE.Vector3(nodes[0].x, nodes[0].y, 6.5),
                            new THREE.Vector3(i * 1.5, i * 1.5, 9),
                            new THREE.Vector3(nodes[i % nodes.length].x, nodes[i % nodes.length].y, 6.5)
                        ).getPoints(50)
                    )} attach="geometry" />
                    <lineBasicMaterial color={accentColor} transparent opacity={0.2} />
                </line>
            ))}
        </group>
    )
}

export default function QuantumNeuralMesh({ variant = 'gold' }: QuantumNeuralMeshProps) {
  const accentColor = variant === 'cyan' ? '#0ea5e9' : '#c5a059'
  
  return (
    <div className="absolute inset-0 z-0 bg-transparent overflow-hidden">
      {/* 🌌 CINEMATIC_GRADIENT_SHELL */}
      <div className={`absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_70%_30%,_${accentColor}33_0%,_transparent_60%)]`} />
      
      <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
          <ambientLight intensity={0.5} />
          <pointLight position={[20, 20, 20]} intensity={10} color={accentColor} />
          <pointLight position={[-20, -10, 10]} intensity={5} color={variant === 'cyan' ? "#fcfcfc" : "#0ea5e9"} />
          
          <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                  <GerryBaxGlobe variant={variant} />
              </Float>
              <Stars radius={100} depth={50} count={10000} factor={6} saturation={0} fade speed={1.5} />
          </Suspense>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 1.5} 
            minPolarAngle={Math.PI / 2.5}
          />
      </Canvas>

      {/* 🏺 BRAND_SOVEREIGNTY_OVERLAY */}
      <div className="absolute inset-x-0 bottom-24 flex items-center justify-center pointer-events-none z-30">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 3 }}
            className="flex flex-col items-center gap-2"
        >
            <h2 className={`text-[80px] font-black italic uppercase tracking-[0.5em] ${variant === 'cyan' ? 'text-sky-400' : 'text-cyan-400'} opacity-30 select-none`}>
                {variant === 'cyan' ? 'LEVER ELEVATORS' : 'BEIT AL-KHAIR'}
            </h2>
            <div className="flex items-center gap-6">
                <div className={`h-[1px] w-32 bg-gradient-to-r from-transparent ${variant === 'cyan' ? 'to-sky-400' : 'to-cyan-400'}`} />
                <span className="text-xs font-black italic tracking-[1.5em] text-white/30 robotic-digits">GLOBAL_SOVEREIGNTY_v4.0</span>
                <div className={`h-[1px] w-32 bg-gradient-to-l from-transparent ${variant === 'cyan' ? 'to-sky-400' : 'to-cyan-400'}`} />
            </div>
        </motion.div>
      </div>
    </div>
  )
}
