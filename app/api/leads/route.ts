import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
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

        const lead = await prisma.lead.create({
            data: {
                name,
                phone,
                email,
                notes,
                brandProfileId,
                propertyId,
                status: 'new'
            }
        })

        // INITIATE_NEURAL_NURTURE_SEQUENCE (v1.0)
        // 🛰️ Autonomous follow-up triggered +60s post-capture
        nurture.initiateSequence(lead as any)

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

        const updatedLead = await prisma.lead.update({
            where: { id },
            data: { status }
        })

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
