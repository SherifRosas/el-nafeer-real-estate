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
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-sahara-gold/5 via-transparent to-blue-900/10 animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                
                {/* Floating Gold Dust */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div 
                            key={i}
                            className={`absolute w-1 h-1 bg-sahara-gold rounded-full opacity-20 blur-[1px] animate-[float_10s_linear_infinite]`}
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Robotic HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 p-10 flex flex-col justify-between opacity-40">
                <div className="flex justify-between items-start">
                    <div className="text-[10px] font-mono text-sahara-gold space-y-1">
                        <p className="tracking-widest">LAT: 30.0444° N</p>
                        <p className="tracking-widest">LON: 31.2357° E</p>
                        <p className="text-[8px] opacity-50 underline uppercase">Signal_Lock: Cairo_Giza_Node</p>
                    </div>
                    <div className="text-[10px] font-mono text-right text-gray-500">
                        <p>NETWORK_UPTIME: 100.00%</p>
                        <p className="animate-pulse text-green-500 font-black">● PULSE: ACTIVE</p>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <div className="text-[7px] font-mono text-gray-700 uppercase tracking-[0.5em]">
                        Lever_Pioneer_Elite_Solo_Pulse_v3.0 // 2026_Distribution
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

                {/* Cinematic Scanner Overlay */}
                <div className="absolute inset-x-12 inset-y-16 z-20 pointer-events-none overflow-hidden rounded-[4rem]">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/70 to-transparent absolute top-0 left-0 animate-[scan_6s_ease-in-out_infinite] opacity-60 shadow-[0_0_40px_rgba(212,175,55,1)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30" />
                </div>
                
                {/* Interactive Signal Pulses */}
                
                {/* WhatsApp Signal (Top Left) */}
                <a 
                    href="https://wa.me/201111171368" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-[8%] left-[7%] w-[35%] h-[35%] z-30 group"
                    title="WhatsApp Channel"
                >
                    <span className="absolute inset-4 rounded-full border border-green-500/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute inset-0 rounded-full bg-green-500/5 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Location Lock (Top Right) */}
                <a 
                    href="https://www.google.com/maps?q=29.9656242,31.0922895" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-[8%] right-[7%] w-[35%] h-[35%] z-30 group"
                    title="GPS Location"
                >
                    <span className="absolute inset-8 rounded-full border border-sahara-gold/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute inset-0 rounded-full bg-sahara-gold/5 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Call Signal (Bottom Left) */}
                <a 
                    href="tel:+201070615372" 
                    className="absolute bottom-[22%] left-[7%] w-[35%] h-[28%] z-30 group"
                    title="Direct Call"
                >
                    <span className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute inset-0 rounded-full bg-white/5 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Campaign Pulse (Bottom Center/Right) */}
                <a 
                    href="/lever-pioneer" 
                    className="absolute bottom-[4%] right-[7%] w-[50%] h-[18%] z-30 group"
                    title="Main Control Hub"
                >
                    <span className="absolute inset-0 rounded-3xl border border-sahara-gold/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
            </div>

            <style jsx global>{`
                @keyframes scan {
                    0% { transform: translateY(-100px); }
                    100% { transform: translateY(900px); }
                }
                @keyframes float {
                    0% { transform: translate(0, 0); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translate(150px, -300px); opacity: 0; }
                }
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }
            `}</style>
        </div>
    )
}
