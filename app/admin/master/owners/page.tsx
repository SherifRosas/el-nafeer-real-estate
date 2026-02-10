import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import OwnerManagement from '@/components/admin/OwnerManagement'

export default async function MasterOwnersPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'main-admin') {
        redirect('/admin/login')
    }

    // Fetch all registered property owners
    const owners = await db.getAllPropertyOwners()

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-6">
                <div>
                    <h2 className="text-5xl font-black tracking-tighter mb-4 italic uppercase">Tenant Orchestration</h2>
                    <p className="text-gray-500 font-bold text-lg">Manage and authorize global property developer subsystems.</p>
                </div>
                <div className="flex gap-4 p-5 bg-cyan-500/5 rounded-[2.5rem] border border-cyan-500/10 backdrop-blur-3xl">
                    <div className="px-8 border-r border-white/10 text-center">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2">Network Load</p>
                        <p className="text-2xl font-black text-cyan-400">14.2%</p>
                    </div>
                    <div className="px-8 text-center text-left">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2">Active Tenants</p>
                        <p className="text-2xl font-black">{owners.length || '0'}</p>
                    </div>
                </div>
            </div>

            <OwnerManagement initialOwners={owners} />
        </div>
    )
}
