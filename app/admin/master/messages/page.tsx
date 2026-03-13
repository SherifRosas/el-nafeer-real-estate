import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/supabase'
import MasterMessagesContent from '@/components/admin/MasterMessagesContent'

export default async function MasterMessagesPage() {
  const session = await getServerSession(authOptions)

  const userRole = (session?.user as any)?.role
  if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
    redirect('/admin/login')
  }

  // Get all messages and related data
  let messages: any[] = []

  try {
    const messagesData = await db.getAllMessages(200)
    
    // Fetch related data for each message
    messages = await Promise.all(
      messagesData.map(async (message) => {
        const user = message.userId ? await db.getUserById(message.userId) : null
        const application = message.applicationId ? await db.getApplicationById(message.applicationId) : null
        
        return {
          ...message,
          user: user || null,
          application: application || null,
        }
      })
    )
  } catch (error) {
    console.error('Master Messages page - DB error:', error)
  }

  return <MasterMessagesContent messages={messages} />
}
