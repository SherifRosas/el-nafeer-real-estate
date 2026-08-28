import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { imageBase64 } = body

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Prepare system instructions for a high-converting Arabic B2C description
    const systemInstruction = `
      You are an expert electronics salesman working for 'شاشات الإخوة' (El-Ekhwa Screens). 
      You will be given a photo of a screen (TV or PC monitor). 
      Your task is to identify the brand, size, and type of the screen and write a catchy product name and a highly persuasive, professional Arabic description. 
      Focus on the visual condition, bezels, and potential use cases (gaming, movies, office work).
      
      Respond EXACTLY with a JSON object in this format (no markdown code blocks, just raw JSON):
      {
        "name": "A short, catchy Arabic title for the screen (e.g. شاشة سامسونج سمارت 55 بوصة بحالة الزيرو)",
        "description": "A compelling, detailed Arabic description (3-5 sentences) highlighting its features and why it's a great buy."
      }
    `

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemInstruction
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Please analyze this screen and generate the name and description in Arabic." },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
                detail: "low" // Keep it low detail to save tokens and speed up response
              }
            }
          ]
        }
      ],
      max_tokens: 500,
      response_format: { type: "json_object" }
    })

    const resultText = response.choices[0].message.content || "{}"
    const resultJson = JSON.parse(resultText)

    return NextResponse.json(resultJson)
  } catch (error: any) {
    console.error("AI Generation Error:", error)
    return NextResponse.json({ error: error.message || 'Failed to generate description' }, { status: 500 })
  }
}
