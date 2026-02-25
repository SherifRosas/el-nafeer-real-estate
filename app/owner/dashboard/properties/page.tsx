import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterPropertiesContent from '@/components/owner/MasterPropertiesContent'

export default async function OwnerPropertiesPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'owner') {
    redirect('/auth/login')
  }

  const userId = (session.user as any).id
  const owner = await db.getPropertyOwnerByUserId(userId)

  if (!owner) redirect('/')

  const propertiesData = await db.getPropertiesByOwnerId(owner.id)

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <MasterPropertiesContent
        properties={propertiesData.map(p => ({
          ...p,
          createdAt: p.createdAt.toString()
        }))}
        ownerId={owner.id}
      />
    </div>
  )
}
