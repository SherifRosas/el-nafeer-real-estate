import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { prisma } from '@/lib/db'
import ScreenGridClient from '@/components/screen-store/ScreenGridClient'

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
          <ScreenGridClient screens={screens} />
        )}
      </div>
    </main>
  )
}
