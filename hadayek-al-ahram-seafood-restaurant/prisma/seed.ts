// prisma/seed.ts
import { PrismaClient, TableStatus, StaffRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding El-Gamel Seafood database...');

  // 1. Clear Existing Data
  await prisma.shift.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservationItem.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.table.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  // 2. Seed Categories
  const grilledFried = await prisma.category.create({
    data: {
      nameAr: 'أسماك مشوية ومقلية',
      nameEn: 'Grilled & Fried Fish',
      slug: 'grilled-and-fried-fish',
      image: '/images/categories/grilled-fried.jpg',
    },
  });

  const soups = await prisma.category.create({
    data: {
      nameAr: 'شوربة المأكولات البحرية',
      nameEn: 'Seafood Soups',
      slug: 'seafood-soups',
      image: '/images/categories/soups.jpg',
    },
  });

  const tagines = await prisma.category.create({
    data: {
      nameAr: 'طواجن سي فود الساخنة',
      nameEn: 'Hot Seafood Tagines',
      slug: 'seafood-tagines',
      image: '/images/categories/tagines.jpg',
    },
  });

  const sides = await prisma.category.create({
    data: {
      nameAr: 'أطباق جانبية وسلطات',
      nameEn: 'Side Dishes & Salads',
      slug: 'sides-and-salads',
      image: '/images/categories/sides.jpg',
    },
  });

  // 3. Seed Menu Items
  // Grilled & Fried Fish Category (incorporates the ~450g raw weight single fish meal)
  await prisma.menuItem.createMany({
    data: [
      {
        nameAr: 'وجبة سمك بلطي (مشوي/مقلي)',
        nameEn: 'Tilapia Meal (Grilled/Fried)',
        descriptionAr: 'سمكة بلطي طازجة (حوالي 450 جرام وزن قائم) تقدم مع أرز صيادية وسلطة خضراء وطحينة وعيش سياحي',
        descriptionEn: 'Fresh Tilapia fish (~450g raw weight) served with Sayadeya rice, green salad, tahini, and bread',
        price: 140.00,
        rawWeightGrams: 450,
        categoryId: grilledFried.id,
        isAvailable: true,
      },
      {
        nameAr: 'سمك بوري سنجاري بالخلطة',
        nameEn: 'Singary Mullet Fish',
        descriptionAr: 'سمكة بوري طازجة (حوالي 500 جرام) مشوية بالفرن مع الخلطة الإسكندرانية المميزة والخضروات',
        descriptionEn: 'Fresh Mullet fish (~500g) oven-baked with traditional Alexandrian vegetable mixture',
        price: 185.00,
        rawWeightGrams: 500,
        categoryId: grilledFried.id,
        isAvailable: true,
      },
      {
        nameAr: 'وجبة جمبري مشوي جامبو',
        nameEn: 'Jumbo Grilled Shrimp Meal',
        descriptionAr: 'ربع كيلو جمبري جامبو متبل ومشوي على الجريل يقدم مع أرز صيادية وسلطات وبطاطس فارم',
        descriptionEn: '250g jumbo grilled shrimp served with Sayadeya rice, salads, and french fries',
        price: 320.00,
        rawWeightGrams: 250,
        categoryId: grilledFried.id,
        isAvailable: true,
      },
    ],
  });

  // Seafood Soups Category
  await prisma.menuItem.createMany({
    data: [
      {
        nameAr: 'شوربة الجمل الفاخرة (بالكريمة)',
        nameEn: 'El-Gamel Special Creamy Soup',
        descriptionAr: 'شوربة غنية بالكريمة والزبدة تحتوي على قطع جمبري وكابوريا وفيليه وبلح البحر وجندوفلي',
        descriptionEn: 'Rich creamy seafood soup packed with shrimp, crabs, fish fillet, mussels, and clams',
        price: 95.00,
        rawWeightGrams: 300,
        categoryId: soups.id,
        isAvailable: true,
      },
      {
        nameAr: 'شوربة سي فود مخلي (فسفور)',
        nameEn: 'Boneless Seafood Soup',
        descriptionAr: 'شوربة حمراء/بيضاء مخلية تماماً تحتوي على قطع جمبري وفيليه وسبيط طازج مع الكرفس',
        descriptionEn: 'Clear red or white boneless seafood soup containing shrimp, fish fillet, and squid',
        price: 85.00,
        rawWeightGrams: 250,
        categoryId: soups.id,
        isAvailable: true,
      },
    ],
  });

  // Hot Seafood Tagines Category (Highest profit margin items)
  await prisma.menuItem.createMany({
    data: [
      {
        nameAr: 'طاجن جمبري بالخلطة الحمراء والجبن',
        nameEn: 'Shrimp Tagine with Red Sauce & Cheese',
        descriptionAr: 'طاجن فخار ساخن يحتوي على جمبري مطبوخ بصوص الطماطم الطازجة والخلطة السرية مع طبقة موتزاريلا ذائبة',
        descriptionEn: 'Hot claypot shrimp cooked in spicy tomato sauce, secret herbs, topped with melted mozzarella',
        price: 195.00,
        rawWeightGrams: 200,
        categoryId: tagines.id,
        isAvailable: true,
      },
      {
        nameAr: 'طاجن سبيط وفيليه بالوايت صوص',
        nameEn: 'Calamari & Fillet White Sauce Tagine',
        descriptionAr: 'طاجن فخار يحتوي على قطع سبيط وسمك فيليه مطبوخة بصوص الكريمة الأبيض الغني والثوم والكزبرة',
        descriptionEn: 'Claypot tender calamari and fish fillet cooked in a rich garlic cream sauce',
        price: 175.00,
        rawWeightGrams: 250,
        categoryId: tagines.id,
        isAvailable: true,
      },
    ],
  });

  // Sides & Salads Category
  await prisma.menuItem.createMany({
    data: [
      {
        nameAr: 'أرز صيادية بالبصل المكرمل',
        nameEn: 'Sayadeya Rice',
        descriptionAr: 'أرز مصري مطبوخ بالطريقة التقليدية مع البصل المكرمل والبهارات والكمون',
        descriptionEn: 'Traditional Egyptian rice cooked with caramelized onions, cumin, and local herbs',
        price: 25.00,
        categoryId: sides.id,
        isAvailable: true,
      },
      {
        nameAr: 'سلطة خضراء بلدي',
        nameEn: 'Traditional Green Salad',
        descriptionAr: 'سلطة طازجة من الطماطم والخيار والجرجير والبقدونس مع دريسنج الليمون والخل والكمون',
        descriptionEn: 'Fresh salad made of tomatoes, cucumbers, arugula, and parsley with lemon-cumin dressing',
        price: 15.00,
        categoryId: sides.id,
        isAvailable: true,
      },
      {
        nameAr: 'سلطة طحينة الجمل السميكة',
        nameEn: 'El-Gamel Sesame Tahini Salad',
        descriptionAr: 'سلطة طحينة سميكة متبلة بالثوم المفروم والكمون والليمون والخل وزيت الزيتون البكر',
        descriptionEn: 'Creamy pure sesame paste seasoned with garlic, vinegar, cumin, and extra virgin olive oil',
        price: 15.00,
        categoryId: sides.id,
        isAvailable: true,
      },
    ],
  });

  // 4. Seed Physical Dining Tables (8 tables, total 24-32 seats)
  const tablesData = [
    { tableNumber: 1, capacity: 4 },
    { tableNumber: 2, capacity: 4 },
    { tableNumber: 3, capacity: 4 },
    { tableNumber: 4, capacity: 4 },
    { tableNumber: 5, capacity: 4 },
    { tableNumber: 6, capacity: 4 },
    { tableNumber: 7, capacity: 2 },
    { tableNumber: 8, capacity: 6 }, // VIP/Family table
  ];

  for (const t of tablesData) {
    await prisma.table.create({
      data: {
        tableNumber: t.tableNumber,
        capacity: t.capacity,
        status: TableStatus.AVAILABLE,
      },
    });
  }

  // 5. Seed Core Roster (AI scheduling support)
  const staffData = [
    { name: 'الشيف محمد الجمل', role: StaffRole.HEAD_CHEF, phone: '01012345678', hourlyRate: 85.00 },
    { name: 'أحمد سعيد', role: StaffRole.ASSISTANT_CHEF, phone: '01122334455', hourlyRate: 45.00 },
    { name: 'مصطفى علي', role: StaffRole.ASSISTANT_CHEF, phone: '01233445566', hourlyRate: 40.00 },
    { name: 'حازم شريف', role: StaffRole.CASHIER, phone: '01544556677', hourlyRate: 35.00 },
    { name: 'محمود حسن', role: StaffRole.WAITER, phone: '01099887766', hourlyRate: 30.00 },
    { name: 'سيد عبد الله', role: StaffRole.CLEANER, phone: '01177665544', hourlyRate: 25.00 },
  ];

  for (const s of staffData) {
    await prisma.staff.create({
      data: s,
    });
  }

  console.log('Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
