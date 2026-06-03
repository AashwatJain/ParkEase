import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Mall } from "../models/mall.model.js";
import { User } from "../models/user.model.js";
import { Booking } from "../models/booking.model.js";
import { Slot } from "../models/slot.model.js";

const getPendingMalls = asyncHandler(async (req, res) => {
  const malls = await Mall.find({
    status: "pending",
  });

  res.status(200).json(new ApiResponse(200, { malls }, "Request Successful"));
});

const approveMalls = asyncHandler(async (req, res) => {
  const { mallId } = req.params;

  const mall = await Mall.findByIdAndUpdate(
    mallId,
    { status: "approved" },
    { new: true },
  );

  if (!mall) {
    throw new ApiError(404, "Mall not found");
  }

  res.status(200).json(new ApiResponse(200, { mall }, "Request Successful"));
});

const rejectMalls = asyncHandler(async (req, res) => {
  const { mallId } = req.params;

  const { reason } = req.body;

  const mall = await Mall.findByIdAndUpdate(
    mallId,
    { status: "rejected", rejectionReason: reason },
    { new: true },
  );

  if (!mall) {
    throw new ApiError(404, "Mall not found");
  }

  res.status(200).json(new ApiResponse(200, { mall }, "Request Successful"));
});

const getstats = asyncHandler(async (req, res) => {
  const [totalUsers, totalMalls, totalBookings, revenueData] =
    await Promise.all([
      User.countDocuments(),
      Mall.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([
        {
          $match: { status: "completed" },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$fare" },
          },
        },
      ]),
    ]);

  const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalUsers, totalMalls, totalBookings, totalRevenue },
        "Request Successful",
      ),
    );
});

// agg lagega baad mai dekhte hai isse
const allMalls = asyncHandler(async (req, res) => {
  const malls = await Mall.find(); // ab saaare malls aagye h apne p

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let data = [];

  for (const mall of malls) {
    const [currentlyParked, availableSlots] = await Promise.all([
      Slot.countDocuments({
        mall: mall._id,
        status: "occupied",
      }),

      Slot.countDocuments({
        mall: mall._id,
        status: "available",
      }),
    ]);

    const result = await Booking.aggregate([
      {
        $match: {
          mall: mall._id,
          status: "completed",
          exitTime: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          todayRevenue: { $sum: "$fare" },
        },
      },
    ]);

    const todayRevenue = result.length > 0 ? result[0].todayRevenue : 0;

    const liveStats = { currentlyParked, availableSlots, todayRevenue };

    data.push({
      name: mall.name,
      status: mall.status,
      liveStats,
    });
  }
  res.status(200).json(new ApiResponse(200, data, "Request Successful"));
});

const ban = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) throw new ApiError(404, "User not found");

  user.isBanned = true;

  await user.save();

  res.status(200).json(new ApiResponse(200, {}, "User Banned"));
});

const unban = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) throw new ApiError(404, "User not found");

  user.isBanned = false;

  await user.save();

  res.status(200).json(new ApiResponse(200, {}, "User Unbanned"));
});

export {
  getPendingMalls,
  approveMalls,
  rejectMalls,
  getstats,
  allMalls,
  ban,
  unban,
};
