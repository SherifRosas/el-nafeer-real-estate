import QRCode from 'qrcode';
import path from 'path';
import fs from 'fs';

/**
 * 🚀 LEVER PIONEER QR GENERATOR (v314.0)
 * Points to the Absolute Elite Hub for Giza/Cairo growth.
 */

const TARGET_URL = 'https://el-nafeer-real-estate.vercel.app/portal/lever-pioneer-elite?ref=qr_office&v=GROWTH_GIZA';
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'campaigns', 'lever-pioneer', 'lever_pioneer_qr.png');

async function generateQR() {
    try {
        // High-fidelity options for print
        const options = {
            errorCorrectionLevel: 'H' as const,
            quality: 1,
            margin: 1,
            color: {
                dark: '#000000',  // Black for maximum scan reliability
                light: '#ffffff'
            },
            width: 1024 // 1k resolution for print clarity
        };

        await QRCode.toFile(OUTPUT_PATH, TARGET_URL, options);
        console.log(`✅ ABSOLUTE_QR_MANIFESTED: ${OUTPUT_PATH}`);
    } catch (err) {
        console.error('❌ QR_GENERATION_FAILURE:', err);
    }
}

generateQR();
