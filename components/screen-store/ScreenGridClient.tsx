'use client'

import { useState } from 'react'
import Link from 'next/link'

type Screen = {
  id: string
  name: string
  description: string | null
  basePrice: number
  discountPrice: number
  imageUrl: string
  inStock: boolean
}

export default function ScreenGridClient({ screens }: { screens: Screen[] }) {
  const [activeBrand, setActiveBrand] = useState<string>('الكل')

  // Simple hardcoded brand detection from name
  const extractBrand = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('samsung') || lowerName.includes('سامسونج')) return 'SAMSUNG'
    if (lowerName.includes('lg') || lowerName.includes('ال جي')) return 'LG'
    if (lowerName.includes('toshiba') || lowerName.includes('توشيبا')) return 'TOSHIBA'
    if (lowerName.includes('sony') || lowerName.includes('سوني')) return 'SONY'
    if (lowerName.includes('tornado') || lowerName.includes('تورنيدو')) return 'TORNADO'
    return 'OTHER'
  }

  const filteredScreens = screens.filter(screen => {
    if (activeBrand === 'الكل') return true
    return extractBrand(screen.name) === activeBrand
  })

  // Brands present in the current inventory
  const availableBrands = Array.from(new Set(screens.map(s => extractBrand(s.name))))
    .filter(b => b !== 'OTHER')

  return (
    <div className="w-full">
      {/* Brand Filter Buttons */}
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
        <button
          onClick={() => setActiveBrand('الكل')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${
            activeBrand === 'الكل'
              ? 'bg-[#dc2626] text-white shadow-md scale-105'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          الكل
        </button>
        {availableBrands.map(brand => (
          <button
            key={brand}
            onClick={() => setActiveBrand(brand)}
            className={`px-6 py-2 rounded-full font-bold text-sm tracking-wider transition-all shadow-sm ${
              activeBrand === brand
                ? 'bg-[#dc2626] text-white shadow-md scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {filteredScreens.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl text-slate-600 font-semibold">لا توجد شاشات لهذه الماركة.</h2>
          <button onClick={() => setActiveBrand('الكل')} className="text-blue-500 mt-2 underline">عرض كل الشاشات</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredScreens.map((screen) => {
            const brand = extractBrand(screen.name)
            
            // Calculate discount percentage
            const hasDiscount = screen.discountPrice < screen.basePrice
            const discountPercent = hasDiscount 
              ? Math.round(((screen.basePrice - screen.discountPrice) / screen.basePrice) * 100)
              : 0

            return (
              <div 
                key={screen.id} 
                className="group flex flex-col bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link 
                  href={`/hadayek-al-ahram-screen-store-and-repair/${screen.id}`}
                  className="relative block w-full aspect-square md:aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100 p-4 cursor-pointer"
                >
                  {/* Small Brand Logo/Text */}
                  {brand !== 'OTHER' && (
                    <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm text-[10px] md:text-xs font-black tracking-widest text-slate-800">
                      {brand}
                    </div>
                  )}

                  {/* Percentage Discount Badge (Azmyco Style) */}
                  {hasDiscount && (
                    <div className="absolute top-3 left-3 z-10 bg-[#dc2626] text-white text-[11px] md:text-sm font-black px-2.5 py-1 rounded-lg shadow-md tracking-wider">
                      -{discountPercent}%
                    </div>
                  )}

                  <img
                    src={screen.imageUrl}
                    alt={screen.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </Link>
                
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-base md:text-xl font-bold text-slate-900 mb-2 line-clamp-2 leading-tight">
                    {screen.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex flex-col gap-1 border-t border-slate-100">
                    <span className="text-slate-400 line-through text-xs md:text-sm font-medium">
                      {screen.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م
                    </span>
                    <span className="text-[#dc2626] font-extrabold text-xl md:text-2xl">
                      {screen.discountPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م
                    </span>
                  </div>
                  
                  {/* "Buy Now" button mimicking Azmyco style (Red, full width) */}
                  <Link 
                    href={`/hadayek-al-ahram-screen-store-and-repair/${screen.id}`}
                    className="mt-6 w-full inline-flex items-center justify-center bg-[#dc2626] hover:bg-red-700 text-white font-bold py-2.5 md:py-3 px-4 rounded-xl transition-colors text-sm md:text-base shadow-md hover:shadow-lg"
                  >
                    شراء الآن
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
