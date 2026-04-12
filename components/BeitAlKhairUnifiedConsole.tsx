'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import BeitAlKhairMapConsole from './BeitAlKhairMapConsole'
import BeitAlKhairNeuralGrid from './admin/BeitAlKhairNeuralGrid'
import BeitAlKhairChatbot from './BeitAlKhairChatbot'

interface UnifiedConsoleProps {
  properties: any[]
}

export default function BeitAlKhairUnifiedConsole({ properties }: UnifiedConsoleProps) {
  const [viewState, setViewState] = useState<'MAP' | 'GRID'>('MAP')
  const [selectedQasr, setSelectedQasr] = useState<string | null>(null)
  
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
    setViewState('GRID')
  }

  const filteredProperties = selectedQasr 
    ? properties.filter(p => p.title.includes(selectedQasr.replace('_DOM_NODE', '').replace('AL-QASR ', ''))) 
    : properties

  return (
    <div 
      className="w-full h-full relative overflow-hidden flex flex-col perspective-1000 p-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {/* 🔮 QUANTUM_HUD_OVERLAY_ELEMENTS */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-sahara-gold/40 rounded-tl-[3rem] z-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-sahara-gold/40 rounded-tr-[3rem] z-50 pointer-events-none" />
      <div className="absolute bottom-12 left-0 w-20 h-20 border-b-4 border-l-4 border-sahara-gold/40 rounded-bl-[3rem] z-50 pointer-events-none" />
      <div className="absolute bottom-12 right-0 w-20 h-20 border-b-4 border-r-4 border-sahara-gold/40 rounded-br-[3rem] z-50 pointer-events-none" />

      {/* 🏙️ OFFICIAL_QUANTUM_LOGO_HUD */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 pointer-events-none group">
        <div className="quantum-luxe-logo-container w-32 h-32 overflow-hidden flex items-center justify-center">
          <img 
            src="/assets/branding/logo.png" 
            alt="Beit Al-Khair Official Logo" 
            className="w-full h-full object-contain brightness-110"
          />
          <div className="quantum-luxe-logo-shine" />
        </div>
        <div className="flex flex-col items-center -mt-2">
          <span className="text-[8px] font-black text-sahara-gold uppercase tracking-[0.8em] italic leading-none ml-2 drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]">BEIT AL-KHAIR</span>
          <span className="text-[6px] font-black text-gray-500 uppercase tracking-[0.4em] mt-1">EST. 2024 // QUANTUM_STABILIZED</span>
        </div>
      </div>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative z-10"
      >
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
                    <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span> 
                    EXIT_NODE_DOMAIN
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
      </motion.div>

      {/* 🤖 THE_FINANCIAL_ORCHESTRATOR */}
      <BeitAlKhairChatbot />
    </div>
  )
}
