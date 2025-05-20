import { Types } from "mongoose"

export interface IBooking {
  crop_id: Types.ObjectId
  farmer_id: Types.ObjectId
  buyer_id: Types.ObjectId // assumed you’ll store who booked
  delivery_address: string
  delivery_date: Date
  price_per_unit: number
  quantity: number
  notes?: string
  is_counter_offer: boolean
  status: 'pending' | 'confirmed' | 'cancelled'
  payment_status: 'not_paid' | 'paid' | 'cancelled'
}