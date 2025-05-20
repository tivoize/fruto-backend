"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const crops_model_1 = __importDefault(require("./crops.model"));
const crops_constant_1 = require("./crops.constant");
const createCrops = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(payload);
        // let uploadedImageUrls: string[] = [];
        // if (payload.images && payload.images.length > 0) {
        //   const uploadPromises = payload.images.map(img =>
        //     cloudinary.v2.uploader.upload(img, {
        //       folder: 'Fruto/Crops',
        //     })
        //   );
        //   const results = await Promise.all(uploadPromises);
        //   uploadedImageUrls = results.map(result => result.secure_url);
        // }
        const newCropData = Object.assign(Object.assign({}, payload), { images: payload.images || [], created_at: new Date() });
        const newCrop = yield crops_model_1.default.create(newCropData);
        return newCrop;
    }
    catch (error) {
        console.error("Error creating crop:", error);
        return null;
    }
});
const getAllCrops = (filters, queryOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
        const { page, limit, skip, sortBy, sortOrder, minPrice, maxPrice } = paginationHelpers_1.queryHelpers.calculateQuery(queryOptions);
        // Build query conditions
        const andConditions = [];
        // Search term condition
        if (searchTerm) {
            andConditions.push({
                $or: crops_constant_1.cropsSearchableFields.map(field => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i',
                    },
                })),
            });
        }
        // Price range conditions
        if (minPrice !== undefined || maxPrice !== undefined) {
            const priceCondition = {};
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
        const sortConditions = {};
        if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }
        else {
            // Default sort by created_at descending
            sortConditions['created_at'] = -1;
        }
        // Execute query with MongoDB's built-in pagination
        const crops = yield crops_model_1.default.find(whereConditions)
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        // Get total count for pagination metadata
        const total = yield crops_model_1.default.countDocuments(whereConditions);
        return {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Crops retrieved successfully!',
            meta: {
                page,
                limit,
                total,
            },
            data: crops,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error retrieving crops', error instanceof Error ? error.message : String(error));
    }
});
const getSingleCrops = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield crops_model_1.default.findById(id).populate('farmer_id');
    return result;
});
const updateCrops = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield crops_model_1.default.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Crop not found!');
    }
    const updatedCropData = Object.assign({}, payload);
    const result = yield crops_model_1.default.findOneAndUpdate({ _id: id }, updatedCropData, {
        new: true,
    });
    return result;
});
const deleteCrops = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield crops_model_1.default.findByIdAndDelete({ _id: id });
    return result;
});
exports.CropsService = {
    createCrops,
    getAllCrops,
    getSingleCrops,
    updateCrops,
    deleteCrops,
};
