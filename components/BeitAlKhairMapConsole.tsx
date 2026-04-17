'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from './LanguageContext'

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
    name: 'BANHA',
    nameAr: 'بنها',
    coords: { x: 300, y: 180 },
    landmarks: ['Flowers District', 'Examination Bridge', 'Al-Habitat'],
    qasrs: [
      { 
        id: 'qasr-21', 
        name: 'AL-QASR 21', 
        units: 14, 
        status: 'active',
        phase: 'Flowers District (تقسيم الزهور) // 4th Floor Columns',
        image: 'qasr-21.png'
      },
      { 
        id: 'qasr-22', 
        name: 'AL-QASR 22', 
        units: 12, 
        status: 'active',
        phase: 'Flowers District (تقسيم الزهور) // Excavation Phase',
        image: 'qasr-22.png'
      },
      { 
        id: 'qasr-18', 
        name: 'AL-QASR 18', 
        units: 8, 
        status: 'active',
        phase: 'Examination Bridge (كوبري الفحص) // Al-Habitat District',
        image: 'qasr-18.png'
      },
    ]
  },
  toukh: {
    id: 'toukh',
    name: 'TOUKH',
    nameAr: 'طوخ',
    coords: { x: 410, y: 300 },
    landmarks: ['Highway spine'],
    qasrs: [
      { 
        id: 'qasr-19', 
        name: 'AL-QASR 19', 
        units: 5, 
        status: 'active',
        phase: 'Stabilized // Luxury Facade Mastery',
        image: 'qasr-19.png'
      },
      { 
        id: 'qasr-15', 
        name: 'AL-QASR 15', 
        units: 10, 
        status: 'active',
        phase: 'Court St (شارع المحكمة) // Next to Central',
        image: 'qasr-15.png'
      },
    ]
  }
}

const DICTIONARY = {
  ar: {
    geo_cmd: 'القيادة الجغرافية',
    telemetry: 'تم فك تشفير البيانات',
    rescanning: 'إعادة مسح النودز...',
    hq: 'المقر الرئيسي',
    south_node: 'النود الجنوبي',
    north: '↑ شمال الدلتا',
    south: 'جنوب القاهرة ↓',
    units: 'الوحدات',
    sync: 'مزامنة حيوية',
    return: 'العودة'
  },
  en: {
    geo_cmd: 'GEOGRAPHIC COMMAND',
    telemetry: 'GEO TELEMETRY DECRYPTED',
    rescanning: 'RESCANNING NODAL FIELD...',
    hq: 'HQ DOMAIN',
    south_node: 'SOUTHERN NODE',
    north: '↑ NORTH DELTA',
    south: 'SOUTH CAIRO GIZA ↓',
    units: 'UNITS LOCATED',
    sync: 'SYNC STATUS LIVE',
    return: 'GEO RETURN'
  }
}

import { neuralAudio } from '@/lib/neural-audio'

interface MapConsoleProps {
  onQasrSelect: (qasrId: string) => void
}

