import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { rememberClinicalNote } from '@/lib/ai/clinical-memory'

export async function POST(req: Request) {
    try {
        const data = await req.json()
        
        // 1. Save the encounter to the standard Postgres database
        const newEncounter = await prisma.clinicalEncounter.create({
            data: {
                patientId: data.patientId,
                type: data.type,
                symptoms: data.symptoms,
                vitals: data.vitals,
                diagnosis: data.diagnosis,
                treatmentPlan: data.treatmentPlan,
                doctorNotes: data.doctorNotes,
            }
        })

        // 2. Build the clinical text to memorize
        const clinicalText = `
Encounter Type: ${data.type}
Symptoms: ${data.symptoms || 'None recorded'}
Vitals: ${JSON.stringify(data.vitals || {})}
Diagnosis: ${data.diagnosis || 'Pending'}
Treatment Plan: ${data.treatmentPlan || 'None'}
Doctor Notes: ${data.doctorNotes || 'None'}
`.trim()

        // 3. Asynchronously embed this note into the AI "Second Brain"
        // We don't await this so we can return the API response faster to Dr. Shimaa
        rememberClinicalNote(data.patientId, newEncounter.id, clinicalText).catch(e => {
            console.error("Failed to embed clinical note:", e)
        })

        return NextResponse.json({ encounter: newEncounter })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
