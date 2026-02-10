import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/supabase'

/**
 * Creates a test property owner for the'main-admin' user to allow dashboard testing.
 */
export async function createTestOwner() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'main-admin') {
        return { error: 'Unauthorized' }
    }

    const userId = (session.user as any).id

    // Check if already an owner
    const existingOwner = await db.getPropertyOwnerByUserId(userId)
    if (existingOwner) return { success: true, owner: existingOwner }

    // Create owner profile
    const owner = await db.createPropertyOwner({
        userId,
        companyName: 'EL-NAFEER Realty Group',
        logoUrl: '/logo.png'
    })

    return { success: true, owner }
}
