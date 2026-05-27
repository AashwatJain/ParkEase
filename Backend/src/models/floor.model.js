import mongoose from "mongoose";

const floorSchema = new mongoose.Schema(
  {
    mall: {
      type: mongoose.Types.ObjectId,
      ref: "Mall",
      required: true,
    },
    floorNumber: {
      type: Number,
      required: true,
    },
    bikeSlots: {
      type: Number,
      required: true,
    },
    carSlots: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Floor = mongoose.model("Floor", floorSchema);
