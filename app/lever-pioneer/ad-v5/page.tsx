import { Suspense } from 'react'
import QuantumPortalAd from '@/components/QuantumPortalAd'

export default function LegacyPortalPage() {
  return (
    <main style={{ backgroundColor: '#000', width: '100vw', height: '100dvh', overflow: 'hidden', position: 'fixed', inset: 0 }}>
      <Suspense fallback={<div style={{ backgroundColor: '#000', height: '100vh', width: '100vw' }} />}>
        <QuantumPortalAd />
      </Suspense>
    </main>
  )
}
