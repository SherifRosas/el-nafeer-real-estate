import * as QRCode from "qrcode";
import { jsPDF } from "jspdf";
import * as fs from "fs";
import * as path from "path";

/**
 * BILLIONAIRE BUSINESS CARD GENERATOR (v232.0)
 * -------------------------------------------
 * This script creates a functional 90x50mm PDF with a LIVE QR code.
 */

async function generateBusinessCard() {
    const AD_URL = "https://el-nafeer-real-estate.vercel.app/portal/lever-pioneer-elite";
    const LOGO_PATH = "C:/Users/Sherif-Rosas/.gemini/antigravity/brain/0050deeb-1fda-41ae-a73f-1b6e50868d45/lever_minimalist_profile_v221_0_cleaned_1775081914737.png";
    const OUTPUT_FOLDER = path.join(process.cwd(), "public/campaigns/lever-pioneer/branding");
    const OUTPUT_FILE = path.join(OUTPUT_FOLDER, "Lever_Pioneer_Business_Card_90x50.pdf");

    console.log("🚀 FUNCTIONAL BUSINESS CARD EXPORT STARTING...");

    try {
        // 1. Generate the Functional QR Code Signal
        const qrDataUrl = await QRCode.toDataURL(AD_URL, {
            color: {
                dark: '#06B6D4', // Lever Metallic Blue
                light: '#00000000' // Transparent
            },
            width: 500,
            margin: 1
        });

        // 2. Initialize jsPDF for 90x50mm Business Card
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [90, 50]
        });

        // 3. Set Background (Obsidian Matte Black)
        doc.setFillColor(15, 15, 15);
        doc.rect(0, 0, 90, 50, "F");

        // 4. Add the 3D Metallic Logo (Surgically Placed)
        const logoBuffer = fs.readFileSync(LOGO_PATH);
        const logoBase64 = logoBuffer.toString('base64');
        doc.addImage(`data:image/png;base64,${logoBase64}`, "PNG", 5, 5, 25, 25);

        // 5. Add HERO TITLE (Silver Typography)
        doc.setTextColor(200, 200, 200);
        doc.setFontSize(10);
        doc.text("شركة ليفر الرائدة للمصاعد", 85, 12, { align: "right" });

        doc.setFontSize(7);
        doc.text("توريد – تركيب – صيانة المصاعد", 85, 18, { align: "right" });

        // 6. Add Contacts
        doc.setFontSize(6);
        doc.text("01070615372 | 01111171368", 85, 24, { align: "right" });

        // 7. Inject the Functional QR Code (Bottom Right)
        doc.addImage(qrDataUrl, "PNG", 68, 28, 18, 18);
        
        // Label for QR
        doc.setFontSize(5);
        doc.text("SCAN TO ASCENT", 77, 48, { align: "center" });

        // 8. Save the Final Billionaire Signal
        const pdfArrayBuffer = doc.output('arraybuffer');
        fs.writeFileSync(OUTPUT_FILE, Buffer.from(pdfArrayBuffer));

        console.log("🏆 FUNCTIONAL BUSINESS CARD GENERATED SUCCESSFULLY!");
        console.log(`📂 LOCATION: ${OUTPUT_FILE}`);
    } catch (error) {
        console.error("❌ SIGNAL FAILURE DURING CARD GENERATION:", error);
    }
}

generateBusinessCard();
