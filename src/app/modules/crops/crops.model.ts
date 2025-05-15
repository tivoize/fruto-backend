// models/Crop.ts

import mongoose, { Schema, Document, model } from "mongoose"
import { ICrop } from "./crops.interface"



const CropSchema = new Schema<ICrop>({
  name: { type: String, required: true },
  farmer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  images: { type: [String], default: [] },
  price_per_unit: { type: Number, required: true },
  quantity_available: { type: Number, required: true },
  quantity_unit: { type: String, required: true },
  location: { type: String, required: true },
  agriculture_type: {
    type: String,
    enum: ["Organic", "Conventional", "Hydroponic", "Biodynamic"],
    required: true,
  },
  classification: {
    type: String,
    enum: ["Fruits", "Vegetables", "Grains", "Nuts", "Herbs", "Other"],
    required: true,
  },
  packaging: { type: String, required: true },
  harvest_date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  grown_in: {
    type: String,
    enum: [
      "Field",
      "Greenhouse",
      "Indoor",
      "Vertical Farm",
      "Aquaponic System",
      "Hydroponic System",
    ],
    required: true,
  },
})

export default mongoose.models.Crop || model<ICrop>("Crop", CropSchema)
