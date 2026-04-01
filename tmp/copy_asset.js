const fs = require('fs');
const path = require('path');

const src = path.join(process.cwd(), 'public', 'campaigns', 'lever-pioneer', 'lever_pioneer_ultimate_v159_0.png');
const dest = path.join(process.cwd(), 'public', 'campaigns', 'lever-pioneer', 'lever_pioneer_ultimate_v200_final.png');

try {
    fs.copyFileSync(src, dest);
    console.log('SUCCESS: Ultimate Asset Cloned to v200_final');
} catch (err) {
    console.error('FAILED: Clone Error:', err);
    process.exit(1);
}
