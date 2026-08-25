# System Architecture & Technical Specifications / البنية البرمجية والمواصفات الفنية
**Project / المشروع:** El-Ekhwa Screens & Repair / الأخوة للشاشات والصيانة  
**Date / التاريخ:** August 2026 / أغسطس 2026  

---

## 1. Technical Stack Overview / نظرة عامة على البنية البرمجية

To minimize ongoing operational costs and support instant, high-speed usage on mobile devices, we will use a serverless, database-backed stack:

*   **Frontend & Portal:** Next.js (React, TypeScript, Tailwind CSS) deployed on Vercel.
*   **Database:** PostgreSQL hosted on Supabase (free tier provides up to 500MB of data, which easily stores thousands of customer records and repair jobs).
*   **ORM Layer:** Prisma ORM for type-safe database queries.
*   **AI Chatbot:** OpenAI GPT-3.5/4o-mini wrapper integrated into a custom Web Chat widget and hooked into a WhatsApp Business API webhook (e.g. via Twilio).
*   **QR Generator Engine:** `qrcode` npm library to dynamically generate vector QR codes for repair jobs and invoices.

---

## 2. Prisma Database Schema / هيكل قواعد البيانات

The schema is designed to model customers, available warehouse screen inventory, and repair jobs with precise financial auditing.

```prisma
// C:\Users\Sherif-Rosas\EL_NAFEER\prisma\schema.prisma (Target Mockup)

model Customer {
  id        String      @id @default(uuid())
  name      String      // Customer full name
  phone     String      @unique // Main phone number (used as lookup key)
  address   String?     // Delivery/pickup address in Hadayek Al-Ahram
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  repairs   RepairJob[]
}

model Screen {
  id           String   @id @default(uuid())
  brand        String   // LG, Samsung, Sony, Toshiba, etc.
  model        String   // Manufacturer model number
  size         Int      // Size in inches (e.g. 55)
  type         String   // LED, QLED, OLED, Smart, Regular
  condition    String   // New, Refurbished, Spare Parts
  price        Float    // Selling price in EGP
  status       String   // Available, Sold, Reserved
  warehouseLoc String?  // Bin location in the warehouse (e.g., Row B, Shelf 3)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model RepairJob {
  id            String   @id @default(uuid())
  ticketNumber  String   @unique // Public ticket format (e.g., EKW-260801)
  customerId    String
  customer      Customer @relation(fields: [customerId], references: [id])
  deviceModel   String   // TV Model / Phone Model
  issue         String   // Description of the problem (e.g., Backlight broken)
  status        String   // Received, Inspecting, Repaired, ReadyForPickup, Delivered
  estimatedCost Float    // Preliminary cost quoted to customer
  partsUsed     String?  // List of parts used (e.g., LG 43 Backlight Strips V2)
  partsCost     Float    // Cost of raw parts
  laborCost     Float    // Shop fee
  totalCost     Float    // Final customer bill (partsCost + laborCost)
  paymentStatus String   // Unpaid, Partial, Paid
  paymentMethod String?  // Cash, Visa, InstaPay, Vodafone Cash
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

## 3. The WhatsApp "Static HTML Bridge" Strategy / استراتيجية جسر الهواتف للواتساب
When the shop technician finishes a repair, they send a link to the customer on WhatsApp: `https://screens-hadayek.com/wa-repair-EKW-260801.html`. 

To prevent WhatsApp's crawler from caching a blank page or getting blocked by Vercel's dynamic routing shields, we bypass Next.js rendering entirely for the initial scrape using a **Static HTML Bridge** hosted in the `/public` folder:

```
[Tech shares link on WhatsApp] 
               │
               ▼
[WhatsApp Crawler scrapes public/wa-repair-[id].html]
               │
               ▼
[Reads static OG tags, displays large preview image with TV image and "Repaired" label]
               │
               ▼
[Immediate Client-Side Redirect via Meta/JS] ──► [Actual dynamic route: /repair/EKW-260801]
```

