'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { neuralAudio } from '@/lib/neural-audio'

interface Property {
  id: string
  title: string
  location: string
  price: number
  status: string // available, sold
}

interface NeuralGridProps {
  properties: Property[]
  userRole: 'owner' | 'customer'
  onStatusToggle?: (id: string, newStatus: string) => void
}

// 🛰️ SYNTHETIC_NODAL_SQUAD (Fallback for absolute visual domination)
const SYNTHETIC_NODES: Property[] = [
  { id: 'syn-1', title: 'AL-QASR NODE A1', location: 'Qalyubia // Domination', price: 4250000, status: 'available' },
  { id: 'syn-2', title: 'AL-QASR NODE A2', location: 'Qalyubia // Domination', price: 5100000, status: 'available' },
]

export default function BeitAlKhairNeuralGrid({ properties, userRole, onStatusToggle }: NeuralGridProps) {
  const [selectedNode, setSelectedNode] = useState<Property | null>(null)
  const [isAudioInitialized, setAudioInitialized] = useState(false)
  
  // 🏙️ BUILDING_IDENTITY_SYNC
  const activeProps = properties.length > 0 ? properties : SYNTHETIC_NODES
  const firstTitle = activeProps[0]?.title || 'QASR NODE'
  const numericId = firstTitle.replace(/[^0-9]/g, '') || 'NODE'
  const imagePath = `/assets/buildings/qasr-${numericId}.png`

  const handleInteraction = () => {
    if (!isAudioInitialized) {
      neuralAudio.playGridInit()
      setAudioInitialized(true)
    }
  }

  const handleNodeClick = (p: Property) => {
    handleInteraction()
    neuralAudio.playNodeSync()
    setSelectedNode(p)
  }

  return (
    <div className="relative w-full h-full bg-[#050811] rounded-[4rem] overflow-hidden flex flex-col md:flex-row p-8 gap-8 hud-scanline">
      {/* 🔮 LEFT_COMMAND_COL: BUILDING_SYNC_TELEMETRY */}
      <div className="w-full md:w-1/3 flex flex-col gap-6 relative z-10">
        <div className="prestige-glass rounded-[3rem] p-8 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-sahara-gold rounded-full animate-ping" />
                <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.5em] italic">GEOGRAPHIC_SYNC_ACTIVE</span>
            </div>
            
            <h2 className="text-6xl font-black text-white italic tracking-[-0.1em] uppercase leading-none mb-4 text-luxury-gold">QASR_{buildingId}</h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-10">QALYUBIA_DOMAIN // BEIT_AL_KHAIR</p>

            <div className="w-full aspect-square rounded-[3rem] overflow-hidden border border-white/10 relative group mb-8">
                <img 
                    src={imagePath} 
                    alt={`Al-Qasr ${buildingId}`}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/branding/logo.png'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <span className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-sahara-gold/40 text-sahara-gold text-[8px] font-black uppercase tracking-widest">3D_MANIFEST_STABLE</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">UNITS_REMAINING</p>
                    <p className="text-3xl font-black text-white robotic-digits italic">{properties.filter(p => p.status === 'available').length}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 text-right">
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">TOTAL_NODES</p>
                    <p className="text-3xl font-black text-white robotic-digits italic">{properties.length}</p>
                </div>
            </div>
        </div>

        {/* 📟 SYSTEM_CONSOLE_STREAM */}
        <div className="h-40 bg-black/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 p-6 overflow-hidden">
            <div className="flex flex-col gap-1.5 opacity-40">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center text-[8px] font-black tracking-widest uppercase">
                        <span className="text-gray-600 italic">LOG_ENTRY_{i}...</span>
                        <span className="text-sahara-gold">BUFFER_STABLE_0x{i+7}F</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 🌌 RIGHT_COMMAND_COL: NODAL_UNIT_REGISTRY */}
      <div className="flex-1 prestige-glass rounded-[4rem] p-10 relative z-10 overflow-hidden">
          <div className="flex justify-between items-center mb-10">
              <h3 className="text-[12px] font-black text-white uppercase tracking-[0.8em] italic">UNIT_SELECTION_NODES</h3>
              <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-sahara-gold shadow-[0_0_5px_#c5a059]" />
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">AVAILABLE</span>
                  </div>
                  <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-800" />
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">SOLD</span>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto max-h-[70vh] pr-6 custom-scrollbar pb-10">
              {properties.map((p, i) => (
                  <motion.div
                    key={p.id}
                    whileHover={p.status === 'available' ? { scale: 1.05, y: -5 } : {}}
                    onClick={() => p.status === 'available' && handleNodeClick(p)}
                    className={`relative p-8 rounded-[2.5rem] border transition-all cursor-pointer ${
                        p.status === 'sold'
                            ? 'bg-black/40 border-white/5 opacity-50 grayscale'
                            : 'bg-white/5 border-white/10 hover:border-sahara-gold/40 hover:bg-sahara-gold/5'
                    }`}
                  >
                      <div className="flex flex-col gap-1 relative z-10">
                          <span className="text-[8px] font-black text-sahara-gold uppercase tracking-[0.3em] robotic-digits mb-2 italic">NODE // {p.id.split('-')[1]}</span>
                          <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">{p.title.split(' ').slice(2).join(' ') || 'ELITE_UNIT'}</h4>
                          <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-2">{p.location}</p>
                      </div>

                      {p.status === 'available' && (
                          <div className="absolute top-4 right-6">
                              <span className="w-1.5 h-1.5 bg-sahara-gold rounded-full shadow-[0_0_10px_#c5a059] animate-pulse" />
                          </div>
                      )}

                      <div className="mt-8 flex justify-between items-end">
                            <div>
                                <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1 leading-none italic">VALUATION</p>
                                <p className="text-xl font-black text-white robotic-digits">{p.status === 'sold' ? '---' : p.price.toLocaleString()}</p>
                            </div>
                            {p.status === 'available' && (
                                <div className="w-8 h-8 rounded-full bg-sahara-gold/10 border border-sahara-gold/20 flex items-center justify-center text-sahara-gold text-[10px]">→</div>
                            )}
                      </div>
                  </motion.div>
              ))}
          </div>
      </div>

      {/* 🏢 ELITE_RESERVATION_MODAL */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div 
                initial={{ scale: 0.9, y: 50, filter: 'blur(20px)' }}
                animate={{ scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ scale: 0.9, y: 50, filter: 'blur(20px)' }}
                className="w-full max-w-xl prestige-glass rounded-[4rem] p-12 relative overflow-hidden text-center border-2 border-sahara-gold/40"
                onClick={e => e.stopPropagation()}
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-sahara-gold to-transparent opacity-40" />
                
                <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-4 text-luxury-gold">INITIALIZE_SYNC</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-12">CONNECTING_TO_SOVEREIGN_RESERVATION_LINK</p>
                
                <div className="bg-white/5 rounded-[3rem] p-10 mb-12 border border-white/5">
                    <p className="text-sahara-gold text-2xl font-black robotic-digits mb-2">{selectedNode.title}</p>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{selectedNode.location}</p>
                    <hr className="my-8 border-white/5" />
                    <p className="text-4xl font-black text-white robotic-digits tracking-tighter">{selectedNode.price.toLocaleString()} <span className="text-[10px] text-sahara-gold not-italic">EGP</span></p>
                </div>

                <div className="flex flex-col gap-4">
                    <a 
                        href={`https://wa.me/201033332112?text=I%20am%20interested%20in%20DOMINATION_NODE:%20${selectedNode.title}`}
                        className="py-6 bg-sahara-gold text-black rounded-3xl font-black text-[12px] uppercase tracking-[0.5em] hover:scale-105 transition-all shadow-[0_20px_60px_rgba(212,175,55,0.4)]"
                    >
                        ESTABLISH_NEURAL_LINK
                    </a>
                    <button 
                        onClick={() => setSelectedNode(null)}
                        className="py-4 text-[8px] font-black text-gray-500 uppercase tracking-[0.8em] hover:text-white transition-all"
                    >
                        ABORT_SYNC
                    </button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
