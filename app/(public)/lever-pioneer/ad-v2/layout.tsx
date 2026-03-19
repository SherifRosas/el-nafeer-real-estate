import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '🏆 LEVER PIONEER | The Future of Vertical Mobility',
  description: 'Celebrating the Giza Headquarters launch. Experience the interactive Quantum Imperial ad by Sherif Rosas.',
  keywords: ['Lever Pioneer', 'Elevators', 'Giza', 'Luxury', 'Innovation', 'Sherif Rosas'],
  alternates: {
    canonical: 'https://el-nafeer-real-estate.vercel.app/lever-pioneer/ad-v2',
  },
  openGraph: {
    title: '🏆 LEVER PIONEER | Quantum Imperial Edition',
    description: 'The Future of Vertical Mobility is here. Explore the interactive campaign for the new Giza Headquarters.',
    url: 'https://el-nafeer-real-estate.vercel.app/lever-pioneer/ad-v2',
    siteName: 'Sherif Rosas | Master Designer',
    images: [
      {
        url: 'https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/ad-v2-quantum.png',
        width: 1200,
        height: 630,
        alt: 'Lever Pioneer Quantum Ad',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🏆 LEVER PIONEER | The Future of Vertical Mobility',
    description: 'Experience the interactive campaign by Sherif Rosas.',
    images: ['https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/ad-v2-quantum.png'],
  },
}

export default function AdLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