### Static File Example (`public/wa-repair-example.html`):
```html
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <title>فاتورة صيانة شاشة | الأخوة</title>
    <!-- Hardcoded OG tags for WhatsApp (Must be under 300KB) -->
    <meta property="og:title" content="تمت الصيانة بنجاح! شاشتك جاهزة للتسليم">
    <meta property="og:description" content="طلب صيانة رقم EKW-260801. تفقد حالة الشاشة والفاتورة والتفاصيل المالية هنا.">
    <meta property="og:image" content="https://screens-hadayek.vercel.app/images/wa-repair-done.png">
    <meta property="og:url" content="https://screens-hadayek.com/repair/EKW-260801">
    
    <!-- Instant Redirect -->
    <meta http-equiv="refresh" content="0; url=/repair/EKW-260801">
    <script>window.location.href = "/repair/EKW-260801";</script>
</head>
<body>
    <p>جاري تحويلك إلى صفحة الصيانة، يرجى الانتظار...</p>
</body>
</html>
```

---

## 4. QR Code Financial System Workflow / نظام المحاسبة المالي بالكيو آر كود

The QR code is the central connection point between the physical invoice, the database, and the user:

```
                  ┌─────────────────────────────────────┐
                  │ System Generates Unique Repair Ticket│
                  └──────────────────┬──────────────────┘
                                     │
                        ┌────────────┴────────────┐
                        ▼                         ▼
            [Customer Scans QR Code]   [Technician Scans QR Code]
            (Unauthenticated Client)     (Authenticated Dashboard)
                        │                         │
                        ▼                         ▼
            - Views Repair Status (50%)  - Opens Quick Edit Panel
            - Views Detailed Bill        - Toggle Status (e.g. Repaired)
            - Reviews Parts/Labor        - Record Payment (e.g. InstaPay)
            - Accesses WhatsApp Support  - Updates Stock Levels
```

1.  **Receipt Printing:** When a customer drops off a screen, a receipt is printed containing a unique dynamic QR code.
2.  **Customer Portal (No Login Required):** Scanning the QR code directs the customer to `/repair/[id]`. It displays a visually clear progress bar:
    `[Received] ──► [Inspecting] ──► [Repaired & Testing] ──► [Ready for Collection]`
    It also displays a breakdown of parts vs. labor to build customer trust.
3.  **Technician Portal (Requires Authentication):** When scanned by an employee logged into the Next.js admin dashboard, the same URL redirects them to an administrative action panel (`/admin/jobs/[id]`). Here, they can scan-to-update. Scanning the QR takes them directly to the edit page where they can check off the repair, log parts used, deduct them from inventory, and mark the invoice as "Paid via Cash/InstaPay".

---

## 5. AI Chatbot Integration Flow / تدفق روبوت المحادثة بالذكاء الاصطناعي

The chatbot is embedded in the web portal and acts as the shop's customer service agent:

1.  **Lead Capture:** "Welcome! Do you want to check a screen price in our warehouse, or book a repair for your television?"
2.  **Warehouse Lookup:** If a customer asks: "Do you have a 55-inch LG screen?", the bot runs a vector search or a simple SQL query on the `Screen` table where `status = "Available"` and `brand = "LG"` and returns current pricing.
3.  **Repair Assessment:** If they report an issue ("My Samsung screen has sound but no picture"), the bot diagnoses: *"This is typically a backlight failure. Repairs for 43-inch Samsung TVs usually cost between 1,200 and 1,800 EGP. Would you like to book an inspection?"*
4.  **Data Harvesting:** If the user agrees, the bot collects:
    - Customer Name
    - Phone Number (WhatsApp compatible)
    - Screen Model Number
    - Neighborhood in Hadayek Al-Ahram (e.g., Gate 1, Gate 2, Area G)
    It then creates a new entry in `Customer` and a pending `RepairJob` in the database, notifying the technician via the admin panel.