export default function BeitAlKhairMapConsole({ onQasrSelect }: MapConsoleProps) {
  const { language } = useLanguage()
  const t = DICTIONARY[language]
  
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
    <div className="relative w-full h-full bg-black/10 rounded-[4rem] overflow-hidden border-2 border-white/5 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] hud-scanline">
      
      {/* 🏙️ BUILDING_VIEW_QUANTUM_SYNC */}
      <AnimatePresence mode="wait">
        {!selectedCity ? (
            <div className="absolute inset-0 flex flex-col p-4 lg:p-12">
               {/* Telemetry Header */}
               <div className="flex justify-between items-start mb-4 lg:mb-8 z-10">
                 <div>
                   <div className="flex items-center gap-2 lg:gap-4 mb-1 lg:mb-2">
                     <span className="w-2 h-2 bg-sahara-gold rounded-full animate-ping shadow-[0_0_10px_#c5a059]" />
                     <span className="text-[6px] lg:text-[9px] font-black text-sahara-gold uppercase tracking-[0.4em] lg:tracking-[0.6em] italic robotic-digits">
                        {t.telemetry}
                     </span>
                   </div>
                   <h2 className={`text-xl lg:text-4xl font-black text-white tracking-tighter uppercase leading-none text-luxury-gold ${language === 'en' ? 'italic' : ''}`}>
                        {t.geo_cmd}
                   </h2>
                 </div>
                 <div className="text-right hidden sm:block">
                   <p className="text-[8px] lg:text-[10px] font-black text-gray-700 uppercase tracking-widest robotic-digits mb-1">LAT: 30.4591 // LONG: 31.1786</p>
                   <p className="text-[8px] lg:text-[10px] font-black text-sahara-gold/40 uppercase tracking-[0.2em] lg:tracking-[0.3em] animate-pulse">
                        {t.rescanning}
                   </p>
                 </div>
               </div>

                <div className="relative flex-1 flex items-center justify-center p-4">
                  <svg 
                    viewBox="0 0 800 500" 
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full h-full max-h-[70vh] drop-shadow-[0_0_50px_rgba(212,175,55,0.05)]"
                  >
                    <defs>
                      <radialGradient id="nodePulse" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#c5a059" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#c5a059" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* 📐 TACTICAL_GRID_OVERLAY REMOVED FOR CLEAN NEURAL MESH VIEW */}

                    {/* 🧭 ORIENTATION_MARKERS */}
                    <text x="400" y="480" className="text-[10px] font-black fill-gray-500 uppercase tracking-[1em] text-center opacity-30">
                        {t.north} // {t.south}
                    </text>
                    <line x1="100" y1="475" x2="700" y2="475" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />

                    {/* 📍 BANHA_DOMINATION_NODE */}
                    <g className="cursor-pointer group" onMouseEnter={() => setHoveredNode('banha')} onMouseLeave={() => setHoveredNode(null)} onClick={() => { setSelectedCity(CITY_DATA.banha); setHoveredNode(null); }}>
                      <motion.circle cx={CITY_DATA.banha.coords.x} cy={CITY_DATA.banha.coords.y} r="14" fill="#c5a059" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }} />
                      <circle cx={CITY_DATA.banha.coords.x} cy={CITY_DATA.banha.coords.y} r="45" fill="url(#nodePulse)" className="animate-pulse" />
                      <text x={CITY_DATA.banha.coords.x + 25} y={CITY_DATA.banha.coords.y - 15} className={`text-2xl font-black fill-white uppercase tracking-[0.4em] italic robotic-digits drop-shadow-lg ${language === 'ar' ? 'font-["Cairo"]' : ''}`}>
                        {language === 'ar' ? CITY_DATA.banha.nameAr : CITY_DATA.banha.name}
                      </text>
                      <text x={CITY_DATA.banha.coords.x + 25} y={CITY_DATA.banha.coords.y + 5} className="text-[8px] font-black fill-sahara-gold uppercase tracking-[0.2em] opacity-60 italic">
                        {t.hq}
                      </text>
                    </g>

                    {/* 📍 TOUKH_DOMINATION_NODE */}
                    <g className="cursor-pointer group" onMouseEnter={() => setHoveredNode('toukh')} onMouseLeave={() => setHoveredNode(null)} onClick={() => { setSelectedCity(CITY_DATA.toukh); setHoveredNode(null); }}>
                      <motion.circle cx={CITY_DATA.toukh.coords.x} cy={CITY_DATA.toukh.coords.y} r="10" fill="#c5a059" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} />
                      <circle cx={CITY_DATA.toukh.coords.x} cy={CITY_DATA.toukh.coords.y} r="30" fill="url(#nodePulse)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                      <text x={CITY_DATA.toukh.coords.x + 25} y={CITY_DATA.toukh.coords.y + 15} className={`text-2xl font-black fill-white uppercase tracking-[0.4em] italic robotic-digits drop-shadow-lg ${language === 'ar' ? 'font-["Cairo"]' : ''}`}>
                        {language === 'ar' ? CITY_DATA.toukh.nameAr : CITY_DATA.toukh.name}
                      </text>
                      <text x={CITY_DATA.toukh.coords.x + 25} y={CITY_DATA.toukh.coords.y + 30} className="text-[8px] font-black fill-sahara-gold uppercase tracking-[0.2em] opacity-60 italic">
                        {t.south_node}
                      </text>
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
            className="absolute inset-0 flex flex-col p-4 lg:p-12 z-20"
          >
            <div className="flex justify-between items-center mb-4 lg:mb-8 pointer-events-none">
              <div className="pointer-events-auto">
                <span className="px-3 py-1 bg-sahara-gold/10 rounded-full border border-sahara-gold/30 text-sahara-gold text-[6px] lg:text-[8px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] italic">
                    {language === 'ar' ? selectedCity.nameAr : selectedCity.name} // QALYUBIA
                </span>
              </div>
              <button 
                onClick={() => setSelectedCity(null)}
                className="pointer-events-auto w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-black border border-sahara-gold flex items-center justify-center text-sahara-gold hover:bg-sahara-gold hover:text-black transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)] group"
                title={t.return}
              >
                <span className={`text-xl group-hover:-translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`}>←</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 overflow-y-auto pr-8 custom-scrollbar pb-10">
              {selectedCity.qasrs.map((q) => (
                <motion.div 
                  key={q.id}
                  whileHover={{ scale: 1.02, translateY: -5 }}
                  onClick={() => handleQasrInteraction(q)}
                  className="group cursor-pointer prestige-glass rounded-[3.5rem] overflow-hidden hover:border-sahara-gold/50 transition-all flex flex-col relative aspect-[16/10]"
                >
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
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 leading-none">{t.units}</p>
                            <p className="text-3xl font-black text-white robotic-digits italic leading-none">{q.units}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-4 block leading-none underline decoration-sahara-gold/30">{t.sync}</span>
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
