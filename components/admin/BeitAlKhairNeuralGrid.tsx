'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  { id: 'syn-1', title: 'AL-QASR 21 EXEC', location: 'New Lotus // 5th Settl.', price: 4250000, status: 'available' },
  { id: 'syn-2', title: 'AL-QASR 19 PLATINUM', location: 'New Lotus // 5th Settl.', price: 5100000, status: 'available' },
  { id: 'syn-3', title: 'AL-QASR 18 TOUKH', location: 'Toukh // Qalyubia', price: 2100000, status: 'sold' },
  { id: 'syn-4', title: 'BANHA ELITE SUITE', location: 'Banha // Qalyubia', price: 3450000, status: 'available' },
  { id: 'syn-5', title: 'LOTUS NODAL A1', location: 'New Lotus // 5th Settl.', price: 4800000, status: 'available' },
]

export default function BeitAlKhairNeuralGrid({ properties, userRole, onStatusToggle }: NeuralGridProps) {
  const [selectedNode, setSelectedNode] = useState<Property | null>(null)
  const [isAudioInitialized, setAudioInitialized] = useState(false)
  const [gridReady, setGridReady] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  // Use legitimate properties if available, otherwise deploy Synthetic Intelligence
  const activeProperties = properties.length > 0 ? properties : SYNTHETIC_NODES

  useEffect(() => {
    setTimeout(() => setGridReady(true), 500)
  }, [])

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

  const handleToggle = async (p: Property) => {
    if (userRole !== 'owner') return
    const newStatus = p.status === 'sold' ? 'available' : 'sold'
    neuralAudio.playStatusPulse()
    if (onStatusToggle) onStatusToggle(p.id, newStatus)
  }

  // Generate node positions for the neural network look
  const nodes = activeProperties.map((p, i) => {
    const angle = (i / activeProperties.length) * Math.PI * 2
    const radius = 180 + Math.sin(i * 1.5) * 40
    return {
      ...p,
      x: 400 + Math.cos(angle) * radius,
      y: 300 + Math.sin(angle) * radius,
    }
  })

  return (
    <div className="relative w-full aspect-square md:aspect-video bg-black rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(212,175,55,0.15)] touch-none cursor-crosshair">
      {/* 🌀 CYBER-GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, #c5a059 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} />
      <div className="absolute inset-0 bg-gradient-to-tr from-sahara-gold/5 via-transparent to-sahara-gold/5 pointer-events-none" />

      {/* 📡 SYSTEM SCANNING ANIMATION */}
      <motion.div 
        animate={{ y: ['0%', '100%', '0%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-1 bg-sahara-gold/5 blur-sm pointer-events-none z-10"
      />

      <svg 
        ref={svgRef}
        viewBox="0 0 800 600" 
        className="w-full h-full relative z-20"
        onClick={handleInteraction}
      >
        {/* 🕸️ DYNAMIC CONNECTION WEB */}
        {gridReady && nodes.map((node, i) => (
          nodes.slice(i + 1).map((other, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={node.x} y1={node.y}
              x2={other.x} y2={other.y}
              stroke={node.status === 'sold' || other.status === 'sold' ? '#222' : '#c5a059'}
              strokeWidth="0.5"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 0.15, pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))
        ))}

        {/* 🛰️ ACTIVE PROPERTY NODES */}
        {gridReady && nodes.map((node, i) => (
          <g 
            key={node.id} 
            className="cursor-pointer group"
            onClick={(e) => { e.stopPropagation(); handleNodeClick(node); }}
          >
            {/* 🌋 NEURAL PULSE RADIUS */}
            {node.status !== 'sold' && (
              <motion.circle
                cx={node.x} cy={node.y} r={15}
                fill="none" stroke="#c5a059" strokeWidth="1"
                animate={{ r: [15, 35], opacity: [0.4, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
              />
            )}
            
            {/* 💎 CORE NODE SPHERE */}
            <motion.circle
              cx={node.x} cy={node.y} r={10}
              fill={node.status === 'sold' ? '#1a1a1a' : '#c5a059'}
              stroke="#000" strokeWidth="2"
              whileHover={{ scale: 1.6, fill: '#fff' }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                filter: selectedNode?.id === node.id ? 'drop-shadow(0 0 15px #c5a059)' : 'none'
              }}
              transition={{ type: 'spring', damping: 10, stiffness: 100, delay: i * 0.1 }}
            />
            
            {/* 🏷️ CRYPTIC TEXT LABEL */}
            <text 
              x={node.x} y={node.y + 30} 
              textAnchor="middle" 
              className="fill-white/30 text-[7px] font-black uppercase tracking-[0.3em] pointer-events-none select-none italic"
            >
              PROJECT_NODE_{i + 1}
            </text>
          </g>
        ))}
      </svg>

      {/* 🏢 ELITE OWNER/CUSTOMER HUD */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            className="absolute bottom-8 inset-x-8 mx-auto max-w-lg shadow-2xl z-50 pointer-events-auto"
          >
            <div className="milky-glass border border-sahara-gold/40 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sahara-gold/10 blur-[50px] pointer-events-none" />
                
                <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2 text-[8px] font-black text-sahara-gold uppercase tracking-[0.5em] mb-3">
                        <span className="w-1.5 h-1.5 bg-sahara-gold rounded-full animate-ping" />
                        NODE_SYNCED // {selectedNode.status.toUpperCase()}
                    </div>
                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">{selectedNode.title}</h3>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{selectedNode.location}</p>
                </div>
                <button 
                    onClick={() => setSelectedNode(null)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sahara-gold hover:text-black transition-all text-xs"
                >✕</button>
                </div>

                <div className="space-y-6">
                {userRole === 'owner' ? (
                    <div className="space-y-4">
                    <button 
                        onClick={() => handleToggle(selectedNode)}
                        className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all ${
                        selectedNode.status === 'sold' 
                            ? 'bg-white/10 text-white hover:bg-white/20' 
                            : 'bg-sahara-gold text-black shadow-[0_10px_40px_rgba(212,175,55,0.4)] hover:scale-105'
                        }`}
                    >
                        {selectedNode.status === 'sold' ? 'MARK_AS_AVAILABLE' : 'MARK_AS_SOLD'}
                    </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2 p-6 bg-white/5 border border-white/10 rounded-3xl relative">
                            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-none absolute top-4 left-6">VALUATION_DECRYPTED</span>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-3xl font-black robotic-digits text-white tracking-widest">
                                {selectedNode.status === 'sold' ? '---' : selectedNode.price.toLocaleString()} <span className="text-[10px] text-sahara-gold not-italic">EGP</span>
                                </span>
                                <a 
                                    href={`https://wa.me/201033332112?text=I%20am%20interested%20in%20DOMINATION_NODE:%20${selectedNode.title}`}
                                    className="px-6 py-3 bg-sahara-gold text-black rounded-2xl font-black text-[9px] uppercase tracking-widest hover:scale-110 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.3)]"
                                >
                                    RESERVE_UNIT
                                </a>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📟 TERMINAL STATUS BAR */}
      <div className="absolute top-8 inset-x-8 flex justify-between items-center pointer-events-none z-30">
        <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <div className={`w-2 h-2 rounded-full ${isAudioInitialized ? 'bg-sahara-gold shadow-[0_0_10px_#c5a059]' : 'bg-gray-800 animate-pulse'}`} />
          <span className="text-[8px] font-black text-white uppercase tracking-[0.3em]">{isAudioInitialized ? 'NETWORK_CONNECTED' : 'INITIALIZE_NEURAL_LINK'}</span>
        </div>
        
        {!isAudioInitialized && (
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleInteraction}
                className="pointer-events-auto px-6 py-3 bg-sahara-gold/10 border border-sahara-gold/40 text-sahara-gold rounded-full text-[8px] font-black uppercase tracking-widest hover:bg-sahara-gold hover:text-black transition-all animate-bounce"
            >
                START_SENSORY_SYNC
            </motion.button>
        )}
      </div>

      {/* 🧭 NAVIGATION COORDINATES */}
      <div className="absolute bottom-8 right-12 text-right pointer-events-none">
        <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest robotic-digits mb-1">LAT: 30.0444 // LONG: 31.2357</p>
        <p className="text-[8px] font-black text-sahara-gold uppercase tracking-[0.4em] robotic-digits">DOMINATION_MODE_ACTIVE</p>
      </div>
    </div>
  )
}
