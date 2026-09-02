import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import RepairLeadWidget from '@/components/RepairLeadWidget'

export default function ScreenStoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      
      {/* Red Contact Header (Azmyco Style) */}
      <div className="bg-[#dc2626] text-white py-1.5 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center text-[11px] md:text-xs font-bold tracking-wide z-50 relative">
        <div className="flex items-center gap-4">
          <a href="tel:01288341064" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span dir="ltr">01288341064</span>
            <span>:اتصل بنا</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <a href="mailto:contact@elekhwa.com" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            <span>contact@elekhwa.com</span>
          </a>
        </div>
      </div>

      {/* Floating Social Icons */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        <a href="https://wa.me/201288341064" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
        </a>
        <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
      </div>

      {/* Utility Top Bar */}
      <div className="bg-[#0a0b0e] py-2 px-6 flex justify-between items-center border-b border-slate-800">
        <a 
          href="https://www.google.com/maps/place/29%C2%B057'55.9%22N+31%C2%B005'38.1%22E/@29.9655372,31.0913469,17z/data=!3m1!4b1!4m4!3m3!8m2!3d29.9655372!4d31.0939218?hl=en&entry=ttu&g_ep=EgoyMDI2MDgzMC4wIKXMDSoASAFQAw%3D%3D" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
        >
          <span className="text-sm">📍</span>
          <span>موقع المعرض</span>
        </a>
        <Link 
          href="/admin/login?callbackUrl=/admin/screen-uploader" 
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ShieldCheck size={14} />
          <span>إدارة المتجر</span>
        </Link>
      </div>

      {/* The "Banner" / Storefront Header mimicking the Facelift Image */}
      <div className="bg-[#111318] pt-6 pb-8 px-4 border-b-8 border-slate-900 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow mimicking streetlights */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-cyan-900/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative">
          {/* The main signboard box with white LED border */}
          <div className="relative border-4 border-white/90 rounded-sm p-4 md:p-6 text-center shadow-[0_0_30px_rgba(255,255,255,0.15)] bg-gradient-to-b from-[#1c1f26] to-[#12141a] overflow-hidden">
            {/* Top inner white glow (mimicking the LED tube inside) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 shadow-[0_5px_15px_rgba(255,255,255,0.5)]" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/40 shadow-[0_-5px_15px_rgba(255,255,255,0.5)]" />
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-white/40 shadow-[5px_0_15px_rgba(255,255,255,0.5)]" />
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-white/40 shadow-[-5px_0_15px_rgba(255,255,255,0.5)]" />

            {/* Downlights (mimicking the ceiling spots) */}
            <div className="absolute -top-4 left-1/4 w-8 h-8 bg-white/20 blur-xl rounded-full" />
            <div className="absolute -top-4 left-1/2 w-8 h-8 bg-white/20 blur-xl rounded-full" />
            <div className="absolute -top-4 right-1/4 w-8 h-8 bg-white/20 blur-xl rounded-full" />

            {/* Glowing Neon Text */}
            <h1 className="text-4xl md:text-5xl font-black text-[#e0f7fa] tracking-tight mb-1 relative z-10 font-sans leading-tight" 
                style={{
                  textShadow: '0 0 8px rgba(0,255,255,0.8), 0 0 15px rgba(0,255,255,0.5), 0 0 30px rgba(0,255,255,0.3)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.2)'
                }}>
              الأخوة للشاشات والصيانة
            </h1>
            <p className="text-cyan-200/80 text-sm md:text-lg font-medium mt-2 tracking-wide max-w-2xl mx-auto relative z-10 drop-shadow-md">
              بيع وشراء الشاشات | صيانة احترافية | حدائق الأهرام
            </p>
          </div>

          {/* Supports (the pillars holding the sign) */}
          <div className="absolute -bottom-8 left-8 w-16 h-8 bg-[#181a20] border-x border-[#2a2d35]" />
          <div className="absolute -bottom-8 right-8 w-16 h-8 bg-[#181a20] border-x border-[#2a2d35]" />
        </div>
      </div>

      <div className="pb-24">
        {children}
      </div>

      {/* Floating Repair Lead Widget */}
      <RepairLeadWidget />
    </div>
  )
}
