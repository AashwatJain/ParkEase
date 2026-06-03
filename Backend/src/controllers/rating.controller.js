import { Booking } from "../models/booking.model.js";
import { Rating } from "../models/rating.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";

const rate = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { rate, feedback } = req.body;
  if (!rate || !feedback) throw new ApiError(400, "Both fileds are required");

  const booking = await Booking.findById(bookingId);

  if (!booking) throw new ApiError(404, "Booking not found");

  const rating = await Rating.create({
    user: req.user.id,
    mall: booking.mall,
    booking: bookingId,
    rating: rate,
    feedback,
  });

  res.status(201).json(new ApiResponse(201, { rating }, "Mall has been rated"));
});

const getRating = asyncHandler(async (req, res) => {
  const { mallId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const ratings = await Rating.find({ mall: mallId })
    .populate("user", "username email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Rating.countDocuments({ mall: mallId });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        ratings,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Ratings fetched successfully",
    ),
  );
});

export { rate, getRating };
