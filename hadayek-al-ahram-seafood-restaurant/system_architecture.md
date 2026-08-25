# System Architecture: Digital Infrastructure & SEO Strategy
**Date:** August 2026  
**Project:** Hadayek Al-Ahram Seafood Restaurant (150 m² Space)

This document details the software architecture, the AI Administrative & Financial Client, integration with delivery systems, and the local search engine marketing strategy.

---

## 1. Digital Technical Stack

To maintain low maintenance costs while supporting dine-in features, we will utilize a highly scalable stack:

*   **Frontend & Booking Portal:** Next.js (React, TypeScript, Tailwind CSS) deployed on Vercel.
*   **Database:** PostgreSQL (hosted on Supabase free tier) using Prisma ORM.
*   **Administrative Dashboard:** Next.js Admin Panel powered by OpenAI API wrappers for AI-driven management.
*   **Notification Engine:** WhatsApp Business API (via Twilio or CEQUENS) for automated reservation confirmations and delivery alerts.

---

## 2. The WhatsApp "Static HTML Bridge" Strategy

To ensure 100% reliable link previews when customers share the menu, booking confirmations, or reviews on WhatsApp (crucial for local viral marketing in Hadayek Al-Ahram), we bypass dynamic Next.js routes during climbs.

```
[Customer Shares Link on WhatsApp] 
               │
               ▼
[WhatsApp Crawler hits Vercel]
               │
               ▼
[Reads public/wa-preview.html] ──► (Hardcoded OG Meta Tags, Title, Description, Image < 300KB)
               │
               ▼
[Instant Redirect via Meta/JS] ──► [Actual Next.js Seating/Menu Route (/book or /menu)]
```

### Bridge Implementation Details:
*   A static file `public/wa-preview.html` is hosted on the root.
*   It contains static Open Graph tags:
    ```html
    <meta property="og:title" content="الجمل للمأكولات البحرية | صالة طعام فاخرة وتوصيل سريع">
    <meta property="og:description" content="تفضل بزيارتنا أمام نادي الحدائق أو احجز طاولتك الآن. أفضل سمك وجمبري في الهضبة.">
    <meta property="og:image" content="https://el-nafeer-real-estate.vercel.app/images/wa-thumbnail.png"> <!-- Must be under 300KB -->
    <meta http-equiv="refresh" content="0; url=/book">
    <script>window.location.href = "/book";</script>
    ```

---

## 3. AI Administrative & Financial Client (Expanded for 150 m²)

The AI Client acts as a virtual general manager, helping to audit operations and reduce overhead:

```
                  ┌──────────────────────────────┐
                  │   AI Administrative Client   │
                  └──────────────┬───────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐    ┌──────────────────┐
│ Inventory Audit  │   │ Staff Scheduling │    │ Seating & Sales  │
│ - Spoilage alerts│   │ - Shifts & hours │    │ - Table turns    │
│ - Auto-supplier  │   │ - WhatsApp ping  │    │ - Daily margins  │
└──────────────────┘   └──────────────────┘    └──────────────────┘
```

1.  **Inventory & Spoilage Auditing:**
    *   **Perishable Control:** Sourcing fresh fish daily means high spoilage risk. The AI monitors sales trends and prompts the chef on what items to freeze or push via daily specials.
    *   **Auto-Ordering:** Drafts wholesale supplier list sheets based on forecasted weather, weekend sports club events (high traffic), and local holidays.
2.  **Staff & Shift Roster Management:**
    *   Manages shifts for the expanded team: **1 Head Chef, 2 Assistant Chefs, 1 Cleaner/Washer, 1 Cashier, and 1 Waiter**.
    *   Automatically schedules rotations and pings staff on WhatsApp for confirmations or shift swaps.
3.  **Financial Bookkeeping Integration:**
    *   Consolidates cash register data (POS), card transactions, and online delivery payouts (Talabat & elmenus).
    *   Provides daily profit reports, monitoring if raw fish costs (COGS) stay below the targeted **50% of sales**.

