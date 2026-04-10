import { db } from '@/lib/supabase'
import BeitAlKhairNeuralGrid from '@/components/admin/BeitAlKhairNeuralGrid'

export const metadata = {
  title: 'Beit Al-Khair | Neural War Room',
  description: 'Absolute Real Estate Domination HUD for Beit Al-Khair.',
}

export default async function BeitAlKhairPage() {
  const properties = await db.getPublicProperties()
  const beitAlKhairProperties = properties.filter(p => 
    p.property_owners?.companyName?.includes('Beit Al-Khair') || 
    p.location.includes('Lotus') || 
    p.location.includes('Toukh') ||
    p.location.includes('Banha')
  )

  return (
    <main className="h-screen w-screen bg-[#050505] text-white overflow-hidden flex flex-col p-4 md:p-6 selection:bg-sahara-gold selection:text-black">
      {/* 📟 TOP_LEVEL_OS_HEADER */}
      <header className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/5 pb-4 px-2">
        <div className="flex items-center gap-6">
            <div className="w-10 h-10 border-2 border-sahara-gold rounded-xl flex items-center justify-center font-black text-sahara-gold text-lg italic shadow-[0_0_20px_rgba(212,175,55,0.25)]">BK</div>
            <div>
                <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none">BEIT <span className="text-sahara-gold">AL-KHAIR</span></h1>
                <p className="text-[7px] font-black text-gray-700 uppercase tracking-[0.6em] robotic-digits leading-none mt-1.5">SOVEREIGN_NETWORK // v1.0.4</p>
            </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
                <p className="text-[9px] font-black text-sahara-gold uppercase tracking-[0.4em] leading-none">PROTOCAL: LOTUS_DOMINATION</p>
                <p className="text-[7px] font-black text-gray-800 uppercase tracking-[0.2em] leading-none mt-1">STATUS: 100/100_STABILITY</p>
            </div>
            <div className="w-px h-10 bg-white/5" />
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-white robotic-digits">04.10.2026</span>
                <span className="text-[10px] font-black text-sahara-gold robotic-digits animate-pulse">LIVE_SYNC</span>
            </div>
        </div>
      </header>

      {/* 🕹️ MAIN_CONSOLE_BODY */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 min-h-0">
        
        {/* 📋 TACTICAL_SIDEBAR */}
        <aside className="lg:col-span-3 flex flex-col gap-4 min-h-0 order-2 lg:order-1">
            {/* Project HUD */}
            <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 flex flex-col justify-center gap-8 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-sahara-gold/[0.03] to-transparent" />
                
                <div className="space-y-2 relative z-10">
                    <span className="text-[9px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-2">INTEL // AL-QASR_SERIES</span>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">THE NEURAL <span className="text-sahara-gold">GRID</span></h2>
                </div>

                <div className="space-y-6 relative z-10">
                    {[
                        { label: 'GEO_FENCE', value: 'BANHA // TOUKH // LOTUS' },
                        { label: 'CAPACITY', value: '80%_SYNC_COMPLETE' },
                        { label: 'MARKET_NODE', value: 'HIGH_URGENCY' }
                    ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                            <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest leading-none">{item.label}</p>
                            <p className="text-[11px] font-black text-white uppercase tracking-widest">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5 relative z-10">
                   <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                       Revolutionizing residential acquisition nodes across Cairo and Qalyubia. Experience the future of market domination.
                   </p>
                </div>
            </div>

            {/* CTA_IGNITION_NODE */}
            <div className="bg-sahara-gold rounded-[2.5rem] p-6 shadow-[0_20px_60px_rgba(212,175,55,0.25)] flex flex-col gap-4 group cursor-pointer hover:scale-[1.02] transition-all">
                <a 
                    href="https://wa.me/201033332112?text=I%20am%20interested%20in%20Beit%20Al-Khair%20Al-Qasr%20Project%20(Ref:beit-alkhair-elite)"
                    className="flex flex-col gap-2"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-black/50 uppercase tracking-[0.5em]">DIRECT_COMMAND</span>
                        <span className="text-xl">📞</span>
                    </div>
                    <span className="text-lg font-black text-black uppercase tracking-tighter italic">WHATSAPP_COMMAND</span>
                </a>
            </div>
        </aside>

        {/* 🕸️ THE_NEURAL_COMMAND_CENTER */}
        <section className="lg:col-span-9 bg-black rounded-[3rem] border border-white/10 relative overflow-hidden order-1 lg:order-2">
            <BeitAlKhairNeuralGrid 
              properties={beitAlKhairProperties} 
              userRole="customer" 
            />
            
            {/* HUD Overlay Stats */}
            <div className="absolute top-10 left-10 pointer-events-none hidden md:block">
                <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-sahara-gold uppercase tracking-[0.4em]">PROXIMITY_TELEMETRY</span>
                    <span className="text-[10px] font-black text-white uppercase robotic-digits shadow-black shadow-sm">SCANNING_INVENTORY_MATRIX...</span>
                </div>
            </div>
        </section>

      </div>

      {/* 📟 BOTTOM_STATUS_TICKER */}
      <footer className="mt-4 md:mt-6 border-t border-white/5 pt-4 flex justify-between items-center">
        <div className="flex items-center gap-4 text-[8px] font-black text-gray-700 uppercase tracking-[0.5em] italic">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            PLATFORM_SECURE // AES_256_ENCRYPTED
        </div>
        <div className="flex items-center gap-8">
            <span className="text-[8px] font-black text-gray-800 uppercase tracking-[0.3em]">ALL_RIGHTS_RESERVED // 2026</span>
            <span className="text-[10px] font-black text-sahara-gold robotic-digits select-none italic">EL_NAFEER_CO.</span>
        </div>
      </footer>
    </main>
  )
}
