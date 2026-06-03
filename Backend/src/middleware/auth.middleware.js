import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) throw new ApiError(401, "Unauthorized request. No token found");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    const user = await User.findById(decoded.id);

    if (user?.isBanned) {
      throw new ApiError(401, "User is banned");
    }

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Token");
  }
});

export { verifyJWT };
