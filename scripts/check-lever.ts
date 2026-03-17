import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const profile = await prisma.brandProfile.findFirst({
        where: { companyName: { contains: 'Lever' } }
    })
    console.log('PROFILE_FOUND:', JSON.stringify(profile, null, 2))
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
