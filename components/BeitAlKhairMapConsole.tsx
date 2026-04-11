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
    name: 'BANHA_DOM_NODE',
    nameAr: 'بنها القليوبية',
    qasrs: [
      { id: 'qasr-18', name: 'AL-QASR 18', units: 12, status: 'active' },
      { id: 'qasr-19', name: 'AL-QASR 19', units: 4, status: 'active' },
    ]
  },
  toukh: {
    id: 'toukh',
    name: 'TOUKH_DOM_NODE',
    nameAr: 'طوخ القليوبية',
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

  return (
    <div className="relative w-full h-full bg-[#050811] rounded-[4rem] overflow-hidden border-2 border-white/5 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] hud-scanline">
      {/* HUD Scanning Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-sahara-gold/10 blur-md animate-[scan_12s_linear_infinite]" />

      <div className="absolute inset-0 flex flex-col p-16">
        {/* 📟 SYSTEM_STATUS_HEADER */}
        <div className="flex justify-between items-start mb-12 z-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="w-3 h-3 bg-sahara-gold rounded-full animate-ping shadow-[0_0_15px_#c5a059]" />
              <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.6em] italic robotic-digits">GEO_TELEMETRY_DECRYPTED</span>
            </div>
            <h2 className="text-5xl font-black text-white italic tracking-[-0.05em] uppercase leading-none text-luxury-gold">
              {selectedCity ? selectedCity.name : 'GEOGRAPHIC_COMMAND'}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest robotic-digits mb-2">LAT: 30.4591 // LONG: 31.1786</p>
            <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.3em]">{selectedCity ? 'ZOOM_LVL: 18x_QUANTUM' : 'RESCANNING_NODAL_FIELD...'}</p>
          </div>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!selectedCity ? (
              <motion.div 
                key="map-view"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.15 }}
                transition={{ duration: 1 }}
                className="relative w-full h-full"
              >
                {/* 🗺️ HIGH-FIDELITY TACTICAL SVG */}
                <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                  <defs>
                    <radialGradient id="nodePulse" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#c5a059" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#c5a059" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Qalyubia Tactical Grid Lines */}
                  {[...Array(20)].map((_, i) => (
                    <line key={i} x1="0" y1={i*50} x2="800" y2={i*50} stroke="rgba(197,160,89,0.03)" strokeWidth="1" />
                  ))}
                  {[...Array(30)].map((_, i) => (
                    <line key={i} x1={i*50} y1="0" x2={i*50} y2="500" stroke="rgba(197,160,89,0.03)" strokeWidth="1" />
                  ))}

                  {/* Stylized Region Path */}
                  <motion.path 
                    d="M200,150 L600,100 L700,300 L450,450 L100,400 Z" 
                    fill="rgba(197,160,89,0.01)" 
                    stroke="#c5a059" 
                    strokeWidth="2" 
                    strokeDasharray="10 10" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  {/* 📍 BANHA_DOMINATION_NODE */}
                  <g 
                    className="cursor-pointer group" 
                    onMouseEnter={() => setHoveredNode('banha')} 
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => { setSelectedCity(CITY_DATA.banha); setHoveredNode(null); }}
                  >
                    <motion.circle 
                      cx="300" cy="200" r="15" 
                      fill="#c5a059" 
                      animate={{ scale: [1, 1.3, 1], filter: ["brightness(1)", "brightness(2)", "brightness(1)"] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    />
                    <circle cx="300" cy="200" r="40" fill="url(#nodePulse)" className="animate-pulse" />
                    <text x="300" y="150" textAnchor="middle" className="text-xl font-black fill-white uppercase tracking-[0.4em] italic robotic-digits">BANHA</text>
                  </g>

                  {/* 📍 TOUKH_DOMINATION_NODE */}
                  <g 
                    className="cursor-pointer group" 
                    onMouseEnter={() => setHoveredNode('toukh')} 
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => { setSelectedCity(CITY_DATA.toukh); setHoveredNode(null); }}
                  >
                    <motion.circle 
                      cx="550" cy="350" r="12" 
                      fill="#c5a059" 
                      animate={{ scale: [1, 1.5, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
                      transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                    />
                    <circle cx="550" cy="350" r="35" fill="url(#nodePulse)" className="animate-pulse" />
                    <text x="550" y="420" textAnchor="middle" className="text-xl font-black fill-white uppercase tracking-[0.4em] italic robotic-digits">TOUKH</text>
                  </g>

                  {/* Quantum Linkage Path */}
                  <motion.line 
                    x1="300" y1="200" x2="550" y2="350" 
                    stroke="#c5a059" 
                    strokeWidth="1" 
                    strokeDasharray="4 4" 
                    className="opacity-40"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                </svg>

                {/* 🛰️ HOVER_DATA_QUANTUM_HUD */}
                <AnimatePresence>
                  {hoveredNode && (
                    <motion.div 
                      initial={{ opacity: 0, x: 40, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 40, scale: 0.9 }}
                      className="absolute top-1/2 right-0 -translate-y-1/2 w-80 prestige-glass p-10 rounded-[3rem] z-20 shadow-[0_0_100px_rgba(212,175,55,0.2)]"
                    >
                      <h4 className="text-luxury-gold font-black italic uppercase tracking-tighter text-3xl mb-4 leading-none">{hoveredNode}</h4>
                      <div className="space-y-6">
                        <div className="flex justify-between border-b border-white/10 pb-4">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Qasrs_Located</span>
                          <span className="text-xl font-black text-white italic robotic-digits">{CITY_DATA[hoveredNode].qasrs.length}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-4">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">SIGNAL_STRENGTH</span>
                          <span className="text-[10px] font-black text-sahara-gold italic tracking-widest">OPTIMAL_98%</span>
                        </div>
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest leading-loose opacity-60">
                          {CITY_DATA[hoveredNode].nameAr} // INITIALIZING_PROPERTY_MANIFEST_PROTOCOL_v3
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
                className="w-full h-full flex flex-col pt-4"
              >
                <div className="flex justify-between items-center mb-16">
                  <button 
                    onClick={() => setSelectedCity(null)}
                    className="group flex items-center gap-6 text-sahara-gold hover:text-white transition-all text-xs font-black uppercase tracking-[0.6em] italic"
                  >
                    <span className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-sahara-gold/20 group-hover:bg-sahara-gold group-hover:text-black transition-all">←</span> 
                    GEO_RETURN_CMD
                  </button>
                  <div className="flex gap-4">
                    <span className="px-6 py-2 bg-sahara-gold/10 rounded-full border border-sahara-gold/30 text-sahara-gold text-[8px] font-black uppercase tracking-widest italic">{selectedCity.name}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 overflow-y-auto pr-8 custom-scrollbar">
                  {selectedCity.qasrs.map((q) => (
                    <motion.div 
                      key={q.id}
                      whileHover={{ scale: 1.05, translateY: -10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onQasrSelect(q.id)}
                      className="group cursor-pointer aspect-[3/4] prestige-glass rounded-[3.5rem] p-10 hover:border-sahara-gold/50 transition-all flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-sahara-gold/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="absolute bottom-0 left-0 w-full h-[3px] bg-sahara-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                      
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <span className="w-2 h-2 bg-sahara-gold rounded-full shadow-[0_0_10px_#c5a059]" />
                          <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.5em] robotic-digits">NODE_{q.status}</span>
                        </div>
                        <h3 className="text-4xl font-black text-white italic tracking-[-0.08em] uppercase leading-none mb-3 text-luxury-gold">{q.name}</h3>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] robotic-digits">{selectedCity.name} // QALYUBIA</p>
                      </div>

                      <div className="mt-12 space-y-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 leading-none">UNITS_DETECTED</p>
                                <p className="text-3xl font-black text-white robotic-digits italic leading-none">{q.units}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-[9px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-2 block leading-none">SIGNAL_LIVE</span>
                                <div className="flex gap-1.5 justify-end">
                                    {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-sahara-gold/40" />)}
                                </div>
                            </div>
                        </div>
                        <div className="w-full py-6 bg-white/5 border border-white/10 rounded-[1.5rem] flex items-center justify-center group-hover:bg-sahara-gold group-hover:text-black transition-all shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">ACCESS_NEURAL_HUB</span>
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
