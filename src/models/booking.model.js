import mongoose from "mongoose";
import { generateQR } from "../utils/qr.utils.js";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

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

    slot: {
      type: mongoose.Types.ObjectId,
      ref: "Slot",
      required: true,
    },

    vehicleType: {
      type: String,
      enum: ["car", "bike"],
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    entryTime: {
      type: Date,
      required: true,
    },

    exitTime: {
      type: Date,
    },

    qrCode: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  { timestamps: true },
);

bookingSchema.pre("validate", async function () {
  if (!this.qrCode) {
    this.qrCode = await generateQR({
      bookingId: this._id,
      vehicleNumber: this.vehicleNumber,
    });
  }
});

export const Booking = mongoose.model("Booking", bookingSchema);
