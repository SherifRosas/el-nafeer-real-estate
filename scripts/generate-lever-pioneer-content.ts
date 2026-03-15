
import { MarketingEngine } from '../lib/marketing-engine'
import * as fs from 'fs'
import * as path from 'path'

async function generate() {
    console.log('--- INITIATING AI CONTENT GENERATION FOR LEVER PIONEER ---')

    const context = {
        companyName: 'Lever Pioneer Elevators',
        industry: 'Elevator & Hydraulic Systems',
        location: 'Nasr City, Cairo, Egypt',
        serviceArea: 'Cairo, Giza, NAC',
        portfolioHighlights: [
            'Crystal Tower Installation (New Capital)',
            'Hydraulic Modernization (Nasr City)',
            '24/7 Safety Check Protocols'
        ],
        contact: {
            phone: '+201234567890',
            whatsapp: '+201234567890'
        }
    }

    try {
        const content = await MarketingEngine.generateElevatorPromo(context)
        
        const output = `
# AL-NAFEER AI_ORCHESTRATOR CONTENT_GENERATION_v4.0
# CLIENT: Lever Pioneer Elevators
# STATUS: READY_FOR_DEPLOYMENT

## FACEBOOK_PROTOCOL
${content.facebook}

--------------------------------------------------

## LINKEDIN_PROTOCOL
${content.linkedin}

--------------------------------------------------

## TWITTER_X_PROTOCOL
${content.twitter}
        `

        const filePath = path.join(process.cwd(), 'LEVER_CAMPAIGN_CONTENT.md')
        fs.writeFileSync(filePath, output)
        
        console.log('--- CONTENT GENERATION COMPLETE ---')
        console.log(`Saved to: ${filePath}`)
    } catch (error) {
        console.error('GENERATION_FAILURE:', error)
    }
}

generate()
