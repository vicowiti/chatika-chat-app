const express = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers");

const router = express.Router();

// @Desc: Register new User
//Method: POST
//endpoint : /api/users

router.route("/").post(registerUser);

// @Desc: User Login
//Method: POST
//endpoint : /api/users/auth

router.route("/auth").post(loginUser);

module.exports = router;
