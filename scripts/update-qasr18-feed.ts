import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateQasr18Images() {
  console.log('🔄 Initiating LIVE_CONSTRUCTION_FEED injection for QASR 18...')

  try {
    // Find Qasr 18
    const qasr18 = await prisma.property.findFirst({
      where: { title: 'QASR 18' }
    })

    if (!qasr18) {
      console.log('❌ QASR 18 not found in database.')
      return
    }

    // Update with construction feed images
    await prisma.property.update({
      where: { id: qasr18.id },
      data: {
        images: [
          '/campaigns/beit-alkhair/c1.jpg',
          '/campaigns/beit-alkhair/c2.jpg'
        ]
      }
    })

    console.log('✅ QASR 18 Successfully updated with Live Construction Feed images.')
  } catch (error) {
    console.error('❌ Failed to update QASR 18:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateQasr18Images()
