import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import BrandOnboardingTerminal from '@/components/admin/BrandOnboardingTerminal'
import NavigationHeader from '@/components/NavigationHeader'

export default async function OnboardingPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'main-admin') {
        redirect('/admin/login')
    }

    return (
        <main className="min-h-screen bg-[#020202]">
            <NavigationHeader />
            <div className="pt-20">
                <BrandOnboardingTerminal />
            </div>
        </main>
    )
}
