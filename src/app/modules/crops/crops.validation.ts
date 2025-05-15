// crops.validate.ts

import { z } from 'zod'
import {
  agricultureTypes,
  cropCategories,
  quantityUnits,
  growingEnvironments,
} from './crops.constant'

const createCropsZodSchema = z.object({
  body: z.object({
    name: z.string(),
    location: z.string(),
    agriculture_type: z.enum([...agricultureTypes] as [string, ...string[]]),
    classification: z.enum([...cropCategories] as [string, ...string[]]),
    quantity_available: z.number().int().positive(),
    quantity_unit: z.enum([...quantityUnits] as [string, ...string[]]),
    packaging: z.string(),
    price_per_unit: z.number().positive(),
    harvest_date: z.string().optional(), // ISO date format
    images: z.array(z.string()).optional(),
    newImages: z.array(z.string()).optional(),
    grown_in: z.enum([...growingEnvironments] as [string, ...string[]]).optional(),
    farmer_id: z.string().optional(), // usually populated from auth context
  }),
})

const updateCropsZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    location: z.string().optional(),
    agriculture_type: z.enum([...agricultureTypes] as [string, ...string[]]).optional(),
    classification: z.enum([...cropCategories] as [string, ...string[]]).optional(),
    quantity_available: z.number().int().positive().optional(),
    quantity_unit: z.enum([...quantityUnits] as [string, ...string[]]).optional(),
    packaging: z.string().optional(),
    price_per_unit: z.number().positive().optional(),
    harvest_date: z.string().optional(),
    images: z.array(z.string()).optional(),
    newImages: z.array(z.string()).optional(),
    grown_in: z.enum([...growingEnvironments] as [string, ...string[]]).optional(),
    farmer_id: z.string().optional(),
  }),
})

export const CropsValidation = {
  createCropsZodSchema,
  updateCropsZodSchema,
}
