import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import { nurture } from '@/lib/nurture'

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

        // INITIATE_NEURAL_NURTURE_SEQUENCE (v1.0)
        // 🛰️ Autonomous follow-up triggered +60s post-capture
        nurture.initiateSequence(lead)

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

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json()
        const { id, status } = body

        if (!id || !status) {
            return NextResponse.json(
                { success: false, error: 'ID and Status are required' },
                { status: 400 }
            )
        }

        const updatedLead = await db.updateLead(id, { status })

        return NextResponse.json({
            success: true,
            lead: updatedLead,
            message: 'Lead status updated'
        })
    } catch (error: any) {
        console.error('API Leads PATCH Error:', error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}
