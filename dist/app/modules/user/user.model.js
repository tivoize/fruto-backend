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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../../config"));
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['farmer', 'buyer', 'logistics', 'admin'], required: true },
    username: { type: String, required: true },
    phone: String,
    address: String,
    city: String,
    state: String,
    zip_code: String,
    country: String,
    // Farmer-specific
    farm_name: String,
    farm_size: String,
    produce_types: [String],
    // Buyer-specific
    company_name: String,
    business_type: String,
    tax_id: String,
    // Logistics-specific
    fleet_size: String,
    vehicle_types: [String],
    service_areas: [String],
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            return ret;
        },
    },
});
// Hash password before saving
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password'))
            return next();
        user.password = yield bcryptjs_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// Check if user exists
UserSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email }, { email: 1, password: 1, role: 1 });
    });
};
UserSchema.statics.isVerifiedUserExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        return yield exports.User.findOne({ _id: id }, { password: 1, role: 1, phoneNumber: 1 });
    });
};
// Compare passwords
UserSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(givenPassword, savedPassword);
    });
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
