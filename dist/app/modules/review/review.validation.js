"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const reviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cropId: zod_1.z.string().uuid(),
        userId: zod_1.z.string().uuid(),
        rating: zod_1.z.number().min(1).max(5),
        comment: zod_1.z.string().min(10, "Comment must be at least 10 characters"),
        isAnonymous: zod_1.z.boolean(),
    }),
});
exports.ReviewValidation = {
    reviewZodSchema,
};
