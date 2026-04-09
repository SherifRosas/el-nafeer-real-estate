import { db } from '@/lib/supabase'
import BeitAlKhairNeuralGrid from '@/components/admin/BeitAlKhairNeuralGrid'
import Image from 'next/image'

export const metadata = {
  title: 'Beit Al-Khair Real Estate | The New Lotus Domination',
  description: 'Luxury residential projects in New Cairo and Qalyubia. Experience the Al-Qasr series through our interactive Neural Grid.',
}

export default async function BeitAlKhairPage() {
  // Fetch properties belonging to Beit Al-Khair
  // We identify them by owner name or specific owner ID in a real scenario
  const properties = await db.getPublicProperties()
  const beitAlKhairProperties = properties.filter(p => 
    p.property_owners?.companyName?.includes('Beit Al-Khair') || 
    p.location.includes('Lotus') || 
    p.location.includes('Toukh') ||
    p.location.includes('Banha')
  )

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-sahara-gold selection:text-black">
      {/* Cinematic Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] z-10" />
        <div className="absolute inset-0 bg-[url('/grid_bg.png')] opacity-20 pointer-events-none" />
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto space-y-10">
          <div className="flex justify-center mb-8">
            <span className="px-8 py-3 rounded-full bg-sahara-gold/10 text-sahara-gold border border-sahara-gold/20 text-[10px] font-black uppercase tracking-[0.5em] robotic-digits animate-pulse">
              SYSTEM_INITIATED // BEIT_AL_KHAIR_ELITE
            </span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">
            THE <span className="text-sahara-gold">NEURAL</span> GRID
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-bold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
            Revolutionizing Real Estate Domination in <span className="text-white">New Cairo</span> and <span className="text-white">Qalyubia</span>. 🏙️💎
          </p>
        </div>
      </section>

      {/* The Neural Grid - Primary Interaction Node */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-4 space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">
                INTERACTIVE <span className="text-sahara-gold">INVENTORY</span>
              </h2>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest leading-loose">
                Explore the "Al-Qasr" series through our high-resolution interactive interface. 
                Click on any node to reveal official market valuations and project deep-links.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { label: 'PROJECTS', value: 'AL-QASR 18/19/21' },
                { label: 'GEO_FENCE', value: 'BANHA // TOUKH // LOTUS' },
                { label: 'INTERACTION', value: 'TOUCH_OR_CLICK_NODES' }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-6 border-b border-white/5">
                  <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">{item.label}</span>
                  <span className="text-xs font-black text-sahara-gold uppercase tracking-widest">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <BeitAlKhairNeuralGrid 
              properties={beitAlKhairProperties} 
              userRole="customer" 
            />
          </div>
        </div>
      </section>

      {/* Cross-Platform Call to Action */}
      <section className="py-40 bg-white/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sahara-gold/5 blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center px-6 space-y-12 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
            SECURE YOUR <span className="text-sahara-gold">STATION</span>
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm">
            Units in Al-Qasr 19 are currently 80% complete. Time is the final barrier.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <a 
              href="https://wa.me/201033332112?text=I%20am%20interested%20in%20Beit%20Al-Khair%20Al-Qasr%20Project%20(Ref:beit-alkhair-elite)"
              className="px-16 py-8 bg-sahara-gold text-black rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:scale-105 transition-all flex items-center justify-center"
            >
              WHATSAPP_COMMAND
            </a>
            <button className="px-16 py-8 bg-white/5 border border-white/10 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-white/10 transition-all">
              OFFICE_LOCATOR
            </button>
          </div>
        </div>
      </section>

      {/* Robotic Footer */}
      <footer className="py-20 text-center space-y-6">
        <p className="text-[9px] font-black text-gray-800 uppercase tracking-[0.6em] robotic-digits">
          EL_NAFEER_SOVEREIGN_NETWORK // BEIT_AL_KHAIR_MODULE_v1.0
        </p>
        <div className="flex justify-center gap-10 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           {/* Logo Placeholders */}
           <div className="w-12 h-12 rounded-xl border border-white/20" />
           <div className="w-12 h-12 rounded-xl border border-white/20" />
        </div>
      </footer>
    </main>
  )
}
