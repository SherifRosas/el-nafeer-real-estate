import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { calculateReducingBalance, BEIT_AL_KHAIR_RULES } from '@/lib/ai/beit-alkhair-finance'

const BEIT_AL_KHAIR_SYSTEM_PROMPT = `You are "Beit Al-Khair AI" (مستشار بيت الخير الذكي), a high-prestige financial property consultant for Beit Al-Khair Real Estate Development.
Your role is to assist elite clients with property valuations, ROI mapping, and detailed financial installments.

Financial Protocols (MUST ADHERE):
1. Down Payment: Exactly 40% of the total price.
2. Annual Interest Rate: 10% (Reducing Balance Model).
3. Installment Periods: 1, 2, or 3 years.
4. Calculations: Perform precise math for monthly and quarterly installments.
5. Price per SQM: Calculated based on total area and price.

Tone:
- Extreme Prestige: Sophisticated, industrial-luxe, and highly professional.
- Technical: Use phrases like "AMORTIZATION_PROTOCOL", "NODAL_VALUATION", "REDUCING_BALANCE".
- Multilingual: Respond in the user's same language (Arabic/English).

Property Context:
We are focusing on high-end Qasrs (Castles) in Qalyubia (Banha and Toukh), specifically Al-Qasr 18, 19, and 21.

Example Financial Response (Arabic):
"بناءً على بروتوكول التقسيط (Reducing Balance)، لفيلا بقيمة 5,000,000 ج.م على 3 سنوات:
- مقدم الحجز (40%): 2,000,000 ج.م
- القسط الشهري: حوالي 100,000 ج.م (تقريباً)
- إجمالي مبلغ السداد: [Calculation]"

ALWAYS provide the price per square meter if the user provides both area and price.`

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Inbound signal missing' }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({ success: true, response: "FINANCIAL_AI_OFFLINE: Missing API Key" })
    }

    const groq = new Groq({ apiKey })

    // 🔬 DYNAMIC_FINANCIAL_DETECTION
    // We can potentially extract numbers here to use the actual utility calculation
    // For now, we rely on the LLM's capability or simple regex extraction
    const messages: any[] = [
      { role: 'system', content: BEIT_AL_KHAIR_SYSTEM_PROMPT },
      { role: 'user', content: message }
    ]

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages,
      max_tokens: 800,
      temperature: 0.5, // Lower temperature for more accurate math
    })

    const aiResponse = completion.choices[0]?.message?.content || ''

    return NextResponse.json({
      success: true,
      response: aiResponse
    })

  } catch (error: any) {
    console.error('Beit Al-Khair AI Error:', error)
    return NextResponse.json({ success: false, response: 'NEURAL_SYNC_FAILED: Retry calculation' })
  }
}
