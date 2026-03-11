import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const admins = await prisma.user.findMany({
    where: { 
        OR: [
            { role: 'admin' }, 
            { role: 'main-admin' },
            { email: { contains: 'master' } }
        ]
    },
    select: { email: true, role: true, name: true }
  });
  console.log(JSON.stringify(admins, null, 2));
}

main().finally(() => prisma.$disconnect());
