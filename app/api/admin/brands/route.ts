import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/supabase'

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'main-admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Fetch all brand profiles (In a real app, you might want to join with User)
        // For now, assume a helper or raw query
        const { data: brands, error } = await (db as any).supabase
            .from('brand_profiles')
            .select('*, users(email, name)')
            .order('createdAt', { ascending: false })

        if (error) throw error

        return NextResponse.json({
            success: true,
            brands
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'main-admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, companyName, industry, serviceArea, location, logoUrl, portfolio, contactDetails } = body

    try {
        if (!email || !companyName) {
            return NextResponse.json({ error: 'Email and Company Name are required' }, { status: 400 })
        }

        // 1. Find or verify user
        const user = await db.getUserByEmail(email)
        if (!user) {
            return NextResponse.json({ error: 'User not found. Please register the user first.' }, { status: 404 })
        }

        // 2. Check if profile exists
        const existingProfile = await db.getBrandProfileByUserId(user.id)
        if (existingProfile) {
            return NextResponse.json({ error: 'Brand profile already exists for this user' }, { status: 400 })
        }

        // 3. Create profile
        const profile = await db.createBrandProfile({
            userId: user.id,
            companyName,
            industry,
            serviceArea,
            location,
            logoUrl,
            portfolio,
            contactDetails
        })

        return NextResponse.json({ success: true, profile })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
