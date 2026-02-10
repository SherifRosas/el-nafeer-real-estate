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
    // Aggregated stats from the entire platform
    const allApplications = await db.getAllApplications() || []
    const allRevenue = await db.getAllRevenue() || []
    
    // In a real multi-tenant scenario, we'd count registered PropertyOwners
    // For now, we mock some global metrics for the Master Dashboard
    const totalRevenue = allRevenue.reduce((sum, rev) => sum + (rev.amount || 0), 0)
    
    return NextResponse.json({
      success: true,
      stats: {
        totalReach: allApplications.length + 1500, // Mocked total platform reach
        totalRevenue,
        activeTenants: 12, // Mocked tenant count
        aiInteractions: 45000, // Mocked interaction count
        systemHealth: '100%',
        latency: '2.4ms'
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
