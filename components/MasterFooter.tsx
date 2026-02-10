'use client'

import { useLanguage } from './LanguageContext'
import Link from 'next/link'

export default function MasterFooter() {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <footer className="relative bg-[#000408] border-t border-white/5 py-24 overflow-hidden">
            {/* Glossy Overlay */}
            <div className="absolute inset-0 liquid-gloss opacity-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="lg:col-span-1 space-y-8">
                        <div className="flex items-center gap-6 group">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl p-4 prestige-card flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-sahara-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <img
                                    src={isArabic ? '/logos/logo-ar.png' : '/logos/logo-en.png'}
                                    alt="EL-NAFEER Logo"
                                    className="w-full h-full object-contain relative z-10"
                                />
                            </div>
                            <h3 className="text-2xl font-black italic tracking-tighter text-white group-hover:text-sahara-gold transition-colors">
                                EL-NAFEER
                            </h3>
                        </div>
                        <p className="text-gray-500 font-bold leading-relaxed uppercase tracking-tight">
                            {isArabic
                                ? 'التكنولوجيا الرائدة لتجربة عقارية استثنائية في قلب مصر.'
                                : 'Pioneering technology for an exceptional real estate experience in the heart of Egypt.'}
                        </p>
                        <p className="text-gray-400 font-bold uppercase text-[11px] leading-relaxed tracking-wider max-w-md">
                            {isArabic
                                ? 'نعيد تعريف الفخامة العقارية من خلال قوة الذكاء الاصطناعي وفن التصميم المعاصر.'
                                : 'Redefining luxury real estate through the raw power of AI orchestration and contemporary architectural mastery.'}
                        </p>
                    </div>

                    {/* Developer Branding */}
                    <div className="lg:col-span-1 space-y-8">
                        <h4 className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-4">Developed By</h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-lg font-black tracking-tighter uppercase italic text-white hover:text-sahara-gold transition-colors cursor-default">Sherif Rosas</p>
                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none mt-2">AI Developer & Platform Master</p>
                            </div>
                            <div className="space-y-2 pt-4">
                                <a href="mailto:sherifrosas.ai@gmail.com" className="block text-sm font-bold text-gray-400 hover:text-white transition-colors">
                                    sherifrosas.ai@gmail.com
                                </a>
                                <a href="tel:+201065661882" className="block text-sm font-bold text-gray-400 hover:text-white transition-colors" dir="ltr">
                                    +20 106 566 1882
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-1 space-y-8 text-left">
                        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">Access Nodes</h4>
                        <ul className="space-y-4">
                            {['Properties', 'Applications', 'Support', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase()}`} className="text-sm font-bold text-gray-500 hover:text-sahara-gold transition-colors uppercase tracking-widest">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social/Secondary */}
                    <div className="lg:col-span-1 space-y-8">
                        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">Global Reach</h4>
                        <div className="flex flex-wrap gap-4">
                            {['FB', 'TW', 'LI', 'IG', 'WA'].map(social => (
                                <div key={social} className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-400 hover:bg-sahara-gold hover:text-black hover:scale-110 transition-all cursor-pointer">
                                    {social}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
                            &copy; {new Date().getFullYear()} EL-NAFEER PRESTIGE DOMAINS // ALL RIGHTS RESERVED
                        </p>
                        <p className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                            Proprietary AI Architecture & Cybernetic Design Systems.
                        </p>
                    </div>

                    <div className="flex items-center gap-10">
                        <Link href="/privacy" className="text-[10px] font-black text-gray-600 hover:text-sahara-gold transition-colors uppercase tracking-[0.3em]">
                            {isArabic ? 'سياسة الخصوصية' : 'Privacy Protocol'}
                        </Link>
                        <div className="w-[1px] h-4 bg-white/10" />
                        <Link href="/terms" className="text-[10px] font-black text-gray-600 hover:text-sahara-gold transition-colors uppercase tracking-[0.3em]">
                            {isArabic ? 'الشروط والأحكام' : 'Terms of Engagement'}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Extreme Tail Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/20 to-transparent" />
        </footer>
    )
}
