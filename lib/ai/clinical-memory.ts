import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai'

// Ensure we share the Prisma instance if possible
// We will instantiate locally here, but in production we'd use the global db instance
import { prisma } from '../db'

// Initialize inside the function or provide a fallback for build time
const getOpenAI = () => new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build"
})

/**
 * Generate a vector embedding for clinical text
 */
export async function generateClinicalEmbedding(text: string): Promise<number[]> {
    const openai = getOpenAI()
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
    })
    return response.data[0].embedding
}

/**
 * Store a clinical note in the Second Brain (PatientEmbedding)
 */
export async function rememberClinicalNote(patientId: string, encounterId: string | null, content: string) {
    const embedding = await generateClinicalEmbedding(content)

    // Convert number[] to Postgres vector string "[0.1, 0.2, ...]"
    const vectorString = `[${embedding.join(',')}]`

    // We must use raw query for pgvector inserts via Prisma
    await prisma.$executeRaw`
        INSERT INTO patient_embeddings (id, "patientId", "encounterId", content, embedding, "createdAt")
        VALUES (gen_random_uuid(), ${patientId}, ${encounterId}, ${content}, ${vectorString}::vector, NOW())
    `
    return true
}

/**
 * Search the Second Brain for relevant past clinical context
 */
export async function recallPatientContext(patientId: string, query: string, limit: number = 3) {
    const queryEmbedding = await generateClinicalEmbedding(query)
    const vectorString = `[${queryEmbedding.join(',')}]`

    // Find the closest embeddings using Cosine Distance (<=>)
    const matches = await prisma.$queryRaw<
        Array<{
            id: string
            content: string
            similarity: number
        }>
    >`
        SELECT id, content, 1 - (embedding <=> ${vectorString}::vector) as similarity
        FROM patient_embeddings
        WHERE "patientId" = ${patientId}
        ORDER BY embedding <=> ${vectorString}::vector
        LIMIT ${limit}
    `

    return matches
}
