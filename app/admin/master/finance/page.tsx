import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterFinanceContent from '@/components/admin/MasterFinanceContent'

export default async function MasterFinancePage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'main-admin') {
        redirect('/admin/login')
    }

    const transactions = await db.getAllRevenue() || []
    const totalRevenue = transactions.reduce((sum, txn) => sum + (txn.amount || 0), 0)

    return <MasterFinanceContent transactions={transactions} totalRevenue={totalRevenue} />
}
