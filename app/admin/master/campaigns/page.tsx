import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import { getAllCampaigns, getGlobalCampaignMetrics } from '@/lib/campaign'
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
    let globalMetrics = {
        totalReach: 0,
        totalEngagement: 0,
        totalClicks: 0,
        totalExecutions: 0,
        activeCampaigns: 0,
        averageConversionRate: 0
    }

    try {
        const [cData, pData, poData, bData, mData] = await Promise.all([
            getAllCampaigns(),
            db.getAllProperties(),
            db.getAllPropertyOwners(),
            db.getAllBrandProfiles(),
            getGlobalCampaignMetrics()
        ])
        
        campaigns = cData || []
        properties = pData || []
        // Merge property owners and brand profiles for the brand selection
        brands = [...(poData || []), ...(bData || [])]
        globalMetrics = mData
    } catch (error) {
        console.error('Master Campaigns page - DB error:', error)
    }

    return (
        <MasterCampaignsClient 
            initialCampaigns={campaigns}
            initialProperties={properties}
            initialBrands={brands}
            globalMetrics={globalMetrics}
        />
    )
}
