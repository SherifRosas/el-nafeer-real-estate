import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { prisma } from '@/lib/db'

// 1. Export Metadata for SEO
export const metadata: Metadata = {
  title: 'Screens for Sale & Repair | Hadayek Al-Ahram',
  description: 'Top quality TV and computer screens for sale and professional screen repair services in Hadayek Al-Ahram, Giza.',
  manifest: '/screen-store-manifest.json',
}

export default async function ScreenStorePage() {
  // 2. Fetch all screens in stock ordered by newest first
  const screens = await prisma.screen.findMany({
    where: {
      inStock: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // 3. Generate JSON-LD Script tag for ElectronicsStore
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "name": "El-Ekhwa Screens",
    "description": "Top quality TV and computer screens for sale and professional screen repair services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hadayek Al-Ahram",
      "addressLocality": "Giza",
      "addressRegion": "Giza Governorate",
      "addressCountry": "EG"
    }
  }

  // Note: NO AI or Chatbot components are imported or rendered on this page as requested.

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Inject JSON-LD */}
      <Script
        id="store-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-7xl mx-auto pt-8">
        {screens.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl text-slate-600 font-semibold">لا توجد شاشات متاحة حالياً.</h2>
            <p className="text-slate-500 mt-2">تحقق قريباً من المخزون الجديد!</p>
          </div>
        ) : (
          /* 4. Responsive CSS Grid: 2 cols on mobile, 3 on desktop */
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {screens.map((screen) => (
              <div 
                key={screen.id} 
                className="group flex flex-col bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-full aspect-square md:aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
                  {/* Standard img tag to avoid next/image domain configuration issues with Supabase URLs */}
                  <img
                    src={screen.imageUrl}
                    alt={screen.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {screen.discountPrice < screen.basePrice && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wide">
                      تخفيض
                    </div>
                  )}
                </div>
                
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-base md:text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                    {screen.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex flex-col gap-1 border-t border-slate-100">
                    <span className="text-slate-400 line-through text-xs md:text-sm font-medium">
                      {screen.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م
                    </span>
                    <span className="text-red-600 font-extrabold text-lg md:text-2xl">
                      {screen.discountPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م
                    </span>
                  </div>
                  
                  <Link 
                    href={`/hadayek-al-ahram-screen-store-and-repair/${screen.id}`}
                    className="mt-6 w-full inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 md:py-3 px-4 rounded-xl transition-colors text-sm md:text-base shadow-md hover:shadow-lg"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
