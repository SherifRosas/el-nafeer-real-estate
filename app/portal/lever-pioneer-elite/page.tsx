'use client'

import React, { useState, Suspense, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import AdvancedLeverPortal from '@/components/AdvancedLeverPortal'
import BiometricScan from '@/components/BiometricScan'

function PortalContent() {
  const searchParams = useSearchParams()
  const modalParam = searchParams?.get('modal')
  const [showScan, setShowScan] = useState(true)

  useEffect(() => {
    if (modalParam === 'quote') {
      setShowScan(false)
    }
  }, [modalParam])

  return (
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
                style={{ width: '100%', height: '100%' }}
            >
                <AdvancedLeverPortal />
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default function PortalPageElite() {
  return (
    <main style={{ background: 'transparent', width: '100%', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Suspense fallback={<div style={{ backgroundColor: '#000', height: '100vh', width: '100vw' }} />}>
            <PortalContent />
        </Suspense>
    </main>
  )
}
