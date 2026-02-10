import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'

export default async function OwnerDashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'owner') {
        redirect('/auth/login?callbackUrl=/owner/dashboard')
    }

    const userId = (session.user as any).id
    const owner = await db.getPropertyOwnerByUserId(userId)

    if (!owner) {
        // Should not happen if auth logic works, but handle gracefully
        redirect('/')
    }

    const properties = await db.getPropertiesByOwnerId(owner.id)
    const leads = await db.getAllLeadsForOwner(owner.id)

    const stats = [
        {
            label: 'Active Properties',
            labelAr: 'العقارات النشطة',
            value: properties.length,
            icon: '🏠',
            trend: '+12%',
            color: 'amber',
        },
        {
            label: 'Total Leads',
            labelAr: 'إجمالي المهتمين',
            value: leads.length,
            icon: '🎯',
            trend: '+25%',
            color: 'blue',
        },
        {
            label: 'AI Sales Efficiency',
            labelAr: 'كفاءة المبيعات الآلية',
            value: '94%',
            icon: '🤖',
            trend: '+5%',
            color: 'purple',
        },
        {
            label: 'Est. Revenue',
            labelAr: 'الإيرادات المتوقعة',
            value: '4.2M',
            icon: '💰',
            trend: '+18%',
            color: 'green',
        },
    ]

    const isArabic = true // placeholder for rendering logic in server component

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">
            {/* Welcome Banner */}
            <div className="relative group overflow-hidden rounded-[3rem] p-12 bg-gradient-to-br from-amber-500/20 via-transparent to-blue-500/10 border border-white/10 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        Welcome back, <span className="text-amber-400">{owner.companyName || session.user?.name}</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-bold max-w-2xl leading-relaxed">
                        Your AI Sales Assistant is currently negotiating with <span className="text-white">12 active prospects</span> to close your luxury unit deals.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="glass-effect rounded-[2.5rem] p-8 border border-white/5 hover:border-white/20 transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/5 blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`} />
                        <div className="relative z-10 flex flex-col items-start gap-4">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                <div className="flex items-baseline gap-3">
                                    <h3 className="text-4xl font-black tracking-tight">{stat.value}</h3>
                                    <span className={`text-xs font-bold text-${stat.color}-400 bg-${stat.color}-500/10 px-2 py-1 rounded-lg`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Grid: Properties & Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Properties Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-2xl font-black tracking-tight">Focus Units</h3>
                        <button className="text-sm font-black text-amber-500 hover:text-amber-400 flex items-center gap-2 group">
                            Manage Inventory
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {properties.slice(0, 4).map((p, i) => (
                            <div key={i} className="glass-effect rounded-[2rem] overflow-hidden border border-white/5 group hover:border-amber-500/30 transition-all duration-500">
                                <div className="h-48 bg-white/5 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                                    {/* Placeholder for real image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">🏢</div>
                                    <div className="absolute top-4 left-4 z-20 bg-amber-500 text-black text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full px-4">
                                        {p.status}
                                    </div>
                                </div>
                                <div className="p-6 relative z-20">
                                    <h4 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{p.title}</h4>
                                    <p className="text-gray-500 text-sm font-medium mb-4">{p.location}</p>
                                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                        <span className="text-lg font-black">{p.price.toLocaleString()} EGP</span>
                                        <div className="flex items-center -space-x-2">
                                            {[1, 2, 3].map(j => (
                                                <div key={j} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-gray-800 flex items-center justify-center text-[8px] font-black">L</div>
                                            ))}
                                            <span className="text-[10px] text-gray-500 font-bold ml-4">+4 Leads</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lead Sidebar */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-2xl font-black tracking-tight">Lead Pulse</h3>
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    </div>

                    <div className="space-y-4">
                        {leads.slice(0, 5).map((l, i) => (
                            <div key={i} className="glass-effect rounded-2xl p-5 border border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-lg shadow-xl">👤</div>
                                    <div>
                                        <h5 className="font-bold text-sm">{l.name}</h5>
                                        <p className="text-[10px] text-gray-500 font-bold">{l.createdAt.toLocaleDateString()}</p>
                                    </div>
                                    <div className="ml-auto bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                                        {l.status}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 line-clamp-2 italic font-medium leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                                    "{l.notes || 'Interested in luxury beachfront villas with smart home automation...'}"
                                </p>
                            </div>
                        ))}
                        <button className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all border border-white/5">
                            Launch Intelligence Center
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
