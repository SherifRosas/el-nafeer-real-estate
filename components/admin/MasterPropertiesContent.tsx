'use client'

import { useLanguage } from '@/components/LanguageContext'
import { useState } from 'react'

interface Property {
  id: string
  title: string
  location: string
  price: number
  type: string
  status: string
  property_owners?: {
    companyName: string
  }
}

interface MasterPropertiesContentProps {
  initialProperties: Property[]
}

export default function MasterPropertiesContent({ initialProperties }: MasterPropertiesContentProps) {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProperties = initialProperties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.property_owners?.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8 rtl:flex-row-reverse text-center md:text-left rtl:md:text-right">
        <div className="space-y-4">
          <div className="flex items-center gap-6 justify-center md:justify-start rtl:flex-row-reverse">
            <div className="w-14 h-14 rounded-2xl bg-sahara-gold/10 flex items-center justify-center text-3xl border border-sahara-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              🏠
            </div>
            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
              {isArabic ? <>كتالوج <span className="text-sahara-gold">الأصول</span></> : <>PROPERTY_<span className="text-sahara-gold">INVENTORY</span></>}
            </h1>
          </div>
          <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">
            {isArabic ? 'إدارة_ومراقبة_جميع_الوحدات_العقارية_المدرجة' : 'MONITOR_ALL_REGISTERED_REAL_ESTATE_ASSETS'}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <span className="text-[11px] font-black text-sahara-gold bg-sahara-gold/10 px-8 py-4 rounded-full border border-sahara-gold/20 uppercase tracking-[0.4em] robotic-digits">
            {initialProperties.length} {isArabic ? 'عقدة_نشطة' : 'ACTIVE_NODES'}
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="px-8 flex justify-center lg:justify-start">
        <div className="w-full max-w-2xl relative group">
          <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none text-sahara-gold/40 group-focus-within:text-sahara-gold transition-colors text-xl">🔍</div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isArabic ? 'البحث_عن_أصل_أو_موقع_أو_مالك...' : 'SEARCH_ASSET_LOCATION_OR_OWNER...'}
            className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] py-8 pl-20 pr-10 text-white font-black italic focus:border-sahara-gold/40 outline-none transition-all placeholder:text-gray-700 uppercase tracking-widest text-xs"
          />
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-8 pb-20">
        {filteredProperties.length === 0 ? (
          <div className="col-span-full h-96 milky-glass rounded-[4.5rem] border border-white/10 flex flex-col items-center justify-center gap-8 text-center bg-black/20 group">
            <span className="text-8xl grayscale opacity-10 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">🏗️</span>
            <p className="text-[12px] font-black text-gray-700 uppercase tracking-[0.6em] robotic-digits">
              {isArabic ? 'لم_يتم_العثور_على_أصول_مطابقة' : 'NO_MATCHING_ASSETS_DETECTED'}
            </p>
          </div>
        ) : (
          filteredProperties.map((p, i) => (
            <div key={p.id} className="milky-glass rounded-[4rem] overflow-hidden border border-white/10 hover:border-sahara-gold/40 transition-all duration-700 group flex flex-col shadow-2xl relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sahara-gold/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
              
              <div className="h-60 bg-[#050505] relative overflow-hidden flex items-center justify-center p-12">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
                <div className="relative z-20 text-center">
                   <p className="text-[50px] opacity-[0.03] font-black italic absolute inset-0 flex items-center justify-center tracking-tighter select-none group-hover:scale-110 transition-transform duration-1000">EL_NAFEER</p>
                   <div className="w-20 h-20 mx-auto rounded-3xl border border-sahara-gold/20 flex items-center justify-center text-4xl bg-sahara-gold/5 mb-4 group-hover:rotate-12 transition-all">🏠</div>
                </div>
                <div className="absolute top-8 left-8 z-30 bg-sahara-gold text-black text-[9px] font-black uppercase tracking-[0.3em] px-6 py-2.5 rounded-full shadow-[0_10px_20px_rgba(212,175,55,0.3)]">
                  {(p.status || 'active').toUpperCase()}
                </div>
              </div>

              <div className="p-12 space-y-8 flex-1 flex flex-col">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest robotic-digits">
                    ID_#{p.id.substring(0, 8).toUpperCase()} // NODE_{String(i + 1).padStart(3, '0')}
                  </p>
                  <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter truncate group-hover:text-sahara-gold transition-colors">
                    {p.title}
                  </h4>
                  <div className="flex items-center gap-3 text-gray-500 font-bold uppercase tracking-wider text-xs">
                    <span className="text-sahara-gold">📍</span>
                    {p.location}
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                   <div className="flex justify-between items-center rtl:flex-row-reverse">
                      <span className="text-[10px] text-gray-700 font-black uppercase tracking-widest leading-none">{isArabic ? 'المالك_الرئيسي' : 'MASTER_OWNER'}</span>
                      <span className="text-xs font-black text-white italic truncate max-w-[150px]">{p.property_owners?.companyName || 'N/A'}</span>
                   </div>
                   <div className="flex justify-between items-center rtl:flex-row-reverse">
                      <span className="text-[10px] text-gray-700 font-black uppercase tracking-widest leading-none">{isArabic ? 'نوع_العقار' : 'UNIT_SPECTRUM'}</span>
                      <span className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-sahara-gold tracking-[0.2em] uppercase">{p.type || 'standard'}</span>
                   </div>
                </div>

                <div className="pt-8 mt-auto flex items-center justify-between rtl:flex-row-reverse">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-1">{isArabic ? 'تقييم_الأصل' : 'ASSET_VALUATION'}</span>
                    <span className="text-3xl font-black text-white italic robotic-digits leading-none">
                      {(p.price || 0).toLocaleString()} <span className="text-xs text-sahara-gold not-italic ml-1">EGP</span>
                    </span>
                  </div>
                  <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-sahara-gold hover:text-black transition-all group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    →
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
