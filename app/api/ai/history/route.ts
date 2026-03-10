import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const sessions = await prisma.chatSession.findMany({
            where: { userId: (session.user as any).id },
            include: { messages: { orderBy: { createdAt: 'desc' }, take: 50 } },
            orderBy: { updatedAt: 'desc' }
        })

        return NextResponse.json({ success: true, sessions })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { messages, title } = await request.json()

    try {
        const chatSession = await prisma.chatSession.create({
            data: {
                userId: (session.user as any).id,
                title: title || 'New Conversation',
                messages: {
                    create: messages.map((m: any) => ({
                        role: m.role,
                        content: m.content
                    }))
                }
            }
        })

        return NextResponse.json({ success: true, chatSession })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
