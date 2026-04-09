import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'
import { randomUUID } from 'crypto'

/**
 * 🛰️ EMERGENCY SEEDING PROTOCOL: BEIT AL-KHAIR (v519.3)
 * Use to manifest the database nodes when script execution is blocked.
 */
export async function GET() {
    console.log('🚀 EMERGENCY_SEED: INITIALIZING BEIT AL-KHAIR...')
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

        // 2. Manifest Brand Profile
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
                { title: 'Al-Qasr 18', location: 'Toukh', status: '20% Complete' }
            ]
        }

        let brandProfile = await db.getBrandProfileByUserId(user.id)
        if (!brandProfile) {
            brandProfile = await db.createBrandProfile(profileMetadata)
        } else {
            brandProfile = await db.updateBrandProfile(brandProfile.id, profileMetadata)
        }

        // 3. Seed Campaign
        const existingCampaigns = await db.getAllCampaigns()
        const hasCampaign = existingCampaigns.some((c: any) => c.name.includes('Beit Al-Khair'))

        if (!hasCampaign) {
            await db.createCampaign({
                brandProfileId: brandProfile.id,
                name: 'Beit Al-Khair - New Cairo Lotus Domination (Phase 1)',
                description: 'Targeted residential sales for Al-Qasr series buildings.',
                type: 'multi_channel',
                platforms: ['facebook', 'whatsapp', 'google_maps'],
                status: 'active',
                scheduleType: 'once',
                startDate: new Date().toISOString(),
                config: {
                    referralCode: 'beit-alkhair-elite'
                }
            })
        }

        return NextResponse.json({ 
            success: true, 
            message: 'BEIT_AL_KHAIR_NODES_MANIFESTED',
            brandId: brandProfile.id 
        })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
