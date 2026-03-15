import { db } from '@/lib/supabase'
import { getAIAgent } from './ai-agent'
import { MarketingEngine } from './marketing-engine'

export interface CreateCampaignInput {
  name: string
  description?: string
  type: 'social_post' | 'email_campaign' | 'multi_channel'
  platforms: ('facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email')[]
  scheduleType: 'once' | 'recurring' | 'interval'
  startDate?: Date
  endDate?: Date
  recurrenceRule?: string
  content?: string
  language?: 'ar' | 'en' | 'both'
  targetAudience?: string
  autoGenerate?: boolean
  config?: Record<string, any>
  createdBy?: string
  subAdminId?: string
  brandProfileId?: string // Link to special industry verticals
}

export interface CampaignMetrics {
  totalReach: number
  totalEngagement: number
  totalClicks: number
  executionCount: number
  successRate: number
  averageReach: number
  averageEngagement: number
}

/**
 * Create a new marketing campaign
 */
export async function createCampaign(input: CreateCampaignInput) {
  let content = input.content
  let brandProfile = null

  // Fetch brand profile if provided
  if (input.brandProfileId) {
    // Note: This matches the table name 'brand_profiles' in TABLES
    brandProfile = await db.getBrandProfileById?.(input.brandProfileId) || null
    // If getBrandProfileById doesn't exist yet, we'll use a direct way or wait.
    // Let's assume we might need to add it or use a generic one.
  }

  // Generate content if auto-generate is enabled
  if (input.autoGenerate && !content) {
    if (brandProfile) {
      // Use specialized industry marketing engine
      const promo = await MarketingEngine.generateElevatorPromo({
        companyName: brandProfile.companyName,
        industry: brandProfile.industry || 'Elevators',
        location: brandProfile.location || 'Egypt',
        serviceArea: brandProfile.serviceArea || 'Egypt',
        portfolioHighlights: (brandProfile.portfolio as any[]) || [],
        contact: {
          phone: (brandProfile.contactDetails as any)?.phone || '',
          whatsapp: (brandProfile.contactDetails as any)?.whatsapp || ''
        }
      })
      // Use the first selected platform's content as base
      content = promo[input.platforms[0] as keyof typeof promo] || (promo as any).facebook
    } else {
      const agent = getAIAgent()
      const platform = input.platforms[0] && input.platforms[0] !== 'email'
        ? input.platforms[0]
        : undefined
      const language = input.language === 'both' ? 'ar' : (input.language || 'ar')

      try {
        content = await agent.generateContent('social_post', platform as any, language as 'ar' | 'en')
      } catch (error) {
        console.warn('AI content generation failed, using fallback:', error)
        content = agent.getFallbackContent('social_post', platform as any, language as 'ar' | 'en')
      }
    }
  }

  // Get main admin ID to assign as default sub-admin
  let mainAdminId: string | undefined = undefined
  // For Supabase, we'll just use the email directly or search users
  const mainAdmin = await db.getUserByEmail('sherifrosas.ai@gmail.com')
  if (mainAdmin) {
    mainAdminId = mainAdmin.id
  }

  // Create the campaign
  const campaign = await db.createCampaign({
    name: input.name,
    description: input.description,
    type: input.type,
    platforms: input.platforms,
    scheduleType: input.scheduleType,
    startDate: input.startDate?.toISOString(),
    endDate: input.endDate?.toISOString(),
    recurrenceRule: input.recurrenceRule,
    content: content || '',
    language: input.language || 'ar',
    targetAudience: input.targetAudience,
    autoGenerate: input.autoGenerate ?? true,
    config: input.config || {},
    createdBy: input.createdBy,
    subAdminId: input.subAdminId || mainAdminId,
    brandProfileId: input.brandProfileId,
    status: input.startDate && input.startDate > new Date() ? 'scheduled' : 'active',
  })

  // Create initial executions if campaign is scheduled
  if (campaign.status === 'scheduled' || campaign.status === 'active') {
    await scheduleCampaignExecutions(campaign.id)
  }

  return campaign
}

/**
 * Schedule campaign executions based on campaign configuration
 */
