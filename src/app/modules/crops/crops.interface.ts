import mongoose, {  Document } from "mongoose"

export type AgricultureType = "Organic" | "Conventional" | "Hydroponic" | "Biodynamic"
export type CropCategory = "Fruits" | "Vegetables" | "Grains" | "Nuts" | "Herbs" | "Other"

export interface ICrop extends Document {
  name: string
  farmer_id: mongoose.Types.ObjectId | string
  images: string[]
  price_per_unit: number
  quantity_available: number
  quantity_unit: string
  location: string
  agriculture_type: AgricultureType
  classification: CropCategory
  packaging: string
  harvest_date: Date
  created_at: Date
  grown_in: string
}

export type ICropFilters = {
  searchTerm?: string
}