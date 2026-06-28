import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const SHIMAA_BRAND_ID = "dr-shimaa-obgyn-profile-uuid-v100";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const leads = await prisma.lead.findMany({
            where: { brandProfileId: SHIMAA_BRAND_ID },
            orderBy: { createdAt: 'desc' }
        });
        
        return NextResponse.json({ leads });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
