import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterOwnersContent from '@/components/admin/MasterOwnersContent'

export default async function MasterOwnersPage() {
    const session = await getServerSession(authOptions)

    const userRole = (session?.user as any)?.role
    if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
        redirect('/admin/login')
    }

    // Fetch all registered property owners
    let owners: any[] = []
    try {
        owners = await db.getAllPropertyOwners() || []
    } catch (error) {
        console.error('Owners page - DB error:', error)
    }

    return <MasterOwnersContent owners={owners} />
}
