const express = require("express");
const {
  registerUser,
  loginUser,
  allUsers,
} = require("../controllers/userControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// @Desc: Register new User
//Method: POST
//endpoint : /api/users

router.route("/").post(registerUser);

// @Desc: Get all users
//Method: GET
//endpoint : /api/users

router.route("/").get(protect, allUsers);

// @Desc: User Login
//Method: POST
//endpoint : /api/users/auth

router.route("/auth").post(loginUser);

module.exports = router;
