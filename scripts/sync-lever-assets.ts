
import { db } from '../lib/supabase'

async function updateBrand() {
    console.log('--- UPDATING BRAND PROFILE WITH ELITE ASSETS ---')
    
    const brandId = '62c38934-4c4b-42be-98c9-06cbbee1af19'
    
    const updates = {
        location: 'Cairo & Giza Operations - HQ: Al Omraneya, Giza',
        logoUrl: '/clients/lever-pioneer/logo_mimic.png',
        portfolio: [
            {
                title: 'Elite Vertical Logistics',
                imageUrl: '/clients/lever-pioneer/logo_mimic.png',
                description: 'Certified installation and maintenance for luxury residential and commercial towers.'
            }
        ],
        contactDetails: {
            phone: '+201234567890',
            whatsapp: '+201234567890',
            facebook: 'https://www.facebook.com/mohamed.sanad.473555'
        },
        industry: 'Elevator & Hydraulic Systems (Master Level)'
    }

    try {
        const result = await db.updateBrandProfile(brandId, updates)
        console.log('✅ BRAND PROFILE SYNCHRONIZED')
        console.log('New Location:', result.location)
        console.log('Identity Link:', result.contactDetails.facebook)
    } catch (error) {
        console.error('❌ UPDATE FAILED:', error)
    }
}

updateBrand()
