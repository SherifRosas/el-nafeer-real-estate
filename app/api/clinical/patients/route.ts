import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const brandProfileId = searchParams.get('brandProfileId')

    try {
        const patients = await prisma.patient.findMany({
            where: brandProfileId ? { brandProfileId } : undefined,
            orderBy: { updatedAt: 'desc' },
            include: {
                encounters: {
                    orderBy: { date: 'desc' },
                    take: 1
                }
            }
        })
        return NextResponse.json({ patients })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const newPatient = await prisma.patient.create({
            data: {
                name: data.name,
                phone: data.phone,
                dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
                bloodType: data.bloodType,
                allergies: data.allergies,
                medicalHistory: data.medicalHistory,
                brandProfileId: data.brandProfileId
            }
        })
        return NextResponse.json({ patient: newPatient })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
