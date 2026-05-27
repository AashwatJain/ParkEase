import { ApiError } from "../utils/ApiError.utils.js";

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          `Access denied. Role '${req.user.role}' is not authorized.`,
        ),
      );
    }
    next();
  };
};

export { authorizeRoles };
