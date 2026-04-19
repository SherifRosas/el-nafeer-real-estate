import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'

const CAMPAIGN_URL = "https://el-nafeer-real-estate.vercel.app/portal/lever-pioneer-elite?ref=infinity_gate"
const OUTPUT_DIR = "c:\\Users\\Sherif-Rosas\\EL_NAFEER\\public\\campaigns\\lever-pioneer\\"
const FILENAME = "lever_infinity_gate_qr.png"

async function generateQR() {
    try {
        if (!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        const outPath = path.join(OUTPUT_DIR, FILENAME);
        
        await QRCode.toFile(outPath, CAMPAIGN_URL, {
            color: {
                dark: '#0ea5e9', // Lever Cyan 
                light: '#000000' // Cyber-Black
            ,
            width: 1024,
            margin: 2
        });
        
        console.log(`✅ Infinity Gate QR successfully manifest at: ${outPath}`);
    } catch (err) {
        console.error('QR Generation Failed:', err);
    }
}

generateQR();
