// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/user.ejs", adminController.renderUser);
router.get("/plan.ejs", adminController.renderPlan);
router.get("/signout.ejs", adminController.renderSignout);

module.exports = router;
