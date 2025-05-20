import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { RequestHandler } from 'express';
import { ReviewCrops } from './review.service';

const postReview: RequestHandler = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
  console.log(userId,'10')
  const result = await ReviewCrops.postReview(req.body,userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review post successfully',
    data: result,
  });
});
const postProviderReview: RequestHandler = catchAsync(async (req, res) => {
  const userId = req?.user?.userId;
 
  const result = await ReviewCrops.postProviderReview(req.body,userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Provider Review post successfully',
    data: result,
  });
});



const getAllReview: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReviewCrops.getAllReview();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review post successfully',
    data: result,
  });
});
const getReviewByCropId: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewCrops.getReviewByCropId(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrived successfully',
    data: result,
  });
});
const getReviewByProviderId: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewCrops.getReviewByProviderId(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Provider retrived successfully',
    data: result,
  });
});
const deleteReviewFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewCrops.deleteReviewFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const ReviewController = {
  postReview,
  postProviderReview,
  getAllReview,
  getReviewByCropId,
  getReviewByProviderId,
  deleteReviewFromDB
};