export async function scheduleCampaignExecutions(campaignId: string) {
  const campaign = await db.getCampaignById(campaignId)

  if (!campaign) {
    throw new Error('Campaign not found')
  }

  const executions: any[] = []
  const now = new Date()
  const startDate = campaign.startDate ? new Date(campaign.startDate) : now
  const endDate = campaign.endDate ? new Date(campaign.endDate) : null

  // Generate execution schedule based on scheduleType
  if (campaign.scheduleType === 'once') {
    // Single execution for each platform
    for (const platform of campaign.platforms) {
      executions.push({
        campaignId: campaign.id,
        platform,
        scheduledAt: startDate.toISOString(),
        status: 'pending',
        content: campaign.content,
      })
    }
  } else if (campaign.scheduleType === 'recurring' && campaign.recurrenceRule) {
    // Parse recurrence rule and create multiple executions
    const dailyExecutions = generateDailySchedule(
      startDate,
      endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
      campaign.platforms,
      campaign.content || ''
    )
    executions.push(...dailyExecutions.map(exec => ({
      ...exec,
      campaignId: campaign.id,
      status: 'pending',
    })))
  } else if (campaign.scheduleType === 'interval') {
    const intervalDays = parseInt(campaign.recurrenceRule || '1')
    const intervalExecutions = generateIntervalSchedule(
      startDate,
      endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      intervalDays,
      campaign.platforms,
      campaign.content || ''
    )
    executions.push(...intervalExecutions.map(exec => ({
      ...exec,
      campaignId: campaign.id,
      status: 'pending',
    })))
  }

  // Create executions in database
  if (executions.length > 0) {
    await db.createCampaignExecutions(executions)
  }

  return executions
}

/**
 * Generate daily execution schedule
 */
