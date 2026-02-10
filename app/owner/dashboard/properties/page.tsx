import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import PropertyGrid from '@/components/owner/PropertyGrid'

export default async function OwnerPropertiesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'owner') {
    redirect('/auth/login')
  }

  const userId = (session.user as any).id
  const owner = await db.getPropertyOwnerByUserId(userId)
  
  if (!owner) redirect('/')

  const properties = await db.getPropertiesByOwnerId(owner.id)

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2">Inventory Management</h2>
          <p className="text-gray-500 font-bold text-lg">Manage and track your luxury property portfolio.</p>
        </div>
        <div className="flex gap-4 bg-white/5 p-4 rounded-3xl border border-white/5">
          <div className="px-6 py-2 border-r border-white/10">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Available</p>
            <p className="text-xl font-black">{properties.filter(p => p.status === 'available').length}</p>
          </div>
          <div className="px-6 py-2">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Total Units</p>
            <p className="text-xl font-black">{properties.length}</p>
          </div>
        </div>
      </div>

      <PropertyGrid properties={properties} />
    </div>
  )
}
