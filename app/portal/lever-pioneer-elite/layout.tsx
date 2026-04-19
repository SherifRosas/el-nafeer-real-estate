import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'LEVER PIONEER ELITE | Sovereign Access Portal',
    description: 'Bespoke Vertical Intelligence and Sovereign Access Management for the Giza Elite.',
    icons: {
        icon: '/favicon.svg',
    }
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
