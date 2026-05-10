const fs = require('fs');
const path = require('path');
const home = require('os').homedir();
const src = path.join(home, '.gemini', 'antigravity', 'brain', '0050deeb-1fda-41ae-a73f-1b6e50868d45', 'qasr_18_render_1778286578091.png');
const dest = path.join(__dirname, 'public', 'campaigns', 'beit-alkhair', 'qasr-18-render.png');
fs.copyFileSync(src, dest);
console.log('Image copied successfully!');
