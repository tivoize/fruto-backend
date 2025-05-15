import express from 'express'
import { UserRoutes } from '../modules/user/user.route'

import { AuthRoute } from '../modules/auth/auth.route'
import { CropsRoutes } from '../modules/crops/crops.route'

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
  }
  
 
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
