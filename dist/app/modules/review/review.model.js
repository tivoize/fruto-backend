"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    cropId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Crop',
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
