'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import BeitAlKhairMapConsole from './BeitAlKhairMapConsole'
import BeitAlKhairNeuralGrid from './admin/BeitAlKhairNeuralGrid'
import BeitAlKhairChatbot from './BeitAlKhairChatbot'
import { useLanguage } from './LanguageContext'
import { db } from '@/lib/supabase'

interface UnifiedConsoleProps {
  properties?: any[]
}

const DICTIONARY = {
  ar: {
    exit: 'الخروج_من_نطاق_النود',
    loading: 'جاري_تحميل_البيانات...',
  },
  en: {
    exit: 'EXIT_NODE_DOMAIN',
    loading: 'LOADING_DATA_STREAM...',
  }
}

export default function BeitAlKhairUnifiedConsole({ properties: initialProperties }: UnifiedConsoleProps) {
  const { language } = useLanguage()
  const t = DICTIONARY[language]
  
  const [viewState, setViewState] = useState<'MAP' | 'GRID'>('MAP')
  const [selectedQasr, setSelectedQasr] = useState<string | null>(null)
  const [properties, setProperties] = useState<any[]>(initialProperties || [])
  const [loading, setLoading] = useState(!initialProperties?.length)

  useEffect(() => {
    if (!initialProperties?.length) {
      const fetchData = async () => {
        const data = await db.getPublicProperties()
        let filtered = data.filter(p => 
          p.property_owners?.companyName?.includes('Beit Al-Khair') || 
          p.location.toLowerCase().includes('lotus') || 
          p.location.toLowerCase().includes('toukh') ||
          p.location.toLowerCase().includes('banha')
        )
        
        // 💎 FLAGSHIP_FALLBACK_HYDRATION: Guaranteeing Qasrs exist for the demo
        if (filtered.length === 0) {
            filtered = [
                { id: 'bq-18', title: 'Qasr 18 (قصر 18)', location: 'Toukh, Qalyubia (طوخ)', price: 4500000, description: 'Smart Home Palace with extreme luxury finishes. 150 SQM.', status: 'available', features: ['AI Smart Home', 'Italian Marble', 'Private Security'] },
                { id: 'bq-19', title: 'Qasr 19 (قصر 19)', location: 'Banha, Qalyubia (بنها)', price: 5200000, description: 'Panoramic Views and elite community. 180 SQM.', status: 'available', features: ['Panoramic Glass', 'Underground Parking', 'Smart Climate Control'] },
                { id: 'bq-21', title: 'Qasr 21 (قصر 21)', location: 'Toukh, Qalyubia (طوخ)', price: 6000000, description: 'The absolute zenith of Qalyubia Real Estate. 240 SQM.', status: 'available', features: ['Private Elevator', 'Penthouse Access', 'Neural Orchestrator Hub'] }
            ];
        }

        setProperties(filtered)
        setLoading(false)
      }
      fetchData()
    }
  }, [initialProperties])
  
  // 🌌 NEURAL_PARALLAX_DRIFT_ENGINE
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-2deg", "2deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["2deg", "-2deg"])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleQasrSelect = (qasrId: string) => {
    setSelectedQasr(qasrId)
    setViewState('GRID') // Manifest the detailed Building-Specific Construction HUD
  }

  const filteredProperties = selectedQasr 
    ? properties.filter(p => {
        const qId = selectedQasr.toLowerCase().replace(/[^0-9]/g, '')
        const pTitle = p.title.toLowerCase()
        return pTitle.includes(qId) || pTitle.includes(selectedQasr.toLowerCase())
      }) 
    : properties

  if (loading) return (
    <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sahara-gold/20 border-t-sahara-gold rounded-full animate-spin" />
            <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[1em] italic animate-pulse">{t.loading}</span>
        </div>
    </div>
  )

  return (
    <div 
      className="w-full h-full relative overflow-hidden flex flex-col p-4"
    >
      <div className="w-full h-full relative z-10">
        <AnimatePresence mode="wait">
            {viewState === 'MAP' ? (
            <motion.div 
                key="map-container"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                transition={{ duration: 1.2, ease: "anticipate" }}
                className="w-full h-full"
            >
                <BeitAlKhairMapConsole onQasrSelect={handleQasrSelect} />
            </motion.div>
            ) : (
            <motion.div 
                key="grid-container"
                initial={{ opacity: 0, x: 200, filter: "brightness(0)" }}
                animate={{ opacity: 1, x: 0, filter: "brightness(1)" }}
                exit={{ opacity: 0, x: -200, filter: "brightness(0)" }}
                transition={{ duration: 1, ease: "circOut" }}
                className="w-full h-full relative"
            >
                {/* Back Button HUD */}
                <div className="absolute top-10 left-10 z-[100]">
                <button 
                    onClick={() => setViewState('MAP')}
                    className="group px-10 py-4 bg-black/80 backdrop-blur-3xl border-2 border-sahara-gold/40 text-sahara-gold rounded-full text-[10px] font-black uppercase tracking-[0.6em] hover:bg-sahara-gold hover:text-black transition-all flex items-center gap-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                >
                    <span className={`text-xl group-hover:-translate-x-2 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`}>←</span> 
                    {t.exit}
                </button>
                </div>

                <div className="w-full h-full prestige-glass rounded-[4rem] overflow-hidden">
                    <BeitAlKhairNeuralGrid 
                        properties={filteredProperties} 
                        userRole="customer" 
                    />
                </div>
            </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* 🤖 THE_FINANCIAL_ORCHESTRATOR */}
      <BeitAlKhairChatbot />
    </div>
  )
}
