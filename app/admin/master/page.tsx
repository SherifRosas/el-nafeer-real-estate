import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterDashboardContent from '@/components/admin/MasterDashboardContent'

export default async function MasterCommandCenter() {
  const session = await getServerSession(authOptions)

  const userRole = (session?.user as any)?.role
  if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
    redirect('/admin/login')
  }

  // Global Data Aggregation (Server-Side)
  let allApplications: any[] = []
  let allRevenue: any[] = []
  let totalRevenue = 0

  try {
    allApplications = await db.getAllApplications() || []
  } catch (error) {
    console.error('Master Dashboard - Error fetching applications:', error)
  }

  try {
    allRevenue = await db.getAllRevenue() || []
    totalRevenue = allRevenue.reduce((sum, rev) => sum + (rev.amount || 0), 0)
  } catch (error) {
    console.error('Master Dashboard - Error fetching revenue:', error)
  }

  // Subsystems data (Mocked or fetched)
  const subsystems = [
    { title: 'Optimum_Prime', nodes: 42, streams: 1204 },
    { title: 'Optimum_Direct', nodes: 18, streams: 482 },
  ]

  const globalStats = [
    {
      label: 'Global Node Reach',
      value: (allApplications.length + 152).toLocaleString(),
      icon: '📡',
      trend: '+12.5%',
    },
    {
      label: 'Tenant Systems',
      value: '24 Active',
      icon: '🏢',
      trend: '8 New',
    },
    {
      label: 'AI Sales Volume',
      value: (totalRevenue * 1.5).toLocaleString() + ' EGP',
      icon: '🧠',
      trend: '94% Efficiency',
    },
    {
      label: 'Master Liquidity',
      value: totalRevenue.toLocaleString() + ' EGP',
      icon: '💎',
      trend: 'Secured',
    }
  ]

  return <MasterDashboardContent globalStats={globalStats} subsystems={subsystems} />
}
