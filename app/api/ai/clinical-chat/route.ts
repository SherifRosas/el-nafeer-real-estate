import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { recallPatientContext } from '@/lib/ai/clinical-memory'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build"
})

export async function POST(req: Request) {
    try {
        const { patientId, query } = await req.json()

        if (!patientId || !query) {
            return NextResponse.json({ error: "Missing patientId or query" }, { status: 400 })
        }

        // 1. Recall historical patient context from the Vector Database
        const memoryMatches = await recallPatientContext(patientId, query, 5)
        
        // 2. Format the retrieved context for the LLM
        const contextString = memoryMatches.map(m => `- ${m.content}`).join('\n')

        // 3. Build the prompt for the Medical RAG AI
        const systemPrompt = `You are an expert AI clinical assistant for Dr. Shimaa's OB/GYN clinic. 
You act as her "Second Brain". You have been provided with historical notes and context about the specific patient.
Use the provided clinical context to answer the doctor's question or provide a recommendation.
If the context does not contain enough information, state that clearly.

Patient History Context:
${contextString || "No relevant historical notes found."}`

        // 4. Generate the response using OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: query }
            ],
            temperature: 0.2 // keep it deterministic for medical
        })

        const responseText = completion.choices[0]?.message?.content || "No response generated."

        return NextResponse.json({
            response: responseText,
            contextUsed: memoryMatches
        })

    } catch (error: any) {
        console.error("Clinical Chat Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
