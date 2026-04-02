const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function compressLogo() {
  const inputPath = path.join(process.cwd(), 'public', 'logo-share.png');
  const outputPath = path.join(process.cwd(), 'public', 'logo-share-optimized.png');

  console.log('--- STARTING ELITE COMPRESSION ---');
  
  if (!fs.existsSync(inputPath)) {
    console.error('ERROR: logo-share.png NOT FOUND AT ROOT');
    return;
  }

  await sharp(inputPath)
    .resize(1200, 1200, {
      fit: 'contain',
      background: { r: 15, g: 15, b: 15, alpha: 1 } // Billionaire Obsidian Background
    })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`SUCCESS: Manifested logo-share-optimized.png (${Math.round(stats.size / 1024)} KB)`);
}

compressLogo().catch(console.error);
