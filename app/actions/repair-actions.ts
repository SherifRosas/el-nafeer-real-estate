"use server"

import { prisma } from "@/lib/db"

export async function submitRepairLeadAction(formData: FormData) {
  try {
    const phone = formData.get("phone") as string
    const brand = formData.get("brand") as string
    const description = formData.get("description") as string

    if (!phone || !brand || !description) {
      return { error: "Missing required fields." }
    }

    // Server-side validation of Egyptian phone number
    if (!/^01[0125][0-9]{8}$/.test(phone)) {
      return { error: "Invalid Egyptian phone number." }
    }

    await prisma.repairLead.create({
      data: {
        phone,
        brand,
        description,
        status: "new",
      }
    })

    return { success: true }
  } catch (error: any) {
    console.error("Failed to submit repair lead:", error)
    return { error: "An unexpected error occurred while submitting." }
  }
}
