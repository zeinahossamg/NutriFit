// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signin-signup.ejs", authController.renderSigninSignup);

module.exports = router;
