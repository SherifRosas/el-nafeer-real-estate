'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

const CYAN = "#06b6d4";

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
                    <meshBasicMaterial color={CYAN} transparent opacity={0.15} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    )
}

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

export default function Quantum3DLayer() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
            <Canvas dpr={1} camera={{ position: [0, 0, 5], fov: 40 }} gl={{ powerPreference: "high-performance", alpha: true }}>
                <ambientLight intensity={1.5} />
                <Suspense fallback={null}>
                    <group position={[0, 0.4, 0]}>
                        <PortalGate />
                        <ElevatorBeams />
                    </group>
                    <Stars radius={50} count={50} factor={4} saturation={0} fade speed={0.5} />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}
