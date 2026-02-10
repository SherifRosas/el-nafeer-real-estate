import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/supabase'

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session || !['admin', 'main-admin'].includes((session.user as any)?.role)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id

    try {
        const owner = await db.getPropertyOwnerByUserId(userId)
        if (owner) return NextResponse.json({ success: true, alreadyExists: true, owner })

        const newOwner = await db.createPropertyOwner({
            userId,
            companyName: 'EL-NAFEER Realty Group'
        })

        return NextResponse.json({ success: true, owner: newOwner })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
