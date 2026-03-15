'use client'

import { useLanguage } from '../LanguageContext'
import OwnerManagement from './OwnerManagement'

interface MasterOwnersContentProps {
    owners: any[]
}

export default function MasterOwnersContent({ owners }: MasterOwnersContentProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
                <div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
                        {isArabic ? (
                            <>تنسيق <span className="text-sahara-gold">العقارات</span></>
                        ) : (
                            <>BRAND_<span className="text-sahara-gold">ORCHESTRATION</span></>
                        )}
                    </h2>
                    <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">
                        {isArabic ? 'إدارة_وتفويض_الأنظمة_الفرعية_للمطورين_العالميين' : 'MANAGE_AND_AUTHORIZE_GLOBAL_DEVELOPER_SUBSYSTEMS'}
                    </p>
                </div>
                <div className="flex gap-6 p-6 milky-glass rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] rtl:flex-row-reverse">
                    <div className="px-10 border-r rtl:border-r-0 rtl:border-l border-white/10 text-center">
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em] mb-2 robotic-digits">{isArabic ? 'حمل_الشبكة' : 'NETWORK_LOAD'}</p>
                        <p className="text-3xl font-black text-sahara-gold robotic-digits">14.2%</p>
                    </div>
                    <div className="px-10 text-center">
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em] mb-2 robotic-digits">{isArabic ? 'العقد_النشطة' : 'ACTIVE_NODES'}</p>
                        <p className="text-3xl font-black text-white robotic-digits">{owners.length || '0'}</p>
                    </div>
                </div>
            </div>

            <div className="milky-glass rounded-[4.5rem] border border-white/10 p-1 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                <OwnerManagement initialOwners={owners} />
            </div>
        </div>
    )
}
