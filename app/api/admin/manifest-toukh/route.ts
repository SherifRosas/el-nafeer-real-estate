import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/supabase';
import { randomUUID } from 'crypto';

/**
 * 🛰️ TOUKH MANIFESTATION BRIDGE (v1.0)
 * Purpose: Securely seeding the Toukh region assets via UI trigger.
 */
export async function POST() {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    if (!session || (userRole !== 'main-admin' && userRole !== 'admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const BEIT_ALKHAIR_EMAIL = 'beitalkhair.elite@gmail.com';

    try {
        const user = await db.getUserByEmail(BEIT_ALKHAIR_EMAIL);
        if (!user) throw new Error('Beit Al-Khair user not found.');

        const brandProfile = await db.getBrandProfileByUserId(user.id);
        if (!brandProfile) throw new Error('Brand profile not found.');

        const toukhProjects = [
            { titleAr: 'القصر ١٥', locationAr: 'طوخ - شارع حمام السباحة', price: 1200000, type: 'Residential', status: 'excavation' },
            { titleAr: 'القصر ١٦ - لؤلؤة طوخ', locationAr: 'طوخ - وسط المدينة', price: 1450000, type: 'Residential', status: 'foundations' },
            { titleAr: 'القصر ١٧', locationAr: 'طوخ - الطريق السريع', price: 1100000, type: 'Commercial', status: 'available' },
            { titleAr: 'القصر ١٨ - فينيسيا طوخ', locationAr: 'طوخ - الإستاد', price: 1600000, type: 'Residential', status: 'finishing' },
            { titleAr: 'بيت الخير ١٩', locationAr: 'طوخ - حي الزهور', price: 950000, type: 'Residential', status: 'available' },
            { titleAr: 'القصر ٢٠', locationAr: 'طوخ - منطقة المدارس', price: 1300000, type: 'Residential', status: 'available' },
            { titleAr: 'برج الأمل - طوخ', locationAr: 'طوخ - المحطة', price: 1800000, type: 'Mixed-Use', status: 'available' },
            { titleAr: 'القصر ٢٢', locationAr: 'طوخ - غرب المدينة', price: 1250000, type: 'Residential', status: 'foundations' },
            { titleAr: 'القصر ٢٣', locationAr: 'طوخ - شارع بورسعيد', price: 1400000, type: 'Residential', status: 'available' },
            { titleAr: 'فيلا ٢٤ - الخصوصية', locationAr: 'طوخ - ضواحي المدينة', price: 2500000, type: 'Villa', status: 'available' },
            { titleAr: 'القصر ٢٥', locationAr: 'طوخ - المعلمين', price: 1150000, type: 'Residential', status: 'excavation' },
            { titleAr: 'مجمع الخير الطبي', locationAr: 'طوخ - المركز الطبي', price: 3500000, type: 'Medical', status: 'available' },
            { titleAr: 'القصر ٢٧', locationAr: 'طوخ - الحي الشرقي', price: 1350000, type: 'Residential', status: 'available' },
            { titleAr: 'القصر ٢٨', locationAr: 'طوخ - حي السلام', price: 1050000, type: 'Residential', status: 'finishing' },
            { titleAr: 'جوهرة طوخ (القصر ٢٩)', locationAr: 'طوخ - شارع النادي', price: 2100000, type: 'Luxury', status: 'available' }
        ];

        for (const project of toukhProjects) {
            await db.createProperty({
                ownerId: brandProfile.id,
                title: project.titleAr,
                titleAr: project.titleAr,
                location: project.locationAr,
                locationAr: project.locationAr,
                price: project.price,
                type: project.type,
                status: project.status as any,
                descriptionAr: 'من أرقى مشروعات شركة بيت الخير للتطوير العقاري في مدينة طوخ. متاح حالياً للحجز بتسهيلات سداد تصل إلى ٣ سنوات.',
                features: { 
                    elevator: true, 
                    security: true, 
                    parking: true,
                    region: 'Toukh'
                }
            });
        }

        return NextResponse.json({ success: true, count: toukhProjects.length });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
