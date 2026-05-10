import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'LEVER PIONEER ELITE | Sovereign Access Portal',
    description: 'Bespoke Vertical Intelligence and Sovereign Access Management for the Giza Elite.',
    icons: {
        icon: '/favicon.svg',
    },
    openGraph: {
        title: 'LEVER PIONEER ELITE | Sovereign Access Portal',
        description: 'Bespoke Vertical Intelligence and Sovereign Access Management for the Giza Elite.',
        images: [
            {
                url: 'https://el-nafeer-real-estate.vercel.app/campaigns/lever-pioneer/the-ascension-ad.png?v=elite-1',
                width: 1200,
                height: 630,
                alt: 'Lever Pioneer Sovereign Access'
            }
        ]
    }
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
