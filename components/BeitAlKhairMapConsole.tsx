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
  city?: {
    name: string
    nameAr: string
  }
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
    title: 'المشاريع الحصرية',
    subtitle: 'أرقى مواقع القليوبية المتاحة للحجز المباشر',
    units: 'الوحدات',
    view: 'عاين المشروع',
    city: 'المدينة'
  },
  en: {
    title: 'EXCLUSIVE PROJECTS',
    subtitle: 'THE FINEST QUEBEC LOCATIONS FOR DIRECT BOOKING',
    units: 'UNITS',
    view: 'VIEW PROJECT',
    city: 'CITY'
  }
}

import { neuralAudio } from '@/lib/neural-audio'

interface MapConsoleProps {
  properties?: any[]
  onQasrSelect: (qasrId: string) => void
}

export default function BeitAlKhairMapConsole({ properties, onQasrSelect }: MapConsoleProps) {
  const { language } = useLanguage()
  const t = DICTIONARY[language]

  const handleQasrInteraction = (q: any) => {
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
  
  // Condense uploaded properties into specific Qasr projects
  const loadedQasrs = properties?.reduce((acc: any, p: any) => {
    // Extract base name, e.g. "Qasr 21" or "Qasr 19" from the uploaded title
    const qasrName = p.title.replace(/\(.*?\)/g, '').split('-')[0].trim() || 'Beit AlKhair Project';
    if (!acc[qasrName]) {
      // Find the first image from the db array or fallback to the cinematic visual
      let finalImg = '/campaigns/beit-alkhair/qasr_toukh_cinematic.png';
      if (p.imageUrls && p.imageUrls.length > 0) finalImg = p.imageUrls[0];
      else if (p.imageUrl) finalImg = p.imageUrl;
      
      acc[qasrName] = {
        id: qasrName, 
        name: qasrName,
        phase: p.location || 'Qalyubia / Premium Sector',
        city: { 
            name: p.location?.toLowerCase().includes('banha') || p.location?.includes('بنها') ? 'BANHA' : 'TOUKH', 
            nameAr: p.location?.toLowerCase().includes('banha') || p.location?.includes('بنها') ? 'بنها' : 'طوخ' 
        },
        units: 0,
        image: finalImg
      }
    }
    acc[qasrName].units += 1;
    return acc;
  }, {})

  // Map to array or fallback to hardcoded if DB is empty
  const allQasrs = properties?.length 
    ? Object.values(loadedQasrs) as QasrNode[] 
    : [
        ...CITY_DATA.banha.qasrs.map(q => ({ ...q, city: CITY_DATA.banha })),
        ...CITY_DATA.toukh.qasrs.map(q => ({ ...q, city: CITY_DATA.toukh }))
      ]

  return (
    <div className="relative w-full h-full bg-transparent rounded-[4rem] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 z-0 pointer-events-auto" />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes lidar-scan {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }
        .animate-lidar {
            animation: lidar-scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />
      
      <div className="absolute inset-0 flex flex-col p-4 lg:p-12 z-20">
        {/* Luxury Header */}
        <div className="flex justify-between items-end mb-8 border-b border-sahara-gold/20 pb-6 pointer-events-none">
            <div>
                <h2 className={`text-4xl lg:text-5xl font-black text-white tracking-[-0.05em] uppercase leading-none text-luxury-gold ${language === 'en' ? 'italic tracking-[0.2em]' : 'font-["Cairo"]'}`}>
                    {t.title}
                </h2>
                <div className="flex items-center gap-2 mt-3">
                    <span className="w-1.5 h-1.5 bg-sahara-gold rounded-full" />
                    <span className="text-[9px] font-black text-sahara-gold uppercase tracking-[0.4em] robotic-digits">
                    {t.subtitle}
                    </span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto pr-2 pb-32 pointer-events-auto h-full items-start [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-sahara-gold/20 [&::-webkit-scrollbar-track]:bg-transparent">
            {allQasrs.map((q) => (
            <motion.div 
                key={q.id}
                whileHover={{ scale: 1.02, translateY: -5 }}
                onClick={() => handleQasrInteraction(q)}
                className="group cursor-pointer prestige-glass bg-black/40 backdrop-blur-3xl rounded-[3rem] overflow-hidden border border-white/5 hover:border-sahara-gold/50 transition-all flex flex-col relative min-h-[400px] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center z-[-1] opacity-50 group-hover:scale-110 group-hover:opacity-90 transition-all duration-[2000ms] ease-out mix-blend-luminosity group-hover:mix-blend-normal"
                    style={{ backgroundImage: `url('${(q as any).image || '/campaigns/beit-alkhair/qasr_toukh_cinematic.png'}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0 pointer-events-none" />
                
                {/* 🩻 LiDAR Scanning Array */}
                <div className="absolute left-0 right-0 h-[2px] bg-sahara-gold/80 shadow-[0_0_15px_#c5a059] z-0 animate-lidar pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-sahara-gold/40 before:to-transparent before:h-[50px] before:-top-[50px]" />

                {/* 🩻 Live Architectural Blueprint Framing (Active on Mobile) */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-sahara-gold/40 group-hover:border-sahara-gold/80 transition-all duration-500 rounded-tl-lg z-20 pointer-events-none" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-sahara-gold/40 group-hover:border-sahara-gold/80 transition-all duration-500 rounded-tr-lg z-20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-sahara-gold/40 group-hover:border-sahara-gold/80 transition-all duration-500 rounded-bl-lg z-20 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-sahara-gold/40 group-hover:border-sahara-gold/80 transition-all duration-500 rounded-br-lg z-20 pointer-events-none" />

                {/* 🩻 Coordinate Data Trackers */}
                <div className="absolute top-[30%] right-6 opacity-60 group-hover:opacity-100 transition-all duration-700 z-20 pointer-events-none flex items-center gap-2">
                    <span className="text-[6px] font-black tracking-widest text-sahara-gold uppercase robotic-digits">[SYS_TRACKING]</span>
                    <span className="w-1.5 h-1.5 bg-sahara-gold rounded-full animate-ping" />
                </div>
                <div className="absolute top-[60%] left-6 opacity-60 group-hover:opacity-100 transition-all duration-700 z-20 pointer-events-none flex items-center gap-2">
                    <span className="w-0.5 h-3 bg-cyan-400 animate-pulse" />
                    <span className="text-[6px] font-black tracking-widest text-cyan-400 uppercase robotic-digits">[EVAL_DOM]</span>
                </div>

                <div className="relative z-10 p-8 flex flex-col h-full justify-between">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="px-3 py-1 bg-sahara-gold/10 rounded-full border border-sahara-gold/30 text-sahara-gold text-[7px] font-black uppercase tracking-[0.4em] italic">
                            {language === 'ar' ? q.city?.nameAr : q.city?.name}
                        </span>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-sahara-gold group-hover:text-black transition-all">
                            →
                        </div>
                    </div>
                    <h3 className="text-4xl font-black text-white italic tracking-[-0.05em] uppercase leading-none mb-2 drop-shadow-md">{q.name}</h3>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] robotic-digits line-clamp-2">{q.phase}</p>
                </div>

                <div className="flex justify-between items-end bg-white/5 backdrop-blur-md p-5 rounded-[2rem] border border-white/10 group-hover:bg-sahara-gold/10 transition-colors">
                    <div>
                        <p className="text-[8px] font-black text-gray-500 group-hover:text-sahara-gold uppercase tracking-widest mb-1 leading-none">{t.units}</p>
                        <p className="text-2xl font-black text-white robotic-digits italic leading-none">{q.units}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-[9px] font-black text-white uppercase tracking-[0.3em] group-hover:text-sahara-gold transition-colors">{t.view}</span>
                    </div>
                </div>
                </div>
            </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}
