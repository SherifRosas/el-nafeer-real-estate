const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\Sherif-Rosas\\EL_NAFEER';

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
  const fullPath = path.join(root, file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`Deleted ${file}`);
  }
}
