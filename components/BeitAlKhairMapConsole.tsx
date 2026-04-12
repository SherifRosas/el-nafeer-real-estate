'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QasrNode {
  id: string
  name: string
  units: number
  status: 'active' | 'full'
  phase: string
  image?: string
}

interface CityData {
  id: string
  name: string
  nameAr: string
  coords: { x: number, y: number }
  landmarks?: string[]
  qasrs: QasrNode[]
}

const CITY_DATA: { [key: string]: CityData } = {
  banha: {
    id: 'banha',
    name: 'BANHA_DOM_NODE',
    nameAr: 'نطاق بنها القليوبية',
    coords: { x: 300, y: 180 },
    landmarks: ['Flowers District', 'Examination Bridge', 'Al-Habitat'],
    qasrs: [
      { 
        id: 'qasr-21', 
        name: 'AL-QASR 21', 
        units: 14, 
        status: 'active',
        phase: 'Flowers District (تقسيم الزهور) // 4th Floor Columns',
        image: '/assets/buildings/qasr-21.png'
      },
      { 
        id: 'qasr-22', 
        name: 'AL-QASR 22', 
        units: 12, 
        status: 'active',
        phase: 'Flowers District (تقسيم الزهور) // Excavation Phase',
        image: '/assets/buildings/qasr-22.png'
      },
      { 
        id: 'qasr-18', 
        name: 'AL-QASR 18', 
        units: 8, 
        status: 'active',
        phase: 'Examination Bridge (كوبري الفحص) // Al-Habitat District',
        image: '/assets/buildings/qasr-18.png'
      },
    ]
  },
  toukh: {
    id: 'toukh',
    name: 'TOUKH_DOM_NODE',
    nameAr: 'طوخ القليوبية',
    coords: { x: 450, y: 320 },
    landmarks: ['Highway spine'],
    qasrs: [
      { 
        id: 'qasr-19', 
        name: 'AL-QASR 19', 
        units: 5, 
        status: 'active',
        phase: 'Stabilized'
      },
      { 
        id: 'qasr-15', 
        name: 'AL-QASR 15', 
        units: 10, 
        status: 'active',
        phase: 'Court St (شارع المحكمة) // Next to Central',
        image: '/assets/buildings/qasr-15.png'
      },
    ]
  }
}

import { neuralAudio } from '@/lib/neural-audio'

interface MapConsoleProps {
  onQasrSelect: (qasrId: string) => void
}

