import { Booking } from "../models/booking.model.js";
import { Slot } from "../models/slot.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const entry = asyncHandler(async (req, res) => {
  const { mallId, vehicleType, vehicleNumber } = req.body;
  const { id: userId } = req.user;

  const existingBooking = await Booking.findOne({
    user: userId,
    status: "active",
  });

  if (existingBooking) {
    throw new ApiError(409, "Complete older booking first");
  }

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

  await booking.populate([
    { path: "mall", select: "name city" },
    { path: "floor", select: "floorNumber" },
    { path: "slot", select: "slotNumber" },
  ]);

  res.status(201).json(new ApiResponse(201, { booking }, "Booking done"));
});

const exit = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { id: userId, role, assignedMall } = req.user;

  const booking = await Booking.findById(bookingId)
    .populate("mall")
    .populate("floor", "floorNumber")
    .populate("slot", "slotNumber");

  if (!booking) throw new ApiError(404, "Booking not found");

  if (role === "guard") {
    if (!assignedMall || !assignedMall.equals(booking.mall._id)) {
      throw new ApiError(403, "You can only exit vehicles from your assigned mall");
    }
  } else if (role === "mall-owner") {
    if (!booking.mall.owner.equals(userId)) {
      throw new ApiError(403, "You can only exit vehicles from your own mall");
    }
  } else if (role !== "admin") {
    throw new ApiError(403, "Forbidden");
  }

  if (booking.status === "completed")
    throw new ApiError(400, "Booking already completed");

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

  const booking = await Booking.findById(bookingId)
    .populate("mall", "name city")
    .populate("floor", "floorNumber")
    .populate("slot", "slotNumber");

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
    .limit(limit)
    .populate("mall", "name city")
    .populate("floor", "floorNumber")
    .populate("slot", "slotNumber");

  res
    .status(200)
    .json(new ApiResponse(200, { bookings }, "Bookings retrieved"));
});

const verifyQr = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const { id: userId, role, assignedMall } = req.user;

  if (!bookingId) {
    throw new ApiError(400, "Booking ID is required from QR payload");
  }

  const booking = await Booking.findById(bookingId)
    .populate("mall")
    .populate("floor", "floorNumber")
    .populate("slot", "slotNumber");

  if (!booking) {
    throw new ApiError(404, "Invalid QR: Booking not found");
  }

  if (role === "guard") {
    if (!assignedMall || !assignedMall.equals(booking.mall._id)) {
      throw new ApiError(403, "Forbidden: You cannot scan QRs for other malls");
    }
  } else if (role === "mall-owner") {
    if (!booking.mall.owner.equals(userId)) {
      throw new ApiError(403, "Forbidden: You cannot scan QRs for other malls");
    }
  } else if (role !== "admin") {
    throw new ApiError(403, "Forbidden");
  }

  if (booking.status === "completed") {
    throw new ApiError(400, "QR Expired: This booking is already completed");
  }

  const fare = await booking.calculateFare(new Date());

  res.status(200).json(
    new ApiResponse(
      200,
      {
        vehicleNumber: booking.vehicleNumber,
        vehicleType: booking.vehicleType,
        slot: booking.slot.slotNumber,
        floor: booking.floor.floorNumber,
        status: booking.status,
        fare,
      },
      "QR Verified Successfully"
    )
  );
});

export { entry, exit, getBooking, getBookings, verifyQr };
