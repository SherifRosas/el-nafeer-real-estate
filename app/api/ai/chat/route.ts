import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { ContextRetriever } from '@/lib/ai/context-retriever'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const BASE_SYSTEM_PROMPT = `You are "Al-Nafeer AI" (مستشار النفير العقاري), a premium AI property consultant for EL-NAFEER Real Estate Marketing platform in Egypt.
Your role is to assist users in finding luxury properties, managing their listings (for owners), and explaining the AI-driven sales process.

Project Values:
- Luxury & Premium: We deal with high-end real estate.
- AI-Powered: We use smart agents to close sales 24/7.
- Trust: Secure payments via Paymob and official documentation.

Key Information:
- Services: Property marketing, AI sales automation, owner dashboards, performance analytics.
- Target Market: Egypt (New Cairo, North Coast, Sheikh Zayed, etc.).
- Contact: 01205465036 | optimumoptimum959@gmail.com

Tone: Professional, sophisticated, yet accessible and helpful.
Always respond in the same language as the user (Arabic or English).`

const retriever = new ContextRetriever()

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, projectAwareness = true, vertical = 'real-estate' } = await request.json()
    const session = await getServerSession(authOptions)

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        response: vertical === 'elevator' 
          ? "مرحباً بك في ليفر الرائدة للمصاعد! 🇮🇹 نحن جاهزون لخدمتك وتصميم المقايسة الفنية الخاصة بك. يرجى تزويدنا برقم هاتفك أو التواصل معنا عبر الواتساب فوراً، حيث أن النظام الذكي تحت التحديث اللحظي وسيقوم مهندسونا بالرد عليك مباشرة."
          : "مرحباً بك في النفير العقارية! نحن هنا لمساعدتك في العثور على عقارك المثالي. يرجى التواصل معنا عبر الواتساب أو ترك رقم هاتفك، بينما نقوم بتحديث أنظمة الذكاء الاصطناعي لخدمتك بشكل أفضل."
      })
    }

    const groq = new Groq({ apiKey })

    // 0. Dynamic Vertical System Prompt Selection
    let verticalPrompt = BASE_SYSTEM_PROMPT;
    if (vertical === 'elevator') {
      verticalPrompt = `You are "Lever AI" (مستشار ليفر الذكي), the premium technical consultant for Lever Pioneer Elevators (ليفر الرائدة للمصاعد) in Giza & Sheikh Zayed, Egypt.
Your expertise is focused on high-end Italian elevator technology, luxury villa lifts, and professional maintenance contracts.

Core Knowledge:
- Technology: 100% Italian engineering and motors.
- Key Projects: Elite residential buildings in Hadayek El Ahram and luxury villas in Sheikh Zayed.
- Services: Installation, modernization (renewal), and 24/7 maintenance.
- Selling Points: Noise-less movement, high safety standards, elegant Italian design.
- Technical Guarantee: Highest safety certifications and premium after-sales support.

Tone: Expert, reliable, polite, and technical yet easy to understand.
Goal: Capture the lead (phone number) and explain why Italian technology is the superior choice for Giza elite properties.
Language: Always respond in the same language as the user (Arabic or English).`
    }

    // 1. Retrieve Codebase Context (RAG)
    let codebaseContext = ''
    if (projectAwareness) {
      try {
        const snippets = await retriever.retrieveRelevantContext(message)
        if (snippets.length > 0) {
          codebaseContext = `\n\n[RELEVANT_CODEBASE_CONTEXT]:\n${snippets.join('\n')}\n`
        }
      } catch (ragError) {
        console.warn("RAG Context retrieval bypassed due to missing API Keys.")
      }
    }

    // 2. Retrieve Past Conversations
    let historyContext: any[] = []
    if (sessionId) {
      try {
        const pastMessages = await prisma.chatMessage.findMany({
          where: { sessionId },
          orderBy: { createdAt: 'desc' },
          take: 10
        })
        historyContext = pastMessages.reverse().map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
        }))
      } catch (dbError) {
        console.warn("Database history retrieval bypassed due to DB connection failure.")
      }
    }

    const fullSystemPrompt = `${verticalPrompt}${codebaseContext}`

    // 3. Construct Final Payload
    const messages: any[] = [
      { role: 'system', content: fullSystemPrompt },
      ...historyContext,
      { role: 'user', content: message }
    ]

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    })

    const aiResponse = completion.choices[0]?.message?.content || ''

    // 4. Persist to History (Async)
    if (sessionId) {
      await prisma.chatMessage.createMany({
        data: [
          { sessionId, role: 'user', content: message },
          { sessionId, role: 'assistant', content: aiResponse }
        ]
      }).catch(err => console.error("History Save Error:", err))
    }

    return NextResponse.json({
      success: true,
      response: aiResponse,
      contextUsed: projectAwareness && codebaseContext.length > 0
    })

  } catch (error: any) {
    console.error('AI Universal Context Error:', error)
    return NextResponse.json({
      success: true,
      response: 'I apologize, but I encountered a momentary synchronization issue. Please try again.'
    })
  }
}
