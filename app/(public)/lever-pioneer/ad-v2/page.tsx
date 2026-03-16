'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/LanguageContext'

export default function AdV2Preview() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-0 m-0 overflow-hidden">
            <div className="relative w-full max-w-[800px] aspect-square animate-in fade-in zoom-in duration-1000 shadow-[0_0_100px_rgba(0,0,0,1)]">
                {/* The Ad Creative */}
                <Image 
                    src="/campaigns/lever-pioneer/ad-v2.png" 
                    alt="Lever Pioneer Ad v2" 
                    fill
                    className="object-contain"
                    priority
                />
                
                {/* Clickable Hotspots */}
                
                {/* WhatsApp Signal (Top Left) */}
                <a 
                    href="https://wa.me/201111171368" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-[5%] left-[5%] w-[40%] h-[40%] z-20"
                    title="WhatsApp"
                />

                {/* Geographic Lock (Top Right) */}
                <a 
                    href="https://www.google.com/maps?q=29.9656242,31.0922895" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-[5%] right-[5%] w-[40%] h-[40%] z-20"
                    title="Location"
                />

                {/* Direct Voice Comm (Bottom Left) */}
                <a 
                    href="tel:+201070615372" 
                    className="absolute bottom-[20%] left-[5%] w-[40%] h-[30%] z-20"
                    title="Call Now"
                />

                {/* Branding Reset (Center/Logo) */}
                <a 
                    href="/lever-pioneer" 
                    className="absolute bottom-[5%] right-[5%] w-[50%] h-[20%] z-20"
                    title="Main Hub"
                />
            </div>
        </div>
    )
}
