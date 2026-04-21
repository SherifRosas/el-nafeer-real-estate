import React, { Suspense } from 'react'
import AdvancedLeverPortal from '@/components/AdvancedLeverPortal'

export const metadata = {
  title: 'LEVER PIONEER | METROPOLITAN_SOVEREIGN_ASCENT',
  description: 'Experience absolute urban dominance with the Lever Pioneer Metropolitan Sovereign Ascent. Advanced cinematic elevator solutions for the Cairo Skyline.',
}

export default function MetropolitanPortalPage() {
  return (
    <main className="w-screen h-screen bg-black overflow-hidden">
      <Suspense fallback={
        <div className="w-full h-full flex flex-col items-center justify-center bg-black gap-6">
          <div className="w-24 h-24 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <span className="text-[10px] text-cyan-500 font-black tracking-[0.5em] uppercase animate-pulse">
            INITIALIZING_NEURAL_SOVEREIGNTY...
          </span>
        </div>
      }>
        <AdvancedLeverPortal />
      </Suspense>
    </main>
  )
}
