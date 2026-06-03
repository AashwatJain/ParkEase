import mongoose from "mongoose";

const mallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pricing: {
      bike: {
        type: Number,
      },
      car: {
        type: Number,
      },
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "approved"],
      default: "pending",
    },
    rejectionReason: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

mallSchema.methods.totalRevenue = async function () {
  const result = await mongoose.model("Booking").aggregate([
    {
      $match: {
        mall: this._id,
        status: "completed",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$fare" },
      },
    },
  ]);
  return result.length > 0 ? result[0].totalRevenue : 0;
};

export const Mall = mongoose.model("Mall", mallSchema);
