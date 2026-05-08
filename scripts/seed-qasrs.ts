import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function seedQasrs() {
  console.log('🚀 INITIALIZING SOVEREIGN REAL ESTATE INJECTION (PRISMA RLS-BYPASS)...');

  try {
    // 1. Get the Master User
    const clientEmail = 'beitalkhair.elite@gmail.com';
    let user = await prisma.user.findUnique({ where: { email: clientEmail } });
    
    if (!user) {
      console.log('User not found. Run onboard-beit-alkhair.ts first, or creating master user now...');
      user = await prisma.user.create({
          data: {
              email: clientEmail,
              name: 'Beit Al-Khair Real Estate Development',
              phoneNumber: '01033332112'
          }
      });
    }

    // 2. Get the Property Owner ID
    let owner = await prisma.propertyOwner.findUnique({ where: { userId: user.id } });
    if (!owner) {
        console.log('Property Owner not found. Checking brand profile instead to create owner...');
        let brand = await prisma.brandProfile.findUnique({ where: { userId: user.id } });
        
        if (!brand) {
            console.log('Brand Profile missing. Auto-creating Master Brand...');
            brand = await prisma.brandProfile.create({
                data: {
                    userId: user.id,
                    companyName: 'Beit Al-Khair Real Estate Development',
                    industry: 'Real Estate Development & Construction',
                    serviceArea: 'New Cairo, Fifth Settlement, Toukh, Qalyubia',
                    location: '115 New Lotus - Fifth Settlement | Swimming Pool St - Toukh'
                }
            });
        }
        
        // Ensure owner exists
        owner = await prisma.propertyOwner.create({
            data: {
                userId: user.id,
                companyName: brand.companyName,
                logoUrl: brand.logoUrl
            }
        });
    }

    const finalOwner = owner;

    // 3. Prevent Duplicates
    console.log('🧹 Purging old data...');
    const existingProperties = await prisma.property.findMany({ where: { ownerId: finalOwner.id } });

    const qasrsToInject = [
      {
        title: 'QASR 18',
        location: 'Taqseem El Zohour, Gas Street, Banha, Qalyubia',
        price: 4500000,
        status: 'available',
        images: ['/campaigns/beit-alkhair/qasr_toukh_cinematic.png'], // Force the cinematic fallback to be the primary image so it never looks broken
        features: {
            videoReel: 'https://www.facebook.com/reel/1668747534256719',
            mapsLink: 'https://www.google.fr/maps/search/%D8%A8%D9%86%D9%87%D8%A7+%D8%AA%D9%82%D8%B3%D9%8A%D9%85+%D8%A7%D9%84%D8%B2%D9%87%D9%88%D8%B1+-%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D8%BA%D8%A7%D8%B2',
            bedrooms: 4,
            bathrooms: 3,
            smartHome: true,
            titleAr: 'قصر ١٨',
            locationAr: 'بنها تقسيم الزهور - شارع الغاز'
        },
        description: 'Exclusive luxury residence in the heart of Banha. Features smart home integration and premium architectural design.'
      },
      {
        title: 'QASR 19',
        location: 'Taqseem El Zohour, Gas Street, Banha, Qalyubia',
        price: 4850000,
        status: 'available',
        images: ['/campaigns/beit-alkhair/qasr_toukh_cinematic.png'],
        features: {
            videoReel: 'https://www.facebook.com/reel/1668747534256719',
            mapsLink: 'https://www.google.fr/maps/search/%D8%A8%D9%86%D9%87%D8%A7+%D8%AA%D9%82%D8%B3%D9%8A%D9%85+%D8%A7%D9%84%D8%B2%D9%87%D9%88%D8%B1+-%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D8%BA%D8%A7%D8%B2',
            bedrooms: 5,
            bathrooms: 4,
            smartHome: true,
            titleAr: 'قصر ١٩',
            locationAr: 'بنها تقسيم الزهور - شارع الغاز'
        },
        description: 'Elite luxury property in Taqseem El Zohour with panoramic views and superior finishing.'
      },
      {
        title: 'QASR 21',
        location: 'Taqseem El Zohour, Gas Street, Banha, Qalyubia',
        price: 5200000,
        status: 'available',
        images: ['/campaigns/beit-alkhair/qasr_toukh_cinematic.png'],
        features: {
            videoReel: 'https://www.facebook.com/reel/1668747534256719',
            mapsLink: 'https://www.google.fr/maps/search/%D8%A8%D9%86%D9%87%D8%A7+%D8%AA%D9%82%D8%B3%D9%8A%D9%85+%D8%A7%D9%84%D8%B2%D9%87%D9%88%D8%B1+-%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D8%BA%D8%A7%D8%B2',
            bedrooms: 5,
            bathrooms: 4,
            penthouse: true,
            smartHome: true,
            titleAr: 'قصر ٢١',
            locationAr: 'بنها تقسيم الزهور - شارع الغاز'
        },
        description: 'The crown jewel of Taqseem El Zohour. A penthouse-level Qasr offering unmatched dominance and luxury.'
      }
    ];

    console.log('💉 Injecting Qasrs into Live Database...');
    
    for (const qasr of qasrsToInject) {
        // Prevent duplicate injection
        const isDuplicate = existingProperties.some((p: any) => p.title === qasr.title);
        if (isDuplicate) {
            console.log(`⚠️ ${qasr.title} already exists. Skipping.`);
            continue;
        }

        await prisma.property.create({
            data: {
                ownerId: finalOwner.id,
                ...qasr
            }
        });
        console.log(`✅ Injected: ${qasr.title}`);
    }

    console.log('👑 SOVEREIGN INJECTION COMPLETE.');

  } catch (error) {
    console.error('❌ INJECTION CRITICAL FAILURE:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedQasrs();
