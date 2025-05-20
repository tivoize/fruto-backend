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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const review_model_1 = require("../review/review.model");
const crops_model_1 = __importDefault(require("../crops/crops.model"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Find all reviews by this user
    const reviews = yield review_model_1.Review.find({ user_id: id });
    // Find all crops where this user is the farmer
    const crops = yield crops_model_1.default.find({ farmer_id: id });
    return Object.assign(Object.assign({}, user.toObject()), { reviews,
        crops });
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findById(id);
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const updatedUserData = Object.assign({}, payload);
    if (payload.password) {
        const salt = yield bcryptjs_1.default.genSalt(10);
        updatedUserData.password = yield bcryptjs_1.default.hash(payload.password, salt);
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, updatedUserData, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const getLoggedUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = id;
    console.log(userId, '52');
    if (!userId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid token payload: missing user ID');
    }
    const user = yield user_model_1.User.findById(userId)
        .select('username email phone address city state zip_code country role ' +
        'farm_name farm_size produce_types ' + // farmer
        'company_name business_type tax_id ' + // buyer
        'fleet_size vehicle_types service_areas' // logistics
    )
        .lean();
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // Optionally: filter out irrelevant fields by role
    const filteredUser = {
        _id: user._id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zip_code: user.zip_code,
        country: user.country,
        role: user.role,
    };
    if (user.role === 'farmer') {
        Object.assign(filteredUser, {
            farm_name: user.farm_name,
            farm_size: user.farm_size,
            produce_types: user.produce_types,
        });
    }
    else if (user.role === 'buyer') {
        Object.assign(filteredUser, {
            company_name: user.company_name,
            business_type: user.business_type,
            tax_id: user.tax_id,
        });
    }
    else if (user.role === 'logistics') {
        Object.assign(filteredUser, {
            fleet_size: user.fleet_size,
            vehicle_types: user.vehicle_types,
            service_areas: user.service_areas,
        });
    }
    return filteredUser;
});
const updateLoggedUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findById(id);
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const updatedUserData = Object.assign({}, payload);
    if (payload.password) {
        const salt = yield bcryptjs_1.default.genSalt(10);
        updatedUserData.password = yield bcryptjs_1.default.hash(payload.password, salt);
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, updatedUserData, {
        new: true,
        fields: {
            username: 1,
            phone: 1,
            address: 1,
            city: 1,
            state: 1,
            zip_code: 1,
            country: 1,
            _id: 1,
        },
    });
    return result;
});
exports.userService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getLoggedUser,
    updateLoggedUser,
};
