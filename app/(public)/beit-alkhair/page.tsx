'use client'

import React, { useState, useEffect } from 'react'
import AdvancedBeitAlKhairMesh from '@/components/AdvancedBeitAlKhairMesh'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BeitAlKhairPage() {
  const [dots, setDots] = useState('...')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '.' : d + '.')
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050811] flex items-center justify-center">
      <AdvancedBeitAlKhairMesh />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-2xl mx-auto">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl border border-sahara-gold/30 bg-black/50 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.2)]">
            <img src="/campaigns/beit-alkhair/official-logo.jpg" alt="Beit Al-Khair" className="w-full h-full object-contain rounded-2xl" />
          </div>
          <p className="text-[9px] font-black text-sahara-gold/60 tracking-[0.5em] uppercase">BEIT AL-KHAIR REAL ESTATE</p>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-sahara-gold to-transparent" />
            <span className="text-[8px] font-black text-sahara-gold/50 tracking-[0.6em] uppercase">SYSTEM_STATUS</span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-sahara-gold to-transparent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-tight mb-3">
            تحت التطوير
          </h1>
          <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-widest text-sahara-gold">
            UNDER DEVELOPMENT
          </h2>
        </motion.div>

        {/* Status Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-10 w-full max-w-md"
        >
          <div className="bg-black/40 backdrop-blur-xl border border-sahara-gold/20 rounded-2xl p-6 text-right space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sahara-gold font-black text-xs font-mono">{dots}</span>
              <p className="text-gray-400 text-xs font-bold">نعمل على إطلاق المنصة قريباً</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-mono">INITIALIZING_SYSTEMS</p>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sahara-gold via-yellow-300 to-sahara-gold"
                initial={{ width: '0%' }}
                animate={{ width: '72%' }}
                transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-sahara-gold/40 text-[9px] font-mono text-left">72% COMPLETE</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="https://wa.me/201033332112?text=أريد الاستفسار عن مشاريع بيت الخير العقارية"
            className="px-8 py-4 bg-sahara-gold text-black font-black text-xs tracking-widest uppercase rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center gap-2 justify-center"
          >
            <span>📞</span> تواصل معنا
          </a>
          <Link
            href="/"
            className="px-8 py-4 bg-black/50 backdrop-blur border border-white/10 text-white font-black text-xs tracking-widest uppercase rounded-xl hover:border-sahara-gold/50 transition-all flex items-center gap-2 justify-center"
          >
            ← العودة للرئيسية
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
