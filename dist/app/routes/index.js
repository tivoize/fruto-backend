"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const crops_route_1 = require("../modules/crops/crops.route");
const review_route_1 = require("../modules/review/review.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/crops',
        route: crops_route_1.CropsRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
