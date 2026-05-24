import { Mall } from "../models/mall.model.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Rating } from "../models/rating.model.js";

const createMall = asyncHandler(async (req, res) => {
  const { name, address, pricing, totalFloors } = req.body;
  const ownerId = req.user.id;

  console.log(name, address, pricing, totalFloors);

  if (!name?.trim() || !address?.trim()) {
    throw new ApiError(400, "Name and address cannot be empty");
  }

  if (!totalFloors || totalFloors < 1) {
    throw new ApiError(400, "A mall must have at least 1 floor");
  }

  if (pricing?.bike === undefined || pricing?.car === undefined) {
    throw new ApiError(400, "Pricing for both bike and car is required");
  }

  console.log();

  const mall = await Mall.create({
    owner: ownerId,
    name,
    address,
    pricing,
    totalFloors,
  });

  console.log(mall);

  res
    .status(201)
    .json(new ApiResponse(201, mall, "Mall created, approval pending"));
});

const getMalls = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 25;
  const name = req.query.name || "";
  const address = req.query.address || "";

  const filter = {
    status: "approved",
    isActive: true,
  };

  if (name) filter.name = { $regex: name, $options: "i" };
  if (address) filter.address = { $regex: address, $options: "i" };

  const [malls, totalMalls] = await Promise.all([
    Mall.find(filter)
      .skip((page - 1) * limit)
      .limit(limit),
    Mall.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        malls,
        pagination: {
          totalItems: totalMalls,
          totalPages: Math.ceil(totalMalls / limit),
          currentPage: page,
        },
      },
      "Request Successful",
    ),
  );
});

const getMall = asyncHandler(async (req, res) => {
  const mallId = req.params.mallId;

  const mall = await Mall.findById(mallId);

  if (!mall || !mall.isActive || mall.status !== "approved")
    throw new ApiError(404, "Mall not found");

  const data = {
    mall,
    avgRating: mall.averageRating,
  };

  res.status(200).json(new ApiResponse(200, data, "Request Successful"));
});

const updateMall = asyncHandler(async (req, res) => {
  const mallId = req.params.mallId;
  const ownerId = req.user.id;

  const mall = await Mall.findById(mallId);
  if (!mall) throw new ApiError(404, "Mall not found");

  if (!mall.owner.equals(ownerId) && req.user.role !== "admin")
    throw new ApiError(403, "Forbidden");

  const { name, address, pricing, totalFloors } = req.body;

  if (name) mall.name = name;
  if (address) mall.address = address;
  if (pricing) mall.pricing = pricing;
  if (totalFloors) mall.totalFloors = totalFloors;

  mall.status = "pending";

  const newMall = await mall.save();

  res.status(200).json(new ApiResponse(200, newMall, "Details Updated"));
});

const deleteMall = asyncHandler(async (req, res) => {
  const mallId = req.params.mallId;
  const ownerId = req.user.id;

  const mall = await Mall.findById(mallId);

  if (!mall) throw new ApiError(404, "Mall not found");

  if (!mall.owner.equals(ownerId) && req.user.role !== "admin")
    throw new ApiError(403, "Forbidden");

  mall.isActive = false;

  await mall.save();

  res.status(200).json(new ApiResponse(200, {}, "Mall Deleted"));
});

export { createMall, getMalls, getMall, updateMall, deleteMall };
