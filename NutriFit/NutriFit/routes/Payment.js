const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');


router.get('/payment&Billing', paymentController.getPaymentBilling);
router.post('/payment&Billing', paymentController.createData);

module.exports = router;