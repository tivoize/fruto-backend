"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const crops_controller_1 = require("./crops.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const crops_validation_1 = require("./crops.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(crops_validation_1.CropsValidation.createCropsZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.FARMER, user_1.ENUM_USER_ROLE.FARMER, user_1.ENUM_USER_ROLE.LOGISTICS), crops_controller_1.CropsController.createCrops);
router.patch('/:id', (0, validateRequest_1.default)(crops_validation_1.CropsValidation.updateCropsZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.FARMER, user_1.ENUM_USER_ROLE.FARMER, user_1.ENUM_USER_ROLE.LOGISTICS), crops_controller_1.CropsController.updateCrops);
router.get('/', 
// auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
crops_controller_1.CropsController.getAllCrops);
router.get('/:id', 
// auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.FARMER,ENUM_USER_ROLE.LOGISTICS),
crops_controller_1.CropsController.getSingleCrops);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.FARMER, user_1.ENUM_USER_ROLE.FARMER, user_1.ENUM_USER_ROLE.LOGISTICS), crops_controller_1.CropsController.deleteCrops);
exports.CropsRoutes = router;
