const fs = require('fs');
const source = 'C:\\Users\\Sherif-Rosas\\.gemini\\antigravity\\brain\\0050deeb-1fda-41ae-a73f-1b6e50868d45\\real_estate_og_link_1778450695019.png';
const dest = 'c:\\Users\\Sherif-Rosas\\EL_NAFEER\\public\\og-beit-alkhair.png';

try {
    fs.copyFileSync(source, dest);
    console.log('Successfully copied OG image to public folder!');
} catch (err) {
    console.error('Failed to copy image:', err);
}
