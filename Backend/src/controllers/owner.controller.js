import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Mall } from "../models/mall.model.js";
import { Floor } from "../models/floor.model.js";
import { Slot } from "../models/slot.model.js";
import { Booking } from "../models/booking.model.js";

const getOwnerMalls = asyncHandler(async (req, res) => {
});

const getOwnerDashboardStats = asyncHandler(async (req, res) => {
});

const getOwnerAnalytics = asyncHandler(async (req, res) => {
});

const getOwnerRevenue = asyncHandler(async (req, res) => {
});

const getOwnerRatings = asyncHandler(async (req, res) => {
});

export {
  getOwnerMalls,
  getOwnerDashboardStats,
  getOwnerAnalytics,
  getOwnerRevenue,
  getOwnerRatings,
};
