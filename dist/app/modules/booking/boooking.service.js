"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const booking_model_1 = require("./booking.model");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
// Create a new booking
const createBooking = (data, buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = Object.assign(Object.assign({}, data), { buyer_id: buyerId });
    const booking = new booking_model_1.Booking(bookingData);
    const result = yield booking.save();
    return yield result.populate(['crop_id', 'farmer_id', 'buyer_id']);
});
// Get all bookings
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_model_1.Booking.find()
        .populate(['crop_id', 'farmer_id', 'buyer_id'])
        .sort({ createdAt: -1 });
});
// Get bookings by buyer ID
const getBookingsByBuyerId = (buyerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(buyerId, '27');
    return yield booking_model_1.Booking.find({ buyer_id: buyerId })
        .populate(['crop_id', 'farmer_id', 'buyer_id'])
        .sort({ createdAt: -1 });
});
// Get bookings by farmer ID
const getBookingsByFarmerId = (farmerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(farmerId, '35');
    return yield booking_model_1.Booking.find({ farmer_id: farmerId })
        .populate(['crop_id', 'farmer_id', 'buyer_id'])
        .sort({ createdAt: -1 });
});
const updateBookingStatusByFarmer = (bookingId, farmerId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    // 🔍 Find booking owned by farmer
    const booking = yield booking_model_1.Booking.findOne({ _id: bookingId, farmer_id: farmerId });
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    if (updates.status &&
        booking.status !== 'pending' &&
        updates.status === 'pending') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cannot change status back to 'pending' once it's confirmed or cancelled");
    }
    // ✅ Update allowed fields
    if (updates.status)
        booking.status = updates.status;
    if (updates.payment_status)
        booking.payment_status = updates.payment_status;
    yield booking.save();
    // 🔁 Return updated and populated
    return yield booking_model_1.Booking.findById(booking._id).populate([
        'crop_id',
        'farmer_id',
        'buyer_id',
    ]);
});
exports.default = updateBookingStatusByFarmer;
// Delete a booking
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(id);
    if (!booking) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Booking not found');
    }
    return yield booking_model_1.Booking.findByIdAndDelete(id);
});
exports.BookingService = {
    createBooking,
    getAllBookings,
    getBookingsByBuyerId,
    getBookingsByFarmerId,
    deleteBooking,
};
