import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterAIMonitorContent from '@/components/admin/MasterAIMonitorContent'

export default async function MasterAIMonitorPage() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'main-admin') {
        redirect('/admin/login')
    }

    // Fetch recent activity data
    const recentLeads = await db.getAllLeads() || []
    const recentMessages = await db.getAllMessages(10) || []

    const events = [
        ...recentLeads.slice(0, 5).map(lead => ({
            id: `lead-${lead.id}`,
            type: 'LEAD' as const,
            content: `NEW_ACQUISITION_SIGNAL: ${lead.name}`,
            timestamp: lead.createdAt
        })),
        ...recentMessages.slice(0, 5).map(msg => ({
            id: `msg-${msg.id}`,
            type: 'MESSAGE' as const,
            content: `INBOUND_ENCRYPTED_QUERY: ${msg.type}`,
            timestamp: msg.sentAt
        }))
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return <MasterAIMonitorContent initialEvents={events} />
}
