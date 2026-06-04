import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Mall } from "../models/mall.model.js";
import { Floor } from "../models/floor.model.js";
import { Slot } from "../models/slot.model.js";
import { Booking } from "../models/booking.model.js";
import { Rating } from "../models/rating.model.js";

const getOwnerMalls = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const malls = await Mall.find({
    owner: id,
  }).populate("owner", "name");

  res.status(200).json(new ApiResponse(200, { malls }, "Malls retrieved"));
});

const getOwnerDashboardStats = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const malls = await Mall.find({
    owner: id,
  });

  let totalMalls = malls.length,
    availableSlots = 0,
    occupiedSlots = 0,
    todaysRevenue = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const mall of malls) {
    const [ava, occ, rev] = await Promise.all([
      Slot.countDocuments({ mall: mall._id, status: "available" }),
      Slot.countDocuments({ mall: mall._id, status: "occupied" }),
      Booking.aggregate([
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
      ]),
    ]);

    availableSlots += ava;
    occupiedSlots += occ;

    todaysRevenue += rev.length ? rev[0].todayRevenue : 0;
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalMalls, availableSlots, occupiedSlots, todaysRevenue },
        "Request successfull",
      ),
    );
});

const getMallWiseStats = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const malls = await Mall.find({
    owner: id,
  });

  let data = [];

  for (const mall of malls) {
    const [ava, occ, rev] = await Promise.all([
      Slot.countDocuments({ mall: mall._id, status: "available" }),
      Slot.countDocuments({ mall: mall._id, status: "occupied" }),
      Booking.aggregate([
        {
          $match: {
            mall: mall._id,
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            todayRevenue: { $sum: "$fare" },
          },
        },
      ]),
    ]);

    data.push({
      mallName: mall.name,
      slotsAvailable: ava,
      slotsOccupied: occ,
      revenue: rev.length ? rev[0].todayRevenue : 0,
    });
  }

  res.status(200).json(new ApiResponse(200, { data }, "Request successfull"));
});

const getOwnerRatings = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const malls = await Mall.find({
    owner: id,
  });

  let data = [];

  for (const mall of malls) {
    const [one, two, three, four, five] = await Promise.all([
      Rating.countDocuments({
        mall: mall._id,
        rating: 1,
      }),
      Rating.countDocuments({
        mall: mall._id,
        rating: 2,
      }),
      Rating.countDocuments({
        mall: mall._id,
        rating: 3,
      }),
      Rating.countDocuments({
        mall: mall._id,
        rating: 4,
      }),
      Rating.countDocuments({
        mall: mall._id,
        rating: 5,
      }),
    ]);

    data.push({
      mallName: mall.name,
      one: one,
      two: two,
      three: three,
      four: four,
      five: five,
      averageRating: mall.averageRating,
    });
  }

  res.status(200).json(new ApiResponse(200, { data }, "Request successfull"));
});

export {
  getOwnerMalls,
  getOwnerDashboardStats,
  getMallWiseStats,
  getOwnerRatings,
};
