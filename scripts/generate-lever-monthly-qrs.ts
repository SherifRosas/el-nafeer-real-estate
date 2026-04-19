import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'

const CAMPAIGNS = [
    {
        name: "infinity_gate",
        url: "https://el-nafeer-real-estate.vercel.app/portal/lever-pioneer-elite?ref=infinity_gate",
        filename: "lever_infinity_gate_qr.png"
    ,
    {
        name: "engineer_stability",
        url: "https://el-nafeer-real-estate.vercel.app/portal/lever-pioneer-elite?ref=engineer_stability",
        filename: "lever_engineer_stability_qr.png"
    }
];

const OUTPUT_DIR = "c:\\Users\\Sherif-Rosas\\EL_NAFEER\\public\\campaigns\\lever-pioneer\\"

async function generateQRs() {
    try {
        if (!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        for (const ad of CAMPAIGNS) {
            const outPath = path.join(OUTPUT_DIR, ad.filename);
            await QRCode.toFile(outPath, ad.url, {
                color: {
                    dark: '#0ea5e9', // Lever Cyan
                    light: '#000000' // Cyber-Black
                ,
                width: 1024,
                margin: 2
            });
            console.log(`✅ ${ad.name} QR manifest at: ${outPath}`);
        }
    } catch (err) {
        console.error('QR Generation Failed:', err);
    }
}

generateQRs();
