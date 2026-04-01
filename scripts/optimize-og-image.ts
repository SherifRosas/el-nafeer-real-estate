import sharp from 'sharp';
import path from 'path';

const INPUT = path.join(process.cwd(), 'public/campaigns/lever-pioneer/lever_pioneer_v318_ultimate.png');
const OUTPUT = path.join(process.cwd(), 'public/campaigns/lever-pioneer/lever_pioneer_v318_wide_600k.png');

async function optimize() {
    console.log("🏙️ Starting High-Fidelity Compression Protocol...");
    try {
        await sharp(INPUT)
            .resize(1200, 630, {
                fit: 'cover',
                position: 'center'
            })
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(OUTPUT);

        console.log("✅ Success: Optimized Building Ad for Social Reach.");
        console.log(`📍 Path: ${OUTPUT}`);
    } catch (err) {
        console.error("❌ Compression Error:", err);
    }
}

optimize();
