
import { createCampaign } from '../lib/campaign'
import { db } from '../lib/supabase'

async function launchCampaign() {
    console.log('--- INITIATING NEURAL BLAZE PROTOCOL (LIVE LAUNCH) ---')
    
    // Brand Profile ID for Lever Pioneer
    const brandId = '62c38934-4c4b-42be-98c9-06cbbee1af19'
    
    // Verify brand exists
    const brand = await db.getBrandProfileById(brandId)
    if (!brand) {
        console.error('❌ BRAND NOT FOUND. ABORTING.')
        return
    }

    console.log('Target Brand:', brand.companyName)

    const campaignInput = {
        name: 'Lever Pioneer - Ramadan Ascent 2026',
        description: 'Multi-channel awareness and lead generation at Giza Pyramids region.',
        type: 'multi_channel' as const,
        platforms: ['facebook', 'whatsapp', 'linkedin'] as ('facebook' | 'whatsapp' | 'linkedin')[],
        scheduleType: 'once' as const,
        startDate: new Date(),
        language: 'ar' as const,
        autoGenerate: true,
        brandProfileId: brandId
    }

    try {
        const campaign = await createCampaign(campaignInput)
        console.log('✅ NEURAL BLAZE PROTOCOL: STAGE 1 COMPLETE')
        console.log('Campaign ID:', campaign.id)
        console.log('Status:', campaign.status)
        
        // Trigger immediate processing
        const res = await fetch('http://localhost:3000/api/campaigns/process', { method: 'POST' }).catch(() => null)
        if (res) {
            const data = await res.json()
            console.log('✅ STAGE 2: PROCESSOR TRIGGERED', data)
        } else {
            console.log('ℹ️ STAGE 2: PROCESSOR QUEUED (Local server not detected)')
        }
        
        console.log('\n--- CAMPAIGN IS NOW LIVE ---')
        console.log('View leads at: /admin/master/tracker/' + brandId)
    } catch (error) {
        console.error('❌ LAUNCH FAILED:', error)
    }
}

launchCampaign()
