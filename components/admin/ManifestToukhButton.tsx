'use client'

import { useState } from 'react'

/**
 * 🛰️ MANIFEST TOUKH BUTTON (v1.0)
 * Purpose: Secure UI-driven database expansion for regional dominance.
 */
export default function ManifestToukhButton() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleManifest = async () => {
        if (!confirm('🏗️ WARNING: This will manifest 15 new real estate assets in the Toukh region. Proceed?')) return
        
        setLoading(true)
        try {
            const res = await fetch('/api/admin/manifest-toukh', { method: 'POST' })
            const data = await res.json()
            if (data.success) {
                setSuccess(true)
                alert(`✅ SUCCESS: ${data.count} projects manifested in Toukh grid.`)
            } else {
                alert(`❌ ERROR: ${data.error}`)
            }
        } catch (error) {
            alert('❌ CRITICAL FAILURE: Network error.')
        } finally {
            setLoading(false)
        }
    }

    if (success) return (
        <div className="px-6 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-xs font-black uppercase tracking-widest italic animate-pulse">
            TOUKH_GRID_ACTIVE
        </div>
    )

    return (
        <div className="fixed bottom-32 right-8 z-[999999] animate-bounce-slow">
            <button
                onClick={handleManifest}
                disabled={loading}
                className={`px-10 py-5 rounded-full text-sm font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_50px_rgba(212,175,55,0.4)] border-2 border-sahara-gold/50 ${
                    loading 
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed' 
                    : 'bg-sahara-gold text-black hover:scale-110 active:scale-95'
                }`}
            >
                {loading ? '🚀 MANIFESTING_TOUKH...' : '🔥 TRIGGER_TOUKH_EXPANSION'}
            </button>
        </div>
    )
}
