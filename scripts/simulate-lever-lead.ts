
import { db } from '../lib/supabase'

async function simulateLead() {
    console.log('--- INITIATING NEURAL SIGNAL INJECTION (SIMULATION) ---')
    
    // Target Brand: Lever Pioneer Elevators
    const brandId = '62c38934-4c4b-42be-98c9-06cbbee1af19'
    
    const mockLead = {
        name: 'Ahmed Mansour (SIMULATED)',
        email: 'ahmed.manager@tech-realestate.eg',
        phone: '+201112223334',
        notes: 'Interested in a panoramic elevator for a showroom in New Capital.',
        brandProfileId: brandId,
        status: 'new'
    }

    try {
        const lead = await db.createLead(mockLead)
        console.log('✅ SIGNAL CAPTURED SUCCESSFULLY')
        console.log('Lead ID:', lead.id)
        console.log('Check your dashboard at: /admin/master/tracker/' + brandId)
    } catch (error) {
        console.error('❌ INJECTION FAILED:', error)
    }
}

simulateLead()
