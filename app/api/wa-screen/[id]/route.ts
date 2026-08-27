import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // Lightning-fast DB query using Prisma's select to avoid loading full records
  const screen = await prisma.screen.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      description: true,
      discountPrice: true
    }
  })

  if (!screen) {
    return new Response('Not Found', { status: 404 })
  }

  // Pure HTML response optimized for WhatsApp scraper to bypass Next.js rendering
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${screen.name} - El-Ekhwa Screens</title>
    
    <!-- OpenGraph Tags -->
    <meta property="og:title" content="${screen.name} | EGP ${screen.discountPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}">
    <meta property="og:description" content="${screen.description ? screen.description.substring(0, 150) + '...' : 'High-quality screen available at El-Ekhwa Screens.'}">
    <meta property="og:image" content="${screen.imageUrl}">
    <meta property="og:type" content="product">
    <meta property="og:url" content="${process.env.NEXT_PUBLIC_APP_URL || 'https://el-nafeer.vercel.app'}/hadayek-al-ahram-screen-store-and-repair/${screen.id}">
    
    <!-- Twitter Cards just in case -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${screen.name}">
    <meta name="twitter:description" content="${screen.description ? screen.description.substring(0, 150) + '...' : 'High-quality screen available at El-Ekhwa Screens.'}">
    <meta name="twitter:image" content="${screen.imageUrl}">
    
    <!-- Redirect real users instantly to the real Next.js route -->
    <meta http-equiv="refresh" content="0;url=/hadayek-al-ahram-screen-store-and-repair/${screen.id}">
    
    <script>
        window.location.replace("/hadayek-al-ahram-screen-store-and-repair/${screen.id}");
    </script>
</head>
<body style="background-color: #0f172a; color: white; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
    <div style="text-align: center;">
      <h2 style="margin-bottom: 8px;">Redirecting to product...</h2>
      <p style="color: #94a3b8;">Please wait.</p>
    </div>
</body>
</html>`

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Cache heavily since WhatsApp re-crawls often, but allow revalidation
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    }
  })
}
