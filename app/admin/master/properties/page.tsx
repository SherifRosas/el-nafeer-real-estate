import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function MasterPropertiesPage() {
  const session = await getServerSession(authOptions)
  const userRole = (session?.user as any)?.role
  if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
    redirect('/admin/login')
  }

  let properties: any[] = []
  try {
    properties = await db.getPublicProperties() || []
  } catch (error) {
    console.error('Master Properties - Error fetching properties:', error)
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 border border-sahara-gold/30 rounded-xl flex items-center justify-center text-sm font-black text-sahara-gold">🏠</div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white">
            Property Inventory
          </h2>
        </div>
        <span className="text-[10px] font-black text-sahara-gold bg-sahara-gold/10 px-6 py-3 rounded-full border border-sahara-gold/20 uppercase tracking-widest">
          {properties.length} ACTIVE NODES
        </span>
      </div>

      {properties.length === 0 ? (
        <div className="milky-glass rounded-[3rem] p-20 border border-white/10 text-center">
          <p className="text-6xl mb-8">🏗️</p>
          <h3 className="text-2xl font-black uppercase italic text-white mb-4">No Properties Found</h3>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">
            Database returned zero property nodes. Add properties via the Owner Portal.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {properties.map((p: any, i: number) => (
            <div key={p.id || i} className="milky-glass rounded-[3rem] overflow-hidden border border-white/10 hover:border-sahara-gold/30 transition-all duration-500 group">
              <div className="h-48 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-3xl grayscale opacity-[0.05] group-hover:scale-125 transition-transform duration-1000 italic font-black">EL_NAFEER</div>
                <div className="absolute top-6 left-6 z-20 bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full">
                  {(p.status || 'active').toUpperCase()}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest">NODE #{String(i + 1).padStart(3, '0')}</p>
                <h4 className="text-xl font-black text-white uppercase italic tracking-tight truncate group-hover:text-sahara-gold transition-colors">
                  {p.title || 'Untitled Property'}
                </h4>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider truncate">
                  {p.location || 'Location pending'}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-lg font-black text-white italic">
                    {(p.price || 0).toLocaleString()} <span className="text-xs text-sahara-gold not-italic">EGP</span>
                  </span>
                  <span className="text-[9px] font-black text-sahara-gold bg-sahara-gold/5 px-3 py-1.5 rounded-full border border-sahara-gold/10 uppercase">
                    {p.type || 'unit'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
