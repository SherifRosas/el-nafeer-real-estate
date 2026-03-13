import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AlNafeerTrackerHUD from '@/components/analytics/AlNafeerTrackerHUD'
import NavigationHeader from '@/components/NavigationHeader'
import { db } from '@/lib/supabase'

export default async function TrackerPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)

    const userRole = (session?.user as any)?.role
    if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
        redirect('/admin/login')
    }

    // In a real scenario, we'd fetch the brand by ID
    // For this demonstration, we'll use the ID to set the name or fetch from DB
    // const brand = await db.getBrandProfileById(params.id)
    const clientName = params.id.toUpperCase()

    return (
        <main className="min-h-screen bg-[#020202]">
            <NavigationHeader />
            <div className="pt-20">
                <AlNafeerTrackerHUD clientName={clientName} />
            </div>
        </main>
    )
}
