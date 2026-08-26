const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Dr. Shimaa's La Playa Chalet...");

  const owner = await prisma.propertyOwner.create({
    data: {
      companyName: "Dr. Shimaa Rentals",
      user: {
        create: {
          email: "shimaa.laplaya@example.com",
          name: "Dr. Shimaa",
          emailVerified: true,
        }
      }
    }
  });

  // 2. Create the Property with the CRITICAL database instruction tag
  const property = await prisma.property.create({
    data: {
      ownerId: owner.id,
      id: "la-playa-shimaa-id", // Hardcoded to match our ChatbotWidget for testing
      title: "Premium Kitesurfing Chalet at La Playa",
      description: "Beautiful chalet in La Playa Village, Ras Sudr. Perfect for kitesurfing, wind sports, and winter getaways.",
      price: 1500, // Or whatever the daily EGP/USD rate is
      location: "La Playa Village, Ras Sudr, South Sinai",
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1598506161482-96582531a613", 
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
      ],
      features: {
        category: "LA_PLAYA_RENTAL", // <--- THE CRITICAL ISOLATION TAG
        bedrooms: 3,
        bathrooms: 2,
        amenities: ["Private Beach", "Kite Center Proximity", "Kitchen"]
      }
    }
  });

  console.log("✅ Successfully seeded La Playa Chalet!");
  console.log("Property ID:", property.id);
  console.log("Category Tag:", property.features.category);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
