import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const SHIMAA_BRAND_ID = "dr-shimaa-obgyn-profile-uuid-v100";

export async function GET() {
    try {
        const profile = await prisma.brandProfile.findUnique({
            where: { id: SHIMAA_BRAND_ID }
        });
        
        const contactDetails = profile?.contactDetails as any;
        
        return NextResponse.json({
            workingHours: contactDetails?.workingHours || { start: "13:30", end: "20:30" }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { start, end } = body;

        const profile = await prisma.brandProfile.findUnique({
            where: { id: SHIMAA_BRAND_ID }
        });

        const currentDetails = (profile?.contactDetails as any) || {};
        
        await prisma.brandProfile.update({
            where: { id: SHIMAA_BRAND_ID },
            data: {
                contactDetails: {
                    ...currentDetails,
                    workingHours: { start, end }
                }
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
