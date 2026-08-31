import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const userRole = (session.user as any)?.role
  const userId = (session.user as any)?.id

  // 🛰️ MASTER_ADMIN_CHANNELS
  if (userRole === 'admin' || userRole === 'main-admin') {
    redirect('/admin/master')
  }

  // 📺 SCREEN_ADMIN_CHANNELS
  if (userRole === 'screen-admin') {
    redirect('/admin/screen-uploader')
  }

  // 🏢 CLIENT_OWNER_CHANNELS
  try {
      const brandProfile = await db.getBrandProfileByUserId(userId)
      if (brandProfile) {
          // If they are Beit Al-Khair, we push to the high-prestige portal
          if (brandProfile.companyName.includes('Beit Al-Khair')) {
              redirect('/admin/client/beit-alkhair')
          }
          redirect(`/admin/client/${brandProfile.id}`)
      }
  } catch (error) {
      console.error('Error identifying client dashboard node:', error)
  }

  // FALLBACK: ACCESS_DENIED
  redirect('/admin/login')
}

