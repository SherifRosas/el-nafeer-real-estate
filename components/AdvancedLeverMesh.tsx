'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles, PerspectiveCamera } from '@react-three/drei'

export default function AdvancedLeverMesh() {
    return (
        <div className="absolute inset-0 z-0 bg-[#020205] overflow-hidden">
            {/* Cinematic Slow Zoom Background wrapper */}
            {/* ⚠️ ARCHITECT INSTRUCTION: Rename your specific AD Image to 'the-ascension-ad.png' 
                and place it in 'public/campaigns/lever-pioneer/' OR update the URL below. */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-cinematic-zoom opacity-100"
                style={{ 
                    backgroundImage: "url('/campaigns/lever-pioneer/the-ascension-ad.png')",
                    backgroundPosition: "center 20%" // Anchors to show upper architecture well
                }}
            />
            
            {/* Heavy Vignette to blend the UI text perfectly against the image */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#020205_120%)] opacity-90" />
            
            {/* Subtle 3D Sparkle Overlay to fake the 2.5D depth against the static image */}
            <div className="absolute inset-0 pointer-events-none">
                <Canvas dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 100]} fov={40} />
                    <React.Suspense fallback={null}>
                        {/* Golden sparkles drifting across the pyramids/sky */}
                        <Sparkles count={400} scale={150} size={5} speed={0.4} opacity={0.5} color="#fbbf24" />
                        {/* Cyan sparks representing the starburst energy aura in the center */}
                        <Sparkles count={300} scale={80} size={8} speed={1.2} opacity={0.8} color="#06b6d4" />
                        {/* Deep ambient floating particles */}
                        <Sparkles count={100} scale={200} size={10} speed={0.2} opacity={0.2} color="#ffffff" />
                    </React.Suspense>
                </Canvas>
            </div>

            {/* Custom CSS Animation Injected for Cinematic Drift */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes cinematic-zoom {
                    0% { transform: scale(1.0) translateY(0px) rotate(0deg); }
                    100% { transform: scale(1.15) translateY(2%) rotate(0.5deg); }
                }
                .animate-cinematic-zoom {
                    animation: cinematic-zoom 35s ease-in-out infinite alternate;
                }
            `}} />
        </div>
    )
}
