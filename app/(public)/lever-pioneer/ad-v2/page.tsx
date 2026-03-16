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
                            className="absolute bg-sahara-gold/20 w-[1px] h-32 blur-[2px] animate-[flow_5s_linear_infinite]"
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
                <div className="flex justify-between items-start opacity-40">
                    <div className="text-[10px] font-mono text-sahara-gold space-y-1">
                        <p className="tracking-widest robotic-digits">LAT: 30.0444° N</p>
                        <p className="tracking-widest robotic-digits">LON: 31.2357° E</p>
                        <p className="text-[8px] opacity-50 underline uppercase">Signal_Lock: Cairo_Giza_Node</p>
                    </div>
                    <div className="text-[10px] font-mono text-right text-gray-500">
                        <p>NETWORK_UPTIME: 99.99%</p>
                        <p className="animate-pulse text-green-500 font-black">● PULSE_SYNC: ACTIVE</p>
                    </div>
                </div>
                
                {/* Center Crosshair HUD */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="w-[80%] h-[80%] border border-sahara-gold/20 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute w-[70%] h-[70%] border-t border-b border-sahara-gold/40 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                </div>

                <div className="flex justify-between items-end opacity-40">
                    <div className="text-[7px] font-mono text-gray-400 uppercase tracking-[0.5em]">
                        Elevator_Vertical_Sync_v4.0 // Hyper_Pulsar
                    </div>
                    <div className="w-40 h-[1px] bg-sahara-gold/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-sahara-gold w-1/3 animate-[loading_2s_linear_infinite]" />
                    </div>
                </div>
            </div>

            {/* Ad Creative Container */}
            <div 
                className="relative w-full max-w-[850px] aspect-square transition-transform duration-300 ease-out z-10"
                style={{ 
                    transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
                    filter: 'drop-shadow(0 0 100px rgba(0,0,0,0.8))'
                }}
            >
                {/* The Ad Creative */}
                <NextImage 
                    src="/campaigns/lever-pioneer/ad-v2.png" 
                    alt="Lever Pioneer Ad v2" 
                    fill
                    className="object-contain relative z-10 rounded-[3rem]"
                    priority
                />

                {/* --- FULL ANIMATION LAYERS --- */}

                {/* 1. Elevator Vertical Energy Pulse (Going Up/Down) */}
                <div className="absolute left-[45%] top-[15%] w-[10%] h-[55%] z-20 pointer-events-none overflow-hidden">
                    <div className="absolute inset-x-0 h-32 bg-gradient-to-t from-transparent via-sahara-gold to-transparent opacity-60 animate-[elevator_4s_ease-in-out_infinite] blur-xl" />
                    <div className="absolute inset-x-0 h-4 bg-white/40 animate-[elevator_4s_ease-in-out_infinite] blur-sm" />
                </div>

                {/* 2. Constant Icon Beacons (Signal Pulses) */}
                <div className="absolute top-[8%] left-[7%] w-[35%] h-[35%] z-25 pointer-events-none">
                     <div className="absolute top-[35%] left-[35%] w-10 h-10 border-2 border-green-500/40 rounded-full animate-ping" />
                </div>
                <div className="absolute top-[12%] right-[10%] w-[35%] h-[35%] z-25 pointer-events-none">
                     <div className="absolute top-[30%] right-[30%] w-12 h-12 border-2 border-sahara-gold/40 rounded-full animate-[ping_3s_linear_infinite]" />
                </div>
                <div className="absolute bottom-[22%] left-[10%] w-[35%] h-[35%] z-25 pointer-events-none">
                     <div className="absolute bottom-[35%] left-[35%] w-8 h-8 border-2 border-white/30 rounded-full animate-ping" />
                </div>

                {/* 3. Neon Light Flicker Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay">
                    <div className="absolute top-[65%] left-[25%] w-[50%] h-[10%] bg-blue-500/20 blur-3xl animate-[flicker_2s_infinite]" />
                    <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-sahara-gold/10 blur-3xl animate-[flicker_3s_infinite]" />
                </div>

                {/* Cinematic Scanner Lines */}
                <div className="absolute inset-x-12 inset-y-16 z-30 pointer-events-none overflow-hidden rounded-[4rem]">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold to-transparent absolute top-0 left-0 animate-[scan_8s_ease-in-out_infinite] opacity-40 shadow-[0_0_40px_rgba(212,175,55,1)]" />
                </div>
                
                {/* Interactive Signal Hotspots */}
                <a 
                    href="https://wa.me/201111171368" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-[8%] left-[7%] w-[35%] h-[35%] z-40 group"
                    title="WhatsApp"
                >
                    <span className="absolute inset-4 rounded-full border border-green-500/30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a 
                    href="https://www.google.com/maps?q=29.9656242,31.0922895" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-[8%] right-[7%] w-[35%] h-[35%] z-40 group"
                    title="Location"
                >
                    <span className="absolute inset-8 rounded-full border border-sahara-gold/30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a 
                    href="tel:+201070615372" 
                    className="absolute bottom-[22%] left-[7%] w-[35%] h-[28%] z-40 group"
                    title="Call"
                >
                    <span className="absolute inset-0 rounded-full border border-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a 
                    href="/lever-pioneer" 
                    className="absolute bottom-[4%] right-[7%] w-[50%] h-[18%] z-40 group"
                    title="Hub"
                />
            </div>

            <style jsx global>{`
                @keyframes elevator {
                    0% { transform: translateY(500px); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateY(-100px); opacity: 0; }
                }
                @keyframes scan {
                    0% { transform: translateY(-100px); }
                    100% { transform: translateY(900px); }
                }
                @keyframes float {
                    0% { transform: translate(0, 0); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translate(150px, -300px); opacity: 0; }
                }
                @keyframes flow {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-500px); opacity: 0; }
                }
                @keyframes flicker {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.6; }
                    51% { opacity: 0.1; }
                    52% { opacity: 0.7; }
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
