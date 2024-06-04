'use strict'
const express = require('express');
const paymentController = require('../controllers/payment');
const asyncHandler = require('../middlewares/asyncHandler');
const router = express.Router();

router.get('/all', asyncHandler(paymentController.getAllPayments));
router.get('/all/:customerId', asyncHandler(paymentController.getPaymentOfCustomer));
router.get('/:paymentId', asyncHandler(paymentController.getPaymentById));
router.post('', asyncHandler(paymentController.createNewPayment));
router.put('/:paymentId', asyncHandler(paymentController.updatePayment));
router.delete('/:paymentId', asyncHandler(paymentController.deletePaymentById));

module.exports = router