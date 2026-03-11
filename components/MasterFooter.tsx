'use client'

import { useLanguage } from './LanguageContext'
import Link from 'next/link'

export default function MasterFooter() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <footer className="relative milky-glass border-t border-white/10 py-24 overflow-hidden">
            {/* Digital Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Unified Logo & Mission */}
                    <div className="lg:col-span-1 space-y-8">
                        <Link href="/" className="flex items-center gap-4 group cursor-pointer inline-flex">
                            <div className="w-20 h-20 bg-white shadow-[0_0_30px_rgba(255,255,255,0.1)] rounded-2xl p-2 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/20">
                                <img
                                    src="/logos/official-logo-dark.jfif"
                                    alt="EL-NAFEER Official Logo"
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black italic tracking-tighter text-white group-hover:text-sahara-gold transition-colors">
                                    EL-NAFEER
                                </h3>
                                <div className="h-1 w-12 bg-sahara-gold mt-1 group-hover:w-20 transition-all duration-500" />
                            </div>
                        </Link>
                        <div className="space-y-4">
                            <p className="text-gray-400 font-bold leading-relaxed uppercase tracking-tight text-xs border-l-2 border-sahara-gold/30 pl-4 py-1">
                                {isArabic
                                    ? 'التكنولوجيا الرائدة لتجربة عقارية استثنائية في قلب مصر.'
                                    : 'Pioneering technology for an exceptional real estate experience in the heart of Egypt.'}
                            </p>
                            <p className="text-gray-500 font-bold uppercase text-[10px] leading-relaxed tracking-wider max-w-md italic">
                                {isArabic
                                    ? 'نعيد تعريف الفخامة العقارية من خلال قوة الذكاء الاصطناعي وفن التصميم المعاصر.'
                                    : 'Redefining luxury real estate through the raw power of AI orchestration and contemporary architectural mastery.'}
                            </p>
                        </div>
                    </div>

                    {/* Project Masters Node */}
                    <div className="lg:col-span-1 space-y-8">
                        <h4 className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-4 flex items-center gap-2 rtl:flex-row-reverse">
                            <span className="w-2 h-2 rounded-full bg-sahara-gold animate-pulse" />
                            {isArabic ? 'أسياد_المشروع' : 'PROJECT_MASTERS'}
                        </h4>
                        <div className="space-y-8">
                            {/* Master 1: Sherif Rosas */}
                            <div className="group">
                                <p className="text-sm font-black tracking-widest uppercase text-white group-hover:text-sahara-gold transition-colors">Sherif Rosas</p>
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-1 mb-3 italic">
                                    {isArabic ? 'مطور الذكاء الاصطناعي وماستر المنصة' : 'AI Developer & Platform Master'}
                                </p>
                                <div className="flex gap-3">
                                    <a href="tel:+201065661882" className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-sahara-gold hover:text-black transition-all flex items-center justify-center flex-1 gap-2 rtl:flex-row-reverse">
                                        <span className="text-xs">📞</span>
                                        <span className="text-[10px] font-black robotic-digits">+20 106 566 1882</span>
                                    </a>
                                </div>
                            </div>

                            {/* Master 2: Ahmed Abdel Sattar */}
                            <div className="group border-t border-white/5 pt-8">
                                <p className="text-sm font-black tracking-widest uppercase text-white group-hover:text-sahara-gold transition-colors">Ahmed Abdel Sattar</p>
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-1 mb-3 italic">
                                    {isArabic ? 'الماستر التنفيذي والتنسيق العام' : 'Executive Master & Coordination'}
                                </p>
                                <div className="flex gap-3">
                                    <a href="tel:+201055907971" className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-sahara-gold hover:text-black transition-all flex items-center justify-center flex-1 gap-2 rtl:flex-row-reverse">
                                        <span className="text-xs">📞</span>
                                        <span className="text-[10px] font-black robotic-digits">+20 10 55907971</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Nodes */}
                    <div className="lg:col-span-1 space-y-8">
                        <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4">
                            {isArabic ? 'نقاط_الوصول' : 'ACCESS_NODES'}
                        </h4>
                        <ul className="grid grid-cols-1 gap-4">
                            {[
                                { en: 'Properties', ar: 'الأصول_العقارية', href: '/admin/master/properties' },
                                { en: 'Applications', ar: 'طلبات_المستخدمين', href: '/admin/master/applications' },
                                { en: 'Support', ar: 'نواة_الدعم', href: '/admin/login' },
                                { en: 'Contact', ar: 'الاتصال_المباشر', href: '/admin/login' }
                            ].map((item) => (
                                <li key={item.en}>
                                    <Link href={item.href} className="text-[11px] font-black text-gray-500 hover:text-white hover:pl-2 transition-all uppercase tracking-widest flex items-center gap-2 rtl:flex-row-reverse">
                                        <span className="w-1.5 h-1.5 bg-sahara-gold/40 rounded-full" />
                                        {isArabic ? item.ar : item.en}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Global Data Mesh */}
                    <div className="lg:col-span-1 space-y-8">
                        <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4">
                            {isArabic ? 'الوصول_العالمي' : 'GLOBAL_REACH'}
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                            {['FB', 'TW', 'LI', 'IG', 'WA', 'YT'].map(social => (
                                <div key={social} className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-sahara-gold hover:text-black hover:scale-105 transition-all cursor-pointer robotic-digits shadow-lg shadow-black/20">
                                    {social}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Protocol Row */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
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
