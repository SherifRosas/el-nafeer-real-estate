import * as QRCode from "qrcode";
import * as fs from "fs";
import * as path from "path";

/**
 * QR CODE SIGNAL GENERATOR (v235.0)
 * --------------------------------
 * This script exports the functional QR code as a high-res PNG.
 */

async function generateQR() {
    const AD_URL = "https://el-nafeer-real-estate.vercel.app/portal/lever-pioneer-elite";
    const OUTPUT_PATH = path.join(process.cwd(), "public/campaigns/lever-pioneer/branding/qr-code.png");

    console.log("🚀 GENERATING FUNCTIONAL QR SIGNAL...");

    try {
        await QRCode.toFile(OUTPUT_PATH, AD_URL, {
            color: {
                dark: '#06B6D4', // Lever Metallic Blue
                light: '#FFFFFF00' // Transparent
            },
            width: 1024,
            margin: 1
        });
        console.log(`🏆 QR SIGNAL SAVED: ${OUTPUT_PATH}`);
    } catch (err) {
        console.error("❌ QR SIGNAL FAILURE:", err);
    }
}

generateQR();
