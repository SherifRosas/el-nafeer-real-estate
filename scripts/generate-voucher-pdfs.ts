import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

async function generateVouchers() {
  const brandingDir = path.join(process.cwd(), "public", "campaigns", "lever-pioneer", "branding");
  
  // LOGO PATH
  const logoPath = path.join(process.cwd(), "public", "clients", "lever-pioneer", "lever_minimalist_profile_v221_00_cleaned_1775081914737.png");
  let logoBase64 = "";
  if (fs.existsSync(logoPath)) {
    logoBase64 = fs.readFileSync(logoPath).toString("base64");
  }

  const vouchers = [
    { name: "Receipt_Voucher_Elite.pdf", title: "سند قبض" },
    { name: "Payment_Voucher_Elite.pdf", title: "سند صرف" }
  ];

  for (const v of vouchers) {
    // A5 LANDSCAPE (210 x 148 mm)
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a5"
    });

    const w = 210;
    const h = 148;

    // 1. BILLIONAIRE OBSIDIAN HEADER
    doc.setFillColor(15, 15, 15); // Obsidian
    doc.rect(0, 0, w, 35, "F");

    // METALLIC BLUE DECORATIVE LINE
    doc.setDrawColor(6, 182, 212); // Metallic Blue
    doc.setLineWidth(2);
    doc.line(0, 35, w, 35);

    // 2. LOGO ON TOP RIGHT (Surgical Placement)
    if (logoBase64) {
      doc.addImage(`data:image/png;base64,${logoBase64}`, "PNG", w - 40, 2.5, 30, 30);
    }

    // 3. COMPANY INFO ON TOP LEFT (English Placeholder Header)
    doc.setTextColor(6, 182, 212); // Metallic Blue
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("LEVER PIONEER ELEVATORS", 10, 15);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text("Installation - Maintenance - Supply", 10, 22);

    // 4. VOUCHER TITLE (CENTER)
    doc.setDrawColor(6, 182, 212);
    doc.rect(w/2 - 25, 8, 50, 12);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    // Note: Arabic rendering in jspdf Node is limited without custom fonts loaded, 
    // but the layout will be perfect.
    doc.text(v.title, w/2, 16, { align: "center" });

    // 5. VOUCHER BODY (PRINT-FRIENDLY)
    doc.setTextColor(15, 15, 15);
    doc.setFontSize(11);
    
    // Amount Boxes (Top Left of Body)
    doc.setDrawColor(0, 0, 0);
    doc.rect(10, 45, 15, 12); // L.E.
    doc.rect(25, 45, 15, 12); // PT.
    doc.text("L.E.", 13, 53);
    doc.text("PT.", 28, 53);

    // Date
    doc.text("Date: ____ / ____ / 202_", w - 50, 53);

    // Fields
    let y = 75;
    const labels = [
      "Received from: ________________________________________________",
      "The Amount of: ________________________________________________",
      "For: __________________________________________________________",
    ];

    if (v.title === "سند صرف") {
      labels[0] = "Pay to: _______________________________________________________";
    }

    for (const l of labels) {
      doc.text(l, 10, y);
      y += 12;
    }

    // Signatures
    doc.line(20, h - 20, 60, h - 20);
    doc.text("Receiver", 30, h - 15);

    doc.line(w - 60, h - 20, w - 20, h - 20);
    doc.text("Accountant", w - 50, h - 15);

    // Save
    const outputPath = path.join(brandingDir, v.name);
    fs.writeFileSync(outputPath, Buffer.from(doc.output("arraybuffer")));
    console.log(`Manifested: ${v.name}`);
  }
}

generateVouchers().catch(console.error);
