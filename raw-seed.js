// Native pure Node.js seed script to bypass Windows sandbox-exec
const { PrismaClient } = require('@prisma/client')
const Groq = require('groq-sdk')

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres.qtmaaomweaqoumbclpox:NafeerElite2026@aws-1-eu-central-1.pooler.supabase.com:5432/postgres"
        }
    }
})

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' })

async function generateAIContent() {
    const prompt = `You are an elite marketing copywriter for "Al-Nafeer Pro", a premium real estate and industrial services marketing agency. 
Write engaging social media posts for an Electric & Hydraulic Elevators company named "Al-Nafeer Elite Elevators".
Location: Al-Ahram Garden, Fourth Gate. Service Area: Egypt & KSA.
Portfolio: Luxury Villa Lifts, Commercial Hydraulic.
WhatsApp: +201055907971

Rules:
1. Write 3 distinct posts: one for FACEBOOK (Arabic), one for LINKEDIN (English B2B), and one for TWITTER (Arabic short).
2. Format exactly with headings "FACEBOOK:", "LINKEDIN:", and "TWITTER:".
3. Include the WhatsApp link in every post: https://wa.me/201055907971`

    const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
    })

    const responseText = completion.choices[0]?.message?.content || ''

    const fbMatch = responseText.match(/FACEBOOK:([\s\S]*?)(?=LINKEDIN:|$)/i)
    const liMatch = responseText.match(/LINKEDIN:([\s\S]*?)(?=TWITTER:|$)/i)
    const twMatch = responseText.match(/TWITTER:([\s\S]*?)$/i)

    return {
        facebook: fbMatch ? fbMatch[1].trim() : "🚀 الارتقاء بمفهوم الرفاهية في مصر! تواصل معنا للمصاعد.",
        linkedin: liMatch ? liMatch[1].trim() : "Al-Nafeer Elite Elevators | Leaders in Vertical Transportation.",
        twitter: twMatch ? twMatch[1].trim() : "Elevating standards. 🏗️✨"
    }
}

async function main() {
    console.log('🚀 Initiating Raw Seed Execution...')

    let user = await prisma.user.findFirst({ where: { email: 'elevator.owner@alnafeer.pro' } })
    if (!user) {
        user = await prisma.user.create({
            data: { email: 'elevator.owner@alnafeer.pro', name: 'Elevator Division Lead', phoneVerified: true, emailVerified: true }
        })
    }

    let brandProfile = await prisma.brandProfile.findFirst({ where: { userId: user.id } })
    if (!brandProfile) {
        brandProfile = await prisma.brandProfile.create({
            data: {
                userId: user.id, companyName: 'Al-Nafeer Elite Elevators', industry: 'Electric & Hydraulic Elevators',
                serviceArea: 'Egypt & KSA', location: 'Al-Ahram Garden, Fourth Gate',
                contactDetails: { phone: '+201055907971', whatsapp: '+201055907971', email: 'elevators@alnafeer.pro' },
                portfolio: [{ title: 'Luxury Villa Lift', location: 'New Cairo', year: 2025 }]
            }
        })
    }

    console.log('🧠 Hitting Groq API for Content...')
    const content = await generateAIContent()

    const campaign = await prisma.campaign.create({
        data: {
            name: 'PIONEER_ELEVATOR_Q1_' + Date.now().toString().slice(-4),
            description: 'AI-Generated Omni-Channel Elevator push', type: 'multi_channel',
            platforms: ['facebook', 'linkedin', 'whatsapp'], status: 'active',
            scheduleType: 'ongoing', content: JSON.stringify(content), language: 'ar',
            targetAudience: 'Developers', autoGenerate: true, brandProfileId: brandProfile.id,
            startDate: new Date()
        }
    })

    const taskData = [
        { type: 'social_post', platform: 'facebook', scheduledAt: new Date(Date.now() + 300000), status: 'pending', content: content.facebook },
        { type: 'social_post', platform: 'linkedin', scheduledAt: new Date(Date.now() + 3600000), status: 'pending', content: content.linkedin },
        { type: 'social_post', platform: 'whatsapp', scheduledAt: new Date(Date.now() + 7200000), status: 'pending', content: content.twitter }
    ]

    await Promise.all(taskData.map(task => prisma.agentTask.create({ data: task })))

    console.log(`✅ Seed Successful! Campaign: ${campaign.name}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
