import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterOwnersContent from '@/components/admin/MasterOwnersContent'

export default async function MasterOwnersPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'main-admin') {
        redirect('/admin/login')
    }

    // Fetch all registered property owners
    const owners = await db.getAllPropertyOwners() || []

    return <MasterOwnersContent owners={owners} />
}
