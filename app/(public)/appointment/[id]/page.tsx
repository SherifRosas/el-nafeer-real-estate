'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { db, supabase, TABLES } from '@/lib/supabase'
import NavigationHeader from '@/components/NavigationHeader'

export default function AppointmentPage() {
  const params = useParams()
  const appointmentId = params.id as string
  const [appointment, setAppointment] = useState<any>(null)
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: appointmentById, error: errorById } = await supabase
          .from(TABLES.appointments)
          .select('*')
          .eq('id', appointmentId)
          .single()

        let appointmentData = appointmentById
        if (errorById && errorById.code === 'PGRST116') {
          appointmentData = await db.getAppointmentByApplicationId(appointmentId)
        }

        if (!appointmentData) {
          setLoading(false)
          return
        }
        setAppointment(appointmentData)

        const applicationData = await db.getApplicationById(appointmentData.applicationId)
        if (applicationData) {
          setApplication(applicationData)
        }
      } catch (error) {
        console.error('Temporal retrieval error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [appointmentId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center font-black uppercase tracking-widest text-[10px]">
        ERROR: Temporal Sync Not Found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      <NavigationHeader />

      <div className="max-w-4xl mx-auto py-24 px-6 relative z-10">
        <div className="bg-[#050505] rounded-[3rem] border border-white/5 p-12 relative group overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          {/* Cyber HUD Accents */}
          <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-cyan-500/10" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-cyan-500/10" />

          <header className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]" />
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.4em]">Temporal_Sync_Manifest</span>
            </div>

            <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-2">
              Sync Reservation
            </h1>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">
              Physical Synchronization Protocol Detailing
            </p>
          </header>

          <div className="space-y-10 relative z-10">
            <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-[2rem] p-10 space-y-8">
              <h2 className="text-xl font-black italic uppercase tracking-tighter text-cyan-400">Node Sync Specifications</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: 'Proprietary Identity', value: appointment.applicantName || application?.fullName },
                  { label: 'Temporal Date', value: new Date(appointment.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                  { label: 'Arrival window', value: appointment.time },
                  { label: 'Sync Coordinate', value: appointment.location },
                  { label: 'Security Mark', value: appointment.securityMark, font: 'font-mono text-cyan-400' },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-4">
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className={`text-sm font-bold uppercase ${item.font || 'text-white'}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-orange-500/5 border border-orange-500/20 text-orange-500/80 text-[10px] font-black uppercase tracking-widest">
              CAUTION: AUTHENTIC PROTOCOL VALID ONLY WITH INTEGRATED SECURITY HASH. ENSURE HARDCOPY OR DIGITAL TOKEN IS PRESENT AT COORDINATE.
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-cyan-500 text-black font-black py-6 rounded-3xl uppercase tracking-[0.4em] text-[10px] hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                Output_Protocol_Stream
              </button>
              <button
                disabled
                className="flex-1 bg-white/5 text-gray-600 border border-white/10 font-black py-6 rounded-3xl uppercase tracking-[0.4em] text-[10px] cursor-not-allowed"
              >
                Binary_PDF_Extraction (Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
