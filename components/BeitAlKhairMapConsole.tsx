'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QasrNode {
  id: string
  name: string
  units: number
  status: 'active' | 'full'
}

interface CityData {
  id: string
  name: string
  nameAr: string
  qasrs: QasrNode[]
}

const CITY_DATA: { [key: string]: CityData } = {
  banha: {
    id: 'banha',
    name: 'BANHA',
    nameAr: 'بنها',
    qasrs: [
      { id: 'qasr-18', name: 'AL-QASR 18', units: 12, status: 'active' },
      { id: 'qasr-19', name: 'AL-QASR 19', units: 4, status: 'active' },
    ]
  },
  toukh: {
    id: 'toukh',
    name: 'TOUKH',
    nameAr: 'طوخ',
    qasrs: [
      { id: 'qasr-21', name: 'AL-QASR 21', units: 8, status: 'active' },
    ]
  }
}

interface MapConsoleProps {
  onQasrSelect: (qasrId: string) => void
}

export default function BeitAlKhairMapConsole({ onQasrSelect }: MapConsoleProps) {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // 🛰️ TACTICAL_SVG_MAP_DATA (Stylized Qalyubia)
  return (
    <div className="relative w-full h-full bg-[#020202] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(212,175,55,0.1)]">
      {/* HUD Scanning Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
      <div className="absolute top-0 left-0 w-full h-1 bg-sahara-gold/10 blur-sm animate-[scan_10s_linear_infinite]" />

      <div className="absolute inset-0 flex flex-col p-12">
        {/* 📟 SYSTEM_STATUS_HEADER */}
        <div className="flex justify-between items-start mb-8 z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-sahara-gold rounded-full animate-ping" />
              <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.5em] italic">QALYUBIA_MAP_DECRYPTED</span>
            </div>
            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
              {selectedCity ? selectedCity.name : 'GEOGRAPHIC_COMMAND'}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest robotic-digits">LAT: 30.0444 // LONG: 31.2357</p>
            <p className="text-[10px] font-bold text-sahara-gold uppercase tracking-[0.2em]">{selectedCity ? 'ZOOM_LEVEL: 18x' : 'RESCANNING_NODES...'}</p>
          </div>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!selectedCity ? (
              <motion.div 
                key="map-view"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="relative w-full h-full max-h-[500px]"
              >
                {/* 🗺️ STYLIZED TACTICAL SVG */}
                <svg viewBox="0 0 600 400" className="w-full h-full drop-shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                  <defs>
                    <radialGradient id="nodePulse" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#c5a059" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#c5a059" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Qalyubia Stylized Region */}
                  <path 
                    d="M150,100 L450,50 L500,200 L350,350 L100,300 Z" 
                    fill="none" 
                    stroke="#c5a059" 
                    strokeWidth="1" 
                    strokeDasharray="5 5" 
                    className="opacity-20 animate-[pulse_4s_ease-in-out_infinite]"
                  />

                  {/* 📍 BANHA_NODE */}
                  <g 
                    className="cursor-pointer group" 
                    onMouseEnter={() => setHoveredNode('banha')} 
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => { setSelectedCity(CITY_DATA.banha); setHoveredNode(null); }}
                  >
                    <motion.circle 
                      cx="250" cy="150" r="12" 
                      fill="#c5a059" 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                    />
                    <circle cx="250" cy="150" r="30" fill="url(#nodePulse)" className="animate-pulse" />
                    <text x="250" y="110" textAnchor="middle" className="text-[10px] font-black fill-white uppercase tracking-[0.3em] italic">BANHA</text>
                  </g>

                  {/* 📍 TOUKH_NODE */}
                  <g 
                    className="cursor-pointer group" 
                    onMouseEnter={() => setHoveredNode('toukh')} 
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => { setSelectedCity(CITY_DATA.toukh); setHoveredNode(null); }}
                  >
                    <motion.circle 
                      cx="380" cy="240" r="10" 
                      fill="#c5a059" 
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                    />
                    <circle cx="380" cy="240" r="25" fill="url(#nodePulse)" className="animate-pulse" />
                    <text x="380" y="280" textAnchor="middle" className="text-[10px] font-black fill-white uppercase tracking-[0.3em] italic">TOUKH</text>
                  </g>

                  {/* Tactical Connection Line */}
                  <line x1="250" y1="150" x2="380" y2="240" stroke="#c5a059" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-30" />
                </svg>

                {/* 🛰️ HOVER_DATA_HUD */}
                <AnimatePresence>
                  {hoveredNode && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="absolute top-1/2 right-12 -translate-y-1/2 w-64 milky-glass p-6 rounded-3xl border border-sahara-gold/40 shadow-2xl z-20"
                    >
                      <h4 className="text-sahara-gold font-black italic uppercase tracking-tighter text-2xl mb-2">{hoveredNode}</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Qasrs_Detected</span>
                          <span className="text-[10px] font-black text-white italic">{CITY_DATA[hoveredNode].qasrs.length} UNITS</span>
                        </div>
                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
                          Strategic properties found in {hoveredNode} nexus. Ready for high-net-worth individual acquisition.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                key="building-view"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="w-full h-full flex flex-col"
              >
                <div className="flex justify-between items-center mb-10">
                  <button 
                    onClick={() => setSelectedCity(null)}
                    className="text-sahara-gold hover:text-white transition-colors flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]"
                  >
                    <span>←</span> BACK_TO_GEO_COMMAND
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto pr-4 custom-scrollbar">
                  {selectedCity.qasrs.map((q) => (
                    <motion.div 
                      key={q.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onQasrSelect(q.id)}
                      className="group cursor-pointer aspect-[4/5] milky-glass rounded-[2.5rem] p-8 border border-white/10 hover:border-sahara-gold/40 transition-all flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-sahara-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-1.5 h-1.5 bg-sahara-gold rounded-full" />
                          <span className="text-[8px] font-black text-sahara-gold uppercase tracking-[0.5em]">{q.status}</span>
                        </div>
                        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none mb-2">{q.name}</h3>
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">QALYUBIA // {selectedCity.name}</p>
                      </div>

                      <div className="mt-8">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <p className="text-[8px] font-bold text-gray-700 uppercase tracking-widest mb-1">UNITS_LOCATED</p>
                                <p className="text-2xl font-black text-white robotic-digits italic">{q.units}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[8px] font-bold text-sahara-gold uppercase tracking-[0.4em] mb-1 block">NODE_ACTIVE</span>
                                <div className="flex gap-1 justify-end">
                                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-sahara-gold/30" />)}
                                </div>
                            </div>
                        </div>
                        <div className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-sahara-gold group-hover:text-black transition-all">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">ENTER_BUILDING_HUB</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
