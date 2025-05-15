import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { queryHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { ICrop, ICropFilters } from './crops.interface';
import  Crop  from './crops.model'
import { cropsSearchableFields } from './crops.constant';
import cloudinary from 'cloudinary';

const createCrops = async (payload: ICrop): Promise<ICrop | null> => {
  console.log(payload )
  let uploadedImageUrls: string[] = [];

  // Handle Cloudinary image uploads if any
  if (payload.images && payload.images.length > 0) {
    const uploadPromises = payload.images.map(img =>
      cloudinary.v2.uploader.upload(img, {
        folder: 'Fruto/Crops',
      })
    );

    const results = await Promise.all(uploadPromises);
    uploadedImageUrls = results.map(result => result.secure_url);
  }

  // Create the crop with updated image URLs
  const newCropData: ICrop = {
    ...payload,
    images: uploadedImageUrls,
  };

  const newCrop = await Crop.create(newCropData);
  return newCrop;
};

const getAllCrops = async (
  filters: ICropFilters,
  queryOptions: IPaginationOptions
): Promise<IGenericResponse<ICrop[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, sortBy, sortOrder, minPrice, maxPrice } =
    queryHelpers.calculateQuery(queryOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cropsSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    andConditions.push({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    });
  } else if (minPrice !== undefined) {
    andConditions.push({
      price: {
        $gte: minPrice,
      },
    });
  } else if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        $lte: maxPrice,
      },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Crop.find(whereConditions)
    .sort(sortConditions)
 

  // Manual pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResult = result.slice(startIndex, endIndex);

  const total = await Crop.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: paginatedResult,
  };
};

const getSingleCrops = async (id: string): Promise<ICrop | null> => {
  const result = await Crop.findById(id)
  return result;
};

const updateCrops = async (
  id: string,
  payload: Partial<ICrop>
): Promise<ICrop | null> => {
  const isExist = await Crop.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crop not found!');
  }

  const updatedCropData: Partial<ICrop> = { ...payload };

  const result = await Crop.findOneAndUpdate({ _id: id }, updatedCropData, {
    new: true,
  })
  return result;
};

const deleteCrops = async (id: string): Promise<ICrop | null> => {
  const result = await Crop.findByIdAndDelete({ _id: id })
  return result;
};

export const CropsService = {
  createCrops,
  getAllCrops,
  getSingleCrops,
  updateCrops,
  deleteCrops,
};
