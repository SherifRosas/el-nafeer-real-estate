'use client'

import React from 'react'

export default function AdvancedBeitAlKhairMesh() {
    return (
        <div className="absolute inset-0 z-0 bg-[#020205] overflow-hidden">
            {/* Blurred Background to fill Ultra-Wide Monitor pillar-boxes gracefully */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 blur-3xl scale-110"
                style={{ backgroundImage: "url('/campaigns/beit-alkhair/qasr_toukh_cinematic.png')" }}
            />

            {/* Cinematic Slow Zoom Background wrapper - Fits uncropped on desktop, covers on mobile */}
            <div 
                className="absolute inset-0 bg-cover md:bg-contain bg-center bg-no-repeat animate-cinematic-zoom opacity-100"
                style={{ 
                    backgroundImage: "url('/campaigns/beit-alkhair/qasr_toukh_cinematic.png')",
                    backgroundPosition: "center" 
                }}
            />
            
            {/* Luxurious Vignette to keep text readable */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#050811_120%)] opacity-95" />
            
            {/* Custom CSS Animation Injected for Cinematic Drift */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes cinematic-zoom {
                    0% { transform: scale(1.0) translateY(0px) rotate(0deg); }
                    100% { transform: scale(1.05) translateY(1%) rotate(0.2deg); }
                }
                .animate-cinematic-zoom {
                    animation: cinematic-zoom 45s ease-in-out infinite alternate;
                }
            `}} />
        </div>
    )
}
