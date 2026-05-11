import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BiometricScanProps {
  onComplete: () => void
  identityName?: string
}

export default function BiometricScan({ onComplete, identityName = 'SOVEREIGN_USER' }: BiometricScanProps) {
  const [status, setStatus] = useState('INITIALIZING_NEURAL_UPLINK')
  const [progress, setProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)

  const aiLogs = [
    "> INITIATING QUANTUM HANDSHAKE...",
    "> LOADING ARCHITECTURAL NEURAL WEIGHTS...",
    "> BYPASSING STANDARD FIREWALLS...",
    "> PARSING 3D SPATIAL DATA...",
    "> ESTABLISHING SOVEREIGN AI NODE...",
    "> SYNCING WITH KSA_VISION_2030_GRID...",
    "> ACCESS GRANTED."
  ]

  useEffect(() => {
    const sequence = async () => {
      // 1. Initial Wake
      await new Promise(r => setTimeout(r, 800))
      setStatus('SCANNING_BIOMETRIC_SIGNATURE')
      
      // 2. Progress & Log Simulation
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1.5
        })
        setLogIndex(prev => (prev < aiLogs.length - 1 ? prev + 0.15 : prev))
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
    <div className="fixed inset-0 z-[100000] bg-[#02040a] flex flex-col items-center justify-center overflow-hidden font-mono">
      {/* 🔮 BACKGROUND_ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#22d3ee08_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-repeat" />
      
      {/* 📟 SCAN_UI_CONTAINER */}
      <div className="relative z-10 w-[320px] lg:w-[500px]">
        
        {/* LASER_SCANLINE */}
        <motion.div 
            initial={{ top: '0%' }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-[-20%] right-[-20%] h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-20"
        />

        {/* IDENTITY_BOX */}
        <div className="border border-cyan-500/20 rounded-none p-1 bg-black/80 backdrop-blur-3xl relative overflow-hidden group shadow-[0_0_50px_rgba(34,211,238,0.05)]">
            <div className="border border-cyan-500/10 p-8 lg:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
                
                <div className="flex flex-col items-center gap-8">
                    {/* AI_NEURAL_CORE (Replacing generic avatar) */}
                    <div className="relative group flex items-center justify-center">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 border-[1px] border-dashed border-cyan-400/40 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute w-24 h-24 lg:w-32 lg:h-32 border-[1px] border-cyan-400/20 rounded-full animate-[spin_5s_linear_infinite_reverse]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Geometric SVG Core */}
                            <svg className="w-16 h-16 lg:w-20 lg:h-20 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                <polyline points="2 17 12 22 22 17" />
                                <polyline points="2 12 12 17 22 12" />
                            </svg>
                        </div>
                        {/* Pulsing Aura */}
                        <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl animate-pulse" />
                    </div>

                    {/* STATUS_READOUTS */}
                    <div className="text-center w-full px-2 border-b border-cyan-500/10 pb-6">
                        <p className="text-[10px] text-cyan-400 uppercase tracking-[0.4em] italic mb-3 animate-pulse">{status}</p>
                        <h2 className="text-xl lg:text-3xl font-black text-white italic tracking-[0.2em] uppercase leading-tight drop-shadow-lg">
                            {identityName.replace(/_/g, ' ')}
                        </h2>
                    </div>

                    {/* DYNAMIC_AI_TERMINAL */}
                    <div className="w-full text-left bg-black/50 p-4 border border-cyan-500/10 rounded-sm h-24 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50" />
                        <div className="pl-3 flex flex-col gap-1 justify-end h-full">
                            {aiLogs.slice(0, Math.floor(logIndex) + 1).map((log, i) => (
                                <p key={i} className={`text-[8px] lg:text-[10px] font-bold uppercase tracking-wider robotic-digits ${i === Math.floor(logIndex) ? 'text-cyan-400' : 'text-gray-600'}`}>
                                    {log}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* PROGRESS_BAR */}
                    <div className="w-full space-y-2">
                        <div className="flex justify-between text-[8px] text-gray-400 uppercase tracking-widest robotic-digits font-bold">
                            <span>NEURAL_UPLINK_STATUS</span>
                            <span className="text-cyan-400">{Math.floor(progress)}%</span>
                        </div>
                        <div className="w-full h-[2px] bg-white/5 overflow-hidden">
                            <motion.div 
                                className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* DECORATIVE_HUD_CORNER_MARKERS */}
        {[
            "top-[-10px] left-[-10px] border-t-[1px] border-l-[1px]",
            "top-[-10px] right-[-10px] border-t-[1px] border-r-[1px]",
            "bottom-[-10px] left-[-10px] border-b-[1px] border-l-[1px]",
            "bottom-[-10px] right-[-10px] border-b-[1px] border-r-[1px]"
        ].map((style, i) => (
            <div key={i} className={`absolute w-8 h-8 border-cyan-500/50 ${style}`} />
        ))}
      </div>

      {/* 🏅 SECURITY_TAG */}
      <div className="absolute bottom-8 flex flex-col items-center gap-3 opacity-40 group cursor-default">
          <div className="flex items-center gap-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
              <span className="text-[8px] font-black text-cyan-400 uppercase tracking-[1em]">AI_CORE_ACTIVE</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>
          <p className="text-[7px] text-gray-500 tracking-[0.3em] robotic-digits">EL_NAFEER_SOVEREIGN_ENGINE // V4.0</p>
      </div>
    </div>
  )
}
