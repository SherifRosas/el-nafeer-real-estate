'use client'

import { useState } from 'react'

interface Property {
    id: string
    title: string
    location: string
    price: number
    status: string
    images: string[]
}

export default function PropertyGrid({ properties: initialProperties }: { properties: Property[] }) {
    const [properties] = useState(initialProperties)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Add New Property Card */}
            <button className="h-[400px] border-2 border-dashed border-white/10 rounded-[2.5rem] bg-white/5 hover:bg-white/10 hover:border-amber-500/50 transition-all group flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-black font-black text-2xl group-hover:scale-110 transition-transform">
                    +
                </div>
                <div>
                    <p className="font-black text-lg">List New Property</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest text-center">Add to Marketplace</p>
                </div>
            </button>

            {properties.map((property) => (
                <div
                    key={property.id}
                    className="glass-effect rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-500 group"
                >
                    {/* Image Container */}
                    <div className="h-56 bg-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10 group-hover:scale-110 transition-transform duration-700">
                            🏢
                        </div>

                        {/* Badges */}
                        <div className="absolute top-6 left-6 z-20 flex gap-2">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${property.status === 'available' ? 'bg-green-500 text-black' : 'bg-amber-500 text-black'
                                }`}>
                                {property.status}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-6">
                        <div>
                            <h3 className="text-2xl font-black mb-1 group-hover:text-amber-400 transition-colors truncate">
                                {property.title}
                            </h3>
                            <p className="text-gray-500 font-bold text-sm flex items-center gap-2">
                                <span>📍</span> {property.location}
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-y border-white/5 py-6">
                            <div>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">List Price</p>
                                <p className="text-2xl font-black text-white">{property.price.toLocaleString()} EGP</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">AI Interactions</p>
                                <div className="flex items-center gap-2 justify-end">
                                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                    <p className="text-sm font-black text-amber-500">14 Active</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 py-4 rounded-2xl bg-white/10 hover:bg-white/20 font-black text-xs uppercase tracking-widest transition-all">
                                Edit Details
                            </button>
                            <button className="w-14 h-14 rounded-2xl bg-amber-500 text-black flex items-center justify-center text-xl hover:scale-110 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                                📊
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
