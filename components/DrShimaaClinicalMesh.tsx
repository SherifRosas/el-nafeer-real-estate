'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles, PerspectiveCamera } from '@react-three/drei'

export default function DrShimaaClinicalMesh() {
    return (
        <div className="absolute inset-0 z-0 bg-[#020508] overflow-hidden">
            {/* Blurred Background to fill Ultra-Wide Monitors gracefully */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 blur-3xl scale-110"
                style={{ backgroundImage: "url('/campaigns/dr-shimaa/shimaa_portal_bg.png')" }}
            />

            {/* Cinematic Slow Zoom Background wrapper */}
            <div 
                className="absolute inset-0 bg-cover md:bg-contain bg-center bg-no-repeat animate-clinical-zoom opacity-100"
                style={{ 
                    backgroundImage: "url('/campaigns/dr-shimaa/shimaa_portal_bg.png')",
                    backgroundPosition: "center" 
                }}
            />
            
            {/* Dark vignette overlay for readability */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#020508_130%)] opacity-95" />
            
            {/* Drifting 3D clinical particles Aura */}
            <div className="absolute inset-0 pointer-events-none">
                <Canvas dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 100]} fov={40} />
                    <React.Suspense fallback={null}>
                        {/* Soft teal/cyan sparkles representing clinical serenity */}
                        <Sparkles count={300} scale={140} size={4} speed={0.3} opacity={0.6} color="#0ea5e9" />
                        {/* Warm gold sparkles representing safety and premium care */}
                        <Sparkles count={200} scale={90} size={6} speed={0.8} opacity={0.5} color="#f59e0b" />
                        {/* Soft white ambient dust */}
                        <Sparkles count={100} scale={180} size={8} speed={0.1} opacity={0.2} color="#ffffff" />
                    </React.Suspense>
                </Canvas>
            </div>

            {/* Custom CSS Animation for Slow Cinematic Breathing */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes clinical-zoom {
                    0% { transform: scale(1.0) translateY(0px) rotate(0deg); }
                    100% { transform: scale(1.12) translateY(1.5%) rotate(0.3deg); }
                }
                .animate-clinical-zoom {
                    animation: clinical-zoom 40s ease-in-out infinite alternate;
                }
            `}} />
        </div>
    )
}
