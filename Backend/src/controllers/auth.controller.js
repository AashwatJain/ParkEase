import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role = "user" } = req.body;

  if (role === "admin") throw new ApiError(401, "Unauthorized");

  if (!username || !email || !password)
    throw new ApiError(400, "All fields are required");

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) throw new ApiError(409, "User already exists");

  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  const token = user.generateToken();

  user.password = undefined;

  res
    .status(201)
    .cookie("token", token, { httpOnly: true, secure: true })
    .json(new ApiResponse(201, { user }, "User created"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email)
    throw new ApiError(400, "Username and email are missing");

  const conditions = [];

  if (username) conditions.push({ username });
  if (email) conditions.push({ email });

  const user = await User.findOne({
    $or: conditions,
  }).select("+password");

  if (!user) throw new ApiError(404, "User not found");

  if (!password) throw new ApiError(400, "Password is missing");

  const isPassValid = await user.isPasswordCorrect(password);

  if (!isPassValid) throw new ApiError(401, "Invalid Credentials");

  if (user.isBanned) throw new ApiError(403, "Your account has been banned. Please contact admin.");

  const token = user.generateToken();

  user.password = undefined;

  res
    .status(200)
    .cookie("token", token, { httpOnly: true, secure: true })
    .json(new ApiResponse(200, { user }, "User logged In"));
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true });
  res.status(200).json(new ApiResponse(200, {}, "User logged Out"));
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, { user }));
});

export { registerUser, loginUser, logoutUser, getUser };
