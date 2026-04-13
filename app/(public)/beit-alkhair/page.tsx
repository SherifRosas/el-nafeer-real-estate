import { db } from '@/lib/supabase'
import BeitAlKhairUnifiedConsole from '@/components/BeitAlKhairUnifiedConsole'

export const metadata = {
  title: 'Beit Al-Khair | Quantum HUD',
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
    <main className="h-screen w-screen bg-[#050811] text-white overflow-hidden flex flex-col p-3 lg:p-6 selection:bg-sahara-gold selection:text-black font-sans relative">
      {/* 🚀 QUANTUM_HUD_LAYERS */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[url('/grid.svg')] bg-repeat z-0" />
      <div className="hud-sweep z-[100]" />
      
      {/* 📟 TOP_LEVEL_SYMMETRIC_HEADER */}
      <header className="flex justify-between items-end mb-2 lg:mb-8 border-b border-sahara-gold/20 pb-2 lg:pb-6 px-2 lg:px-4 relative z-50">
        <div className="flex items-center gap-4 lg:gap-8">
            <div className="w-10 h-10 lg:w-14 lg:h-14 bg-black border lg:border-2 border-sahara-gold rounded-xl lg:rounded-2xl flex items-center justify-center font-black text-sahara-gold text-lg lg:text-2xl italic shadow-[0_0_30px_rgba(212,175,55,0.3)] group hover:rotate-6 transition-transform">BK</div>
            <div className="flex flex-col">
                <h1 className="text-xl lg:text-4xl font-black italic uppercase tracking-[-0.05em] leading-none mb-1 text-luxury-gold">
                  BEIT AL-KHAIR
                </h1>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-sahara-gold rounded-full animate-pulse" />
                  <p className="text-[6px] lg:text-[8px] font-black text-gray-500 uppercase tracking-[0.4em] lg:tracking-[0.8em] robotic-digits">SOVEREIGN_NETWORK // v3.0.0_QUANTUM</p>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-6 lg:gap-16">
            <div className="text-right hidden xl:block">
                <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.5em] mb-1 italic">AMORTIZATION_SYNC_ACTIVE</p>
                <div className="flex gap-2 justify-end">
                  {[1,2,3,4,5,6].map(i => <div key={i} className="w-3 h-1 bg-sahara-gold/20 rounded-full" />)}
                </div>
            </div>
            <div className="hidden lg:block w-px h-12 bg-white/10" />
            <div className="flex flex-col items-end">
                <span className="text-[6px] lg:text-[10px] font-black text-gray-400 robotic-digits uppercase tracking-widest leading-none mb-1 lg:mb-2">DOMAIN_COORDINATES</span>
                <span className="text-[8px] lg:text-xs font-black text-white italic uppercase tracking-[0.2em] lg:tracking-[0.3em] leading-none border-b border-sahara-gold shadow-[0_5px_15px_rgba(212,175,55,0.1)]">QALYUBIA_DOMAIN_HUB</span>
            </div>
        </div>
      </header>

      {/* 🕹️ MAIN_CONSOLE_BODY */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 min-h-0 relative z-40">
        
        {/* 📋 TACTICAL_SIDEBAR */}
        <aside className="lg:col-span-3 hidden lg:flex flex-col gap-6 min-h-0 order-2 lg:order-1">
            {/* Project HUD */}
            <div className="flex-1 prestige-glass rounded-[3.5rem] p-10 flex flex-col justify-between relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-sahara-gold to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-sahara-gold/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-[1px] bg-sahara-gold shadow-[0_0_10px_#c5a059]" />
                      <span className="text-[9px] font-black text-sahara-gold uppercase tracking-[0.6em] italic">ADMIN_INTEL_STREAM</span>
                    </div>
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-[0.8] mb-4">
                      SYSTEM<br/><span className="text-luxury-gold">CONSOLE</span>
                    </h2>
                </div>

                <div className="space-y-8">
                    {[
                        { label: 'FINANCE_ENGINE_v3', value: '10%_REDUCING' },
                        { label: 'LIQUIDITY_MANDATE', value: '40%_DOWN' },
                        { label: 'SYNC_PERIOD', value: '12-36_MO' }
                    ].map((item, idx) => (
                        <div key={idx} className="space-y-2">
                            <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-none">{item.label}</p>
                            <p className="text-xs font-black text-white uppercase tracking-[0.3em] robotic-digits border-l-2 border-sahara-gold/20 pl-4">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-white/10">
                   <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-relaxed italic opacity-60">
                       ESTABLISHING_SOVEREIGN_NODE_DOMINANCE...
                   </p>
                </div>
            </div>

            {/* CTA_BUTTON_LUXE */}
            <div className="bg-sahara-gold rounded-[3rem] p-8 shadow-[0_30px_80px_rgba(212,175,55,0.25)] flex flex-col gap-4 group cursor-pointer hover:scale-[1.03] transition-all hover:rotate-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <a 
                    href="https://wa.me/201033332112?text=I%20am%20interested%20in%20Beit%20Al-Khair%20Quantum%20Acquisition%20(Ref:beit-alkhair-quantum)"
                    className="flex flex-col gap-3"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-black/60 uppercase tracking-[0.5em]">DIRECT_LINK</span>
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-sahara-gold animate-bounce">⚡</div>
                    </div>
                    <span className="text-xl font-black text-black uppercase tracking-tighter italic leading-none">INITIATE_RESERVATION</span>
                </a>
            </div>
        </aside>

        {/* 🕸️ THE_NEURAL_COMMAND_CENTER (Quantum Unified Console) */}
        <section className="lg:col-span-9 bg-black/40 backdrop-blur-3xl rounded-[2rem] lg:rounded-[4rem] border-2 border-white/5 relative overflow-hidden order-1 lg:order-2 shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            <BeitAlKhairUnifiedConsole 
              properties={beitAlKhairProperties} 
            />
        </section>

      </div>

      {/* 📟 BOTTOM_STATUS_TICKER */}
      <footer className="mt-2 lg:mt-8 border-t border-white/10 pt-2 lg:pt-6 flex justify-between items-center relative z-50 px-2 lg:px-4">
        <div className="flex items-center gap-3 lg:gap-6 text-[6px] lg:text-[8px] font-black text-gray-600 uppercase tracking-[0.3em] lg:tracking-[0.6em] italic leading-none">
            <div className="flex gap-1">
                {[1,2,3].map(i => <div key={i} className="w-1 lg:w-2 h-1 lg:h-2 bg-sahara-gold rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
            </div>
            ENCRYPTED_NEURAL_UPLINK // ESTABLISHED
        </div>
        <div className="flex items-center gap-4 lg:gap-12 text-[6px] lg:text-[10px] font-black leading-none robotic-digits">
            <span className="text-gray-700 uppercase tracking-[0.2em] lg:tracking-[0.4em]">SOVEREIGN_COPYRIGHT // 2026</span>
            <span className="text-luxury-gold italic tracking-[0.1em] font-extrabold select-none">BEIT_AL_KHAIR_EXEC</span>
        </div>
      </footer>
    </main>
  )
}
