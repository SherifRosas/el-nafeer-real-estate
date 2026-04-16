import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import { randomUUID } from 'crypto'

/**
 * 🛰️ EMERGENCY SEEDING PROTOCOL: BEIT AL-KHAIR (v520.0)
 * MANIFESTING THE TOUKH 15-BUILDING PILOT
 */
export async function GET() {
    console.log('🚀 EMERGENCY_SEED: INITIALIZING TOUKH DOMINATION PROCOTOL...')
    const clientEmail = 'beitalkhair.elite@gmail.com'

    try {
        // 1. Anchor User
        let user = await db.getUserByEmail(clientEmail)
        if (!user) {
            user = await db.createUser({
                id: randomUUID(),
                email: clientEmail,
                name: 'Beit Al-Khair Real Estate Development',
                phoneNumber: '01033332112',
            })
        }

        // 2. Manifest Brand Profile & 15-Building Portfolio
        const profileMetadata = {
            userId: user.id,
            companyName: 'Beit Al-Khair Real Estate Development',
            industry: 'Real Estate Development & Construction',
            serviceArea: 'New Cairo, Fifth Settlement, Toukh, Qalyubia',
            location: '115 New Lotus - Fifth Settlement | Swimming Pool St - Toukh',
            contactDetails: {
                phone: '01033332112',
                whatsapp: '201033332112',
                facebook: 'https://www.facebook.com/profile.php?id=100076259227704'
            },
            portfolio: [
                { title: 'Al-Qasr 21', location: 'New Lotus', status: '60% Complete' },
                { title: 'Al-Qasr 19', location: 'New Lotus', status: '80% Complete' },
                { title: 'Al-Qasr 15', location: 'Toukh Central', status: '90% Complete' },
                { title: 'Al-Qasr 18', location: 'Toukh - Stadium St', status: 'Finishing' },
                { title: 'Al-Qasr 16', location: 'Toukh - City Center', status: 'Foundations' },
                { title: 'Al-Qasr 17', location: 'Toukh - Highway', status: 'Under Construction' },
                { title: 'Al-Qasr 20', location: 'Toukh - School Zone', status: 'Complete' },
                { title: 'Al-Qasr 22', location: 'Toukh - West', status: 'Excavation' },
                { title: 'Al-Qasr 23', location: 'Toukh - Port Said St', status: 'Complete' },
                { title: 'Villa 24', location: 'Toukh Suburbs', status: 'Design' },
                { title: 'Al-Qasr 25', location: 'Toukh - Teachers Club', status: 'Excavation' },
                { title: 'Al-Khair Medical', location: 'Toukh Medical Center', status: 'Available' },
                { title: 'Al-Qasr 27', location: 'Toukh - East District', status: 'Available' },
                { title: 'Al-Qasr 28', location: 'Toukh - Salam District', status: 'Finishing' },
                { title: 'Al-Qasr 29', location: 'Toukh - Club St', status: 'Luxury Pre-launch' }
            ]
        }

        let brandProfile = await db.getBrandProfileByUserId(user.id)
        if (!brandProfile) {
            brandProfile = await db.createBrandProfile(profileMetadata)
        } else {
            brandProfile = await db.updateBrandProfile(brandProfile.id, profileMetadata)
        }

        // 3. Seed Properties into Public Table (15 Buildings)
        console.log(`📡 Seeding ${profileMetadata.portfolio.length} property nodes...`)
        for (const project of profileMetadata.portfolio) {
            // Check if property exists to avoid duplicates (simplified)
            const existing = await db.getAllProperties();
            const exists = existing.some(p => p.titleAr === project.title && p.ownerId === brandProfile.id);
            
            if (!exists) {
                await db.createProperty({
                    ownerId: brandProfile.id,
                    title: project.title,
                    titleAr: project.title,
                    location: project.location,
                    locationAr: project.location,
                    price: 1000000 + Math.random() * 500000,
                    type: project.title.includes('Villa') ? 'Villa' : project.title.includes('Medical') ? 'Commercial' : 'Residential',
                    status: 'available',
                    descriptionAr: `مشروع ${project.title} في ${project.location}. من أرقى مشروعات بيت الخير في طوخ.`,
                    features: { status: project.status, region: 'Toukh' }
                });
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: 'TOUKH_15_BUILDING_MANIFEST_COMPLETE',
            brandId: brandProfile.id 
        })
    } catch (error: any) {
        console.error('SEEDING_ERROR:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
