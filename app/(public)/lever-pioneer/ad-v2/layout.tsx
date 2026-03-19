import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lever Pioneer | The Ascension of Luxury',
  description: 'Celebrating the launch of the new headquarters. Experience the future of vertical mobility with Lever Pioneer.',
  openGraph: {
    title: 'Lever Pioneer | The Ascension of Luxury',
    description: 'Celebrating the launch of the new headquarters. Experience the future of vertical mobility with Lever Pioneer.',
    images: [
      {
        url: 'https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/ad-v2-quantum.png',
        width: 1200,
        height: 1200,
        alt: 'Lever Pioneer Ad',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lever Pioneer | The Ascension of Luxury',
    description: 'Celebrating the launch of the new headquarters.',
    images: ['https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/ad-v2-quantum.png'],
  },
}

export default function AdLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
