export default function ScreenStoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      {/* The "Banner" / Storefront Header mimicking the Facelift Image */}
      <div className="bg-[#111318] pt-12 pb-16 px-4 border-b-8 border-slate-900 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow mimicking streetlights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative">
          {/* The main signboard box with white LED border */}
          <div className="relative border-4 border-white/90 rounded-sm p-8 md:p-12 text-center shadow-[0_0_40px_rgba(255,255,255,0.15)] bg-gradient-to-b from-[#1c1f26] to-[#12141a] overflow-hidden">
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
            <h1 className="text-5xl md:text-7xl font-black text-[#e0f7fa] tracking-tight mb-2 relative z-10 font-sans leading-tight" 
                style={{
                  textShadow: '0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.2)'
                }}>
              الأخوة للشاشات والصيانة
            </h1>
            <p className="text-cyan-200/80 text-lg md:text-xl font-medium mt-4 tracking-wide max-w-2xl mx-auto relative z-10 drop-shadow-md">
              بيع وشراء الشاشات | صيانة احترافية | حدائق الأهرام
            </p>
          </div>

          {/* Supports (the pillars holding the sign) */}
          <div className="absolute -bottom-16 left-8 w-16 h-16 bg-[#181a20] border-x border-[#2a2d35]" />
          <div className="absolute -bottom-16 right-8 w-16 h-16 bg-[#181a20] border-x border-[#2a2d35]" />
        </div>
      </div>

      <div className="pb-16">
        {children}
      </div>
    </div>
  )
}
