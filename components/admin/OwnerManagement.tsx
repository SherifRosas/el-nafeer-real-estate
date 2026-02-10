'use client'

import { useState } from 'react'

interface Owner {
  id: string
  companyName: string
  logoUrl: string
  users?: {
    email: string
    name: string
  }
}

export default function OwnerManagement({ initialOwners }: { initialOwners: Owner[] }) {
  const [owners] = useState(initialOwners)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 gap-6">
        {owners.length === 0 ? (
          <div className="h-64 glass-effect rounded-[3rem] border border-white/5 flex flex-col items-center justify-center gap-4 text-gray-500 bg-black/20">
            <span className="text-5xl opacity-20">🏢</span>
            <p className="font-bold uppercase tracking-widest text-xs">No tenant subsystems detected</p>
          </div>
        ) : (
          owners.map((owner) => (
            <div 
              key={owner.id} 
              className="bg-black/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/5 hover:border-cyan-500/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex flex-col lg:flex-row lg:items-center gap-10 relative z-10">
                {/* Visual Identity */}
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-4xl shadow-2xl group-hover:rotate-6 transition-transform">
                  {owner.logoUrl ? (
                    <img src={owner.logoUrl} alt={owner.companyName} className="w-16 h-16 object-contain" />
                  ) : (
                    '🏢'
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter">{owner.companyName || 'Unnamed Developer'}</h3>
                    <span className="px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Sync Verified
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 text-gray-500 font-bold text-sm">
                    <span className="flex items-center gap-2">👤 {owner.users?.name || 'Master User'}</span>
                    <span className="text-white/10">|</span>
                    <span className="flex items-center gap-2 italic">📧 {owner.users?.email || 'tenant@elnafeer.com'}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="px-10 py-5 rounded-2xl bg-cyan-500 text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    Audit Subsystem
                  </button>
                  <button className="w-16 h-16 rounded-2xl bg-white/5 text-white flex items-center justify-center text-2xl hover:bg-white/10 transition-transform border border-white/5 group-hover:border-cyan-500/30">
                    🛠️
                  </button>
                  <button className="w-16 h-16 rounded-2xl bg-red-500/5 text-red-400/50 flex items-center justify-center text-2xl hover:bg-red-500/20 transition-all border border-transparent">
                    🚫
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                <div className="flex gap-10">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    Last Sync: 14m ago
                  </span>
                  <span>Uptime: 99.98%</span>
                </div>
                <span>Sub-ID: {owner.id.slice(-12).toUpperCase()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
