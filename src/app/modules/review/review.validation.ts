import { z } from "zod"

const reviewZodSchema = z.object({
  body: z.object({
    cropId: z.string().uuid(),
    userId: z.string().uuid(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(10, "Comment must be at least 10 characters"),
    isAnonymous: z.boolean(),
  }),
})

export const ReviewValidation = {
  reviewZodSchema,
}
