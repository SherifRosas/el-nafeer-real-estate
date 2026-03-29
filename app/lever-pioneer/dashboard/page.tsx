import { db } from '@/lib/supabase'
import BrandNexusDashboard from '@/components/brand/BrandNexusDashboard'

export const metadata = {
    title: 'LEVER PIONEER | BRAND NEXUS',
}

export default async function LeverDashboardPage() {
    const LEVER_BRAND_ID = "62c38934-4c4b-42be-98c9-06cbbee1af19"
    
    // Fetch specifically for Lever Pioneer
    const leads = await db.getLeadsByBrandProfileId(LEVER_BRAND_ID)
    const profile = await db.getBrandProfileById(LEVER_BRAND_ID)

    return (
        <main className="bg-[#050505]">
            <BrandNexusDashboard 
                initialLeads={leads || []} 
                brandName={profile?.companyName || "LEVER_PIONEER"} 
            />
        </main>
    )
}
