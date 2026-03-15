import LeverPioneerLanding from '@/components/LeverPioneerLanding'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Lever Pioneer Elevators | Elite Vertical Mobility',
    description: 'German engineering meets Egyptian vision. Premium elevator installation, maintenance, and modernization.',
}

export default function LeverPioneerPage() {
    return <LeverPioneerLanding />
}
