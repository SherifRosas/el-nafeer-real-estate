import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/supabase'

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userRole = (session.user as any)?.role
    const userId = (session.user as any).id

    try {
        const body = await request.json()

        // Find owner ID for this user
        const owner = await db.getPropertyOwnerByUserId(userId)
        if (!owner && userRole !== 'main-admin') {
            return NextResponse.json({ error: 'Owner profile not found' }, { status: 403 })
        }

        const propertyData = {
            ...body,
            ownerId: owner?.id || body.ownerId, // Allow admin to specify ownerId
            status: body.status || 'available'
        }

        const property = await db.createProperty(propertyData)

        return NextResponse.json({
            success: true,
            property
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const ownerId = searchParams.get('ownerId')
    const all = searchParams.get('all') === 'true'

    if (all && session) {
        const properties = await db.getAllProperties()
        return NextResponse.json({ success: true, properties })
    }

    if (!ownerId) {
        const properties = await db.getPublicProperties()
        return NextResponse.json({ success: true, properties })
    }

    const properties = await db.getPropertiesByOwnerId(ownerId)
    return NextResponse.json({ success: true, properties })
}
