// hadayek-al-ahram-screen-store-and-repair/prisma/seed.ts
import { PrismaClient, ScreenCondition, ScreenStatus, RepairStatus, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding El-Ekhwa Screens & Repair database...');

  // 1. Clear Existing Client-Specific Data
  await prisma.repairJob.deleteMany();
  await prisma.screen.deleteMany();
  await prisma.customer.deleteMany();

  // 2. Seed Sample Customers (Hadayek Al-Ahram Residents)
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Sherif Rosas',
      phone: '01010015819',
      address: 'حدائق الأهرام، البوابة الأولى، منطقة أ، شارع الثروة المعدنية',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Ahmed Bayoumi',
      phone: '01155050767',
      address: 'حدائق الأهرام، البوابة الثانية، منطقة ج، بجوار خير زمان',
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      name: 'Mohamed Anis',
      phone: '01270237458',
      address: 'حدائق الأهرام، البوابة الرابعة، منطقة هـ، عمارة 144',
    },
  });

  console.log('Customers seeded successfully.');

  // 3. Seed Screen Warehouse Inventory
  const screens = await prisma.screen.createMany({
    data: [
      {
        brand: 'LG',
        model: '55UQ75006LF',
        size: 55,
        type: 'LED Smart 4K UHD ThinQ AI',
        condition: ScreenCondition.NEW,
        price: 18500.00,
        status: ScreenStatus.AVAILABLE,
        warehouseLoc: 'Row A, Shelf 1',
        notes: 'Factory sealed, 2 years agent warranty.',
      },
      {
        brand: 'Samsung',
        model: 'QA65Q60BAUXEG',
        size: 65,
        type: 'QLED Smart 4K UHD',
        condition: ScreenCondition.NEW,
        price: 29900.00,
        status: ScreenStatus.AVAILABLE,
        warehouseLoc: 'Row A, Shelf 3',
        notes: 'Factory sealed, high demand item.',
      },
      {
        brand: 'Sony',
        model: 'KD-55X75K',
        size: 55,
        type: 'LED Google TV 4K',
        condition: ScreenCondition.REFURBISHED,
        price: 13500.00,
        status: ScreenStatus.AVAILABLE,
        warehouseLoc: 'Row B, Shelf 1',
        notes: 'Refurbished panel replacement. Looks and functions as brand new. 6-month shop warranty.',
      },
      {
        brand: 'Toshiba',
        model: '43V35EE',
        size: 43,
        type: 'LED Smart Android Full HD',
        condition: ScreenCondition.NEW,
        price: 9500.00,
        status: ScreenStatus.RESERVED,
        warehouseLoc: 'Row C, Shelf 1',
        notes: 'Reserved for customer Ahmed Bayoumi.',
      },
      {
        brand: 'Samsung',
        model: 'UA32T5300AUXEG',
        size: 32,
        type: 'LED Smart HD TV',
        condition: ScreenCondition.REFURBISHED,
        price: 4500.00,
        status: ScreenStatus.AVAILABLE,
        warehouseLoc: 'Row C, Shelf 4',
        notes: 'Refurbished backlight replacement. Sourced from customer trade-in. 6-month warranty.',
      },
      {
        brand: 'LG',
        model: '43UP77006LB',
        size: 43,
        type: 'LED Smart 4K (For Parts)',
        condition: ScreenCondition.FOR_PARTS,
        price: 2000.00,
        status: ScreenStatus.SOLD,
        warehouseLoc: 'Row D, Shelf 2',
        notes: 'Cracked panel. Mainboard and power supply board salvaged for repairs.',
      },
    ],
  });

  console.log('Screen inventory seeded successfully.');

  // 4. Seed Repair Jobs
  await prisma.repairJob.create({
    data: {
      ticketNumber: 'EKW-260801',
      customerId: customer1.id,
      deviceModel: 'Samsung QA55Q60A (55" QLED)',
      issue: 'الشاشة سوداء الصوت يعمل لكن الإضاءة الخلفية لا تعمل (صوت بدون صورة)',
      status: RepairStatus.REPAIRED,
      estimatedCost: 2000.00,
      partsUsed: 'Samsung 55 QLED Backlight Strip Kit (V6)',
      partsCost: 500.00,
      laborCost: 1000.00,
      totalCost: 1500.00,
      paymentStatus: PaymentStatus.PAID,
      paymentMethod: 'InstaPay',
      qrCodeUrl: '/images/qrcodes/EKW-260801.png',
    },
  });

  await prisma.repairJob.create({
    data: {
      ticketNumber: 'EKW-260802',
      customerId: customer2.id,
      deviceModel: 'LG 43UP7500 (43" Smart LED)',
      issue: 'تكسير في مدخل الـ HDMI وتلف في منفذ الطاقة الخارجي الكارت الرئيسي يحتاج صيانة',
      status: RepairStatus.INSPECTING,
      estimatedCost: 1200.00,
      partsUsed: null,
      partsCost: 0.00,
      laborCost: 0.00,
      totalCost: 0.00,
      paymentStatus: PaymentStatus.UNPAID,
      paymentMethod: null,
      qrCodeUrl: '/images/qrcodes/EKW-260802.png',
    },
  });

  await prisma.repairJob.create({
    data: {
      ticketNumber: 'EKW-260803',
      customerId: customer3.id,
      deviceModel: 'Tornado 32ED4500 (32" LED)',
      issue: 'الشاشة لا تقلع ولا تضئ لمبة البيان الحمراء (تلف في دايرة الباور بالكامل)',
      status: RepairStatus.RECEIVED,
      estimatedCost: 800.00,
      partsUsed: null,
      partsCost: 0.00,
      laborCost: 0.00,
      totalCost: 0.00,
      paymentStatus: PaymentStatus.UNPAID,
      paymentMethod: null,
      qrCodeUrl: '/images/qrcodes/EKW-260803.png',
    },
  });

  console.log('Repair jobs seeded successfully.');
  console.log('El-Ekhwa database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
