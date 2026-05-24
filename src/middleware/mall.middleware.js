import { Mall } from "../models/mall.model";
import { ApiError } from "../utils/ApiError.utils";
import { asyncHandler } from "../utils/asyncHandler.utils";

const checkMallActive = asyncHandler(async (req, res, next) => {
  const mallId = req.params.id || req.body.mall;
  const mall = await Mall.findById(mallId);

  if (!mall.isActive) {
    throw new ApiError(400, "This mall is currently inactive");
  }

  next();
});

export { checkMallActive };