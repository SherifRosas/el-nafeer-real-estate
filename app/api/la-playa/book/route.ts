import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// We instantiate Prisma here, but if your project exports a global prisma instance 
// from '@/lib/db', you can import and use that instead.
const prisma = new PrismaClient();

// 3. Input Validation (Crucial)
const bookingSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(8, "Valid phone number is required"),
  dates: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Server-side validation using Zod
    const validatedData = bookingSchema.parse(body);

    const notes = validatedData.dates 
      ? `La Playa Booking Request. Dates: ${validatedData.dates}` 
      : 'La Playa Booking Request.';

    // Insert the Lead into the database linked to the specific Property
    const newLead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        propertyId: validatedData.propertyId,
        notes: notes,
        status: "new"
      }
    });

    return NextResponse.json({ success: true, lead: newLead }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return 400 Bad Request if validation fails
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    
    console.error("Booking API Error:", error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
