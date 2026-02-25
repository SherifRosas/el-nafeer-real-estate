import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterDashboardContent from '@/components/owner/MasterDashboardContent'

export default async function OwnerDashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'owner') {
        redirect('/auth/login?callbackUrl=/owner/dashboard')
    }

    const userId = (session.user as any).id
    const owner = await db.getPropertyOwnerByUserId(userId)

    if (!owner) {
        redirect('/')
    }

    const properties = await db.getPropertiesByOwnerId(owner.id)
    const leads = await db.getAllLeadsForOwner(owner.id)

    return (
        <MasterDashboardContent
            owner={owner}
            properties={properties}
            leads={leads}
            session={session}
        />
    )
}
