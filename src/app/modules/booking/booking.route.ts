import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


import { BookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';

const router = express.Router();
router.post(
  '/',
  validateRequest(BookingValidation.bookingZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  BookingController.postBooking
);

router.get(
  '/',

  BookingController.getAllBooking
);
router.get(
  '/buyer-booking',
  auth(ENUM_USER_ROLE.BUYER),
  BookingController.getBookingsByBuyerId
);
router.get(
  '/farmer-order',
  auth( ENUM_USER_ROLE.FARMER),
  BookingController.getBookingsByFarmerId
);

router.get('/', BookingController.getAllBooking);
router.delete('/:id',auth(ENUM_USER_ROLE.ADMIN), BookingController.deleteBookingFromDB);

export const BookingRoutes = router;
