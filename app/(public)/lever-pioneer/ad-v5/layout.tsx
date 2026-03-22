import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '🏆 LEVER PIONEER | The Future of Vertical Mobility',
  description: 'Celebrating the Giza Headquarters launch. Experience the interactive Quantum Imperial ad by Sherif Rosas.',
  keywords: ['Lever Pioneer', 'Elevators', 'Giza', 'Luxury', 'Innovation', 'Sherif Rosas'],
  alternates: {
    canonical: 'https://el-nafeer-real-estate.vercel.app/lever-pioneer/ad-v5',
  },
  openGraph: {
    title: '🏆 LEVER PIONEER | V5 DEFIANT',
    description: 'The definitive ad experience. Clean, fast, and optimized.',
    url: 'https://el-nafeer-real-estate.vercel.app/lever-pioneer/ad-v5',
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
