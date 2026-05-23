import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    mall: {
      type: mongoose.Types.ObjectId,
      ref: "Mall",
      required: true,
    },

    floor: {
      type: mongoose.Types.ObjectId,
      ref: "Floor",
      required: true,
    },

    slotNumber: {
      type: String,
      required: true,
    },

    vehicleType: {
      type: String,
      enum: ["car", "bike"],
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "occupied", "maintenance"],
    },
  },
  { timestamps: true },
);

slotSchema.index({ mall: 1, floor: 1, vehicleType: 1, status: 1 });

export const Slot = mongoose.model("Slot", slotSchema);
