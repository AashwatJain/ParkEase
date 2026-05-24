import mongoose from "mongoose";
import { Mall } from "./mall.model.js";

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

// kuch toh naya h yeh
ratingSchema.statics.calculateAvgRating = async function (mallId) {
  const stats = await this.aggreagte([
    { $match: { mall: mallId } },
    {
      $group: {
        _id: "$mall",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);
  if (stats.length > 0) {
    await Mall.findByIdAndUpdate(mallId, {
      averageRating: stats[0].averageRating,
      totalReviews: stats[0].totalReviews,
    });
  } else {
    await Mall.findByIdAndUpdate(mallId, {
      averageRating: 0,
      totalReviews: 0,
    });
  }
};

ratingSchema.post("save", function () {
  this.constructor.calculateAvgRating(this.mall);
});

export const Rating = mongoose.model("Rating", ratingSchema);
