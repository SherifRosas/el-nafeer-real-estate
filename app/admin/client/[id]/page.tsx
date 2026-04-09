import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import { db } from '@/lib/supabase'
import ClientSovereignDashboard from '@/components/admin/ClientSovereignDashboard'

interface PageProps {
  params: {
    id: string
  }
}

export default async function ClientDashboardPage({ params }: PageProps) {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/admin/login')
    }

    const userRole = (session.user as any)?.role
    const userId = (session.user as any).id

    // Fetch the brand profile
    // If id is 'beit-alkhair', we map it to the actual database ID or name
    let brandProfile = null
    try {
      if (id === 'beit-alkhair') {
        const brands = await db.getAllBrandProfiles()
        brandProfile = brands.find(b => b.companyName.includes('Beit Al-Khair'))
      } else {
        brandProfile = await db.getBrandProfileByUserId(userId)
      }
    } catch (e) {
      console.error('Error fetching brand profile:', e)
    }

    if (!brandProfile) {
        notFound()
    }

    // Security Check: Only allow owner of this brand or admin
    if (userRole !== 'main-admin' && brandProfile.userId !== userId) {
        redirect('/admin/login')
    }

    // Fetch initial events (leads for this brand)
    let initialEvents: any[] = []
    try {
        const leads = await db.getLeadsByBrandProfileId(brandProfile.id)
        initialEvents = leads.map((l: any) => ({
            id: `lead-${l.id}`,
            type: 'LEAD',
            content: `INBOUND_SIGNAL: ${l.name}`,
            timestamp: l.createdAt,
            signalColor: 'text-sahara-gold shadow-glow'
        }))
    } catch (e) {
        console.error('Error fetching leads:', e)
    }

    return (
      <main className="min-h-screen bg-[#050505] pt-24 pb-12">
        <ClientSovereignDashboard 
          brandProfile={brandProfile} 
          initialEvents={initialEvents} 
        />
      </main>
    )
}
