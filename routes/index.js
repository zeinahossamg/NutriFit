// routes/index.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", (req, res) => {
  res.render("signin-signup");
});

router.get("/homepage.html", (req, res) => {
  res.render("homepage");
});

router.get("/index.html", orderController.getIndex);

router.put("/index.html", orderController.updateOrder);

router.post("/index.html", orderController.createOrder);

router.delete("/index.html", orderController.deleteOrder);

module.exports = router;
