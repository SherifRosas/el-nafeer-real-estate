import * as z from "zod";

export const customerInfoSchema = z.object({
  customerName: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  customerPhone: z.string().regex(/^(\+20|0020|0)?\s*1[0-25][\s\d-]{8,12}$/, { message: "Must be a valid Egyptian phone number." }),
});

export const deliverySchema = z.object({
  deliveryType: z.enum(["PICKUP", "SHIPPING"]),
  shippingAddress: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.deliveryType === "SHIPPING") {
    if (!data.shippingAddress || data.shippingAddress.length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Shipping address or location link is required.",
        path: ["shippingAddress"],
      });
    }
  }
});
