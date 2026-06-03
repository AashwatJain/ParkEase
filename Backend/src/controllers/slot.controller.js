import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { Slot } from "../models/slot.model.js";

const slotMaintenance = asyncHandler(async (req, res) => {
  const { slotId } = req.params;
  const slot = await Slot.findByIdAndUpdate(
    slotId,
    {
      status: "maintenance",
    },
    { new: true },
  );

  if (!slot) {
    throw new ApiError(404, "Slot not found");
  }

  res.status(200).json(new ApiResponse(200, { slot }, "Slot Updated"));
});

const multipleSlotMaintenance = asyncHandler(async (req, res) => {
  const { floorId } = req.params;

  const result = await Slot.updateMany(
    { floor: floorId },
    {
      status: "maintenance",
    },
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { slotsUpdated: result.modifiedCount },
        "Slots Updated",
      ),
    );
});

const multipleSlotActive = asyncHandler(async (req, res) => {
  const { floorId } = req.params;

  const result = await Slot.updateMany(
    { floor: floorId },
    {
      status: "available",
    },
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { slotsUpdated: result.modifiedCount },
        "Slots Updated",
      ),
    );
});

export { slotMaintenance, multipleSlotMaintenance, multipleSlotActive };
