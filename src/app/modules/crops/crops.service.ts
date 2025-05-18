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
  try {
    console.log(payload);
    let uploadedImageUrls: string[] = [];

    if (payload.images && payload.images.length > 0) {
      const uploadPromises = payload.images.map(img =>
        cloudinary.v2.uploader.upload(img, {
          folder: 'Fruto/Crops',
        })
      );

      const results = await Promise.all(uploadPromises);
      uploadedImageUrls = results.map(result => result.secure_url);
    }

    const newCropData: ICrop = {
      ...payload,
      images: uploadedImageUrls,
    };

    const newCrop = await Crop.create(newCropData);
    return newCrop;
  } catch (error) {
    console.error("Error creating crop:", error);
    return null;
  }
};


const getAllCrops = async (
  filters: ICropFilters,
  queryOptions: IPaginationOptions
): Promise<IGenericResponse<ICrop[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder, minPrice, maxPrice } =   queryHelpers.calculateQuery(queryOptions);

    // Build query conditions
    const andConditions = [];

    // Search term condition
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

    // Price range conditions
    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceCondition: { $gte?: number; $lte?: number } = {};
      
      if (minPrice !== undefined) {
        priceCondition.$gte = minPrice;
      }
      
      if (maxPrice !== undefined) {
        priceCondition.$lte = maxPrice;
      }
      
      andConditions.push({ price_per_unit: priceCondition });
    }

    // Other filter conditions
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => {
          // Handle array values (like categories)
          if (Array.isArray(value)) {
            return { [field]: { $in: value } };
          }
          return { [field]: value };
        }),
      });
    }

    // Combine all conditions
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

    // Build sort conditions
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    } else {
      // Default sort by created_at descending
      sortConditions['created_at'] = -1;
    }

    // Execute query with MongoDB's built-in pagination
    const crops = await Crop.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination metadata
    const total = await Crop.countDocuments(whereConditions);

    return {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Crops retrieved successfully!',
      meta: {
        page,
        limit,
        total,
      },
      data: crops,
    };
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error retrieving crops',
      error instanceof Error ? error.message : String(error)
    );
  }
};
const getSingleCrops = async (id: string): Promise<ICrop | null> => {
  const result = await Crop.findById(id).populate('farmer_id')
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
