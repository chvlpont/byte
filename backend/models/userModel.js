import User from "../schemas/userSchema.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// Function to register a new user
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

  // Creating a new user document
  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash: password,
  });

  // Generate token for the newly registered user
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

// Function to authenticate and login a user
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

  // Verifying password using bcrypt or a custom method (matchPassword)
  const result = await user.matchPassword(password);

  if (!result) {
    res.status(401);
    throw new Error("Incorrect credentials");
  }

  // Sending a successful response with user details and token
  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    displayName: user.displayName,
    token: generateToken(user),
  });
});

export { registerUser, loginUser };
