import { db } from './supabase'
import { randomUUID } from 'crypto'

/**
 * PIONEER_ELITE_NURTURE_SENTINEL (v1.0)
 * 🛰️ Sentient Lead Nurturing Engine for Greater Cairo Domination
 */

export interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  brandProfileId?: string
  propertyId?: string
  notes?: string
}

export const nurture = {
  /**
   * Initiates the follow-up sequence for a newly captured lead.
   * Scheduled for +60s for high-impact realism.
   */
  async initiateSequence(lead: Lead) {
    console.log(`[NURTURE_SENTINEL]: INITIALIZING_SEQUENCE_FOR_NODE: ${lead.id} (${lead.name})`)

    const isZayed = lead.notes?.toLowerCase().includes('zayed') || lead.brandProfileId?.includes('zayed')
    const region = isZayed ? 'SHEIKH_ZAYED' : 'GIZA_CAIRO'
    const signal = isZayed ? 'IMPERIAL_SILVER' : 'SAHARA_GOLD'

    // 1. Log the initiation event to the messages table
    try {
      await db.createMessage({
        id: randomUUID(),
        type: 'SYSTEM_NURTURE_INIT',
        status: 'queued',
        content: `NURTURE_SEQUENCE_TRIGGERED: REGION=${region}, SIGNAL=${signal}, TARGET=${lead.phone}`,
        sentAt: new Date().toISOString()
      })

      // 2. Schedule the simulated WhatsApp follow-up (60s delay)
      // In a production environment, this would call a WhatsApp API or a background job worker (Vercel Cron/Inngest)
      setTimeout(() => {
        this.dispatchNurtureMessage(lead, region)
      }, 60000)

    } catch (error) {
      console.error('[NURTURE_SENTINEL]: SEQUENCE_INIT_FAILURE:', error)
    }
  },

  /**
   * Dispatches the hyper-localized follow-up message.
   */
  async dispatchNurtureMessage(lead: Lead, region: string) {
    const greeting = `مرحباً ${lead.name}، معك فريق ليفر الرائدة للمصاعد.`
    const message = region === 'SHEIKH_ZAYED' 
      ? `${greeting} شكراً لاهتمامك بخدماتنا المتميزة في الشيخ زايد. سنقوم بالتواصل معك قريباً لمناقشة تطلعاتك للهندسة الرأسية في منطقتك.`
      : `${greeting} شكراً لاهتمامك بخدماتنا في الجيزة والقاهرة. يسعدنا تقديم عرض سعر مخصص يلبي احتياجاتك بأعلى معايير الأمان والفخامة.`

    console.log(`[NURTURE_SENTINEL]: DISPATCHING_COMMAND: ${region} -> ${lead.phone}`)

    try {
      await db.createMessage({
        id: randomUUID(),
        type: 'NURTURE_WHATSAPP_DISPATCH',
        status: 'dispatched',
        content: `WHATSAPP_SENT: "${message}" -> ${lead.phone}`,
        sentAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('[NURTURE_SENTINEL]: DISPATCH_FAILURE:', error)
    }
  }
}
