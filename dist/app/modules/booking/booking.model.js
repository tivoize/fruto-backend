"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    crop_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Crop', required: true },
    farmer_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    buyer_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
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
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)('Booking', BookingSchema);
