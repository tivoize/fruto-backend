import mongoose, {  Document, Types } from "mongoose"

export type AgricultureType = "Organic" | "Conventional" | "Hydroponic" | "Biodynamic"
export type CropCategory = "Fruits" | "Vegetables" | "Grains" | "Nuts" | "Herbs" | "Other"

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
}


export interface ICrop extends Document {
  _id: Types.ObjectId;
  name: string;
  farmer_id: Types.ObjectId | string;
  images: string[];
  price_per_unit: number;
  quantity_available: number;
  quantity_unit: string;
  location: string;
  agriculture_type: string;
  classification: string;
  packaging: string;
  harvest_date: Date;
  grown_in?: string;
  created_at: Date;
  updated_at?: Date;
}

export interface ICropFilters {
  searchTerm?: string;
  location?: string;
  agriculture_type?: string;
  classification?: string;
  grown_in?: string;
  farmer_id?: Types.ObjectId | string;
  [key: string]: any;
}