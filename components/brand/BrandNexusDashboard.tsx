'use client'

import { useState } from 'react'
import { Zap, Activity, Clock, Phone, LayoutGrid, List } from 'lucide-react'

interface Lead {
    id: string
    name: string
    phone: string
    status: string
    createdAt: string
    notes?: string
}

export default function BrandNexusDashboard({ initialLeads, brandName }: { initialLeads: Lead[], brandName: string }) {
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const [filter, setFilter] = useState('all')
    const [interceptedLeads, setInterceptedLeads] = useState<Set<string>>(new Set())

    const handleIntercept = (leadId: string) => {
        setInterceptedLeads(prev => {
            const next = new Set(prev)
            next.add(leadId)
            return next
        })
    }

    const filteredLeads = initialLeads.filter(l => {
        if (filter === 'all') return true
        return l.status === filter
    })

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-cyan-500/30">
            {/* --- HEADER TERMINAL --- */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-1 w-12 bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
                        <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] robotic-digits">BRAND_NEXUS_v1.0</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none mb-4">
                        {brandName}_<span className="text-white/20">PORTAL</span>
                    </h1>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">REAL-TIME_LEAD_ACQUISITION_PROTOCOL</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center">
                        <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">TOTAL_SIGNALS</span>
                        <span className="text-2xl font-black text-cyan-400 robotic-digits">{initialLeads.length}</span>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                        <button 
                            title="Grid View"
                            onClick={() => setView('grid')}
                            className={`p-3 rounded-lg transition-all ${view === 'grid' ? 'bg-cyan-500 text-black' : 'text-gray-500 hover:text-white'}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button 
                            title="List View"
                            onClick={() => setView('list')}
                            className={`p-3 rounded-lg transition-all ${view === 'list' ? 'bg-cyan-500 text-black' : 'text-gray-500 hover:text-white'}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- LEADS GRID --- */}
            <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' : 'flex flex-col gap-4'}>
                {filteredLeads.map((lead) => (
                    <div 
                        key={lead.id}
                        className="group relative bg-[#090909] border border-white/5 rounded-[2.5rem] p-8 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)] overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] group-hover:scale-150 transition-transform duration-1000" />
                        
                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-xl font-black italic text-cyan-500 border border-white/10">
                                    {lead.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-black italic text-xl uppercase tracking-tighter leading-none mb-1">{lead.name}</h3>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                                        <Clock size={10} className="text-cyan-500" />
                                        <span className="robotic-digits">{new Date(lead.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest robotic-digits ${
                                    lead.status === 'new' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : 'bg-white/5 border-white/10 text-gray-400'
                                }`}>
                                    {lead.status === 'new' ? 'ELITE_SIGNAL' : lead.status.toUpperCase()}
                                </span>
                                {interceptedLeads.has(lead.id) && (
                                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[8px] font-black uppercase tracking-widest italic animate-pulse">
                                        SIGNAL_INTERCEPTED_READY
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 mb-8 relative z-10">
                            <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                                <Phone size={16} className="text-gray-600" />
                                <span className="text-sm font-black robotic-digits tracking-widest text-gray-400">{lead.phone}</span>
                            </div>
                            
                            <div className="p-5 bg-cyan-500/[0.03] border border-cyan-500/10 rounded-2xl">
                                <p className="text-[8px] text-cyan-500 font-black uppercase tracking-[0.4em] mb-3 leading-none">TH_SPEC_RECONSTRUCTION</p>
                                <p className="text-sm text-gray-400 font-bold italic leading-relaxed whitespace-pre-line">
                                    &quot;{lead.notes || 'TECHNICAL_SPECIFICATIONS_NOT_DETACHED.'}&quot;
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 relative z-10">
                            <button 
                                onClick={() => {
                                    handleIntercept(lead.id);
                                    const waMsg = `مرحباً ${lead.name}، وصلتنا رسالتك بخصوص استفسارك الهندسي عبر منصة النفير. نود البدء في تجهيز عرض السعر الفني لمصعدكم.`;
                                    window.open(`https://wa.me/${lead.phone.replace(/\+/g, '').replace(/ /g, '')}?text=${encodeURIComponent(waMsg)}`, '_blank');
                                }}
                                className="flex-1 py-4 bg-[#25D366]/10 text-[#25D366] font-black text-[10px] uppercase tracking-[0.3em] rounded-xl border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all font-sans flex items-center justify-center gap-3"
                            >
                                <Zap size={14} className="animate-pulse" />
                                WHATSAPP_RESPONSE
                            </button>
                            <button 
                                title="Call Lead"
                                onClick={() => {
                                    handleIntercept(lead.id);
                                    window.open(`tel:${lead.phone}`);
                                }}
                                className="px-5 py-4 bg-white/5 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-xl border border-white/10 hover:border-sahara-gold/30 transition-all flex items-center justify-center"
                            >
                                <Phone size={14} />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredLeads.length === 0 && (
                    <div className="col-span-full h-96 flex flex-col items-center justify-center opacity-20 filter grayscale">
                        <Activity size={80} className="mb-6 animate-pulse" />
                        <span className="font-black italic text-xl uppercase tracking-[0.5em]">AWAITING_RECEPTION...</span>
                    </div>
                )}
            </div>
        </div>
    )
}
