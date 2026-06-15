import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Mall } from "../models/mall.model.js";
import { User } from "../models/user.model.js";
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
    todaysRevenue = 0,
    totalRevenue = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const mall of malls) {
    const [ava, occ, revToday, revTotal] = await Promise.all([
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
            totalRevenue: { $sum: "$fare" },
          },
        },
      ]),
    ]);

    availableSlots += ava;
    occupiedSlots += occ;

    todaysRevenue += revToday.length ? revToday[0].todayRevenue : 0;
    totalRevenue += revTotal.length ? revTotal[0].totalRevenue : 0;
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalMalls, availableSlots, occupiedSlots, todaysRevenue, totalRevenue },
        "Request successfull",
      ),
    );
});

const getMallWiseStats = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const malls = await Mall.find({
    owner: id,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let data = [];

  for (const mall of malls) {
    const [ava, occ, revToday, revTotal] = await Promise.all([
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
            totalRevenue: { $sum: "$fare" },
          },
        },
      ]),
    ]);

    data.push({
      mallId: mall._id,
      mallName: mall.name,
      slotsAvailable: ava,
      slotsOccupied: occ,
      revenue: revToday.length ? revToday[0].todayRevenue : 0,
      totalRevenue: revTotal.length ? revTotal[0].totalRevenue : 0,
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

const registerGuard = asyncHandler(async (req, res) => {
  const { username, email, password, mallId } = req.body;
  const ownerId = req.user.id;

  if (!username || !email || !password || !mallId) {
    throw new ApiError(400, "All fields are required (username, email, password, mallId)");
  }

  const mall = await Mall.findById(mallId);
  if (!mall) throw new ApiError(404, "Mall not found");

  if (!mall.owner.equals(ownerId) && req.user.role !== "admin") {
    throw new ApiError(403, "You can only assign guards to your own mall");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) throw new ApiError(409, "User already exists");

  const guard = await User.create({
    username,
    email,
    password,
    role: "guard",
    assignedMall: mallId,
  });

  guard.password = undefined;

  res.status(201).json(new ApiResponse(201, { guard }, "Guard registered successfully"));
});

export {
  getOwnerMalls,
  getOwnerDashboardStats,
  getMallWiseStats,
  getOwnerRatings,
  registerGuard,
};
