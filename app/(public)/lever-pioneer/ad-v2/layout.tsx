import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lever Pioneer | The Ascension of Luxury',
  description: 'Celebrating the launch of the new headquarters. Experience the future of vertical mobility with Lever Pioneer.',
  keywords: ['Lever Pioneer', 'Elevators', 'Giza', 'Luxury', 'Anniversary'],
  alternates: {
    canonical: 'https://el-nafeer-real-estate.vercel.app/lever-pioneer/ad-v2',
  },
  openGraph: {
    title: 'Lever Pioneer | The Ascension of Luxury',
    description: 'Celebrating the launch of the new headquarters in Giza. Powered by AI.',
    url: 'https://el-nafeer-real-estate.vercel.app/lever-pioneer/ad-v2',
    siteName: 'Lever Pioneer Luxury',
    images: [
      {
        url: 'https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/ad-v2-quantum.png',
        width: 1200,
        height: 1200,
        alt: 'Lever Pioneer Cinematic Ad',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lever Pioneer | The Ascension of Luxury',
    description: 'Experience the future of vertical mobility.',
    images: ['https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/ad-v2-quantum.png'],
  },
}

export default function AdLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
