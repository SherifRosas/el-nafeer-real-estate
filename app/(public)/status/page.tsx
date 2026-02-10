'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import NavigationHeader from '@/components/NavigationHeader'

interface RegistrationStatus {
  id: string
  fullName: string
  paymentStatus: string
  selectionStatus: string
  aiVerified: boolean
  coupon?: { couponCode: string }
  appointment?: { date: string; time: string; location: string }
}

export default function StatusPage() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<RegistrationStatus[]>([])
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [searching, setSearching] = useState(false)
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  const fetchStatus = async (userEmail?: string) => {
    try {
      const emailToUse = userEmail || email
      if (!emailToUse) return

      setSearching(true)
      const response = await fetch(`/api/applications/user?email=${encodeURIComponent(emailToUse)}`, {
        cache: 'no-store',
      })

      if (!response.ok) throw new Error('Query error')

      const data = await response.json()
      if (data.success) {
        setRegistrations(data.applications)
      }
    } catch (error) {
      console.error('Status fetch failure:', error)
    } finally {
      setLoading(false)
      setSearching(false)
    }
  }

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchEmail) return
    setEmail(searchEmail)
    fetchStatus(searchEmail)
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 relative overflow-x-hidden">
      <NavigationHeader />

      {/* HUD Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-cyan-500/[0.03] blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto py-24 px-6 relative z-10">
        <div className="text-center mb-20 relative">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]" />
            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.4em]">Core_Sync_Active</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-4">
            {isArabic ? 'تتبع البروتوكول' : 'Protocol Tracker'}
          </h1>
          <p className="text-xs font-black text-gray-500 uppercase tracking-[0.5em]">
            {isArabic ? 'مزامنة حالة العقار والعميل' : 'Property & Identity Sync Status'}
          </p>

          {/* Corner Brackets */}
          <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-white/5" />
          <div className="absolute -top-10 -right-10 w-20 h-20 border-t-2 border-r-2 border-white/5" />
        </div>

        {!email && (
          <div className="max-w-2xl mx-auto bg-[#050505] rounded-[3rem] border border-white/5 p-16 relative group overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-cyan-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            <form onSubmit={handleQuery} className="relative z-10 space-y-10">
              <div className="text-center mb-10">
                <span className="text-6xl block mb-6">📡</span>
                <p className="text-[10px] font-black text-cyan-500/60 uppercase tracking-[0.3em]">Initialize Identity Probe</p>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-4">Authorized Email Address</label>
                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white font-black tracking-tight focus:border-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
                  placeholder="IDENTITY@NODE.IO"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={searching}
                className="w-full bg-cyan-500 text-black font-black py-6 rounded-2xl uppercase tracking-[0.3em] text-xs hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] disabled:opacity-50"
              >
                {searching ? 'Processing_Sync...' : 'Establish Connection'}
              </button>
            </form>
          </div>
        )}

        {email && (
          <div className="space-y-12">
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 flex items-center justify-between backdrop-blur-3xl">
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Authenticated Node</p>
                <p className="text-xl font-black text-cyan-400 italic uppercase tracking-tighter">{email}</p>
              </div>
              <button
                onClick={() => { setEmail(''); setRegistrations([]) }}
                className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:border-red-500/50 hover:text-red-400 transition-all"
              >
                Disconnect
              </button>
            </div>

            {registrations.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-white/10 border-dashed">
                <span className="text-6xl block mb-6">🏜️</span>
                <p className="font-black text-gray-600 uppercase tracking-[0.4em]">No Active Protocols Found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {registrations.map((reg) => (
                  <div key={reg.id} className="bg-[#050505] rounded-[3rem] p-12 border border-white/5 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 blur-[100px] pointer-events-none" />

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 pb-8 border-b border-white/5">
                      <div>
                        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white mb-2">{reg.fullName}</h2>
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Protocol_ID: {reg.id.substring(0, 12)}</p>
                      </div>
                      <div className="flex gap-4">
                        <div className={`px-6 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest ${reg.paymentStatus === 'paid' ? 'border-green-500/20 bg-green-500/5 text-green-400' : 'border-yellow-500/20 bg-yellow-500/5 text-yellow-500'
                          }`}>
                          Payment: {reg.paymentStatus}
                        </div>
                        <div className={`px-6 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest ${reg.selectionStatus === 'selected' ? 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400' : 'border-white/10 bg-white/5 text-gray-500'
                          }`}>
                          Status: {reg.selectionStatus}
                        </div>
                      </div>
                    </div>

                    {reg.appointment && (
                      <div className="p-10 rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10">
                        <div className="flex items-center gap-4 mb-8">
                          <span className="text-xl">📅</span>
                          <h3 className="text-lg font-black uppercase italic tracking-tighter text-cyan-400">Scheduled Sync Event</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {[
                            { label: 'Temporal Coordinates', value: new Date(reg.appointment.date).toDateString() },
                            { label: 'Time window', value: reg.appointment.time },
                            { label: 'Physical Node', value: reg.appointment.location },
                          ].map((item) => (
                            <div key={item.label} className="bg-black/40 p-5 rounded-2xl border border-white/5">
                              <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-2">{item.label}</p>
                              <p className="text-xs font-black text-white italic">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cyber Technical HUD footer details */}
      <div className="max-w-4xl mx-auto pb-20 text-center opacity-30">
        <p className="text-[8px] font-black text-gray-600 uppercase tracking-[0.5em]">Auth_Core_v3.3 // Stabilized_Active</p>
      </div>
    </div>
  )
}