export default function BeitAlKhairMapConsole({ onQasrSelect }: MapConsoleProps) {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const handleQasrInteraction = (q: QasrNode) => {
    if (q.id === 'qasr-22') {
      neuralAudio.playHeavyMachinery()
    } else if (q.id === 'qasr-18') {
      neuralAudio.playBridgeSync()
    } else if (q.id === 'qasr-15') {
      neuralAudio.playCentralSync()
    } else {
      neuralAudio.playNodeDecrypt()
    }
    onQasrSelect(q.id)
  }

  return (
    <div className="relative w-full h-full bg-[#050811] rounded-[4rem] overflow-hidden border-2 border-white/5 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] hud-scanline">
      {/* ... (Previous Scanline and Header layers remain same) */}
      
      {/* 🏙️ BUILDING_VIEW_QUANTUM_SYNC */}
      <AnimatePresence mode="wait">
        {!selectedCity ? (
           // ... (Map view content from previous turns)
           <div className="absolute inset-0 flex flex-col p-16">
              {/* Telemetry Header */}
              <div className="flex justify-between items-start mb-12 z-10">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="w-3 h-3 bg-sahara-gold rounded-full animate-ping shadow-[0_0_15px_#c5a059]" />
                    <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.6em] italic robotic-digits">GEO_TELEMETRY_DECRYPTED</span>
                  </div>
                  <h2 className="text-5xl font-black text-white italic tracking-[-0.05em] uppercase leading-none text-luxury-gold">GEOGRAPHIC_COMMAND</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest robotic-digits mb-2">LAT: 30.4591 // LONG: 31.1786</p>
                  <p className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.3em]">RESCANNING_NODAL_FIELD...</p>
                </div>
              </div>

              <div className="relative flex-1 flex items-center justify-center">
                  <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                    <defs>
                      <radialGradient id="nodePulse" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#c5a059" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#c5a059" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* 🌊 NILE_RIVER_SPINE (West) */}
                    <motion.path d="M120,-50 Q160,100 130,250 T140,550" fill="none" stroke="#00ffff" strokeWidth="12" strokeOpacity="0.1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4 }} />
                    
                    {/* 🛣️ ALEXANDRIA_AGRICULTURE_ROAD (Artery 1) */}
                    <motion.path d="M250,-20 L350,220 L480,480 L550,600" fill="none" stroke="#c5a059" strokeWidth="4" strokeOpacity="0.15" />

                    {/* 📍 BANHA_DOMINATION_NODE */}
                    <g className="cursor-pointer group" onMouseEnter={() => setHoveredNode('banha')} onMouseLeave={() => setHoveredNode(null)} onClick={() => { setSelectedCity(CITY_DATA.banha); setHoveredNode(null); }}>
                      <motion.circle cx={CITY_DATA.banha.coords.x} cy={CITY_DATA.banha.coords.y} r="12" fill="#c5a059" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3 }} />
                      <circle cx={CITY_DATA.banha.coords.x} cy={CITY_DATA.banha.coords.y} r="35" fill="url(#nodePulse)" className="animate-pulse" />
                      <text x={CITY_DATA.banha.coords.x + 20} y={CITY_DATA.banha.coords.y - 10} className="text-xl font-black fill-white uppercase tracking-[0.4em] italic robotic-digits">BANHA</text>
                    </g>

                    {/* 📍 TOUKH_DOMINATION_NODE */}
                    <g className="cursor-pointer group" onMouseEnter={() => setHoveredNode('toukh')} onMouseLeave={() => setHoveredNode(null)} onClick={() => { setSelectedCity(CITY_DATA.toukh); setHoveredNode(null); }}>
                      <motion.circle cx={CITY_DATA.toukh.coords.x} cy={CITY_DATA.toukh.coords.y} r="10" fill="#c5a059" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} />
                      <circle cx={CITY_DATA.toukh.coords.x} cy={CITY_DATA.toukh.coords.y} r="25" fill="url(#nodePulse)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                      <text x={CITY_DATA.toukh.coords.x + 20} y={CITY_DATA.toukh.coords.y + 10} className="text-xl font-black fill-white uppercase tracking-[0.4em] italic robotic-digits">TOUKH</text>
                    </g>
                  </svg>
              </div>
           </div>
        ) : (
          <motion.div 
            key="building-view"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="absolute inset-0 flex flex-col p-16 z-20"
          >
            <div className="flex justify-between items-center mb-16">
              <button 
                onClick={() => setSelectedCity(null)}
                className="group flex items-center gap-6 text-sahara-gold hover:text-white transition-all text-xs font-black uppercase tracking-[0.6em] italic"
              >
                <span className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-sahara-gold/20 group-hover:bg-sahara-gold group-hover:text-black transition-all">←</span> 
                GEO_RETURN_CMD
              </button>
              <div className="text-right">
                <span className="px-6 py-2 bg-sahara-gold/10 rounded-full border border-sahara-gold/30 text-sahara-gold text-[8px] font-black uppercase tracking-[0.5em] italic">{selectedCity.nameAr} // QALYUBIA</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 overflow-y-auto pr-8 custom-scrollbar pb-10">
              {selectedCity.qasrs.map((q) => (
                <motion.div 
                  key={q.id}
                  whileHover={{ scale: 1.02, translateY: -5 }}
                  onClick={() => handleQasrInteraction(q)}
                  className="group cursor-pointer prestige-glass rounded-[3.5rem] overflow-hidden hover:border-sahara-gold/50 transition-all flex flex-col relative aspect-[16/10]"
                >
                  {/* 🖼️ REAL-WORLD_QUANTUM_VISUAL */}
                  {q.image ? (
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={`/brain/0050deeb-1fda-41ae-a73f-1b6e50868d45/${q.image}`} 
                        alt={q.name}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity grayscale-[30%] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-white/5 z-0" />
                  )}

                  <div className="relative z-10 p-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-2 h-2 bg-sahara-gold rounded-full shadow-[0_0_10px_#c5a059]" />
                        <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.5em] robotic-digits">MANIFEST_NODE // {q.status}</span>
                      </div>
                      <h3 className="text-5xl font-black text-white italic tracking-[-0.08em] uppercase leading-none mb-3 text-luxury-gold">{q.name}</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] robotic-digits">{q.phase}</p>
                    </div>

                    <div className="flex justify-between items-end bg-black/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/10">
                        <div>
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 leading-none">UNITS_LOCATED</p>
                            <p className="text-3xl font-black text-white robotic-digits italic leading-none">{q.units}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-4 block leading-none underline decoration-sahara-gold/30">SYNC_STATUS_LIVE</span>
                            <div className="flex gap-1.5 justify-end">
                                {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-sahara-gold/40 animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
                            </div>
                        </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
