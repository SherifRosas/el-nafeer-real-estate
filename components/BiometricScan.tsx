'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BiometricScanProps {
  onComplete: () => void
  identityName?: string
}

export default function BiometricScan({ onComplete, identityName = 'SOVEREIGN_USER' }: BiometricScanProps) {
  const [status, setStatus] = useState('INITIALIZING_SCAN')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const sequence = async () => {
      // 1. Initial Wake
      await new Promise(r => setTimeout(r, 800))
      setStatus('SCANNING_BIOMETRIC_SIGNATURE')
      
      // 2. Progress Simulation
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 30)

      await new Promise(r => setTimeout(r, 1800))
      setStatus('VALIDATING_IDENTITY_MATCH')
      
      await new Promise(r => setTimeout(r, 1200))
      setStatus('SOVEREIGN_ACCESS_GRANTED')
      
      await new Promise(r => setTimeout(r, 1000))
      onComplete()
    }

    sequence()
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[100000] bg-[#050811] flex flex-col items-center justify-center overflow-hidden font-mono">
      {/* 🔮 BACKGROUND_ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#c5a05911_0%,_transparent_70%)]" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />
      
      {/* 📟 SCAN_UI_CONTAINER */}
      <div className="relative z-10 w-[300px] lg:w-[450px]">
        
        {/* LASER_SCANLINE */}
        <motion.div 
            initial={{ top: '0%' }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-[-20%] right-[-20%] h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-20"
        />

        {/* IDENTITY_BOX */}
        <div className="border border-white/10 rounded-[2rem] p-10 bg-black/60 backdrop-blur-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
            
            <div className="flex flex-col items-center gap-8">
                {/* BIOMETRIC_AVATAR */}
                <div className="relative group">
                    <div className="w-32 h-32 lg:w-40 lg:h-40 border-2 border-dashed border-cyan-400/30 rounded-full animate-spin-slow" />
                    <div className="absolute inset-2 border-2 border-cyan-400 rounded-full flex items-center justify-center bg-cyan-400/5 group-hover:bg-cyan-400/10 transition-colors">
                        <span className="text-4xl lg:text-6xl text-cyan-400 opacity-60">👤</span>
                    </div>
                    {/* Pulsing Aura */}
                    <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl animate-pulse" />
                </div>

                {/* STATUS_READOUTS */}
                <div className="text-center space-y-3">
                    <p className="text-[10px] text-cyan-400/50 uppercase tracking-[0.5em] italic">{status}</p>
                    <h2 className="text-xl lg:text-2xl font-black text-white italic tracking-[0.1em] uppercase leading-tight break-all">
                        {identityName}
                    </h2>
                </div>

                {/* PROGRESS_BAR */}
                <div className="w-full space-y-2">
                    <div className="flex justify-between text-[8px] text-gray-500 uppercase tracking-widest robotic-digits">
                        <span>ESTABLISHING_LINK</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* DECORATIVE_HUD_CORNER_MARKERS */}
        {[
            "top-0 left-0 border-t-2 border-l-2",
            "top-0 right-0 border-t-2 border-r-2",
            "bottom-0 left-0 border-b-2 border-l-2",
            "bottom-0 right-0 border-b-2 border-r-2"
        ].map((style, i) => (
            <div key={i} className={`absolute w-12 h-12 border-cyan-400/40 rounded-3xl ${style}`} />
        ))}
      </div>

      {/* 🏅 SECURITY_TAG */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30 group cursor-default">
          <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-gray-500" />
              <span className="text-[9px] font-black text-white uppercase tracking-[0.8em]">QUANTUM_SECURED_PROTOCOL</span>
              <div className="h-[1px] w-12 bg-gray-500" />
          </div>
          <p className="text-[7px] text-gray-700 italic robotic-digits">ENCRYPTION: AES_256_RSA // ORIGIN: EGYPT_SOVEREIGN_MESH</p>
      </div>

      {/* SCAN_SWEEP_SOUND_EFFECT_PLACEHOLDER */}
      <div className="hidden">
           {/* Sound triggered by effects */}
      </div>
    </div>
  )
}
