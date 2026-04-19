'use client'

import React, { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuantumPortalAd from '@/components/QuantumPortalAd'
import BiometricScan from '@/components/BiometricScan'

export default function PortalPageElite() {
  const [showScan, setShowScan] = useState(true)

  return (
    <main style={{ backgroundColor: '#000', width: '100%', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
            {showScan ? (
                <motion.div
                    key="biometric"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
                    transition={{ duration: 1 }}
                >
                    <BiometricScan 
                        identityName="LEVER_PIONEER_CLIENT"
                        onComplete={() => setShowScan(false)}
                    />
                </motion.div>
            ) : (
                <motion.div
                    key="portal"
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <Suspense fallback={<div style={{ backgroundColor: '#000', height: '100vh', width: '100vw' }} />}>
                        <QuantumPortalAd autoStart={true} />
                    </Suspense>
                </motion.div>
            )}
        </AnimatePresence>
    </main>
  )
}
