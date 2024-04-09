import User from "../schemas/userSchema.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("You need to enter all the fields");
  }

  const userExists = await User.exists({ email });
  if (userExists) {
    res.status(400);
    throw new Error("The email address is already taken");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash: password,
  });

  // Generate token
  const token = generateToken(user);

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    displayName: user.displayName,
    token,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("You need to enter all the fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Incorrect credentials");
  }

  // const result = await bcrypt.compare(password, user.passwordHash)
  const result = await user.matchPassword(password);

  if (!result) {
    res.status(401);
    throw new Error("Incorrect credentials");
  }

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    displayName: user.displayName,
    token: generateToken(user),
  });
});

const getUserProfile = asyncHandler(async (req, res) => {});

const updateUserProfile = asyncHandler(async (req, res) => {});

export { registerUser, loginUser, getUserProfile, updateUserProfile };