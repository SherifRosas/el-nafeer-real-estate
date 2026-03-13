import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterSettingsContent from '@/components/admin/MasterSettingsContent'

export default async function MasterSettingsPage() {
    const session = await getServerSession(authOptions)

    const userRole = (session?.user as any)?.role
    if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
        redirect('/admin/login')
    }

    let initialSettings: any = {
        bankAccountNumber: '',
        bankName: '',
        bankDetails: '',
        advertisementStatus: 'closed',
        adminGmail: '',
        canReactivate: false
    }
    try {
        initialSettings = await db.getSettings() || initialSettings
    } catch (error) {
        console.error('Settings page - DB error:', error)
    }

    return <MasterSettingsContent initialSettings={initialSettings} />
}
