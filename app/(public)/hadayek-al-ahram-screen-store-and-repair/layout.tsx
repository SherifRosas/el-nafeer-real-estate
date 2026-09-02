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

      <div className="pb-16">
        {children}
      </div>

      {/* Floating Repair Lead Widget */}
      <RepairLeadWidget />
    </div>
  )
}
