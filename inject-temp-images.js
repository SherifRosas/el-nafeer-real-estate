const fs = require('fs');
const path = require('path');
const os = require('os');

// Path to the temp media storage for this session
const tempDir = path.join(os.homedir(), '.gemini', 'antigravity', 'brain', '0050deeb-1fda-41ae-a73f-1b6e50868d45', '.tempmediaStorage');

const publicDir = path.join(__dirname, 'public', 'campaigns', 'beit-alkhair');

// Find all media files
const files = fs.readdirSync(tempDir).filter(f => f.startsWith('media_') && (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')));

// Sort by creation time (descending) to get the most recent ones the user just uploaded
files.sort((a, b) => {
    return fs.statSync(path.join(tempDir, b)).mtime.getTime() - fs.statSync(path.join(tempDir, a)).mtime.getTime();
});

if (files.length >= 2) {
    const file1 = path.join(tempDir, files[1]);
    const file2 = path.join(tempDir, files[0]);

    fs.copyFileSync(file1, path.join(publicDir, 'c1.jpg'));
    fs.copyFileSync(file2, path.join(publicDir, 'c2.jpg'));
    
    console.log('✅ Successfully recovered your uploaded images from the AI Temporary Storage!');
    console.log('✅ Saved to public/campaigns/beit-alkhair/c1.jpg and c2.jpg');
    console.log('👉 Please refresh your browser to see the Live Construction Feed.');
} else {
    console.log('❌ Could not find enough recent images in temp storage.');
}
