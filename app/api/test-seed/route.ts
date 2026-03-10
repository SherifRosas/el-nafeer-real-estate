import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { MarketingEngine } from '@/lib/marketing-engine'

const prisma = new PrismaClient()

export async function GET() {
    try {
        console.log('🚀 Initiating Al-Nafeer Pro Elevator Campaign Setup via API Trigger...')

        // 1. Get or create a base user for the brand owner
        let user = await prisma.user.findFirst({
            where: { email: 'elevator.owner@alnafeer.pro' }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: 'elevator.owner@alnafeer.pro',
                    name: 'Elevator Division Lead',
                    phoneVerified: true,
                    emailVerified: true
                }
            })
        }

        // 2. Create the BrandProfile for the Elevator company
        let brandProfile = await prisma.brandProfile.findFirst({
            where: { userId: user.id }
        })

        if (!brandProfile) {
            brandProfile = await prisma.brandProfile.create({
                data: {
                    userId: user.id,
                    companyName: 'Al-Nafeer Elite Elevators',
                    industry: 'Electric & Hydraulic Elevators',
                    serviceArea: 'Egypt & KSA',
                    location: 'Al-Ahram Garden, Fourth Gate',
                    contactDetails: {
                        phone: '+201055907971',
                        whatsapp: '+201055907971',
                        email: 'elevators@alnafeer.pro'
                    },
                    portfolio: [
                        { title: 'Luxury Villa Lift', location: 'New Cairo', year: 2025 },
                        { title: 'Commercial Hydraulic', location: 'Riyadh', year: 2024 }
                    ]
                }
            })
        }

        // 3. Generate Promotional Content via Marketing Engine (Groq AI)
        const contact = brandProfile.contactDetails as any;
        const content = await MarketingEngine.generateElevatorPromo({
            companyName: brandProfile.companyName,
            industry: brandProfile.industry || '',
            location: brandProfile.location || '',
            serviceArea: brandProfile.serviceArea || '',
            contact: { phone: contact.phone, whatsapp: contact.whatsapp },
            portfolioHighlights: ['Luxury Villa Lifts', 'High-Speed Commercial Elevators']
        })

        // 4. Create the Campaign
        const campaign = await prisma.campaign.create({
            data: {
                name: 'PIONEER_ELEVATOR_AWARENESS_Q1_' + Date.now().toString().slice(-4), // Ensure unique name per run
                description: 'AI-Generated Omni-Channel push to establish authority in high-end hydraulic and electric elevators.',
                type: 'multi_channel',
                platforms: ['facebook', 'linkedin', 'whatsapp'],
                status: 'active',
                scheduleType: 'ongoing',
                content: JSON.stringify(content),
                language: 'ar',
                targetAudience: 'Architects, Developers, Villa Owners',
                autoGenerate: true,
                brandProfileId: brandProfile.id,
                startDate: new Date()
            }
        })

        // 5. Create Pending Execution Tasks
        const taskData = [
            {
                type: 'social_post',
                platform: 'facebook',
                scheduledAt: new Date(Date.now() + 1000 * 60 * 5),
                status: 'pending',
                content: content.facebook
            },
            {
                type: 'social_post',
                platform: 'linkedin',
                scheduledAt: new Date(Date.now() + 1000 * 60 * 60),
                status: 'pending',
                content: content.linkedin
            },
            {
                type: 'social_post',
                platform: 'whatsapp',
                scheduledAt: new Date(Date.now() + 1000 * 60 * 120),
                status: 'pending',
                content: (content as any).twitter || content.facebook
            }
        ]

        const createdTasks = await Promise.all(
            taskData.map(task =>
                prisma.agentTask.create({
                    data: task
                })
            )
        )

        return NextResponse.json({
            success: true,
            message: `Created campaign ${campaign.name} and seeded ${createdTasks.length} pending execution tasks.`,
            brand: brandProfile.companyName
        })
    } catch (error: any) {
        console.error('Seed API Error:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
