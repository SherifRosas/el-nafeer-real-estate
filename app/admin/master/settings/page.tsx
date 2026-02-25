import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterSettingsContent from '@/components/admin/MasterSettingsContent'

export default async function MasterSettingsPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'main-admin') {
        redirect('/admin/login')
    }

    const initialSettings = await db.getSettings() || {
        bankAccountNumber: '',
        bankName: '',
        bankDetails: '',
        advertisementStatus: 'closed',
        adminGmail: '',
        canReactivate: false
    }

    return <MasterSettingsContent initialSettings={initialSettings} />
}
