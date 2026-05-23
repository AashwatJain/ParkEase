import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
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

    booking: {
      type: mongoose.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    feedback: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

ratingSchema.index({ booking: 1 }, { unique: true });

export const Rating = mongoose.model("Rating", ratingSchema);
