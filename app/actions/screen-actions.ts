"use server"

import { prisma } from "@/lib/db"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function addScreenAction(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const basePriceStr = formData.get("basePrice") as string
    const discountPriceStr = formData.get("discountPrice") as string
    const quantityStr = formData.get("quantity") as string
    const imageFile = formData.get("image") as File

    if (!name || !basePriceStr || !discountPriceStr || !imageFile) {
      return { error: "Missing required fields." }
    }

    const basePrice = parseFloat(basePriceStr)
    const discountPrice = parseFloat(discountPriceStr)
    const quantity = quantityStr ? parseInt(quantityStr, 10) : 1

    if (isNaN(basePrice) || basePrice <= 0 || isNaN(discountPrice) || discountPrice <= 0) {
      return { error: "Prices must be positive numbers." }
    }
    if (isNaN(quantity) || quantity < 0) {
      return { error: "Quantity must be a valid number." }
    }

    // Upload image to Supabase
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `screen_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    
    const arrayBuffer = await imageFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('screen-images')
      .upload(fileName, buffer, {
        contentType: imageFile.type,
        upsert: false
      })

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return { error: "Failed to upload image to Supabase." }
    }

    // Get public URL
    const { data: publicUrlData } = supabase
      .storage
      .from('screen-images')
      .getPublicUrl(fileName)

    const imageUrl = publicUrlData.publicUrl

    // Save to Prisma
    const newScreen = await prisma.screen.create({
      data: {
        name,
        description: description || null,
        basePrice,
        discountPrice,
        quantity,
        imageUrl,
      }
    })

    revalidatePath("/admin/screen-uploader")
    revalidatePath("/hadayek-al-ahram-screen-store-and-repair")

    return { success: true, message: "Screen added successfully!", screenId: newScreen.id }

  } catch (error: any) {
    console.error("Action error:", error)
    return { error: "An unexpected error occurred." }
  }
}

export async function submitScreenOrderAction(formData: FormData) {
  try {
    const screenId = formData.get("screenId") as string
    const customerName = formData.get("customerName") as string
    const customerPhone = formData.get("customerPhone") as string
    const deliveryType = formData.get("deliveryType") as string
    const shippingAddress = formData.get("shippingAddress") as string
    const receiptImage = formData.get("receiptImage") as File

    if (!screenId || !customerName || !customerPhone || !deliveryType || !receiptImage) {
      return { error: "Missing required fields." }
    }

    // Upload receipt to Supabase
    const fileExt = receiptImage.name.split('.').pop()
    const fileName = `receipt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    
    const arrayBuffer = await receiptImage.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('receipt-uploads')
      .upload(fileName, buffer, {
        contentType: receiptImage.type,
        upsert: false
      })

    if (uploadError) {
      console.error("Receipt upload error:", uploadError)
      return { error: "Failed to upload receipt to Supabase." }
    }

    // Get public URL
    const { data: publicUrlData } = supabase
      .storage
      .from('receipt-uploads')
      .getPublicUrl(fileName)

    const receiptImageUrl = publicUrlData.publicUrl

    // Save Order to Prisma
    await prisma.order.create({
      data: {
        screenId,
        customerName,
        customerPhone,
        deliveryType,
        shippingAddress: shippingAddress || null,
        receiptImageUrl,
        status: "PENDING_REVIEW"
      }
    })

    return { success: true }
  } catch (error: any) {
    console.error("Order submission error:", error)
    return { error: "Failed to submit order." }
  }
}

export async function deleteScreenAction(id: string) {
  try {
    const screen = await prisma.screen.findUnique({ where: { id } })
    if (!screen) return { error: "Screen not found." }

    // Try to delete image from Supabase
    if (screen.imageUrl) {
      const fileName = screen.imageUrl.split('/').pop()
      if (fileName) {
        await supabase.storage.from('screen-images').remove([fileName])
      }
    }

    // Find and clean up any associated orders to prevent Foreign Key errors
    const orders = await prisma.order.findMany({ where: { screenId: id } })
    if (orders.length > 0) {
      const receiptFileNames = orders
        .map(o => o.receiptImageUrl.split('/').pop())
        .filter(Boolean) as string[]
      
      if (receiptFileNames.length > 0) {
        await supabase.storage.from('receipt-uploads').remove(receiptFileNames)
      }
      // Delete the order records
      await prisma.order.deleteMany({ where: { screenId: id } })
    }

    await prisma.screen.delete({ where: { id } })
    revalidatePath("/admin/screen-uploader")
    revalidatePath("/hadayek-al-ahram-screen-store-and-repair")
    return { success: true }
  } catch (error: any) {
    console.error("Delete error:", error)
    return { error: `Failed to delete screen: ${error?.message || 'Unknown error'}` }
  }
}

export async function updateScreenAction(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const basePriceStr = formData.get("basePrice") as string
    const discountPriceStr = formData.get("discountPrice") as string
    const quantityStr = formData.get("quantity") as string
    const inStockStr = formData.get("inStock") as string

    if (!name || !basePriceStr || !discountPriceStr) {
      return { error: "Name and prices are required." }
    }

    const basePrice = parseFloat(basePriceStr)
    const discountPrice = parseFloat(discountPriceStr)
    const quantity = quantityStr ? parseInt(quantityStr, 10) : 1
    const inStock = inStockStr === "true"

    if (isNaN(basePrice) || basePrice <= 0 || isNaN(discountPrice) || discountPrice <= 0) {
      return { error: "Prices must be positive numbers." }
    }
    if (isNaN(quantity) || quantity < 0) {
      return { error: "Quantity must be a valid number." }
    }

    await prisma.screen.update({
      where: { id },
      data: {
        name,
        description: description || null,
        basePrice,
        discountPrice,
        quantity,
        inStock
      }
    })

    revalidatePath("/admin/screen-uploader")
    revalidatePath("/hadayek-al-ahram-screen-store-and-repair")
    return { success: true }
  } catch (error: any) {
    console.error("Update error:", error)
    return { error: "Failed to update screen." }
  }
}
