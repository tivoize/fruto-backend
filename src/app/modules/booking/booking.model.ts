import { Schema, model } from 'mongoose'
import { IBooking } from './booking.interface'



const BookingSchema = new Schema<IBooking>(
  {
    crop_id: { type: Schema.Types.ObjectId, ref: 'Crop', required: true },
    farmer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    buyer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    delivery_address: { type: String, required: true },
    delivery_date: { type: Date, required: true },

    price_per_unit: { type: Number, required: true },
    quantity: { type: Number, required: true },
    notes: { type: String, default: '' },
    is_counter_offer: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    payment_status: {
      type: String,
      enum: ['not_paid', 'paid', 'cancelled'],
      default: 'not_paid',
    },
  },
  {
    timestamps: true,
  }
)

export const Booking = model<IBooking>('Booking', BookingSchema)
