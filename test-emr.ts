import { prisma } from './lib/db'
import { rememberClinicalNote, recallPatientContext } from './lib/ai/clinical-memory'

async function main() {
    console.log("Creating dummy patient...")
    const patient = await prisma.patient.create({
        data: {
            name: "سارة محمد أحمد",
            phone: "01001234567",
            bloodType: "O+",
            allergies: "Penicillin",
            medicalHistory: "Asthma since childhood.",
            brandProfileId: "dr-shimaa-obgyn-profile-uuid-v100"
        }
    })

    console.log("Patient created:", patient.id)

    const encounterNotes = [
        "Patient presented with mild abdominal cramping at 12 weeks gestation. Ultrasound shows normal fetal heartbeat. Recommended rest and prescribed mild antispasmodic.",
        "Follow up at 16 weeks. Cramping has stopped. Patient reports slight nausea in mornings. Vitals normal. BP 110/70.",
        "Routine checkup at 20 weeks. Anatomy scan normal. Prescribed iron supplements due to mild anemia (Hb 10.5)."
    ]

    console.log("Creating encounters and generating embeddings...")
    for (const note of encounterNotes) {
        const enc = await prisma.clinicalEncounter.create({
            data: {
                patientId: patient.id,
                type: "consultation",
                doctorNotes: note
            }
        })
        
        // Await this specifically for the test so we know it finishes
        await rememberClinicalNote(patient.id, enc.id, note)
        console.log("Embedded note:", enc.id)
    }

    console.log("Testing RAG Recall...")
    const query = "What was prescribed for the patient's anemia?"
    console.log(`Query: "${query}"`)
    const matches = await recallPatientContext(patient.id, query, 1)
    
    console.log("Best Match Context:", matches[0]?.content)
    console.log("Similarity Score:", matches[0]?.similarity)
}

main().catch(console.error).finally(() => prisma.$disconnect())
