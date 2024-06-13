'use strict'
const express = require('express');
const paymentController = require('../controllers/payment');
const asyncHandler = require('../middlewares/asyncHandler');
const router = express.Router();

// Get detail of all payment
router.get('/all', asyncHandler(paymentController.getAllPayments));
// Get all payments of a customer
router.get('/all/:customerId', asyncHandler(paymentController.getPaymentOfCustomer));
// Get total of payment of a month in a year
router.get('/total/year/:year/month/:month', asyncHandler(paymentController.getTotalOfPaymentOfOneMonthInOneYear));
// Get total of payment of 12 months in a year
router.get('/total/year/:year', asyncHandler(paymentController.getTotalOfPaymentByYear));
// Get total of payment of a specific date
router.get('/total/:date', asyncHandler(paymentController.getTotalOfPaymentByDate));
// Get total of payment that exists in DB
router.get('/total', asyncHandler(paymentController.getTotalOfPayment));
// Get detail of one payment
router.get('/:paymentId', asyncHandler(paymentController.getPaymentById));
// Create new payment
router.post('', asyncHandler(paymentController.createNewPayment));
// Update a payment
router.put('/:paymentId', asyncHandler(paymentController.updatePayment));
// Update a payment date
router.put('/status/:paymentId', asyncHandler(paymentController.updateStatusPayment));
// Delete a payment
router.delete('/:paymentId', asyncHandler(paymentController.deletePaymentById));

module.exports = router