"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
exports.createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        role: zod_1.z.enum(['farmer', 'buyer', 'logistics']),
        username: zod_1.z.string(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        state: zod_1.z.string().optional(),
        zip_code: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        // Farmer-specific
        farm_name: zod_1.z.string().optional(),
        farm_size: zod_1.z.string().optional(),
        produce_types: zod_1.z.array(zod_1.z.string()).optional(),
        // Buyer-specific
        company_name: zod_1.z.string().optional(),
        business_type: zod_1.z.string().optional(),
        tax_id: zod_1.z.string().optional(),
        // Logistics-specific
        fleet_size: zod_1.z.string().optional(),
        vehicle_types: zod_1.z.array(zod_1.z.string()).optional(),
        service_areas: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AuthValidation = {
    createUserZodSchema: exports.createUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
