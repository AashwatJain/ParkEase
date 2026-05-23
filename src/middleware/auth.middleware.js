import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js"

const verifyJWT = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new ApiError(401, "Unauthorized request. No token found");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Token");
  }
});

export { verifyJWT };
