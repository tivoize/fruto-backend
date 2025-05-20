import { Booking } from './booking.model'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IBooking } from './booking.interface'

// Create a new booking
const createBooking = async (data: IBooking, buyerId: string) => {
  const bookingData = {
    ...data,
    buyer_id: buyerId,
  }

  const booking = new Booking(bookingData)
  const result = await booking.save()
  return await result.populate(['crop_id', 'farmer_id', 'buyer_id'])
}

// Get all bookings
const getAllBookings = async () => {
  return await Booking.find()
    .populate(['crop_id', 'farmer_id', 'buyer_id'])
    .sort({ createdAt: -1 })
}

// Get bookings by buyer ID
const getBookingsByBuyerId = async (buyerId: string) => {
    console.log(buyerId,'27')
  return await Booking.find({ buyer_id: buyerId })
    .populate(['crop_id', 'farmer_id', 'buyer_id'])
    .sort({ createdAt: -1 })
}

// Get bookings by farmer ID
const getBookingsByFarmerId = async (farmerId: string) => {
  console.log(farmerId,'35')
  return await Booking.find({ farmer_id: farmerId })
    .populate(['crop_id', 'farmer_id', 'buyer_id'])
    .sort({ createdAt: -1 })
}

// Delete a booking
const deleteBooking = async (id: string) => {
  const booking = await Booking.findById(id)
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found')
  }

  return await Booking.findByIdAndDelete(id)
}

export const BookingService = {
  createBooking,
  getAllBookings,
  getBookingsByBuyerId,
  getBookingsByFarmerId,
  deleteBooking,
}
