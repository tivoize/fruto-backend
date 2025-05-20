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
exports.ReviewCrops = void 0;
const review_model_1 = require("./review.model");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const postReview = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = Object.assign(Object.assign({}, data), { userId });
    const review = new review_model_1.Review(reviewData);
    const result = yield review.save();
    return yield result;
});
const postProviderReview = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = Object.assign(Object.assign({}, data), { userId });
    const review = new review_model_1.Review(reviewData);
    const result = yield review.save();
    return yield result.populate(['userId', 'providerId']);
});
const getAllReview = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.find()
        .populate('userId')
        .sort({ createdAt: -1 });
});
const getReviewByCropId = (cropId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.find({ cropId })
        .populate('userId')
        .sort({ createdAt: -1 });
});
const getReviewByProviderId = (providerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.Review.find({ providerId })
        .populate('userId')
        .sort({ createdAt: -1 });
});
const deleteReviewFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.findById(id).populate('userId');
    if (!review) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Review not found');
    }
    return yield review_model_1.Review.findByIdAndDelete(id);
});
exports.ReviewCrops = {
    postReview,
    postProviderReview,
    getAllReview,
    getReviewByCropId,
    getReviewByProviderId,
    deleteReviewFromDB,
};
