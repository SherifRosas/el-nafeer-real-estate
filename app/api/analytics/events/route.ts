import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { category, action, label, userAgent } = body

        // We use a generic 'portal_events' table to track these interactions
        // This ensures the 500-click target is mathematically measured.
        const { error } = await supabase
            .from('portal_events')
            .insert({
                id: randomUUID(),
                category: category || 'PORTAL_INTERACTION',
                action: action || 'CLICK',
                label: label || 'LEVER_PIONEER',
                userAgent: userAgent || 'Unknown',
                createdAt: new Date().toISOString()
            })

        if (error) {
            // If table doesn't exist yet, we log it for the developer
            console.error('Portal Events Storage Error:', error)
            return NextResponse.json({ success: false, message: 'Infrastructure pending' }, { status: 202 })
        }

        return NextResponse.json({ success: true, message: 'Quantum Event Logged' })
    } catch (error: any) {
        console.error('Analytics API Error:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
