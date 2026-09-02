import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import BuyButton from './BuyButton'
import CheckoutWidget from '@/components/screen-store/CheckoutWidget'
import ClosePanelButton from '@/components/screen-store/ClosePanelButton'
import CheckoutOverlay from '@/components/screen-store/CheckoutOverlay'

// Generate standard Next.js metadata for Facebook/Twitter and regular SEO
export async function generateMetadata({ params }: { params: Promise<{ screenId: string }> }): Promise<Metadata> {
  const { screenId } = await params;
  const screen = await prisma.screen.findUnique({
    where: { id: screenId },
  })

  if (!screen) return { title: 'Screen Not Found' }

  const shortDesc = screen.description 
    ? screen.description.slice(0, 150) + (screen.description.length > 150 ? '...' : '') 
    : `Buy ${screen.name} at El-Ekhwa Screens in Hadayek Al-Ahram.`

  return {
    title: `${screen.name} | El-Ekhwa Screens`,
    description: shortDesc,
    openGraph: {
      title: `${screen.name} - EGP ${screen.discountPrice.toLocaleString()}`,
      description: shortDesc,
      images: [screen.imageUrl],
      type: 'website',
    },
  }
}

export default async function ScreenDetailPage({ params }: { params: Promise<{ screenId: string }> }) {
  const { screenId } = await params;
  const screen = await prisma.screen.findUnique({
    where: { id: screenId },
  })

  if (!screen) {
    notFound()
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-6 pt-8">
        <Link 
          href="/hadayek-al-ahram-screen-store-and-repair" 
          className="text-slate-500 hover:text-slate-900 font-medium inline-flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m15 18-6-6 6-6"/></svg>
          العودة للمتجر
        </Link>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          
          {/* Left: Image Showcase */}
          <div className="relative w-full aspect-square lg:aspect-auto lg:min-h-[600px] bg-slate-100/50 p-8 md:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
            {/* Standard img tag to prevent Next/Image Supabase domain issues */}
            <img 
              src={screen.imageUrl} 
              alt={screen.name}
              className="w-full h-full object-contain max-h-[500px] drop-shadow-2xl transition-transform hover:scale-105 duration-500"
            />
            {screen.discountPrice < screen.basePrice && (
              <div className="absolute top-8 left-8 bg-red-600 text-white font-black px-4 py-2 rounded-lg shadow-lg uppercase tracking-wider text-sm">
                تخفيض
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
                {screen.name}
              </h1>
              
              <div className="flex flex-col mt-6 gap-3">
                <div className="flex items-end gap-4">
                  <span className="text-4xl lg:text-5xl font-black text-red-600">
                    {screen.discountPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م
                  </span>
                  {screen.discountPrice < screen.basePrice && (
                    <span className="text-xl lg:text-2xl text-slate-400 line-through font-medium mb-1">
                      {screen.basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ج.م
                    </span>
                  )}
                </div>
                
                <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-2 rounded-lg self-start">
                  <span className="text-lg">🚚</span>
                  <span className="text-sm font-bold tracking-wide">التوصيل للجيزة والقاهرة: 500 ج.م</span>
                </div>

                {/* Azmyco-style Warranty Trust Badge */}
                <div className="mt-2 inline-flex items-center gap-3 bg-[#e8f5e9] border border-[#a5d6a7] text-[#2e7d32] px-4 py-3 rounded-lg self-start shadow-sm w-full md:w-auto">
                  <span className="text-xl">✅</span>
                  <div className="flex flex-col">
                    <span className="text-base font-extrabold">المنتج بضمان الوكيل</span>
                    <span className="text-sm font-semibold opacity-90">مركز الخدمة والصيانة 19960</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-slate prose-lg max-w-none mb-12 border-t border-slate-100 pt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">تفاصيل المنتج</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {screen.description || 'شاشة عالية الجودة. تواصل معنا لمزيد من التفاصيل.'}
              </p>
            </div>

            <div className="mt-auto">
              {/* Render the Client Component for the Buy button */}
              <BuyButton inStock={screen.inStock} />
            </div>

          </div>
        </div>
      </div>

      {/* Slide-out Checkout Panel Container (Hidden by default) */}
      <div id="checkout-panel" className="hidden fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.15)] z-50 transform transition-transform border-l border-slate-200 overflow-y-auto">
         <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md p-6 lg:px-8 z-10">
            <h2 className="text-2xl font-extrabold text-slate-900">تأكيد الطلب</h2>
            <ClosePanelButton />
         </div>
         
         <div className="px-6 lg:px-8 pb-8 h-[calc(100%-100px)]">
            <CheckoutWidget 
              screenId={screen.id} 
              screenName={screen.name} 
              discountPrice={screen.discountPrice} 
            />
         </div>
      </div>
      
      {/* Interactive Overlay Client Component */}
      <CheckoutOverlay />
    </main>
  )
}
