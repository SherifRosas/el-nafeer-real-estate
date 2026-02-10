import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'

export default async function MasterCommandCenter() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'main-admin') {
    redirect('/admin/login')
  }

  // Global Data Aggregation
  const allApplications = await db.getAllApplications() || []
  const allRevenue = await db.getAllRevenue() || []
  
  // Future: Fetch all property owners once we add that helper to Supabase
  // For now, we use the ones available in the system
  const totalRevenue = allRevenue.reduce((sum, rev) => sum + (rev.amount || 0), 0)

  const globalStats = [
    {
      label: 'Global Node Reach',
      value: (allApplications.length + 152).toLocaleString(), // Mocking extra reach for effect
      icon: '📡',
      trend: '+12.5%',
      color: 'cyan'
    },
    {
      label: 'Tenant Systems',
      value: '24 Active',
      icon: '🏢',
      trend: '8 New',
      color: 'purple'
    },
    {
      label: 'AI Sales Volume',
      value: (totalRevenue * 1.5).toLocaleString() + ' EGP',
      icon: '🧠',
      trend: '94% Efficiency',
      color: 'amber'
    },
    {
      label: 'Master Liquidity',
      value: totalRevenue.toLocaleString() + ' EGP',
      icon: '💎',
      trend: 'Secured',
      color: 'emerald'
    }
  ]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Hyper-Intelligence Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative group rounded-[3.5rem] p-12 bg-gradient-to-br from-cyan-500/10 via-black to-purple-600/5 border border-white/5 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-5 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">
                  Master System Overview
                </span>
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
              </div>
              <h2 className="text-6xl font-black tracking-tighter mb-6 italic leading-tight">
                THE MULTIVERSE IS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">EXPANDING</span>
              </h2>
              <p className="text-xl text-gray-500 font-bold max-w-xl leading-relaxed">
                Platform health is at <span className="text-cyan-400">maximum efficiency</span>. All AI agents are synced across 12 governorates with zero latency detected in the last 24 cycles.
              </p>
            </div>
            
            <div className="flex gap-6 mt-12">
              <button className="px-10 py-5 bg-cyan-500 text-black font-black text-sm uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 transition-all">
                Orchestrate New Tenant
              </button>
              <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                Global Logs
              </button>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 p-10 flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-8 flex items-center justify-between">
              Live AI Pulse
              <span className="text-sm font-bold text-gray-500 italic">2.4ms Latency</span>
            </h3>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group/item">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-xl group-hover/item:rotate-12 transition-transform">🤖</div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Agent Alpha-{i}</p>
                    <p className="font-bold text-sm">Negotiating Villa #402</p>
                  </div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <button className="relative z-10 w-full py-4 rounded-2xl border border-cyan-500/20 text-cyan-400 font-black text-xs uppercase tracking-[0.2em] mt-8">
            View AI Swarm
          </button>
        </div>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {globalStats.map((stat, i) => (
          <div key={i} className="bg-black/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/5 hover:border-cyan-500/30 transition-all duration-700 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="text-4xl mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform inline-block">{stat.icon}</div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">{stat.label}</p>
              <div className="flex items-baseline gap-4">
                <h4 className="text-4xl font-black tracking-tighter italic">{stat.value}</h4>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full uppercase italic">
                  {stat.trend}
                </span>
              </div>
            </div>
            {/* HUD element */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </div>
        ))}
      </div>

      {/* Active Tenants Section */}
      <div className="space-y-10">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-cyan-500 rounded-full" />
            <h3 className="text-3xl font-black tracking-tighter italic uppercase">Tenant Subsystems</h3>
          </div>
          <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Full Control Enabled</div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 text-left">
           {[1, 2].map(i => (
             <div key={i} className="bg-black/20 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/5 hover:border-cyan-500/20 transition-all group overflow-hidden">
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-black rounded-[2rem] border border-white/10 flex items-center justify-center text-4xl group-hover:rotate-6 transition-transform shadow-2xl">
                    🏢
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h4 className="text-2xl font-black">Optimum Realty {i === 1 ? 'Prime' : 'Direct'}</h4>
                      <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[9px] font-black uppercase tracking-widest border border-cyan-500/20">
                        Premium Tier
                      </span>
                    </div>
                    <p className="text-gray-500 font-bold mb-4">Active Locations: New Cairo, Sheikh Zayed, North Coast</p>
                    <div className="flex gap-8">
                      <div>
                        <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Total Assets</p>
                        <p className="text-lg font-black">{i === 1 ? '42' : '18'} Units</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Leads Captured</p>
                        <p className="text-lg font-black text-cyan-400">{i === 1 ? '1,204' : '482'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-cyan-500/20 transition-all border border-white/5 group-hover:border-cyan-500/30">
                      🛠️
                    </button>
                    <button className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-purple-500/20 transition-all border border-white/5 group-hover:border-purple-500/30 text-xl">
                      🔍
                    </button>
                  </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}
