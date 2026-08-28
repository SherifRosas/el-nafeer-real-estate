import { prisma } from "@/lib/db"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: 'Screen Orders | Admin Dashboard',
}

export default async function ScreenOrdersPage() {
  const session = await getServerSession(authOptions)
  const userRole = (session?.user as any)?.role

  if (!session || (userRole !== 'screen-admin' && userRole !== 'main-admin')) {
    redirect('/admin/login?callbackUrl=/admin/screen-orders')
  }

  const orders = await prisma.order.findMany({
    include: { screen: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div dir="ltr" className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Incoming Receipts Dashboard
          </h1>
          <Link 
            href="/admin/screen-uploader" 
            className="text-sm bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Manage Screens
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            <p className="text-lg">No orders have been submitted yet.</p>
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-900/50 text-slate-300 font-bold uppercase tracking-wider text-xs border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Screen Name</th>
                    <th className="px-6 py-4">Delivery</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Receipt</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {orders.map((order) => {
                    const shortId = order.id.slice(0, 8).toUpperCase()
                    
                    // Format phone for WA (Strip all non-digits, ensure it starts with 20 for Egypt)
                    let cleanPhone = order.customerPhone.replace(/\D/g, '')
                    if (cleanPhone.startsWith('0')) {
                      cleanPhone = `2${cleanPhone}`
                    } else if (cleanPhone.length === 10) { // e.g., 10xxxxxxx without the 0
                      cleanPhone = `20${cleanPhone}`
                    }
                    const waPhone = cleanPhone
                    
                    const waMsg = encodeURIComponent(
                      `مرحباً أستاذ/ة ${order.customerName}، تم استلام طلبك لشاشة ${order.screen.name} (رقم الطلب: ${shortId}). جاري مراجعة إيصال الدفع وسيتم التأكيد معك قريباً.`
                    )
                    const waLink = `https://wa.me/${waPhone}?text=${waMsg}`

                    return (
                      <tr key={order.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-400">#{shortId}</td>
                        <td className="px-6 py-4 font-bold text-white">{order.customerName}</td>
                        <td className="px-6 py-4 text-slate-300">{order.customerPhone}</td>
                        <td className="px-6 py-4 text-sky-300 font-medium">{order.screen.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${order.deliveryType === 'SHIPPING' ? 'bg-indigo-900/50 text-indigo-300' : 'bg-orange-900/50 text-orange-300'}`}>
                            {order.deliveryType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            order.status === 'PENDING_REVIEW' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800' : 
                            order.status === 'PAID' ? 'bg-green-900/50 text-green-300 border border-green-800' : 
                            'bg-slate-700 text-slate-300'
                          }`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <a 
                            href={order.receiptImageUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block hover:scale-110 transition-transform ring-2 ring-slate-600 hover:ring-sky-500 rounded-md overflow-hidden shadow-md"
                          >
                            <img 
                              src={order.receiptImageUrl} 
                              alt="Receipt Thumbnail" 
                              className="w-12 h-12 object-cover"
                            />
                          </a>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <a 
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-2 px-4 rounded shadow-lg transition-transform active:scale-95"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            Confirm
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
