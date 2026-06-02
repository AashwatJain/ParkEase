import { Booking } from "../models/booking.model.js";
import { Slot } from "../models/slot.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const entry = asyncHandler(async (req, res) => {
  const { mallId, vehicleType, vehicleNumber } = req.body;
  const { id: userId } = req.user;

  if (!mallId || !vehicleType || !vehicleNumber)
    throw new ApiError(400, "All fields are required");

  const slot = await Slot.findOneAndUpdate(
    {
      mall: mallId,
      vehicleType,
      status: "available",
    },
    {
      status: "occupied",
    },
    { new: true },
  );

  if (!slot) throw new ApiError(409, "No slot is available");

  const booking = await Booking.create({
    user: userId,
    mall: mallId,
    floor: slot.floor,
    slot: slot._id,
    vehicleType,
    vehicleNumber,
  });

  res.status(201).json(new ApiResponse(201, { booking }, "Booking done"));
});

const exit = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { id: userId } = req.user;

  const booking = await Booking.findById(bookingId);

  if (!booking) throw new ApiError(404, "Booking not found");

  if (booking.user.toString() !== userId.toString())
    throw new ApiError(403, "Forbidden");

  const fare = await booking.calculateFare(new Date());
  booking.status = "completed";
  await booking.save();

  await Slot.findByIdAndUpdate(booking.slot, { status: "available" });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        fare,
        booking,
      },
      "Booking completed",
    ),
  );
});

const getBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { id: userId } = req.user;

  const booking = await Booking.findById(bookingId);

  if (!booking) throw new ApiError(404, "Booking not found");

  if (booking.user.toString() !== userId.toString())
    throw new ApiError(403, "Forbidden");

  res.status(200).json(new ApiResponse(200, { booking }, "Booking retrieved"));
});

const getBookings = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;

  const bookings = await Booking.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res
    .status(200)
    .json(new ApiResponse(200, { bookings }, "Bookings retrieved"));
});

export { entry, exit, getBooking, getBookings };