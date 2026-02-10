'use client'

interface Lead {
    id: string
    name: string
    phone: string
    status: string
    createdAt: string
    notes?: string
    property?: {
        title: string
    }
}

export default function LeadsFeed({ leads }: { leads: Lead[] }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8 px-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight">Active Pulse</h2>
                    <p className="text-gray-500 font-bold">Real-time leads from your AI Sales Assistant</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        Filter Results
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {leads.length === 0 ? (
                    <div className="h-64 glass-effect rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center gap-4 text-gray-500">
                        <span className="text-5xl opacity-20">📡</span>
                        <p className="font-bold">Awaiting incoming signals...</p>
                    </div>
                ) : (
                    leads.map((lead) => (
                        <div
                            key={lead.id}
                            className="glass-effect rounded-[2.5rem] p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700" />

                            <div className="flex flex-col lg:flex-row lg:items-center gap-8 relative z-10">
                                {/* Profile Circle */}
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center text-3xl shadow-xl group-hover:rotate-6 transition-transform">
                                    👤
                                </div>

                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-2xl font-black">{lead.name}</h3>
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${lead.status === 'new' ? 'bg-blue-500 text-black' : 'bg-gray-700 text-white'
                                            }`}>
                                            {lead.status === 'new' ? 'Smart Lead' : lead.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 font-bold flex items-center gap-4">
                                        <span className="flex items-center gap-2">📞 {lead.phone}</span>
                                        <span className="text-white/20">|</span>
                                        <span className="flex items-center gap-2">🏢 {lead.property?.title || 'Unknown Property'}</span>
                                    </p>
                                </div>

                                <div className="lg:w-96 bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
                                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-3">AI Consultation Summary</p>
                                    <p className="text-sm font-medium text-gray-300 leading-relaxed italic">
                                        "{lead.notes || 'The client is exploring high-end investment opportunities and requested a detailed payment plan for the beachfront unit.'}"
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <button className="px-8 py-4 rounded-2xl bg-blue-500 text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                        Take Over Chat
                                    </button>
                                    <button className="w-14 h-14 rounded-2xl bg-white/5 text-white flex items-center justify-center text-xl hover:bg-white/10 transition-transform">
                                        📞
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-600">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    Captured {new Date(lead.createdAt).toLocaleTimeString()}
                                </span>
                                <span>Lead ID: {lead.id.slice(-8)}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
