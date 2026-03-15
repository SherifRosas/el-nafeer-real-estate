import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterPropertiesContent from '@/components/admin/MasterPropertiesContent'

export const dynamic = 'force-dynamic'

export default async function MasterPropertiesPage() {
  const session = await getServerSession(authOptions)
  const userRole = (session?.user as any)?.role
  if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
    redirect('/admin/login')
  }

  let properties: any[] = []
  try {
    // Admin should see ALL properties, including non-available ones
    properties = await db.getAllProperties() || []
  } catch (error) {
    console.error('Master Properties - Error fetching properties:', error)
  }

  return <MasterPropertiesContent initialProperties={properties} />
}
