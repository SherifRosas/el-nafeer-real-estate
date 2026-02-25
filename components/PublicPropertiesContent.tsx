'use client'

import { useLanguage } from './LanguageContext'
import Image from 'next/image'
import Link from 'next/link'

interface Property {
    id: string
    title: string
    titleAr?: string
    description?: string
    descriptionAr?: string
    price: number
    location: string
    locationAr?: string
    images?: string[]
    type?: string
    status: string
}

interface PublicPropertiesProps {
    properties: Property[]
}

export default function PublicPropertiesContent({ properties }: PublicPropertiesProps) {
    const { language } = useLanguage()
    const isArabic = language === 'ar'

    return (
        <div className="min-h-screen bg-[#020202] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
            {/* Background Cyber Mesh */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/grid.svg')] bg-repeat shadow-inner" />
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sahara-gold/[0.03] blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full animate-pulse delay-1000" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-32">
                    <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 milky-glass mb-10 shadow-xl">
                        <span className="w-2 h-2 bg-sahara-gold rounded-full animate-ping shadow-[0_0_15px_rgba(212,175,55,1)]" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em] robotic-digits">
                            {isArabic ? 'الأصول_المعتمدة_v3.5' : 'CERTIFIED_ASSETS_v3.5'}
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 text-white leading-none">
                        {isArabic ? (
                            <>معرض <span className="text-sahara-gold">الأصول</span></>
                        ) : (
                            <>ASSET_<span className="text-sahara-gold">GALLERY</span></>
                        )}
                    </h1>
                    <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.8em] robotic-digits">
                        {isArabic ? 'استكشاف_النوادي_النخبوية' : 'EXPLORE_ELITE_TERMINAL_NODES'}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {properties.length === 0 ? (
                        <div className="col-span-full h-96 milky-glass rounded-[4rem] border border-white/10 flex flex-col items-center justify-center gap-8 text-center px-10">
                            <span className="text-8xl grayscale opacity-10">🏢</span>
                            <p className="text-[12px] font-black text-gray-700 uppercase tracking-[0.6em] robotic-digits leading-relaxed">
                                {isArabic ? 'لم_يتم_مزامنة_أصول_في_هذه_المنطقة' : 'NO_ASSETS_SYNCHRONIZED_IN_THIS_REGION'}
                            </p>
                        </div>
                    ) : (
                        properties.map((property) => (
                            <Link
                                href={`/real-estate/${property.id}`}
                                key={property.id}
                                className="group relative rounded-[3.5rem] overflow-hidden milky-glass border border-white/10 transition-all duration-700 hover:border-sahara-gold/50 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:translate-y-[-10px]"
                            >
                                {/* Property Image Terminal */}
                                <div className="aspect-[4/5] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700 z-10" />
                                    {property.images && property.images[0] ? (
                                        <Image
                                            src={property.images[0]}
                                            alt={property.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-8xl grayscale opacity-10">🏢</div>
                                    )}
                                    {/* Availability Tag */}
                                    <div className="absolute top-10 left-10 z-20">
                                        <span className="px-6 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-sahara-gold/30 text-sahara-gold text-[9px] font-black uppercase tracking-[0.4em] robotic-digits">
                                            {isArabic ? 'نشط' : 'ACTIVE'}
                                        </span>
                                    </div>
                                </div>

                                {/* Property Data Overlay */}
                                <div className="p-10 relative z-20">
                                    <div className="flex items-center justify-between mb-8 rtl:flex-row-reverse border-b border-white/5 pb-6">
                                        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-sahara-gold transition-colors truncate max-w-[70%]">
                                            {isArabic ? property.titleAr || property.title : property.title}
                                        </h2>
                                        <div className="text-right rtl:text-left">
                                            <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest mb-1 robotic-digits">{isArabic ? 'القيمة' : 'VALUATION'}</p>
                                            <p className="text-xl font-black text-sahara-gold italic robotic-digits">
                                                {property.price.toLocaleString()} <span className="text-[10px]">EGP</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 mb-10 rtl:flex-row-reverse">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shadow-lg border border-white/10">📍</div>
                                        <div>
                                            <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest robotic-digits">{isArabic ? 'الإحداثيات' : 'COORDINATES'}</p>
                                            <p className="text-sm font-bold text-gray-400 uppercase italic tracking-tighter">
                                                {isArabic ? property.locationAr || property.location : property.location}
                                            </p>
                                        </div>
                                    </div>

                                    <button className="w-full py-5 rounded-[2rem] bg-white text-black font-black text-[10px] uppercase tracking-[0.6em] transition-all hover:bg-sahara-gold shadow-xl robotic-digits">
                                        {isArabic ? 'بدء_الاستحواذ' : 'INITIATE_ACQUISITION'}
                                    </button>
                                </div>

                                {/* Hover HUD Element */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/50 to-transparent scale-x-0 group-hover:scale-x-75 transition-transform duration-1000" />
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
