const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");






router.get('/AddOrders', orderController.renderAddOrders);
router.get('/EditOrders', orderController.renderEditOrders);
router.get('/DeleteOrders', orderController.renderDeleteOrders);
  
  
router.post("/AddOrders", orderController.createOrder);
router.put("/EditOrders", orderController.updateOrder);
router.delete("/DeleteOrders", orderController.deleteOrder);

module.exports = router;