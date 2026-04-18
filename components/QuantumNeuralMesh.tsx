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

// --- 🌅 GERRY_BAX_HORIZON_SHADER ---
const AtmosphereShader = {
    uniforms: {
        glowColor: { value: new THREE.Color('#c5a059') },
        viewVector: { value: new THREE.Vector3(0, 0, 5) }
    },
    vertexShader: `
        varying float intensity;
        void main() {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * vec3(0,0,1) );
            intensity = pow( 0.6 - dot(vNormal, vNormel), 2.0 );
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
}

// --- 🌏 GERRY_BAX_GLOBE_CORE ---
function GerryBaxGlobe() {
    const groupRef = useRef<THREE.Group>(null)
    const atmosphereRef = useRef<THREE.Mesh>(null)
    
    // Autonomous Global Drift
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
        }
    })

    const nodes: Node[] = [
        { id: 1, x: 2, y: 3.5, label: 'TOUKH_CORE', priority: true, status: 85 },
        { id: 2, x: 2.5, y: 3.2, label: 'BANHA_HQ', priority: true, status: 92 },
        { id: 3, x: 1.5, y: 3.0, label: 'QALYUB_DIV', priority: true, status: 45 },
        { id: 4, x: 3, y: 4, label: 'LOTUS_NORTH', priority: true, status: 70 },
        { id: 5, x: 1.2, y: 4.5, label: 'DOMINANCE_NODE', status: 60 },
        { id: 6, x: 3.8, y: 1.8, label: 'DELTA_LINK', status: 75 },
    ]

    return (
        <group ref={groupRef}>
            {/* 🌌 MAIN_SPHERE_GRID (The Gerry Bax Look) */}
            <mesh>
                <sphereGeometry args={[7, 64, 64]} />
                <meshStandardMaterial 
                    color="#050811" 
                    emissive="#c5a059" 
                    emissiveIntensity={0.02} 
                    wireframe={false} 
                    roughness={0.5} 
                    metalness={0.3}
                />
            </mesh>

            {/* 🌅 HORIZON_GLOW_ATMOSPHERE */}
            <mesh ref={atmosphereRef} scale={[1.1, 1.1, 1.1]}>
                <sphereGeometry args={[7, 64, 64]} />
                <shaderMaterial 
                    attach="material"
                    args={[AtmosphereShader]}
                    side={THREE.BackSide}
                    transparent={true}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* 🛸 HUD_TACTICAL_RINGS */}
            <group rotation={[Math.PI / 4, 0.2, 0]}>
                <mesh>
                    <torusGeometry args={[9, 0.01, 16, 120]} />
                    <meshBasicMaterial color="#c5a059" transparent opacity={0.15} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[8.5, 0.005, 16, 120]} />
                    <meshBasicMaterial color="#0ea5e9" transparent opacity={0.05} />
                </mesh>
            </group>

            {/* 🏛️ FLOATING_TACTICAL_PILLARS */}
            {nodes.map((node) => (
                <group key={node.id} position={[node.x, node.y, 6.5]}>
                    {/* The Anchor Point */}
                    <mesh>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshBasicMaterial color={node.priority ? "#0ea5e9" : "#ffffff"} />
                    </mesh>

                    {/* Status Pillar (Completion) */}
                    <mesh position={[0, (node.status || 0) / 100, 0]}>
                        <cylinderGeometry args={[0.01, 0.01, (node.status || 0) / 50, 8]} />
                        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
                    </mesh>

                    {/* Glowing Apex & Point Light */}
                    <mesh position={[0, (node.status || 0) / 25, 0]}>
                        <sphereGeometry args={[0.04, 8, 8]} />
                        <meshBasicMaterial color="#0ea5e9" toneMapped={false} />
                        <pointLight color="#0ea5e9" intensity={3} distance={5} />
                    </mesh>

                    {/* 📊 HUD_DATA_TAG */}
                    <Html distanceFactor={10} position={[0.2, 0.5, 0]} transform>
                        <div className="bg-black/80 backdrop-blur-3xl border border-cyan-500/30 p-2 rounded-lg pointer-events-none whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                                <span className="text-[6px] font-black text-white/80 uppercase tracking-widest robotic-digits">{node.label}</span>
                            </div>
                            <div className="h-[1px] w-full bg-cyan-400/20 my-1" />
                            <div className="text-[5px] font-black text-cyan-400 robotic-digits">STATUS: {node.status}% // ACTIVE</div>
                        </div>
                    </Html>
                </group>
            ))}

            {/* 🕸️ NEURAL_ARC_SYSTEM */}
            {/* Logic simplified for atmospheric mimicry */}
            {[...Array(5)].map((_, i) => (
                <line key={i}>
                    <primitive object={new THREE.BufferGeometry().setFromPoints(
                        new THREE.QuadraticBezierCurve3(
                            new THREE.Vector3(nodes[0].x, nodes[0].y, 6.5),
                            new THREE.Vector3(i * 1.5, i * 1.5, 9),
                            new THREE.Vector3(nodes[i % nodes.length].x, nodes[i % nodes.length].y, 6.5)
                        ).getPoints(50)
                    )} attach="geometry" />
                    <lineBasicMaterial color="#0ea5e9" transparent opacity={0.2} />
                </line>
            ))}
        </group>
    )
}

export default function QuantumNeuralMesh() {
  return (
    <div className="absolute inset-0 z-0 bg-[#05111d] overflow-hidden">
      {/* 🌌 CINEMATIC_GRADIENT_SHELL */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_70%_30%,_#c5a05933_0%,_transparent_60%)]" />
      
      <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
          <ambientLight intensity={1} />
          <pointLight position={[20, 20, 20]} intensity={8} color="#c5a059" />
          <pointLight position={[-20, -10, 10]} intensity={4} color="#0ea5e9" />
          
          <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                  <GerryBaxGlobe />
              </Float>
              {/* Dense Starfield for Gerry Bax aesthetic */}
              <Stars radius={100} depth={50} count={10000} factor={6} saturation={0} fade speed={1.5} />
          </Suspense>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 1.5} 
            minPolarAngle={Math.PI / 2.5}
          />
      </Canvas>

      {/* 🏙️ CITY_LIGHTS_SCANLINE_OVERLAY */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] opacity-[0.2] pointer-events-none z-20" style={{ backgroundSize: '100% 4px, 3px 100%' }} />

      {/* 🏺 BRAND_SOVEREIGNTY_OVERLAY */}
      <div className="absolute inset-x-0 bottom-24 flex items-center justify-center pointer-events-none z-30">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 3 }}
            className="flex flex-col items-center gap-2"
        >
            <h2 className="text-[80px] font-black italic uppercase tracking-[0.5em] text-cyan-400 opacity-30 select-none">
                BEIT AL-KHAIR
            </h2>
            <div className="flex items-center gap-6">
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-cyan-400" />
                <span className="text-xs font-black italic tracking-[1.5em] text-white/30 robotic-digits">GLOBAL_SOVEREIGNTY_v4.0</span>
                <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
        </motion.div>
      </div>
    </div>
  )
}
