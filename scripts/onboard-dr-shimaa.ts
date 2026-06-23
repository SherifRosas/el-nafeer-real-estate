import { db, supabase } from '../lib/supabase'
import { randomUUID } from 'crypto'

async function onboard() {
    console.log('--- STARTING DR. SHIMAA CLINIC ONBOARDING ---')
    
    const email = 'dr.shimaa.belal.clinic@gmail.com'
    const brandProfileId = 'dr-shimaa-obgyn-profile-uuid-v100' // Custom static ID to reference in portal code
    
    try {
        // 1. Create User
        console.log('Checking for existing user...')
        let user = await db.getUserByEmail(email)
        
        if (!user) {
            console.log('Creating new user node...')
            user = await db.createUser({
                id: randomUUID(),
                email: email,
                name: 'Dr. Shimaa Belal Admin',
                emailVerified: true
            })
            console.log('User created:', user.id)
        } else {
            console.log('User already exists:', user.id)
        }

        // 2. Create Brand Profile
        console.log('Checking for existing brand profile...')
        const existingProfile = await db.getBrandProfileByUserId(user.id)
        
        if (!existingProfile) {
            console.log('Synthesizing brand profile...')
            const profile = await db.createBrandProfile({
                id: brandProfileId, // Overwrites the default randomUUID in spread
                userId: user.id,
                companyName: 'Dr. Shimaa Belal OB/GYN Clinic',
                industry: 'Obstetrics & Gynecology (نساء وتوليد)',
                serviceArea: 'Helwan, Giza, Cairo',
                location: 'Helwan University, Giza, Egypt',
                logoUrl: '/campaigns/dr-shimaa/logo.jpg',
                contactDetails: {
                    phone: '+201555699437',
                    whatsapp: '+201224576070',
                    email: email
                },
                portfolio: [
                    { title: 'Safe Delivery Package', location: 'Helwan Clinic', year: '2026' },
                    { title: '3D/4D Fetal Ultrasound', location: 'Helwan Clinic', year: '2026' }
                ]
            } as any)
            console.log('Brand profile orchestrated:', profile.id)
        } else {
            console.log('Brand profile already exists:', existingProfile.id)
        }

        // 3. Create Campaigns & Executions
        console.log('Seeding campaign nodes...')
        
        const campaignsToSeed = [
            {
                name: 'Dr. Shimaa OBGYN - Facebook Launch',
                type: 'multi_channel',
                platforms: ['facebook', 'whatsapp'],
                scheduleType: 'once',
                content: 'Dr. Shimaa OBGYN Clinic Launch Campaign',
                config: { ref: 'facebook_shimaa_launch', region: 'Helwan' }
            },
            {
                name: 'Dr. Shimaa OBGYN - Zayed Expansion',
                type: 'multi_channel',
                platforms: ['facebook', 'whatsapp'],
                scheduleType: 'once',
                content: 'Dr. Shimaa OBGYN Sheikh Zayed Expansion',
                config: { ref: 'zayed_shimaa_expansion', region: 'Zayed' }
            }
        ]

        const activeProfileId = existingProfile?.id || brandProfileId

        for (const campInput of campaignsToSeed) {
            console.log(`Checking campaign: ${campInput.name}`)
            const { data: existingCamps } = await supabase
                .from('campaigns')
                .select('*')
                .eq('name', campInput.name)
            
            if (!existingCamps || existingCamps.length === 0) {
                const campaign = await db.createCampaign({
                    ...campInput as any,
                    brandProfileId: activeProfileId,
                    status: 'active'
                })
                console.log('Campaign Manifested:', campaign.id)
            } else {
                console.log('Campaign already sovereign:', existingCamps[0].id)
            }
        }

        console.log('--- ONBOARDING COMPLETE ---')
    } catch (error) {
        console.error('CRITICAL_FAILURE in onboarding:', error)
    }
}

onboard()
