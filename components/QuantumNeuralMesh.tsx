'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Node {
  id: number
  x: number
  y: number
  label?: string
  priority?: boolean
}

export default function QuantumNeuralMesh() {
  // --- EGYPTIAN DOMAIN COORDINATES (Stylized SVG Mapping) ---
  // Focusing nodes on Qalyubia/Toukh/Banha cluster + general Egypt coverage
  const nodes = useMemo(() => [
    // Core Focus Nodes (Toukh/Banha/Qalyubia Cluster)
    { id: 1, x: 52, y: 15, label: 'TOUKH_MAIN', priority: true },
    { id: 2, x: 53.5, y: 16.5, label: 'BANHA_CENTER', priority: true },
    { id: 3, x: 51, y: 18, label: 'QALYUB_NODE', priority: true },
    { id: 4, x: 54, y: 13, label: 'LOTUS_NORTH', priority: true },
    
    // Greater Egypt Network (Global Coverage)
    { id: 5, x: 48, y: 15, label: 'ALEXANDRIA' },
    { id: 6, x: 55, y: 22, label: 'CAIRO_EAST' },
    { id: 7, x: 50, y: 25, label: 'GIZA_PROXIMITY' },
    { id: 8, x: 65, y: 40, label: 'HURGHADA' },
    { id: 9, x: 55, y: 60, label: 'LUXOR' },
    { id: 10, x: 50, y: 80, label: 'ASWAN' },
    { id: 11, x: 30, y: 10, label: 'SIWA' },
    { id: 12, x: 80, y: 15, label: 'SINAI_NORTH' },
    { id: 13, x: 85, y: 30, label: 'SHARM_EL_SHEIKH' },
    { id: 14, x: 35, y: 55, label: 'WESTERN_DESERT' },
  ], [])

  // Generate connection arcs between nodes
  const connections = useMemo(() => {
    const lines = []
    const coreIds = [1, 2, 3, 4]
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const n1 = nodes[i]
            const n2 = nodes[j]
            const dist = Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2))
            
            // Priority connections for the Toukh cluster or close proximity neighbors
            if (dist < 25 || (coreIds.includes(n1.id) && coreIds.includes(n2.id))) {
                lines.push({ id: `${i}-${j}`, n1, n2 })
            }
        }
    }
    return lines
  }, [nodes])

  return (
    <div className="absolute inset-0 z-0 bg-[#050811] overflow-hidden">
      {/* 🌌 GOLDEN_STARFIELD_BACKGROUND (Luxe Aesthetic) */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_#c5a05922_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />
      
      {/* 🇪🇬 EGY_SILHOUETTE (Subtle Geographic Context) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <path 
            d="M30,5 L80,5 L95,40 L85,95 L40,95 L15,40 Z" 
            fill="none" 
            stroke="#c5a059" 
            strokeWidth="0.5" 
            className="animate-pulse"
        />
      </svg>

      {/* 🕸️ NEURAL_MESH_LAYERS */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ANCHOR_LINES (Neural Connections) */}
        {connections.map((conn) => (
          <motion.path
            key={conn.id}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 3, delay: Math.random() * 2, repeat: Infinity, repeatType: 'reverse' }}
            d={`M ${conn.n1.x} ${conn.n1.y} Q ${(conn.n1.x + conn.n2.x)/2 + (Math.random()-0.5)*10} ${(conn.n1.y + conn.n2.y)/2 + (Math.random()-0.5)*10} ${conn.n2.x} ${conn.n2.y}`}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="0.1"
            strokeDasharray="1 2"
          />
        ))}

        {/* SOVEREIGN_NODES */}
        {nodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.priority ? 0.8 : 0.4}
              fill="#06b6d4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
              filter="url(#glow)"
            />
            {node.priority && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={2}
                fill="url(#nodeGlow)"
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            )}
            
            {/* NODE_LABELS_HUD (The Gerry Bax Inspiration) */}
            {node.priority && (
                <text x={node.x + 1} y={node.y + 1} className="text-[1.5px] font-black fill-cyan-400 opacity-60 uppercase tracking-widest italic" style={{ fontSize: '0.8px' }}>
                    {node.label}_ACTIVE
                </text>
            )}
          </g>
        ))}
      </svg>

      {/* 🏆 GLOBAL_TITLE_OVERLAY_HUD */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.15, y: 0 }}
            transition={{ duration: 2 }}
            className="flex flex-col items-center gap-4"
        >
            <h2 className="text-[120px] font-black italic uppercase tracking-[0.2em] text-cyan-400 opacity-50 whitespace-nowrap">
                BEIT AL-KHAIR
            </h2>
            <div className="flex items-center gap-10">
                <div className="h-[1px] w-64 bg-gradient-to-r from-transparent to-cyan-400" />
                <span className="text-2xl font-black italic tracking-[0.8em] text-white/40">EGYPTIAN_QUANTUM_MESH</span>
                <div className="h-[1px] w-64 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
        </motion.div>
      </div>
    </div>
  )
}
