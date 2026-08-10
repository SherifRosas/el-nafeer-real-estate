# Project Guidelines & Learned Lessons

## 📱 WhatsApp Link Preview Generation (The Static HTML Bridge)

**CRITICAL RULE:** When creating a shareable link specifically for WhatsApp (especially on a free `.vercel.app` domain), **DO NOT rely on Next.js server-side streaming or dynamic routes for the initial scrape.** 

WhatsApp's crawler is incredibly aggressive and will often cache a "blank" preview forever if the URL hits a Next.js redirect, times out, or gets blocked by Vercel spam filters.

**To successfully generate massive, rich WhatsApp link previews with 100% reliability, you MUST use the "Static HTML Bridge" strategy:**

1. **Create a pure static HTML file** in the `/public` folder (e.g., `public/wa-quote.html`).
2. **Hardcode all OG tags** directly in the `<head>` of this static file:
   - `<meta property="og:title" content="...">`
   - `<meta property="og:description" content="...">`
   - `<meta property="og:image" content="https://.../image.png">` (Image MUST be < 300KB)
   - `<meta property="og:url" content="...">`
3. **Add an instant redirect** inside the HTML so real users are immediately sent to the actual Next.js route when they click the preview:
   - `<meta http-equiv="refresh" content="0; url=/real-route">`
   - `<script>window.location.href="/real-route";</script>`
4. **NEVER share the link before the deployment is 100% finished.** If WhatsApp crawls a partially deployed URL, it will permanently cache a broken preview.

If you follow these steps, you will save hours of debugging WhatsApp's stubborn caching mechanics.
