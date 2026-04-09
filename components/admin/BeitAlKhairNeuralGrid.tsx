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

export default function BeitAlKhairNeuralGrid({ properties, userRole, onStatusToggle }: NeuralGridProps) {
  const [selectedNode, setSelectedNode] = useState<Property | null>(null)
  const [isAudioInitialized, setAudioInitialized] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  // Initialize audio on first click
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
  const nodes = properties.map((p, i) => {
    const angle = (i / properties.length) * Math.PI * 2
    const radius = 150 + Math.random() * 50
    return {
      ...p,
      x: 400 + Math.cos(angle) * radius,
      y: 300 + Math.sin(angle) * radius,
    }
  })

  return (
    <div className="relative w-full aspect-square md:aspect-video bg-black rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] touch-none cursor-crosshair">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #c5a059 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <svg 
        ref={svgRef}
        viewBox="0 0 800 600" 
        className="w-full h-full"
        onClick={handleInteraction}
      >
        {/* Connection Lines (The Neural Network) */}
        {nodes.map((node, i) => (
          nodes.slice(i + 1).map((other, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={node.x} y1={node.y}
              x2={other.x} y2={other.y}
              stroke={node.status === 'sold' || other.status === 'sold' ? '#444' : '#c5a059'}
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 2 }}
            />
          ))
        ))}

        {/* Property Nodes */}
        {nodes.map((node) => (
          <g 
            key={node.id} 
            className="cursor-pointer group"
            onClick={(e) => { e.stopPropagation(); handleNodeClick(node); }}
          >
            {/* Pulse Effect for available units */}
            {node.status !== 'sold' && (
              <motion.circle
                cx={node.x} cy={node.y} r={12}
                fill="none" stroke="#c5a059" strokeWidth="1"
                animate={{ r: [12, 25], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
            
            {/* Main Node Circle */}
            <motion.circle
              cx={node.x} cy={node.y} r={8}
              fill={node.status === 'sold' ? '#333' : '#c5a059'}
              stroke="#000" strokeWidth="2"
              whileHover={{ scale: 1.5 }}
              animate={{
                filter: selectedNode?.id === node.id ? 'drop-shadow(0 0 15px #c5a059)' : 'none'
              }}
            />
            
            {/* Minimal Label */}
            <text 
              x={node.x} y={node.y + 25} 
              textAnchor="middle" 
              className="fill-white/40 text-[8px] font-black uppercase tracking-widest pointer-events-none"
            >
              {node.title.split(' ')[0]}
            </text>
          </g>
        ))}
      </svg>

      {/* Role-Based HUD (Heads-Up Display) */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-12 inset-x-12 mx-auto max-w-lg milky-glass border border-sahara-gold/30 rounded-[3rem] p-10 shadow-[0_0_50px_rgba(212,175,55,0.2)] z-50 pointer-events-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black text-sahara-gold uppercase tracking-[0.4em] mb-2 robotic-digits">
                  NODE_SYNCED // {selectedNode.status.toUpperCase()}
                </span>
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">{selectedNode.title}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{selectedNode.location}</p>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sahara-gold hover:text-black transition-all"
              >✕</button>
            </div>

            <div className="flex flex-col gap-6">
              {userRole === 'owner' ? (
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest leading-none">EXECUTIVE_OVERRIDE</p>
                  <button 
                    onClick={() => handleToggle(selectedNode)}
                    className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all ${
                      selectedNode.status === 'sold' 
                        ? 'bg-white/10 text-white hover:bg-white/20' 
                        : 'bg-sahara-gold text-black shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105'
                    }`}
                  >
                    {selectedNode.status === 'sold' ? 'MARK_AS_AVAILABLE' : 'MARK_AS_SOLD'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest leading-none">MARKET_VALUE_DECRYPTED</p>
                  <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-2xl font-black robotic-digits text-white">
                      {selectedNode.status === 'sold' ? '---' : selectedNode.price.toLocaleString()} <span className="text-xs text-sahara-gold not-italic">EGP</span>
                    </span>
                    <button className="px-8 py-3 bg-sahara-gold text-black rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-110 transition-all">
                      RESERVE_NODE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cross-Platform Interaction Hint */}
      {!selectedNode && (
        <div className="absolute top-10 right-10 flex items-center gap-4 px-6 py-3 rounded-full bg-black/40 border border-white/10 backdrop-blur-md opacity-60">
          <span className="w-2 h-2 bg-sahara-gold rounded-full animate-ping" />
          <span className="text-[9px] font-black text-white uppercase tracking-widest">{isAudioInitialized ? 'NETWORK_CONNECTED' : 'INITIALIZE_NEURAL_LINK'}</span>
        </div>
      )}
    </div>
  )
}
