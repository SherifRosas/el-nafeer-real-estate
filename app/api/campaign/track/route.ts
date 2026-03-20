import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { campaignId, action, url, source } = body
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
        const ua = request.headers.get('user-agent') || 'Mobile-Unknown'

        // 🎯 Lead Dashboard Integration:
        // We save this as a special "INTERACTION" lead type so the Master Dashboard
        // can track clicks in real-time.
        const interactionLead = await db.createLead({
            name: `🔴 [INTERACTION] ${action}`,
            phone: ip, // Use IP as a unique identifier for the lead entry
            email: source, // Track the source (status, qr, direct) in the email field
            notes: `CAMPAIGN: ${campaignId} | URL: ${url} | OS: ${ua}`,
            status: 'interaction'
        })

        return NextResponse.json({ success: true, id: interactionLead?.id })
    } catch (error: any) {
        console.error('Track_API Error:', error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
