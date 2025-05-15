import express from 'express'
import { CropsController } from './crops.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CropsValidation } from './crops.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const router = express.Router()

router.post(
  '/',
  validateRequest(CropsValidation.createCropsZodSchema),
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
  CropsController.createCrops
)
router.patch(
  '/:id',
  validateRequest(CropsValidation.updateCropsZodSchema),
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
  CropsController.updateCrops
)
router.get(
  '/',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
  CropsController.getAllCrops
)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
  CropsController.getSingleCrops
)
router.delete('/:id', auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS), CropsController.deleteCrops)

export const CropsRoutes = router
