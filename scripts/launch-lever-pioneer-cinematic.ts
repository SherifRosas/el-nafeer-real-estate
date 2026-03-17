import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🦅 Initiating Official El Nafeer Broadcast: Cinematic Ascent v5.5...')

    // 1. Target the Lever Pioneer Brand Profile
    const brandProfile = await prisma.brandProfile.findFirst({
        where: { companyName: { contains: 'Lever' } }
    })

    if (!brandProfile) {
        throw new Error('Lever Pioneer Profile Fail: Node not found in database.')
    }

    // 2. Update Brand Profile with Official Hadayek Al-Ahram Context
    await prisma.brandProfile.update({
        where: { id: brandProfile.id },
        data: {
            industry: 'Elite Elevator Systems & Master Maintenance',
            location: 'Cairo, Giza - Hadayek Al-Ahram (Fourth Gate)',
            contactDetails: {
                phone: '+201070615372', // Lever Main
                whatsapp: '+201111171368', // WhatsApp Node
                elNafeerPlatform: '01065661882' // El Nafeer Global Platform
            }
        }
    })
    console.log('✅ Brand Profile Synchronized with Level 5.5 Context.')

    // 3. Create the Official Cinematic Campaign
    const campaignName = `OFFICIAL_BROADCAST_HADAYEK_AHRAM_ASCENT_${Date.now().toString().slice(-4)}`
    const cinematicUrl = 'https://el-nafeer-real-estate.vercel.app/lever-pioneer/ad-v2'
    
    const campaign = await prisma.campaign.create({
        data: {
            name: campaignName,
            description: 'Total cinematic broadcast of the Lever Pioneer HQ launch in Hadayek Al-Ahram. Full AI voiceover and Eagle animation enabled.',
            type: 'multi_channel',
            platforms: ['whatsapp', 'facebook', 'linkedin'],
            status: 'active',
            scheduleType: 'ongoing',
            language: 'ar',
            targetAudience: 'Hadayek Al-Ahram Residents, Developers, Real Estate Investors',
            brandProfileId: brandProfile.id,
            startDate: new Date(),
            content: JSON.stringify({
                script: "الان من قلب مصر من الجيزه حدايق الاهرام تدشن شركة ليفر الرائده للمصاعد مقرها الجديد للتواصل اضغط علي الايقونات واتساب او الاتصال او الموقع و للتواصل مع المنصه النفير العالميه للاعلان اضغط علي صقر النفير",
                visuals: "Cinematic Ascent v5.5",
                adUrl: cinematicUrl,
                eagleNode: "Active",
                voiceProtocol: "Arabic AI Narration"
            })
        }
    })
    console.log(`✅ Campaign Broadcast Initiated: ${campaign.name}`)

    // 4. Schedule High-Tier Agent Tasks (Simulated Global Push)
    const taskData = [
        {
            type: 'social_post',
            platform: 'whatsapp',
            scheduledAt: new Date(Date.now() + 1000 * 60 * 2), // 2 mins
            status: 'pending',
            content: `📢 OFFICIAL LAUNCH: Lever Pioneer Elevators @ Hadayek Al-Ahram. Watch the cinematic experience: ${cinematicUrl}`
        },
        {
            type: 'social_post',
            platform: 'facebook',
            scheduledAt: new Date(Date.now() + 1000 * 60 * 30), // 30 mins
            status: 'pending',
            content: `🦅 El Nafeer Global presents: The Ascent of Lever Pioneer. HQ officially open in Hadayek Al-Ahram. Interactive Portal: ${cinematicUrl}`
        }
    ]

    await Promise.all(
        taskData.map(task =>
            prisma.agentTask.create({
                data: task
            })
        )
    )

    console.log(`✅ ${taskData.length} Global Broadcast Tasks scheduled for execution nodes.`)
    console.log('🎉 MISSION ACCOMPLISHED: The Eagle is Broadcasting.')
}

main()
    .catch((e) => {
        console.error('❌ Broadcast Failure:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
