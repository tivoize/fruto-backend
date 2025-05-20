"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const bookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        crop_id: zod_1.z.string().length(24, "Invalid crop ID"), // Assuming MongoDB ObjectId
        farmer_id: zod_1.z.string().length(24, "Invalid farmer ID"),
        buyer_id: zod_1.z.string().length(24, "Invalid buyer ID"),
        delivery_address: zod_1.z.string().min(5, "Delivery address must be at least 5 characters"),
        delivery_date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid delivery date format" }),
        price_per_unit: zod_1.z.number().positive("Price per unit must be a positive number"),
        quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
        notes: zod_1.z.string().optional(),
        is_counter_offer: zod_1.z.boolean(),
        // Optional status/payment override (optional for admin or update cases)
        status: zod_1.z.enum(['pending', 'confirmed', 'cancelled']).optional(),
        payment_status: zod_1.z.enum(['not_paid', 'paid', 'cancelled']).optional(),
    })
});
exports.BookingValidation = {
    bookingZodSchema,
};
