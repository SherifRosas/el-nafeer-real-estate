import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterLeadsDashboard from '@/components/admin/MasterLeadsDashboard'

export default async function MasterLeadsPage() {
    const session = await getServerSession(authOptions)

    const userRole = (session?.user as any)?.role
    if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
        redirect('/admin/login')
    }

    // Fetch all global leads from the system
    let leads: any[] = []
    try {
        leads = await db.getAllLeads() || []
    } catch (error) {
        console.error('Leads page - DB error:', error)
    }

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 px-8">
                <div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
                        GLOBAL_<span className="text-sahara-gold">LEADS</span>_ANALYTICS
                    </h2>
                    <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">REAL-TIME_DATA_STREAMS_FROM_ALL_AI_SUBSYSTEMS</p>
                </div>
                <div className="flex gap-6 p-6 milky-glass rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                    <div className="px-10 border-r rtl:border-r-0 rtl:border-l border-white/10 text-center">
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em] mb-2 robotic-digits">TOTAL_SIGNALS</p>
                        <p className="text-3xl font-black text-sahara-gold robotic-digits">{leads.length}</p>
                    </div>
                    <div className="px-10 border-r rtl:border-r-0 rtl:border-l border-white/10 text-center min-w-[200px]">
                        <p className="text-[10px] text-sahara-gold font-black uppercase tracking-[0.3em] mb-2 robotic-digits">CLICK_MOMENTUM</p>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                                <div 
                                    className="h-full bg-gradient-to-r from-sahara-gold to-white animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-[2000ms]" 
                                    style={{ width: `${Math.min((leads.length / 500) * 100, 100)}%` }}
                                />
                            </div>
                            <p className="text-xl font-black text-white robotic-digits">{Math.round((leads.length / 500) * 100)}%</p>
                        </div>
                    </div>
                    <div className="px-10 text-center">
                        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em] mb-2 robotic-digits">TARGET_500</p>
                        <p className="text-3xl font-black text-white robotic-digits">{(leads.length / 500 * 100).toFixed(1)}%</p>
                    </div>
                </div>
            </div>

            <MasterLeadsDashboard initialLeads={leads as any} />
        </div>
    )
}
