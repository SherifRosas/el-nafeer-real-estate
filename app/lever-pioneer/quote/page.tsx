import { Suspense } from 'react'
import { Metadata } from 'next'
import QuantumPortalAd from '@/components/QuantumPortalAd'

const TITLE = "طلب عرض سعر لتركيب مصعد | ليفر الرائدة للمصاعد"
const DESC = "طلب عرض سعر لتركيب مصعد"
const DOMAIN = "https://el-nafeer-real-estate.vercel.app"

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL(DOMAIN),
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${DOMAIN}/lever-pioneer/quote`,
    siteName: 'ليفر الرائدة للمصاعد | Lever Pioneer',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: `${DOMAIN}/lever-pioneer-share.png?v=20`,
        width: 450,
        height: 450,
        alt: 'ليفر الرائدة للمصاعد - طلب عرض سعر لتركيب مصعد',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [`${DOMAIN}/lever-pioneer-share.png?v=20`],
  }
}

export default function LeverPioneerQuotePage() {
  return (
    <main style={{ backgroundColor: '#000', width: '100vw', height: '100dvh', overflow: 'hidden', position: 'fixed', inset: 0 }}>
      <Suspense fallback={<div style={{ backgroundColor: '#000', height: '100vh', width: '100vw' }} />}>
        <QuantumPortalAd />
      </Suspense>
    </main>
  )
}
