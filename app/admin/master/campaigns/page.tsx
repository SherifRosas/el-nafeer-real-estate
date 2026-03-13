import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import { getAllCampaigns } from '@/lib/campaign'
import MasterCampaignsClient from '@/components/admin/MasterCampaignsClient'

export default async function MasterCampaignsPage() {
    const session = await getServerSession(authOptions)

    const userRole = (session?.user as any)?.role
    if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
        redirect('/admin/login')
    }

    // Fetch initial data for the campaigns dashboard
    let campaigns: any[] = []
    let properties: any[] = []
    let brands: any[] = []

    try {
        const [cData, pData, bData] = await Promise.all([
            getAllCampaigns(),
            db.getAllProperties(),
            db.getAllPropertyOwners()
        ])
        
        campaigns = cData || []
        properties = pData || []
        brands = bData || []
    } catch (error) {
        console.error('Master Campaigns page - DB error:', error)
    }

    return (
        <MasterCampaignsClient 
            initialCampaigns={campaigns}
            initialProperties={properties}
            initialBrands={brands}
        />
    )
}
