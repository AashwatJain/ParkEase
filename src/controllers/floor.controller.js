import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { Floor } from "../models/floor.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { Slot } from "../models/slot.model.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const addFloor = asyncHandler(async (req, res) => {
  const { mallId } = req.params;
  const { floorNumber, bikeSlots, carSlots } = req.body;

  floorNumber = parseInt(floorNumber);
  bikeSlots = parseInt(bikeSlots);
  carSlots = parseInt(carSlots);

  if (!floorNumber || !bikeSlots || !carSlots)
    throw new ApiErrorError(400, "All fields are necessary");

  const floor = await Floor.create({
    mall: mallId,
    floorNumber,
    bikeSlots,
    carSlots,
  });

  const slotsArr = [];

  for (let i = 1; i <= bikeSlots; ++i) {
    slotsArr.push({
      mall: mallId,
      floor: floor._id,
      slotNumber: `${floorNumber}-B${bikeSlots}`,
      vehicleType: "bike",
      status: "available",
    });
  }
  for (let i = 1; i <= carSlots; ++i) {
    slotsArr.push({
      mall: mallId,
      floor: floor._id,
      slotNumber: `${floorNumber}-B${carSlots}`,
      vehicleType: "car",
      status: "available",
    });
  }

  await Slot.insertMany(slotsArr);

  res
    .status(201)
    .json(new ApiResponse(201, { floor }, "Floor added with slots"));
});

const getFloors = asyncHandler(async (req, res) => {
  const { mallId } = req.params;

  const floors = await Floor.find({
    mall: mallId,
  });

  res.status(200).json(new ApiResponse(200, { floors }, "Request Successful"));
});

const getTotalSlots = asyncHandler(async (req, res) => {
  const { mallId, floorId } = req.params;

  const [bikeCount, carCount] = await Promise.all([
    Slot.countDocuments({
      mall: mallId,
      floor: floorId,
      vehicleType: "bike",
      status: "available",
    }),
    Slot.countDocuments({
      mall: mallId,
      floor: floorId,
      vehicleType: "car",
      status: "available",
    }),
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, { bikeCount, carCount }, "Request Successful"));
});

export { addFloor, getFloors, getTotalSlots };
