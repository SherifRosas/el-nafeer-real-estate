import { Suspense } from 'react'
import { Metadata } from 'next'
import QuantumPortalAd from '@/components/QuantumPortalAd'

const TITLE = "طلب عرض سعر لتركيب مصعد | ليفر الرائدة للمصاعد"
const DESC = "طلب عرض سعر لتركيب مصعد"
const DOMAIN = "https://el-nafeer-real-estate.vercel.app"
const IMAGE = `${DOMAIN}/lever-pioneer-share.png?v=20`

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL(DOMAIN),
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${DOMAIN}/lever-pioneer/اطلب-عرض-سعر`,
    siteName: 'ليفر الرائدة للمصاعد',
    locale: 'ar_EG',
    type: 'website',
    images: [{ url: IMAGE, width: 450, height: 450, alt: 'ليفر الرائدة للمصاعد' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [IMAGE],
  }
}

export default function LeverPioneerRequestQuotePage() {
  return (
    <main style={{ backgroundColor: '#000', width: '100vw', height: '100dvh', overflow: 'hidden', position: 'fixed', inset: 0 }}>
      <Suspense fallback={<div style={{ backgroundColor: '#000', height: '100vh', width: '100vw' }} />}>
        <QuantumPortalAd />
      </Suspense>
    </main>
  )
}
