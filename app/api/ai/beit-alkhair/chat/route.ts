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

    // 🔬 DYNAMIC_FINANCIAL_DETECTION (The Brain Upgrade)
    let injectedMathContext = "";
    let exactCalculationsText = "";
    
    const messageLower = message.toLowerCase();
    const isAskingForMath = messageLower.includes('تقسيط') || messageLower.includes('قسط') || messageLower.includes('installments') || messageLower.includes('سعر') || messageLower.includes('price');
    
    if (isAskingForMath) {
        // Attempt to extract digits (e.g. 5000000 or 150)
        let extractedNumbers = message.match(/\d+(?:,\d+)*(?:\.\d+)?/g);
        let totalPrice = 5000000; // Default Qasr 18 Price
        let area = 150; // Default SQM
        
        if (extractedNumbers && extractedNumbers.length >= 1) {
            let n1 = parseInt(extractedNumbers[0].replace(/,/g, ''));
            if (n1 > 500000) totalPrice = n1;
            else if (n1 > 50 && n1 < 500) area = n1;
        }
        if (extractedNumbers && extractedNumbers.length >= 2) {
            let n2 = parseInt(extractedNumbers[1].replace(/,/g, ''));
            if (n2 > 500000 && totalPrice === 5000000) totalPrice = n2;
            else if (n2 > 50 && n2 < 500 && area === 150) area = n2;
        }

        const amortization = calculateReducingBalance({
            totalPrice: totalPrice,
            areaSqm: area,
            downPaymentPercent: BEIT_AL_KHAIR_RULES.DOWN_PAYMENT,
            annualInterestRate: BEIT_AL_KHAIR_RULES.ANNUAL_INTEREST,
            years: 3
        });

        exactCalculationsText = `
        🏦 القيمة الإجمالية: ${totalPrice.toLocaleString()} ج.م
        📐 سعر المتر التقريبي: ${amortization.pricePerSqm.toLocaleString()} ج.م/م٢
        💰 مقدم الحجز السيادي (40%): ${amortization.downPayment.toLocaleString()} ج.م
        🗓️ القسط الشهري (على ثلاث سنوات رصيد متناقص 10%): ${amortization.monthlyPayment.toLocaleString()} ج.م
        📅 القسط الربع سنوي: ${amortization.quarterlyPayment.toLocaleString()} ج.م
        `;

        injectedMathContext = `
        CRITICAL INSTRUCTION: The user is asking for a quote. You MUST NOT calculate anything yourself. 
        You MUST repeat the exact following calculations explicitly in your Arabic response: 
        ${exactCalculationsText}
        Make it sound luxurious and elite. End by asking if they want to physically visit the Al-Qasr site.
        `;
    }

    const finalSystemPrompt = BEIT_AL_KHAIR_SYSTEM_PROMPT + "\n\n" + injectedMathContext;

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      if (isAskingForMath) {
          // If no API Key, deliver the exact math directly! (Absolute Determinism)
          return NextResponse.json({ success: true, response: `(النظام_الاحتياطي_يعمل)\n\nبناءً على المعطيات التحليلية، الخطة المالية لوحدتك الرئاسية كالتالي:\n${exactCalculationsText}\n\nهل ترغب في تحديد موعد لمعاينة الموقع في طوخ؟` })
      }
      return NextResponse.json({ success: true, response: "مرحباً. نظام الذكاء الاصطناعي المركزي في حالة تحديث. يرجى ترك رقم هاتفك وسيقوم مستشارك الملكي بالتواصل معك فوراً." })
    }

    const groq = new Groq({ apiKey })

    const messages: any[] = [
      { role: 'system', content: finalSystemPrompt },
      { role: 'user', content: message }
    ]

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages,
      max_tokens: 800,
      temperature: 0.2, // Extremely low for strict obedience to injected math
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
