import { Review } from './review.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ReviewData } from './review.interface';



const postReview = async (data: ReviewData, userId: string) => {
  const reviewData = {
    ...data,
    userId,
  };

  const review = new Review(reviewData);
  const result = await review.save();
  return await result;
};

const postProviderReview = async (data: ReviewData, userId: string) => {
  const reviewData = {
    ...data,
    userId,
  };

  const review = new Review(reviewData);
  const result = await review.save();
  return await result.populate(['userId', 'providerId']);
};

const getAllReview = async () => {
  return await Review.find()
    .populate('userId')
    .sort({ createdAt: -1 });
};

const getReviewByServiceId = async (serviceId: string) => {
  return await Review.find({ serviceId })
    .populate('userId')
    .sort({ createdAt: -1 });
};

const getReviewByProviderId = async (providerId: string) => {
  return await Review.find({ providerId })
    .populate('userId')
    .sort({ createdAt: -1 });
};

const deleteReviewFromDB = async (id: string) => {
  const review = await Review.findById(id).populate('userId');

  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  return await Review.findByIdAndDelete(id);
};

export const ReviewServices = {
  postReview,
  postProviderReview,
  getAllReview,
  getReviewByServiceId,
  getReviewByProviderId,
  deleteReviewFromDB,
};
