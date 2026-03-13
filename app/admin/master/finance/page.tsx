import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterFinanceContent from '@/components/admin/MasterFinanceContent'

export default async function MasterFinancePage() {
    const session = await getServerSession(authOptions)

    const userRole = (session?.user as any)?.role
    if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
        redirect('/admin/login')
    }

    let transactions: any[] = []
    let totalRevenue = 0
    try {
        transactions = await db.getAllRevenue() || []
        totalRevenue = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0)
    } catch (error) {
        console.error('Finance page - DB error:', error)
    }

    return <MasterFinanceContent transactions={transactions} totalRevenue={totalRevenue} />
}
