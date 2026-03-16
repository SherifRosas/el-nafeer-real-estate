'use client'

import NextImage from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { useState } from 'react'

export default function AdV2Preview() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    // Track mouse for 3D Parallax Tilt
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        const x = (clientX / innerWidth - 0.5) * 15 // Tilt intensity
        const y = (clientY / innerHeight - 0.5) * -15
        setMousePos({ x, y })
    }

    return (
        <div 
            className="min-h-screen bg-black flex items-center justify-center p-0 m-0 overflow-hidden relative cursor-crosshair"
            onMouseMove={handleMouseMove}
        >
            {/* Neural Background Flow */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-sahara-gold/10 via-transparent to-blue-900/20 animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                
                {/* Flowing Energy Lines */}
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute bg-sahara-gold/10 w-[1px] h-32 blur-[2px] animate-[flow_8s_linear_infinite]"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Robotic HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start opacity-30">
                    <div className="text-[10px] font-mono text-sahara-gold space-y-1">
                        <p className="tracking-widest robotic-digits">LAT: 30.0444° N</p>
                        <p className="tracking-widest robotic-digits">LON: 31.2357° E</p>
                        <p className="text-[8px] opacity-50 underline uppercase">Signal_Lock: Cairo_Giza_Node</p>
                    </div>
                    <div className="text-[10px] font-mono text-right text-gray-400">
                        <p>NETWORK_UPTIME: 99.99%</p>
                        <p className="animate-pulse text-green-500 font-bold">● PULSE_SYNC: ACTIVE</p>
                    </div>
                </div>
                
                {/* Center Target HUD */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <div className="w-[85%] h-[85%] border border-sahara-gold/20 rounded-full animate-[spin_100s_linear_infinite]" />
                    <div className="absolute w-[60%] h-[60%] border-t border-b border-sahara-gold/30 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                </div>

                <div className="flex justify-between items-end opacity-30">
                    <div className="text-[7px] font-mono text-gray-500 uppercase tracking-[0.5em]">
                        Elevator_Vertical_Sync_v4.5 // Hyper_Pulsar
                    </div>
                    <div className="w-40 h-[1px] bg-sahara-gold/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-sahara-gold w-1/3 animate-[loading_2s_linear_infinite]" />
                    </div>
                </div>
            </div>

            {/* Ad Creative Container */}
            <div 
                className="relative w-full max-w-[850px] aspect-square transition-transform duration-300 ease-out z-10"
                style={{ 
                    transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
                    filter: 'drop-shadow(0 0 100px rgba(0,0,0,1))'
                }}
            >
                {/* The Ad Creative */}
                <NextImage 
                    src="/campaigns/lever-pioneer/ad-v2.png" 
                    alt="Lever Pioneer Ad v2" 
                    fill
                    className="object-contain relative z-10 rounded-[3.5rem]"
                    priority
                />

                {/* --- HYPER-ANIMATION LAYERS --- */}

                {/* 1. Kinetic Elevator Capsule (Moving Glow) */}
                <div className="absolute left-[45%] top-[10%] w-[10%] h-[60%] z-20 pointer-events-none">
                    <div className="absolute inset-x-0 h-40 bg-gradient-to-t from-transparent via-sahara-gold/40 to-transparent animate-[elevator_6s_ease-in-out_infinite] blur-2xl" />
                    <div className="absolute inset-x-0 h-8 bg-white/20 animate-[elevator_6s_ease-in-out_infinite] blur-md shadow-[0_0_50px_rgba(212,175,55,0.5)]" />
                </div>

                {/* 2. Signal Beacon Pulses (Icons) */}
                <div className="absolute top-[18%] left-[18%] w-16 h-16 z-25 pointer-events-none">
                     <div className="absolute inset-0 border-2 border-green-500/20 rounded-full animate-ping" />
                     <div className="absolute inset-2 border border-green-500/10 rounded-full animate-[ping_4s_linear_infinite]" />
                </div>
                <div className="absolute top-[22%] right-[18%] w-20 h-20 z-25 pointer-events-none">
                     <div className="absolute inset-0 border-2 border-sahara-gold/20 rounded-full animate-[ping_5s_linear_infinite]" />
                     <div className="absolute inset-4 border border-sahara-gold/10 rounded-full animate-ping" />
                </div>
                <div className="absolute bottom-[28%] left-[18%] w-14 h-14 z-25 pointer-events-none">
                     <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-[ping_3s_linear_infinite]" />
                </div>

                {/* 3. Neon Atmospheric Flickers */}
                <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen opacity-30">
                    <div className="absolute top-[20%] left-[10%] w-[30%] h-[20%] bg-blue-500/10 blur-[100px] animate-[flicker_4s_infinite]" />
                    <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[20%] bg-sahara-gold/10 blur-[100px] animate-[flicker_6s_infinite]" />
                </div>

                {/* 4. Scanning Grid Sync */}
                <div className="absolute inset-x-14 inset-y-16 z-30 pointer-events-none overflow-hidden rounded-[4rem]">
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-sahara-gold/60 to-transparent absolute top-0 left-0 animate-[scan_7s_linear_infinite] opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.8)]" />
                </div>
                
                {/* 5. Icon Bouncing Movement */}
                <div className="absolute inset-0 z-25 pointer-events-none">
                    {/* Floating HUD Brackets */}
                    <div className="absolute top-[10%] left-[10%] w-12 h-12 border-t-2 border-l-2 border-sahara-gold/20 animate-pulse" />
                    <div className="absolute bottom-[10%] right-[10%] w-12 h-12 border-b-2 border-r-2 border-sahara-gold/20 animate-pulse" />
                </div>

                {/* Interactive Signal Hotspots */}
                <a 
                    href="https://wa.me/201111171368" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-[8%] left-[7%] w-[35%] h-[35%] z-40 group"
                    title="Connect via WhatsApp"
                >
                    <span className="absolute inset-4 rounded-full border border-green-500/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a 
                    href="https://www.google.com/maps?q=29.9656242,31.0922895" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-[8%] right-[7%] w-[35%] h-[35%] z-40 group"
                    title="View Landmark Location"
                >
                    <span className="absolute inset-8 rounded-full border border-sahara-gold/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a 
                    href="tel:+201070615372" 
                    className="absolute bottom-[22%] left-[7%] w-[35%] h-[28%] z-40 group"
                    title="Direct Voice Command"
                >
                    <span className="absolute inset-0 rounded-full border border-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a 
                    href="/lever-pioneer" 
                    className="absolute bottom-[4%] right-[7%] w-[50%] h-[18%] z-40 group"
                    title="Access Command Hub"
                />
            </div>

            <style jsx global>{`
                @keyframes elevator {
                    0% { transform: translateY(500px); }
                    50% { transform: translateY(0); }
                    100% { transform: translateY(500px); }
                }
                @keyframes scan {
                    0% { transform: translateY(-100px); }
                    100% { transform: translateY(800px); }
                }
                @keyframes flow {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-500px); opacity: 0; }
                }
                @keyframes flicker {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.4; }
                    51% { opacity: 0.05; }
                    52% { opacity: 0.5; }
                }
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }
                .robotic-digits {
                    letter-spacing: 0.1em;
                    font-feature-settings: "tnum";
                    font-variant-numeric: tabular-nums;
                }
            `}</style>
        </div>
    )
}
