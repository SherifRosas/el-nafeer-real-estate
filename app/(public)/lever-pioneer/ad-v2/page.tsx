'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/LanguageContext'

export default function AdV2Preview() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 sm:p-12">
            <div className="max-w-4xl w-full space-y-8 animate-in fade-in zoom-in duration-1000">
                {/* Header HUD */}
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                    <div>
                        <h1 className="text-sm font-black text-sahara-gold uppercase tracking-[0.4em] robotic-digits">NEURAL_AD_PULSE_v2.0</h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{isArabic ? 'معاينة الإعلان النشطة' : 'ACTIVE_AD_PREVIEW'}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] text-green-500 font-black tracking-widest uppercase animate-pulse">● LIVE_SIGNAL</span>
                    </div>
                </div>

                {/* Ad Container */}
                <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />
                    <Image 
                        src="/campaigns/lever-pioneer/ad-v2.png" 
                        alt="Lever Pioneer Ad v2" 
                        width={1200} 
                        height={1200}
                        className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Floating Info Overlays */}
                    <div className="absolute bottom-10 left-10 z-20 space-y-2">
                        <span className="px-3 py-1 rounded-lg bg-green-600 text-[8px] font-black uppercase tracking-widest">WhatsApp Link Active</span>
                        <div className="text-xl font-black italic uppercase tracking-tighter">
                            {isArabic ? 'صعود رمضان ٢٠٢٦' : 'RAMADAN_ASCENT_2026'}
                        </div>
                    </div>
                </div>

                {/* Strategy Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                        <h3 className="text-white border-b border-white/10 pb-2 mb-4">{isArabic ? 'خطة النبضة الواحدة' : 'SOLO_PULSE_STRATEGY'}</h3>
                        <div className="flex justify-between">
                            <span>{isArabic ? 'التوزيع أسبوعي' : 'FREQUENCY'}</span>
                            <span className="text-sahara-gold">1 AD / WEEK</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{isArabic ? 'الاستهداف' : 'TARGET'}</span>
                            <span className="text-white">CAIRO & GIZA</span>
                        </div>
                    </div>
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                        <h3 className="text-white border-b border-white/10 pb-2 mb-4">{isArabic ? 'إشارات التواصل' : 'CONTACT_SIGNALS'}</h3>
                        <div className="flex justify-between">
                            <span>WHATSAPP</span>
                            <span className="text-green-500">+201111171368</span>
                        </div>
                        <div className="flex justify-between">
                            <span>VOICE</span>
                            <span className="text-white">+201070615372</span>
                        </div>
                    </div>
                </div>

                {/* Footer Footer */}
                <p className="text-center text-[8px] text-gray-800 font-black uppercase tracking-[1em] pt-12 pb-20">
                    LEVER_PIONEER_AD_UNIT_ID: 8DFF70F2
                </p>
            </div>
        </div>
    )
}
