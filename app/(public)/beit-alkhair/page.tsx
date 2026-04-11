import { db } from '@/lib/supabase'
import BeitAlKhairUnifiedConsole from '@/components/BeitAlKhairUnifiedConsole'

export const metadata = {
  title: 'Beit Al-Khair | Neural War Room',
  description: 'Absolute Real Estate Domination HUD for Beit Al-Khair.',
}

export default async function BeitAlKhairPage() {
  const properties = await db.getPublicProperties()
  const beitAlKhairProperties = properties.filter(p => 
    p.property_owners?.companyName?.includes('Beit Al-Khair') || 
    p.location.toLowerCase().includes('lotus') || 
    p.location.toLowerCase().includes('toukh') ||
    p.location.toLowerCase().includes('banha')
  )

  return (
    <main className="h-screen w-screen bg-[#000428] text-white overflow-hidden flex flex-col p-4 md:p-6 selection:bg-sahara-gold selection:text-black font-sans">
      {/* 🔮 LUXE_HUD_OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/grid.svg')] bg-repeat" />
      <div className="fixed top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-sahara-gold/5 to-transparent pointer-events-none" />

      {/* 📟 TOP_LEVEL_OS_HEADER */}
      <header className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/5 pb-4 px-2 relative z-10">
        <div className="flex items-center gap-6">
            <div className="w-10 h-10 border-2 border-sahara-gold rounded-xl flex items-center justify-center font-black text-sahara-gold text-lg italic shadow-[0_0_20px_rgba(212,175,55,0.25)]">BK</div>
            <div>
                <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none">BEIT <span className="text-sahara-gold">AL-KHAIR</span></h1>
                <p className="text-[7px] font-black text-gray-500 uppercase tracking-[0.6em] robotic-digits leading-none mt-1.5">SOVEREIGN_NETWORK // v2.1.0</p>
            </div>
        </div>
        <div className="hidden md:flex items-center gap-10">
            <div className="text-right">
                <p className="text-[8px] font-black text-sahara-gold uppercase tracking-[0.4em] leading-none">REDUCING_BALANCE_ENABLED</p>
                <div className="flex gap-1 justify-end mt-1.5">
                  {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-0.5 bg-sahara-gold/40" />)}
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-gray-400 robotic-digits uppercase tracking-widest leading-none mb-1">NODE_LOCATION</span>
                <span className="text-[9px] font-black text-white italic uppercase tracking-widest leading-none underline decoration-sahara-gold/40">QALYUBIA_DOMAIN</span>
            </div>
        </div>
      </header>

      {/* 🕹️ MAIN_CONSOLE_BODY */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 min-h-0 relative z-10">
        
        {/* 📋 TACTICAL_SIDEBAR */}
        <aside className="lg:col-span-3 flex flex-col gap-4 min-h-0 order-2 lg:order-1">
            {/* Project HUD */}
            <div className="flex-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between gap-8 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sahara-gold to-transparent" />
                
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-sahara-gold rounded-full" />
                      <span className="text-[8px] font-black text-sahara-gold uppercase tracking-[0.4em]">ADMIN_INTEL</span>
                    </div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">SYSTEM<br/><span className="text-sahara-gold">COMMAND</span></h2>
                </div>

                <div className="space-y-6">
                    {[
                        { label: 'FINANCE_ENGINE', value: '10%_REDUCING' },
                        { label: 'DOWN_PAYMENT', value: '40%_MANDATORY' },
                        { label: 'TENURE_DOMAIN', value: '1-3_YEAR_SYNC' }
                    ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                            <p className="text-[7px] font-black text-gray-600 uppercase tracking-widest leading-none">{item.label}</p>
                            <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-white/5">
                   <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-relaxed italic">
                       Deploying sovereign financial protocols to ensure immediate market domination.
                   </p>
                </div>
            </div>

            {/* CTA_IGNITION_NODE */}
            <div className="bg-sahara-gold rounded-[2.5rem] p-6 shadow-[0_20px_60px_rgba(212,175,55,0.2)] flex flex-col gap-4 group cursor-pointer hover:scale-[1.02] transition-all">
                <a 
                    href="https://wa.me/201033332112?text=I%20am%20interested%20in%20Beit%20Al-Khair%20Tactical%20Acquisition%20(Ref:beit-alkhair-luxe)"
                    className="flex flex-col gap-2"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-black/50 uppercase tracking-[0.5em]">COMMAND_LINK</span>
                        <span className="text-xl">⚡</span>
                    </div>
                    <span className="text-md font-black text-black uppercase tracking-tighter italic">EXECUTE_RESERVATION</span>
                </a>
            </div>
        </aside>

        {/* 🕸️ THE_NEURAL_COMMAND_CENTER (Stateful Unified Console) */}
        <section className="lg:col-span-9 bg-black/20 backdrop-blur-xl rounded-[3rem] border border-white/10 relative overflow-hidden order-1 lg:order-2">
            <BeitAlKhairUnifiedConsole 
              properties={beitAlKhairProperties} 
            />
        </section>

      </div>

      {/* 📟 BOTTOM_STATUS_TICKER */}
      <footer className="mt-4 md:mt-6 border-t border-white/5 pt-4 flex justify-between items-center relative z-10 px-2">
        <div className="flex items-center gap-4 text-[7px] font-black text-gray-600 uppercase tracking-[0.4em] italic leading-none">
            <span className="w-1.5 h-1.5 bg-sahara-gold rounded-full animate-pulse shadow-[0_0_10px_#c5a059]" />
            NETWORK_STATUS // SECURE_CONSOL_ENCRYPTED
        </div>
        <div className="flex items-center gap-8 text-[9px] font-black leading-none">
            <span className="text-gray-700 uppercase tracking-[0.4em]">ALL_RIGHTS_RESERVED // 2026</span>
            <span className="text-sahara-gold italic tracking-[0.2em] font-extrabold select-none">BEIT_AL_KHAIR_DEV</span>
        </div>
      </footer>
    </main>
  )
}
