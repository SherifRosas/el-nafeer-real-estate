🏁 EL-EKHWA SCREENS: RAPID LAUNCH BLUEPRINT
Project Strategy: MVP "Go-Kart" (No AI Chatbots, Pure Conversion)
Goal: Launch ASAP to sell screens. Bypass payment gateways; use Instagram manual transfer + receipt upload.Stack: Next.js 14 (App Router), Prisma, Supabase (DB & Storage), Zod.Rule: Do NOT route checkout through "The Hive" AI. Use a strict, multi-step form to prevent hallucinations on pricing.

1. PRISMA SCHEMA (Add to existing schema.prisma)
model Screen {  id            String   @id @default(cuid())  name          String     description   String?    basePrice     Float      discountPrice Float      imageUrl      String     inStock       Boolean  @default(true)  createdAt     DateTime @default(now())  orders        Order[]}model Order {  id              String   @id @default(cuid())  screenId        String  screen          Screen   @relation(fields: [screenId], references: [id])  customerName    String  customerPhone   String     deliveryType    String   // "PICKUP" or "SHIPPING"  shippingAddress String?    receiptImageUrl String     status          String   @default("PENDING_REVIEW")   createdAt       DateTime @default(now())}
2. ZOD VALIDATION (Reuse La Playa logic)
customerPhone: Must match Egyptian regex /^01[0-2,5]{1}[0-9]{8}$/
deliveryType: Enum PICKUP / SHIPPING. If SHIPPING, shippingAddress is required (min 10 chars).
3. SEO & PUBLIC STOREFRONT
Route: app/(public)/hadayek-al-ahram-screen-store-and-repair/page.tsx
Metadata: Title: 'Screens for Sale & Repair | Hadayek Al-Ahram'.
JSON-LD: Type ElectronicsStore, LocalBusiness schema for Hadayek Al-Ahram, Giza.
UI: Mobile-first CSS Grid. Image, Name, Base Price (strikethrough), Discount Price (red), "View Details" button.
OG Image: Use a high-quality stock photo of a screen for WhatsApp/FB link previews.
4. THE NO-CART CHECKOUT FLOW (3-Step "Form-Bot")
Trigger: "Buy Now" opens a slide-out panel.
Step 1: Name & Phone (Validated via Zod).
Step 2: Pickup (Free) vs Delivery (+50 EGP). Shows dynamic total price.
Step 3: "Transfer [Total] EGP to Instagram: @YOUR_HANDLE". File upload for receipt screenshot (accept image/*).
Submit: Saves to Order table as PENDING_REVIEW. Shows success message.
5. ADMIN WORKFLOWS
Upload Screen: Server Action -> Upload image to Supabase bucket screen-images -> Save URL + data to Prisma.
Verify Order: Admin views /admin/screen-orders table -> Clicks receipt thumbnail -> Checks Instagram -> Clicks "Approve" -> Manually sends final PDF receipt to customer via WhatsApp.
📋 SEQUENTIAL PROMPTS FOR CHAT CODER (Feed one by one)
Prompt 1.1: Prisma Schema Injection

"Context: I am adding a new vertical to my existing EL_NAFEER monorepo for a physical screen store. Task: Add the following two models to my existing schema.prisma file. Do not delete any existing models. Models to add: 1. Screen: id (String, cuid), name (String), description (String, optional), basePrice (Float), discountPrice (Float), imageUrl (String), inStock (Boolean, default true), createdAt. 2. Order: id (String, cud), screenId (String, relation to Screen), customerName (String), customerPhone (String), deliveryType (String, 'PICKUP' or 'SHIPPING'), shippingAddress (String, optional), receiptImageUrl (String), status (String, default 'PENDING_REVIEW'), createdAt. Output only the Prisma code for these two models so I can paste them in."

Prompt 1.2: Zod Validation Schemas

"Context: Following the same pattern I used for the La Playa booking widget, I need strict Zod schemas for my new Screen Store. Task: Create a TypeScript file concept for my Zod schemas. I need: 1. customerInfoSchema: Validate customerName (min 3 chars) and customerPhone (must be a valid Egyptian phone number regex: /^01[0-2,5]{1}[0-9]{8}$/). 2. deliverySchema: Validate deliveryType (enum: PICKUP, SHIPPING). If SHIPPING, shippingAddress must be required and min 10 chars. Provide the clean Zod TypeScript code."

Prompt 2.1: Admin Screen Uploader

"Context: Next.js 14 App Router, Supabase for storage, Prisma for DB. Task: Write a Server Action (addScreenAction) that does the following: 1. Accepts FormData containing: name, description, basePrice, discountPrice, and an image file. 2. Validates the inputs. 3. Uploads the image file to a Supabase bucket called 'screen-images' and gets the public URL. 4. Saves the screen data + imageUrl to the Prisma Screen model. 5. Returns success or error. Also, provide a simple React Client Component (AdminScreenUploader.tsx) with a standard HTML form to call this Server Action. Keep the UI basic."

Prompt 3.1: Dynamic Product Grid + JSON-LD

"Context: Next.js 14 App Router. Route: app/(public)/hadayek-al-ahram-screen-store-and-repair/page.tsx. Task: Write the Server Component for this page. 1. Fetch all screens from Prisma where inStock === true, ordered by createdAt desc. 2. Export a metadata object for SEO: Title: 'Screens for Sale & Repair | Hadayek Al-Ahram', Description focused on buying screens and screen repair in Giza. 3. Generate a JSON-LD script tag of type ElectronicsStore. 4. Return a responsive CSS grid mapping through the screens. Each card: Image, Name, Base Price (strikethrough), Discount Price (bold red), 'View Details' link."

Prompt 3.2: Individual Screen Detail Page

"Context: Next.js 14 App Router. Route: app/(public)/hadayek-al-ahram-screen-store-and-repair/[screenId]/page.tsx. Task: Write the Server Component. 1. Fetch the single screen by params.screenId. If not found, call notFound(). 2. Generate dynamic OpenGraph metadata using the screen's name and image. 3. Display a clean layout: Large image, details. 4. Add a large button: 'Buy Now - Pay via Instagram'. When clicked, it should open a slide-out panel (render an empty div with id='checkout-panel' for now)."

Prompt 4.1: The 3-Step Slide-out Checkout Widget

"Context: Next.js Client Component. We are NOT using an AI LLM for this checkout; we are using a strict, multi-step form. Task: Build a slide-out panel (CheckoutWidget.tsx) receiving screenId, discountPrice, screenName as props. Step 1: Name & Phone (Egyptian regex). Step 2: Delivery toggle (Pickup vs Shipping +50 EGP). Show dynamic total. Step 3: Payment Instructions ('Transfer [Total] EGP to Instagram: @HANDLE'). File input for receipt. On Submit: Call a placeholder Server Action submitScreenOrderAction. Show success alert."

Prompt 5.1: The Incoming Receipts Dashboard

"Context: Route: /admin/screen-orders (Next.js Server Component). Task: Build a bare-bones admin table. 1. Fetch all Order records from Prisma, ordered by newest first. Include related Screen data. 2. Render an HTML table: Order ID, Customer Name, Phone, Screen Name, Status, Receipt Image. 3. 'Receipt Image' column: clickable thumbnail opening receiptImageUrl in new tab. 4. 'Approve' button next to each row (can just console.log ID for now)."

text


***

**Next step:** Copy that block, save it in your project folder, and whenever you are ready to start coding, just open it up and feed the prompts to your coder one by one! Let me know when you begin Phase 1.