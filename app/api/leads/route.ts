import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, phone, email, notes, brandProfileId, propertyId } = body

        if (!name || !phone) {
            return NextResponse.json(
                { success: false, error: 'Name and Phone are required' },
                { status: 400 }
            )
        }

        const lead = await db.createLead({
            name,
            phone,
            email,
            notes,
            brandProfileId,
            propertyId,
            status: 'new'
        })

        return NextResponse.json({
            success: true,
            lead,
            message: 'Lead captured successfully'
        })
    } catch (error: any) {
        console.error('API Leads Error:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}
