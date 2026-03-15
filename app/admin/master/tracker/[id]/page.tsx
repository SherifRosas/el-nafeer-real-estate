import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import AlNafeerTrackerHUD from '@/components/analytics/AlNafeerTrackerHUD'
import NavigationHeader from '@/components/NavigationHeader'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function TrackerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions)

    const userRole = (session?.user as any)?.role
    if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
        redirect('/admin/login')
    }

    const brand = await db.getBrandProfileById(id)
    if (!brand) {
        notFound()
    }

    // Fetch leads to calculate real stats
    const leads = await db.getLeadsByBrandProfileId(id)
    
    // We can pass aggregated stats to the HUD if we modify it, 
    // or just let it show the brand name for now.
    // Enhanced version: Calculate some real numbers
    const totalLeads = leads.length
    const newLeads = leads.filter((l: any) => l.status === 'new').length

    return (
        <main className="min-h-screen bg-[#020202]">
            <NavigationHeader />
            <div className="pt-20">
                <AlNafeerTrackerHUD 
                    clientName={brand.companyName} 
                    // In the future we can pass props like totalImpressions, conversions etc.
                />
                
                {/* Real Data Integration Peek */}
                <div className="max-w-7xl mx-auto px-8 pb-32">
                    <div className="milky-glass border border-white/5 rounded-[3rem] p-12 flex flex-wrap gap-12 items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.5em] mb-4 robotic-digits">LIVE_SIGNAL_COUNT</p>
                            <h4 className="text-4xl font-black italic text-white robotic-digits">{totalLeads} <span className="text-sm opacity-30 not-italic">TOTAL_NODES</span></h4>
                        </div>
                        <div className="h-16 w-px bg-white/5 hidden md:block" />
                        <div>
                            <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.5em] mb-4 robotic-digits">ACTIVE_NEW_SIGNALS</p>
                            <h4 className="text-4xl font-black italic text-white robotic-digits">{newLeads} <span className="text-sm opacity-30 not-italic">UNPROCESSED</span></h4>
                        </div>
                        <div className="h-16 w-px bg-white/5 hidden md:block" />
                        <div className="flex-1 text-right">
                             <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em] mb-4 robotic-digits">LAST_CAPTURE_TIMESTAMP</p>
                             <p className="text-xs font-bold text-gray-400 uppercase robotic-digits">
                                 {leads.length > 0 ? new Date(leads[0].createdAt).toLocaleString() : 'NO_DATA_STREAM'}
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
