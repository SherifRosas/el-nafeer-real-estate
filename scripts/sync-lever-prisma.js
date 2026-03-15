
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function syncViaPrisma() {
    console.log('--- SYNCING ASSETS VIA PRISMA ORCHESTRATOR ---')
    
    // Brand Profile ID for Lever Pioneer
    const brandId = '62c38934-4c4b-42be-98c9-06cbbee1af19'
    
    try {
        const result = await prisma.brandProfile.update({
            where: { id: brandId },
            data: {
                location: 'Cairo & Giza Operations - HQ: Al Omraneya, Giza',
                logoUrl: '/clients/lever-pioneer/logo_mimic.png',
                industry: 'Elevator & Hydraulic Systems (Master Level)',
                contactDetails: {
                    phone: '+201234567890',
                    whatsapp: '+201234567890',
                    facebook: 'https://www.facebook.com/mohamed.sanad.473555'
                },
                portfolio: [
                    {
                        title: 'Elite Vertical Logistics',
                        imageUrl: '/clients/lever-pioneer/logo_mimic.png',
                        description: 'Certified installation and maintenance for luxury residential and commercial towers.'
                    }
                ]
            }
        })
        
        console.log('✅ BRAND PROFILE SYNCHRONIZED (PRISMA MODE)')
        console.log('ID:', result.id)
        console.log('Logo:', result.logoUrl)
    } catch (error) {
        console.error('❌ PRISMA SYNC FAILED:', error)
    } finally {
        await prisma.$disconnect()
    }
}

syncViaPrisma()
