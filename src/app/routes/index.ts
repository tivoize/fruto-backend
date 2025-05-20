import express from 'express'
import { UserRoutes } from '../modules/user/user.route'

import { AuthRoute } from '../modules/auth/auth.route'
import { CropsRoutes } from '../modules/crops/crops.route'
import { ReviewRoutes } from '../modules/review/review.route'
import { BookingRoutes } from '../modules/booking/booking.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
 
  {
    path: '/users',
    route: UserRoutes,
  }
  ,
 
  {
    path: '/crops',
    route: CropsRoutes,
  },
  
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  }
  
 
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
