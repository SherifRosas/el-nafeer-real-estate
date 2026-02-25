'use client'

import { useLanguage } from '../LanguageContext'
import PropertyGrid from './PropertyGrid'

interface Property {
    id: string
    title: string
    titleAr?: string
    location: string
    locationAr?: string
    price: number
    status: string
    images?: string[]
}

interface MasterPropertiesContentProps {
    properties: Property[]
    ownerId: string
}

export default function MasterPropertiesContent({ properties, ownerId }: MasterPropertiesContentProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
                <div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
                        {isArabic ? (
                            <>إدارة <span className="text-sahara-gold">المخزون</span></>
                        ) : (
                            <>INVENTORY_<span className="text-sahara-gold">MANAGEMENT</span></>
                        )}
                    </h2>
                    <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">
                        {isArabic ? 'إدارة_وتتبع_محفظة_العقارات_الفاخرة_الخاصة_بك' : 'MANAGE_AND_TRACK_YOUR_LUXURY_PROPERTY_PORTFOLIO'}
                    </p>
                </div>
                <div className="flex gap-4 p-4 milky-glass rounded-3xl border border-white/5 rtl:flex-row-reverse">
                    <div className="px-6 py-2 border-r border-white/10 rtl:border-r-0 rtl:border-l">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest robotic-digits">{isArabic ? 'متاح' : 'ONLINE'}</p>
                        <p className="text-3xl font-black text-sahara-gold italic tracking-tighter robotic-digits">{properties.filter(p => p.status === 'available').length}</p>
                    </div>
                    <div className="px-6 py-2">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest robotic-digits">{isArabic ? 'الإجمالي' : 'TOTAL_UNITS'}</p>
                        <p className="text-3xl font-black text-white italic tracking-tighter robotic-digits">{properties.length}</p>
                    </div>
                </div>
            </div>

            <PropertyGrid properties={properties} ownerId={ownerId} />
        </div>
    )
}
