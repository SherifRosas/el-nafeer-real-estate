'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BeitAlKhairMapConsole from './BeitAlKhairMapConsole'
import BeitAlKhairNeuralGrid from './admin/BeitAlKhairNeuralGrid'
import BeitAlKhairChatbot from './BeitAlKhairChatbot'

interface UnifiedConsoleProps {
  properties: any[]
}

export default function BeitAlKhairUnifiedConsole({ properties }: UnifiedConsoleProps) {
  const [viewState, setViewState] = useState<'MAP' | 'GRID'>('MAP')
  const [selectedQasr, setSelectedQasr] = useState<string | null>(null)

  const handleQasrSelect = (qasrId: string) => {
    setSelectedQasr(qasrId)
    setViewState('GRID')
  }

  // 🛰️ Filter properties based on selected Qasr
  const filteredProperties = selectedQasr 
    ? properties.filter(p => p.title.includes(selectedQasr.replace('QASR-', ''))) 
    : properties

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {viewState === 'MAP' ? (
          <motion.div 
            key="map-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <BeitAlKhairMapConsole onQasrSelect={handleQasrSelect} />
          </motion.div>
        ) : (
          <motion.div 
            key="grid-container"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full h-full relative"
          >
            {/* Back Button HUD */}
            <div className="absolute top-4 left-4 z-[60]">
               <button 
                onClick={() => setViewState('MAP')}
                className="px-6 py-2 bg-black/60 backdrop-blur-md border border-sahara-gold/40 text-sahara-gold rounded-full text-[8px] font-black uppercase tracking-[0.4em] hover:bg-sahara-gold hover:text-black transition-all"
               >
                 ← EXIT_GRID_NODE
               </button>
            </div>

            <BeitAlKhairNeuralGrid 
              properties={filteredProperties} 
              userRole="customer" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🤖 THE_FINANCIAL_ORCHESTRATOR */}
      <BeitAlKhairChatbot />
    </div>
  )
}