function generateDailySchedule(
  startDate: Date,
  endDate: Date,
  platforms: string[],
  content: string
) {
  const executions: any[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    for (const platform of platforms) {
      executions.push({
        platform,
        scheduledAt: new Date(currentDate).toISOString(),
        content,
      })
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return executions
}

/**
 * Generate interval-based execution schedule
 */
function generateIntervalSchedule(
  startDate: Date,
  endDate: Date,
  intervalDays: number,
  platforms: string[],
  content: string
) {
  const executions: any[] = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    for (const platform of platforms) {
      executions.push({
        platform,
        scheduledAt: new Date(currentDate).toISOString(),
        content,
      })
    }
    currentDate.setDate(currentDate.getDate() + intervalDays)
  }

  return executions
}

/**
 * Execute a campaign execution
 */
export async function executeCampaignExecution(executionId: string) {
  const execution = await db.getExecutionById(executionId)

  if (!execution) {
    throw new Error('Execution not found')
  }

  if (execution.status !== 'pending') {
    throw new Error(`Execution ${executionId} is not pending`)
  }

  // Update status to running
  await db.updateExecution(executionId, { status: 'running' })

  try {
    const agent = getAIAgent()

    // Generate content if needed
    let content = execution.content
    if (!content && execution.campaign?.autoGenerate) {
      const platform = execution.platform !== 'email'
        ? execution.platform as any
        : undefined
      const language = execution.campaign.language === 'both'
        ? 'ar'
        : (execution.campaign.language as 'ar' | 'en')
      content = await agent.generateContent('social_post', platform, language)
    }

    // Execute the task via AI agent
    const taskId = agent.scheduleTask({
      type: execution.platform === 'email' ? 'email_campaign' : 'social_post',
      platform: execution.platform as any,
      scheduledAt: new Date(execution.scheduledAt),
      content: content || '',
      config: (execution.campaign?.config as Record<string, any>) || {},
    })

    const result = await agent.executeTask(taskId)

    // Update execution with results
    await db.updateExecution(executionId, {
      status: 'completed',
      executedAt: new Date().toISOString(),
      content: content || execution.content,
      result: {
        success: result.success,
        message: result.message,
        taskId: result.taskId,
      },
      reach: result.metrics?.reach || 0,
      engagement: result.metrics?.engagement || 0,
      clicks: result.metrics?.clicks || 0,
    })

    return result
  } catch (error: any) {
    // Update execution with error
    await db.updateExecution(executionId, {
      status: 'failed',
      executedAt: new Date().toISOString(),
      errorMessage: error.message || 'Execution failed',
    })

    throw error
  }
}

/**
 * Get campaign metrics
 */
export async function getCampaignMetrics(campaignId: string): Promise<CampaignMetrics> {
  const campaign = await db.getCampaignById(campaignId)
  const executions = campaign?.executions || []

  const completedExecutions = executions.filter((e: any) => e.status === 'completed')
  const totalReach = completedExecutions.reduce((sum: number, e: any) => sum + (e.reach || 0), 0)
  const totalEngagement = completedExecutions.reduce((sum: number, e: any) => sum + (e.engagement || 0), 0)
  const totalClicks = completedExecutions.reduce((sum: number, e: any) => sum + (e.clicks || 0), 0)
  const successCount = completedExecutions.length
  const successRate = executions.length > 0 ? (successCount / executions.length) * 100 : 0

  return {
    totalReach,
    totalEngagement,
    totalClicks,
    executionCount: executions.length,
    successRate,
    averageReach: completedExecutions.length > 0 ? totalReach / completedExecutions.length : 0,
    averageEngagement: completedExecutions.length > 0 ? totalEngagement / completedExecutions.length : 0,
  }
}

/**
 * Get global campaign metrics
 */
export async function getGlobalCampaignMetrics() {
  const campaigns = await db.getAllCampaigns()
  let totalReach = 0
  let totalEngagement = 0
  let totalClicks = 0
  let totalExecutions = 0
  let activeCampaigns = 0

  campaigns.forEach((c: any) => {
    if (c.status === 'active') activeCampaigns++
    const executions = c.executions || []
    totalExecutions += executions.length
    executions.forEach((e: any) => {
      if (e.status === 'completed') {
        totalReach += (e.reach || 0)
        totalEngagement += (e.engagement || 0)
        totalClicks += (e.clicks || 0)
      }
    })
  })

  const averageConversionRate = totalReach > 0 ? (totalClicks / totalReach) * 100 : 0

  return {
    totalReach,
    totalEngagement,
    totalClicks,
    totalExecutions,
    activeCampaigns,
    averageConversionRate
  }
}

/**
 * Get all campaigns
 */
export async function getAllCampaigns() {
  return db.getAllCampaigns()
}

/**
 * Get campaign by ID
 */
export async function getCampaignById(campaignId: string) {
  return db.getCampaignById(campaignId)
}

/**
 * Update campaign
 */
export async function updateCampaign(
  campaignId: string,
  data: Partial<CreateCampaignInput>
) {
  return db.updateCampaign(campaignId, data)
}

/**
 * Delete campaign
 */
export async function deleteCampaign(campaignId: string) {
  return db.deleteCampaign(campaignId)
}

/**
 * Pause campaign
 */
export async function pauseCampaign(campaignId: string) {
  return db.updateCampaign(campaignId, { status: 'paused' })
}

/**
 * Resume campaign
 */
export async function resumeCampaign(campaignId: string) {
  const campaign = await db.getCampaignById(campaignId)

  if (!campaign) {
    throw new Error('Campaign not found')
  }

  const newStatus = campaign.startDate && new Date(campaign.startDate) > new Date()
    ? 'scheduled'
    : 'active'

  return db.updateCampaign(campaignId, { status: newStatus })
}

/**
 * Cancel campaign
 */
export async function cancelCampaign(campaignId: string) {
  return db.updateCampaign(campaignId, { status: 'cancelled' })
}

/**
 * Process scheduled campaigns (to be called by cron job)
 */
export async function processScheduledCampaigns() {
  const now = new Date()
  const pendingExecutions = await db.getPendingExecutions(now)

  // Filter executions for active campaigns only
  const activeExecutions = pendingExecutions.filter(
    (exec: any) => exec.campaign?.status === 'active' || exec.campaign?.status === 'scheduled'
  )

  // Execute each pending execution
  const results = []
  for (const execution of activeExecutions) {
    try {
      const result = await executeCampaignExecution(execution.id)
      results.push({ executionId: execution.id, success: true, result })
    } catch (error: any) {
      results.push({ executionId: execution.id, success: false, error: error.message })
    }
  }

  return results
}

