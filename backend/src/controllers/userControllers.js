const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, pic } = req.body;
  //Ensure all the field are defined
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please complete all the fields");
  }
  //Check if user already exists

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Encrypt the password before storing in database

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: encryptedPassword,
    pic,
  });

  if (newUser) {
    res.status(201);
    res.json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      pic: newUser.pic,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User couldn't be created");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check if both fields have data
  if (!email || !password) {
    res.status(400);
    throw new Error("Kindly fill in all fields");
  }

  //Check if user with that email exists
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  //Compare if password given matches the encrypted one in database

  const isCorrectPassword = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isCorrectPassword) {
    res.status(400);
    throw new Error("Invalid credentials");
  } else {
    res.status(200).json({
      _id: existingUser._id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      pic: existingUser.pic,
      token: generateToken(existingUser._id),
    });
  }

  //send back data with a token to the client
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await (
    await User.find(keyword)
  ).find({ _id: { $ne: req.user._id } });
});

module.exports = {
  loginUser,
  registerUser,
  allUsers,
};
