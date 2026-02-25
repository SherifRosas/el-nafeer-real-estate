import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import Link from 'next/link'
import ApplicationActions from '@/components/ApplicationActions'
import MasterApplicationsContent from '@/components/admin/MasterApplicationsContent'

interface PageProps {
  searchParams?: Promise<{
    status?: string
  }>
}

export default async function ApplicationsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const userRole = (session.user as any)?.role
  if (userRole !== 'admin' && userRole !== 'main-admin') {
    redirect('/admin/login')
  }

  // Get all applications and related data
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
  const filterStatus = (resolvedSearchParams?.status || 'all').toLowerCase()
  const applications = applicationsWithRelations.filter((app) => {
    if (filterStatus === 'all') return true
    const status = (app.selectionStatus || 'pending').toLowerCase()
    return status === filterStatus
  })

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <MasterApplicationsContent
        applications={applications.map(app => ({
          ...app,
          user: app.user as { email: string } | null,
          createdAt: app.createdAt.toString()
        }))}
        filterStatus={filterStatus}
      />
    </div>
  )
}


