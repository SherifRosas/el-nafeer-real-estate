import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import LeadsFeed from '@/components/owner/LeadsFeed'

export default async function OwnerLeadsPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'owner') {
        redirect('/auth/login')
    }

    const userId = (session.user as any).id
    const owner = await db.getPropertyOwnerByUserId(userId)

    if (!owner) redirect('/')

    const leads = await db.getAllLeadsForOwner(owner.id)

    return (
        <div className="space-y-12">
            <LeadsFeed leads={leads} />
        </div>
    )
}
