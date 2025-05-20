import { z } from 'zod'

const bookingZodSchema = z.object({
  body: z.object({
    crop_id: z.string().length(24, "Invalid crop ID"), // Assuming MongoDB ObjectId
    farmer_id: z.string().length(24, "Invalid farmer ID"),
    buyer_id: z.string().length(24, "Invalid buyer ID"),
    delivery_address: z.string().min(5, "Delivery address must be at least 5 characters"),
    delivery_date: z.string().refine(
      (date) => !isNaN(Date.parse(date)),
      { message: "Invalid delivery date format" }
    ),
    price_per_unit: z.number().positive("Price per unit must be a positive number"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    notes: z.string().optional(),
    is_counter_offer: z.boolean(),

    // Optional status/payment override (optional for admin or update cases)
    status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
    payment_status: z.enum(['not_paid', 'paid', 'cancelled']).optional(),
  })
})

export const BookingValidation = {
  bookingZodSchema,
}
