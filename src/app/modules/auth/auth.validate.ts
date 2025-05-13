import { z } from 'zod'


export const createUserZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['farmer', 'buyer', 'logistics']),
    username: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip_code: z.string().optional(),
    country: z.string().optional(),

    // Farmer-specific
    farm_name: z.string().optional(),
    farm_size: z.string().optional(),
    produce_types: z.array(z.string()).optional(),

    // Buyer-specific
    company_name: z.string().optional(),
    business_type: z.string().optional(),
    tax_id: z.string().optional(),

    // Logistics-specific
    fleet_size: z.string().optional(),
    vehicle_types: z.array(z.string()).optional(),
    service_areas: z.array(z.string()).optional(),
  }),
})

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})

export const AuthValidation = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
}
