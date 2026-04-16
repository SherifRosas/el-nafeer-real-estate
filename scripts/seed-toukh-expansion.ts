import { db } from '../lib/supabase';
import { randomUUID } from 'crypto';

/**
 * 🏙️ TOUKH EXPANSION: THE 15-BUILDING PILOT (SEALED)
 * Purpose: Populating the Qalyubia domain with high-value real estate assets.
 */
async function seedToukhExpansion() {
    console.log('🏗️ INITIATING TOUKH MANIFESTATION PROTOCOL...');

    const BEIT_ALKHAIR_EMAIL = 'beitalkhair.elite@gmail.com';
    
    try {
        const user = await db.getUserByEmail(BEIT_ALKHAIR_EMAIL);
        if (!user) {
            console.error('❌ Error: Beit Al-Khair user not found. Run onboarding script first.');
            return;
        }

        const brandProfile = await db.getBrandProfileByUserId(user.id);
        if (!brandProfile) {
            console.error('❌ Error: Brand profile not found.');
            return;
        }

        // --- THE TOUKH 15 MANIFEST ---
        const toukhProjects = [
            { id: randomUUID(), titleAr: 'القصر ١٥', locationAr: 'طوخ - شارع حمام السباحة', price: 1200000, type: 'Residential', status: 'excavation' },
            { id: randomUUID(), titleAr: 'القصر ١٦ - لؤلؤة طوخ', locationAr: 'طوخ - وسط المدينة', price: 1450000, type: 'Residential', status: 'foundations' },
            { id: randomUUID(), titleAr: 'القصر ١٧', locationAr: 'طوخ - الطريق السريع', price: 1100000, type: 'Commercial', status: 'available' },
            { id: randomUUID(), titleAr: 'القصر ١٨ - فينيسيا طوخ', locationAr: 'طوخ - الإستاد', price: 1600000, type: 'Residential', status: 'finishing' },
            { id: randomUUID(), titleAr: 'بيت الخير ١٩', locationAr: 'طوخ - حي الزهور', price: 950000, type: 'Residential', status: 'available' },
            { id: randomUUID(), titleAr: 'القصر ٢٠', locationAr: 'طوخ - منطقة المدارس', price: 1300000, type: 'Residential', status: 'available' },
            { id: randomUUID(), titleAr: 'برج الأمل - طوخ', locationAr: 'طوخ - المحطة', price: 1800000, type: 'Mixed-Use', status: 'available' },
            { id: randomUUID(), titleAr: 'القصر ٢٢', locationAr: 'طوخ - غرب المدينة', price: 1250000, type: 'Residential', status: 'foundations' },
            { id: randomUUID(), titleAr: 'القصر ٢٣', locationAr: 'طوخ - شارع بورسعيد', price: 1400000, type: 'Residential', status: 'available' },
            { id: randomUUID(), titleAr: 'فيلا ٢٤ - الخصوصية', locationAr: 'طوخ - ضواحي المدينة', price: 2500000, type: 'Villa', status: 'available' },
            { id: randomUUID(), titleAr: 'القصر ٢٥', locationAr: 'طوخ - المعلمين', price: 1150000, type: 'Residential', status: 'excavation' },
            { id: randomUUID(), titleAr: 'مجمع الخير الطبي', locationAr: 'طوخ - المركز الطبي', price: 3500000, type: 'Medical', status: 'available' },
            { id: randomUUID(), titleAr: 'القصر ٢٧', locationAr: 'طوخ - الحي الشرقي', price: 1350000, type: 'Residential', status: 'available' },
            { id: randomUUID(), titleAr: 'القصر ٢٨', locationAr: 'طوخ - حي السلام', price: 1050000, type: 'Residential', status: 'finishing' },
            { id: randomUUID(), titleAr: 'جوهرة طوخ (القصر ٢٩)', locationAr: 'طوخ - شارع النادي', price: 2100000, type: 'Luxury', status: 'available' }
        ];

        console.log(`📡 Seeding ${toukhProjects.length} projects to Supabase...`);

        for (const project of toukhProjects) {
            await db.createProperty({
                ownerId: brandProfile.id,
                title: project.titleAr, // For internal ID
                titleAr: project.titleAr,
                location: project.locationAr,
                locationAr: project.locationAr,
                price: project.price,
                type: project.type,
                status: project.status, // matches state (available|sold|excavation|etc)
                descriptionAr: 'من أرقى مشروعات شركة بيت الخير للتطوير العقاري في مدينة طوخ. متاح حالياً للحجز بتسهيلات سداد تصل إلى ٣ سنوات.',
                features: { 
                    elevator: true, 
                    security: true, 
                    parking: true,
                    region: 'Toukh'
                }
            });
        }

        console.log('✅ TOUKH MANIFESTATION COMPLETE.');

    } catch (error) {
        console.error('❌ SEEDING CRITICAL FAILURE:', error);
    }
}

seedToukhExpansion();
