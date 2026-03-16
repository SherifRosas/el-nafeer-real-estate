'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/LanguageContext'

export default function AdV2Preview() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-0 m-0 overflow-hidden relative">
            {/* Neural Background Flow */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-sahara-gold/10 via-transparent to-blue-900/10 animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            <div className="relative w-full max-w-[850px] aspect-square animate-in fade-in zoom-in duration-[2000ms] shadow-[0_0_150px_rgba(212,175,55,0.1)]">
                {/* The Ad Creative */}
                <Image 
                    src="/campaigns/lever-pioneer/ad-v2.png" 
                    alt="Lever Pioneer Ad v2" 
                    fill
                    className="object-contain relative z-10"
                    priority
                />

                {/* Cinematic Scanner Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[4rem]">
                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-sahara-gold to-transparent absolute top-0 left-0 animate-[scan_4s_ease-in-out_infinite] opacity-40 shadow-[0_0_20px_rgba(212,175,55,1)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
                </div>
                
                {/* Interactive Pulsing Hubs */}
                
                {/* WhatsApp Pulse (Top Left) */}
                <div className="absolute top-[8%] left-[7%] w-[35%] h-[35%] z-30 group cursor-pointer">
                    <a 
                        href="https://wa.me/201111171368" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full h-full relative"
                    >
                        <span className="absolute inset-0 rounded-full border-2 border-green-500/50 animate-ping opacity-0 group-hover:opacity-100" />
                        <span className="absolute -inset-4 rounded-full bg-green-500/10 animate-pulse opacity-0 group-hover:opacity-100" />
                    </a>
                </div>

                {/* Location Pulse (Top Right) */}
                <div className="absolute top-[8%] right-[7%] w-[35%] h-[35%] z-30 group cursor-pointer">
                    <a 
                        href="https://www.google.com/maps?q=29.9656242,31.0922895" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full h-full relative"
                    >
                        <span className="absolute inset-0 rounded-full border-2 border-sahara-gold/50 animate-ping opacity-0 group-hover:opacity-100" />
                        <span className="absolute -inset-4 rounded-full bg-sahara-gold/10 animate-pulse opacity-0 group-hover:opacity-100" />
                    </a>
                </div>

                {/* Call Pulse (Bottom Left) */}
                <div className="absolute bottom-[22%] left-[7%] w-[35%] h-[28%] z-30 group cursor-pointer">
                    <a 
                        href="tel:+201070615372" 
                        className="block w-full h-full relative"
                    >
                        <span className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping opacity-0 group-hover:opacity-100" />
                        <span className="absolute -inset-4 rounded-full bg-white/10 animate-pulse opacity-0 group-hover:opacity-100" />
                    </a>
                </div>

                {/* Ramadan Pulse (Bottom Center) - Redirects to main hub */}
                <div className="absolute bottom-[4%] right-[7%] w-[50%] h-[18%] z-30 group cursor-pointer">
                    <a 
                        href="/lever-pioneer" 
                        className="block w-full h-full relative"
                    >
                        <span className="absolute inset-0 rounded-2xl border-2 border-sahara-gold/30 animate-pulse opacity-0 group-hover:opacity-100" />
                    </a>
                </div>
            </div>

            <style jsx global>{`
                @keyframes scan {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(800px); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}
