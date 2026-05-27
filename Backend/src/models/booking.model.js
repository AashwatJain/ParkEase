import mongoose from "mongoose";
import { generateQR } from "../utils/qr.utils.js";
import { Mall } from "./mall.model.js";
import { ApiError } from "../utils/ApiError.utils.js";

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

    fare: {
      type: Number,
      default: 0,
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
    this.entryTime = new Date();
    this.qrCode = await generateQR({
      bookingId: this._id,
      vehicleNumber: this.vehicleNumber,
    });
  }
});

bookingSchema.methods.calculateFare = async function (exitTime) {
  this.exitTime = exitTime;
  const totalTime = exitTime - this.entryTime;

  const mall = await Mall.findById(this.mall);

  if (!mall) {
    throw new ApiError(404, "Mall details not found for fare calculation");
  }

  return this.fare = mall.pricing[this.vehicleType] * Math.ceil(totalTime / 1000 / 60 / 60);
};

export const Booking = mongoose.model("Booking", bookingSchema);
