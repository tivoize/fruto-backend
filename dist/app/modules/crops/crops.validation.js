"use strict";
// crops.validate.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropsValidation = void 0;
const zod_1 = require("zod");
const crops_constant_1 = require("./crops.constant");
const createCropsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        location: zod_1.z.string(),
        agriculture_type: zod_1.z.enum([...crops_constant_1.agricultureTypes]),
        classification: zod_1.z.enum([...crops_constant_1.cropCategories]),
        quantity_available: zod_1.z.number().int().positive(),
        quantity_unit: zod_1.z.enum([...crops_constant_1.quantityUnits]),
        packaging: zod_1.z.string(),
        price_per_unit: zod_1.z.number().positive(),
        harvest_date: zod_1.z.string().optional(), // ISO date format
        images: zod_1.z.array(zod_1.z.string()).optional(),
        newImages: zod_1.z.array(zod_1.z.string()).optional(),
        grown_in: zod_1.z.enum([...crops_constant_1.growingEnvironments]).optional(),
        farmer_id: zod_1.z.string().optional(), // usually populated from auth context
    }),
});
const updateCropsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        agriculture_type: zod_1.z.enum([...crops_constant_1.agricultureTypes]).optional(),
        classification: zod_1.z.enum([...crops_constant_1.cropCategories]).optional(),
        quantity_available: zod_1.z.number().int().positive().optional(),
        quantity_unit: zod_1.z.enum([...crops_constant_1.quantityUnits]).optional(),
        packaging: zod_1.z.string().optional(),
        price_per_unit: zod_1.z.number().positive().optional(),
        harvest_date: zod_1.z.string().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        newImages: zod_1.z.array(zod_1.z.string()).optional(),
        grown_in: zod_1.z.enum([...crops_constant_1.growingEnvironments]).optional(),
        farmer_id: zod_1.z.string().optional(),
    }),
});
exports.CropsValidation = {
    createCropsZodSchema,
    updateCropsZodSchema,
};
