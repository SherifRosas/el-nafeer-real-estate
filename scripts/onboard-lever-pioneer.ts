import { db, supabase } from '../lib/supabase'
import { randomUUID } from 'crypto'

async function onboard() {
    console.log('--- STARTING LEVER PIONEER ONBOARDING ---')
    
    const email = 'pioneer@lever.ai'
    
    try {
        // 1. Create User
        console.log('Checking for existing user...')
        let user = await db.getUserByEmail(email)
        
        if (!user) {
            console.log('Creating new user node...')
            user = await db.createUser({
                id: randomUUID(),
                email: email,
                name: 'Lever Pioneer Admin',
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
                userId: user.id,
                companyName: 'Lever Pioneer Elevators',
                industry: 'Elevator & Hydraulic Systems',
                serviceArea: 'Cairo, Giza, NAC',
                location: 'Nasr City, Cairo, Egypt',
                logoUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop',
                contactDetails: {
                    phone: '+201234567890',
                    whatsapp: '+201234567890',
                    email: email
                },
                portfolio: [
                    { title: 'Crystal Tower Installation', location: 'New Capital', year: '2025' },
                    { title: 'Hydraulic Modernization', location: 'Nasr City', year: '2024' }
                ]
            })
            console.log('Brand profile orchestrated:', profile.id)
        } else {
            console.log('Brand profile already exists:', existingProfile.id)
        }

        // 3. Create Campaigns & Executions
        console.log('Seeding campaign nodes...')
        
        const campaignsToSeed = [
            {
                name: 'Lever Pioneer Elite - Giza Domination',
                type: 'multi_channel',
                platforms: ['facebook', 'whatsapp'],
                scheduleType: 'once',
                content: 'Giza Domination Campaign',
                config: { ref: 'facebook_elite', region: 'Giza' }
            },
            {
                name: 'Lever Pioneer Elite - Zayed Expansion',
                type: 'multi_channel',
                platforms: ['facebook', 'whatsapp'],
                scheduleType: 'once',
                content: 'Zayed Elite Expansion Campaign',
                config: { ref: 'zayed_elite', region: 'Zayed' }
            },
            {
                name: 'Lever Pioneer Elite - Physical Bridge',
                type: 'physical_bridge',
                platforms: ['whatsapp'],
                scheduleType: 'once',
                content: 'Physical-to-Digital Bridge (Business Cards)',
                config: { ref: 'card_sherif', region: 'Giza' }
            }
        ]

        for (const campInput of campaignsToSeed) {
            console.log(`Checking campaign: ${campInput.name}`)
            const { data: existingCamps } = await supabase
                .from('campaigns')
                .select('*')
                .eq('name', campInput.name)
            
            if (!existingCamps || existingCamps.length === 0) {
                const now = new Date().toISOString()
                const campaign = await db.createCampaign({
                    ...campInput as any,
                    brandProfileId: existingProfile?.id || user.id, // Direct fallback
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
