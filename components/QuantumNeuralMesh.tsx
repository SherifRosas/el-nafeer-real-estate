'use client'

import React, { useMemo, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface Node {
  id: number
  x: number
  y: number
  label?: string
  priority?: boolean
  status?: number // 0 to 100 completion
}

// --- 🪐 DIMENSIONAL_EGYPT_CORE ---
function EgyptHologram() {
    const meshRef = useRef<THREE.Group>(null)
    
    // Smooth Neural Drift
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
            meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.05
        }
    })

    // Coordinates mapped from SVG space to 3D space
    const nodes: Node[] = [
        { id: 1, x: 2, y: 3.5, label: 'TOUKH_CORE', priority: true, status: 85 },
        { id: 2, x: 2.5, y: 3.2, label: 'BANHA_HQ', priority: true, status: 92 },
        { id: 3, x: 1.5, y: 3.0, label: 'QALYUB_NODE', priority: true, status: 45 },
        { id: 4, x: 3, y: 4, label: 'LOTUS_NORTH', priority: true, status: 70 },
        { id: 5, x: -2, y: 3.5, label: 'ALEXANDRIA', status: 60 },
        { id: 6, x: 4, y: 2, label: 'CAIRO_EAST', status: 75 },
        { id: 7, x: -3, y: -5, label: 'LUXOR', status: 30 },
        { id: 8, x: -4, y: -8, label: 'ASWAN', status: 20 },
    ]

    const connections = [
        [1, 2], [1, 3], [2, 3], [1, 4], [3, 6], [6, 7], [7, 8]
    ]

    return (
        <group ref={meshRef}>
            {/* 🇪🇬 EGYPT_SILHOUETTE_WIRE (Stylized Geometry) */}
            <mesh rotation={[-Math.PI / 2.2, 0, 0]}>
                <torusGeometry args={[8, 0.02, 16, 100]} />
                <meshBasicMaterial color="#c5a059" transparent opacity={0.1} />
            </mesh>

            {/* 🏛️ PROJECT_TELEMETRY_PILLARS */}
            {nodes.map((node) => (
                <group key={node.id} position={[node.x, node.y, 0]}>
                    {/* The "Anchor" Node */}
                    <mesh>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshBasicMaterial color={node.priority ? "#0ea5e9" : "#ffffff"} />
                    </mesh>
                    
                    {/* The Elevation Pillar (Status Driven) */}
                    <mesh position={[0, (node.status || 0) / 100, 0]}>
                        <cylinderGeometry args={[0.02, 0.02, (node.status || 0) / 50, 8]} />
                        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.4} />
                    </mesh>

                    {/* Glowing Apex */}
                    <mesh position={[0, (node.status || 0) / 25, 0]}>
                        <sphereGeometry args={[0.05, 8, 8]} />
                        <meshBasicMaterial color="#0ea5e9" toneMapped={false} />
                        <pointLight color="#0ea5e9" intensity={2} distance={3} />
                    </mesh>
                </group>
            ))}

            {/* 🕸️ NEURAL_BEZIER_ARCS */}
            {connections.map(([id1, id2], idx) => {
                const n1 = nodes.find(n => n.id === id1)!
                const n2 = nodes.find(n => n.id === id2)!
                
                // Create curved path
                const curve = new THREE.QuadraticBezierCurve3(
                    new THREE.Vector3(n1.x, n1.y, 0),
                    new THREE.Vector3((n1.x + n2.x) / 2, (n1.y + n2.y) / 2, 2.5), // High vertical loft
                    new THREE.Vector3(n2.x, n2.y, 0)
                )
                const points = curve.getPoints(50)
                const geometry = new THREE.BufferGeometry().setFromPoints(points)

                return (
                    <line key={idx}>
                        <primitive object={geometry} attach="geometry" />
                        <lineBasicMaterial color="#0ea5e9" transparent opacity={0.3} linewidth={2} />
                    </line>
                )
            })}
        </group>
    )
}

export default function QuantumNeuralMesh() {
  return (
    <div className="absolute inset-0 z-0 bg-[#050811] overflow-hidden">
      {/* 🌌 GOLDEN_STARFIELD_ATMOSPHERE */}
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_center,_#c5a05933_0%,_transparent_70%)]" />
      
      <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={3} color="#c5a059" />
          
          <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                  <EgyptHologram />
              </Float>
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Suspense>

          {/* Neutral Parallax controls - Restricted */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 1.7} 
            minPolarAngle={Math.PI / 2.3}
          />
      </Canvas>

      {/* 🏆 GLOBAL_TITLE_OVERLAY_HUD */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.25, y: 0 }}
            transition={{ duration: 2 }}
            className="flex flex-col items-center gap-4"
        >
            <h2 className="text-[120px] font-black italic uppercase tracking-[0.2em] text-cyan-400 opacity-50 whitespace-nowrap">
                BEIT AL-KHAIR
            </h2>
            <div className="flex items-center gap-10">
                <div className="h-[1px] w-64 bg-gradient-to-r from-transparent to-cyan-400" />
                <span className="text-2xl font-black italic tracking-[0.8em] text-white/40">EGYPTIAN_QUANTUM_MESH</span>
                <div className="h-[1px] w-64 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] pointer-events-none z-20" />
    </div>
  )
}
