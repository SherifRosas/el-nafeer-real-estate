import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

interface IndexChunk {
    content: string
    filePath: string
    embedding: number[]
}

const IGNORE_DIRS = ['node_modules', '.git', '.next', 'dist', 'build', '.gemini', 'tmp']
const INCLUDE_EXTS = ['.ts', '.tsx', '.js', '.jsx', '.md', '.txt', '.prisma', '.css']

export class ProjectIndexer {
    private chunks: IndexChunk[] = []
    private indexPath: string
    private openai: OpenAI

    constructor() {
        this.indexPath = path.join(process.cwd(), 'lib/ai/project_index.json')
        // We use OpenAI specifically for the embeddings (`text-embedding-3-small`)
        // because it is extremely cheap/fast and offloads the calculation from Vercel's serverless RAM.
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_build' })
    }

    private async getFiles(dir: string): Promise<string[]> {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        const files = await Promise.all(entries.map((entry) => {
            const res = path.resolve(dir, entry.name)
            if (entry.isDirectory()) {
                if (IGNORE_DIRS.includes(entry.name)) return []
                return this.getFiles(res)
            } else {
                if (INCLUDE_EXTS.includes(path.extname(entry.name))) {
                    return res
                }
                return []
            }
        }))
        return Array.prototype.concat(...files)
    }

    private chunkText(text: string, size: number = 1000): string[] {
        const chunks: string[] = []
        let i = 0
        while (i < text.length) {
            chunks.push(text.slice(i, i + size))
            i += size - 100 // 100 char overlap
        }
        return chunks
    }

    public async indexProject() {
        console.log('[INDEXER] Starting high-fidelity project scan (Vercel-Safe)...')
        const files = await this.getFiles(process.cwd())

        console.log('[INDEXER] Contacting OpenAI for external embeddings...')

        for (const file of files) {
            const content = fs.readFileSync(file, 'utf-8')
            const relativePath = path.relative(process.cwd(), file)
            const fileChunks = this.chunkText(content)

            for (const chunk of fileChunks) {
                try {
                    const response = await this.openai.embeddings.create({
                        model: "text-embedding-3-small",
                        input: `File: ${relativePath}\n\nContent: ${chunk}`,
                    })

                    this.chunks.push({
                        content: chunk,
                        filePath: relativePath,
                        embedding: response.data[0].embedding
                    })
                } catch (error) {
                    console.error(`[INDEXER] Failed to embed chunk in ${relativePath}:`, error)
                }
            }
            console.log(`[INDEXER] Indexed: ${relativePath}`)
        }

        fs.writeFileSync(this.indexPath, JSON.stringify(this.chunks))
        console.log(`[INDEXER] Core Sync Complete. Saved to ${this.indexPath}`)
    }

    public loadIndex(): IndexChunk[] {
        if (fs.existsSync(this.indexPath)) {
            return JSON.parse(fs.readFileSync(this.indexPath, 'utf-8'))
        }
        return []
    }
}

// Support for CLI execution via ai:sync
if (require.main === module) {
    const indexer = new ProjectIndexer()
    indexer.indexProject().catch(err => {
        console.error('[INDEXER] Vital Error:', err)
        process.exit(1)
    })
}
