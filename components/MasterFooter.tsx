'use client'

import { useLanguage } from './LanguageContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MasterFooter() {
    const { language } = useLanguage()
    const pathname = usePathname()
    const isArabic = language === 'ar'

    // Cinematic Portals should be exclusive and full-screen without the global footer
    const isPortal = pathname?.includes('/portal/') || pathname?.includes('/lever-pioneer/');
    const isBeitAlKhair = pathname?.includes('/beit-alkhair');
    const isNarco = pathname?.includes('/حطب-أفريقي') || pathname?.includes('/firewood') || pathname?.includes(encodeURI('/حطب-أفريقي'));

    // Absolute Tail Removal for elite immersion
    if (isPortal || isBeitAlKhair || isNarco) return null;

    return (
        <footer className="relative milky-glass border-t border-white/10 py-6 overflow-hidden">
            {/* Digital Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-8">
                    {/* Unified Logo & Mission */}
                    <div className="flex items-center justify-center md:justify-start">
                        <Link href={isBeitAlKhair ? "/beit-alkhair" : "/"} dir="ltr" className="flex items-center gap-5 group cursor-pointer inline-flex">
                            <div className={`w-12 h-12 md:w-16 md:h-16 bg-[#0a0a0a] shadow-[0_0_10px_rgba(212,175,55,0.2)] rounded-xl p-1.5 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-sahara-gold/30 ${isBeitAlKhair ? 'quantum-luxe-logo-container' : ''}`}>
                                <img
                                    src={isBeitAlKhair ? '/assets/branding/logo.png' : (isArabic ? '/logos/logo-ar.png' : '/logos/logo-en.png')}
                                    alt={isBeitAlKhair ? "Beit Al-Khair Logo" : "EL-NAFEER Logo"}
                                    className="w-full h-full object-contain relative z-10"
                                />
                                {isBeitAlKhair && <div className="quantum-luxe-logo-shine" />}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className={`text-2xl md:text-3xl font-black italic tracking-tighter transition-all duration-500 text-transparent bg-clip-text bg-gradient-to-r from-[#e6c27a] via-[#d4af37] to-[#aa8825] drop-shadow-[0_0_4px_rgba(212,175,55,0.3)] group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]`}>
                                    {isBeitAlKhair ? (isArabic ? "بيت الخير" : "BEIT AL-KHAIR") : "EL-NAFEER"}
                                </h3>
                                <div className="h-0.5 w-8 bg-gradient-to-r from-[#d4af37] to-[#aa8825] mt-1 group-hover:w-full transition-all duration-500 shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
                            </div>
                        </Link>
                    </div>

                    {/* Project Masters Node */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-end space-y-3">
                        <h4 className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-2 flex items-center justify-center md:justify-end gap-2">
                            <span className="w-2 h-2 rounded-full bg-sahara-gold animate-pulse" />
                            {isArabic ? 'أسياد_المشروع' : 'PROJECT_MASTERS'}
                        </h4>
                        <div className="group flex flex-col items-center md:items-end">
                            <p className="text-sm font-black tracking-widest uppercase text-white group-hover:text-sahara-gold transition-colors">Sherif Rosas</p>
                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-1 mb-2 italic">
                                {isArabic ? 'مطور الذكاء الاصطناعي وماستر المنصة' : 'AI Developer & Platform Master'}
                            </p>
                            <a href="tel:+201065661882" className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg hover:bg-sahara-gold hover:text-black transition-all flex items-center justify-center">
                                <span className="text-sm">📞</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Final Protocol Row */}
                <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] robotic-digits">
                            &copy; {new Date().getFullYear()} EL-NAFEER_PRESTIGE_DOMAINS // V3.5_ELITE
                        </p>
                        <p className="text-[9px] font-bold text-white/5 uppercase tracking-[0.2em] italic">
                            Proprietary AI Architecture & Robotic Real Estate Orchestration.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <a href="mailto:sherifrosas.ai@gmail.com" className="text-[10px] font-black text-gray-500 hover:text-white transition-colors transition-all robotic-digits">
                            CENTRAL_MAIL@EL_NAFEER.AI
                        </a>
                        <div className="w-[1px] h-4 bg-white/10 hidden md:block" />
                        <div className="flex gap-6">
                            <Link href="/privacy" className="text-[9px] font-black text-gray-600 hover:text-sahara-gold transition-colors uppercase tracking-widest">
                                Privacy.exe
                            </Link>
                            <Link href="/terms" className="text-[9px] font-black text-gray-600 hover:text-sahara-gold transition-colors uppercase tracking-widest">
                                Terms.sys
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Glow Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sahara-gold to-transparent opacity-50" />
        </footer>
    )
}
