import { Metadata } from 'next'
import { redirect } from 'next/navigation'

/**
 * 🚀 LEVER PIONEER CONSOLIDATION (GIZA-CAIRO GROWTH)
 * Redirecting from legacy route to primary Elite Hub.
 */

const TITLE = "💎 LEVER PIONEER | EXCLUSIVE REVEAL"
const DESC = "ليفر الرائدة للمصاعد - من قلب الجيزة - هضبة الأهرام. Vertical Excellence Defined."
const DOMAIN = "https://el-nafeer-real-estate.vercel.app"
const PAGE_URL = `${DOMAIN}/portal/lever-pioneer-elite`

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  metadataBase: new URL(DOMAIN),
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: PAGE_URL,
    siteName: 'Lever Pioneer',
    locale: 'ar_EG',
    type: 'website'
  }
}

export default function PortalPage() {
  redirect('/portal/lever-pioneer-elite')
  return null
}
