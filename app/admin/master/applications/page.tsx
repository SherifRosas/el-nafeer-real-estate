import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterApplicationsContent from '@/components/admin/MasterApplicationsContent'

interface PageProps {
  searchParams?: Promise<{
    status?: string
  }>
}

export default async function MasterApplicationsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)

  const userRole = (session?.user as any)?.role
  if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
    redirect('/admin/login')
  }

  // Get all applications and related data
  let applications: any[] = []
  let filterStatus = 'all'

  try {
    const applicationsData = await db.getAllApplications()

    // Fetch related data for each application
    const applicationsWithRelations = await Promise.all(
      applicationsData.map(async (app) => {
        const user = await db.getUserById(app.userId)
        const coupon = await db.getCouponByApplicationId(app.id)
        const appointment = await db.getAppointmentByApplicationId(app.id)

        return {
          ...app,
          user: user || null,
          coupon: coupon || null,
          appointment: appointment || null,
        }
      })
    )

    const resolvedSearchParams = await searchParams
    filterStatus = (resolvedSearchParams?.status || 'all').toLowerCase()
    
    applications = applicationsWithRelations.filter((app) => {
      if (filterStatus === 'all') return true
      const status = (app.selectionStatus || 'pending').toLowerCase()
      return status === filterStatus
    })
  } catch (error) {
    console.error('Master Applications page - DB error:', error)
  }

  return (
    <MasterApplicationsContent
      applications={applications.map(app => ({
        ...app,
        user: app.user as { email: string } | null,
        createdAt: app.createdAt.toString()
      }))}
      filterStatus={filterStatus}
    />
  )
}
