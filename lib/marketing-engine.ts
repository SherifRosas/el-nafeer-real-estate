/**
 * AL-NAFEER PRO: MARKETING_ENGINE_v4.5
 * Core Intelligence for Multi-Channel Orchestration
 * Specifically tailored for Industry Verticals (Elevators, Hydraulics)
 */
import Groq from 'groq-sdk'

interface BrandContext {
    companyName: string
    industry: string
    location: string
    serviceArea: string
    portfolioHighlights: string[]
    contact: {
        phone: string
        whatsapp: string
    }
}

export class MarketingEngine {
    /**
     * Dynamically generates a high-fidelity promotional script via Groq AI
     */
    static async generateElevatorPromo({ companyName, industry, location, serviceArea, portfolioHighlights, contact }: BrandContext) {
        console.log(`[ORCHESTRATOR] Generating AI marketing content for ${companyName} via Groq...`)

        const apiKey = process.env.GROQ_API_KEY
        const fallback = this.generateStaticFallback({ companyName, industry, location, serviceArea, portfolioHighlights, contact })

        if (!apiKey) {
            console.warn('[ORCHESTRATOR] GROQ_API_KEY not found. Falling back to static templates.')
            return {
                facebook: fallback.facebook,
                linkedin: fallback.linkedin,
                twitter: fallback.instagram
            }
        }

        const groq = new Groq({ apiKey })

        const prompt = `You are an elite marketing copywriter for "Al-Nafeer Pro", a premium real estate and industrial services marketing agency. 
Write engaging social media posts for an ${industry} company named "${companyName}".
Location: ${location}. Service Area: ${serviceArea}.
Portfolio: ${portfolioHighlights.join(', ')}.
WhatsApp: ${contact.whatsapp}

Rules:
1. Write 3 distinct posts: one for Facebook (Arabic, engaging), one for LinkedIn (English, professional B2B), and one for Twitter/X (Arabic, short & punchy).
2. DO NOT wrap the output in JSON or markdown blocks. Format exactly with headings "FACEBOOK:", "LINKEDIN:", and "TWITTER:".
3. Emphasize quality, safety, and modern technology.
4. Include the WhatsApp link in every post: https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`

        try {
            const completion = await groq.chat.completions.create({
                model: 'llama-3.1-8b-instant',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 1000
            })

            const responseText = completion.choices[0]?.message?.content || ''

            // Basic parsing of the raw text
            const fbMatch = responseText.match(/FACEBOOK:([\s\S]*?)(?=LINKEDIN:|$)/i)
            const liMatch = responseText.match(/LINKEDIN:([\s\S]*?)(?=TWITTER:|$)/i)
            const twMatch = responseText.match(/TWITTER:([\s\S]*?)$/i)

            return {
                facebook: fbMatch ? fbMatch[1].trim() : fallback.facebook,
                linkedin: liMatch ? liMatch[1].trim() : fallback.linkedin,
                twitter: twMatch ? twMatch[1].trim() : fallback.instagram
            }
        } catch (error) {
            console.error('[ORCHESTRATOR] Groq Generation Failed:', error)
            return {
                facebook: fallback.facebook,
                linkedin: fallback.linkedin,
                twitter: fallback.instagram
            }
        }
    }

    /**
     * Static fallback if AI quota or API key fails
     */
    static generateStaticFallback({ companyName, location, serviceArea, contact }: BrandContext) {
        return {
            facebook: `🚀 الارتقاء بمفهوم الرفاهية في ${location}! \nنحن في ${companyName} متخصصون في توريد وتركيب وصيانة المصاعد...\n\nتواصل معنا الآن عبر الواتساب مباشرة:\nhttps://wa.me/${contact.whatsapp.replace(/\D/g, '')}`,
            linkedin: `${companyName} | Industry Leaders in Vertical Transportation Systems\nFrom Saudi Arabia to Egypt, we orchestrate seamless mobility.\n\nDirect WhatsApp Inquiry: https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`,
            instagram: `Elevating standards at the heart of ${location}. 🏗️✨\nIndustrial-grade precision meets architectural elegance.`
        }
    }

    /**
     * Orchestrates the campaign tasks for the cron executor
     */
    static async scheduleDeployment(brandId: string, content: any, platforms: string[]) {
        console.log(`[ORCHESTRATOR] Initiating deployment tasks for Brand_${brandId}...`)

        const tasks = platforms.map(platform => ({
            platform,
            status: 'pending',
            scheduledAt: new Date(Date.now() + Math.random() * 86400000), // Schedule randomly within 24 hours
            content: content[platform] || content['facebook']
        }))

        return tasks
    }

    /**
     * Standardizes the WhatsApp Click-to-Chat URL
     */
    static getWhatsAppLink(phoneNumber: string, message: string = "Hello Al-Nafeer") {
        const cleanNumber = phoneNumber.replace(/\D/g, '')
        const encodedMessage = encodeURIComponent(message)
        return `https://wa.me/${cleanNumber}?text=${encodedMessage}`
    }
}
