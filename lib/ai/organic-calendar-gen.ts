/**
 * 📅 AL-NAFEER ORGANIC CALENDAR GENERATOR (v1.0)
 * Purpose: Generate authority-building content for organic Facebook/LinkedIn reach.
 */

import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

async function generateOrganicCalendar(vertical: 'elevator' | 'real-estate') {
    console.log(`🚀 Generating 7-Day High-Authority Content Calendar for ${vertical.toUpperCase()}...`);

    const elevatorPrompt = `You are a world-class Industrial Marketing Strategist for "Lever Pioneer Elevators".
We need a 7-day organic Facebook/LinkedIn content calendar designed to establish "Expert Authority" without using paid ads.
Goal: Educate the Giza/Sheikh Zayed elite about Italian elevator technology.

Each post must:
1. Provide VALUE (educational).
2. Establish ELITE status.
3. Link back to our Portal: https://el-nafeer-real-estate.vercel.app/portal/lever-pioneer-elite

Days:
Day 1: Technical (Italian Motors vs Others)
Day 2: Safety (Emergency Rescue Systems)
Day 3: Design (The Billionaire-Class Cabin Aesthetic)
Day 4: Maintenance (Preventative vs Reactive - Saving long-term costs)
Day 5: Real-World Case Study (Elite Project in Zayed)
Day 6: Sustainability (Green energy consumption of luxury lifts)
Day 7: The "Call to Action" (Consulting the AI Expert)

Format: Day Number - Title - Arabic Post Content - Creative Direction (image/video suggestion).`;

    const realEstatePrompt = `You are a luxury real estate investment advisor for "Beit Al-Khair Development".
We need a 7-day organic content calendar for Toukh and New Cairo leads.
Goal: Establish trust and explain the financial benefits of our projects.

Days:
Day 1: Investment ROI (Lotus vs Toukh market)
Day 2: Quality (Basement protection and structural integrity)
Day 3: Financial (The Reducing Balance Amortization benefit)
Day 4: Community (Living in the Heart of Toukh)
Day 5: Transparency (How we document contracts)
Day 6: Progress (The Qasr Series 15-building update)
Day 7: Closing (The Gateway to Luxury)

Format: Day Number - Title - Arabic Post Content - Creative Direction.`;

    const prompt = vertical === 'elevator' ? elevatorPrompt : realEstatePrompt;

    try {
        const completion = await groq.chat.completions.create({
            model: 'llama-3.1-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8,
            max_tokens: 3000
        });

        return completion.choices[0]?.message?.content || 'Generation failed.';
    } catch (error) {
        return `Error: ${error}`;
    }
}

async function main() {
    const calendar = await generateOrganicCalendar('elevator');
    console.log('\n--- LEVER PIONEER ORGANIC CALENDAR ---\n');
    console.log(calendar);
    
    // Save to file for user reference
    const fs = require('fs');
    fs.writeFileSync('./ORGANIC_CALENDAR_LEVER.md', calendar);
}

main();
