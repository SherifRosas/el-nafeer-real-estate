import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

interface IndexChunk {
    content: string
    filePath: string
    embedding: number[]
}

export class ContextRetriever {
    private indexPath: string
    private openai: OpenAI

    constructor() {
        this.indexPath = path.join(process.cwd(), 'lib/ai/project_index.json')
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    }

    private cosineSimilarity(vecA: number[], vecB: number[]): number {
        const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
        const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
        const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
        return dotProduct / (magnitudeA * magnitudeB)
    }

    public async retrieveRelevantContext(query: string, limit: number = 5): Promise<string[]> {
        if (!fs.existsSync(this.indexPath)) {
            console.warn('[RETRIEVER] No project index found. Run indexer first.')
            return []
        }

        const index: IndexChunk[] = JSON.parse(fs.readFileSync(this.indexPath, 'utf-8'))

        try {
            const response = await this.openai.embeddings.create({
                model: "text-embedding-3-small",
                input: query,
            })
            const queryEmbedding = response.data[0].embedding

            const ranked = index.map(chunk => ({
                ...chunk,
                similarity: this.cosineSimilarity(queryEmbedding, chunk.embedding)
            })).sort((a, b) => b.similarity - a.similarity)

            const topChunks = ranked.slice(0, limit)
            return topChunks.map(chunk => `File: ${chunk.filePath}\n\n${chunk.content}\n---`)

        } catch (error) {
            console.error('[RETRIEVER] Failed to fetch external embedding limits from OpenAI:', error)
            return []
        }
    }
}
