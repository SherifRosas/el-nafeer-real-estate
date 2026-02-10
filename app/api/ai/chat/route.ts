import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const SYSTEM_PROMPT = `You are "Al-Nafeer AI" (مستشار النفير العقاري), a premium AI property consultant for EL-NAFEER Real Estate Marketing platform in Egypt.
Your role is to assist users in finding luxury properties, managing their listings (for owners), and explaining the AI-driven sales process.

Project Values:
- Luxury & Premium: We deal with high-end real estate.
- AI-Powered: We use smart agents to close sales 24/7.
- Multi-Tenancy: We empower property owners with dedicated dashboards.
- Trust: Secure payments via Paymob and official documentation.

Key Information:
- Services: Property marketing, AI sales automation, owner dashboards, performance analytics.
- Target Market: Egypt (New Cairo, North Coast, Sheikh Zayed, etc.).
- Contact: 01205465036 | optimumoptimum959@gmail.com

Tone:
- Professional, sophisticated, yet accessible and helpful.
- Always respond in the same language as the user (Arabic or English).
- Encourage users to browse properties or register as owners.

Fallback Guidelines:
- If asked about properties, mention that our marketplace is constantly updated with luxury units.
- If asked about the process, explain the "Smart Purchase Journey": Select unit -> Consult AI -> Close Deal.
- If an owner asks, highlight the "Owner Dashboard" which tracks leads and availability.`

function getFallbackAnswer(message: string): string | null {
  const lowerMessage = message.toLowerCase()
  const isArabic = /[\u0600-\u06FF]/.test(message)

  const patterns: Array<{ keywords: string[]; answer: { ar: string; en: string } }> = [
    {
      keywords: ['property', 'unit', 'عقار', 'وحدة', 'شقة', 'فيلا'],
      answer: {
        ar: 'لدينا مجموعة متنوعة من العقارات الفاخرة المتاحة الآن. يمكنك تصفح القائمة كاملة من خلال زر "تصفح العقارات" على الصفحة الرئيسية.',
        en: 'We have a diverse range of luxury properties available now. You can browse the full list by clicking "Browse Properties" on the home page.',
      },
    },
    {
      keywords: ['owner', 'dashboard', 'مالك', 'تسجيل', 'لوحة'],
      answer: {
        ar: 'كصاحب عقار، يمكنك الاستمتاع بلوحة تحكم متكاملة لمتابعة مبيعاتك وعملائك. سجل الآن كمالك عقار من خلال الرابط المخصص على الصفحة الرئيسية.',
        en: 'As a property owner, you can enjoy a comprehensive dashboard to track your sales and leads. Register as an owner through the dedicated link on the home page.',
      },
    },
    {
      keywords: ['how', 'steps', 'كيف', 'خطوات', 'طريقة'],
      answer: {
        ar: 'الرحلة تبدأ باختيار عقارك، ثم استشارة الذكاء الاصطناعي (أنا!) للحصول على كل التفاصيل، وأخيراً إتمام الصفقة من خلال نظامنا الآمن.',
        en: 'The journey starts with choosing your property, then consulting AI (me!) for all details, and finally closing the deal through our secure system.',
      },
    },
    {
      keywords: ['hello', 'hi', 'مرحبا', 'السلام'],
      answer: {
        ar: 'مرحباً بك في النفير العقارية! أنا مستشارك الذكي. كيف يمكنني مساعدتك في العثور على بيت أحلامك أو إدارة استثماراتك اليوم؟',
        en: 'Welcome to EL-NAFEER Real Estate! I\'m your smart consultant. How can I help you find your dream home or manage your investments today?',
      },
    },
  ]

  for (const pattern of patterns) {
    if (pattern.keywords.some(k => lowerMessage.includes(k))) {
      return isArabic ? pattern.answer.ar : pattern.answer.en
    }
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const isArabic = /[\u0600-\u06FF]/.test(message)
    const apiKey = process.env.OPENAI_API_KEY

    // Try fallback first
    const fallback = getFallbackAnswer(message)
    if (fallback && !apiKey) {
      return NextResponse.json({ success: true, response: fallback })
    }

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        response: isArabic
          ? 'مرحباً بك! أنا مستشار العقارات الذكي. حالياً أعمل في وضع التوافر المحدود، ولكن يمكنك تصفح عقاراتنا المتاحة مباشرة على الموقع.'
          : 'Welcome! I am your AI property consultant. I am currently in limited availability mode, but you can browse our available properties directly on the site.'
      })
    }

    const openai = new OpenAI({ apiKey, timeout: 5000 })

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    return NextResponse.json({
      success: true,
      response: completion.choices[0]?.message?.content
    })

  } catch (error: any) {
    console.error('AI Error:', error)
    return NextResponse.json({
      success: true,
      response: 'I apologize, but I encountered a momentary connection issue. Please try again or browse our properties on the home page.'
    })
  }
}
