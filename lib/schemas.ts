import { z } from "zod";

export const checkoutSchema = z.object({
  buyerName: z.string().min(2, "Name must be at least 2 characters"),
  buyerEmail: z.string().email("Please enter a valid email"),
  receiverName: z.string().min(2, "Receiver name is required"),
  customMessage: z.string().max(500, "Message too long (max 500 chars)").optional(),
  promoCode: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const redeemSchema = z.object({
  accessCode: z.string().length(6, "Access code must be 6 characters"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});