---

## 4. Seating Reservation & Order Intake Flow

Because the 150 m² space supports dine-in seating (24-32 seats) as well as heavy takeaway and delivery traffic, the online portal manages two main pipelines:

1.  **Dining Table Reservation Engine:**
    *   Allows families and club members to reserve one of the 8 dining tables.
    *   Includes a "Pre-order Seafood" option: Since grilling/frying takes 25-35 minutes, guests can select their fish and cooking style online so it is served hot shortly after they are seated.
2.  **Delivery Channel Integration:**
    *   Integrates Talabat and elmenus incoming orders into the central kitchen display tablet, preventing order confusion and reducing staff overhead.

---

## 5. Google Local SEO & Marketing Strategy

Seafood dining is highly geographical. We will optimize search keywords to target Pyramids Gardens residents:

### Search Target Keywords:
*   `مطعم سمك في حدائق الاهرام` (Fish restaurant in Hadayek Al-Ahram)
*   `اكل بحري حدائق الاهرام` (Seafood Hadayek Al-Ahram)
*   `عائلات مطعم سمك الجيزة` (Family fish restaurant Giza)
*   `دليفري سمك نادي الحدائق` (Fish delivery Nadi Al-Hadaeq)

### Local SEO Optimization:
*   **JSON-LD Local Business Schema:** Embed structured metadata containing the menu, physical address (opposite the club), opening hours, and phone numbers in both languages.
*   **Google Business Profile (GBP):** Keep name keyword-optimized in Arabic and English (*الجمل للمأكولات البحرية - نادي الحدائق | Hadayek Al-Ahram Seafood*).
*   **Automated Review Pings:** The AI client sends a WhatsApp thank-you message in the customer's preferred language with a direct link to review us on Google Maps.

---

## 6. Bilingual & Localization Architecture (Arabic & English)

To support the bilingual mandate, the digital ecosystem is engineered to support dynamic language switching at every level:

### A. Next.js Localization Flow
*   **Internationalized Routing:** Powered by `next-intl` with a locale prefix route structure (e.g., `/ar/menu` for Arabic and `/en/menu` for English).
*   **Directional UI Switching (RTL/LTR):**
    *   The base HTML layout dynamically reads the current locale and sets the text direction: `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>`.
    *   Uses Tailwind RTL styling variants (e.g., `ps-4` and `pe-4` instead of `pl-4` and `pr-4`) to ensure natural column wrapping and grid reversals.
*   **Static Asset Localization:** PDFs, printed receipts, and invoices are generated in dual language format or dynamic language toggle.

### B. Bilingual Database Schema (Prisma ORM)
All menu categories, food items, and descriptions are stored with dedicated language columns to avoid dynamic translations overhead:
```prisma
model MenuItem {
  id            String   @id @default(uuid())
  nameAr        String   // Arabic: سمك بلطي مشوي
  nameEn        String   // English: Grilled Tilapia Fish
  descriptionAr String   // Arabic: سمك بلطي طازج متبل بالثوم والليمون
  descriptionEn String   // English: Fresh Tilapia marinated with garlic and lemon
  price         Decimal  @db.Decimal(10, 2)
  image         String?
  category      Category @relation(fields: [categoryId], references: [id])
  categoryId    String
}
```

### C. Bilingual AI Administrative Client
*   **Customer Communication:** The AI pings customers for booking alerts or review pings in their checkout-selected language. The default fallback is Egyptian Arabic.
*   **Kitchen & Chef Interface:** Invoices and order ticket summaries sent to the kitchen display tablet will show bilingual text (e.g., `بلطي مشوي / Grilled Tilapia`) to ensure kitchen staff (who may prefer Arabic) and checkout staff (who may prefer English) can communicate seamlessly.
*   **Financial Auditing:** Administrative reports generated by the AI client can be toggled instantly between Arabic (for local tax/bookkeeping filings) and English (for owner reviews).

