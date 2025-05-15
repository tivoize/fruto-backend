
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ICrop } from './crops.interface'
import { CropsService } from './crops.service'
import { Request, RequestHandler, Response } from 'express'
import pick from '../../../shared/pick'
import {  cropsFilterableFields, queryFields } from '../../../constants/pagination'

const createCrops: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const { ...cropData } = req.body

    const result = await CropsService.createCrops(cropData)

    sendResponse<ICrop>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Crop created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

const getAllCrops = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cropsFilterableFields)
  const queryOptions = pick(req.query, queryFields)

  const result = await CropsService.getAllCrops(filters, queryOptions)

  sendResponse<ICrop[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Crops retrieved successfully!',
    meta: result?.meta,
    data: result?.data,
  })
})

const getSingleCrops = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await CropsService.getSingleCrops(id)

  sendResponse<ICrop>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Crop retrieved successfully!',
    data: result,
  })
})

const updateCrops = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await CropsService.updateCrops(id, updatedData)

  sendResponse<ICrop>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Crop updated successfully!',
    data: result,
  })
})

const deleteCrops = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await CropsService.deleteCrops(id)

  sendResponse<ICrop>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Crop deleted successfully!',
    data: result,
  })
})

export const CropsController = {
  createCrops,
  getAllCrops,
  getSingleCrops,
  updateCrops,
  deleteCrops,
}
