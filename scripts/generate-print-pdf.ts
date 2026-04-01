import { jsPDF } from "jspdf";
import * as fs from "fs";
import * as path from "path";

/**
 * ARCHITECTURAL PRINT-READY PDF GENERATOR (v229.0)
 * -----------------------------------------------
 * This script hard-locks the 30x40cm poster into a PDF container.
 */

async function generatePDF() {
    const INPUT_PATH = "C:/Users/Sherif-Rosas/.gemini/antigravity/brain/0050deeb-1fda-41ae-a73f-1b6e50868d45/lever_elite_interface_v227_0_final_1775085845418.png";
    const OUTPUT_FOLDER = path.join(process.cwd(), "public/campaigns/lever-pioneer/branding");
    const OUTPUT_FILE = path.join(OUTPUT_FOLDER, "Lever_Pioneer_Elite_30x40.pdf");

    console.log("🚀 ARCHITECTURAL EXPORT STARTING...");

    // 1. Initialize jsPDF with custom mm units and 300x400 format
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [300, 400]
    });

    try {
        // 2. Read the high-fidelity PNG signal
        const imgBuffer = fs.readFileSync(INPUT_PATH);
        const imgBase64 = imgBuffer.toString('base64');

        // 3. surgically add image to cover the 300x400mm canvas
        doc.addImage(`data:image/png;base64,${imgBase64}`, "PNG", 0, 0, 300, 400);

        // 4. Save the print-ready PDF to the branding vault
        const pdfArrayBuffer = doc.output('arraybuffer');
        fs.writeFileSync(OUTPUT_FILE, Buffer.from(pdfArrayBuffer));

        console.log("🏆 PRINT-READY PDF GENERATED SUCCESSFULLY!");
        console.log(`📂 LOCATION: ${OUTPUT_FILE}`);
    } catch (error) {
        console.error("❌ SIGNAL FAILURE DURING PDF CONVERSION:", error);
    }
}

generatePDF();
