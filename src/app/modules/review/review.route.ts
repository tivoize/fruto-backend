import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';

const router = express.Router();
router.post(
  '/',
  validateRequest(ReviewValidation.reviewZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  ReviewController.postReview
);
router.post(
  '/provider',
  // validateRequest(ReviewValidation.reviewZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  ReviewController.postProviderReview
);
router.get(
  '/',

  ReviewController.getAllReview
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.BUYER),
  ReviewController.getReviewByServiceId
);
router.get(
  '/provider/:id',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.BUYER),
  ReviewController.getReviewByProviderId
);
router.get('/', ReviewController.getAllReview);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), ReviewController.deleteReviewFromDB);

export const ReviewRoutes = router;
