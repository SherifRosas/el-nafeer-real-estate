const fs = require('fs');
const path = require('path');

const oldRoot = 'c:\\Users\\Sherif-Rosas\\EL_NAFEER';
const newRoot = 'c:\\Users\\Sherif-Rosas\\dr-shimaa-clinic';

const files = [
  'app/api/ai/clinical-chat/route.ts',
  'app/api/clinical/encounters/route.ts',
  'app/api/clinical/patients/route.ts',
  'app/api/dr-shimaa-leads/route.ts',
  'app/api/dr-shimaa-settings/route.ts',
  'app/dashboard/dr-shimaa/patients/page.tsx',
  'app/dashboard/dr-shimaa/patients/[id]/page.tsx',
  'app/portal/dr-shimaa-sovereign/page.tsx',
  'app/portal/dr-shimaa-sovereign/dashboard/page.tsx',
  'components/DrShimaaClinicalMesh.tsx',
  'components/DrShimaaClinicalPortal.tsx',
  'lib/ai/clinical-memory.ts',
  'public/campaigns/dr-shimaa/logo.jpg',
  'public/campaigns/dr-shimaa/logo.png',
  'public/campaigns/dr-shimaa/shimaa_og_light.png',
  'public/campaigns/dr-shimaa/shimaa_portal_bg.png',
  'scripts/onboard-dr-shimaa.ts'
];

for (const file of files) {
  const oldPath = path.join(oldRoot, file);
  
  let newRelative = file;
  if (!file.startsWith('public')) {
    newRelative = 'src/' + file;
  }
  
  const newPath = path.join(newRoot, newRelative);
  
  if (fs.existsSync(oldPath)) {
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
    fs.copyFileSync(oldPath, newPath);
    console.log(`Copied ${file}`);
  } else {
    console.log(`MISSING: ${oldPath}`);
  }
}

// Create lib/db.ts
const dbContent = `import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
`;
fs.mkdirSync(path.join(newRoot, 'src/lib'), { recursive: true });
fs.writeFileSync(path.join(newRoot, 'src/lib/db.ts'), dbContent);
console.log('Created src/lib/db.ts');
