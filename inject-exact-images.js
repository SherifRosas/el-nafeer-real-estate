const fs = require('fs');
const path = require('path');
const os = require('os');

// Path to the temp media storage for this session
const tempDir = path.join(os.homedir(), '.gemini', 'antigravity', 'brain', '0050deeb-1fda-41ae-a73f-1b6e50868d45', '.tempmediaStorage');

const publicDir = path.join(__dirname, 'public', 'campaigns', 'beit-alkhair');

// The exact filenames of the construction photos you uploaded at 02:17 AM!
const file1 = path.join(tempDir, 'media_0050deeb-1fda-41ae-a73f-1b6e50868d45_1777520973109.png');
const file2 = path.join(tempDir, 'media_0050deeb-1fda-41ae-a73f-1b6e50868d45_1777520989541.png');

if (fs.existsSync(file1) && fs.existsSync(file2)) {
    fs.copyFileSync(file1, path.join(publicDir, 'c1.jpg'));
    fs.copyFileSync(file2, path.join(publicDir, 'c2.jpg'));
    
    console.log('✅ Successfully extracted the ACTUAL construction photos!');
    console.log('✅ Overwrote the accidental screenshots in c1.jpg and c2.jpg');
    console.log('👉 Please refresh your browser one last time.');
} else {
    console.log('❌ Could not find the specific files.');
}
