import { Metadata } from 'next'
import React, { Suspense } from 'react'
import DrShimaaClinicalPortal from '@/components/DrShimaaClinicalPortal'

export const metadata: Metadata = {
  title: 'DR. SHIMAA BELAL | MATERNAL_SOVEREIGN_ASCENT',
  description: 'Experience clinical excellence with Dr. Shimaa Belal OB/GYN Clinic. Assistant Professor & Consultant of Obstetrics and Gynecology. Advanced clinical booking platform.',
  openGraph: {
    title: 'عيادة الدكتورة شيماء بلال | Dr. Shimaa Belal Clinic',
    description: 'أستاذ مساعد واستشاري أمراض النساء والتوليد بكلية الطب جامعة حلوان. عيادة متكاملة لرعاية الأمومة والطفولة وصحة المرأة.',
    url: 'https://el-nafeer-real-estate.vercel.app/portal/dr-shimaa-sovereign',
    siteName: 'Dr. Shimaa Belal Clinic',
    images: [
      {
        url: 'https://el-nafeer-real-estate.vercel.app/campaigns/dr-shimaa/shimaa_og_light.png?v=sovereign-noface-v1',
        width: 1200,
        height: 630,
        alt: 'Dr. Shimaa Belal Clinic Sovereign Portal'
      }
    ],
    locale: 'ar_EG',
    type: 'website',
  }
}

export default function DrShimaaSovereignPortalPage() {
    return (
        <main className="w-screen h-screen bg-black overflow-hidden flex flex-col items-center justify-center relative">
            <Suspense fallback={
                <div className="w-screen h-screen bg-black flex items-center justify-center text-white/50 font-black tracking-widest text-xs uppercase animate-pulse">
                    LOADING_CLINICAL_PORTAL...
                </div>
            }>
                <DrShimaaClinicalPortal />
            </Suspense>
        </main>
    )
}
